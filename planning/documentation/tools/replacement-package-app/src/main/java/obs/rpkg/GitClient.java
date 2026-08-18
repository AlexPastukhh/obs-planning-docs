package obs.rpkg;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.*;

final class GitClient {
    record Result(int exitCode, List<String> stdout, List<String> stderr, List<String> command) {
        String first() { return stdout.isEmpty() ? "" : stdout.get(0).trim(); }
        String joined() { return String.join("\n", stdout); }
        String commandLine() { return displayCommand(command); }
        String failureDetails() {
            String out=String.join("\n",stdout),err=String.join("\n",stderr);
            return "command: "+commandLine()+"\nexitCode: "+exitCode+(out.isBlank()?"":"\nstdout:\n"+out)+(err.isBlank()?"":"\nstderr:\n"+err);
        }
    }

    record BytesResult(int exitCode, byte[] output, String error) {}

    Result run(Path repo, String errorCode, boolean allowFailure, Map<String,String> environment, String... args) {
        List<String> cmd = new ArrayList<>();
        cmd.add("git"); cmd.add("-C"); cmd.add(repo.toString()); cmd.addAll(List.of(args));
        ProcessBuilder pb = new ProcessBuilder(cmd);
        if (environment != null) pb.environment().putAll(environment);
        try {
            Process p = pb.start();
            ByteArrayOutputStream stdoutBytes=new ByteArrayOutputStream(),stderrBytes=new ByteArrayOutputStream();
            StreamCapture stdoutReader=streamReader(p.getInputStream(),stdoutBytes,"obs-rpkg-git-stdout"),stderrReader=streamReader(p.getErrorStream(),stderrBytes,"obs-rpkg-git-stderr");
            stdoutReader.start();stderrReader.start();int code=p.waitFor();stdoutReader.join();stderrReader.join();
            throwIfStreamReadFailed(errorCode,cmd,code,stdoutReader,stderrReader);
            List<String> stdout=lines(stdoutBytes.toString(StandardCharsets.UTF_8)),stderr=lines(stderrBytes.toString(StandardCharsets.UTF_8));
            Result result = new Result(code, stdout, stderr, List.copyOf(cmd));
            if (code != 0 && !allowFailure) throw new Core.ObsException(errorCode, "Git command failed.\n--- git details ---\n" + result.failureDetails());
            return result;
        } catch (IOException e) {
            throw new Core.ObsException(errorCode, "Cannot execute git: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new Core.ObsException(errorCode, "Git execution interrupted", e);
        }
    }


    BytesResult bytes(Path repo, String errorCode, boolean allowFailure, Map<String,String> environment, String... args) {
        List<String> cmd = new ArrayList<>();
        cmd.add("git"); cmd.add("-C"); cmd.add(repo.toString()); cmd.addAll(List.of(args));
        ProcessBuilder pb = new ProcessBuilder(cmd);
        if (environment != null) pb.environment().putAll(environment);
        try {
            Process p = pb.start();
            ByteArrayOutputStream err = new ByteArrayOutputStream();
            StreamCapture stderr = streamReader(p.getErrorStream(),err,"obs-rpkg-git-stderr");
            stderr.start();
            byte[] output = p.getInputStream().readAllBytes();
            int code = p.waitFor();
            stderr.join();
            throwIfStreamReadFailed(errorCode,cmd,code,stderr);
            String error = err.toString(StandardCharsets.UTF_8);
            BytesResult result = new BytesResult(code, output, error);
            if (code != 0 && !allowFailure) throw new Core.ObsException(errorCode, "Git command failed.\n--- git details ---\ncommand: " + displayCommand(cmd) + "\nexitCode: " + code + (error.isBlank()?"":"\nstderr:\n"+error.trim()));
            return result;
        } catch (IOException e) {
            throw new Core.ObsException(errorCode, "Cannot execute git: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new Core.ObsException(errorCode, "Git execution interrupted", e);
        }
    }

    static final class StreamCapture {
        private final Thread thread;
        private volatile IOException failure;
        StreamCapture(InputStream input,ByteArrayOutputStream output,String name){thread=new Thread(()->{try(InputStream in=input){in.transferTo(output);}catch(IOException e){failure=e;}},name);thread.setDaemon(true);}
        void start(){thread.start();}
        void join()throws InterruptedException{thread.join();}
        IOException failure(){return failure;}
        String name(){return thread.getName();}
    }

    static StreamCapture streamReader(InputStream input,ByteArrayOutputStream output,String name){return new StreamCapture(input,output,name);}

    private static void throwIfStreamReadFailed(String errorCode,List<String> cmd,int exitCode,StreamCapture... captures){
        IOException first=null;String firstName=null;
        for(StreamCapture capture:captures)if(capture!=null&&capture.failure()!=null){if(first==null){first=capture.failure();firstName=capture.name();}else first.addSuppressed(capture.failure());}
        if(first!=null)throw new Core.ObsException(errorCode,"Failed to read Git process stream "+firstName+".\n--- git details ---\ncommand: "+displayCommand(cmd)+"\nexitCode: "+exitCode,first);
    }

    private static List<String> lines(String text){return text==null||text.isEmpty()?List.of():text.lines().toList();}

    private static String displayCommand(List<String> command) {
        return command.stream().map(GitClient::quoteForDisplay).collect(java.util.stream.Collectors.joining(" "));
    }

    private static String quoteForDisplay(String value) {
        if(value==null)return "";
        if(value.matches("[A-Za-z0-9_./:=+@\\-]+"))return value;
        return "\""+value.replace("\"","\\\"")+"\"";
    }

    BytesResult bytes(Path repo, String errorCode, String... args) { return bytes(repo, errorCode, false, null, args); }
    BytesResult bytesAllow(Path repo, String errorCode, String... args) { return bytes(repo, errorCode, true, null, args); }
    BytesResult bytesEnv(Path repo, String errorCode, Map<String,String> env, String... args) { return bytes(repo, errorCode, false, env, args); }

    Result run(Path repo, String errorCode, String... args) { return run(repo, errorCode, false, null, args); }
    Result allow(Path repo, String errorCode, String... args) { return run(repo, errorCode, true, null, args); }
    Result env(Path repo, String errorCode, Map<String,String> env, String... args) { return run(repo, errorCode, false, env, args); }
}
