package obs.rpkg;

import javax.swing.*;
import java.nio.file.*;
import java.util.*;

import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.application.AutomaticPackageRealization;
import obs.rpkg.features.apply.application.CommitAppliedPackage;
import obs.rpkg.features.apply.application.PublishAppliedCommit;
import obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository;
import obs.rpkg.features.apply.infrastructure.GitPublicationObserver;
import obs.rpkg.work.application.StartWorkWorkspace;
import obs.rpkg.work.infrastructure.FileGitWorkspaceRepository;
import obs.rpkg.work.domain.WorkId;

public final class Main {
    public static void main(String[] args) {
        if (args.length == 0 || args[0].equalsIgnoreCase("ui")) {
            SwingUtilities.invokeLater(() -> new MainWindow(new Core()).setVisible(true));
            return;
        }
        try {
            Core core = new Core();
            Runtime runtime = runtime(core);
            Map<String,String> a = parse(args);
            switch (args[0]) {
                case "start-workspace" -> {
                    Core.RepositoryConfig repo = repository(core, req(a,"repo-id"));
                    var result = runtime.start().execute(repo, new WorkId(req(a,"work-id")), req(a,"target-branch"));
                    if (result.isFailure()) fail("WORKSPACE_FAILED", result.failure().orElseThrow().message());
                    var ws=result.success().orElseThrow().workspace();
                    System.out.println("SUCCESS workId="+ws.workId()+" branch="+ws.workBranch()+" baseCommit="+ws.baseCommit()+" worktree="+ws.worktree());
                }
                case "apply" -> {
                    var result=runtime.apply().execute(new ApplyReplacementPackage.Request(path(a,"archive"),req(a,"work-id")));
                    if(result.isFailure()){var f=result.failure().orElseThrow();fail(f.code().name(),f.message());}
                    var state=result.success().orElseThrow();
                    System.out.println("SUCCESS workId="+state.workId()+" packageId="+state.packageIdentity().packageId()+" state=Applied");
                }
                case "commit" -> {
                    var result=runtime.commit().execute(req(a,"work-id"),req(a,"package-id"));
                    if(result.isFailure()){var f=result.failure().orElseThrow();fail(f.code().name(),f.message());}
                    var state=result.success().orElseThrow();
                    System.out.println("SUCCESS workId="+state.workId()+" packageId="+state.packageIdentity().packageId()+" commit="+state.commitSha());
                }
                case "publish", "retry-publish" -> {
                    var result=runtime.publish().execute(req(a,"work-id"),req(a,"package-id"));
                    if(result.isFailure()){var f=result.failure().orElseThrow();fail(f.code().name(),f.message());}
                    var state=result.success().orElseThrow();
                    System.out.println("SUCCESS workId="+state.workId()+" packageId="+state.packageIdentity().packageId()+" published="+state.commitSha());
                }
                case "run-action" -> {
                    String text=Files.readString(path(a,"action-file"));
                    Path archive=a.containsKey("archive")?path(a,"archive"):null;
                    var result=runtime.automatic().execute(text,archive,a.get("repo-id"));
                    if(result.isFailure()){var f=result.failure().orElseThrow();fail(f.code(),f.message());}
                    var done=result.success().orElseThrow();
                    System.out.print(Core.formatApplyReceipt(new Core.ApplyReceipt(
                            "applied", done.state().packageIdentity().packageId(), done.workspace().workId().value(), null, null)));
                    System.out.println("SUCCESS workId="+done.workspace().workId()+" packageId="+done.state().packageIdentity().packageId()+" published="+done.state().commitSha());
                }
                case "create-work-intent" -> {
                    String text=Files.readString(path(a,"action-file"));
                    var r=core.executeCreateWorkIntentAction(text);
                    System.out.println("SUCCESS workId="+r.changeSetId()+" issue="+r.issueNumber()+(r.issueUrl()==null?"":" url="+r.issueUrl()));
                }
                case "settings" -> {
                    if(a.containsKey("repo")){Core.RepositoryConfig r=core.registerRepository(a.get("name"),path(a,"repo"));core.selectRepository(r.id());System.out.println("SUCCESS repository="+r.name()+" identity="+r.repositoryIdentity()+" path="+r.path()+" id="+r.id());}
                    else System.out.println("SUCCESS repositories="+core.getRepositories().size());
                }
                case "list-repos" -> {for(Core.RepositoryConfig r:core.getRepositories())System.out.println(r.id()+"\t"+r.name()+"\t"+r.repositoryIdentity()+"\t"+r.path());}
                case "export-snapshot" -> {
                    Path repo=Path.of(req(a,"repo"));
                    Path out=a.containsKey("output-dir")?Path.of(a.get("output-dir")):RepositorySnapshotExporter.defaultOutputDirectory();
                    Core.SnapshotExportResult r=core.exportRepositorySnapshot(repo,req(a,"mode"),a.get("commit"),out);
                    System.out.println("SUCCESS snapshot="+r.zipPath().toAbsolutePath().normalize()+" mode="+r.snapshotType());
                }
                default -> usage();
            }
        } catch (CliFailure e) {
            System.err.println("["+e.code+"] "+e.getMessage());
            System.exit(2);
        } catch (Core.ObsException e) {
            System.err.println("["+e.code+"] "+e.getMessage());
            System.exit(2);
        } catch (Exception e) {
            e.printStackTrace(System.err);System.exit(3);
        }
    }

    private static Runtime runtime(Core core) {
        Path root=FileReplacementPackageStateRepository.defaultAppStateRoot();
        var states=new FileReplacementPackageStateRepository(root);
        var workspaces=new FileGitWorkspaceRepository(root);
        var mechanics=new WorkPackageRuntime(root);
        var start=new StartWorkWorkspace(mechanics,workspaces,states);
        var apply=new ApplyReplacementPackage(core,workspaces,states,mechanics);
        var commit=new CommitAppliedPackage(workspaces,states,mechanics);
        var publish=new PublishAppliedCommit(workspaces,states,new GitPublicationObserver(),mechanics);
        var automatic=new AutomaticPackageRealization(core,start,apply,commit,publish);
        return new Runtime(start,apply,commit,publish,automatic);
    }

    private record Runtime(StartWorkWorkspace start,ApplyReplacementPackage apply,CommitAppliedPackage commit,PublishAppliedCommit publish,AutomaticPackageRealization automatic){}
    private static Core.RepositoryConfig repository(Core core,String id){for(Core.RepositoryConfig r:core.getRepositories())if(r.id().equals(id))return r;throw new Core.ObsException(Core.REPOSITORY_MISMATCH,"Unknown registered repository: "+id);}
    private static Map<String,String> parse(String[] args){Map<String,String>m=new LinkedHashMap<>();for(int i=1;i<args.length;i++){String k=args[i];if(!k.startsWith("--")||i+1>=args.length)throw new IllegalArgumentException("Expected --key value");m.put(k.substring(2),args[++i]);}return m;}
    private static String req(Map<String,String>m,String k){String v=m.get(k);if(v==null||v.isBlank())throw new IllegalArgumentException("Missing --"+k);return v;}
    private static Path path(Map<String,String>m,String k){String v=req(m,k);return Path.of(v);}
    private static void fail(String code,String message){throw new CliFailure(code,message);}
    private static void usage(){System.out.println("Usage: java -jar replacement-package-app.jar [ui|start-workspace|apply|commit|publish|retry-publish|run-action|create-work-intent|settings|list-repos|export-snapshot] ...");}
    private static final class CliFailure extends RuntimeException{final String code;CliFailure(String code,String message){super(message);this.code=code;}}
}
