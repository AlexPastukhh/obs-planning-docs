package obs.rpkg;

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.security.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.zip.*;

final class RepositorySnapshotExporter {
    private static final DateTimeFormatter FILE_TIME=DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss").withZone(ZoneOffset.UTC);
    private final GitClient git;
    private final Runnable betweenLocalPassesHook;

    RepositorySnapshotExporter(GitClient git){this(git,()->{});}
    RepositorySnapshotExporter(GitClient git,Runnable betweenLocalPassesHook){this.git=Objects.requireNonNull(git);this.betweenLocalPassesHook=betweenLocalPassesHook==null?()->{}:betweenLocalPassesHook;}

    Core.SnapshotExportResult export(Path repo,String repositoryIdentity,String requestedMode,String commitRef,Path outputDirectory){
        String mode=requestedMode==null?"":requestedMode.trim().toLowerCase(Locale.ROOT);
        if(!mode.equals("local")&&!mode.equals("committed"))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Snapshot mode must be local or committed.");
        Path out=prepareOutputDirectory(repo,outputDirectory);
        return mode.equals("local")?exportLocal(repo,repositoryIdentity,out):exportCommitted(repo,repositoryIdentity,commitRef,out);
    }

    private Core.SnapshotExportResult exportLocal(Path repo,String repositoryIdentity,Path out){
        String head=resolveCommit(repo,"HEAD"),branch=currentBranch(repo),createdAt=Instant.now().toString();
        LocalState before=captureLocalState(repo);
        byte[] diffBefore=workingTreeDiff(repo,head);
        betweenLocalPassesHook.run();
        LocalState after=captureLocalState(repo);
        if(!before.hashes.equals(after.hashes))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Working tree changed while the local snapshot was being captured. Retry export.");
        requireHeadUnchanged(repo,head);
        byte[] diffAfter=workingTreeDiff(repo,head);
        requireHeadUnchanged(repo,head);
        if(!Arrays.equals(diffBefore,diffAfter))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Working tree diff changed while the local snapshot was being captured. Retry export.");

        Map<String,Object> manifest=new LinkedHashMap<>();
        manifest.put("schemaVersion",1);
        manifest.put("snapshotType","local");
        manifest.put("repositoryIdentity",repositoryIdentity);
        manifest.put("snapshotFolder","snapshot/");
        manifest.put("baseCommitSha",head);
        manifest.put("branch",branch);
        manifest.put("createdAt",createdAt);
        manifest.put("baseCommitFile","BASE-COMMIT.txt");
        manifest.put("diffFile","WORKING-TREE.diff");
        manifest.put("fileCount",after.files.size());
        manifest.put("inclusionPolicy","tracked files plus untracked non-ignored files; .git and ignored untracked files are excluded");

        String filename=repoName(repositoryIdentity)+"-local-base-"+shortSha(head)+"-"+FILE_TIME.format(Instant.now())+".zip";
        Path finalPath=uniquePath(out,filename),tmp=createTemp(out);
        try{
            writeZip(tmp,manifest,"BASE-COMMIT.txt",(head+"\n").getBytes(StandardCharsets.UTF_8),"WORKING-TREE.diff",diffAfter,after.files);
            moveComplete(tmp,finalPath);
            return new Core.SnapshotExportResult(finalPath,"local",repositoryIdentity,head,branch);
        }catch(Throwable t){delete(tmp);throw asExport(t);}
    }

    private Core.SnapshotExportResult exportCommitted(Path repo,String repositoryIdentity,String commitRef,Path out){
        String requested=commitRef==null||commitRef.isBlank()?"HEAD":commitRef.trim();
        String commit=resolveCommit(repo,requested),createdAt=Instant.now().toString();
        Map<String,byte[]> files=captureCommittedState(repo,commit);

        Map<String,Object> manifest=new LinkedHashMap<>();
        manifest.put("schemaVersion",1);
        manifest.put("snapshotType","committed");
        manifest.put("repositoryIdentity",repositoryIdentity);
        manifest.put("snapshotFolder","snapshot/");
        manifest.put("commitSha",commit);
        manifest.put("requestedRef",requested);
        manifest.put("createdAt",createdAt);
        manifest.put("commitFile","COMMIT.txt");
        manifest.put("fileCount",files.size());
        manifest.put("source","Git object database; working tree content is not used");

        String filename=repoName(repositoryIdentity)+"-commit-"+shortSha(commit)+"-"+FILE_TIME.format(Instant.now())+".zip";
        Path finalPath=uniquePath(out,filename),tmp=createTemp(out);
        try{
            writeZip(tmp,manifest,"COMMIT.txt",(commit+"\n").getBytes(StandardCharsets.UTF_8),null,null,files);
            moveComplete(tmp,finalPath);
            return new Core.SnapshotExportResult(finalPath,"committed",repositoryIdentity,commit,null);
        }catch(Throwable t){delete(tmp);throw asExport(t);}
    }

