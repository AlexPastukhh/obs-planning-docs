package obs.rpkg;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.application.CommitAppliedPackage;
import obs.rpkg.features.apply.application.PublishAppliedCommit;
import obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository;
import obs.rpkg.features.apply.infrastructure.GitPublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.work.application.StartWorkWorkspace;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.infrastructure.FileGitWorkspaceRepository;
import obs.rpkg.work.infrastructure.FileWorkOperationLock;

/** Target-runtime feature-test support. No test setup creates Core.ChangeSet. */
public final class ApplyFeatureTestSupport {
    public static final String RAW_ORIGIN = "https://github.com/example/testrepo.git";
    public static final String SSH_ORIGIN = "git@github.com:example/testrepo.git";
    public static final String REPOSITORY_IDENTITY = "github:example/testrepo";

    private ApplyFeatureTestSupport() {}

    public record Workspace(
            Path root,
            Path repository,
            Path stateRoot,
            Path remote,
            Core core,
            Core.RepositoryConfig target,
            ReplacementPackageStateRepository states,
            GitWorkspaceRepository workspaces,
            WorkOperationLock workLocks,
            WorkPackageRuntime mechanics,
            StartWorkWorkspace start,
            ApplyReplacementPackage apply,
            CommitAppliedPackage commit,
            PublishAppliedCommit publish) {}

    public record PackageFixture(Path path, String packageId) {}
    public record Op(String path, String action, String base, String replacement) {}

    public static Workspace workspace(String name, boolean withRemote) throws Exception {
        Path root = Files.createTempDirectory("obs-rpkg-" + name + "-");
        Path repo = root.resolve("repo");
        Path stateRoot = root.resolve("state");
        Files.createDirectories(repo);
        git(repo, "init", "-b", "main");
        git(repo, "config", "user.name", "OBS Test");
        git(repo, "config", "user.email", "obs@example.invalid");
        git(repo, "config", "commit.gpgsign", "false");
        write(repo.resolve("seed.txt"), "seed");
        git(repo, "add", ".");
        git(repo, "commit", "-m", "base");

        Path remote = root.resolve("remote.git");
        git(root, "init", "--bare", remote.toString());
        git(repo, "remote", "add", "origin", SSH_ORIGIN);
        configureFakeSsh(root, repo, remote);
        git(repo, "push", "-u", "origin", "main:refs/heads/main");

        Core core = new Core(new StateStore(stateRoot), new FakeIssues());
        Core.RepositoryConfig target = core.registerRepository(name, repo);
        WorkOperationLock workLocks = new FileWorkOperationLock(stateRoot);
        ReplacementPackageStateRepository states = new FileReplacementPackageStateRepository(stateRoot, workLocks);
        GitWorkspaceRepository workspaces = new FileGitWorkspaceRepository(stateRoot);
        WorkPackageRuntime mechanics = new WorkPackageRuntime(stateRoot);
        StartWorkWorkspace start = new StartWorkWorkspace(mechanics, workspaces, workLocks);
        ApplyReplacementPackage apply = new ApplyReplacementPackage(core, workspaces, states, workLocks, mechanics);
        CommitAppliedPackage commit = new CommitAppliedPackage(workspaces, states, workLocks, mechanics);
        PublishAppliedCommit publish = new PublishAppliedCommit(workspaces, states, workLocks, new GitPublicationObserver(mechanics.transport()), mechanics);
        return new Workspace(root, repo, stateRoot, remote, core, target, states, workspaces, workLocks, mechanics, start, apply, commit, publish);
    }

