package obs.rpkg.features.apply;

import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

import obs.rpkg.ApplyFeatureTestSupport;
import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.domain.WorkId;

/** Target file-applicability proof for the active package protocol. */
public final class PackageApplicabilityTests {
    private static int passed,failed;
    public static void main(String[] args){
        run("exact add replace delete mutates only declared paths",PackageApplicabilityTests::exactOperations);
        run("Git-equivalent CRLF source is accepted",PackageApplicabilityTests::gitEquivalentSource);
        run("binary source divergence fails closed",PackageApplicabilityTests::binaryDivergence);
        run("add target already present fails closed",PackageApplicabilityTests::addTargetExists);
        run("failed add retry cannot become Applied from unproven journal",PackageApplicabilityTests::failedAddRetryRemainsFailure);
        run("failed delete retry cannot become Applied from unproven journal",PackageApplicabilityTests::failedDeleteRetryRemainsFailure);
        run("failed replace retry cannot become Applied from unproven journal",PackageApplicabilityTests::failedReplaceRetryRemainsFailure);
        run("unproven journal never restores externally changed bytes",PackageApplicabilityTests::unprovenJournalDoesNotRestore);
        run("Git clean-filter failure is source-state unverifiable",PackageApplicabilityTests::cleanFilterFailureIsUnverifiable);
        System.out.println("RESULT passed="+passed+" failed="+failed);if(failed>0)System.exit(1);
    }

