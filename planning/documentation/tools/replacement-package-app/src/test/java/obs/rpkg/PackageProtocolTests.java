package obs.rpkg;

import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/** Target schema-1 consumer-contract proof independent of legacy ChangeSet behavior. */
public final class PackageProtocolTests {
    private static int passed, failed;

    public static void main(String[] args) {
        run("valid add replace delete payload parses", PackageProtocolTests::validPayloads);
        run("traversal and absolute operation paths are rejected", PackageProtocolTests::badPaths);
        run("case-colliding operation paths are rejected", PackageProtocolTests::caseCollision);
        run("undeclared payload is rejected", PackageProtocolTests::undeclaredPayload);
        run("add base payload is rejected", PackageProtocolTests::addBaseRejected);
        run("replace missing side is rejected", PackageProtocolTests::replaceMissingRejected);
        run("delete replacement payload is rejected", PackageProtocolTests::deleteReplacementRejected);
        run("case-colliding ZIP entries are rejected", PackageProtocolTests::zipEntryCollision);
        run("workIntent identity mismatch is rejected", PackageProtocolTests::workIntentMismatch);
        System.out.println("RESULT passed="+passed+" failed="+failed);
        if(failed>0)System.exit(1);
    }

    private static void validPayloads() throws Exception {
        Path root=Files.createTempDirectory("rpkg-protocol-valid-");
        try {
            String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();
            Path zip=root.resolve("valid.zip");
            List<Map<String,String>> ops=List.of(op("a.txt","add"),op("r.txt","replace"),op("d.txt","delete"));
            Map<String,byte[]> files=new LinkedHashMap<>();
            files.put("replacement-files/a.txt",b("A"));
            files.put("base-files/r.txt",b("R0"));files.put("replacement-files/r.txt",b("R1"));
            files.put("base-files/d.txt",b("D"));
            writeZip(zip,manifest(pkg,work,ops,null),files,List.of());
            Core.PackageData data=new Core().readPackage(zip);
            eq(data.manifest().operations().size(),3,"operation count");
            eq(new String(data.replacement().get("a.txt"),StandardCharsets.UTF_8),"A","add bytes");
            eq(new String(data.base().get("r.txt"),StandardCharsets.UTF_8),"R0","replace base");
            ok(data.replacement().get("d.txt")==null,"delete gained replacement");
        } finally { delete(root); }
    }

    private static void badPaths() throws Exception {
        for(String path:List.of("../evil.txt","/abs.txt","C:/abs.txt","a/../../evil")) {
            Path root=Files.createTempDirectory("rpkg-protocol-path-");
            try {
                String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();
                Path zip=root.resolve("bad.zip");
                writeZip(zip,manifest(pkg,work,List.of(op(path,"add")),null),Map.of("replacement-files/"+path,b("X")),List.of());
                expectInvalid(() -> new Core().readPackage(zip));
            } finally { delete(root); }
        }
    }

    private static void caseCollision() throws Exception {
        Path root=Files.createTempDirectory("rpkg-protocol-case-");
        try {
            String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();
            Path zip=root.resolve("case.zip");
            writeZip(zip,manifest(pkg,work,List.of(op("A.txt","add"),op("a.txt","add")),null),
                    Map.of("replacement-files/A.txt",b("A"),"replacement-files/a.txt",b("a")),List.of());
            expectInvalid(() -> new Core().readPackage(zip));
        } finally { delete(root); }
    }

    private static void undeclaredPayload() throws Exception {
        Path root=Files.createTempDirectory("rpkg-protocol-extra-");
        try {
            String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();Path zip=root.resolve("extra.zip");
            writeZip(zip,manifest(pkg,work,List.of(op("a.txt","add")),null),
                    Map.of("replacement-files/a.txt",b("A"),"replacement-files/extra.txt",b("X")),List.of());
            expectInvalid(() -> new Core().readPackage(zip));
        } finally { delete(root); }
    }

    private static void addBaseRejected() throws Exception {
        invalidPayload(List.of(op("a.txt","add")),Map.of("base-files/a.txt",b("OLD"),"replacement-files/a.txt",b("NEW")));
    }
    private static void replaceMissingRejected() throws Exception {
        invalidPayload(List.of(op("r.txt","replace")),Map.of("replacement-files/r.txt",b("NEW")));
    }
    private static void deleteReplacementRejected() throws Exception {
        invalidPayload(List.of(op("d.txt","delete")),Map.of("base-files/d.txt",b("OLD"),"replacement-files/d.txt",b("NEW")));
    }