    private LocalState captureLocalState(Path repo){
        GitClient.BytesResult listed=git.bytes(repo,Core.SNAPSHOT_EXPORT_FAILED,"ls-files","-z","--cached","--others","--exclude-standard");
        List<String> paths=parseNullStrings(listed.output(),"git ls-files");
        TreeMap<String,byte[]> files=new TreeMap<>();
        TreeMap<String,String> hashes=new TreeMap<>();
        TreeSet<String> folded=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        for(String raw:paths){
            String path=Core.normalizeRepoPath(raw);
            if(!folded.add(path))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Case-insensitive path collision cannot be exported on Windows: "+path);
            Path target=Core.inside(repo,path);
            if(!Files.exists(target,LinkOption.NOFOLLOW_LINKS))continue;
            if(!Files.isRegularFile(target,LinkOption.NOFOLLOW_LINKS))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Snapshot path is not a regular file: "+path);
            try{
                byte[] bytes=Files.readAllBytes(target);
                files.put(path,bytes);hashes.put(path,sha256(bytes));
            }catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot read local snapshot file "+path+": "+e.getMessage(),e);}
        }
        return new LocalState(Collections.unmodifiableMap(files),Collections.unmodifiableMap(hashes));
    }

    private Map<String,byte[]> captureCommittedState(Path repo,String commit){
        GitClient.BytesResult listed=git.bytes(repo,Core.SNAPSHOT_EXPORT_FAILED,"ls-tree","-r","-z","--full-tree",commit);
        List<byte[]> records=splitNull(listed.output());
        TreeMap<String,byte[]> files=new TreeMap<>();
        TreeSet<String> folded=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        for(byte[] record:records){
            String s=utf8(record,"git ls-tree");
            int tab=s.indexOf('\t'); if(tab<0)throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Unexpected git ls-tree record.");
            String[] meta=s.substring(0,tab).split(" ",3); if(meta.length!=3)throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Unexpected git ls-tree metadata.");
            String mode=meta[0],type=meta[1],object=meta[2],path=Core.normalizeRepoPath(s.substring(tab+1));
            if(!folded.add(path))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Case-insensitive path collision cannot be exported on Windows: "+path);
            if(mode.equals("120000"))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Committed snapshot contains a symbolic link, unsupported in V1 ZIP export: "+path);
            if(mode.equals("160000")||type.equals("commit"))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Committed snapshot contains a submodule, unsupported in V1 ZIP export: "+path);
            if(!type.equals("blob")||!(mode.equals("100644")||mode.equals("100755")))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Unsupported committed Git entry "+mode+" "+type+": "+path);
            byte[] bytes=git.bytes(repo,Core.SNAPSHOT_EXPORT_FAILED,"cat-file","blob",object).output();
            files.put(path,bytes);
        }
        return Collections.unmodifiableMap(files);
    }

    private byte[] workingTreeDiff(Path repo,String baseCommit){
        Path temp=null;
        try{
            temp=Files.createTempDirectory("obs-rpkg-snapshot-index-");
            Path index=temp.resolve("index");
            Map<String,String> env=Map.of("GIT_INDEX_FILE",index.toString());
            git.env(repo,Core.SNAPSHOT_EXPORT_FAILED,env,"read-tree",baseCommit);
            git.env(repo,Core.SNAPSHOT_EXPORT_FAILED,env,"add","-A","--",".");
            return git.bytesEnv(repo,Core.SNAPSHOT_EXPORT_FAILED,env,"--no-pager","diff","--cached","--no-color","--binary",baseCommit).output();
        }catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot create temporary Git index for snapshot diff: "+e.getMessage(),e);}
        finally{deleteTree(temp);}
    }

    private String resolveCommit(Path repo,String ref){
        GitClient.Result r=git.allow(repo,Core.SNAPSHOT_EXPORT_FAILED,"rev-parse","--verify",ref+"^{commit}");
        if(r.exitCode()!=0||r.first().isBlank())throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot resolve commit ref: "+ref);
        return r.first();
    }

    private String currentBranch(Path repo){
        GitClient.Result r=git.allow(repo,Core.SNAPSHOT_EXPORT_FAILED,"symbolic-ref","--quiet","--short","HEAD");
        return r.exitCode()==0&&!r.first().isBlank()?r.first():null;
    }

