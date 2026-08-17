package obs.rpkg;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.zip.*;

public final class CoreTests {
    static int passed,failed; static final GitClient git=new GitClient();
    static Path tmp,repo,bare; static Core core; static String rawOrigin="https://github.com/example/testrepo.git",repoId="github:example/testrepo",mainCs;

    public static void main(String[] args) throws Exception {
        tmp=Files.createTempDirectory("obs-rpkg-java-tests-");
        try { setup(); runTests(); }
        finally { deleteTree(tmp); }
        System.out.println("RESULT passed="+passed+" failed="+failed);
        if(failed>0)System.exit(1);
    }

    static void setup() throws Exception {
        repo=tmp.resolve("repo");bare=tmp.resolve("remote.git");Files.createDirectories(repo);
        g(repo,"init","-b","main");g(repo,"config","user.name","OBS Test");g(repo,"config","user.email","obs@example.invalid");g(repo,"config","commit.gpgsign","false");
        write(repo.resolve("replace.txt"),"old");write(repo.resolve("delete.txt"),"gone");g(repo,"add",".");g(repo,"commit","-m","base");
        g(tmp,"init","--bare",bare.toString());g(repo,"remote","add","origin",rawOrigin);g(repo,"config","url."+bare.toUri()+".insteadOf",rawOrigin);
        core=new Core(new StateStore(tmp.resolve("state")));core.registerRepository("Test Repo",repo);
    }

