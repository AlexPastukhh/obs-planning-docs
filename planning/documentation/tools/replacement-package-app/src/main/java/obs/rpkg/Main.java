package obs.rpkg;

import javax.swing.*;
import java.nio.file.*;
import java.util.*;

public final class Main {
    public static void main(String[] args) {
        if (args.length == 0 || args[0].equalsIgnoreCase("ui")) {
            SwingUtilities.invokeLater(() -> new MainWindow(new Core()).setVisible(true));
            return;
        }
        try {
            Core core = new Core();
            Map<String,String> a = parse(args);
            switch (args[0]) {
                case "apply" -> {
                    Path repo = path(a,"repo"), archive = path(a,"archive");
                    Core.ApplyResult r;
                    if (a.containsKey("action-file")) r = core.applyAction(Files.readString(path(a,"action-file")), archive, repo);
                    else r = core.applyPackage(archive, repo);
                    System.out.println("SUCCESS changeSetId=" + r.changeSet().changeSetId + " reviewSha256=" + r.review().sha256());
                    if (r.attempt().handoffWarning != null && !r.attempt().handoffWarning.isBlank()) System.out.println("WARNING " + r.attempt().handoffWarning);
                }
                case "review" -> {
                    Core.ReviewDiff r = core.refreshReview(req(a,"changeset"));
                    System.out.println(r.sha256()+"  "+r.diffPath());
                }
                case "finalize" -> {
                    Core.FinalizeResult r=core.finalizeChangeSet(req(a,"changeset"),req(a,"sha"),req(a,"message"),path(a,"repo"));
                    if(r.commitSha()==null)System.out.println("SUCCESS no net changes; ChangeSet finalized without commit/push.");else System.out.println("SUCCESS commit="+r.commitSha()+" branch="+r.branch());
                }
                case "retry-push" -> {
                    Core.FinalizeResult r=core.retryPush(req(a,"changeset"),path(a,"repo"));
                    if(r.commitSha()==null)System.out.println("SUCCESS no net changes; ChangeSet finalized without commit/push.");else System.out.println("SUCCESS commit="+r.commitSha()+" branch="+r.branch());
                }
                case "settings" -> {
                    String handling=a.getOrDefault("review-diff",core.getSettings().reviewDiffHandling());
                    core.setReviewDiffHandling(handling);
                    if(a.containsKey("repo")){Core.RepositoryConfig r=core.registerRepository(a.get("name"),path(a,"repo"));core.selectRepository(r.id());System.out.println("SUCCESS repository="+r.name()+" identity="+r.repositoryIdentity()+" path="+r.path()+" reviewDiffHandling="+handling);}else System.out.println("SUCCESS reviewDiffHandling="+handling);
                }
                case "list-repos" -> {for(Core.RepositoryConfig r:core.getRepositories())System.out.println(r.id()+"\t"+r.name()+"\t"+r.repositoryIdentity()+"\t"+r.path());}
                case "list-changesets" -> {for(Core.ChangeSet cs:core.getChangeSets(req(a,"repo-id"),Boolean.parseBoolean(a.getOrDefault("history","false"))))System.out.println(cs.changeSetId+"\t"+cs.status+"\t"+cs.changeSetLabel);}
                default -> usage();
            }
        } catch (Core.ObsException e) {
            System.err.println("["+e.code+"] "+e.getMessage());
            System.exit(2);
        } catch (Exception e) {
            e.printStackTrace(System.err);System.exit(3);
        }
    }
    private static Map<String,String> parse(String[] args){Map<String,String>m=new LinkedHashMap<>();for(int i=1;i<args.length;i++){String k=args[i];if(!k.startsWith("--")||i+1>=args.length)throw new IllegalArgumentException("Expected --key value");m.put(k.substring(2),args[++i]);}return m;}
    private static String req(Map<String,String>m,String k){String v=m.get(k);if(v==null||v.isBlank())throw new IllegalArgumentException("Missing --"+k);return v;}
    private static Path path(Map<String,String>m,String k){String v=m.get(k);return v==null||v.isBlank()?null:Path.of(v);}
    private static void usage(){System.out.println("Usage: java -jar replacement-package-app.jar [ui|apply|review|finalize|retry-push|settings|list-repos|list-changesets] ...");}
}