    private static final class FakeIssues implements Core.GitHubIssues {
        private final Map<Integer,Core.GitHubIssue> issues = new LinkedHashMap<>();
        private int next = 1;
        @Override public List<Core.GitHubIssue> findByChangeSetId(String repositoryIdentity, String changeSetId) {
            String marker = "ChangeSet-Id: " + changeSetId;
            return issues.values().stream().filter(i -> i.body()!=null && i.body().contains(marker)).toList();
        }
        @Override public Core.GitHubIssue get(String repositoryIdentity, int issueNumber) {
            Core.GitHubIssue issue=issues.get(issueNumber); if(issue==null)throw new Core.ObsException(Core.WORK_INTENT_FAILED,"Unknown fake issue"); return issue;
        }
        @Override public Core.GitHubIssue create(String repositoryIdentity, String title, String body) {
            int n=next++; Core.GitHubIssue issue=new Core.GitHubIssue(n,title,body,"https://github.com/example/testrepo/issues/"+n,"open");issues.put(n,issue);return issue;
        }
        @Override public Core.GitHubIssue update(String repositoryIdentity, int issueNumber, String title, String body) {
            Core.GitHubIssue prior=get(repositoryIdentity,issueNumber);Core.GitHubIssue issue=new Core.GitHubIssue(issueNumber,title,body,prior.url(),prior.state());issues.put(issueNumber,issue);return issue;
        }
    }

    private static void configureFakeSsh(Path root, Path repository, Path remote) throws Exception {
        Path script = root.resolve("fake-ssh-transport.sh");
        write(script, "#!/bin/sh\n"
                + "repo=\"$1\"\n"
                + "shift\n"
                + "last=\"\"\n"
                + "for arg in \"$@\"; do last=\"$arg\"; done\n"
                + "case \"$last\" in\n"
                + "  *git-upload-pack*) exec git-upload-pack \"$repo\" ;;\n"
                + "  *git-receive-pack*) exec git-receive-pack \"$repo\" ;;\n"
                + "  *) exit 1 ;;\n"
                + "esac\n");
        String command = "sh " + shellQuote(script.toString()) + " " + shellQuote(remote.toString());
        git(repository, "config", "core.sshCommand", command);
    }

    private static String shellQuote(String value) { return "'" + value.replace("'", "'\"'\"'") + "'"; }

    public static PackageFixture packageFor(Workspace workspace, String workId, String label, List<Op> operations) throws Exception {
        return packageWithId(workspace, UUID.randomUUID().toString(), workId, label, operations);
    }

    public static PackageFixture packageWithId(Workspace workspace, String packageId, String workId, String label, List<Op> operations) throws Exception {
        return packageWithIdAndRepositoryIdentity(workspace,packageId,workId,label,REPOSITORY_IDENTITY,operations);
    }

    public static PackageFixture packageForRepositoryIdentity(Workspace workspace,String workId,String label,String repositoryIdentity,List<Op> operations) throws Exception {
        return packageWithIdAndRepositoryIdentity(workspace,UUID.randomUUID().toString(),workId,label,repositoryIdentity,operations);
    }

    private static PackageFixture packageWithIdAndRepositoryIdentity(Workspace workspace, String packageId, String workId, String label, String repositoryIdentity, List<Op> operations) throws Exception {
        Path zip = workspace.root().resolve("pkg-" + packageId + "-" + UUID.randomUUID() + ".zip");
        Map<String,Object> manifest = new LinkedHashMap<>();
        manifest.put("schemaVersion", 1);
        manifest.put("packageId", packageId);
        manifest.put("changeSetId", workId);
        manifest.put("changeSetLabel", label);
        manifest.put("repositoryIdentity", repositoryIdentity);
        Map<String,Object> intent = new LinkedHashMap<>();
        intent.put("schemaVersion",1);intent.put("changeSetId",workId);intent.put("repositoryIdentity",repositoryIdentity);
        intent.put("title",label);intent.put("goal","Implement "+label);intent.put("why","Target runtime fixture");intent.put("acceptance",List.of("Exact package state is proven."));
        manifest.put("workIntent", intent);
        List<Object> manifestOps = new ArrayList<>();
        for (Op op : operations) { Map<String,Object> entry=new LinkedHashMap<>();entry.put("path",op.path());entry.put("action",op.action());manifestOps.add(entry); }
        manifest.put("operations", manifestOps);
        try (ZipOutputStream out = new ZipOutputStream(Files.newOutputStream(zip), StandardCharsets.UTF_8)) {
            zipEntry(out, "PACKAGE.json", Json.stringify(manifest).getBytes(StandardCharsets.UTF_8));
            for (Op op : operations) {
                if (op.base()!=null) zipEntry(out,"base-files/"+op.path(),op.base().getBytes(StandardCharsets.UTF_8));
                if (op.replacement()!=null) zipEntry(out,"replacement-files/"+op.path(),op.replacement().getBytes(StandardCharsets.UTF_8));
            }
        }
        return new PackageFixture(zip, packageId);
    }

