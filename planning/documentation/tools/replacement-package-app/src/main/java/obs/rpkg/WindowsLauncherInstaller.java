package obs.rpkg;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.Duration;
import java.util.*;

final class WindowsLauncherInstaller {
    static final String APP_NAME="Replacement Package App";
    private static final String APP_VERSION="1.0.0";
    private static final Duration PACKAGE_TIMEOUT=Duration.ofMinutes(4);

    record Result(Path exePath,Path installDirectory,boolean replacedExisting,String warning) {}
    @FunctionalInterface interface InstalledVerifier { void verify(Path exe) throws IOException; }
    @FunctionalInterface interface TreeCleaner { void clean(Path root) throws IOException; }

    static boolean isWindows(){return System.getProperty("os.name","").toLowerCase(Locale.ROOT).contains("win");}

    static Path defaultLauncherRoot(){
        String local=System.getenv("LOCALAPPDATA");
        Path state=(local!=null&&!local.isBlank())?Path.of(local,"OBS","ReplacementPackageApp"):Path.of(System.getProperty("user.home"),".obs","ReplacementPackageApp");
        return state.toAbsolutePath().normalize().resolve("launcher");
    }

    static Path installedExePath(){return defaultLauncherRoot().resolve(APP_NAME).resolve(APP_NAME+".exe");}

    static boolean installed(){return Files.isRegularFile(installedExePath(),LinkOption.NOFOLLOW_LINKS);}

    static Result installCurrentJar() throws Exception {
        if(!isWindows())throw new IOException("Windows launcher installation is available only on Windows.");
        Path jar=currentJar();Path root=defaultLauncherRoot();
        if(jar.startsWith(root))throw new IOException("This app is already running from the installed Windows launcher. Start the source app once to install an updated launcher build.");
        Path jpackage=findJpackage();return install(jpackage,jar,root);
    }

    static Path currentJar() throws IOException,URISyntaxException {
        Path location=Path.of(Main.class.getProtectionDomain().getCodeSource().getLocation().toURI()).toAbsolutePath().normalize();
        if(!Files.isRegularFile(location,LinkOption.NOFOLLOW_LINKS)||!location.getFileName().toString().toLowerCase(Locale.ROOT).endsWith(".jar"))throw new IOException("The current app is not running from a built JAR. Start it with run-app.cmd, then install the Windows launcher.");
        return location;
    }

    static Path findJpackage() throws IOException,InterruptedException {
        LinkedHashSet<Path> candidates=new LinkedHashSet<>();String home=System.getProperty("java.home");if(home!=null&&!home.isBlank())candidates.add(Path.of(home,"bin","jpackage.exe"));String javaHome=System.getenv("JAVA_HOME");if(javaHome!=null&&!javaHome.isBlank())candidates.add(Path.of(javaHome,"bin","jpackage.exe"));
        for(Path p:candidates)if(Files.isRegularFile(p,LinkOption.NOFOLLOW_LINKS))return p.toAbsolutePath().normalize();
        Process probe=new ProcessBuilder("jpackage.exe","--version").redirectErrorStream(true).start();boolean done=probe.waitFor(10,java.util.concurrent.TimeUnit.SECONDS);if(!done){probe.destroyForcibly();throw new IOException("jpackage check timed out. Install/use JDK 21 and make jpackage available.");}if(probe.exitValue()==0)return Path.of("jpackage.exe");
        throw new IOException("jpackage.exe was not found. A full JDK 21 is required to create the pinnable Windows app.");
    }

    static List<String> command(Path jpackage,Path stagedJar,Path destination){
        return List.of(jpackage.toString(),"--type","app-image","--name",APP_NAME,"--dest",destination.toString(),"--input",stagedJar.getParent().toString(),"--main-jar",stagedJar.getFileName().toString(),"--main-class","obs.rpkg.Main","--app-version",APP_VERSION,"--vendor","OBS");
    }