    private static void exactOperations()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-ops",false);
        try{
            Files.writeString(w.repository().resolve("delete.txt"),"delete",StandardCharsets.UTF_8);ApplyFeatureTestSupport.git(w.repository(),"add","delete.txt");ApplyFeatureTestSupport.git(w.repository(),"commit","-m","add delete fixture");ApplyFeatureTestSupport.git(w.repository(),"push","origin","main:refs/heads/main");
            String id=UUID.randomUUID().toString();var ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"ops",List.of(
                    new ApplyFeatureTestSupport.Op("add.txt","add",null,"added"),
                    new ApplyFeatureTestSupport.Op("seed.txt","replace","seed","replaced"),
                    new ApplyFeatureTestSupport.Op("delete.txt","delete","delete",null)));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(Files.readString(ws.worktree().resolve("add.txt")),"added","add bytes");eq(Files.readString(ws.worktree().resolve("seed.txt")),"replaced","replace bytes");ok(!Files.exists(ws.worktree().resolve("delete.txt")),"delete remained");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void gitEquivalentSource()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-eol",false);
        try{
            ApplyFeatureTestSupport.git(w.repository(),"config","core.autocrlf","true");Files.writeString(w.repository().resolve(".gitattributes"),"eol.txt text\n",StandardCharsets.UTF_8);Files.writeString(w.repository().resolve("eol.txt"),"line1\nline2\n",StandardCharsets.UTF_8);ApplyFeatureTestSupport.git(w.repository(),"add",".");ApplyFeatureTestSupport.git(w.repository(),"commit","-m","eol fixture");ApplyFeatureTestSupport.git(w.repository(),"push","origin","main:refs/heads/main");
            String id=UUID.randomUUID().toString();var ws=start(w,id);Files.writeString(ws.worktree().resolve("eol.txt"),"line1\r\nline2\r\n",StandardCharsets.UTF_8);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"eol",List.of(ApplyFeatureTestSupport.replace("eol.txt","line1\nline2\n","changed\n")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));eq(Files.readString(ws.worktree().resolve("eol.txt")),"changed\n","replacement bytes");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void binaryDivergence()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-binary",false);
        try{
            Files.write(w.repository().resolve("binary.dat"),new byte[]{0,65});ApplyFeatureTestSupport.git(w.repository(),"add","binary.dat");ApplyFeatureTestSupport.git(w.repository(),"commit","-m","binary fixture");ApplyFeatureTestSupport.git(w.repository(),"push","origin","main:refs/heads/main");
            String id=UUID.randomUUID().toString();var ws=start(w,id);String wrong="\0X",next="\0B";var pkg=ApplyFeatureTestSupport.packageFor(w,id,"binary",List.of(ApplyFeatureTestSupport.replace("binary.dat",wrong,next)));
            ApplyFailure f=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));eq(f.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"binary divergence code");ok(Arrays.equals(Files.readAllBytes(ws.worktree().resolve("binary.dat")),new byte[]{0,65}),"binary target mutated");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void addTargetExists()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-add",false);
        try{String id=UUID.randomUUID().toString();var ws=start(w,id);var pkg=ApplyFeatureTestSupport.packageFor(w,id,"add exists",List.of(new ApplyFeatureTestSupport.Op("seed.txt","add",null,"new")));ApplyFailure f=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));eq(f.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"add exists code");eq(Files.readString(ws.worktree().resolve("seed.txt")),"seed","add existing mutated target");}finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }


    private static void failedAddRetryRemainsFailure()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-add-retry",false);
        try{
            String id=UUID.randomUUID().toString();var ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"add retry",List.of(new ApplyFeatureTestSupport.Op("seed.txt","add",null,"seed")));
            ApplyFailure first=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(first.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"first add failure code");
            ApplyFailure retry=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"retry converted failed add into success");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"failed add retry persisted Applied state");
            eq(Files.readString(ws.worktree().resolve("seed.txt")),"seed","failed add retry mutated target");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void failedDeleteRetryRemainsFailure()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-delete-retry",false);
        try{
            String id=UUID.randomUUID().toString();start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"delete retry",List.of(new ApplyFeatureTestSupport.Op("missing.txt","delete","expected",null)));
            ApplyFailure first=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(first.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"first delete failure code");
            ApplyFailure retry=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"retry converted failed delete into success");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"failed delete retry persisted Applied state");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void failedReplaceRetryRemainsFailure()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-replace-retry",false);
        try{
            String id=UUID.randomUUID().toString();var ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"replace retry",List.of(ApplyFeatureTestSupport.replace("seed.txt","different-base","seed")));
            ApplyFailure first=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(first.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"first replace failure code");
            ApplyFailure retry=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.EXPECTED_SOURCE_CHANGED,"retry converted failed replace into success");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"failed replace retry persisted Applied state");
            eq(Files.readString(ws.worktree().resolve("seed.txt")),"seed","failed replace retry mutated target");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void unprovenJournalDoesNotRestore()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-unproven-no-restore",false);
        try{
            String id=UUID.randomUUID().toString();var ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"unproven no restore",List.of(ApplyFeatureTestSupport.replace("seed.txt","different-base","seed")));
            failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            Files.writeString(ws.worktree().resolve("seed.txt"),"manual",StandardCharsets.UTF_8);
            ApplyFailure retry=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.STATE_DIVERGED,"unproven journal accepted changed bytes");
            eq(Files.readString(ws.worktree().resolve("seed.txt")),"manual","unproven journal restored bytes without applicability authority");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"unproven journal created Applied state");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static void cleanFilterFailureIsUnverifiable()throws Exception{
        var w=ApplyFeatureTestSupport.workspace("applicability-filter",false);
        try{
            ApplyFeatureTestSupport.git(w.repository(),"config","filter.broken.clean","cat");
            ApplyFeatureTestSupport.git(w.repository(),"config","filter.broken.smudge","cat");
            ApplyFeatureTestSupport.git(w.repository(),"config","filter.broken.required","true");
            Files.writeString(w.repository().resolve(".gitattributes"),"seed.txt filter=broken\n",StandardCharsets.UTF_8);
            ApplyFeatureTestSupport.git(w.repository(),"add",".gitattributes");
            ApplyFeatureTestSupport.git(w.repository(),"commit","-m","filter fixture");
            ApplyFeatureTestSupport.git(w.repository(),"push","origin","main:refs/heads/main");
            String id=UUID.randomUUID().toString();var ws=start(w,id);
            ApplyFeatureTestSupport.git(w.repository(),"config","filter.broken.clean","false");
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"filter failure",List.of(ApplyFeatureTestSupport.replace("seed.txt","different-base","next")));
            ApplyFailure failure=failure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(failure.code(),ApplyFailureCode.EXPECTED_SOURCE_UNVERIFIABLE,"clean-filter failure code");
            eq(Files.readString(ws.worktree().resolve("seed.txt")),"seed","unverifiable source mutated target");
        }finally{ApplyFeatureTestSupport.deleteTree(w.root());}
    }

    private static obs.rpkg.work.domain.GitWorkspace start(ApplyFeatureTestSupport.Workspace w,String id){var r=w.start().execute(w.target(),new WorkId(id),"main");if(r.isFailure())throw new AssertionError(r.failure().orElseThrow().message());return r.success().orElseThrow().workspace();}
    private static ReplacementPackageState success(Result<ReplacementPackageState,ApplyFailure> r){if(r.isFailure())throw new AssertionError(r.failure().orElseThrow());return r.success().orElseThrow();}
    private static ApplyFailure failure(Result<ReplacementPackageState,ApplyFailure> r){if(r.isSuccess())throw new AssertionError("expected Apply failure");return r.failure().orElseThrow();}
    private interface Throwing{void run()throws Exception;}private static void run(String n,Throwing b){try{b.run();passed++;System.out.println("PASS "+n);}catch(Throwable t){failed++;System.out.println("FAIL "+n+" :: "+t);if(Boolean.getBoolean("obs.tests.stack"))t.printStackTrace(System.out);}}private static void ok(boolean v,String m){if(!v)throw new AssertionError(m);}private static void eq(Object a,Object e,String m){if(!Objects.equals(a,e))throw new AssertionError(m+" expected="+e+" actual="+a);}
}