    static void runTests() throws Exception {
        mainCs=UUID.randomUUID().toString();PackageFixture pkg=makePackage(repoId,mainCs,"test changeset",List.of(op("replace.txt","replace","old","new"),op("delete.txt","delete","gone",null),op("add.txt","add",null,"added")));
        test("ACTION_PACKAGE_MISMATCH stops before mutation",()->{String action="OBS-ACTION/1\naction: apply-package\nname: mismatch\narchive: x.zip\npackageId: "+UUID.randomUUID();expect(Core.ACTION_PACKAGE_MISMATCH,()->core.applyAction(action,pkg.path,repo));eq(read(repo.resolve("replace.txt")),"old","mismatch mutated target");});
        test("REPOSITORY_MISMATCH stops before mutation",()->{PackageFixture p=makePackage("github:other/repo",UUID.randomUUID().toString(),"wrong repo",List.of(op("replace.txt","replace","old","bad")));expect(Core.REPOSITORY_MISMATCH,()->core.applyPackage(p.path,repo));eq(read(repo.resolve("replace.txt")),"old","wrong repo mutated target");});
        test("BASE_MISMATCH stops before mutation",()->{PackageFixture p=makePackage(repoId,UUID.randomUUID().toString(),"bad base",List.of(op("replace.txt","replace","not-old","bad")));expect(Core.BASE_MISMATCH,()->core.applyPackage(p.path,repo));eq(read(repo.resolve("replace.txt")),"old","base mismatch mutated target");});
        test("dirty unowned path is not adopted",()->{write(repo.resolve("replace.txt"),"dirty");try{expect(Core.STATE_DIVERGED,()->core.applyPackage(pkg.path,repo));}finally{write(repo.resolve("replace.txt"),"old");}});
        test("apply add replace delete; review includes untracked add; real index untouched",()->{Core.ApplyResult r=core.applyPackage(pkg.path,repo);eq(read(repo.resolve("replace.txt")),"new","replace result");ok(!Files.exists(repo.resolve("delete.txt")),"delete result");eq(read(repo.resolve("add.txt")),"added","add result");ok(Files.readString(r.review().diffPath()).contains("add.txt"),"untracked add absent from ReviewDiff");ok(gAllow(repo,"diff","--cached","--quiet").exitCode()==0,"real index changed");});
        test("path ownership conflict",()->{PackageFixture p=makePackage(repoId,UUID.randomUUID().toString(),"other",List.of(op("replace.txt","replace","new","other")));expect(Core.PATH_OWNERSHIP_CONFLICT,()->core.applyPackage(p.path,repo));});
        test("stale review blocks finalize",()->{write(repo.resolve("replace.txt"),"changed-after-review");try{expect(Core.REVIEW_STALE,()->core.finalizeChangeSet(mainCs,"x",repo));}finally{write(repo.resolve("replace.txt"),"new");}});
        test("clean-index boundary blocks finalize",()->{write(repo.resolve("unrelated.txt"),"staged");g(repo,"add","unrelated.txt");try{expect(Core.FINALIZE_FAILED,()->core.finalizeChangeSet(mainCs,"x",repo));}finally{g(repo,"reset","-q","--","unrelated.txt");Files.deleteIfExists(repo.resolve("unrelated.txt"));}});
        test("changed origin blocks finalize before commit/push",()->{g(repo,"remote","set-url","origin","https://github.com/evil/other.git");try{expect(Core.REPOSITORY_MISMATCH,()->core.finalizeChangeSet(mainCs,"x",repo));}finally{g(repo,"remote","set-url","origin",rawOrigin);}});
        test("finalize uses persisted current review and commits/pushes owned paths",()->{Core.FinalizeResult r=core.finalizeChangeSet(mainCs,"finalize test",repo);eq(r.changeSet().status,"Finalized","not finalized");eq(g(repo,"rev-parse","HEAD").first(),r.commitSha(),"commit mismatch");});
        test("add then delete continuation yields empty review and no-op Finalize",()->{String cs=UUID.randomUUID().toString(),label="net zero";PackageFixture add=makePackage(repoId,cs,label,List.of(op("ephemeral.txt","add",null,"temporary")));core.applyPackage(add.path,repo);PackageFixture del=makePackage(repoId,cs,label,List.of(op("ephemeral.txt","delete","temporary",null)));String headBefore=g(repo,"rev-parse","HEAD").first();Core.ApplyResult r=core.applyPackage(del.path,repo);ok(Files.size(r.review().diffPath())==0,"net-zero ReviewDiff was not empty");Core.FinalizeResult f=core.finalizeChangeSet(cs,"net zero",repo);eq(f.changeSet().status,"Finalized","net-zero ChangeSet not finalized");ok(f.commitSha()==null,"net-zero Finalize created/recorded a commit");eq(g(repo,"rev-parse","HEAD").first(),headBefore,"net-zero Finalize changed HEAD");});
        test("filesystem link escape is rejected before outside mutation",()->{Path outside=tmp.resolve("outside-target"),link=repo.resolve("escape");Files.createDirectories(outside);createEscapeLink(link,outside);try{String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"escape",List.of(op("escape/new.txt","add",null,"outside")));expect(Core.STATE_DIVERGED,()->core.applyPackage(p.path,repo));ok(!Files.exists(outside.resolve("new.txt")),"package mutated path outside repository");}finally{Files.deleteIfExists(link);}});
        test("explicit clipboard copy verifies canonical ReviewDiff and read-back",()->{Path diff=tmp.resolve("clipboard-review.diff");Files.writeString(diff,"diff body\n",StandardCharsets.UTF_8);Core.ReviewDiff r=new Core.ReviewDiff("clipboard",diff,Core.sha256(diff),"head");FakeClipboard clipboard=new FakeClipboard();Core c=new Core(new StateStore(tmp.resolve("clipboard-state")),clipboard);Core.Handoff okCopy=c.copyReviewDiffToClipboard(r);ok(okCopy.warning().isBlank(),"verified clipboard copy warned");eq(clipboard.written,"diff body\n","clipboard received wrong text");clipboard.readBackOverride="different";Core.Handoff badCopy=c.copyReviewDiffToClipboard(r);ok(badCopy.warning().contains("read-back differs"),"clipboard mismatch was not reported");clipboard.readBackOverride=null;Files.writeString(diff,"tampered",StandardCharsets.UTF_8);expect(Core.STATE_DIVERGED,()->c.verifiedReviewDiffPath(r));});
        test("legacy single repository settings migrate to verified allowlist",()->{Path stateRoot=tmp.resolve("legacy-state");Files.createDirectories(stateRoot);Files.writeString(stateRoot.resolve("settings.json"),"{\"schemaVersion\":1,\"repositoryRoot\":"+Json.stringify(repo.toString())+",\"reviewDiffHandling\":\"Clipboard\"}",StandardCharsets.UTF_8);Core c=new Core(new StateStore(stateRoot));Core.Settings settings=c.getSettings();ok(settings.repositories().size()==1,"legacy repository not migrated");Core.RepositoryConfig r=settings.repositories().get(0);eq(r.repositoryIdentity(),repoId,"legacy identity not verified");ok(Path.of(r.path()).equals(repo.toAbsolutePath().normalize()),"legacy path not normalized");Map<String,Object> persisted=Json.object(Files.readString(stateRoot.resolve("settings.json")));eq(((Number)persisted.get("schemaVersion")).intValue(),2,"settings schema not upgraded");});
        test("unregistered repository is rejected before mutation",()->{Path other=tmp.resolve("unregistered");Files.createDirectories(other);g(other,"init","-b","main");g(other,"config","user.name","OBS Test");g(other,"config","user.email","obs@example.invalid");write(other.resolve("x.txt"),"old");g(other,"add",".");g(other,"commit","-m","base");g(other,"remote","add","origin","https://github.com/example/testrepo.git");PackageFixture p=makePackage(repoId,UUID.randomUUID().toString(),"unregistered",List.of(op("x.txt","replace","old","new")));expect(Core.REPOSITORY_MISMATCH,()->core.applyPackage(p.path,other));eq(read(other.resolve("x.txt")),"old","unregistered repository mutated");});
        test("repository set and ChangeSet browser are persisted and scoped",()->{Path second=tmp.resolve("repo-two");Files.createDirectories(second);g(second,"init","-b","main");g(second,"config","user.name","OBS Test");g(second,"config","user.email","obs@example.invalid");write(second.resolve("base.txt"),"base");g(second,"add",".");g(second,"commit","-m","base");g(second,"remote","add","origin","https://github.com/example/second.git");Core.RepositoryConfig r2=core.registerRepository("Second Repo",second);ok(core.getRepositories().size()==2,"second repository not registered");eq(core.getChangeSets(r2.id(),false).size(),0,"ChangeSets leaked across repositories");Core.Settings selected=core.selectRepository(r2.id());eq(selected.selectedRepositoryId(),r2.id(),"selected repository not persisted");Core reloaded=new Core(new StateStore(tmp.resolve("state")));eq(reloaded.getSettings().selectedRepositoryId(),r2.id(),"selected repository lost after reload");core.selectRepository(core.getRepositories().stream().filter(r->Path.of(r.path()).equals(repo.toAbsolutePath().normalize())).findFirst().orElseThrow().id());});
        test("repository with active ChangeSet cannot be removed",()->{write(repo.resolve("keep-active.txt"),"before");g(repo,"add","keep-active.txt");g(repo,"commit","-m","active repo removal base");String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"keep active",List.of(op("keep-active.txt","replace","before","after")));core.applyPackage(p.path,repo);Core.RepositoryConfig primary=core.getRepositories().stream().filter(r->Path.of(r.path()).equals(repo.toAbsolutePath().normalize())).findFirst().orElseThrow();expect(Core.STATE_DIVERGED,()->core.removeRepository(primary.id()));ok(core.getRepositories().stream().anyMatch(r->r.id().equals(primary.id())),"active repository was removed");});
        test("current ReviewDiff restores from ledger and refresh replaces persisted identity",()->{String cs=UUID.randomUUID().toString();write(repo.resolve("restore.txt"),"before");g(repo,"add","restore.txt");g(repo,"commit","-m","restore base");PackageFixture p=makePackage(repoId,cs,"restore review",List.of(op("restore.txt","replace","before","after")));Core.ApplyResult ar=core.applyPackage(p.path,repo);Core.ChangeSet saved=core.getChangeSet(cs);Core.ReviewDiff restored=core.currentReview(saved);eq(restored.sha256(),ar.review().sha256(),"restored review SHA differs");Core.ReviewDiff refreshed=core.refreshReview(cs);Core.ChangeSet after=core.getChangeSet(cs);eq(after.currentReviewSha256,refreshed.sha256(),"refresh did not persist current review");eq(after.currentReviewAttemptId,refreshed.attemptId(),"refresh attempt id not persisted");Files.writeString(refreshed.diffPath(),"tampered",StandardCharsets.UTF_8);expect(Core.STATE_DIVERGED,()->core.currentReview(core.getChangeSet(cs)));});
        test("local repository snapshot contains root metadata/diff and Git-visible working tree without touching real index",()->{
            Files.createDirectories(tmp.resolve("snapshot-exports"));
            SnapshotRepo s=snapshotRepo("snapshot-local","https://github.com/example/snapshot-local.git");
            String base=g(s.repo,"rev-parse","HEAD").first();
            write(s.repo.resolve("tracked.txt"),"working");
            Files.delete(s.repo.resolve("delete.txt"));
            write(s.repo.resolve("untracked.txt"),"untracked");
            write(s.repo.resolve("skip.ignored"),"ignored");
            write(s.repo.resolve("staged.txt"),"staged");g(s.repo,"add","staged.txt");
            byte[] indexBefore=git.bytes(s.repo,Core.STATE_DIVERGED,"--no-pager","diff","--cached","--binary","HEAD").output();
            Core.SnapshotExportResult r=s.core.exportRepositorySnapshot(s.repo,"local",null,tmp.resolve("snapshot-exports"));
            byte[] indexAfter=git.bytes(s.repo,Core.STATE_DIVERGED,"--no-pager","diff","--cached","--binary","HEAD").output();
            ok(Arrays.equals(indexBefore,indexAfter),"local snapshot changed real Git index");
            Map<String,byte[]> z=zipEntries(r.zipPath());
            ok(z.containsKey("SNAPSHOT.json")&&z.containsKey("BASE-COMMIT.txt")&&z.containsKey("WORKING-TREE.diff"),"local root metadata missing");
            eq(new String(z.get("BASE-COMMIT.txt"),StandardCharsets.UTF_8).trim(),base,"local base commit marker mismatch");
            eq(new String(z.get("snapshot/tracked.txt"),StandardCharsets.UTF_8),"working","local tracked bytes wrong");
            eq(new String(z.get("snapshot/untracked.txt"),StandardCharsets.UTF_8),"untracked","local untracked bytes missing");
            eq(new String(z.get("snapshot/staged.txt"),StandardCharsets.UTF_8),"staged","local staged working file missing");
            ok(!z.containsKey("snapshot/delete.txt"),"deleted tracked file present in snapshot folder");
            ok(!z.containsKey("snapshot/skip.ignored"),"ignored untracked file present in snapshot");
            ok(z.keySet().stream().noneMatch(x->x.startsWith("snapshot/.git/")),".git leaked into snapshot");
            String diff=new String(z.get("WORKING-TREE.diff"),StandardCharsets.UTF_8);
            ok(diff.contains("tracked.txt")&&diff.contains("delete.txt")&&diff.contains("untracked.txt")&&diff.contains("staged.txt"),"local diff does not describe exported working tree");
            Map<String,Object> manifest=Json.object(new String(z.get("SNAPSHOT.json"),StandardCharsets.UTF_8));
            eq(manifest.get("snapshotType"),"local","wrong local snapshot type");eq(manifest.get("baseCommitSha"),base,"manifest base commit mismatch");eq(manifest.get("snapshotFolder"),"snapshot/","snapshot folder contract mismatch");
        });
        test("committed repository snapshot uses selected commit object database and COMMIT marker",()->{
            SnapshotRepo s=snapshotRepo("snapshot-commit","https://github.com/example/snapshot-commit.git");
            String first=g(s.repo,"rev-parse","HEAD").first();
            write(s.repo.resolve("tracked.txt"),"second");g(s.repo,"add","tracked.txt");g(s.repo,"commit","-m","second");
            write(s.repo.resolve("tracked.txt"),"dirty working tree");write(s.repo.resolve("local-only.txt"),"local");
            Core.SnapshotExportResult r=s.core.exportRepositorySnapshot(s.repo,"committed",first,tmp.resolve("snapshot-exports"));
            Map<String,byte[]> z=zipEntries(r.zipPath());
            ok(z.containsKey("SNAPSHOT.json")&&z.containsKey("COMMIT.txt"),"committed root metadata missing");
            ok(!z.containsKey("WORKING-TREE.diff")&&!z.containsKey("BASE-COMMIT.txt"),"local-only metadata leaked into committed snapshot");
            eq(new String(z.get("COMMIT.txt"),StandardCharsets.UTF_8).trim(),first,"COMMIT marker mismatch");
            eq(new String(z.get("snapshot/tracked.txt"),StandardCharsets.UTF_8),"base","committed snapshot used working tree bytes");
            ok(!z.containsKey("snapshot/local-only.txt"),"committed snapshot included local-only file");
            ok(Arrays.equals(z.get("snapshot/binary.bin"),new byte[]{0,1,2,(byte)255}),"committed binary blob changed");
            Map<String,Object> manifest=Json.object(new String(z.get("SNAPSHOT.json"),StandardCharsets.UTF_8));
            eq(manifest.get("snapshotType"),"committed","wrong committed snapshot type");eq(manifest.get("commitSha"),first,"manifest commit mismatch");
        });
        test("snapshot export requires registered repository and unchanged origin",()->{
            SnapshotRepo s=snapshotRepo("snapshot-origin","https://github.com/example/snapshot-origin.git");
            Core unregistered=new Core(new StateStore(tmp.resolve("snapshot-unregistered-state")));
            expect(Core.REPOSITORY_MISMATCH,()->unregistered.exportRepositorySnapshot(s.repo,"local",null,tmp.resolve("snapshot-exports")));
            g(s.repo,"remote","set-url","origin","https://github.com/evil/other.git");
            try{expect(Core.REPOSITORY_MISMATCH,()->s.core.exportRepositorySnapshot(s.repo,"local",null,tmp.resolve("snapshot-exports")));}finally{g(s.repo,"remote","set-url","origin","https://github.com/example/snapshot-origin.git");}
        });
        test("snapshot output directory inside repository is rejected",()->{
            SnapshotRepo s=snapshotRepo("snapshot-output","https://github.com/example/snapshot-output.git");
            expect(Core.SNAPSHOT_EXPORT_FAILED,()->s.core.exportRepositorySnapshot(s.repo,"local",null,s.repo.resolve("exports")));
            ok(!Files.exists(s.repo.resolve("exports")),"rejected output directory was created inside repository");
        });
        test("snapshot output alias into repository is rejected before creating a child",()->{
            SnapshotRepo s=snapshotRepo("snapshot-output-alias","https://github.com/example/snapshot-output-alias.git");
            Path target=s.repo.resolve("aliased-output-target"),alias=tmp.resolve("snapshot-output-alias-link"),child=alias.resolve("new-output");
            Files.createDirectories(target);createEscapeLink(alias,target);
            try{expect(Core.SNAPSHOT_EXPORT_FAILED,()->s.core.exportRepositorySnapshot(s.repo,"local",null,child));ok(!Files.exists(target.resolve("new-output")),"rejected output alias created a directory inside repository");}
            finally{Files.deleteIfExists(alias);}
        });
        test("local snapshot detects working tree change during capture",()->{
            SnapshotRepo s=snapshotRepo("snapshot-race","https://github.com/example/snapshot-race.git");Path out=tmp.resolve("snapshot-race-out");Files.createDirectories(out);
            RepositorySnapshotExporter exporter=new RepositorySnapshotExporter(git,()->{try{write(s.repo.resolve("tracked.txt"),"changed-during-export");}catch(Exception e){throw new RuntimeException(e);}});
            expect(Core.SNAPSHOT_EXPORT_FAILED,()->exporter.export(s.repo,s.identity,"local",null,out));
            try(DirectoryStream<Path>d=Files.newDirectoryStream(out,"*.zip")){ok(!d.iterator().hasNext(),"race export published a final ZIP");}
        });
        test("local snapshot rejects HEAD change even when working tree bytes stay stable",()->{
            SnapshotRepo s=snapshotRepo("snapshot-head-race","https://github.com/example/snapshot-head-race.git");Path out=tmp.resolve("snapshot-head-race-out");Files.createDirectories(out);String before=g(s.repo,"rev-parse","HEAD").first();
            RepositorySnapshotExporter exporter=new RepositorySnapshotExporter(git,()->g(s.repo,"commit","--allow-empty","-m","head drift during export"));
            expect(Core.SNAPSHOT_EXPORT_FAILED,()->exporter.export(s.repo,s.identity,"local",null,out));
            ok(!g(s.repo,"rev-parse","HEAD").first().equals(before),"test hook did not change HEAD");
            try(DirectoryStream<Path>d=Files.newDirectoryStream(out,"*.zip")){ok(!d.iterator().hasNext(),"HEAD-race export published a final ZIP");}
        });
        test("snapshot path clipboard copy is verified but clipboard failure does not affect created ZIP",()->{
            SnapshotRepo s=snapshotRepo("snapshot-clipboard","https://github.com/example/snapshot-clipboard.git");
            Core.SnapshotExportResult r=s.core.exportRepositorySnapshot(s.repo,"committed","HEAD",tmp.resolve("snapshot-exports"));
            FakeClipboard clipboard=new FakeClipboard();Core c=new Core(new StateStore(tmp.resolve("snapshot-copy-state")),clipboard);
            Core.Handoff okCopy=c.copyPathToClipboard(r.zipPath());ok(okCopy.warning().isBlank(),"path clipboard copy warned");eq(clipboard.written,r.zipPath().toAbsolutePath().normalize().toString(),"clipboard path differs");
            clipboard.readBackOverride="different";Core.Handoff bad=c.copyPathToClipboard(r.zipPath());ok(bad.warning().contains("read-back differs"),"path clipboard mismatch not reported");
            Core failing=new Core(new StateStore(tmp.resolve("snapshot-copy-fail-state")),new FailingClipboard());Core.Handoff failed=failing.copyPathToClipboard(r.zipPath());ok(failed.warning().contains("Clipboard handoff failed"),"clipboard failure not surfaced");ok(Files.isRegularFile(r.zipPath()),"clipboard failure removed successful snapshot ZIP");
        });
        test("post-commit clipboard handoff failure remains SUCCESS",()->{write(repo.resolve("handoff.txt"),"before");g(repo,"add","handoff.txt");g(repo,"commit","-m","handoff base");String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"handoff warning",List.of(op("handoff.txt","replace","before","after")));Core failing=new Core(new StateStore(tmp.resolve("state")),new FailingClipboard());Core.ApplyResult r=failing.applyPackage(p.path,repo);eq(r.code(),Core.SUCCESS,"handoff failure changed Apply result");eq(read(repo.resolve("handoff.txt")),"after","successful target rolled back");ok(failing.getChangeSet(cs)!=null&&failing.getChangeSet(cs).status.equals("Active"),"successful ChangeSet missing");ok(r.attempt().handoffWarning.contains("Clipboard handoff failed"),"handoff warning not surfaced");long success=failing.getAttempts().stream().filter(a->p.packageId.equals(a.packageId)&&"SUCCESS".equals(a.result)).count();ok(success==1,"persisted attempt was not SUCCESS");});
        test("post-mutation required-state failure rolls files and ChangeSet back",()->{write(repo.resolve("rollback.txt"),"before");g(repo,"add","rollback.txt");g(repo,"commit","-m","rollback base");String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"rollback test",List.of(op("rollback.txt","replace","before","after")));core.setAfterMutationHookForTests(()->{throw new Core.ObsException(Core.RESULT_MISMATCH,"forced after mutation");});try{expect(Core.RESULT_MISMATCH,()->core.applyPackage(p.path,repo));}finally{core.setAfterMutationHookForTests(null);}eq(read(repo.resolve("rollback.txt")),"before","target did not rollback");ok(core.getChangeSet(cs)==null,"new ChangeSet survived failed transaction");});
        test("push failure records one pending commit; changed origin blocks Retry; restored transport retries without second commit",()->{write(repo.resolve("push.txt"),"before");g(repo,"add","push.txt");g(repo,"commit","-m","push base");String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"push recovery",List.of(op("push.txt","replace","before","after")));Core.ApplyResult ar=core.applyPackage(p.path,repo);Path offline=tmp.resolve("remote.git.offline");Files.move(bare,offline);try{expect(Core.FINALIZE_FAILED,()->core.finalizeChangeSet(cs,"pending push",repo));}finally{Files.move(offline,bare);}Core.ChangeSet pending=core.getChangeSet(cs);eq(pending.status,"CommittedPendingPush","pending state missing");String commit=pending.commitSha;g(repo,"remote","set-url","origin","https://github.com/evil/other.git");try{expect(Core.REPOSITORY_MISMATCH,()->core.retryPush(cs,repo));}finally{g(repo,"remote","set-url","origin",rawOrigin);}Core.FinalizeResult rr=core.retryPush(cs,repo);eq(rr.changeSet().status,"Finalized","retry did not finalize");eq(rr.commitSha(),commit,"retry changed commit");eq(g(repo,"rev-parse","HEAD").first(),commit,"HEAD changed during retry");});
        test("explicit ignored add in missing parent is reviewed and finalized",()->{
            Path ignore=repo.resolve(".gitignore");String prior=Files.exists(ignore)?Files.readString(ignore,StandardCharsets.UTF_8):"";Files.writeString(ignore,prior+(prior.endsWith("\n")||prior.isEmpty()?"":"\n")+"*.ignored\n",StandardCharsets.UTF_8);g(repo,"add",".gitignore");g(repo,"commit","-m","ignored-owned fixture");
            String path="missing-owned-parent/deep.ignored";ok(gAllow(repo,"check-ignore","-q",path).exitCode()==0,"fixture path is not ignored");ok(!Files.exists(repo.resolve("missing-owned-parent")),"fixture parent unexpectedly exists");
            String cs=UUID.randomUUID().toString();PackageFixture p=makePackage(repoId,cs,"ignored owned add",List.of(op(path,"add",null,"owned ignored bytes")));
            Core.ApplyResult applied=core.applyPackage(p.path,repo);ok(Files.readString(applied.review().diffPath()).contains(path),"ignored owned add absent from ReviewDiff");ok(gAllow(repo,"diff","--cached","--quiet").exitCode()==0,"Apply changed real index for ignored owned add");
            Core.FinalizeResult finalized=core.finalizeChangeSet(cs,"finalize ignored owned add",repo);eq(finalized.changeSet().status,"Finalized","ignored owned add did not finalize");eq(g(repo,"show","HEAD:"+path).joined(),"owned ignored bytes","ignored owned file was not committed");
        });
        test("pre-existing ignored unowned add replace and delete are rejected",()->{
            for(String action:List.of("add","replace","delete")){
                String path="preexisting-"+action+".ignored";write(repo.resolve(path),"before");ok(gAllow(repo,"check-ignore","-q",path).exitCode()==0,"fixture path not ignored: "+path);
                Op operation=action.equals("add")?op(path,"add",null,"new"):action.equals("replace")?op(path,"replace","before","after"):op(path,"delete","before",null);
                PackageFixture p=makePackage(repoId,UUID.randomUUID().toString(),"ignored unowned "+action,List.of(operation));expect(Core.STATE_DIVERGED,()->core.applyPackage(p.path,repo));eq(read(repo.resolve(path)),"before","ignored unowned path mutated: "+action);Files.delete(repo.resolve(path));
            }
        });
        test("traversal path rejected",()->{PackageFixture p=makePackage(repoId,UUID.randomUUID().toString(),"bad",List.of(op("../evil.txt","add",null,"x")));expect(Core.PACKAGE_INVALID,()->core.readPackage(p.path));});
    }

    record SnapshotRepo(Path repo,Core core,String identity){}
    static SnapshotRepo snapshotRepo(String name,String origin)throws Exception{
        Path r=tmp.resolve(name);Files.createDirectories(r);g(r,"init","-b","main");g(r,"config","user.name","OBS Test");g(r,"config","user.email","obs@example.invalid");g(r,"config","commit.gpgsign","false");
        write(r.resolve("tracked.txt"),"base");write(r.resolve("delete.txt"),"delete-me");write(r.resolve(".gitignore"),"*.ignored\n");Files.write(r.resolve("binary.bin"),new byte[]{0,1,2,(byte)255});
        g(r,"add",".");g(r,"commit","-m","snapshot base");g(r,"remote","add","origin",origin);
        String identity=origin.replaceFirst("^https://github\\.com/","github:").replaceFirst("\\.git$","");
        Core c=new Core(new StateStore(tmp.resolve(name+"-state")));c.registerRepository(name,r);return new SnapshotRepo(r,c,identity);
    }
    static Map<String,byte[]> zipEntries(Path zip)throws Exception{Map<String,byte[]>m=new LinkedHashMap<>();try(ZipFile z=new ZipFile(zip.toFile(),StandardCharsets.UTF_8)){Enumeration<? extends ZipEntry> e=z.entries();while(e.hasMoreElements()){ZipEntry x=e.nextElement();if(x.isDirectory()){m.put(x.getName(),new byte[0]);continue;}try(InputStream in=z.getInputStream(x)){m.put(x.getName(),in.readAllBytes());}}}return m;}

    record Op(String path,String action,String base,String replacement){}
    record PackageFixture(Path path,String packageId){}
    static Op op(String p,String a,String b,String r){return new Op(p,a,b,r);}
    static PackageFixture makePackage(String rid,String cs,String label,List<Op> ops) throws Exception {String packageId=UUID.randomUUID().toString();Path zip=tmp.resolve("pkg-"+packageId+".zip");Map<String,Object> manifest=new LinkedHashMap<>();manifest.put("schemaVersion",1);manifest.put("packageId",packageId);manifest.put("changeSetId",cs);manifest.put("changeSetLabel",label);manifest.put("repositoryIdentity",rid);List<Object> oo=new ArrayList<>();for(Op o:ops){Map<String,Object> m=new LinkedHashMap<>();m.put("path",o.path);m.put("action",o.action);oo.add(m);}manifest.put("operations",oo);try(ZipOutputStream z=new ZipOutputStream(Files.newOutputStream(zip),StandardCharsets.UTF_8)){entry(z,"PACKAGE.json",Json.stringify(manifest).getBytes(StandardCharsets.UTF_8));for(Op o:ops){if(o.base!=null)entry(z,"base-files/"+o.path,o.base.getBytes(StandardCharsets.UTF_8));if(o.replacement!=null)entry(z,"replacement-files/"+o.path,o.replacement.getBytes(StandardCharsets.UTF_8));}}return new PackageFixture(zip,packageId);}
    static void entry(ZipOutputStream z,String name,byte[] data)throws Exception{ZipEntry e=new ZipEntry(name);z.putNextEntry(e);z.write(data);z.closeEntry();}

    static final class FakeClipboard implements Core.ClipboardAccess {String written="",readBackOverride;public void setText(String text){written=text;}public String getText(){return readBackOverride==null?written:readBackOverride;}}
    static final class FailingClipboard implements Core.ClipboardAccess {public void setText(String text){}public String getText(){throw new RuntimeException("clipboard unavailable");}}

    interface Throwing{void run()throws Exception;}
    static void test(String name,Throwing f){try{f.run();passed++;System.out.println("PASS "+name);}catch(Throwable e){failed++;System.out.println("FAIL "+name+" :: "+e);if(Boolean.getBoolean("obs.tests.stack"))e.printStackTrace(System.out);}}
    static void expect(String code,Throwing f)throws Exception{try{f.run();throw new AssertionError("expected "+code+", got success");}catch(Core.ObsException e){if(!e.code.equals(code))throw new AssertionError("expected "+code+", got ["+e.code+"] "+e.getMessage());}}
    static void ok(boolean v,String m){if(!v)throw new AssertionError(m);}static void eq(Object a,Object b,String m){if(!Objects.equals(a,b))throw new AssertionError(m+" expected="+b+" actual="+a);}
    static void write(Path p,String s)throws Exception{Files.createDirectories(p.getParent());Files.writeString(p,s,StandardCharsets.UTF_8,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);}static String read(Path p)throws Exception{return Files.readString(p,StandardCharsets.UTF_8);}
    static void createEscapeLink(Path link,Path target)throws Exception{try{Files.createSymbolicLink(link,target);}catch(UnsupportedOperationException|FileSystemException e){if(!System.getProperty("os.name","").toLowerCase(Locale.ROOT).contains("win"))throw e;Process p=new ProcessBuilder("cmd.exe","/d","/c","mklink","/J",link.toString(),target.toString()).redirectErrorStream(true).start();String out=new String(p.getInputStream().readAllBytes(),StandardCharsets.UTF_8);if(p.waitFor()!=0)throw new AssertionError("cannot create Windows junction: "+out);}}
    static GitClient.Result g(Path cwd,String...args){return git.run(cwd,Core.STATE_DIVERGED,args);}static GitClient.Result gAllow(Path cwd,String...args){return git.allow(cwd,Core.STATE_DIVERGED,args);}
    static void deleteTree(Path p){if(p==null||!Files.exists(p))return;try(var s=Files.walk(p)){s.sorted(Comparator.reverseOrder()).forEach(x->{try{Files.deleteIfExists(x);}catch(Exception ignored){}});}catch(Exception ignored){}}
}