    public static String actionFor(PackageFixture pkg) {
        return "OBS-ACTION/1\n"
                + "action: apply-package\n"
                + "name: automatic target runtime\n"
                + "archive: " + pkg.path().getFileName() + "\n"
                + "packageId: " + pkg.packageId() + "\n"
                + "targetBranch: main\n";
    }

    public static Op replace(String path, String base, String replacement) { return new Op(path,"replace",base,replacement); }

    public static String git(Path cwd, String... args) throws Exception {
        List<String> cmd = new ArrayList<>();cmd.add("git");cmd.add("-C");cmd.add(cwd.toString());cmd.addAll(List.of(args));
        Process process=new ProcessBuilder(cmd).redirectErrorStream(true).start();String output=new String(process.getInputStream().readAllBytes(),StandardCharsets.UTF_8);int exit=process.waitFor();
        if(exit!=0)throw new AssertionError("git failed: "+String.join(" ",cmd)+"\n"+output);return output.strip();
    }

    public static String remoteTip(Workspace workspace, String branch) throws Exception {
        Process process=new ProcessBuilder("git","-C",workspace.repository().toString(),"ls-remote","--heads","origin","refs/heads/"+branch).redirectErrorStream(true).start();
        String output=new String(process.getInputStream().readAllBytes(),StandardCharsets.UTF_8).strip();int exit=process.waitFor();if(exit!=0)throw new AssertionError("remote lookup failed: "+output);if(output.isBlank())return null;return output.split("\\s+")[0];
    }

    public static Path makeRemoteUnavailableAfterPush(Workspace workspace) {
        if(workspace.remote()==null)throw new IllegalArgumentException("remote fixture is required");Path offline=workspace.root().resolve("remote.git.offline");
        workspace.mechanics().setAfterPushAttemptHookForTests(() -> { try{Files.move(workspace.remote(),offline);}catch(IOException e){throw new RuntimeException(e);} });
        return offline;
    }
    public static void restoreRemote(Workspace workspace, Path offline) throws Exception { workspace.mechanics().setAfterPushAttemptHookForTests(null);if(offline!=null&&Files.exists(offline)&&!Files.exists(workspace.remote()))Files.move(offline,workspace.remote()); }
    public static void failIfAnotherPushIsAttempted(Workspace workspace) { workspace.mechanics().setAfterPushAttemptHookForTests(() -> { throw new AssertionError("Unexpected push attempt"); }); }
    public static void clearPushHook(Workspace workspace) { workspace.mechanics().setAfterPushAttemptHookForTests(null); }

    public static String createUnexpectedRemoteTip(Workspace workspace, String workBranch) throws Exception {
        write(workspace.repository().resolve("external.txt"),"external");git(workspace.repository(),"add","external.txt");git(workspace.repository(),"commit","-m","external remote move");String commit=git(workspace.repository(),"rev-parse","HEAD");git(workspace.repository(),"push","origin",commit+":refs/heads/"+workBranch);return commit;
    }
    public static void pushCommitExternally(Workspace workspace, String workBranch, String commit) throws Exception { git(workspace.repository(),"push","origin",commit+":refs/heads/"+workBranch); }

    public static String advanceRemoteMainKeepingLocalStale(Workspace workspace) throws Exception {
        String localBase=git(workspace.repository(),"rev-parse","refs/heads/main");
        write(workspace.repository().resolve("remote-source.txt"),"remote-source");
        git(workspace.repository(),"add","remote-source.txt");
        git(workspace.repository(),"commit","-m","advance remote source");
        String remoteTip=git(workspace.repository(),"rev-parse","HEAD");
        git(workspace.repository(),"push","origin","HEAD:refs/heads/main");
        git(workspace.repository(),"reset","--hard",localBase);
        return remoteTip;
    }

