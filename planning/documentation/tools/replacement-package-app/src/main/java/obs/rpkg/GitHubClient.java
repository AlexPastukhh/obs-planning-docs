package obs.rpkg;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

final class GitHubClient implements Core.GitHubIssues {
    record Result(int exitCode,String stdout,String stderr) {}
    interface Runner { Result run(List<String> args); }
    private final Runner runner;

    GitHubClient(){this(new ProcessRunner());}
    GitHubClient(Runner runner){this.runner=Objects.requireNonNull(runner);}

    @Override public List<Core.GitHubIssue> findByChangeSetId(String repositoryIdentity,String changeSetId){
        Repo repo=repo(repositoryIdentity);String marker=Core.workIntentMarker(changeSetId);
        Result r=call(List.of("api","--paginate","--slurp","repos/"+repo.owner+"/"+repo.name+"/issues?state=all&per_page=100"));
        Object parsed=parse(r.stdout,"GitHub issue list");List<Core.GitHubIssue> out=new ArrayList<>();
        flattenIssuePages(parsed,out,marker);return List.copyOf(out);
    }

    @Override public Core.GitHubIssue get(String repositoryIdentity,int issueNumber){Repo repo=repo(repositoryIdentity);Result r=call(List.of("api","repos/"+repo.owner+"/"+repo.name+"/issues/"+issueNumber));return issue(parseObject(r.stdout,"GitHub Issue #"+issueNumber));}

    @Override public Core.GitHubIssue create(String repositoryIdentity,String title,String body){
        Repo repo=repo(repositoryIdentity);Result r=call(List.of("api","--method","POST","repos/"+repo.owner+"/"+repo.name+"/issues","-f","title="+title,"-f","body="+body));return issue(parseObject(r.stdout,"created GitHub Issue"));
    }

    @Override public Core.GitHubIssue update(String repositoryIdentity,int issueNumber,String title,String body){
        Repo repo=repo(repositoryIdentity);Result r=call(List.of("api","--method","PATCH","repos/"+repo.owner+"/"+repo.name+"/issues/"+issueNumber,"-f","title="+title,"-f","body="+body));return issue(parseObject(r.stdout,"updated GitHub Issue #"+issueNumber));
    }

    private Result call(List<String> args){Result r=runner.run(args);if(r.exitCode!=0)throw new Core.ObsException(Core.WORK_INTENT_FAILED,"GitHub CLI request failed (gh "+String.join(" ",redact(args))+ "): "+details(r));return r;}
    private static String details(Result r){String e=r.stderr==null?"":r.stderr.strip(),o=r.stdout==null?"":r.stdout.strip();String s=!e.isBlank()?e:o;return s.isBlank()?"exit "+r.exitCode:s;}
    private static List<String> redact(List<String> args){return args;}

    @SuppressWarnings("unchecked") private static Map<String,Object> parseObject(String text,String role){Object v=parse(text,role);if(!(v instanceof Map<?,?> m))throw new Core.ObsException(Core.WORK_INTENT_FAILED,role+" response is not a JSON object.");return (Map<String,Object>)m;}
    private static Object parse(String text,String role){try{return Json.parse(text);}catch(RuntimeException e){throw new Core.ObsException(Core.WORK_INTENT_FAILED,role+" response is invalid JSON: "+e.getMessage(),e);}}

    @SuppressWarnings("unchecked") private static void flattenIssuePages(Object v,List<Core.GitHubIssue> out,String marker){
        if(v instanceof List<?> list){for(Object x:list)flattenIssuePages(x,out,marker);return;}
        if(!(v instanceof Map<?,?> raw))return;Map<String,Object> m=(Map<String,Object>)raw;if(m.containsKey("pull_request"))return;Core.GitHubIssue issue=issue(m);if(issue.body()!=null&&Core.containsExactLine(issue.body(),marker))out.add(issue);
    }

    private static Core.GitHubIssue issue(Map<String,Object> m){int n=number(m.get("number"));if(n<=0)throw new Core.ObsException(Core.WORK_INTENT_FAILED,"GitHub Issue response is missing a valid number.");return new Core.GitHubIssue(n,text(m.get("title")),text(m.get("body")),text(m.get("html_url")),text(m.get("state")));}
    private static int number(Object v){return v instanceof Number n?n.intValue():0;}
    private static String text(Object v){return v==null?null:String.valueOf(v);}

    private static Repo repo(String identity){if(identity==null||!identity.matches("^github:[^/\\s]+/[^/\\s]+$"))throw new Core.ObsException(Core.WORK_INTENT_FAILED,"Work Intent repositoryIdentity must be github:<owner>/<repo>.");String s=identity.substring("github:".length());int p=s.indexOf('/');return new Repo(s.substring(0,p),s.substring(p+1));}
    private record Repo(String owner,String name) {}

    private static final class ProcessRunner implements Runner {
        @Override public Result run(List<String> args){List<String> cmd=new ArrayList<>();cmd.add("gh");cmd.addAll(args);try{Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();byte[] out=p.getInputStream().readAllBytes();int code=p.waitFor();return new Result(code,new String(out,StandardCharsets.UTF_8),"");}catch(IOException e){throw new Core.ObsException(Core.WORK_INTENT_FAILED,"GitHub CLI 'gh' is unavailable or could not be started: "+e.getMessage(),e);}catch(InterruptedException e){Thread.currentThread().interrupt();throw new Core.ObsException(Core.WORK_INTENT_FAILED,"GitHub CLI request was interrupted.",e);}}
    }
}