    private void requireHeadUnchanged(Path repo,String expected){
        String actual=resolveCommit(repo,"HEAD");
        if(!actual.equals(expected))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"HEAD changed while the local snapshot was being captured. Retry export.");
    }

    private Path prepareOutputDirectory(Path repo,Path requested){
        Path out=(requested==null?defaultOutputDirectory():requested).toAbsolutePath().normalize();
        Path normalizedRepo=repo.toAbsolutePath().normalize();
        if(out.startsWith(normalizedRepo))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Snapshot output directory must be outside the repository.");
        if(!Files.isDirectory(out))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Snapshot output directory must already exist and be a directory: "+out);
        try{
            Path realRepo=normalizedRepo.toRealPath(),realOut=out.toRealPath();
            if(realOut.startsWith(realRepo))throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Snapshot output directory resolves inside the repository.");
            return out;
        }catch(Core.ObsException e){throw e;}
        catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot verify snapshot output directory: "+e.getMessage(),e);}
    }

    static Path defaultOutputDirectory(){
        Path home=Path.of(System.getProperty("user.home",".")).toAbsolutePath().normalize(),downloads=home.resolve("Downloads");
        return Files.isDirectory(downloads)?downloads:home;
    }

    private void writeZip(Path zip,Map<String,Object> manifest,String markerName,byte[] marker,String diffName,byte[] diff,Map<String,byte[]> files){
        try(ZipOutputStream z=new ZipOutputStream(Files.newOutputStream(zip,StandardOpenOption.TRUNCATE_EXISTING),StandardCharsets.UTF_8)){
            put(z,"SNAPSHOT.json",(Json.stringify(manifest)+"\n").getBytes(StandardCharsets.UTF_8));
            put(z,markerName,marker);
            if(diffName!=null)put(z,diffName,diff==null?new byte[0]:diff);
            ZipEntry folder=new ZipEntry("snapshot/");folder.setTime(0);z.putNextEntry(folder);z.closeEntry();
            for(Map.Entry<String,byte[]> e:files.entrySet())put(z,"snapshot/"+e.getKey(),e.getValue());
        }catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot write snapshot ZIP: "+e.getMessage(),e);}
    }

    private static void put(ZipOutputStream z,String name,byte[] bytes)throws IOException{ZipEntry e=new ZipEntry(name);e.setTime(0);z.putNextEntry(e);z.write(bytes);z.closeEntry();}

    private static List<String> parseNullStrings(byte[] bytes,String source){
        List<String> out=new ArrayList<>();for(byte[] part:splitNull(bytes))out.add(utf8(part,source));return out;
    }
    private static List<byte[]> splitNull(byte[] bytes){
        List<byte[]> out=new ArrayList<>();int start=0;
        for(int i=0;i<bytes.length;i++)if(bytes[i]==0){if(i>start)out.add(Arrays.copyOfRange(bytes,start,i));start=i+1;}
        if(start<bytes.length)out.add(Arrays.copyOfRange(bytes,start,bytes.length));return out;
    }
    private static String utf8(byte[] bytes,String source){
        try{return StandardCharsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT).onUnmappableCharacter(CodingErrorAction.REPORT).decode(java.nio.ByteBuffer.wrap(bytes)).toString();}
        catch(CharacterCodingException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,source+" returned a non-UTF-8 path.",e);}
    }
    private static String sha256(byte[] bytes){
        try{return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes));}
        catch(NoSuchAlgorithmException e){throw new IllegalStateException(e);}
    }
    private static String repoName(String identity){int slash=identity==null?-1:identity.lastIndexOf('/');String raw=slash>=0?identity.substring(slash+1):"repository";String s=raw.replaceAll("[^A-Za-z0-9._-]+","-").replaceAll("^-+|-+$","");return s.isBlank()?"repository":s;}
    private static String shortSha(String sha){return sha.substring(0,Math.min(8,sha.length()));}
    private static Path uniquePath(Path dir,String filename){Path p=dir.resolve(filename);if(!Files.exists(p))return p;String base=filename.endsWith(".zip")?filename.substring(0,filename.length()-4):filename;for(int i=2;;i++){Path x=dir.resolve(base+"-"+i+".zip");if(!Files.exists(x))return x;}}
    private static Path createTemp(Path dir){try{return Files.createTempFile(dir,".obs-snapshot-",".tmp");}catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot create snapshot temp file: "+e.getMessage(),e);}}
    private static void moveComplete(Path tmp,Path dst){try{try{Files.move(tmp,dst,StandardCopyOption.ATOMIC_MOVE);}catch(AtomicMoveNotSupportedException e){Files.move(tmp,dst);}}catch(IOException e){throw new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,"Cannot publish snapshot ZIP: "+e.getMessage(),e);}}
    private static void delete(Path p){if(p!=null)try{Files.deleteIfExists(p);}catch(IOException ignored){}}
    private static void deleteTree(Path p){if(p==null||!Files.exists(p))return;try(var s=Files.walk(p)){s.sorted(Comparator.reverseOrder()).forEach(x->{try{Files.deleteIfExists(x);}catch(IOException ignored){}});}catch(IOException ignored){}}
    private static Core.ObsException asExport(Throwable t){if(t instanceof Core.ObsException e)return e;return new Core.ObsException(Core.SNAPSHOT_EXPORT_FAILED,t.getMessage()==null?t.toString():t.getMessage(),t);}
    private record LocalState(Map<String,byte[]> files,Map<String,String> hashes){}
}