    public static void setForeignPushUrl(Workspace workspace) throws Exception {
        git(workspace.repository(),"remote","set-url","--push","origin","git@github.com:foreign/repo.git");
    }

    public static Path newBareRemote(Workspace workspace,String name) throws Exception { Path bare=workspace.root().resolve(name);git(workspace.root(),"init","--bare",bare.toString());return bare; }
    public static void setOriginUrlUnchecked(Workspace workspace,String url) { try{git(workspace.repository(),"remote","set-url","origin",url);}catch(Exception e){throw new RuntimeException(e);} }
    public static void setPushUrlUnchecked(Workspace workspace,String url) { try{git(workspace.repository(),"remote","set-url","--push","origin",url);}catch(Exception e){throw new RuntimeException(e);} }
    public static void setInsteadOfRewriteUnchecked(Workspace workspace,Path destination) {
        try { git(workspace.repository(),"config","url."+destination.toUri()+".insteadOf",SSH_ORIGIN); }
        catch(Exception e){throw new RuntimeException(e);}
    }
    public static void setPushInsteadOfRewriteUnchecked(Workspace workspace,Path destination) {
        try { git(workspace.repository(),"config","url."+destination.toUri()+".pushInsteadOf",SSH_ORIGIN); }
        catch(Exception e){throw new RuntimeException(e);}
    }
    public static String bareRemoteTip(Path bare,String branch) throws Exception { Process p=new ProcessBuilder("git","--git-dir",bare.toString(),"rev-parse","--verify","refs/heads/"+branch).redirectErrorStream(true).start();String out=new String(p.getInputStream().readAllBytes(),StandardCharsets.UTF_8).strip();int code=p.waitFor();return code==0?out:null; }

    public static Path packageJournalPath(Workspace workspace,String workId,String packageId) {
        return workspace.stateRoot().resolve("work-state-v2").resolve("package-apply-journals")
                .resolve("w-"+workId).resolve("p-"+packageId+".properties");
    }

    public static void corruptJournalIntendedBytesAndWorktree(Workspace workspace,String workId,String packageId,Path worktree,String text) throws Exception {
        Path journal=packageJournalPath(workspace,workId,packageId);
        Properties p=new Properties();
        try(var in=Files.newInputStream(journal)){p.load(in);}
        p.setProperty("entry.0.intendedBase64",Base64.getEncoder().encodeToString(text.getBytes(StandardCharsets.UTF_8)));
        try(var out=Files.newOutputStream(journal,StandardOpenOption.TRUNCATE_EXISTING)){p.store(out,"corrupted test journal");}
        write(worktree.resolve("seed.txt"),text);
    }

    public static void setPackageJournalSchemaVersion(Workspace workspace,String workId,String packageId,String version) throws Exception {
        Path journal=packageJournalPath(workspace,workId,packageId);Properties p=new Properties();
        try(var in=Files.newInputStream(journal)){p.load(in);}
        p.setProperty("schemaVersion",version);
        try(var out=Files.newOutputStream(journal,StandardOpenOption.TRUNCATE_EXISTING)){p.store(out,"schema migration test");}
    }

    public static String read(Path path) throws IOException { return Files.readString(path,StandardCharsets.UTF_8); }
    public static void overwritePackage(PackageFixture fixture, Workspace workspace, String workId, String replacement) throws Exception {
        PackageFixture other=packageWithId(workspace,fixture.packageId(),workId,"mutated archive",List.of(replace("seed.txt","seed",replacement)));
        Files.copy(other.path(),fixture.path(),StandardCopyOption.REPLACE_EXISTING);
    }

    public static void deleteTree(Path path) { if(path==null||!Files.exists(path))return;try(var walk=Files.walk(path)){walk.sorted(Comparator.reverseOrder()).forEach(p->{try{Files.deleteIfExists(p);}catch(IOException ignored){}});}catch(IOException ignored){} }
    private static void write(Path path,String value)throws IOException{Files.createDirectories(path.getParent());Files.writeString(path,value,StandardCharsets.UTF_8);}
    private static void zipEntry(ZipOutputStream out,String name,byte[] bytes)throws IOException{out.putNextEntry(new ZipEntry(name));out.write(bytes);out.closeEntry();}
}