    static Result install(Path jpackage,Path jar,Path launcherRoot) throws Exception {
        Objects.requireNonNull(jpackage);Objects.requireNonNull(jar);Objects.requireNonNull(launcherRoot);
        jar=jar.toAbsolutePath().normalize();launcherRoot=launcherRoot.toAbsolutePath().normalize();if(!Files.isRegularFile(jar,LinkOption.NOFOLLOW_LINKS))throw new IOException("Built app JAR is unavailable: "+jar);
        Files.createDirectories(launcherRoot);Path work=Files.createTempDirectory(launcherRoot,"build-");Path input=Files.createDirectories(work.resolve("input")),dest=Files.createDirectories(work.resolve("dest"));Path staged=input.resolve("replacement-package-app.jar");Files.copy(jar,staged,StandardCopyOption.REPLACE_EXISTING);
        Path generated=dest.resolve(APP_NAME);
        try{
            ProcessBuilder pb=new ProcessBuilder(command(jpackage,staged,dest));pb.redirectErrorStream(true);Process p=pb.start();ByteArrayOutputStream out=new ByteArrayOutputStream();Thread reader=new Thread(()->{try(InputStream in=p.getInputStream()){in.transferTo(out);}catch(IOException ignored){}});reader.setDaemon(true);reader.start();boolean done=p.waitFor(PACKAGE_TIMEOUT.toSeconds(),java.util.concurrent.TimeUnit.SECONDS);if(!done){p.destroyForcibly();throw new IOException("jpackage timed out while creating the Windows app image.");}reader.join(3000);if(p.exitValue()!=0)throw new IOException("jpackage failed: "+compact(out.toString(StandardCharsets.UTF_8)));
            Path generatedExe=generated.resolve(APP_NAME+".exe");requireInstalledExe(generatedExe,"jpackage completed but the expected launcher executable was not created.");
            return commitGeneratedImage(generated,launcherRoot,exe->requireInstalledExe(exe,"Installed launcher verification failed."),WindowsLauncherInstaller::deleteTree);
        }finally{try{deleteTree(work);}catch(Throwable ignored){}}
    }

    static Result commitGeneratedImage(Path generated,Path launcherRoot,InstalledVerifier verifier,TreeCleaner backupCleaner) throws IOException {
        Objects.requireNonNull(generated);Objects.requireNonNull(launcherRoot);Objects.requireNonNull(verifier);Objects.requireNonNull(backupCleaner);
        generated=generated.toAbsolutePath().normalize();launcherRoot=launcherRoot.toAbsolutePath().normalize();Path target=launcherRoot.resolve(APP_NAME),backup=launcherRoot.resolve(APP_NAME+".backup-"+UUID.randomUUID());boolean hadTarget=Files.exists(target,LinkOption.NOFOLLOW_LINKS),movedOld=false,movedNew=false;
        try{
            if(hadTarget){Files.move(target,backup);movedOld=true;}
            Files.move(generated,target);movedNew=true;Path exe=target.resolve(APP_NAME+".exe");verifier.verify(exe);
            String warning=null;if(movedOld)try{backupCleaner.clean(backup);}catch(IOException cleanup){warning="Launcher updated, but the previous launcher backup could not be removed: "+compact(cleanup.getMessage());}
            return new Result(exe,target,hadTarget,warning);
        }catch(Throwable failure){
            Throwable rollbackFailure=null;
            if(movedNew&&Files.exists(target,LinkOption.NOFOLLOW_LINKS))try{deleteTree(target);}catch(Throwable rollback){rollbackFailure=rollback;}
            if(movedOld&&Files.exists(backup,LinkOption.NOFOLLOW_LINKS)&&!Files.exists(target,LinkOption.NOFOLLOW_LINKS))try{Files.move(backup,target);}catch(Throwable rollback){if(rollbackFailure==null)rollbackFailure=rollback;else rollbackFailure.addSuppressed(rollback);}
            if(rollbackFailure!=null){IOException e=new IOException("Windows launcher update failed and the previous launcher could not be restored automatically.",failure);e.addSuppressed(rollbackFailure);throw e;}
            if(failure instanceof IOException e)throw e;if(failure instanceof RuntimeException e)throw e;throw new IOException(failure);
        }
    }

    private static void requireInstalledExe(Path exe,String message)throws IOException{if(!Files.isRegularFile(exe,LinkOption.NOFOLLOW_LINKS))throw new IOException(message);}

    static void openInstallFolder() throws IOException {
        Path exe=installedExePath();Path folder=exe.getParent();if(folder==null||!Files.isDirectory(folder))throw new IOException("Windows launcher is not installed yet.");if(!java.awt.Desktop.isDesktopSupported()||!java.awt.Desktop.getDesktop().isSupported(java.awt.Desktop.Action.OPEN))throw new IOException("Desktop folder opening is unavailable.");java.awt.Desktop.getDesktop().open(folder.toFile());
    }

    private static String compact(String s){String v=s==null?"":s.strip().replaceAll("\\s+"," ");return v.length()<=800?v:v.substring(0,800)+"…";}
    private static void deleteTree(Path root)throws IOException{if(root==null||!Files.exists(root,LinkOption.NOFOLLOW_LINKS))return;try(var walk=Files.walk(root)){for(Path p:walk.sorted(Comparator.reverseOrder()).toList())Files.deleteIfExists(p);}}
}
