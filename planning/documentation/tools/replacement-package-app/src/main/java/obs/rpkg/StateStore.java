package obs.rpkg;

import java.io.IOException;
import java.nio.channels.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

final class StateStore {
    final Path root;
    StateStore(){this(resolveRoot());init();}
    StateStore(Path root){this.root=root.toAbsolutePath().normalize();init();}
    private static Path resolveRoot(){String forced=System.getenv("OBS_REPLACEMENT_PACKAGE_APP_STATE_ROOT");if(forced!=null&&!forced.isBlank())return Path.of(forced);String local=System.getenv("LOCALAPPDATA");if(local!=null&&!local.isBlank())return Path.of(local,"OBS","ReplacementPackageApp");return Path.of(System.getProperty("user.home"),".obs","ReplacementPackageApp");}
    private void init(){try{for(String d:List.of("changesets","attempts","review-diffs","locks"))Files.createDirectories(root.resolve(d));}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot initialize state root: "+e.getMessage(),e);}}

    static final class Lock implements AutoCloseable { final FileChannel channel; final FileLock lock; Lock(FileChannel c,FileLock l){channel=c;lock=l;} public void close(){try{lock.release();}catch(Exception ignored){}try{channel.close();}catch(Exception ignored){}} }
    Lock lock(){try{Path p=root.resolve("locks/state.lock");FileChannel c=FileChannel.open(p,StandardOpenOption.CREATE,StandardOpenOption.WRITE);try{FileLock l=c.tryLock();if(l==null){c.close();throw new Core.ObsException(Core.STATE_DIVERGED,"Another Replacement Package App state mutation is active.");}return new Lock(c,l);}catch(OverlappingFileLockException e){c.close();throw new Core.ObsException(Core.STATE_DIVERGED,"Another Replacement Package App state mutation is active.");}}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot lock application state: "+e.getMessage(),e);}}

    Path changeSetPath(String id){return root.resolve("changesets").resolve(id+".json");}
    Path attemptPath(String id){return root.resolve("attempts").resolve(id+".json");}
    Path reviewDir(String id){return root.resolve("review-diffs").resolve(id);}

    @SuppressWarnings("unchecked") Core.Settings getSettings(){
        Path p=root.resolve("settings.json");
        if(!Files.exists(p)){Core.Settings s=new Core.Settings(List.of(),null,null,"Clipboard");saveSettings(s);return s;}
        Map<String,Object> m=readObject(p);String handling=Core.str(m.get("reviewDiffHandling"));
        if(handling==null||!List.of("Clipboard","RepoDiffFile","Both").contains(handling))throw new Core.ObsException(Core.STATE_DIVERGED,"Invalid settings.json reviewDiffHandling.");
        Object schema=m.get("schemaVersion");int version=schema instanceof Number n?n.intValue():1;
        if(version>=2){
            List<Core.RepositoryConfig> repos=new ArrayList<>();Object rs=m.get("repositories");
            if(rs instanceof List<?> list)for(Object x:list){if(!(x instanceof Map<?,?> raw))throw new Core.ObsException(Core.STATE_DIVERGED,"Invalid repository entry in settings.json.");Map<String,Object> r=(Map<String,Object>)raw;String id=Core.str(r.get("id")),name=Core.str(r.get("name")),path=Core.str(r.get("path")),identity=Core.str(r.get("repositoryIdentity"));if(id==null||id.isBlank()||path==null||path.isBlank())throw new Core.ObsException(Core.STATE_DIVERGED,"Invalid repository entry in settings.json.");repos.add(new Core.RepositoryConfig(id,name==null||name.isBlank()?displayName(path):name,path,identity==null?"":identity));}
            return new Core.Settings(List.copyOf(repos),blankToNull(Core.str(m.get("selectedRepositoryId"))),blankToNull(Core.str(m.get("selectedChangeSetId"))),handling);
        }
        String legacy=Core.str(m.get("repositoryRoot"));
        if(legacy==null||legacy.isBlank())return new Core.Settings(List.of(),null,null,handling);
        String id=UUID.nameUUIDFromBytes(("repository:"+Path.of(legacy).toAbsolutePath().normalize()).getBytes(StandardCharsets.UTF_8)).toString();
        return new Core.Settings(List.of(new Core.RepositoryConfig(id,displayName(legacy),legacy,"")),id,null,handling);
    }

    void saveSettings(Core.Settings s){
        Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",2);List<Object> repos=new ArrayList<>();
        for(Core.RepositoryConfig r:s.repositories()){Map<String,Object>x=new LinkedHashMap<>();x.put("id",r.id());x.put("name",r.name());x.put("path",r.path());x.put("repositoryIdentity",r.repositoryIdentity());repos.add(x);}
        m.put("repositories",repos);m.put("selectedRepositoryId",s.selectedRepositoryId());m.put("selectedChangeSetId",s.selectedChangeSetId());m.put("reviewDiffHandling",s.reviewDiffHandling());writeJson(root.resolve("settings.json"),m);
    }

    Core.ChangeSet getChangeSet(String id){if(id==null||id.isBlank())return null;Path p=changeSetPath(id);return Files.exists(p)?Core.ChangeSet.from(readObject(p)):null;}
    void saveChangeSet(Core.ChangeSet c){writeJson(changeSetPath(c.changeSetId),c.json());}
    List<Core.ChangeSet> getChangeSets(){List<Core.ChangeSet>x=new ArrayList<>();try(DirectoryStream<Path>d=Files.newDirectoryStream(root.resolve("changesets"),"*.json")){for(Path p:d)x.add(Core.ChangeSet.from(readObject(p)));}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot read ChangeSets: "+e.getMessage(),e);}return x;}
    List<Core.ChangeSet> activeChangeSets(){List<Core.ChangeSet>x=new ArrayList<>();for(Core.ChangeSet c:getChangeSets())if("Active".equals(c.status)||"CommittedPendingPush".equals(c.status))x.add(c);return x;}
    void saveAttempt(Core.ApplicationAttempt a){writeJson(attemptPath(a.attemptId),a.json());}
    List<Core.ApplicationAttempt> getAttempts(){List<Path> ps=new ArrayList<>();try(DirectoryStream<Path>d=Files.newDirectoryStream(root.resolve("attempts"),"*.json")){for(Path p:d)ps.add(p);}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot read attempts: "+e.getMessage(),e);}ps.sort(Comparator.comparingLong(this::mtime).reversed());List<Core.ApplicationAttempt>a=new ArrayList<>();for(Path p:ps)a.add(Core.ApplicationAttempt.from(readObject(p)));return a;}
    private long mtime(Path p){try{return Files.getLastModifiedTime(p).toMillis();}catch(IOException e){return 0;}}

    private static String displayName(String path){try{Path p=Path.of(path).toAbsolutePath().normalize();Path n=p.getFileName();return n==null?p.toString():n.toString();}catch(Exception e){return path;}}
    private static String blankToNull(String s){return s==null||s.isBlank()?null:s;}
    @SuppressWarnings("unchecked") private Map<String,Object> readObject(Path p){try{String s=Files.readString(p,StandardCharsets.UTF_8);Object v=Json.parse(s);if(!(v instanceof Map<?,?>))throw new IllegalArgumentException("Expected object");return(Map<String,Object>)v;}catch(Core.ObsException e){throw e;}catch(Exception e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot read JSON state "+p.getFileName()+": "+e.getMessage(),e);}}
    private void writeJson(Path p,Map<String,Object> v){try{Files.createDirectories(p.getParent());Path tmp=p.resolveSibling(p.getFileName()+".tmp-"+UUID.randomUUID());Files.writeString(tmp,Json.stringify(v),StandardCharsets.UTF_8,StandardOpenOption.CREATE_NEW);try{Files.move(tmp,p,StandardCopyOption.ATOMIC_MOVE,StandardCopyOption.REPLACE_EXISTING);}catch(AtomicMoveNotSupportedException e){Files.move(tmp,p,StandardCopyOption.REPLACE_EXISTING);}finally{Files.deleteIfExists(tmp);}}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot persist state "+p.getFileName()+": "+e.getMessage(),e);}}
}