    private static void zipEntryCollision() throws Exception {
        Path root=Files.createTempDirectory("rpkg-protocol-zipcase-");
        try {
            String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();Path zip=root.resolve("zipcase.zip");
            writeZip(zip,manifest(pkg,work,List.of(op("a.txt","add")),null),Map.of("replacement-files/a.txt",b("A")),
                    List.of(Map.entry("Replacement-Files/a.txt",b("B"))));
            expectInvalid(() -> new Core().readPackage(zip));
        } finally { delete(root); }
    }

    private static void workIntentMismatch() throws Exception {
        Path root=Files.createTempDirectory("rpkg-protocol-intent-");
        try {
            String work=UUID.randomUUID().toString(),other=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();Path zip=root.resolve("intent.zip");
            writeZip(zip,manifest(pkg,work,List.of(op("a.txt","add")),other),Map.of("replacement-files/a.txt",b("A")),List.of());
            expectInvalid(() -> new Core().readPackage(zip));
        } finally { delete(root); }
    }

    private static void invalidPayload(List<Map<String,String>> ops,Map<String,byte[]> files)throws Exception{
        Path root=Files.createTempDirectory("rpkg-protocol-payload-");
        try{String work=UUID.randomUUID().toString(),pkg=UUID.randomUUID().toString();Path zip=root.resolve("bad.zip");writeZip(zip,manifest(pkg,work,ops,null),files,List.of());expectInvalid(()->new Core().readPackage(zip));}finally{delete(root);}
    }

    private static Map<String,Object> manifest(String pkg,String work,List<Map<String,String>> ops,String intentWork){
        Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("packageId",pkg);m.put("changeSetId",work);m.put("changeSetLabel","protocol test");m.put("repositoryIdentity","github:example/testrepo");
        Map<String,Object> wi=new LinkedHashMap<>();wi.put("schemaVersion",1);wi.put("changeSetId",intentWork==null?work:intentWork);wi.put("repositoryIdentity","github:example/testrepo");wi.put("title","protocol test");wi.put("goal","prove protocol");wi.put("why","target contract");wi.put("acceptance",List.of("valid"));m.put("workIntent",wi);m.put("operations",ops);return m;
    }
    private static Map<String,String> op(String path,String action){Map<String,String>m=new LinkedHashMap<>();m.put("path",path);m.put("action",action);return m;}
    private static byte[] b(String s){return s.getBytes(StandardCharsets.UTF_8);}
    private static void writeZip(Path zip,Map<String,Object> manifest,Map<String,byte[]> files,List<Map.Entry<String,byte[]>> extras)throws Exception{
        try(ZipOutputStream out=new ZipOutputStream(Files.newOutputStream(zip),StandardCharsets.UTF_8)){entry(out,"PACKAGE.json",Json.stringify(manifest).getBytes(StandardCharsets.UTF_8));for(var e:files.entrySet())entry(out,e.getKey(),e.getValue());for(var e:extras)entry(out,e.getKey(),e.getValue());}
    }
    private static void entry(ZipOutputStream out,String name,byte[] bytes)throws Exception{out.putNextEntry(new ZipEntry(name));out.write(bytes);out.closeEntry();}
    private static void expectInvalid(Throwing body){try{body.run();throw new AssertionError("expected PACKAGE_INVALID");}catch(Core.ObsException e){eq(e.code,Core.PACKAGE_INVALID,"error code");}catch(Exception e){throw new AssertionError(e);}}
    private static void delete(Path root)throws Exception{if(root==null||!Files.exists(root))return;try(var w=Files.walk(root)){for(Path p:w.sorted(Comparator.reverseOrder()).toList())Files.deleteIfExists(p);}}
    private interface Throwing{void run()throws Exception;}
    private static void run(String n,Throwing b){try{b.run();passed++;System.out.println("PASS "+n);}catch(Throwable t){failed++;System.out.println("FAIL "+n+" :: "+t);if(Boolean.getBoolean("obs.tests.stack"))t.printStackTrace(System.out);}}
    private static void ok(boolean v,String m){if(!v)throw new AssertionError(m);}private static void eq(Object a,Object e,String m){if(!Objects.equals(a,e))throw new AssertionError(m+" expected="+e+" actual="+a);}
}
