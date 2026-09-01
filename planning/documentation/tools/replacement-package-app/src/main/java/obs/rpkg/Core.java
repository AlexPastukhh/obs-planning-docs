package obs.rpkg;

import java.awt.*;
import java.awt.datatransfer.*;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.nio.charset.*;
import java.nio.file.*;
import java.security.*;
import java.time.Instant;
import java.util.*;
import java.util.List;
import java.util.regex.*;
import java.util.zip.*;

import obs.rpkgcommon.PackageStateApplier;

public final class Core {
    public static final String SUCCESS="SUCCESS", INTERNAL_ERROR="INTERNAL_ERROR", PACKAGE_INVALID="PACKAGE_INVALID", PACKAGE_NOT_FOUND="PACKAGE_NOT_FOUND",
            ACTION_PACKAGE_MISMATCH="ACTION_PACKAGE_MISMATCH", REPOSITORY_MISMATCH="REPOSITORY_MISMATCH",
            PATH_OWNERSHIP_CONFLICT="PATH_OWNERSHIP_CONFLICT", BASE_MISMATCH="BASE_MISMATCH", RESULT_MISMATCH="RESULT_MISMATCH",
            STATE_DIVERGED="STATE_DIVERGED", APPLY_ROLLBACK_UNVERIFIED="APPLY_ROLLBACK_UNVERIFIED", REVIEW_STALE="REVIEW_STALE", FINALIZE_FAILED="FINALIZE_FAILED", COMMIT_FAILED="COMMIT_FAILED",
            PUBLISH_FAILED="PUBLISH_FAILED", PUBLICATION_UNCERTAIN="PUBLICATION_UNCERTAIN", REMOTE_BRANCH_DIVERGED="REMOTE_BRANCH_DIVERGED", SNAPSHOT_EXPORT_FAILED="SNAPSHOT_EXPORT_FAILED", CHAT_BRIDGE_FAILED="CHAT_BRIDGE_FAILED",
            SOURCE_STATE_CHANGED="SOURCE_STATE_CHANGED", SOURCE_STATE_UNVERIFIABLE="SOURCE_STATE_UNVERIFIABLE",
            REPOSITORY_NOT_READY="REPOSITORY_NOT_READY", REPOSITORY_SELECTION_REQUIRED="REPOSITORY_SELECTION_REQUIRED",
            WORK_INTENT_FAILED="WORK_INTENT_FAILED", WORK_INTENT_CONFLICT="WORK_INTENT_CONFLICT", WORK_INTENT_UNCERTAIN="WORK_INTENT_UNCERTAIN";
    public static final Set<String> PUBLIC_ERROR_CODES=Set.of(INTERNAL_ERROR,PACKAGE_INVALID,PACKAGE_NOT_FOUND,ACTION_PACKAGE_MISMATCH,REPOSITORY_MISMATCH,PATH_OWNERSHIP_CONFLICT,BASE_MISMATCH,RESULT_MISMATCH,STATE_DIVERGED,APPLY_ROLLBACK_UNVERIFIED,REVIEW_STALE,FINALIZE_FAILED,COMMIT_FAILED,PUBLISH_FAILED,PUBLICATION_UNCERTAIN,REMOTE_BRANCH_DIVERGED,SNAPSHOT_EXPORT_FAILED,CHAT_BRIDGE_FAILED,SOURCE_STATE_CHANGED,SOURCE_STATE_UNVERIFIABLE,REPOSITORY_NOT_READY,REPOSITORY_SELECTION_REQUIRED,WORK_INTENT_FAILED,WORK_INTENT_CONFLICT,WORK_INTENT_UNCERTAIN);

    public static final class ObsException extends RuntimeException {
        public final String code;
        public ObsException(String code,String message){super(message);this.code=code;}
        public ObsException(String code,String message,Throwable cause){super(withCauseDetails(message,cause),cause);this.code=code;}
        @Override public String toString(){return "["+code+"] "+getMessage();}
    }

    public record ObsAction(String action,String name,String archive,String packageId,String targetBranch,String workIntent,String changeSetId,String chatTabTitle,String chatContextToken) {}
    public record Operation(String path,String action) {}
    public record WorkIntentSpec(int schemaVersion,String changeSetId,String repositoryIdentity,String title,String goal,String why,List<String> acceptance) {}
    public record PackageManifest(int schemaVersion,String packageId,String changeSetId,String changeSetLabel,String repositoryIdentity,WorkIntentSpec workIntent,List<Operation> operations) {}
    public record PackageData(Path archivePath,String archiveSha256,PackageManifest manifest,Map<String,byte[]> base,Map<String,byte[]> replacement) {}
    public record ReviewDiff(String attemptId,Path diffPath,String sha256,String head) {}
    public record Handoff(String servicePath,String warning) {}
    public record RepositoryConfig(String id,String name,String path,String repositoryIdentity) {}
    public static final int DEFAULT_REVIEW_SEND_RETRY_SECONDS=6, MIN_REVIEW_SEND_RETRY_SECONDS=1, MAX_REVIEW_SEND_RETRY_SECONDS=60;
    public record Settings(List<RepositoryConfig> repositories,String selectedRepositoryId,String selectedChangeSetId,String reviewDiffHandling,int reviewDiffSendRetrySeconds,String reviewChatTitleIgnoredCharacters) {}
    public enum ReviewChatPlanKind { NO_HINT, UNBOUND_UNIQUE, NO_MATCH, AMBIGUOUS, SAME_AS_EXISTING, REBIND_REQUIRED }
    public enum ReviewChatBindingDecision { NONE, KEEP_EXISTING, USE_HINT }
    public record OperationNotice(String level,String code,String message) {}
    public record ReviewChatBindingPlan(ReviewChatPlanKind kind,String requestedTitle,String normalizedRequestedTitle,ChatBinding existingBinding,ChatConversation requestedConversation,int matchCount,boolean rebindSafe,String rebindBlockReason) {}
    public record PreparedApply(ObsAction action,PackageData packageData,ApplyTargetResolution targetResolution,ReviewChatBindingPlan reviewChatPlan,List<OperationNotice> notices,String changeSetStateToken,String bindingConversationKey) {}
    public record AuthorizedApply(PreparedApply prepared,String repositoryTargetId,ReviewChatBindingDecision reviewChatDecision) {}
    public record ApplyResult(String code,ApplicationAttempt attempt,ChangeSet changeSet,ReviewDiff review,String diagnostic) {}
    public record ApplyReceipt(String status,String packageId,String changeSetId,String code,String message) {}
    public record CommitResult(String code,String commitSha,ChangeSet changeSet,boolean alreadySatisfied) {}
    public record PublishResult(String code,String commitSha,ChangeSet changeSet,boolean alreadySatisfied) {}
    public record FinalizeResult(String code,String commitSha,String branch,ChangeSet changeSet) {}
    public record SnapshotExportResult(Path zipPath,String snapshotType,String repositoryIdentity,String commitSha,String branch) {}
    public record ChatConversation(String conversationKey,String title,String url,int tabCount,List<Integer> tabIds) {}
    public record ChatBinding(String changeSetId,String conversationKey,String title,String url,String boundAt) {}
    public record ChatTaskInfo(String taskId,String kind,String changeSetId,String reviewAttemptId,String conversationKey,String conversationTitle,String fileName,boolean autoSend,String status,String message,String createdAt,String updatedAt) {}
    public record ApplyTargetResolution(RepositoryConfig target,List<RepositoryConfig> candidates,boolean contextChanged,String reason) {}
    public record WorkspaceStartResult(ChangeSet changeSet,boolean alreadySatisfied) {}
    public record WorkIntentResult(String code,String changeSetId,int issueNumber,String issueUrl,boolean alreadySatisfied,boolean updated) {}
    public record GitHubIssue(int number,String title,String body,String url,String state) {}
    interface GitHubIssues { List<GitHubIssue> findByChangeSetId(String repositoryIdentity,String changeSetId);GitHubIssue get(String repositoryIdentity,int issueNumber);GitHubIssue create(String repositoryIdentity,String title,String body);GitHubIssue update(String repositoryIdentity,int issueNumber,String title,String body); }
    private record WorktreeRegistration(Path path,String head,String branch) {}
    private record WorkspacePosition(String head,String branchTip) {}
    private record RemoteBranchState(boolean exists,String tip) {}
    private record WorkspaceJournal(String changeSetId,String changeSetLabel,String repositoryTargetId,String repositoryIdentity,String targetBranch,String branch,String worktree,String baseCommit,String createdAt) {
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",changeSetId);m.put("changeSetLabel",changeSetLabel);m.put("repositoryTargetId",repositoryTargetId);m.put("repositoryIdentity",repositoryIdentity);m.put("targetBranch",targetBranch);m.put("branch",branch);m.put("worktree",worktree);m.put("baseCommit",baseCommit);m.put("createdAt",createdAt);return m;}
        static WorkspaceJournal from(Map<String,Object>m){if(num(m.get("schemaVersion"))!=1)throw new ObsException(STATE_DIVERGED,"Unsupported ChangeSet workspace journal schema.");return new WorkspaceJournal(str(m.get("changeSetId")),str(m.get("changeSetLabel")),str(m.get("repositoryTargetId")),str(m.get("repositoryIdentity")),str(m.get("targetBranch")),str(m.get("branch")),str(m.get("worktree")),str(m.get("baseCommit")),str(m.get("createdAt")));}
    }
    record WorkIntentState(String changeSetId,String repositoryIdentity,int issueNumber,String issueUrl,String title,String goal,String why,List<String> acceptance,String fingerprint,String updatedAt) {
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",changeSetId);m.put("repositoryIdentity",repositoryIdentity);m.put("issueNumber",issueNumber);m.put("issueUrl",issueUrl);m.put("title",title);m.put("goal",goal);m.put("why",why);m.put("acceptance",new ArrayList<>(acceptance));m.put("fingerprint",fingerprint);m.put("updatedAt",updatedAt);return m;}
        @SuppressWarnings("unchecked") static WorkIntentState from(Map<String,Object>m){if(num(m.get("schemaVersion"))!=1)throw new ObsException(STATE_DIVERGED,"Unsupported Work Intent state schema.");List<String>a=new ArrayList<>();Object raw=m.get("acceptance");if(raw instanceof List<?> l)for(Object x:l)a.add(str(x));return new WorkIntentState(str(m.get("changeSetId")),str(m.get("repositoryIdentity")),(m.get("issueNumber") instanceof Number n?n.intValue():0),str(m.get("issueUrl")),str(m.get("title")),str(m.get("goal")),str(m.get("why")),List.copyOf(a),str(m.get("fingerprint")),str(m.get("updatedAt")));}
    }
    record WorkIntentJournal(String changeSetId,String repositoryIdentity,String fingerprint,String mode,String createdAt) {
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",changeSetId);m.put("repositoryIdentity",repositoryIdentity);m.put("fingerprint",fingerprint);m.put("mode",mode);m.put("createdAt",createdAt);return m;}
        static WorkIntentJournal from(Map<String,Object>m){if(num(m.get("schemaVersion"))!=1)throw new ObsException(STATE_DIVERGED,"Unsupported Work Intent journal schema.");return new WorkIntentJournal(str(m.get("changeSetId")),str(m.get("repositoryIdentity")),str(m.get("fingerprint")),str(m.get("mode")),str(m.get("createdAt")));}
    }
    private record ApplyJournalEntry(String path,String action,boolean priorExists,String priorBase64,boolean intendedExists,String intendedBase64) {
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("path",path);m.put("action",action);m.put("priorExists",priorExists);m.put("priorBase64",priorBase64);m.put("intendedExists",intendedExists);m.put("intendedBase64",intendedBase64);return m;}
        static ApplyJournalEntry from(Map<String,Object>m){return new ApplyJournalEntry(str(m.get("path")),str(m.get("action")),Boolean.TRUE.equals(m.get("priorExists")),str(m.get("priorBase64")),Boolean.TRUE.equals(m.get("intendedExists")),str(m.get("intendedBase64")));}
        byte[] priorBytes(){return priorExists?decodeBytes(priorBase64,"prior",path):null;}
        byte[] intendedBytes(){return intendedExists?decodeBytes(intendedBase64,"intended",path):null;}
    }
    private record ApplyJournal(String changeSetId,String packageId,String archiveSha256,String repositoryIdentity,String branch,String worktree,String baseHead,String createdAt,List<ApplyJournalEntry> entries) {
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",changeSetId);m.put("packageId",packageId);m.put("archiveSha256",archiveSha256);m.put("repositoryIdentity",repositoryIdentity);m.put("branch",branch);m.put("worktree",worktree);m.put("baseHead",baseHead);m.put("createdAt",createdAt);List<Object>x=new ArrayList<>();for(ApplyJournalEntry e:entries)x.add(e.json());m.put("entries",x);return m;}
        @SuppressWarnings("unchecked") static ApplyJournal from(Map<String,Object>m){if(num(m.get("schemaVersion"))!=1)throw new ObsException(STATE_DIVERGED,"Unsupported Apply journal schema.");List<ApplyJournalEntry>x=new ArrayList<>();Object raw=m.get("entries");if(raw instanceof List<?> l)for(Object v:l){if(!(v instanceof Map<?,?> mm))throw new ObsException(STATE_DIVERGED,"Apply journal entry is invalid.");x.add(ApplyJournalEntry.from((Map<String,Object>)mm));}return new ApplyJournal(str(m.get("changeSetId")),str(m.get("packageId")),str(m.get("archiveSha256")),str(m.get("repositoryIdentity")),str(m.get("branch")),str(m.get("worktree")),str(m.get("baseHead")),str(m.get("createdAt")),List.copyOf(x));}
    }
    private static byte[] decodeBytes(String value,String role,String path){try{return Base64.getDecoder().decode(value==null?"":value);}catch(IllegalArgumentException e){throw new ObsException(STATE_DIVERGED,"Apply journal "+role+" bytes are invalid for "+path+".",e);}}
    public record ExternalInteraction(String interactionId,String kind,String changeSetId,String source,String destination,String state,String message,String updatedAt,boolean cancellable) {}

    public static final class ChangeSet {
        public int schemaVersion=4;
        public String changeSetId,changeSetLabel,repositoryIdentity,repositoryTargetId,repositoryRoot,status="Active",lastPackageId;
        public final List<String> ownedPaths=new ArrayList<>();
        public String currentReviewAttemptId,currentReviewDiffPath,currentReviewSha256,currentReviewHead;
        public String commitSha,branch,createdAt,updatedAt;
        public String targetBranch,worktree,baseCommit,publishedTip,executionState,issueUrl;
        public int issueNumber;
        public String lastOperationStatus,lastOperationCode,lastOperationMessage,lastOperationAt;
        public final List<Map<String,Object>> finalizationHistory=new ArrayList<>();
        Map<String,Object> json(){
            Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",4);m.put("changeSetId",changeSetId);m.put("changeSetLabel",changeSetLabel);m.put("repositoryIdentity",repositoryIdentity);m.put("repositoryTargetId",repositoryTargetId);m.put("repositoryRoot",repositoryRoot);m.put("ownedPaths",new ArrayList<>(ownedPaths));m.put("status",status);m.put("lastPackageId",lastPackageId);
            Map<String,Object> r=new LinkedHashMap<>();r.put("attemptId",currentReviewAttemptId);r.put("diffPath",currentReviewDiffPath);r.put("sha256",currentReviewSha256);r.put("head",currentReviewHead);m.put("currentReview",r);
            m.put("commitSha",commitSha);m.put("branch",branch);m.put("issueNumber",issueNumber==0?null:issueNumber);m.put("issueUrl",issueUrl);m.put("targetBranch",targetBranch);m.put("worktree",worktree);m.put("baseCommit",baseCommit);m.put("publishedTip",publishedTip);m.put("executionState",executionState);m.put("createdAt",createdAt);m.put("updatedAt",updatedAt);
            Map<String,Object> o=new LinkedHashMap<>();o.put("status",lastOperationStatus);o.put("code",lastOperationCode);o.put("message",lastOperationMessage);o.put("timestamp",lastOperationAt);m.put("lastOperationOutcome",o);
            m.put("finalizationHistory",new ArrayList<>(finalizationHistory));return m;
        }
        @SuppressWarnings("unchecked") static ChangeSet from(Map<String,Object> m){
            ChangeSet c=new ChangeSet();Object schema=m.get("schemaVersion");c.schemaVersion=schema instanceof Number n?n.intValue():2;c.changeSetId=str(m.get("changeSetId"));c.changeSetLabel=str(m.get("changeSetLabel"));c.repositoryIdentity=str(m.get("repositoryIdentity"));c.repositoryTargetId=str(m.get("repositoryTargetId"));c.repositoryRoot=str(m.get("repositoryRoot"));c.status=str(m.get("status"));if(c.status==null||c.status.isBlank())c.status="Active";c.lastPackageId=str(m.get("lastPackageId"));c.commitSha=str(m.get("commitSha"));c.branch=str(m.get("branch"));c.issueNumber=m.get("issueNumber") instanceof Number issueN?issueN.intValue():0;c.issueUrl=str(m.get("issueUrl"));c.targetBranch=str(m.get("targetBranch"));c.worktree=str(m.get("worktree"));c.baseCommit=str(m.get("baseCommit"));c.publishedTip=str(m.get("publishedTip"));c.executionState=str(m.get("executionState"));c.createdAt=str(m.get("createdAt"));c.updatedAt=str(m.get("updatedAt"));
            Object op=m.get("ownedPaths");if(op instanceof List<?> l)for(Object x:l)c.ownedPaths.add(str(x));Object rr=m.get("currentReview");if(rr instanceof Map<?,?> rm){Map<String,Object> r=(Map<String,Object>)rm;c.currentReviewAttemptId=str(r.get("attemptId"));c.currentReviewDiffPath=str(r.get("diffPath"));c.currentReviewSha256=str(r.get("sha256"));c.currentReviewHead=str(r.get("head"));}
            Object oo=m.get("lastOperationOutcome");if(oo instanceof Map<?,?> raw){Map<String,Object> o=(Map<String,Object>)raw;c.lastOperationStatus=str(o.get("status"));c.lastOperationCode=str(o.get("code"));c.lastOperationMessage=str(o.get("message"));c.lastOperationAt=str(o.get("timestamp"));}
            Object fh=m.get("finalizationHistory");if(fh instanceof List<?> l)for(Object x:l)if(x instanceof Map<?,?> raw)c.finalizationHistory.add(new LinkedHashMap<>((Map<String,Object>)raw));return c;
        }
    }

    public static final class ApplicationAttempt {
        public int schemaVersion=1; public String attemptId,timestamp,name,repositoryIdentity,repositoryRoot,archivePath,archiveSha256,packageId,changeSetId,result,code,message,reviewDiffPath,reviewDiffSha256,serviceReviewDiffPath,handoffWarning;
        Map<String,Object> json(){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("attemptId",attemptId);m.put("timestamp",timestamp);m.put("name",name);m.put("repositoryIdentity",repositoryIdentity);m.put("repositoryRoot",repositoryRoot);m.put("archivePath",archivePath);m.put("archiveSha256",archiveSha256);m.put("packageId",packageId);m.put("changeSetId",changeSetId);m.put("result",result);m.put("code",code);m.put("message",message);m.put("reviewDiffPath",reviewDiffPath);m.put("reviewDiffSha256",reviewDiffSha256);m.put("serviceReviewDiffPath",serviceReviewDiffPath);m.put("handoffWarning",handoffWarning);return m;}
        static ApplicationAttempt from(Map<String,Object>m){ApplicationAttempt a=new ApplicationAttempt();a.attemptId=str(m.get("attemptId"));a.timestamp=str(m.get("timestamp"));a.name=str(m.get("name"));a.repositoryIdentity=str(m.get("repositoryIdentity"));a.repositoryRoot=str(m.get("repositoryRoot"));a.archivePath=str(m.get("archivePath"));a.archiveSha256=str(m.get("archiveSha256"));a.packageId=str(m.get("packageId"));a.changeSetId=str(m.get("changeSetId"));a.result=str(m.get("result"));a.code=str(m.get("code"));a.message=str(m.get("message"));a.reviewDiffPath=str(m.get("reviewDiffPath"));a.reviewDiffSha256=str(m.get("reviewDiffSha256"));a.serviceReviewDiffPath=str(m.get("serviceReviewDiffPath"));a.handoffWarning=str(m.get("handoffWarning"));return a;}
    }

    interface ClipboardAccess { void setText(String text) throws Exception; String getText() throws Exception; }
    private static final class AwtClipboardAccess implements ClipboardAccess {
        public void setText(String text){Toolkit.getDefaultToolkit().getSystemClipboard().setContents(new StringSelection(text),null);}
        public String getText() throws Exception {Object data=Toolkit.getDefaultToolkit().getSystemClipboard().getData(DataFlavor.stringFlavor);return data==null?null:String.valueOf(data);}
    }

    private final GitClient git=new GitClient(); private final StateStore state; private final ClipboardAccess clipboard; private final ChatBridgeService chatBridge; private final GitHubIssues githubIssues; private Runnable afterMutationHook=()->{},afterPublishAttemptHook=()->{}; private java.util.function.Consumer<String> afterRecoveryPathCleanHook=path->{};
    public Core(){this(new StateStore(),new AwtClipboardAccess(),new GitHubClient());}
    Core(StateStore state){this(state,new AwtClipboardAccess(),new GitHubClient());}
    Core(StateStore state,GitHubIssues githubIssues){this(state,new AwtClipboardAccess(),githubIssues);}
    Core(StateStore state,ClipboardAccess clipboard){this(state,clipboard,new GitHubClient());}
    Core(StateStore state,ClipboardAccess clipboard,GitHubIssues githubIssues){this.state=state;this.clipboard=Objects.requireNonNull(clipboard);this.chatBridge=new ChatBridgeService(state);this.githubIssues=Objects.requireNonNull(githubIssues);}
    ChatBridgeService chatBridgeService(){return chatBridge;}
    void setChatBridgeEventSink(java.util.function.Consumer<ChatBridgeService.ChatEvent> sink){chatBridge.setEventSink(sink);}
    void setAfterMutationHookForTests(Runnable hook){afterMutationHook=hook==null?()->{}:hook;}
    void setAfterPublishAttemptHookForTests(Runnable hook){afterPublishAttemptHook=hook==null?()->{}:hook;}
    void setAfterRecoveryPathCleanHookForTests(java.util.function.Consumer<String> hook){afterRecoveryPathCleanHook=hook==null?path->{}:hook;}

    public WorkIntentResult executeCreateWorkIntentAction(String actionText){ObsAction action=parseAction(actionText);if(action==null||!"create-work-intent".equals(action.action()))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION action must be create-work-intent for this operation.");WorkIntentSpec spec=resolveWorkIntentForAction(action);if(!Objects.equals(spec.changeSetId(),action.changeSetId()))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION changeSetId does not match Work Intent file.");return ensureWorkIntent(spec);}

    public WorkIntentResult ensureWorkIntent(WorkIntentSpec spec){if(spec==null)throw new ObsException(PACKAGE_INVALID,"Work Intent is required.");validateWorkIntentSpec(spec);String fingerprint=workIntentFingerprint(spec),desired=workIntentManagedBlock(spec);try(StateStore.Lock ignored=state.lock()){
        WorkIntentJournal journal=state.getWorkIntentJournal(spec.changeSetId());if(journal!=null&&(!Objects.equals(journal.repositoryIdentity(),spec.repositoryIdentity())||!Objects.equals(journal.fingerprint(),fingerprint)))throw new ObsException(WORK_INTENT_CONFLICT,"A different Work Intent operation is already journaled for ChangeSet "+spec.changeSetId()+".");
        WorkIntentState persisted=state.getWorkIntent(spec.changeSetId());GitHubIssue issue=null;boolean already=false,updated=false;
        if(persisted!=null){if(!same(persisted.repositoryIdentity(),spec.repositoryIdentity()))throw new ObsException(WORK_INTENT_CONFLICT,"Persisted Work Intent repository differs for ChangeSet "+spec.changeSetId()+".");issue=githubIssues.get(spec.repositoryIdentity(),persisted.issueNumber());assertIssueIdentity(issue,spec.changeSetId());}
        else{
            List<GitHubIssue> found=githubIssues.findByChangeSetId(spec.repositoryIdentity(),spec.changeSetId());if(found.size()>1)throw new ObsException(WORK_INTENT_CONFLICT,"More than one GitHub Issue carries "+workIntentMarker(spec.changeSetId())+".");if(found.size()==1){issue=found.get(0);assertManagedIssue(issue,spec.changeSetId());}
            else{
                state.saveWorkIntentJournal(new WorkIntentJournal(spec.changeSetId(),spec.repositoryIdentity(),fingerprint,"create",Instant.now().toString()));
                try{issue=githubIssues.create(spec.repositoryIdentity(),spec.title(),desired);}
                catch(ObsException createFailure){
                    try{List<GitHubIssue> after=githubIssues.findByChangeSetId(spec.repositoryIdentity(),spec.changeSetId());if(after.size()>1)throw new ObsException(WORK_INTENT_CONFLICT,"GitHub Issue create outcome produced duplicate ChangeSet markers for "+spec.changeSetId()+".");if(after.size()==1){issue=after.get(0);assertManagedIssue(issue,spec.changeSetId());}else{state.clearWorkIntentJournal(spec.changeSetId());throw createFailure;}}
                    catch(ObsException reconcile){if(WORK_INTENT_CONFLICT.equals(reconcile.code)||reconcile==createFailure)throw reconcile;throw new ObsException(WORK_INTENT_UNCERTAIN,"GitHub Issue create outcome is uncertain for ChangeSet "+spec.changeSetId()+"; retry the same command to reconcile by marker.",createFailure);}
                }
            }
        }
        assertIssueIdentity(issue,spec.changeSetId());String merged=mergeManagedWorkIntent(issue.body(),desired,spec.changeSetId());if(!Objects.equals(issue.title(),spec.title())||!Objects.equals(issue.body(),merged)){issue=githubIssues.update(spec.repositoryIdentity(),issue.number(),spec.title(),merged);updated=true;}else already=persisted!=null||journal==null;
        GitHubIssue verified=githubIssues.get(spec.repositoryIdentity(),issue.number());if(!Objects.equals(verified.title(),spec.title())||!Objects.equals(extractManagedWorkIntent(verified.body(),spec.changeSetId()),desired))throw new ObsException(WORK_INTENT_FAILED,"GitHub Issue verification did not match the intended Work Intent after write.");
        WorkIntentState next=new WorkIntentState(spec.changeSetId(),spec.repositoryIdentity(),verified.number(),verified.url(),spec.title(),spec.goal(),spec.why(),spec.acceptance(),fingerprint,Instant.now().toString());state.saveWorkIntent(next);state.clearWorkIntentJournal(spec.changeSetId());attachIssueToChangeSet(next);return new WorkIntentResult(SUCCESS,spec.changeSetId(),verified.number(),verified.url(),already&&!updated,updated);
    }}

    private void attachIssueToChangeSet(WorkIntentState wi){ChangeSet cs=state.getChangeSet(wi.changeSetId());if(cs==null)return;if(!same(cs.repositoryIdentity,wi.repositoryIdentity()))throw new ObsException(WORK_INTENT_CONFLICT,"Existing ChangeSet repository differs from its Work Intent.");if(cs.issueNumber!=0&&cs.issueNumber!=wi.issueNumber())throw new ObsException(WORK_INTENT_CONFLICT,"Existing ChangeSet points to a different GitHub Issue.");cs.issueNumber=wi.issueNumber();cs.issueUrl=wi.issueUrl();cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}
    private static void validateWorkIntentSpec(WorkIntentSpec s){uuid(s.changeSetId(),"workIntent.changeSetId");if(s.repositoryIdentity()==null||!s.repositoryIdentity().matches("^github:[^/\\s]+/[^/\\s]+$"))throw new ObsException(PACKAGE_INVALID,"workIntent.repositoryIdentity must be github:<owner>/<repo>.");if(s.title()==null||s.title().isBlank()||s.goal()==null||s.goal().isBlank()||s.why()==null||s.why().isBlank()||s.acceptance()==null||s.acceptance().isEmpty())throw new ObsException(PACKAGE_INVALID,"Work Intent requires title, goal, why and acceptance.");}
    static String workIntentMarker(String changeSetId){return "ChangeSet-Id: "+changeSetId;}
    static boolean containsExactLine(String text,String line){if(text==null)return false;for(String x:text.replace("\r\n","\n").replace('\r','\n').split("\n",-1))if(x.equals(line))return true;return false;}
    private static final String WORK_INTENT_BEGIN="<!-- OBS-RPKG-WORK-INTENT:BEGIN -->",WORK_INTENT_END="<!-- OBS-RPKG-WORK-INTENT:END -->";
    private static String workIntentManagedBlock(WorkIntentSpec s){StringBuilder b=new StringBuilder();b.append(WORK_INTENT_BEGIN).append('\n').append(workIntentMarker(s.changeSetId())).append("\n\n## Goal\n").append(s.goal()).append("\n\n## Why\n").append(s.why()).append("\n\n## Acceptance\n");for(String a:s.acceptance())b.append("- ").append(a).append('\n');b.append(WORK_INTENT_END);return b.toString();}
    private static String extractManagedWorkIntent(String body,String changeSetId){if(body==null)throw new ObsException(WORK_INTENT_CONFLICT,"GitHub Issue body is missing for "+changeSetId+".");int a=body.indexOf(WORK_INTENT_BEGIN),b=body.indexOf(WORK_INTENT_END);if(a<0||b<a||body.indexOf(WORK_INTENT_BEGIN,a+1)>=0||body.indexOf(WORK_INTENT_END,b+1)>=0)throw new ObsException(WORK_INTENT_CONFLICT,"GitHub Issue managed Work Intent block is missing or ambiguous for "+changeSetId+".");String block=body.substring(a,b+WORK_INTENT_END.length());if(!containsExactLine(block,workIntentMarker(changeSetId)))throw new ObsException(WORK_INTENT_CONFLICT,"GitHub Issue managed block does not carry the expected ChangeSet marker.");return block;}
    private static void assertIssueIdentity(GitHubIssue issue,String changeSetId){if(issue==null||issue.number()<=0||!containsExactLine(issue.body(),workIntentMarker(changeSetId)))throw new ObsException(WORK_INTENT_CONFLICT,"GitHub Issue does not carry the expected ChangeSet marker "+workIntentMarker(changeSetId)+".");}
    private static void assertManagedIssue(GitHubIssue issue,String changeSetId){assertIssueIdentity(issue,changeSetId);extractManagedWorkIntent(issue.body(),changeSetId);}
    private static String mergeManagedWorkIntent(String body,String desired,String changeSetId){if(body==null||body.isBlank())return desired;extractManagedWorkIntent(body,changeSetId);int a=body.indexOf(WORK_INTENT_BEGIN),b=body.indexOf(WORK_INTENT_END)+WORK_INTENT_END.length();return body.substring(0,a)+desired+body.substring(b);}
    private static String workIntentFingerprint(WorkIntentSpec s){Map<String,Object>m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",s.changeSetId());m.put("repositoryIdentity",s.repositoryIdentity());m.put("title",s.title());m.put("goal",s.goal());m.put("why",s.why());m.put("acceptance",s.acceptance());return sha256(Json.stringify(m).getBytes(StandardCharsets.UTF_8));}

    public Settings getSettings(){return ensureSettings();}
    public Settings setSettings(String repositoryRoot,String handling){
        setReviewDiffHandling(handling);
        if(repositoryRoot!=null&&!repositoryRoot.isBlank()){RepositoryConfig r=registerRepository(null,Path.of(repositoryRoot));selectRepository(r.id());}
        return ensureSettings();
    }
    public Settings setReviewDiffHandling(String handling){if(!List.of("Clipboard","RepoDiffFile","Both").contains(handling))throw new ObsException(PACKAGE_INVALID,"Unknown ReviewDiff handling: "+handling);Settings s=ensureSettings();Settings n=new Settings(s.repositories,s.selectedRepositoryId,s.selectedChangeSetId,handling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}
    public Settings setReviewDiffSendRetrySeconds(int seconds){if(seconds<MIN_REVIEW_SEND_RETRY_SECONDS||seconds>MAX_REVIEW_SEND_RETRY_SECONDS)throw new ObsException(PACKAGE_INVALID,"ReviewDiff send retry interval must be between "+MIN_REVIEW_SEND_RETRY_SECONDS+" and "+MAX_REVIEW_SEND_RETRY_SECONDS+" seconds.");Settings s=ensureSettings();Settings n=new Settings(s.repositories,s.selectedRepositoryId,s.selectedChangeSetId,s.reviewDiffHandling,seconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}
    public Settings setReviewChatTitleIgnoredCharacters(String ignored){if(ignored==null)ignored="";if(ignored.codePointCount(0,ignored.length())>128||ignored.indexOf('\n')>=0||ignored.indexOf('\r')>=0)throw new ObsException(PACKAGE_INVALID,"Review chat title ignored characters must contain at most 128 characters and no line breaks.");Settings s=ensureSettings();Settings n=new Settings(s.repositories,s.selectedRepositoryId,s.selectedChangeSetId,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,ignored);state.saveSettings(n);return n;}
    public RepositoryConfig registerRepository(String name,Path requested){
        Path repo=repoRoot(requested);String identity=repositoryIdentity(repo);Settings s=ensureSettings();List<RepositoryConfig> repos=new ArrayList<>(s.repositories);
        for(int i=0;i<repos.size();i++){RepositoryConfig r=repos.get(i);if(samePath(Path.of(r.path),repo)){RepositoryConfig n=new RepositoryConfig(r.id,displayRepositoryName(name,repo),repo.toString(),identity);repos.set(i,n);state.saveSettings(new Settings(List.copyOf(repos),n.id,s.selectedChangeSetId,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters));return n;}}
        RepositoryConfig n=new RepositoryConfig(UUID.randomUUID().toString(),displayRepositoryName(name,repo),repo.toString(),identity);repos.add(n);state.saveSettings(new Settings(List.copyOf(repos),n.id,s.selectedChangeSetId,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters));return n;
    }
    public Settings removeRepository(String repositoryId){Settings s=ensureSettings();RepositoryConfig r=findRepository(s,repositoryId);for(ChangeSet cs:state.activeChangeSets())if(belongsTo(cs,r))throw new ObsException(STATE_DIVERGED,"Repository has active or pending ChangeSets and cannot be removed.");List<RepositoryConfig> repos=new ArrayList<>(s.repositories);repos.removeIf(x->x.id.equals(repositoryId));String selected=Objects.equals(s.selectedRepositoryId,repositoryId)?(repos.isEmpty()?null:repos.get(0).id):s.selectedRepositoryId;String cs=Objects.equals(s.selectedRepositoryId,repositoryId)?null:s.selectedChangeSetId;Settings n=new Settings(List.copyOf(repos),selected,cs,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}
    public RepositoryConfig changeRepositoryLocation(String repositoryId,Path requested){
        try(StateStore.Lock ignored=state.lock()){
            Settings s=ensureSettings();RepositoryConfig current=findRepository(s,repositoryId);Path repo=repoRoot(requested);String identity=repositoryIdentity(repo);if(!same(identity,current.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Selected repository origin is "+identity+"; target expects "+current.repositoryIdentity+".");for(RepositoryConfig r:s.repositories)if(!r.id.equals(current.id)&&samePath(Path.of(r.path),repo))throw new ObsException(STATE_DIVERGED,"Selected location is already registered as another Repository Target: "+r.name+".");
            for(ChangeSet cs:state.getChangeSets())if((cs.repositoryTargetId==null||cs.repositoryTargetId.isBlank())&&same(cs.repositoryIdentity,current.repositoryIdentity)&&cs.repositoryRoot!=null&&samePath(Path.of(cs.repositoryRoot),Path.of(current.path))){cs.repositoryTargetId=current.id;state.saveChangeSet(cs);}
            List<RepositoryConfig> repos=new ArrayList<>(s.repositories);RepositoryConfig updated=new RepositoryConfig(current.id,current.name,repo.toString(),current.repositoryIdentity);for(int i=0;i<repos.size();i++)if(repos.get(i).id.equals(repositoryId)){repos.set(i,updated);break;}state.saveSettings(new Settings(List.copyOf(repos),s.selectedRepositoryId,s.selectedChangeSetId,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters));return updated;
        }
    }
    public Settings selectRepository(String repositoryId){Settings s=ensureSettings();findRepository(s,repositoryId);String cs=s.selectedChangeSetId;ChangeSet selected=state.getChangeSet(cs);RepositoryConfig r=findRepository(s,repositoryId);if(selected==null||!belongsTo(selected,r))cs=null;Settings n=new Settings(s.repositories,repositoryId,cs,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}
    public Settings selectChangeSet(String changeSetId){Settings s=ensureSettings();if(changeSetId==null||changeSetId.isBlank()){Settings n=new Settings(s.repositories,s.selectedRepositoryId,null,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+changeSetId);if(s.selectedRepositoryId==null)throw new ObsException(REPOSITORY_MISMATCH,"Select a registered repository first.");RepositoryConfig r=findRepository(s,s.selectedRepositoryId);if(!belongsTo(cs,r))throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet belongs to a different repository.");Settings n=new Settings(s.repositories,s.selectedRepositoryId,changeSetId,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);state.saveSettings(n);return n;}
    public List<RepositoryConfig> getRepositories(){return ensureSettings().repositories;}
    public List<ChangeSet> getChangeSets(String repositoryId,boolean includeFinalized){Settings s=ensureSettings();RepositoryConfig r=findRepository(s,repositoryId);List<ChangeSet> out=new ArrayList<>();for(ChangeSet cs:state.getChangeSets())if(belongsTo(cs,r)&&(includeFinalized||isUnfinished(cs)))out.add(cs);out.sort(workComparator());return out;}
    public List<ChangeSet> getGlobalChangeSets(boolean includeFinalized){List<ChangeSet> out=new ArrayList<>();for(ChangeSet cs:state.getChangeSets())if(includeFinalized||isUnfinished(cs))out.add(cs);out.sort(workComparator());return out;}
    public RepositoryConfig findRepositoryForChangeSet(String changeSetId){ChangeSet cs=state.getChangeSet(changeSetId);return cs==null?null:queryRepositoryForChangeSet(cs);}
    public RepositoryConfig repositoryForChangeSet(String changeSetId){ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)return null;return repositoryForChangeSet(cs,false);}
    public boolean hasFailedLatestOutcome(ChangeSet cs){return cs!=null&&isUnfinished(cs)&&("FAILED".equals(cs.lastOperationStatus)||"ACTION_REQUIRED".equals(cs.lastOperationStatus)||"UNCERTAIN".equals(cs.lastOperationStatus));}
    public ChangeSet getChangeSet(String id){return state.getChangeSet(id);}
    public List<ApplicationAttempt> getAttempts(){return state.getAttempts();}
    public String currentRepositoryBranch(String repositoryTargetId){RepositoryConfig target=findRepository(ensureSettings(),repositoryTargetId);Path repo=repoRoot(Path.of(target.path));String identity=repositoryIdentity(repo);if(!same(identity,target.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Registered repository origin changed from "+target.repositoryIdentity+" to "+identity+".");requireRepositoryReady(repo);GitClient.Result branch=git.allow(repo,STATE_DIVERGED,"symbolic-ref","--quiet","--short","HEAD");return branch.exitCode()==0?branch.first():"";}
    public WorkspaceStartResult startChangeSetWorkspace(String repositoryTargetId,String changeSetId,String changeSetLabel,String targetBranch){
        uuid(changeSetId,"changeSetId");if(changeSetLabel==null||changeSetLabel.isBlank())throw new ObsException(STATE_DIVERGED,"ChangeSet label is required.");String label=changeSetLabel.strip(),targetName=targetBranch==null?"":targetBranch.strip();if(targetName.isBlank())throw new ObsException(STATE_DIVERGED,"Target branch is required.");
        try(StateStore.Lock ignored=state.lock()){
            RepositoryConfig target=findRepository(ensureSettings(),repositoryTargetId);Path repo=repoRoot(Path.of(target.path));String identity=repositoryIdentity(repo);if(!same(identity,target.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Registered repository origin changed from "+target.repositoryIdentity+" to "+identity+".");requireRepositoryReady(repo);validateBranchName(repo,targetName);
            ChangeSet existing=state.getChangeSet(changeSetId);if(existing!=null){assertExistingWorkspaceRequest(existing,target,label,targetName);verifyReadyWorkspace(repo,existing.branch,Path.of(existing.worktree),existing.baseCommit,identity);try{Files.deleteIfExists(state.workspaceJournalPath(changeSetId));}catch(IOException ignoredDelete){}return new WorkspaceStartResult(existing,true);}
            Path journalPath=state.workspaceJournalPath(changeSetId);WorkspaceJournal journal;
            if(Files.exists(journalPath)){
                journal=WorkspaceJournal.from(state.readObject(journalPath));assertWorkspaceJournalRequest(journal,target,label,targetName);
            }else{
                String branch="changeset/"+changeSetId,base=resolveLocalBranchTip(repo,targetName);Path worktree=state.changeSetWorktreePath(changeSetId);
                if(gitRefExists(repo,"refs/heads/"+branch)||Files.exists(worktree,LinkOption.NOFOLLOW_LINKS))throw new ObsException(STATE_DIVERGED,"Cannot start ChangeSet workspace because its deterministic branch or worktree path already exists without a durable workspace journal: "+branch+" · "+worktree);
                journal=new WorkspaceJournal(changeSetId,label,target.id,target.repositoryIdentity,targetName,branch,worktree.toString(),base,Instant.now().toString());state.writeJson(journalPath,journal.json());
            }
            reconcileWorkspace(repo,journal);verifyReadyWorkspace(repo,journal.branch,Path.of(journal.worktree),journal.baseCommit,identity);
            ChangeSet cs=new ChangeSet();cs.changeSetId=journal.changeSetId;cs.changeSetLabel=journal.changeSetLabel;cs.repositoryIdentity=identity;cs.repositoryTargetId=target.id;cs.repositoryRoot=repo.toString();cs.status="Active";WorkIntentState workIntent=state.getWorkIntent(journal.changeSetId);if(workIntent!=null){if(!same(workIntent.repositoryIdentity(),identity))throw new ObsException(WORK_INTENT_CONFLICT,"Work Intent repository differs from workspace repository.");cs.issueNumber=workIntent.issueNumber();cs.issueUrl=workIntent.issueUrl();}cs.targetBranch=journal.targetBranch;cs.branch=journal.branch;cs.worktree=Path.of(journal.worktree).toAbsolutePath().normalize().toString();cs.baseCommit=journal.baseCommit;cs.publishedTip=journal.baseCommit;cs.executionState="Ready";cs.createdAt=journal.createdAt;cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,"ChangeSet workspace ready at "+journal.baseCommit+".");state.saveChangeSet(cs);try{Files.deleteIfExists(journalPath);}catch(IOException ignoredDelete){}return new WorkspaceStartResult(cs,false);
        }
    }
    public ReviewDiff currentReview(ChangeSet cs){if(cs==null)return null;if(cs.currentReviewAttemptId==null||cs.currentReviewDiffPath==null||cs.currentReviewSha256==null)return null;ReviewDiff r=new ReviewDiff(cs.currentReviewAttemptId,Path.of(cs.currentReviewDiffPath),cs.currentReviewSha256,cs.currentReviewHead);verifiedReviewDiffPath(r);return r;}

    public SnapshotExportResult exportRepositorySnapshot(Path repositoryRoot,String mode,String commitRef,Path outputDirectory){
        RepositoryConfig allowed=requireAllowedRepository(repositoryRoot);Path repo=Path.of(allowed.path);requireRepositoryReady(repo);
        return new RepositorySnapshotExporter(git).export(repo,allowed.repositoryIdentity,mode,commitRef,outputDirectory);
    }

    public String chatBridgePairingToken(){return chatBridge.pairingToken();}
    public List<ChatConversation> getOpenChatConversations(){return chatBridge.openConversations();}
    public ChatBinding getReviewChatBinding(String changeSetId){if(changeSetId==null||changeSetId.isBlank())return null;return chatBridge.binding(changeSetId);}
    public ChatBinding bindReviewChat(String changeSetId,String conversationKey){ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)throw new ObsException(CHAT_BRIDGE_FAILED,"Unknown ChangeSet: "+changeSetId);return chatBridge.bind(changeSetId,conversationKey);}
    public void unbindReviewChat(String changeSetId){if(state.getChangeSet(changeSetId)==null)throw new ObsException(CHAT_BRIDGE_FAILED,"Unknown ChangeSet: "+changeSetId);chatBridge.unbind(changeSetId);}
    public ChatTaskInfo sendCurrentReviewToChat(String changeSetId){ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)throw new ObsException(CHAT_BRIDGE_FAILED,"Unknown ChangeSet: "+changeSetId);ChatBinding b=chatBridge.binding(changeSetId);if(b==null)throw new ObsException(CHAT_BRIDGE_FAILED,"Select and bind an open ChatGPT conversation first.");ReviewDiff r=currentReview(cs);if(r==null)throw new ObsException(CHAT_BRIDGE_FAILED,"No current ReviewDiff is available.");return chatBridge.enqueueReview(cs,r,b,true);}
    public String chatDeliveryStatus(String changeSetId){ChangeSet cs=state.getChangeSet(changeSetId);return cs==null?"Not connected":chatBridge.deliveryStatus(changeSetId,cs.currentReviewAttemptId);}
    public ChatTaskInfo attachSnapshotToChat(Path snapshotZip,String conversationKey){return attachSnapshotToChat(snapshotZip,conversationKey,false);}
    public ChatTaskInfo attachSnapshotToChat(Path snapshotZip,String conversationKey,boolean autoSend){return chatBridge.enqueueSnapshot(snapshotZip,conversationKey,autoSend);}
    public List<ExternalInteraction> getExternalInteractions(){return chatBridge.externalInteractions();}
    public ExternalInteraction cancelExternalInteraction(String interactionId){return chatBridge.cancelExternalInteraction(interactionId);}
    public ExternalInteraction dismissExternalInteraction(String interactionId){return chatBridge.dismissExternalInteraction(interactionId);}

    private void assertExistingWorkspaceRequest(ChangeSet existing,RepositoryConfig target,String label,String targetBranch){
        if(existing.worktree==null||existing.worktree.isBlank()||existing.baseCommit==null||existing.baseCommit.isBlank()||existing.publishedTip==null||existing.publishedTip.isBlank()||existing.executionState==null)throw new ObsException(STATE_DIVERGED,"ChangeSet already exists but is not a Git-backed workspace: "+existing.changeSetId);
        if(!"Active".equals(existing.status)||!"Ready".equals(existing.executionState))throw new ObsException(STATE_DIVERGED,"ChangeSet workspace is not in Ready state: "+existing.executionState);
        if(!Objects.equals(existing.repositoryTargetId,target.id)||!same(existing.repositoryIdentity,target.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Existing ChangeSet workspace belongs to a different Repository Target.");
        if(!Objects.equals(existing.changeSetLabel,label))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet label differs from requested label.");
        if(!Objects.equals(existing.targetBranch,targetBranch))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet target branch differs from requested target branch.");
        String expectedBranch="changeset/"+existing.changeSetId;if(!Objects.equals(existing.branch,expectedBranch))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet branch differs from deterministic branch "+expectedBranch+".");
        if(!Objects.equals(existing.baseCommit,existing.publishedTip))throw new ObsException(STATE_DIVERGED,"Ready ChangeSet baseCommit/publishedTip disagree before package migration.");
    }
    private void assertWorkspaceJournalRequest(WorkspaceJournal journal,RepositoryConfig target,String label,String targetBranch){
        if(journal.changeSetId==null||journal.branch==null||journal.worktree==null||journal.baseCommit==null)throw new ObsException(STATE_DIVERGED,"ChangeSet workspace journal is incomplete.");
        if(!Objects.equals(journal.changeSetLabel,label)||!Objects.equals(journal.repositoryTargetId,target.id)||!same(journal.repositoryIdentity,target.repositoryIdentity)||!Objects.equals(journal.targetBranch,targetBranch))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet workspace journal describes a different requested workspace.");
        if(!Objects.equals(journal.branch,"changeset/"+journal.changeSetId))throw new ObsException(STATE_DIVERGED,"ChangeSet workspace journal branch is not deterministic.");
        if(!samePath(Path.of(journal.worktree),state.changeSetWorktreePath(journal.changeSetId)))throw new ObsException(STATE_DIVERGED,"ChangeSet workspace journal path differs from the deterministic worktree path.");
    }
    private void reconcileWorkspace(Path repo,WorkspaceJournal journal){
        Path worktree=Path.of(journal.worktree).toAbsolutePath().normalize(),recoveryRoot=state.workspaceRecoveryPath(journal.changeSetId);String branchRef="refs/heads/"+journal.branch;boolean branchExists=gitRefExists(repo,branchRef);
        if(branchExists){String tip=git.run(repo,STATE_DIVERGED,"rev-parse","--verify",branchRef+"^{commit}").first();if(!Objects.equals(tip,journal.baseCommit))throw new ObsException(STATE_DIVERGED,"Recovered ChangeSet branch tip differs from durable baseCommit.");}
        if(Files.exists(worktree,LinkOption.NOFOLLOW_LINKS)){
            GitClient.Result rootProbe=git.allow(worktree,STATE_DIVERGED,"rev-parse","--show-toplevel");
            if(rootProbe.exitCode()==0&&!rootProbe.first().isBlank()){verifyReadyWorkspace(repo,journal.branch,worktree,journal.baseCommit,journal.repositoryIdentity);return;}
            WorktreeRegistration registration=worktreeRegistration(repo,worktree);assertJournalRegistration(registration,journal);
            preservePartialWorktree(worktree,recoveryRoot);clearJournalRegistration(repo,worktree,registration,journal);
        }else{
            WorktreeRegistration registration=worktreeRegistration(repo,worktree);assertJournalRegistration(registration,journal);clearJournalRegistration(repo,worktree,registration,journal);
        }
        try{Files.createDirectories(worktree.getParent());}catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot create ChangeSet worktree parent: "+e.getMessage(),e);}
        if(branchExists){GitClient.Result add=git.allow(repo,STATE_DIVERGED,"worktree","add",worktree.toString(),journal.branch);if(add.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Cannot recover ChangeSet worktree from its durable journal.\n--- git details ---\n"+add.failureDetails());}
        else{GitClient.Result add=git.allow(repo,STATE_DIVERGED,"worktree","add","-b",journal.branch,worktree.toString(),journal.baseCommit);if(add.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Cannot create ChangeSet branch/worktree.\n--- git details ---\n"+add.failureDetails());}
    }
    private WorktreeRegistration worktreeRegistration(Path repo,Path expected){
        List<String> lines=git.run(repo,STATE_DIVERGED,"worktree","list","--porcelain").stdout();Path path=null;String head=null,branch=null;
        for(int i=0;i<=lines.size();i++){String line=i==lines.size()?"":lines.get(i);if(line.isBlank()){if(path!=null&&samePath(path,expected))return new WorktreeRegistration(path,head,branch);path=null;head=null;branch=null;continue;}if(line.startsWith("worktree "))path=Path.of(line.substring("worktree ".length()));else if(line.startsWith("HEAD "))head=line.substring("HEAD ".length()).trim();else if(line.startsWith("branch "))branch=line.substring("branch ".length()).trim();}
        return null;
    }
    private void assertJournalRegistration(WorktreeRegistration registration,WorkspaceJournal journal){
        if(registration==null)return;String expectedBranch="refs/heads/"+journal.branch;if(!Objects.equals(registration.branch,expectedBranch)||!Objects.equals(registration.head,journal.baseCommit))throw new ObsException(STATE_DIVERGED,"Journal-owned worktree path has a Git registration that does not match the durable branch/base intent: "+registration.path);
    }
    private void clearJournalRegistration(Path repo,Path worktree,WorktreeRegistration registration,WorkspaceJournal journal){
        if(registration==null)return;GitClient.Result remove=git.allow(repo,STATE_DIVERGED,"worktree","remove","--force",worktree.toString());if(remove.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Cannot clear stale journal-owned worktree registration.\n--- git details ---\n"+remove.failureDetails());if(worktreeRegistration(repo,worktree)!=null)throw new ObsException(STATE_DIVERGED,"Stale journal-owned worktree registration remains after cleanup: "+worktree);
    }
    private Path preservePartialWorktree(Path worktree,Path recoveryRoot){
        try{
            if(Files.exists(recoveryRoot,LinkOption.NOFOLLOW_LINKS)&&!Files.isDirectory(recoveryRoot,LinkOption.NOFOLLOW_LINKS))throw new IOException("Recovery root exists but is not a directory: "+recoveryRoot);
            Files.createDirectories(recoveryRoot);Path recovery=null;
            for(int i=1;i<=999999;i++){Path candidate=recoveryRoot.resolve(String.format(Locale.ROOT,"partial-%06d",i));if(!Files.exists(candidate,LinkOption.NOFOLLOW_LINKS)){recovery=candidate;break;}}
            if(recovery==null)throw new IOException("No free preserved-partial slot remains under "+recoveryRoot);
            try{Files.move(worktree,recovery,StandardCopyOption.ATOMIC_MOVE);}catch(AtomicMoveNotSupportedException e){Files.move(worktree,recovery);}
            return recovery;
        }catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot preserve partial journal-owned ChangeSet worktree before recovery: "+e.getMessage(),e);}
    }
    private void verifyReadyWorkspace(Path repo,String branch,Path worktree,String baseCommit,String repositoryIdentity){
        Path expected=worktree.toAbsolutePath().normalize();if(!Files.exists(expected,LinkOption.NOFOLLOW_LINKS))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is missing: "+expected);Path actual=repoRoot(expected);if(!samePath(actual,expected))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree root differs from persisted path.");String identity=repositoryIdentity(actual);if(!same(identity,repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet worktree repository identity differs from its Repository Target.");if(!samePath(gitCommonDir(repo),gitCommonDir(actual)))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is attached to a different Git repository.");
        GitClient.Result symbolic=git.allow(actual,STATE_DIVERGED,"symbolic-ref","--quiet","--short","HEAD");if(symbolic.exitCode()!=0||!Objects.equals(symbolic.first(),branch))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is not on expected branch "+branch+".");String head=git.run(actual,STATE_DIVERGED,"rev-parse","HEAD").first(),branchTip=git.run(repo,STATE_DIVERGED,"rev-parse","--verify","refs/heads/"+branch+"^{commit}").first();if(!Objects.equals(head,baseCommit)||!Objects.equals(branchTip,baseCommit))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree/branch tip differs from durable baseCommit.");String dirty=git.run(actual,STATE_DIVERGED,"status","--porcelain","--untracked-files=all").joined();if(!dirty.isBlank())throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is not clean and cannot be considered Ready.");
    }
    private String resolveLocalBranchTip(Path repo,String targetBranch){GitClient.Result result=git.allow(repo,REPOSITORY_NOT_READY,"rev-parse","--verify","refs/heads/"+targetBranch+"^{commit}");if(result.exitCode()!=0||result.first().isBlank())throw new ObsException(REPOSITORY_NOT_READY,"Target branch does not resolve to a local commit: "+targetBranch+".\n--- git details ---\n"+result.failureDetails());return result.first();}
    private void validateBranchName(Path repo,String branch){GitClient.Result valid=git.allow(repo,STATE_DIVERGED,"check-ref-format","--branch",branch);if(valid.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Invalid target branch name: "+branch+".\n--- git details ---\n"+valid.failureDetails());}
    private boolean gitRefExists(Path repo,String ref){return git.allow(repo,STATE_DIVERGED,"show-ref","--verify","--quiet",ref).exitCode()==0;}
    private Path gitCommonDir(Path repo){String value=git.run(repo,STATE_DIVERGED,"rev-parse","--git-common-dir").first();if(value.isBlank())throw new ObsException(STATE_DIVERGED,"Git common directory is unavailable.");Path p=Path.of(value);if(!p.isAbsolute())p=repo.resolve(p);try{return p.toRealPath();}catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot resolve Git common directory: "+e.getMessage(),e);}}
    private static boolean isGitBackedWorkspace(ChangeSet cs){return cs!=null&&cs.worktree!=null&&!cs.worktree.isBlank()&&cs.baseCommit!=null&&!cs.baseCommit.isBlank()&&cs.executionState!=null&&!cs.executionState.isBlank();}

    private Settings ensureSettings(){
        Settings s=state.getSettings();boolean changed=false;List<RepositoryConfig> repos=new ArrayList<>();
        for(RepositoryConfig r:s.repositories){if(r.repositoryIdentity==null||r.repositoryIdentity.isBlank()){try{Path repo=repoRoot(Path.of(r.path));String identity=repositoryIdentity(repo);String name=r.name==null||r.name.isBlank()?displayRepositoryName(null,repo):r.name;repos.add(new RepositoryConfig(r.id,name,repo.toString(),identity));changed=true;}catch(ObsException e){repos.add(r);}}else repos.add(r);}
        String selected=s.selectedRepositoryId;boolean selectedExists=false;for(RepositoryConfig r:repos)if(Objects.equals(r.id,selected)){selectedExists=true;break;}if(selected!=null&&!selectedExists){selected=repos.isEmpty()?null:repos.get(0).id;changed=true;}if(selected==null&&!repos.isEmpty()){selected=repos.get(0).id;changed=true;}String selectedCs=s.selectedChangeSetId;if(selectedCs!=null){ChangeSet cs=state.getChangeSet(selectedCs);RepositoryConfig rr=null;for(RepositoryConfig r:repos)if(Objects.equals(r.id,selected)){rr=r;break;}if(cs==null||rr==null||!belongsTo(cs,rr)){selectedCs=null;changed=true;}}
        Settings n=new Settings(List.copyOf(repos),selected,selectedCs,s.reviewDiffHandling,s.reviewDiffSendRetrySeconds,s.reviewChatTitleIgnoredCharacters);if(changed)state.saveSettings(n);return n;
    }
    private RepositoryConfig requireAllowedRepository(Path requested){Settings s=ensureSettings();Path repo=repoRoot(requested);for(RepositoryConfig r:s.repositories)if(samePath(Path.of(r.path),repo)){String identity=repositoryIdentity(repo);if(!same(identity,r.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Registered repository origin changed from "+r.repositoryIdentity+" to "+identity+".");return r;}throw new ObsException(REPOSITORY_MISMATCH,"Repository is not registered in Replacement Package App: "+repo);}
    private static RepositoryConfig findRepository(Settings s,String id){if(id==null||id.isBlank())throw new ObsException(REPOSITORY_MISMATCH,"No registered repository is selected.");for(RepositoryConfig r:s.repositories)if(r.id.equals(id))return r;throw new ObsException(REPOSITORY_MISMATCH,"Unknown registered repository: "+id);}
    private RepositoryConfig queryRepositoryForChangeSet(ChangeSet cs){
        Settings s=ensureSettings();
        if(cs.repositoryTargetId!=null&&!cs.repositoryTargetId.isBlank())for(RepositoryConfig r:s.repositories)if(r.id.equals(cs.repositoryTargetId))return r;
        if(cs.repositoryRoot!=null)for(RepositoryConfig r:s.repositories)if(same(cs.repositoryIdentity,r.repositoryIdentity)&&samePath(Path.of(cs.repositoryRoot),Path.of(r.path)))return r;
        return null;
    }
    private RepositoryConfig repositoryForChangeSet(ChangeSet cs,boolean requireAvailable){
        RepositoryConfig match=queryRepositoryForChangeSet(cs);
        if(match==null)throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet Repository Target is not registered: "+cs.changeSetId);
        if(cs.repositoryTargetId==null||cs.repositoryTargetId.isBlank()){cs.repositoryTargetId=match.id;state.saveChangeSet(cs);}
        if(requireAvailable){Path repo=repoRoot(Path.of(match.path));String identity=repositoryIdentity(repo);if(!same(identity,match.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Registered repository origin changed from "+match.repositoryIdentity+" to "+identity+".");}
        return match;
    }
    private RepositoryConfig operationRepository(ChangeSet cs,Path explicit,String operation){RepositoryConfig target=repositoryForChangeSet(cs,true);Path repo=Path.of(target.path).toAbsolutePath().normalize();if(explicit!=null){Path supplied=repoRoot(explicit);if(!samePath(supplied,repo))throw new ObsException(REPOSITORY_MISMATCH,operation+" repository differs from the ChangeSet Repository Target location.");}cs.repositoryTargetId=target.id;cs.repositoryRoot=repo.toString();return target;}
    private RepositoryConfig repositoryByPath(Path requested){return requireAllowedRepository(requested);}

    private static boolean belongsTo(ChangeSet cs,RepositoryConfig r){if(cs==null||r==null)return false;if(cs.repositoryTargetId!=null&&!cs.repositoryTargetId.isBlank())return Objects.equals(cs.repositoryTargetId,r.id);return same(cs.repositoryIdentity,r.repositoryIdentity)&&cs.repositoryRoot!=null&&samePath(Path.of(cs.repositoryRoot),Path.of(r.path));}
    private static boolean isUnfinished(ChangeSet cs){return cs!=null&&("Active".equals(cs.status)||"CommittedPendingPush".equals(cs.status));}
    private Comparator<ChangeSet> workComparator(){return Comparator.comparingInt((ChangeSet c)->hasFailedLatestOutcome(c)?0:isUnfinished(c)?1:2).thenComparing((ChangeSet c)->c.updatedAt==null?"":c.updatedAt,Comparator.reverseOrder());}
    private static int statusRank(String s){if("CommittedPendingPush".equals(s))return 0;if("Active".equals(s))return 1;return 2;}
    private static String displayRepositoryName(String requested,Path repo){if(requested!=null&&!requested.isBlank())return requested.trim();Path n=repo.getFileName();return n==null?repo.toString():n.toString();}

    public ObsAction parseAction(String text){
        if(text==null||text.isBlank())return null;String[] lines=text.split("\\R",-1);if(lines.length<2||!lines[0].trim().equals("OBS-ACTION/1"))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION must begin with OBS-ACTION/1.");
        Map<String,String> m=new LinkedHashMap<>();for(int i=1;i<lines.length;i++){String line=lines[i].trim();if(line.isEmpty())continue;int p=line.indexOf(':');if(p<1)throw new ObsException(PACKAGE_INVALID,"Invalid OBS-ACTION line: "+line);String k=line.substring(0,p).trim(),v=line.substring(p+1).trim();if(m.putIfAbsent(k,v)!=null)throw new ObsException(PACKAGE_INVALID,"Duplicate OBS-ACTION field: "+k);}
        for(String k:List.of("action","name"))if(m.get(k)==null||m.get(k).isBlank())throw new ObsException(PACKAGE_INVALID,"Missing OBS-ACTION field: "+k);String action=m.get("action");
        String archive=null,packageId=null,targetBranch=null,workIntent=null,changeSetId=null,chatTabTitle=null,chatContextToken=null;
        if("apply-package".equals(action)){
            for(String k:List.of("archive","packageId"))if(m.get(k)==null||m.get(k).isBlank())throw new ObsException(PACKAGE_INVALID,"Missing OBS-ACTION field: "+k);archive=filenameHint(m.get("archive"),"archive");packageId=m.get("packageId");uuid(packageId,"OBS-ACTION packageId");
            targetBranch=m.get("targetBranch");if(targetBranch!=null){targetBranch=targetBranch.trim();if(targetBranch.isBlank())throw new ObsException(PACKAGE_INVALID,"OBS-ACTION targetBranch must be omitted or non-empty.");if(targetBranch.length()>255)throw new ObsException(PACKAGE_INVALID,"OBS-ACTION targetBranch is too long.");}
            chatTabTitle=m.get("chatTabTitle");if(chatTabTitle!=null){chatTabTitle=chatTabTitle.trim();if(chatTabTitle.isBlank())throw new ObsException(PACKAGE_INVALID,"OBS-ACTION chatTabTitle must be omitted or non-empty.");if(chatTabTitle.length()>512)throw new ObsException(PACKAGE_INVALID,"OBS-ACTION chatTabTitle is too long.");}
            chatContextToken=m.get("chatContextToken");if(chatContextToken!=null){chatContextToken=chatContextToken.trim();uuid(chatContextToken,"OBS-ACTION chatContextToken");}
            if(m.containsKey("workIntent")||m.containsKey("changeSetId"))throw new ObsException(PACKAGE_INVALID,"apply-package obtains Work Intent identity from PACKAGE.json; standalone workIntent/changeSetId fields are not allowed.");
        }else if("create-work-intent".equals(action)){
            for(String k:List.of("workIntent","changeSetId"))if(m.get(k)==null||m.get(k).isBlank())throw new ObsException(PACKAGE_INVALID,"Missing OBS-ACTION field: "+k);workIntent=filenameHint(m.get("workIntent"),"workIntent");changeSetId=m.get("changeSetId");uuid(changeSetId,"OBS-ACTION changeSetId");
            for(String k:List.of("archive","packageId","targetBranch","chatTabTitle","chatContextToken"))if(m.containsKey(k))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION field '"+k+"' is not valid for create-work-intent.");
        }else throw new ObsException(PACKAGE_INVALID,"Unsupported OBS-ACTION action: "+action+". Supported external command routes are create-work-intent and apply-package.");
        return new ObsAction(action,m.get("name"),archive,packageId,targetBranch,workIntent,changeSetId,chatTabTitle,chatContextToken);
    }

    private static String filenameHint(String value,String field){if(value==null||value.isBlank()||!Path.of(value).getFileName().toString().equals(value)||value.contains("\\")||value.contains("/"))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION "+field+" must be a filename hint, not a path.");return value;}

    public WorkIntentSpec resolveWorkIntentForAction(ObsAction action){if(action==null||!"create-work-intent".equals(action.action()))throw new ObsException(PACKAGE_INVALID,"create-work-intent OBS-ACTION is required.");List<Path> c=new ArrayList<>();String home=System.getProperty("user.home");for(Path d:List.of(Path.of(home,"Downloads"),Path.of(".").toAbsolutePath().normalize())){Path p=d.resolve(action.workIntent());if(Files.isRegularFile(p))c.add(p.toAbsolutePath().normalize());}List<WorkIntentSpec> matches=new ArrayList<>();for(Path p:new LinkedHashSet<>(c)){try{WorkIntentSpec spec=readWorkIntent(p);if(Objects.equals(spec.changeSetId(),action.changeSetId()))matches.add(spec);}catch(RuntimeException ignored){}}if(matches.isEmpty())throw new ObsException(PACKAGE_NOT_FOUND,"No Work Intent file matched ChangeSet "+action.changeSetId());if(matches.size()>1)throw new ObsException(PACKAGE_INVALID,"More than one Work Intent file matched ChangeSet; remove the duplicate or use a unique filename.");return matches.get(0);}

    public WorkIntentSpec readWorkIntent(Path path){if(path==null||!Files.isRegularFile(path))throw new ObsException(PACKAGE_NOT_FOUND,"Work Intent file not found: "+path);try{return parseWorkIntentObject(Json.object(Files.readString(path,StandardCharsets.UTF_8)),null,null);}catch(ObsException e){throw e;}catch(Exception e){throw new ObsException(PACKAGE_INVALID,"Work Intent file is invalid: "+e.getMessage(),e);}}

    @SuppressWarnings("unchecked") private static WorkIntentSpec parseWorkIntentObject(Object raw,String expectedChangeSetId,String expectedRepositoryIdentity){if(!(raw instanceof Map<?,?> rm))throw new ObsException(PACKAGE_INVALID,"workIntent must be an object.");Map<String,Object>m=(Map<String,Object>)rm;if(num(m.get("schemaVersion"))!=1)throw new ObsException(PACKAGE_INVALID,"Unsupported workIntent schemaVersion: "+m.get("schemaVersion"));String cs=str(m.get("changeSetId")),repo=str(m.get("repositoryIdentity")),title=requiredText(m,"title"),goal=requiredText(m,"goal"),why=requiredText(m,"why");uuid(cs,"workIntent.changeSetId");if(repo==null||!repo.matches("^github:[^/\\s]+/[^/\\s]+$"))throw new ObsException(PACKAGE_INVALID,"workIntent.repositoryIdentity must be github:<owner>/<repo>.");if(expectedChangeSetId!=null&&!Objects.equals(expectedChangeSetId,cs))throw new ObsException(PACKAGE_INVALID,"workIntent.changeSetId does not match package changeSetId.");if(expectedRepositoryIdentity!=null&&!same(expectedRepositoryIdentity,repo))throw new ObsException(PACKAGE_INVALID,"workIntent.repositoryIdentity does not match package repositoryIdentity.");Object ar=m.get("acceptance");if(!(ar instanceof List<?> l)||l.isEmpty())throw new ObsException(PACKAGE_INVALID,"workIntent.acceptance[] must contain at least one criterion.");List<String>a=new ArrayList<>();for(Object x:l){String v=str(x);if(v==null||v.isBlank())throw new ObsException(PACKAGE_INVALID,"workIntent.acceptance[] entries must be non-empty.");a.add(v.strip());}return new WorkIntentSpec(1,cs,repo,title.strip(),goal.strip(),why.strip(),List.copyOf(a));}
    private static String requiredText(Map<String,Object>m,String key){String v=str(m.get(key));if(v==null||v.isBlank())throw new ObsException(PACKAGE_INVALID,"workIntent."+key+" is required.");return v;}

    public Path resolveArchiveForAction(ObsAction action,Path explicit){if(explicit!=null)return explicit.toAbsolutePath().normalize();List<Path> c=new ArrayList<>();String home=System.getProperty("user.home");for(Path d:List.of(Path.of(home,"Downloads"),Path.of(".").toAbsolutePath().normalize())){Path p=d.resolve(action.archive());if(Files.isRegularFile(p))c.add(p.toAbsolutePath().normalize());}List<Path> matches=new ArrayList<>();for(Path p:new LinkedHashSet<>(c)){try{if(readPackage(p).manifest.packageId.equals(action.packageId()))matches.add(p);}catch(RuntimeException ignored){}}if(matches.isEmpty())throw new ObsException(PACKAGE_NOT_FOUND,"No candidate archive matched packageId "+action.packageId());if(matches.size()>1)throw new ObsException(PACKAGE_INVALID,"More than one candidate archive matched packageId; select ZIP explicitly.");return matches.get(0);}

    public PackageData readPackage(Path archive){
        if(archive==null||!Files.isRegularFile(archive))throw new ObsException(PACKAGE_NOT_FOUND,"Archive not found: "+archive);Map<String,byte[]> files=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);Map<String,String> canonical=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        try(ZipFile zip=new ZipFile(archive.toFile(),StandardCharsets.UTF_8)){
            Enumeration<? extends ZipEntry> en=zip.entries();while(en.hasMoreElements()){ZipEntry e=en.nextElement();String n=e.getName();if(n==null||n.isBlank())continue;validateZipEntry(n);String prior=canonical.putIfAbsent(n,n);if(prior!=null)throw new ObsException(PACKAGE_INVALID,"Colliding ZIP entry: "+n);if(!e.isDirectory()){try(InputStream in=zip.getInputStream(e)){files.put(n,in.readAllBytes());}}}
        }catch(ObsException e){throw e;}catch(IOException e){throw new ObsException(PACKAGE_INVALID,"Cannot open ZIP: "+e.getMessage(),e);}
        byte[] manifestBytes=files.get("PACKAGE.json");if(manifestBytes==null||!canonical.getOrDefault("PACKAGE.json","").equals("PACKAGE.json"))throw new ObsException(PACKAGE_INVALID,"PACKAGE.json missing at ZIP root or wrong case.");String text=utf8Strict(manifestBytes,"PACKAGE.json");Map<String,Object> m;try{m=Json.object(text);}catch(RuntimeException e){throw new ObsException(PACKAGE_INVALID,"PACKAGE.json parse failed: "+e.getMessage());}
        if(num(m.get("schemaVersion"))!=1)throw new ObsException(PACKAGE_INVALID,"Unsupported schemaVersion: "+m.get("schemaVersion"));String packageId=str(m.get("packageId")),changeSetId=str(m.get("changeSetId")),label=str(m.get("changeSetLabel")),repoId=str(m.get("repositoryIdentity"));uuid(packageId,"packageId");uuid(changeSetId,"changeSetId");if(label==null||label.isBlank())throw new ObsException(PACKAGE_INVALID,"changeSetLabel is required.");if(repoId==null||!repoId.matches("^github:[^/\\s]+/[^/\\s]+$"))throw new ObsException(PACKAGE_INVALID,"repositoryIdentity must be github:<owner>/<repo>.");WorkIntentSpec workIntent=m.get("workIntent")==null?null:parseWorkIntentObject(m.get("workIntent"),changeSetId,repoId);
        Object ovs=m.get("operations");if(!(ovs instanceof List<?> ol))throw new ObsException(PACKAGE_INVALID,"operations[] is required.");List<Operation> ops=new ArrayList<>();Set<String> seen=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);Set<String> expected=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);expected.add("PACKAGE.json");Map<String,byte[]> base=new TreeMap<>(String.CASE_INSENSITIVE_ORDER),repl=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for(Object x:ol){if(!(x instanceof Map<?,?> raw))throw new ObsException(PACKAGE_INVALID,"Operation must be an object.");String path=normalizeRepoPath(str(raw.get("path"))),action=str(raw.get("action"));if(!List.of("add","replace","delete").contains(action))throw new ObsException(PACKAGE_INVALID,"Unsupported action '"+action+"' for "+path);if(!seen.add(path))throw new ObsException(PACKAGE_INVALID,"Duplicate/colliding operation path: "+path);String b="base-files/"+path,r="replacement-files/"+path;switch(action){case"add"->{if(files.containsKey(b)||!files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid add payload set: "+path);expected.add(r);repl.put(path,files.get(r));}case"replace"->{if(!files.containsKey(b)||!files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid replace payload set: "+path);expected.add(b);expected.add(r);base.put(path,files.get(b));repl.put(path,files.get(r));}case"delete"->{if(!files.containsKey(b)||files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid delete payload set: "+path);expected.add(b);base.put(path,files.get(b));}}ops.add(new Operation(path,action));}
        for(String n:files.keySet())if(!expected.contains(n))throw new ObsException(PACKAGE_INVALID,"Undeclared ZIP payload file: "+n);
        return new PackageData(archive.toAbsolutePath().normalize(),sha256(archive),new PackageManifest(1,packageId,changeSetId,label,repoId,workIntent,List.copyOf(ops)),base,repl);
    }

    public ApplyTargetResolution resolveApplyTarget(String actionText,Path archive,String currentRepositoryId){
        ObsAction action=actionText==null||actionText.isBlank()?null:parseAction(actionText);if(action!=null&&!"apply-package".equals(action.action()))throw new ObsException(PACKAGE_INVALID,"This operation requires OBS-ACTION action: apply-package.");Path p=action==null?archive:resolveArchiveForAction(action,archive);PackageData pkg=readPackage(p);if(action!=null&&!pkg.manifest.packageId.equals(action.packageId()))throw new ObsException(ACTION_PACKAGE_MISMATCH,"OBS-ACTION packageId does not match PACKAGE.json.");
        return resolveApplyTarget(pkg,currentRepositoryId);
    }

    private ApplyTargetResolution resolveApplyTarget(PackageData pkg,String currentRepositoryId){
        Settings settings=ensureSettings();ChangeSet existing=state.getChangeSet(pkg.manifest.changeSetId);
        if(existing!=null){RepositoryConfig target=repositoryForChangeSet(existing,false);if(!same(existing.repositoryIdentity,pkg.manifest.repositoryIdentity))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet repository identity differs from package.");return new ApplyTargetResolution(target,List.of(target),!Objects.equals(currentRepositoryId,target.id),"Existing ChangeSet target");}
        RepositoryConfig current=null;if(currentRepositoryId!=null)for(RepositoryConfig r:settings.repositories)if(r.id.equals(currentRepositoryId)){current=r;break;}
        if(current!=null&&same(current.repositoryIdentity,pkg.manifest.repositoryIdentity))return new ApplyTargetResolution(current,List.of(current),false,"Current matching target");
        List<RepositoryConfig> matches=new ArrayList<>();for(RepositoryConfig r:settings.repositories)if(same(r.repositoryIdentity,pkg.manifest.repositoryIdentity))matches.add(r);
        if(matches.isEmpty())throw new ObsException(REPOSITORY_MISMATCH,"No registered Repository Target matches "+pkg.manifest.repositoryIdentity+".");
        if(matches.size()==1)return new ApplyTargetResolution(matches.get(0),List.copyOf(matches),!Objects.equals(currentRepositoryId,matches.get(0).id),"Unique matching target");
        return new ApplyTargetResolution(null,List.copyOf(matches),false,"Multiple matching Repository Targets require explicit selection");
    }

    public PreparedApply prepareApply(String actionText,Path archive,String currentRepositoryId){
        PackageData pkg=null;
        try{
            ObsAction action=actionText==null||actionText.isBlank()?null:parseAction(actionText);
            if(action!=null&&!"apply-package".equals(action.action()))throw new ObsException(PACKAGE_INVALID,"Apply Package requires OBS-ACTION action: apply-package.");
            Path selected=action==null?archive:resolveArchiveForAction(action,archive);
            pkg=readPackage(selected);
            if(action!=null&&!pkg.manifest.packageId.equals(action.packageId()))throw new ObsException(ACTION_PACKAGE_MISMATCH,"OBS-ACTION packageId does not match PACKAGE.json.");
            if(action!=null&&action.targetBranch()!=null&&pkg.manifest.workIntent()==null)throw new ObsException(PACKAGE_INVALID,"Automatic target-mode apply-package requires PACKAGE.json workIntent.");
            ApplyTargetResolution target=resolveApplyTarget(pkg,currentRepositoryId);
            ChangeSet existing=state.getChangeSet(pkg.manifest.changeSetId);
            String token=changeSetStateToken(existing);
            ChatBinding binding=chatBridge.binding(pkg.manifest.changeSetId);
            ReviewChatBindingPlan chatPlan=resolveReviewChatBindingPlan(action,pkg.manifest.changeSetId,binding);
            List<OperationNotice> notices=new ArrayList<>();
            if(chatPlan.kind()==ReviewChatPlanKind.NO_MATCH)notices.add(new OperationNotice("WARNING","CHAT_TITLE_NO_MATCH","OBS-ACTION chatTabTitle '"+chatPlan.requestedTitle()+"' did not match any currently open ordinary ChatGPT conversation after configured title normalization; Apply may continue and manual binding remains available."));
            if(chatPlan.kind()==ReviewChatPlanKind.AMBIGUOUS)notices.add(new OperationNotice("WARNING","CHAT_TITLE_AMBIGUOUS","OBS-ACTION chatTabTitle '"+chatPlan.requestedTitle()+"' matched "+chatPlan.matchCount()+" open ChatGPT conversations after configured title normalization; no destination was selected and manual binding remains available."));
            if(chatPlan.kind()==ReviewChatPlanKind.REBIND_REQUIRED&&!chatPlan.rebindSafe())notices.add(new OperationNotice("WARNING","CHAT_REBIND_BLOCKED",chatPlan.rebindBlockReason()));
            return new PreparedApply(action,pkg,target,chatPlan,List.copyOf(notices),token,binding==null?null:binding.conversationKey());
        }catch(Throwable t){ObsException failure=asObs(t,INTERNAL_ERROR);if(!PACKAGE_NOT_FOUND.equals(failure.code))copyApplyFailureReceiptBestEffort(pkg,failure);throw failure;}
    }

    public AuthorizedApply authorizeApply(PreparedApply prepared,String repositoryTargetId,ReviewChatBindingDecision decision){
        try{
        if(prepared==null)throw new ObsException(STATE_DIVERGED,"Prepared Apply is required.");
        ApplyTargetResolution resolution=prepared.targetResolution();RepositoryConfig target=resolution.target();
        String targetId=repositoryTargetId;
        if(target!=null){if(targetId==null||targetId.isBlank())targetId=target.id();if(!Objects.equals(target.id(),targetId))throw new ObsException(REPOSITORY_MISMATCH,"Prepared Apply target changed; prepare the operation again.");}
        else{boolean found=false;for(RepositoryConfig c:resolution.candidates())if(Objects.equals(c.id(),targetId)){found=true;break;}if(!found)throw new ObsException(REPOSITORY_SELECTION_REQUIRED,"Select one of the prepared Repository Targets before Apply.");}
        ReviewChatBindingPlan plan=prepared.reviewChatPlan();ReviewChatBindingDecision resolved=decision==null?ReviewChatBindingDecision.NONE:decision;
        if(plan.kind()==ReviewChatPlanKind.REBIND_REQUIRED){
            if(resolved!=ReviewChatBindingDecision.KEEP_EXISTING&&resolved!=ReviewChatBindingDecision.USE_HINT)throw new ObsException(CHAT_BRIDGE_FAILED,"Choose whether Apply keeps the existing Review chat or rebinds to the OBS-ACTION destination.");
            if(resolved==ReviewChatBindingDecision.USE_HINT&&!plan.rebindSafe())throw new ObsException(CHAT_BRIDGE_FAILED,plan.rebindBlockReason());
        }else if(plan.kind()==ReviewChatPlanKind.UNBOUND_UNIQUE)resolved=ReviewChatBindingDecision.USE_HINT;
        else if(plan.kind()==ReviewChatPlanKind.SAME_AS_EXISTING)resolved=ReviewChatBindingDecision.KEEP_EXISTING;
        else resolved=ReviewChatBindingDecision.NONE;
        return new AuthorizedApply(prepared,targetId,resolved);
    
        }catch(Throwable t){ObsException failure=asObs(t,INTERNAL_ERROR);copyApplyFailureReceiptBestEffort(prepared==null?null:prepared.packageData(),failure);throw failure;}
    }

    public ApplyResult executeApply(AuthorizedApply authorized){
        PackageData pkg=authorized==null||authorized.prepared()==null?null:authorized.prepared().packageData();
        try{
            if(authorized==null||authorized.prepared()==null)throw new ObsException(STATE_DIVERGED,"Authorized Apply is required.");
            PreparedApply prepared=authorized.prepared();revalidatePreparedApply(authorized);
            RepositoryConfig target=null;for(RepositoryConfig r:ensureSettings().repositories)if(Objects.equals(r.id(),authorized.repositoryTargetId())){target=r;break;}
            if(target==null)throw new ObsException(REPOSITORY_MISMATCH,"Prepared Repository Target is no longer registered; prepare the operation again.");
            boolean composite=isAutomaticGitBackedApply(prepared.action());if(composite){ensureWorkIntent(prepared.packageData().manifest.workIntent());ensureAutomaticWorkspace(prepared,target);}
            String contextToken=prepared.action()==null?null:prepared.action().chatContextToken();String changeSetId=prepared.packageData().manifest.changeSetId,packageId=prepared.packageData().manifest.packageId;
            if(contextToken!=null)chatBridge.requestContextLookup(contextToken,changeSetId,packageId);
            ApplyResult result=applyInternal(prepared.packageData(),Path.of(target.path()),prepared.action(),authorized.reviewChatDecision(),prepared.reviewChatPlan());
            if(composite)result=completeAutomaticGitBackedApply(result,prepared.packageData());
            publishSuccessfulApplyHandoffs(result,packageId,changeSetId);
            return result;
        }catch(Throwable t){ObsException failure=asObs(t,INTERNAL_ERROR);copyApplyFailureReceiptBestEffort(pkg,failure);throw failure;}
    }

    private static boolean isAutomaticGitBackedApply(ObsAction action){return action!=null&&action.targetBranch()!=null;}
    private void ensureAutomaticWorkspace(PreparedApply prepared,RepositoryConfig target){
        PackageManifest manifest=prepared.packageData().manifest;ObsAction action=prepared.action();ChangeSet existing=state.getChangeSet(manifest.changeSetId);
        if(existing==null){startChangeSetWorkspace(target.id,manifest.changeSetId,manifest.changeSetLabel,action.targetBranch());return;}
        if(!isGitBackedWorkspace(existing))throw new ObsException(STATE_DIVERGED,"OBS-ACTION targetBranch requests automatic Git-backed Apply Package, but ChangeSet "+manifest.changeSetId+" already exists as legacy work.");
        if(!"Active".equals(existing.status))throw new ObsException(STATE_DIVERGED,"ChangeSet is not Active: "+existing.status);
        if(!Objects.equals(existing.repositoryTargetId,target.id)||!same(existing.repositoryIdentity,manifest.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Existing Git-backed ChangeSet belongs to a different Repository Target.");
        if(!Objects.equals(existing.changeSetLabel,manifest.changeSetLabel))throw new ObsException(STATE_DIVERGED,"Existing Git-backed ChangeSet label differs from the package label.");
        if(!Objects.equals(existing.targetBranch,action.targetBranch()))throw new ObsException(STATE_DIVERGED,"OBS-ACTION targetBranch differs from the existing Git-backed ChangeSet target branch.");
        if(!Objects.equals(existing.branch,"changeset/"+existing.changeSetId))throw new ObsException(STATE_DIVERGED,"Existing Git-backed ChangeSet branch is not deterministic.");
    }
    private ApplyResult completeAutomaticGitBackedApply(ApplyResult applied,PackageData pkg){
        String id=pkg.manifest.changeSetId;ChangeSet cs=state.getChangeSet(id);if(cs==null||!isGitBackedWorkspace(cs))throw new ObsException(STATE_DIVERGED,"Automatic Apply Package lost its Git-backed ChangeSet workspace.");
        if("AppliedUncommitted".equals(cs.executionState)||"CommittedUnpublished".equals(cs.executionState))commitAppliedPackage(id);
        cs=state.getChangeSet(id);if(cs==null)throw new ObsException(STATE_DIVERGED,"Automatic Apply Package lost ChangeSet state before Publish.");
        if(Set.of("CommittedUnpublished","PublicationUncertain","Ready").contains(cs.executionState))publishAppliedCommit(id);
        cs=state.getChangeSet(id);if(cs==null||!"Ready".equals(cs.executionState)||cs.publishedTip==null||!Objects.equals(cs.commitSha,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Automatic Apply Package did not reach a proven published Ready state.");
        if(applied.attempt()!=null){applied.attempt().message="Apply Package completed through automatic workspace / Apply / Commit / Publish at "+cs.publishedTip+".";try{state.saveAttempt(applied.attempt());}catch(Throwable ignored){}}
        String diagnostic=applied.diagnostic();String complete="Automatic Apply Package is published and Ready at "+cs.publishedTip+".";if(diagnostic==null||diagnostic.isBlank())diagnostic=complete;else diagnostic=diagnostic+" "+complete;
        return new ApplyResult(applied.code(),applied.attempt(),cs,applied.review(),diagnostic);
    }

    private void revalidatePreparedApply(AuthorizedApply authorized){
        PreparedApply prepared=authorized.prepared();String csId=prepared.packageData().manifest.changeSetId;
        if(!Objects.equals(prepared.changeSetStateToken(),changeSetStateToken(state.getChangeSet(csId))))throw new ObsException(STATE_DIVERGED,"Prepared Apply is stale because ChangeSet state changed; prepare the operation again.");
        ReviewChatPlanKind kind=prepared.reviewChatPlan().kind();
        if(Set.of(ReviewChatPlanKind.UNBOUND_UNIQUE,ReviewChatPlanKind.SAME_AS_EXISTING,ReviewChatPlanKind.REBIND_REQUIRED).contains(kind)){
            ChatBinding current=chatBridge.binding(csId);String currentKey=current==null?null:current.conversationKey();
            if(!Objects.equals(prepared.bindingConversationKey(),currentKey))throw new ObsException(STATE_DIVERGED,"Prepared Apply is stale because Review-chat binding changed; prepare the operation again.");
        }
        if(authorized.reviewChatDecision()==ReviewChatBindingDecision.USE_HINT){
            ChatConversation requested=prepared.reviewChatPlan().requestedConversation();if(requested==null)throw new ObsException(CHAT_BRIDGE_FAILED,"Prepared Review-chat destination is unavailable.");
            chatBridge.assertRebindSafe(csId,requested.conversationKey());
        }
    }

    private static String changeSetStateToken(ChangeSet cs){return cs==null?"<absent>":Json.stringify(cs.json());}

    private ReviewChatBindingPlan resolveReviewChatBindingPlan(ObsAction action,String changeSetId,ChatBinding existing){
        if(action==null||action.chatContextToken()!=null||action.chatTabTitle()==null)return new ReviewChatBindingPlan(ReviewChatPlanKind.NO_HINT,null,null,existing,null,0,true,null);
        String requested=action.chatTabTitle(),ignored=ensureSettings().reviewChatTitleIgnoredCharacters;
        String normalized=ReviewChatTitleMatcher.normalize(requested,ignored);
        List<ChatConversation> matches=new ArrayList<>();
        if(!normalized.isBlank())for(ChatConversation c:chatBridge.openConversations())if(ReviewChatTitleMatcher.matches(requested,c.title(),ignored))matches.add(c);
        if(matches.isEmpty())return new ReviewChatBindingPlan(ReviewChatPlanKind.NO_MATCH,requested,normalized,existing,null,0,true,null);
        if(matches.size()>1)return new ReviewChatBindingPlan(ReviewChatPlanKind.AMBIGUOUS,requested,normalized,existing,null,matches.size(),true,null);
        ChatConversation requestedConversation=matches.get(0);
        if(existing==null)return new ReviewChatBindingPlan(ReviewChatPlanKind.UNBOUND_UNIQUE,requested,normalized,null,requestedConversation,1,true,null);
        if(Objects.equals(existing.conversationKey(),requestedConversation.conversationKey()))return new ReviewChatBindingPlan(ReviewChatPlanKind.SAME_AS_EXISTING,requested,normalized,existing,requestedConversation,1,true,null);
        boolean safe=true;String block=null;try{chatBridge.assertRebindSafe(changeSetId,requestedConversation.conversationKey());}catch(ObsException e){safe=false;block=e.getMessage();}
        return new ReviewChatBindingPlan(ReviewChatPlanKind.REBIND_REQUIRED,requested,normalized,existing,requestedConversation,1,safe,block);
    }

    public ApplyResult applyAction(String actionText,Path archive,Path repositoryRoot){RepositoryConfig target=repositoryByPath(repositoryRoot);PreparedApply prepared=prepareApply(actionText,archive,target.id());ReviewChatBindingDecision decision=defaultReviewChatDecision(prepared.reviewChatPlan());return executeApply(authorizeApply(prepared,target.id(),decision));}
    public ApplyResult applyPackage(Path archive,Path repositoryRoot){RepositoryConfig target=repositoryByPath(repositoryRoot);PreparedApply prepared=prepareApply(null,archive,target.id());return executeApply(authorizeApply(prepared,target.id(),ReviewChatBindingDecision.NONE));}
    private static ReviewChatBindingDecision defaultReviewChatDecision(ReviewChatBindingPlan plan){if(plan==null)return ReviewChatBindingDecision.NONE;return switch(plan.kind()){case UNBOUND_UNIQUE->ReviewChatBindingDecision.USE_HINT;case SAME_AS_EXISTING,REBIND_REQUIRED->ReviewChatBindingDecision.KEEP_EXISTING;default->ReviewChatBindingDecision.NONE;};}

    private ApplyResult applyInternal(PackageData pkg,Path repositoryRoot,ObsAction action,ReviewChatBindingDecision reviewChatDecision,ReviewChatBindingPlan reviewChatPlan){
        String attemptId=UUID.randomUUID().toString(),now=Instant.now().toString();Path repo=null;ChangeSet cs=null;ReviewDiff review=null;ApplicationAttempt success=null;String labelDiagnostic="";StateStore.Lock stateLock=state.lock();try{
            RepositoryConfig allowed=requireAllowedRepository(repositoryRoot);repo=Path.of(allowed.path);String repoIdentity=allowed.repositoryIdentity;if(!same(repoIdentity,pkg.manifest.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Configured origin is "+repoIdentity+"; package targets "+pkg.manifest.repositoryIdentity+".");requireRepositoryReady(repo);
            ChangeSet prior=state.getChangeSet(pkg.manifest.changeSetId);boolean priorExists=prior!=null;byte[] priorState=priorExists?readBytes(state.changeSetPath(pkg.manifest.changeSetId)):null;cs=priorExists?prior:new ChangeSet();
            if(priorExists){
                if(!"Active".equals(cs.status))throw new ObsException(STATE_DIVERGED,"ChangeSet is not Active: "+cs.status);RepositoryConfig owner=repositoryForChangeSet(cs,false);if(!Objects.equals(owner.id,allowed.id)||!same(cs.repositoryIdentity,repoIdentity))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet repository identity/target differs from package/apply target.");if(!Objects.equals(cs.changeSetLabel,pkg.manifest.changeSetLabel))labelDiagnostic="Package changeSetLabel '"+pkg.manifest.changeSetLabel+"' differs from persisted label '"+cs.changeSetLabel+"'; persisted label retained.";
                if(isGitBackedWorkspace(cs)){repo=Path.of(cs.worktree);return applyGitBackedPackageUnlocked(pkg,action,reviewChatDecision,reviewChatPlan,attemptId,now,allowed,repoIdentity,repo,cs,priorState,labelDiagnostic);}
            }else{cs.changeSetId=pkg.manifest.changeSetId;cs.changeSetLabel=pkg.manifest.changeSetLabel;cs.repositoryIdentity=repoIdentity;cs.repositoryTargetId=allowed.id;cs.repositoryRoot=repo.toString();cs.createdAt=now;cs.updatedAt=now;}
            cs.repositoryTargetId=allowed.id;cs.repositoryRoot=repo.toString();
            Set<String> owned=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);owned.addAll(cs.ownedPaths);for(ChangeSet other:state.activeChangeSets())if(!other.changeSetId.equals(cs.changeSetId)&&belongsTo(other,allowed))for(String p:other.ownedPaths)for(Operation op:pkg.manifest.operations)if(p.equalsIgnoreCase(op.path))throw new ObsException(PATH_OWNERSHIP_CONFLICT,ownershipConflictMessage(op.path,allowed,other,cs));
            for(Operation op:pkg.manifest.operations)if(!containsIgnoreCase(owned,op.path)&&pathDirty(repo,op.path))throw new ObsException(STATE_DIVERGED,dirtyUnownedMessage(op.path,allowed,cs));
            List<PackageStateApplier.Operation> fileOperations=packageStateOperations(pkg,repo);Path verifiedRepo=repo;PackageStateApplier.PreparedChange preparedFiles;try{preparedFiles=PackageStateApplier.prepare(fileOperations,(path,expected,actual)->requireExpectedSource(verifiedRepo,path,expected,actual));}catch(Throwable t){throw mapPackageStateFailure(t);}
            Path successAttemptPath=state.attemptPath(attemptId);try{
                try(PackageStateApplier.AppliedChange appliedFiles=preparedFiles.apply()){
                    afterMutationHook.run();for(Operation op:pkg.manifest.operations)owned.add(op.path);cs.ownedPaths.clear();cs.ownedPaths.addAll(owned);cs.lastPackageId=pkg.manifest.packageId;cs.updatedAt=Instant.now().toString();review=newReviewDiff(cs,attemptId);cs.currentReviewAttemptId=review.attemptId;cs.currentReviewDiffPath=review.diffPath.toString();cs.currentReviewSha256=review.sha256;cs.currentReviewHead=review.head;setOutcome(cs,"SUCCESS",SUCCESS,"Apply succeeded");state.saveChangeSet(cs);
                    success=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,repo,pkg,SUCCESS,SUCCESS,"Package applied; cumulative ReviewDiff generated internally."+(labelDiagnostic.isBlank()?"":" "+labelDiagnostic),review);state.saveAttempt(success);appliedFiles.commit();
                }
            }catch(Throwable t){boolean ok=!containsPackageRollbackFailure(t);
                try{if(priorExists)Files.write(state.changeSetPath(pkg.manifest.changeSetId),priorState,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);else Files.deleteIfExists(state.changeSetPath(pkg.manifest.changeSetId));Files.deleteIfExists(successAttemptPath);if(review!=null)Files.deleteIfExists(review.diffPath);}catch(Throwable x){ok=false;}if(!ok)throw new ObsException(APPLY_ROLLBACK_UNVERIFIED,"Apply failed and target/ledger rollback could not be verified.",t);throw mapPackageStateFailure(t);
            }
            publishLegacyReviewBinding(action,reviewChatDecision,reviewChatPlan,cs,review,success);
            try{state.saveAttempt(success);}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" Attempt metadata update failed.").trim();}return new ApplyResult(SUCCESS,success,cs,review,labelDiagnostic);
        }catch(ObsException e){if(pkg!=null){try{String outcome=APPLY_ROLLBACK_UNVERIFIED.equals(e.code)?"UNCERTAIN":"FAILED";ApplicationAttempt failed=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repo==null?"":safeIdentity(repo),repo,pkg,outcome,e.code,e.getMessage(),null);state.saveAttempt(failed);recordOperationOutcomeUnlocked(pkg.manifest.changeSetId,outcome,e.code,semanticSummary(e.getMessage()));}catch(Throwable ignored){}}throw e;}catch(Throwable e){ObsException oe=asObs(e,INTERNAL_ERROR);if(pkg!=null){try{String outcome=APPLY_ROLLBACK_UNVERIFIED.equals(oe.code)?"UNCERTAIN":"FAILED";state.saveAttempt(attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repo==null?"":safeIdentity(repo),repo,pkg,outcome,oe.code,oe.getMessage(),null));recordOperationOutcomeUnlocked(pkg.manifest.changeSetId,outcome,oe.code,semanticSummary(oe.getMessage()));}catch(Throwable ignored){}}throw oe;}finally{stateLock.close();}
    }

    private ApplyResult applyGitBackedPackageUnlocked(PackageData pkg,ObsAction action,ReviewChatBindingDecision reviewChatDecision,ReviewChatBindingPlan reviewChatPlan,String attemptId,String now,RepositoryConfig allowed,String repoIdentity,Path worktree,ChangeSet cs,byte[] priorState,String labelDiagnostic){
        if(!Objects.equals(cs.repositoryTargetId,allowed.id)||!same(cs.repositoryIdentity,repoIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Git-backed ChangeSet belongs to a different Repository Target.");
        if(!Objects.equals(cs.branch,"changeset/"+cs.changeSetId))throw new ObsException(STATE_DIVERGED,"Git-backed ChangeSet branch is not deterministic: "+cs.branch);
        if(cs.publishedTip==null||cs.publishedTip.isBlank())throw new ObsException(STATE_DIVERGED,"Git-backed ChangeSet publishedTip is unavailable.");
        if(!Set.of("Ready","AppliedUncommitted","CommittedUnpublished","PublicationUncertain").contains(cs.executionState))throw new ObsException(STATE_DIVERGED,"Git-backed package Apply is not available from execution state: "+cs.executionState);
        Path journalPath=state.applyJournalPath(cs.changeSetId);ApplyJournal journal=Files.exists(journalPath)?ApplyJournal.from(state.readObject(journalPath)):null;
        if(journal!=null&&"Ready".equals(cs.executionState)&&!Objects.equals(journal.baseHead,cs.publishedTip)){verifyCompletedPublishedJournal(Path.of(allowed.path),cs,worktree,repoIdentity,journal);if(Objects.equals(journal.packageId,pkg.manifest.packageId)){assertCompletedApplyJournalRequest(journal,pkg,cs,repoIdentity,worktree);ApplicationAttempt already=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Package progression is already published at Ready tip "+cs.publishedTip+".",null);publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,already);state.saveAttempt(already);return new ApplyResult(SUCCESS,already,cs,null,"Already satisfied through published Ready state.");}journal=null;}
        if("PublicationUncertain".equals(cs.executionState)){
            if(journal==null)throw new ObsException(STATE_DIVERGED,"PublicationUncertain ChangeSet is missing its durable Apply journal.");
            assertApplyJournalRequest(journal,pkg,cs,repoIdentity,worktree);if(!Objects.equals(cs.lastPackageId,pkg.manifest.packageId))throw new ObsException(STATE_DIVERGED,"Another package has uncertain publication for this ChangeSet: "+cs.lastPackageId);
            ApplicationAttempt already=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Package files and local commit are already established with uncertain publication; automatic Apply Package will reconcile Publish.",null);publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,already);state.saveAttempt(already);return new ApplyResult(SUCCESS,already,cs,null,"Already satisfied through PublicationUncertain; Publish reconciliation is required.");
        }
        if(journal!=null)assertApplyJournalRequest(journal,pkg,cs,repoIdentity,worktree);
        if("CommittedUnpublished".equals(cs.executionState)){
            if(journal==null)throw new ObsException(STATE_DIVERGED,"CommittedUnpublished ChangeSet is missing its durable Apply journal.");
            if(!Objects.equals(cs.lastPackageId,pkg.manifest.packageId))throw new ObsException(STATE_DIVERGED,"Another package is already committed but unpublished for this ChangeSet: "+cs.lastPackageId);
            verifyCommittedUnpublishedState(Path.of(allowed.path),cs,worktree,repoIdentity,journal);
            ApplicationAttempt already=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Package files and local commit are already established; Publish applied commit is available.",null);publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,already);state.saveAttempt(already);return new ApplyResult(SUCCESS,already,cs,null,"Already satisfied through CommittedUnpublished.");
        }
        if("AppliedUncommitted".equals(cs.executionState)){
            if(journal==null)throw new ObsException(STATE_DIVERGED,"AppliedUncommitted ChangeSet is missing its durable Apply journal.");
            if(!Objects.equals(cs.lastPackageId,pkg.manifest.packageId))throw new ObsException(STATE_DIVERGED,"Another package is already AppliedUncommitted for this ChangeSet: "+cs.lastPackageId);
            WorkspacePosition position=verifyWorkspacePosition(Path.of(allowed.path),cs,worktree,repoIdentity);requirePublishedPosition(cs,position);assertOnlyJournalPathsStaged(worktree,journal);assertOnlyJournalPathsDirty(worktree,journal);if(!allJournalState(worktree,journal,true))throw new ObsException(APPLY_ROLLBACK_UNVERIFIED,"AppliedUncommitted worktree no longer matches the durable intended package result.");
            ApplicationAttempt already=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Package files are already AppliedUncommitted in the ChangeSet worktree.",null);publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,already);state.saveAttempt(already);return new ApplyResult(SUCCESS,already,cs,null,"Already satisfied at AppliedUncommitted.");
        }
        verifyWorkspaceAtPublishedTip(Path.of(allowed.path),cs,worktree,repoIdentity);
        List<PackageStateApplier.Operation> fileOperations=packageStateOperations(pkg,worktree);Path verifiedWorktree=worktree;
        if(journal==null){
            assertWorkspaceClean(worktree);PackageStateApplier.PreparedChange preflight;try{preflight=PackageStateApplier.prepare(fileOperations,(path,expected,actual)->requireExpectedSource(verifiedWorktree,path,expected,actual));}catch(Throwable t){throw mapPackageStateFailure(t);}journal=createApplyJournal(pkg,cs,worktree,repoIdentity);state.writeJson(journalPath,journal.json());
        }else{
            assertOnlyJournalPathsDirty(worktree,journal);JournalState stateNow=journalState(worktree,journal);if(stateNow==JournalState.OTHER){preserveUnexpectedApplyState(worktree,journal);restoreJournalPrior(worktree,journal);}if(stateNow==JournalState.INTENDED){markAppliedUncommitted(cs,pkg);ApplicationAttempt recovered=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Recovered durable Apply journal: package files were already fully applied before state persistence.",null);publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,recovered);state.saveAttempt(recovered);return new ApplyResult(SUCCESS,recovered,cs,null,"Recovered already-applied package files.");}if(stateNow==JournalState.MIXED)restoreJournalPrior(worktree,journal);
        }
        PackageStateApplier.PreparedChange preparedFiles;try{preparedFiles=PackageStateApplier.prepare(fileOperations,(path,expected,actual)->requireExpectedSource(verifiedWorktree,path,expected,actual));}catch(Throwable t){throw mapPackageStateFailure(t);}
        Path successAttemptPath=state.attemptPath(attemptId);try{
            try(PackageStateApplier.AppliedChange appliedFiles=preparedFiles.apply()){
                afterMutationHook.run();assertOnlyJournalPathsDirty(worktree,journal);if(!allJournalState(worktree,journal,true))throw new ObsException(RESULT_MISMATCH,"Git-backed Apply result does not match the durable intended file state.");markAppliedUncommitted(cs,pkg);ApplicationAttempt success=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,worktree,pkg,SUCCESS,SUCCESS,"Package files applied in isolated ChangeSet worktree; Commit applied package is available."+(labelDiagnostic.isBlank()?"":" "+labelDiagnostic),null);state.saveAttempt(success);appliedFiles.commit();publishGitBackedBinding(action,reviewChatDecision,reviewChatPlan,cs,success);try{state.saveAttempt(success);}catch(Throwable ignored){}return new ApplyResult(SUCCESS,success,cs,null,labelDiagnostic);
            }
        }catch(Throwable t){boolean ok=!containsPackageRollbackFailure(t);try{Files.write(state.changeSetPath(pkg.manifest.changeSetId),priorState,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);Files.deleteIfExists(successAttemptPath);}catch(Throwable x){ok=false;}if(!ok)throw new ObsException(APPLY_ROLLBACK_UNVERIFIED,"Git-backed Apply failed and worktree/ledger rollback could not be verified.",t);throw mapPackageStateFailure(t);}
    }

    private enum JournalState { PRIOR, INTENDED, MIXED, OTHER }
    private List<PackageStateApplier.Operation> packageStateOperations(PackageData pkg,Path root){List<PackageStateApplier.Operation>x=new ArrayList<>();for(Operation op:pkg.manifest.operations){PackageStateApplier.Action action=switch(op.action){case"add"->PackageStateApplier.Action.ADD;case"replace"->PackageStateApplier.Action.REPLACE;case"delete"->PackageStateApplier.Action.DELETE;default->throw new ObsException(PACKAGE_INVALID,"Unsupported action '"+op.action+"' for "+op.path);};x.add(new PackageStateApplier.Operation(op.path,inside(root,op.path),action,pkg.base.get(op.path),pkg.replacement.get(op.path)));}return x;}
    private ApplyJournal createApplyJournal(PackageData pkg,ChangeSet cs,Path worktree,String repositoryIdentity){List<ApplyJournalEntry> entries=new ArrayList<>();for(Operation op:pkg.manifest.operations){Path p=inside(worktree,op.path);boolean priorExists=Files.isRegularFile(p,LinkOption.NOFOLLOW_LINKS);byte[] prior=priorExists?readBytes(p):null;boolean intendedExists=!"delete".equals(op.action);byte[] intended=intendedExists?pkg.replacement.get(op.path):null;entries.add(new ApplyJournalEntry(op.path,op.action,priorExists,priorExists?Base64.getEncoder().encodeToString(prior):null,intendedExists,intendedExists?Base64.getEncoder().encodeToString(intended):null));}return new ApplyJournal(cs.changeSetId,pkg.manifest.packageId,pkg.archiveSha256,repositoryIdentity,cs.branch,worktree.toAbsolutePath().normalize().toString(),cs.publishedTip,Instant.now().toString(),List.copyOf(entries));}
    private void assertApplyJournalRequest(ApplyJournal journal,PackageData pkg,ChangeSet cs,String repositoryIdentity,Path worktree){if(!Objects.equals(journal.changeSetId,cs.changeSetId)||!Objects.equals(journal.packageId,pkg.manifest.packageId)||!Objects.equals(journal.archiveSha256,pkg.archiveSha256)||!same(journal.repositoryIdentity,repositoryIdentity)||!Objects.equals(journal.branch,cs.branch)||!samePath(Path.of(journal.worktree),worktree)||!Objects.equals(journal.baseHead,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Existing durable Apply journal describes a different package/workspace intent.");if(journal.entries.size()!=pkg.manifest.operations.size())throw new ObsException(STATE_DIVERGED,"Durable Apply journal operation count differs from the package.");for(int i=0;i<journal.entries.size();i++){ApplyJournalEntry e=journal.entries.get(i);Operation op=pkg.manifest.operations.get(i);if(!Objects.equals(e.path,op.path)||!Objects.equals(e.action,op.action))throw new ObsException(STATE_DIVERGED,"Durable Apply journal operation differs from the package at index "+i+".");}}
    private void assertCompletedApplyJournalRequest(ApplyJournal journal,PackageData pkg,ChangeSet cs,String repositoryIdentity,Path worktree){if(!Objects.equals(journal.changeSetId,cs.changeSetId)||!Objects.equals(journal.packageId,pkg.manifest.packageId)||!Objects.equals(journal.archiveSha256,pkg.archiveSha256)||!same(journal.repositoryIdentity,repositoryIdentity)||!Objects.equals(journal.branch,cs.branch)||!samePath(Path.of(journal.worktree),worktree))throw new ObsException(STATE_DIVERGED,"Completed durable Apply journal does not match the repeated package request.");if(journal.entries.size()!=pkg.manifest.operations.size())throw new ObsException(STATE_DIVERGED,"Completed durable Apply journal operation count differs from the repeated package.");for(int i=0;i<journal.entries.size();i++){ApplyJournalEntry e=journal.entries.get(i);Operation op=pkg.manifest.operations.get(i);if(!Objects.equals(e.path,op.path)||!Objects.equals(e.action,op.action))throw new ObsException(STATE_DIVERGED,"Completed durable Apply journal operation differs from the repeated package at index "+i+".");}}
    private JournalState journalState(Path worktree,ApplyJournal journal){boolean allPrior=true,allIntended=true;for(ApplyJournalEntry e:journal.entries){boolean prior=matchesJournalBytes(inside(worktree,e.path),e.priorExists,e.priorBytes()),intended=matchesJournalBytes(inside(worktree,e.path),e.intendedExists,e.intendedBytes());if(!prior&&!intended)return JournalState.OTHER;allPrior&=prior;allIntended&=intended;}if(allIntended)return JournalState.INTENDED;if(allPrior)return JournalState.PRIOR;return JournalState.MIXED;}
    private boolean allJournalState(Path worktree,ApplyJournal journal,boolean intended){for(ApplyJournalEntry e:journal.entries)if(!matchesJournalBytes(inside(worktree,e.path),intended?e.intendedExists:e.priorExists,intended?e.intendedBytes():e.priorBytes()))return false;return true;}
    private boolean matchesJournalBytes(Path path,boolean exists,byte[] bytes){if(!exists)return !Files.exists(path,LinkOption.NOFOLLOW_LINKS);if(!Files.isRegularFile(path,LinkOption.NOFOLLOW_LINKS))return false;try{return Arrays.equals(Files.readAllBytes(path),bytes);}catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot inspect durable Apply state: "+path,e);}}
    private void preserveUnexpectedApplyState(Path worktree,ApplyJournal journal){List<Object> entries=new ArrayList<>();for(ApplyJournalEntry e:journal.entries){Path p=inside(worktree,e.path);boolean prior=matchesJournalBytes(p,e.priorExists,e.priorBytes()),intended=matchesJournalBytes(p,e.intendedExists,e.intendedBytes());if(prior||intended)continue;Map<String,Object>m=new LinkedHashMap<>();m.put("path",e.path);boolean exists=Files.isRegularFile(p,LinkOption.NOFOLLOW_LINKS);m.put("exists",exists);if(exists)m.put("bytesBase64",Base64.getEncoder().encodeToString(readBytes(p)));else if(Files.exists(p,LinkOption.NOFOLLOW_LINKS))m.put("nonRegular",true);entries.add(m);}if(entries.isEmpty())return;Map<String,Object> out=new LinkedHashMap<>();out.put("schemaVersion",1);out.put("changeSetId",journal.changeSetId);out.put("packageId",journal.packageId);out.put("baseHead",journal.baseHead);out.put("createdAt",Instant.now().toString());out.put("entries",entries);Path dir=state.applyRecoveryDir(journal.changeSetId);state.writeJson(dir.resolve("unexpected-"+UUID.randomUUID()+".json"),out);}
    private void restoreJournalPrior(Path worktree,ApplyJournal journal){for(ApplyJournalEntry e:journal.entries){Path p=inside(worktree,e.path);try{if(!e.priorExists)Files.deleteIfExists(p);else{Path parent=p.getParent();if(parent!=null)Files.createDirectories(parent);Files.write(p,e.priorBytes(),StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);}}catch(IOException x){throw new ObsException(APPLY_ROLLBACK_UNVERIFIED,"Cannot restore durable prior Apply bytes for "+e.path+".",x);}}if(!allJournalState(worktree,journal,false))throw new ObsException(APPLY_ROLLBACK_UNVERIFIED,"Durable prior Apply state could not be verified after recovery.");}
    public CommitResult commitAppliedPackage(String changeSetId){try{return commitAppliedPackageInternal(changeSetId);}catch(Throwable e){recordFailureOutcome(changeSetId,e);throw e;}}
    private CommitResult commitAppliedPackageInternal(String id){
        try(StateStore.Lock ignored=state.lock()){
            ChangeSet cs=state.getChangeSet(id);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+id);if(!isGitBackedWorkspace(cs))throw new ObsException(STATE_DIVERGED,"Commit Applied Package is available only for a Git-backed ChangeSet.");if(!"Active".equals(cs.status))throw new ObsException(STATE_DIVERGED,"ChangeSet is not Active: "+cs.status);if(!Set.of("AppliedUncommitted","CommittedUnpublished").contains(cs.executionState))throw new ObsException(STATE_DIVERGED,"Commit Applied Package is not available from execution state: "+cs.executionState);
            RepositoryConfig target=repositoryForChangeSet(cs,false);Path repositoryTarget=Path.of(target.path),worktree=Path.of(cs.worktree);requireRepositoryReady(repositoryTarget);String repositoryIdentity=repositoryIdentity(repositoryTarget);if(!same(repositoryIdentity,cs.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet repository identity no longer matches its Repository Target.");
            Path journalPath=state.applyJournalPath(cs.changeSetId);if(!Files.isRegularFile(journalPath,LinkOption.NOFOLLOW_LINKS))throw new ObsException(STATE_DIVERGED,"Git-backed Commit requires the durable Apply journal.");ApplyJournal journal=ApplyJournal.from(state.readObject(journalPath));assertApplyJournalChangeSet(journal,cs,repositoryIdentity,worktree);
            if("CommittedUnpublished".equals(cs.executionState)){verifyCommittedUnpublishedState(repositoryTarget,cs,worktree,repositoryIdentity,journal);return new CommitResult(SUCCESS,cs.commitSha,cs,true);}
            WorkspacePosition position=verifyWorkspacePosition(repositoryTarget,cs,worktree,repositoryIdentity);
            if(!Objects.equals(position.head,cs.publishedTip)||!Objects.equals(position.branchTip,cs.publishedTip)){
                String recovered=verifyRecoverableCommittedHead(repositoryTarget,cs,worktree,repositoryIdentity,journal,position);cs.executionState="CommittedUnpublished";cs.commitSha=recovered;cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,"Recovered exact local package commit; publication is pending.");state.saveChangeSet(cs);return new CommitResult(SUCCESS,recovered,cs,true);
            }
            assertOnlyJournalPathsDirty(worktree,journal);if(!allJournalState(worktree,journal,true))throw new ObsException(STATE_DIVERGED,"AppliedUncommitted worktree no longer matches the durable intended package result.");assertOnlyJournalPathsStaged(worktree,journal);stageJournalPaths(worktree,journal);assertOnlyJournalPathsStaged(worktree,journal);
            Path disabledHooks=state.root.resolve("disabled-git-hooks");try{Files.createDirectories(disabledHooks);}catch(IOException e){throw new ObsException(COMMIT_FAILED,"Cannot prepare deterministic Git commit environment.",e);}String subject=cs.changeSetLabel==null||cs.changeSetLabel.isBlank()?"Apply replacement package":cs.changeSetLabel;String trailers="Package-Id: "+journal.packageId+"\nChangeSet-Id: "+cs.changeSetId;
            git.run(worktree,COMMIT_FAILED,"-c","commit.gpgsign=false","-c","core.hooksPath="+disabledHooks,"commit","--allow-empty","--no-verify","--cleanup=verbatim","-m",subject,"-m",trailers);
            String commit=git.run(worktree,COMMIT_FAILED,"rev-parse","HEAD").first();verifyExactPackageCommit(repositoryTarget,cs,worktree,repositoryIdentity,journal,commit,cs.publishedTip);cs.executionState="CommittedUnpublished";cs.commitSha=commit;cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,"Local package commit created; publication is pending.");state.saveChangeSet(cs);return new CommitResult(SUCCESS,commit,cs,false);
        }
    }
    public PublishResult publishAppliedCommit(String changeSetId){try{return publishAppliedCommitInternal(changeSetId);}catch(Throwable e){recordFailureOutcome(changeSetId,e);throw e;}}
    private PublishResult publishAppliedCommitInternal(String id){
        try(StateStore.Lock ignored=state.lock()){
            ChangeSet cs=state.getChangeSet(id);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+id);if(!isGitBackedWorkspace(cs))throw new ObsException(STATE_DIVERGED,"Publish Applied Commit is available only for a Git-backed ChangeSet.");if(!"Active".equals(cs.status))throw new ObsException(STATE_DIVERGED,"ChangeSet is not Active: "+cs.status);if(!Set.of("CommittedUnpublished","PublicationUncertain","Ready").contains(cs.executionState))throw new ObsException(STATE_DIVERGED,"Publish Applied Commit is not available from execution state: "+cs.executionState);
            RepositoryConfig target=repositoryForChangeSet(cs,false);Path repositoryTarget=Path.of(target.path),worktree=Path.of(cs.worktree);requireRepositoryReady(repositoryTarget);String repositoryIdentity=repositoryIdentity(repositoryTarget);if(!same(repositoryIdentity,cs.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet repository identity no longer matches its Repository Target.");assertEffectiveOriginIdentity(repositoryTarget,repositoryIdentity);
            Path journalPath=state.applyJournalPath(cs.changeSetId);if(!Files.isRegularFile(journalPath,LinkOption.NOFOLLOW_LINKS))throw new ObsException(STATE_DIVERGED,"Git-backed Publish requires the durable Apply journal for its package commit.");ApplyJournal journal=ApplyJournal.from(state.readObject(journalPath));assertApplyJournalIdentity(journal,cs,repositoryIdentity,worktree);
            if("Ready".equals(cs.executionState)){if(cs.commitSha==null||!Objects.equals(cs.commitSha,cs.publishedTip)||Objects.equals(journal.baseHead,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Ready ChangeSet does not retain a provable latest published package commit.");verifyExactPackageCommit(repositoryTarget,cs,worktree,repositoryIdentity,journal,cs.publishedTip,journal.baseHead);RemoteBranchState remote=remoteBranchState(repositoryTarget,cs.branch,PUBLISH_FAILED);if(remote.exists&&Objects.equals(remote.tip,cs.publishedTip))return new PublishResult(SUCCESS,cs.publishedTip,cs,true);throw new ObsException(REMOTE_BRANCH_DIVERGED,"Published ChangeSet branch no longer points to recorded publishedTip "+cs.publishedTip+".");}
            if(cs.commitSha==null||cs.commitSha.isBlank())throw new ObsException(STATE_DIVERGED,"Git-backed Publish requires the exact local package commit.");if(!Objects.equals(journal.baseHead,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Git-backed Publish journal baseHead differs from previous publishedTip.");verifyCommittedUnpublishedState(repositoryTarget,cs,worktree,repositoryIdentity,journal);
            RemoteBranchState before;try{before=remoteBranchState(repositoryTarget,cs.branch,PUBLISH_FAILED);}catch(ObsException e){if("PublicationUncertain".equals(cs.executionState))throw new ObsException(PUBLICATION_UNCERTAIN,"Publication outcome is still uncertain because the remote branch cannot be inspected before retry.\n--- remote details ---\n"+semanticSummary(e.getMessage()),e);throw e;}
            if(before.exists&&Objects.equals(before.tip,cs.commitSha))return markPublishedReady(cs,true);
            if(before.exists&&!Objects.equals(before.tip,cs.publishedTip)){if("PublicationUncertain".equals(cs.executionState)){cs.executionState="CommittedUnpublished";cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}throw new ObsException(REMOTE_BRANCH_DIVERGED,"Remote ChangeSet branch is at "+before.tip+" instead of previous publishedTip "+cs.publishedTip+" or local commit "+cs.commitSha+".");}
            String remoteRef="refs/heads/"+cs.branch,lease="--force-with-lease="+remoteRef+":"+(before.exists?before.tip:"");GitClient.Result push=git.run(repositoryTarget,PUBLISH_FAILED,true,Map.of("GIT_TERMINAL_PROMPT","0"),"push","--porcelain",lease,"origin",cs.commitSha+":"+remoteRef);afterPublishAttemptHook.run();
            RemoteBranchState after;try{after=remoteBranchState(repositoryTarget,cs.branch,PUBLISH_FAILED);}catch(ObsException remoteFailure){cs.executionState="PublicationUncertain";cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);throw new ObsException(PUBLICATION_UNCERTAIN,"Push was attempted for "+cs.commitSha+" but the remote branch cannot be reconciled. Retry Publish must inspect remote state before any new push.\n--- push details ---\n"+push.failureDetails()+"\n--- remote details ---\n"+semanticSummary(remoteFailure.getMessage()),remoteFailure);}
            if(after.exists&&Objects.equals(after.tip,cs.commitSha))return markPublishedReady(cs,push.exitCode()!=0);
            if((!after.exists)||Objects.equals(after.tip,cs.publishedTip)){if("PublicationUncertain".equals(cs.executionState)){cs.executionState="CommittedUnpublished";cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}throw new ObsException(PUBLISH_FAILED,"Remote branch is proven unchanged after Publish attempt; local commit remains CommittedUnpublished and can be retried.\n--- git details ---\n"+push.failureDetails());}
            if("PublicationUncertain".equals(cs.executionState)){cs.executionState="CommittedUnpublished";cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}throw new ObsException(REMOTE_BRANCH_DIVERGED,"Remote ChangeSet branch moved to unexpected tip "+after.tip+" while publishing "+cs.commitSha+".");
        }
    }
    private PublishResult markPublishedReady(ChangeSet cs,boolean alreadySatisfied){String commit=cs.commitSha;cs.publishedTip=commit;cs.executionState="Ready";cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,alreadySatisfied?"Remote package commit already published; ChangeSet is Ready at exact tip.":"Local package commit published; ChangeSet is Ready at exact tip.");state.saveChangeSet(cs);return new PublishResult(SUCCESS,commit,cs,alreadySatisfied);}
    private RemoteBranchState remoteBranchState(Path repositoryTarget,String branch,String errorCode){String ref="refs/heads/"+branch;GitClient.Result r=git.run(repositoryTarget,errorCode,true,Map.of("GIT_TERMINAL_PROMPT","0"),"ls-remote","--heads","origin",ref);if(r.exitCode()!=0)throw new ObsException(errorCode,"Cannot inspect exact remote ChangeSet branch.\n--- git details ---\n"+r.failureDetails());if(r.stdout().isEmpty())return new RemoteBranchState(false,null);if(r.stdout().size()!=1)throw new ObsException(errorCode,"Remote ChangeSet branch lookup returned an ambiguous result for "+ref+".");String[] parts=r.stdout().get(0).trim().split("\\s+");if(parts.length!=2||!parts[1].equals(ref)||!parts[0].matches("[0-9A-Fa-f]{40,64}"))throw new ObsException(errorCode,"Remote ChangeSet branch lookup returned an invalid exact-ref result for "+ref+".");return new RemoteBranchState(true,parts[0]);}
    private void assertEffectiveOriginIdentity(Path repositoryTarget,String repositoryIdentity){assertEffectiveOriginUrls(repositoryTarget,repositoryIdentity,false);assertEffectiveOriginUrls(repositoryTarget,repositoryIdentity,true);}
    private void assertEffectiveOriginUrls(Path repositoryTarget,String repositoryIdentity,boolean push){String kind=push?"push":"fetch";GitClient.Result urls=push?git.allow(repositoryTarget,REPOSITORY_MISMATCH,"remote","get-url","--push","--all","origin"):git.allow(repositoryTarget,REPOSITORY_MISMATCH,"remote","get-url","--all","origin");if(urls.exitCode()!=0||urls.stdout().isEmpty())throw new ObsException(REPOSITORY_MISMATCH,"Cannot resolve effective origin "+kind+" URL for Publish.");for(String url:urls.stdout()){if(url==null||url.isBlank())throw new ObsException(REPOSITORY_MISMATCH,"Effective origin "+kind+" URL is empty.");String identity;try{identity=repositoryIdentityFromUrl(url.trim());}catch(ObsException e){throw new ObsException(REPOSITORY_MISMATCH,"Effective origin "+kind+" URL cannot be proven to match the registered repository identity.");}if(!same(identity,repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Effective origin "+kind+" URL targets a different repository identity: "+identity+".");}}

    private void assertApplyJournalIdentity(ApplyJournal journal,ChangeSet cs,String repositoryIdentity,Path worktree){if(!Objects.equals(journal.changeSetId,cs.changeSetId)||!Objects.equals(journal.packageId,cs.lastPackageId)||!same(journal.repositoryIdentity,repositoryIdentity)||!Objects.equals(journal.branch,cs.branch)||!samePath(Path.of(journal.worktree),worktree))throw new ObsException(STATE_DIVERGED,"Durable Apply journal does not match the persisted Git-backed ChangeSet execution identity.");}
    private void assertApplyJournalChangeSet(ApplyJournal journal,ChangeSet cs,String repositoryIdentity,Path worktree){assertApplyJournalIdentity(journal,cs,repositoryIdentity,worktree);if(!Objects.equals(journal.baseHead,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Durable Apply journal baseHead does not match the current previous published tip.");}
    private void verifyCompletedPublishedJournal(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity,ApplyJournal journal){assertApplyJournalIdentity(journal,cs,repositoryIdentity,worktree);if(cs.commitSha==null||!Objects.equals(cs.commitSha,cs.publishedTip)||Objects.equals(journal.baseHead,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"Ready ChangeSet has an Apply journal that is not proven as its completed latest publication.");verifyExactPackageCommit(repositoryTarget,cs,worktree,repositoryIdentity,journal,cs.publishedTip,journal.baseHead);}
    private WorkspacePosition verifyWorkspacePosition(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity){Path expected=worktree.toAbsolutePath().normalize();if(!Files.isDirectory(expected))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is missing: "+expected);Path actual=repoRoot(expected);if(!samePath(actual,expected))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree root differs from persisted path.");if(!same(repositoryIdentity(actual),repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"ChangeSet worktree repository identity differs from its Repository Target.");if(!samePath(gitCommonDir(repositoryTarget),gitCommonDir(actual)))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is attached to a different Git repository.");GitClient.Result symbolic=git.allow(actual,STATE_DIVERGED,"symbolic-ref","--quiet","--short","HEAD");if(symbolic.exitCode()!=0||!Objects.equals(symbolic.first(),cs.branch))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree is not on expected branch "+cs.branch+".");String head=git.run(actual,STATE_DIVERGED,"rev-parse","HEAD").first(),branchTip=git.run(repositoryTarget,STATE_DIVERGED,"rev-parse","--verify","refs/heads/"+cs.branch+"^{commit}").first();return new WorkspacePosition(head,branchTip);}
    private void requirePublishedPosition(ChangeSet cs,WorkspacePosition position){if(!Objects.equals(position.head,cs.publishedTip)||!Objects.equals(position.branchTip,cs.publishedTip))throw new ObsException(STATE_DIVERGED,"ChangeSet worktree/branch tip differs from publishedTip "+cs.publishedTip+".");}
    private void verifyWorkspaceAtPublishedTip(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity){WorkspacePosition position=verifyWorkspacePosition(repositoryTarget,cs,worktree,repositoryIdentity);requirePublishedPosition(cs,position);GitClient.Result index=git.allow(worktree,STATE_DIVERGED,"diff","--cached","--quiet");if(index.exitCode()!=0)throw new ObsException(STATE_DIVERGED,index.exitCode()==1?"Git-backed Apply requires a clean real Git index.":"Cannot verify ChangeSet worktree index.\n--- git details ---\n"+index.failureDetails());}
    private void assertOnlyJournalPathsStaged(Path worktree,ApplyJournal journal){Set<String> allowed=journalPathSet(journal);for(String path:gitNulPaths(worktree,"diff","--cached","--name-only","-z","HEAD","--"))if(!allowed.contains(path))throw new ObsException(STATE_DIVERGED,"Git-backed Commit found a staged path outside its durable package paths: "+path);}
    private Set<String> journalPathSet(ApplyJournal journal){Set<String> paths=new LinkedHashSet<>();for(ApplyJournalEntry e:journal.entries)paths.add(e.path);return paths;}
    private byte[] journalPathspec(ApplyJournal journal){try{ByteArrayOutputStream out=new ByteArrayOutputStream();for(ApplyJournalEntry e:journal.entries){out.write(e.path.getBytes(StandardCharsets.UTF_8));out.write(0);}return out.toByteArray();}catch(IOException impossible){throw new AssertionError(impossible);}}
    private void stageJournalPaths(Path worktree,ApplyJournal journal){git.stdin(worktree,COMMIT_FAILED,journalPathspec(journal),"add","-f","-A","--pathspec-from-file=-","--pathspec-file-nul");}
    private String verifyRecoverableCommittedHead(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity,ApplyJournal journal,WorkspacePosition position){if(!Objects.equals(position.head,position.branchTip))throw new ObsException(STATE_DIVERGED,"ChangeSet branch ref and worktree HEAD diverged during Commit recovery.");verifyExactPackageCommit(repositoryTarget,cs,worktree,repositoryIdentity,journal,position.head,cs.publishedTip);return position.head;}
    private void verifyCommittedUnpublishedState(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity,ApplyJournal journal){if(cs.commitSha==null||cs.commitSha.isBlank())throw new ObsException(STATE_DIVERGED,"CommittedUnpublished ChangeSet is missing commitSha.");WorkspacePosition position=verifyWorkspacePosition(repositoryTarget,cs,worktree,repositoryIdentity);if(!Objects.equals(position.head,cs.commitSha)||!Objects.equals(position.branchTip,cs.commitSha))throw new ObsException(STATE_DIVERGED,"CommittedUnpublished worktree/branch is not at recorded commit "+cs.commitSha+".");verifyExactPackageCommit(repositoryTarget,cs,worktree,repositoryIdentity,journal,cs.commitSha,cs.publishedTip);}
    private void verifyExactPackageCommit(Path repositoryTarget,ChangeSet cs,Path worktree,String repositoryIdentity,ApplyJournal journal,String commit,String expectedParent){WorkspacePosition position=verifyWorkspacePosition(repositoryTarget,cs,worktree,repositoryIdentity);if(!Objects.equals(position.head,commit)||!Objects.equals(position.branchTip,commit))throw new ObsException(STATE_DIVERGED,"Expected package commit is not the exact ChangeSet branch/worktree tip.");String parentLine=git.run(worktree,STATE_DIVERGED,"rev-list","--parents","-n","1",commit).first();String[] parents=parentLine.isBlank()?new String[0]:parentLine.split("\\s+");if(parents.length!=2||!Objects.equals(parents[1],expectedParent))throw new ObsException(STATE_DIVERGED,"Package commit is not a single-parent child of expected previous published tip "+expectedParent+".");if(!commitHasExactTrailers(worktree,commit,journal.packageId,cs.changeSetId))throw new ObsException(STATE_DIVERGED,"Package commit trailers do not prove the durable package/ChangeSet identity.");Set<String> allowed=journalPathSet(journal);for(String path:gitNulPaths(worktree,"diff","--name-only","-z",expectedParent,commit,"--"))if(!allowed.contains(path))throw new ObsException(STATE_DIVERGED,"Package commit changed a path outside its durable package paths: "+path);GitClient.Result index=git.allow(worktree,STATE_DIVERGED,"diff","--cached","--quiet");if(index.exitCode()!=0)throw new ObsException(STATE_DIVERGED,index.exitCode()==1?"Package commit recovery requires a clean real Git index.":"Cannot verify Git index after package commit.\n--- git details ---\n"+index.failureDetails());if(!allJournalState(worktree,journal,true))throw new ObsException(STATE_DIVERGED,"Package commit worktree no longer matches the durable intended package result.");if(!gitNulPaths(worktree,"diff","--name-only","-z","HEAD","--").isEmpty()||!gitNulPaths(worktree,"ls-files","--others","-z","--").isEmpty())throw new ObsException(STATE_DIVERGED,"Package commit worktree contains changes after the expected commit.");}
    private boolean commitHasExactTrailers(Path worktree,String commit,String packageId,String changeSetId){String message=git.run(worktree,STATE_DIVERGED,"show","-s","--format=%B",commit).joined()+"\n";List<String> parsed=git.stdin(worktree,STATE_DIVERGED,message.getBytes(StandardCharsets.UTF_8),"interpret-trailers","--parse").stdout();int packages=0,changeSets=0;for(String line:parsed){int colon=line.indexOf(':');if(colon<0)continue;String key=line.substring(0,colon).trim(),value=line.substring(colon+1).trim();if(key.equalsIgnoreCase("Package-Id")){if(!key.equals("Package-Id")||!value.equals(packageId))return false;packages++;}if(key.equalsIgnoreCase("ChangeSet-Id")){if(!key.equals("ChangeSet-Id")||!value.equals(changeSetId))return false;changeSets++;}}return packages==1&&changeSets==1;}
    private void assertWorkspaceClean(Path worktree){String tracked=git.run(worktree,STATE_DIVERGED,"diff","--name-only","HEAD","--").joined(),untracked=git.run(worktree,STATE_DIVERGED,"ls-files","--others","--").joined();if(!tracked.isBlank()||!untracked.isBlank())throw new ObsException(STATE_DIVERGED,"Ready ChangeSet worktree contains unexpected file changes before Apply.");}
    private void assertOnlyJournalPathsDirty(Path worktree,ApplyJournal journal){Set<String> allowed=new HashSet<>();for(ApplyJournalEntry e:journal.entries)allowed.add(e.path);Set<String> dirty=new LinkedHashSet<>();dirty.addAll(gitNulPaths(worktree,"diff","--name-only","-z","HEAD","--"));dirty.addAll(gitNulPaths(worktree,"ls-files","--others","-z","--"));for(String path:dirty)if(!allowed.contains(path))throw new ObsException(STATE_DIVERGED,"Git-backed Apply found unrelated worktree change outside its durable package paths: "+path);}
    private Set<String> gitNulPaths(Path repo,String... args){byte[] output=git.bytes(repo,STATE_DIVERGED,args).output();Set<String> paths=new LinkedHashSet<>();int start=0;for(int i=0;i<=output.length;i++)if(i==output.length||output[i]==0){if(i>start){byte[] raw=Arrays.copyOfRange(output,start,i);String path;try{path=StandardCharsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT).onUnmappableCharacter(CodingErrorAction.REPORT).decode(ByteBuffer.wrap(raw)).toString();}catch(CharacterCodingException e){throw new ObsException(STATE_DIVERGED,"Git returned a non-UTF-8 repository path while verifying ChangeSet worktree dirt.",e);}paths.add(path);}start=i+1;}return paths;}
    private void markAppliedUncommitted(ChangeSet cs,PackageData pkg){cs.executionState="AppliedUncommitted";cs.lastPackageId=pkg.manifest.packageId;cs.currentReviewAttemptId=null;cs.currentReviewDiffPath=null;cs.currentReviewSha256=null;cs.currentReviewHead=null;cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,"Package files applied in isolated worktree; commit is pending.");state.saveChangeSet(cs);}
    private void publishGitBackedBinding(ObsAction action,ReviewChatBindingDecision reviewChatDecision,ReviewChatBindingPlan reviewChatPlan,ChangeSet cs,ApplicationAttempt attempt){if(action!=null&&action.chatContextToken()!=null)return;if(reviewChatDecision==ReviewChatBindingDecision.USE_HINT&&reviewChatPlan!=null&&reviewChatPlan.requestedConversation()!=null)try{chatBridge.bind(cs.changeSetId,reviewChatPlan.requestedConversation().conversationKey());}catch(Throwable t){attempt.handoffWarning=((attempt.handoffWarning==null?"":attempt.handoffWarning)+" ChatGPT rebind warning: "+(t.getMessage()==null?t.toString():t.getMessage())).trim();}}
    private void publishLegacyReviewBinding(ObsAction action,ReviewChatBindingDecision reviewChatDecision,ReviewChatBindingPlan reviewChatPlan,ChangeSet cs,ReviewDiff review,ApplicationAttempt success){boolean queueReview=true;if(action!=null&&action.chatContextToken()!=null){ChatBridgeService.ContextBindingResult contextResult=chatBridge.bindContextAtReviewCutoff(action.chatContextToken(),cs,review);queueReview=contextResult.bound();if(!contextResult.bound()&&contextResult.message()!=null&&!contextResult.message().isBlank())success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" "+contextResult.message()).trim();}else if(reviewChatDecision==ReviewChatBindingDecision.USE_HINT&&reviewChatPlan!=null&&reviewChatPlan.requestedConversation()!=null)try{chatBridge.bind(cs.changeSetId,reviewChatPlan.requestedConversation().conversationKey());}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" ChatGPT rebind warning: "+(t.getMessage()==null?t.toString():t.getMessage())).trim();}if(queueReview)try{chatBridge.enqueueReviewIfBound(cs,review);}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" ChatGPT delivery queue warning: "+(t.getMessage()==null?t.toString():t.getMessage())).trim();}}

    private ApplicationAttempt attempt(String id,String now,String name,String repoId,Path repo,PackageData pkg,String result,String code,String msg,ReviewDiff review){ApplicationAttempt a=new ApplicationAttempt();a.attemptId=id;a.timestamp=now;a.name=name;a.repositoryIdentity=repoId;a.repositoryRoot=repo==null?null:repo.toString();a.archivePath=pkg.archivePath.toString();a.archiveSha256=pkg.archiveSha256;a.packageId=pkg.manifest.packageId;a.changeSetId=pkg.manifest.changeSetId;a.result=result;a.code=code;a.message=msg;if(review!=null){a.reviewDiffPath=review.diffPath.toString();a.reviewDiffSha256=review.sha256;}a.handoffWarning="";return a;}

    public ReviewDiff refreshReview(String changeSetId){try(StateStore.Lock ignored=state.lock()){ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+changeSetId);if(isGitBackedWorkspace(cs))throw new ObsException(STATE_DIVERGED,"Git-backed Current Change inspection is not migrated yet; do not project this workspace through the legacy owned-path ReviewDiff.");ReviewDiff r=newReviewDiff(cs);cs.currentReviewAttemptId=r.attemptId;cs.currentReviewDiffPath=r.diffPath.toString();cs.currentReviewSha256=r.sha256;cs.currentReviewHead=r.head;cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);try{chatBridge.enqueueReviewIfBound(cs,r);}catch(Throwable ignoredBridge){}return r;}}

    public ReviewDiff newReviewDiff(ChangeSet cs){return newReviewDiff(cs,UUID.randomUUID().toString());}
    private ReviewDiff newReviewDiff(ChangeSet cs,String reviewId){
        RepositoryConfig target=repositoryForChangeSet(cs,true);Path repo=Path.of(target.path);cs.repositoryRoot=repo.toString();requireRepositoryReady(repo);
        if(cs.ownedPaths.isEmpty())throw new ObsException(STATE_DIVERGED,"ChangeSet has no owned paths.");
        String head=git.run(repo,STATE_DIVERGED,"rev-parse","HEAD").first();
        Path dir=state.reviewDir(cs.changeSetId),tempDir=null;
        try{
            Files.createDirectories(dir);
            tempDir=Files.createTempDirectory("obs-rpkg-index-");
            Path index=tempDir.resolve("index"),tempDiff=tempDir.resolve("review.diff");
            Map<String,String> env=Map.of("GIT_INDEX_FILE",index.toString());
            git.env(repo,STATE_DIVERGED,env,"read-tree","HEAD");
            List<String> paths=effectiveGitPaths(repo,cs.ownedPaths);
            if(paths.isEmpty()){
                Files.write(tempDiff,new byte[0],StandardOpenOption.CREATE_NEW);
            }else{
                List<String> add=new ArrayList<>(List.of("add","-f","-A","--"));add.addAll(paths);
                git.run(repo,STATE_DIVERGED,false,env,add.toArray(String[]::new));
                List<String> diff=new ArrayList<>(List.of("--no-pager","diff","--cached","--no-color","HEAD","--output="+tempDiff,"--"));diff.addAll(paths);
                git.run(repo,STATE_DIVERGED,false,env,diff.toArray(String[]::new));
            }
            Path out=dir.resolve(reviewId+".diff");
            Files.move(tempDiff,out,StandardCopyOption.REPLACE_EXISTING);
            return new ReviewDiff(reviewId,out,sha256(out),head);
        }catch(ObsException e){throw e;}catch(IOException e){throw new ObsException(STATE_DIVERGED,"ReviewDiff generation failed: "+e.getMessage(),e);}
        finally{deleteTree(tempDir);}
    }

    public Path verifiedReviewDiffPath(ReviewDiff review){
        if(review==null||review.diffPath==null||review.sha256==null||review.sha256.isBlank())throw new ObsException(STATE_DIVERGED,"Current ReviewDiff identity is unavailable.");
        Path p=review.diffPath.toAbsolutePath().normalize();
        if(!Files.isRegularFile(p))throw new ObsException(STATE_DIVERGED,"Canonical ReviewDiff file is missing: "+p);
        String actual=sha256(p);if(!actual.equalsIgnoreCase(review.sha256))throw new ObsException(STATE_DIVERGED,"Canonical ReviewDiff bytes no longer match the recorded integrity fingerprint.");
        return p;
    }

    public static String formatApplyReceipt(ApplyReceipt receipt){
        if(receipt==null)throw new IllegalArgumentException("Apply receipt is required.");
        if(!Set.of("applied","failed","uncertain").contains(receipt.status()))throw new IllegalArgumentException("Unsupported Apply receipt status: "+receipt.status());
        if("applied".equals(receipt.status())&&(receipt.packageId()==null||receipt.packageId().isBlank()||receipt.changeSetId()==null||receipt.changeSetId().isBlank()))throw new IllegalArgumentException("Applied receipt requires packageId and changeSetId.");
        if(!"applied".equals(receipt.status())&&(receipt.code()==null||receipt.code().isBlank()))throw new IllegalArgumentException("Failed/uncertain receipt requires code.");
        StringBuilder out=new StringBuilder("OBS-APPLY-RESULT/1\n");out.append("status: ").append(receiptValue(receipt.status())).append('\n');
        if(receipt.packageId()!=null&&!receipt.packageId().isBlank())out.append("packageId: ").append(receiptValue(receipt.packageId())).append('\n');
        if(receipt.changeSetId()!=null&&!receipt.changeSetId().isBlank())out.append("changeSetId: ").append(receiptValue(receipt.changeSetId())).append('\n');
        if(receipt.code()!=null&&!receipt.code().isBlank())out.append("code: ").append(receiptValue(receipt.code())).append('\n');
        if(receipt.message()!=null&&!receipt.message().isBlank())out.append("message: ").append(receiptValue(semanticSummary(receipt.message()))).append('\n');
        return out.toString();
    }
    public Handoff copyApplyReceiptToClipboard(ApplyReceipt receipt){return copyTextToClipboardVerified(formatApplyReceipt(receipt));}
    void publishSuccessfulApplyHandoffs(ApplyResult result,String packageId,String changeSetId){
        if(result==null||result.attempt()==null||result.changeSet()==null)throw new ObsException(INTERNAL_ERROR,"Successful Apply handoff requires attempt and ChangeSet.");
        List<String>warnings=new ArrayList<>();
        Handoff receipt=copyApplyReceiptToClipboard(new ApplyReceipt("applied",packageId,changeSetId,null,null));
        if(receipt.warning()!=null&&!receipt.warning().isBlank())warnings.add("Apply receipt clipboard warning: "+receipt.warning());
        if(result.review()!=null){Handoff review=publishReviewDiff(result.changeSet(),result.review());if(review.servicePath()!=null&&!review.servicePath().isBlank())result.attempt().serviceReviewDiffPath=review.servicePath();if(review.warning()!=null&&!review.warning().isBlank())warnings.add(review.warning());}
        if(!warnings.isEmpty())result.attempt().handoffWarning=((result.attempt().handoffWarning==null?"":result.attempt().handoffWarning)+" "+String.join(" ",warnings)).trim();
        try{state.saveAttempt(result.attempt());}catch(Throwable ignored){}
    }
    public Handoff copyApplyFailureReceiptToClipboard(String packageId,String changeSetId,Throwable failure){
        String code=failure instanceof ObsException oe?oe.code:INTERNAL_ERROR,status=APPLY_ROLLBACK_UNVERIFIED.equals(code)?"uncertain":"failed";String message=failure==null?"Unknown Apply failure.":semanticSummary(failure.getMessage()==null?failure.toString():failure.getMessage());
        return copyApplyReceiptToClipboard(new ApplyReceipt(status,packageId,changeSetId,code,message));
    }
    private void copyApplyFailureReceiptBestEffort(PackageData pkg,Throwable failure){try{copyApplyFailureReceiptToClipboard(pkg==null?null:pkg.manifest.packageId,pkg==null?null:pkg.manifest.changeSetId,failure);}catch(Throwable ignored){}}
    private static String receiptValue(String value){return value.replace("\\","\\\\").replace("\r","\\r").replace("\n","\\n");}

    public Handoff copyTextToClipboardVerified(String text){
        String expected=text==null?"":text;
        try{clipboard.setText(expected);String actual=clipboard.getText();if(!Objects.equals(expected,actual))return new Handoff(null,"Clipboard handoff verification failed: read-back differs from expected text.");return new Handoff(null,"");}
        catch(Throwable e){return new Handoff(null,"Clipboard handoff failed: "+(e.getMessage()==null?e.toString():e.getMessage()));}
    }

    public Handoff copyPathToClipboard(Path path){if(path==null)throw new ObsException(SNAPSHOT_EXPORT_FAILED,"Snapshot path is unavailable.");return copyTextToClipboardVerified(path.toAbsolutePath().normalize().toString());}

    public Handoff copyReviewDiffToClipboard(ReviewDiff review){
        Path p=verifiedReviewDiffPath(review);String text;try{text=Files.readString(p,StandardCharsets.UTF_8);}catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot read canonical ReviewDiff: "+e.getMessage(),e);}
        Handoff h=copyTextToClipboardVerified(text);
        if(h.warning!=null&&!h.warning.isBlank()&&h.warning.contains("expected text"))return new Handoff(null,"Clipboard handoff verification failed: read-back differs from canonical ReviewDiff.");
        return h;
    }

    public Handoff publishReviewDiff(ChangeSet cs,ReviewDiff review){Settings s=getSettings();String handling=s.reviewDiffHandling;String service=null;List<String>w=new ArrayList<>();if(handling.equals("Clipboard")||handling.equals("Both")){try{Handoff h=copyReviewDiffToClipboard(review);if(h.warning!=null&&!h.warning.isBlank())w.add(h.warning);}catch(Throwable e){w.add("Clipboard handoff failed: "+(e.getMessage()==null?e.toString():e.getMessage()));}}if(handling.equals("RepoDiffFile")||handling.equals("Both")){try{Path source=verifiedReviewDiffPath(review),rel=Path.of("_ai-review-diffs",cs.changeSetId,review.attemptId+".diff");RepositoryConfig target=repositoryForChangeSet(cs,true);Path dst=inside(Path.of(target.path),rel.toString().replace('\\','/'));Files.createDirectories(dst.getParent());Files.copy(source,dst,StandardCopyOption.REPLACE_EXISTING);service=rel.toString().replace('\\','/');}catch(Throwable e){w.add("Repo diff-file handoff failed: "+e.getMessage());}}return new Handoff(service,String.join(" ",w));}

    public FinalizeResult finalizeChangeSet(String id,String message,Path repositoryRoot){try{return finalizeChangeSetInternal(id,message,repositoryRoot);}catch(Throwable e){recordFailureOutcome(id,e);throw e;}}
    private FinalizeResult finalizeChangeSetInternal(String id,String message,Path repositoryRoot){
        try(StateStore.Lock ignored=state.lock()){
            ChangeSet cs=state.getChangeSet(id);
            if(cs==null)throw new ObsException(FINALIZE_FAILED,"Unknown ChangeSet: "+id);
            if("CommittedPendingPush".equals(cs.status))throw new ObsException(FINALIZE_FAILED,"ChangeSet already has a commit pending push; use Retry Push.");
            if(!"Active".equals(cs.status))throw new ObsException(FINALIZE_FAILED,"ChangeSet is not Active: "+cs.status);
            if(isGitBackedWorkspace(cs))throw new ObsException(FINALIZE_FAILED,"Git-backed Finalize is intentionally blocked until Commit/Publish/Review migration is implemented for this ChangeSet.");
            RepositoryConfig allowed=operationRepository(cs,repositoryRoot,"Finalize");Path repo=Path.of(allowed.path);requireRepositoryReady(repo);
            String rid=repositoryIdentity(repo);if(!same(rid,cs.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Finalize origin is "+rid+"; ChangeSet targets "+cs.repositoryIdentity+".");
            ReviewDiff baseline;
            try{baseline=currentReview(cs);}catch(ObsException e){if(STATE_DIVERGED.equals(e.code))throw new ObsException(REVIEW_STALE,"Stored ReviewDiff is unavailable or changed. Refresh Review before Finalize.",e);throw e;}
            if(baseline==null)throw new ObsException(REVIEW_STALE,"No current ReviewDiff is recorded. Apply a package or Refresh Review before Finalize.");
            ReviewDiff review=newReviewDiff(cs);
            if(!review.sha256.equalsIgnoreCase(baseline.sha256))throw new ObsException(REVIEW_STALE,"ReviewDiff changed since the last Apply/Refresh Review. Refresh Review before Finalize.");
            GitClient.Result pre=git.allow(repo,FINALIZE_FAILED,"diff","--cached","--quiet");
            if(pre.exitCode()!=0){if(pre.exitCode()==1)throw new ObsException(FINALIZE_FAILED,"Finalize requires a clean real Git index.");throw new ObsException(FINALIZE_FAILED,"Failed to inspect real Git index.\n--- git details ---\n"+pre.failureDetails());}
            try{
                if(Files.size(review.diffPath)==0){finalizeState(cs,null,null,"NoNetChange");return new FinalizeResult(SUCCESS,null,null,cs);}
            }catch(IOException e){throw new ObsException(FINALIZE_FAILED,"Cannot inspect reviewed diff: "+e.getMessage(),e);}
            String branch=git.run(repo,FINALIZE_FAILED,"branch","--show-current").first();
            if(branch.isBlank())throw new ObsException(FINALIZE_FAILED,"Detached HEAD/current branch unavailable.");
            List<String> paths=effectiveGitPaths(repo,cs.ownedPaths);
            if(paths.isEmpty())throw new ObsException(STATE_DIVERGED,"Reviewed diff is non-empty but no owned Git path remains addressable.");
            List<String> add=new ArrayList<>(List.of("add","-f","-A","--"));add.addAll(paths);
            try{git.run(repo,FINALIZE_FAILED,add.toArray(String[]::new));}catch(Throwable t){resetOwned(repo,cs);throw t;}
            Path staged;
            try{
                staged=state.reviewDir(cs.changeSetId).resolve("staged-"+UUID.randomUUID()+".diff");Files.createDirectories(staged.getParent());
                List<String> d=new ArrayList<>(List.of("--no-pager","diff","--cached","--no-color","--output="+staged,"HEAD","--"));d.addAll(paths);
                git.run(repo,FINALIZE_FAILED,d.toArray(String[]::new));
            }catch(Throwable t){resetOwned(repo,cs);throw asObs(t,FINALIZE_FAILED);}
            if(!sha256(staged).equalsIgnoreCase(baseline.sha256)){resetOwned(repo,cs);throw new ObsException(REVIEW_STALE,"Staged diff bytes differ from the current ReviewDiff baseline.");}
            try{git.run(repo,FINALIZE_FAILED,"commit","-m",message);}catch(Throwable t){resetOwned(repo,cs);throw t;}
            String commit=git.run(repo,FINALIZE_FAILED,"rev-parse","HEAD").first();cs.commitSha=commit;cs.branch=branch;cs.status="CommittedPendingPush";cs.updatedAt=Instant.now().toString();setOutcome(cs,"SUCCESS",SUCCESS,"Local commit created; publication pending.");state.saveChangeSet(cs);
            GitClient.Result push=git.allow(repo,FINALIZE_FAILED,"push","origin",branch);
            if(push.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Commit "+commit+" created; push failed. ChangeSet remains Publication Pending.\n--- git details ---\n"+push.failureDetails());
            finalizeState(cs,commit,branch,"Published");return new FinalizeResult(SUCCESS,commit,branch,cs);
        }
    }

    public FinalizeResult retryPush(String id,Path repositoryRoot){try{return retryPushInternal(id,repositoryRoot);}catch(Throwable e){recordFailureOutcome(id,e);throw e;}}
    private FinalizeResult retryPushInternal(String id,Path repositoryRoot){
        try(StateStore.Lock ignored=state.lock()){
            ChangeSet cs=state.getChangeSet(id);if(cs==null||!"CommittedPendingPush".equals(cs.status))throw new ObsException(FINALIZE_FAILED,"ChangeSet is not Publication Pending.");
            RepositoryConfig allowed=operationRepository(cs,repositoryRoot,"Retry Push");Path repo=Path.of(allowed.path);requireRepositoryReady(repo);
            String rid=repositoryIdentity(repo);if(!same(rid,cs.repositoryIdentity))throw new ObsException(REPOSITORY_MISMATCH,"Retry Push origin is "+rid+"; ChangeSet targets "+cs.repositoryIdentity+".");
            String head=git.run(repo,STATE_DIVERGED,"rev-parse","HEAD").first();if(!head.equals(cs.commitSha))throw new ObsException(STATE_DIVERGED,"HEAD is not the recorded pending-push commit.");
            String branch=git.run(repo,STATE_DIVERGED,"branch","--show-current").first();if(branch.isBlank()||!branch.equals(cs.branch))throw new ObsException(STATE_DIVERGED,"Current branch is not the recorded pending-push branch.");
            GitClient.Result index=git.allow(repo,STATE_DIVERGED,"diff","--cached","--quiet");if(index.exitCode()!=0){if(index.exitCode()==1)throw new ObsException(STATE_DIVERGED,"Retry Push recovery requires a clean real Git index.");throw new ObsException(STATE_DIVERGED,"Failed to inspect real Git index before Retry Push.\n--- git details ---\n"+index.failureDetails());}
            String remoteRef="refs/remotes/origin/"+cs.branch,remoteSpec="+refs/heads/"+cs.branch+":"+remoteRef;
            GitClient.Result fetch=git.allow(repo,FINALIZE_FAILED,"fetch","--no-tags","origin",remoteSpec);if(fetch.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Retry Push could not refresh the remote branch; existing commit remains pending.\n--- git details ---\n"+fetch.failureDetails());
            String remote=git.run(repo,FINALIZE_FAILED,"rev-parse","--verify",remoteRef).first();
            if(head.equals(remote)){return markPushed(cs);}
            boolean pendingInRemote=isAncestor(repo,head,remote),remoteBehindPending=isAncestor(repo,remote,head);
            if(pendingInRemote){requireRemoteDisjointFromOtherActive(repo,cs,remoteRef);advanceLocalToPublishedRemote(repo,cs,remoteRef);return markPushed(cs);}
            if(remoteBehindPending){GitClient.Result push=git.allow(repo,FINALIZE_FAILED,"push","origin",cs.branch);if(push.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Retry Push failed; existing commit remains pending.\n--- git details ---\n"+push.failureDetails());return markPushed(cs);}
            requireRemoteDisjointFromPending(repo,cs,remoteRef);requireRemoteDisjointFromOtherActive(repo,cs,remoteRef);rebasePendingOntoRemote(repo,cs,remoteRef);
            GitClient.Result push=git.allow(repo,FINALIZE_FAILED,"push","origin",cs.branch);if(push.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Retry Push rebased the pending commit onto the refreshed remote branch, but push still failed. The rebased commit remains Publication Pending.\n--- git details ---\n"+push.failureDetails());
            return markPushed(cs);
        }
    }

    public ChangeSet reopenChangeSet(String id){try{return reopenChangeSetInternal(id);}catch(Throwable e){recordFailureOutcome(id,e);throw e;}}
    private ChangeSet reopenChangeSetInternal(String id){
        try(StateStore.Lock ignored=state.lock()){
            ChangeSet cs=state.getChangeSet(id);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+id);if(!"Finalized".equals(cs.status))throw new ObsException(STATE_DIVERGED,"Only a Finalized ChangeSet can be reopened.");
            RepositoryConfig target=repositoryForChangeSet(cs,true);Path repo=Path.of(target.path);requireRepositoryReady(repo);
            for(ChangeSet other:state.activeChangeSets())if(!other.changeSetId.equals(cs.changeSetId)&&belongsTo(other,target))for(String owned:other.ownedPaths)for(String historical:cs.ownedPaths)if(owned.equalsIgnoreCase(historical))throw new ObsException(PATH_OWNERSHIP_CONFLICT,"Cannot Reopen: path is owned by unfinished ChangeSet "+other.changeSetId+": "+historical);
            for(String path:cs.ownedPaths)if(pathDirty(repo,path))throw new ObsException(STATE_DIVERGED,"Cannot Reopen without adopting unrelated dirty/unowned state: "+path);
            archiveFinalizationIfNeeded(cs);cs.status="Active";cs.repositoryTargetId=target.id;cs.repositoryRoot=repo.toString();cs.commitSha=null;cs.branch=null;cs.currentReviewAttemptId=null;cs.currentReviewDiffPath=null;cs.currentReviewSha256=null;cs.currentReviewHead=null;setOutcome(cs,"SUCCESS",SUCCESS,"ChangeSet reopened.");cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);return cs;
        }
    }

    private FinalizeResult markPushed(ChangeSet cs){finalizeState(cs,cs.commitSha,cs.branch,"Published");return new FinalizeResult(SUCCESS,cs.commitSha,cs.branch,cs);}
    private void finalizeState(ChangeSet cs,String commit,String branch,String kind){cs.commitSha=commit;cs.branch=branch;Map<String,Object> h=new LinkedHashMap<>();h.put("kind",kind);h.put("commitSha",commit);h.put("branch",branch);h.put("timestamp",Instant.now().toString());cs.finalizationHistory.add(h);cs.status="Finalized";cs.lastOperationStatus=null;cs.lastOperationCode=null;cs.lastOperationMessage=null;cs.lastOperationAt=null;cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}
    private void archiveFinalizationIfNeeded(ChangeSet cs){if(!cs.finalizationHistory.isEmpty())return;Map<String,Object> h=new LinkedHashMap<>();h.put("kind","HistoricalFinalization");h.put("commitSha",cs.commitSha);h.put("branch",cs.branch);h.put("timestamp",cs.updatedAt);cs.finalizationHistory.add(h);}
    private boolean isAncestor(Path repo,String older,String newer){GitClient.Result r=git.allow(repo,FINALIZE_FAILED,"merge-base","--is-ancestor",older,newer);if(r.exitCode()==0)return true;if(r.exitCode()==1)return false;throw new ObsException(FINALIZE_FAILED,"Failed to compare local and remote commit ancestry.\n--- git details ---\n"+r.failureDetails());}
    private void requireRemoteDisjointFromPending(Path repo,ChangeSet pending,String remoteRef){
        String mergeBase=git.run(repo,FINALIZE_FAILED,"merge-base",pending.commitSha,remoteRef).first();
        if(mergeBase.isBlank())throw new ObsException(FINALIZE_FAILED,"Retry Push could not determine a common base for the pending commit and refreshed remote branch.");
        List<String> args=new ArrayList<>(List.of("diff","--name-only",mergeBase,remoteRef,"--"));args.addAll(pending.ownedPaths);
        GitClient.Result changed=git.allow(repo,FINALIZE_FAILED,args.toArray(String[]::new));
        if(changed.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Retry Push could not inspect remote changes on pending-owned paths.\n--- git details ---\n"+changed.failureDetails());
        if(!changed.joined().isBlank())throw new ObsException(FINALIZE_FAILED,"Remote branch changed paths owned by the pending ChangeSet. Automatic Retry Push recovery stopped before rebase or push; the original pending commit and other active work remain unchanged.\nRemote-changed pending paths:\n"+changed.joined());
    }

    private void requireRemoteDisjointFromOtherActive(Path repo,ChangeSet pending,String remoteRef){
        LinkedHashSet<String> activeOwned=new LinkedHashSet<>();RepositoryConfig target=repositoryForChangeSet(pending,false);
        for(ChangeSet other:state.activeChangeSets()){
            if(other.changeSetId.equals(pending.changeSetId)||!belongsTo(other,target))continue;
            if("CommittedPendingPush".equals(other.status))throw new ObsException(STATE_DIVERGED,"Retry Push recovery does not support a second CommittedPendingPush ChangeSet in the same repository.");
            if("Active".equals(other.status))activeOwned.addAll(other.ownedPaths);
        }
        if(activeOwned.isEmpty())return;
        String mergeBase=git.run(repo,FINALIZE_FAILED,"merge-base",pending.commitSha,remoteRef).first();
        if(mergeBase.isBlank())throw new ObsException(FINALIZE_FAILED,"Retry Push could not determine a common base while checking other Active ChangeSets.");
        List<String> args=new ArrayList<>(List.of("diff","--name-only",mergeBase,remoteRef,"--"));args.addAll(activeOwned);
        GitClient.Result changed=git.allow(repo,FINALIZE_FAILED,args.toArray(String[]::new));
        if(changed.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Retry Push could not inspect remote changes on other Active ChangeSet-owned paths.\n--- git details ---\n"+changed.failureDetails());
        if(!changed.joined().isBlank())throw new ObsException(FINALIZE_FAILED,"Remote branch changed paths owned by another Active ChangeSet. Automatic Retry Push recovery stopped before changing HEAD; the pending commit and all Active working bytes remain unchanged.\nRemote-changed Active paths:\n"+changed.joined());
    }

    private void advanceLocalToPublishedRemote(Path repo,ChangeSet pending,String remoteRef){
        Map<String,Backup> preserved=preserveOtherActiveWork(repo,pending);boolean cleaned=false;
        try{
            cleanPreservedPathsToHead(repo,preserved);cleaned=true;
            GitClient.Result ff=git.allow(repo,FINALIZE_FAILED,"merge","--ff-only",remoteRef);if(ff.exitCode()!=0)throw new ObsException(FINALIZE_FAILED,"Remote already contains the pending commit, but the local branch could not fast-forward to the refreshed remote branch.\n--- git details ---\n"+ff.failureDetails());
            restorePreservedWork(repo,preserved);
        }catch(Throwable t){if(cleaned){try{restorePreservedWork(repo,preserved);}catch(Throwable restore){t.addSuppressed(restore);throw new ObsException(STATE_DIVERGED,"Retry Push could not restore other active ChangeSet work after local fast-forward failure.",t);}}throw asObs(t,FINALIZE_FAILED);}
    }

    private void rebasePendingOntoRemote(Path repo,ChangeSet pending,String remoteRef){
        String oldCommit=pending.commitSha,parent=git.run(repo,FINALIZE_FAILED,"rev-parse",oldCommit+"^").first();
        Map<String,Backup> preserved=preserveOtherActiveWork(repo,pending);boolean cleaned=false,rebaseStarted=false;
        try{
            cleanPreservedPathsToHead(repo,preserved);cleaned=true;
            GitClient.Result rebase=git.allow(repo,FINALIZE_FAILED,"-c","commit.gpgsign=false","rebase","--onto",remoteRef,parent);rebaseStarted=true;
            if(rebase.exitCode()!=0){GitClient.Result abort=git.allow(repo,STATE_DIVERGED,"rebase","--abort");if(abort.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Automatic Retry Push rebase failed and git rebase --abort also failed.\n--- rebase details ---\n"+rebase.failureDetails()+"\n--- abort details ---\n"+abort.failureDetails());restorePreservedWork(repo,preserved);cleaned=false;throw new ObsException(FINALIZE_FAILED,"Remote branch advanced and the pending commit could not be rebased automatically. No force push was attempted; the original pending commit and other active work were restored.\n--- git details ---\n"+rebase.failureDetails());}
            String rebased=git.run(repo,FINALIZE_FAILED,"rev-parse","HEAD").first();
            GitClient.Result exact=ownedTreeEqual(repo,oldCommit,rebased,pending.ownedPaths);if(exact.exitCode()==1){rollbackRebasedHead(repo,oldCommit,preserved);cleaned=false;throw new ObsException(FINALIZE_FAILED,"Automatic Retry Push rebase would change the reviewed result on paths owned by the pending ChangeSet. The original pending commit and other active work were restored; resolve the remote overlap explicitly before retrying.");}if(exact.exitCode()!=0){rollbackRebasedHead(repo,oldCommit,preserved);cleaned=false;throw new ObsException(STATE_DIVERGED,"Failed to verify the rebased pending ChangeSet result.\n--- git details ---\n"+exact.failureDetails());}
            try{restorePreservedWork(repo,preserved);cleaned=false;}catch(Throwable restore){rollbackRebasedHead(repo,oldCommit,preserved);cleaned=false;throw new ObsException(STATE_DIVERGED,"Retry Push rebased the pending commit but could not restore other active ChangeSet work; the original pending commit was restored.",restore);}
            pending.commitSha=rebased;pending.updatedAt=Instant.now().toString();
            try{state.saveChangeSet(pending);}catch(Throwable persist){
                pending.commitSha=oldCommit;
                try{cleanPreservedPathsToHead(repo,preserved);GitClient.Result reset=git.allow(repo,STATE_DIVERGED,"reset","--hard",oldCommit);if(reset.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Cannot restore original pending commit after ledger persistence failure.\n--- git details ---\n"+reset.failureDetails());restorePreservedWork(repo,preserved);}catch(Throwable rollback){persist.addSuppressed(rollback);throw new ObsException(STATE_DIVERGED,"Retry Push rebased the pending commit but could not persist or fully restore the pending ledger state.",persist);}
                throw asObs(persist,STATE_DIVERGED);
            }
        }catch(Throwable t){
            if(cleaned){try{if(rebaseStarted)git.allow(repo,STATE_DIVERGED,"rebase","--abort");git.allow(repo,STATE_DIVERGED,"reset","--hard",oldCommit);restorePreservedWork(repo,preserved);}catch(Throwable rollback){t.addSuppressed(rollback);throw new ObsException(STATE_DIVERGED,"Retry Push recovery failed and could not restore the original pending state.",t);}}
            throw asObs(t,FINALIZE_FAILED);
        }
    }

    private GitClient.Result ownedTreeEqual(Path repo,String oldCommit,String rebased,Collection<String> paths){List<String> args=new ArrayList<>(List.of("diff","--quiet",oldCommit,rebased,"--"));args.addAll(paths);return git.allow(repo,FINALIZE_FAILED,args.toArray(String[]::new));}
    private void rollbackRebasedHead(Path repo,String oldCommit,Map<String,Backup> preserved){GitClient.Result reset=git.allow(repo,STATE_DIVERGED,"reset","--hard",oldCommit);if(reset.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Cannot restore original pending commit after Retry Push recovery.\n--- git details ---\n"+reset.failureDetails());restorePreservedWork(repo,preserved);}

    private Map<String,Backup> preserveOtherActiveWork(Path repo,ChangeSet pending){
        LinkedHashMap<String,Backup> backups=new LinkedHashMap<>();LinkedHashSet<String> allowedDirty=new LinkedHashSet<>();RepositoryConfig target=repositoryForChangeSet(pending,false);
        for(ChangeSet other:state.activeChangeSets()){
            if(other.changeSetId.equals(pending.changeSetId)||!belongsTo(other,target))continue;
            if("CommittedPendingPush".equals(other.status))throw new ObsException(STATE_DIVERGED,"Retry Push recovery does not support a second CommittedPendingPush ChangeSet in the same repository.");
            for(String path:other.ownedPaths){allowedDirty.add(path);backupRecoveryPath(repo,backups,path,"Active ChangeSet");}
        }
        backupGeneratedRuntimeWork(repo,backups);
        LinkedHashSet<String> visibleDirty=visibleDirtyPaths(repo);for(String path:visibleDirty)if(!allowedDirty.contains(path)&&!isServiceArtifact(path))throw new ObsException(STATE_DIVERGED,"Retry Push found dirty work not owned by another active ChangeSet: "+path);
        return backups;
    }

    private void backupGeneratedRuntimeWork(Path repo,LinkedHashMap<String,Backup> backups){
        String root="planning/documentation/tools/replacement-package-app/build";LinkedHashSet<String> paths=new LinkedHashSet<>();
        for(String[] args:new String[][]{{"diff","--name-only","-z","HEAD","--",root},{"ls-files","--others","--exclude-standard","-z","--",root}}){GitClient.BytesResult r=git.bytesAllow(repo,STATE_DIVERGED,args);if(r.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Failed to inspect generated runtime output before Retry Push recovery.\n--- git details ---\ncommand: git -C "+repo+" "+String.join(" ",args)+"\nexitCode: "+r.exitCode()+(r.error().isBlank()?"":"\nstderr:\n"+r.error().trim()));for(String raw:new String(r.output(),StandardCharsets.UTF_8).split("\u0000",-1)){if(raw.isBlank())continue;String path=raw.replace('\\','/');if(isGeneratedRuntimeArtifact(path))paths.add(path);}}
        for(String path:paths)backupRecoveryPath(repo,backups,path,"generated runtime");
    }
    private void backupRecoveryPath(Path repo,LinkedHashMap<String,Backup> backups,String path,String kind){if(backups.containsKey(path))return;Path target=inside(repo,path);if(Files.exists(target,LinkOption.NOFOLLOW_LINKS)){if(!Files.isRegularFile(target,LinkOption.NOFOLLOW_LINKS))throw new ObsException(STATE_DIVERGED,kind+" path is not a regular file: "+path);backups.put(path,new Backup(true,readBytes(target)));}else backups.put(path,new Backup(false,null));}

    private LinkedHashSet<String> visibleDirtyPaths(Path repo){
        LinkedHashSet<String> out=new LinkedHashSet<>();
        for(String[] args:new String[][]{{"diff","--name-only","-z","HEAD"},{"diff","--cached","--name-only","-z","HEAD"}})collectVisibleDirty(repo,out,args,false);
        collectVisibleDirty(repo,out,new String[]{"ls-files","--others","--exclude-standard","-z"},true);
        return out;
    }
    private void collectVisibleDirty(Path repo,LinkedHashSet<String> out,String[] args,boolean untracked){
        GitClient.BytesResult r=git.bytesAllow(repo,STATE_DIVERGED,args);if(r.exitCode()!=0)throw new ObsException(STATE_DIVERGED,"Failed to inspect working tree before Retry Push recovery.\n--- git details ---\ncommand: git -C "+repo+" "+String.join(" ",args)+"\nexitCode: "+r.exitCode()+(r.error().isBlank()?"":"\nstderr:\n"+r.error().trim()));
        for(String raw:new String(r.output(),StandardCharsets.UTF_8).split("\u0000",-1)){if(raw.isBlank())continue;String path=raw.replace('\\','/');if(isGeneratedRuntimeArtifact(path))continue;out.add(path);}
    }
    private static boolean isGeneratedRuntimeArtifact(String path){String root="planning/documentation/tools/replacement-package-app/build/";return path.equals(root.substring(0,root.length()-1))||path.startsWith(root);}
    private static boolean isServiceArtifact(String path){return path.equals("_ai-review-diffs")||path.startsWith("_ai-review-diffs/");}

    private void cleanPreservedPathsToHead(Path repo,Map<String,Backup> backups){
        LinkedHashMap<String,Backup> attempted=new LinkedHashMap<>();
        try{
            for(Map.Entry<String,Backup> e:backups.entrySet()){
                String path=e.getKey();attempted.put(path,e.getValue());Path target=inside(repo,path);GitClient.Result tracked=git.run(repo,STATE_DIVERGED,"ls-tree","--name-only","HEAD","--",path);
                if(!tracked.joined().isBlank())git.run(repo,STATE_DIVERGED,"checkout","--",path);else try{Files.deleteIfExists(target);}catch(IOException x){throw new ObsException(STATE_DIVERGED,"Cannot temporarily clear preserved path before Retry Push recovery: "+path,x);}
                afterRecoveryPathCleanHook.accept(path);
            }
        }catch(Throwable t){
            try{restorePreservedWork(repo,attempted);}catch(Throwable restore){t.addSuppressed(restore);throw new ObsException(STATE_DIVERGED,"Retry Push failed during preserved-path cleanup and could not restore all paths already touched by cleanup.",t);}
            throw asObs(t,STATE_DIVERGED);
        }
    }
    private void restorePreservedWork(Path repo,Map<String,Backup> backups){
        for(Map.Entry<String,Backup> e:backups.entrySet()){
            Path target=inside(repo,e.getKey());Backup b=e.getValue();if(backupMatches(target,b))continue;
            try{if(!b.existed)Files.deleteIfExists(target);else{Files.createDirectories(target.getParent());Files.write(target,b.bytes,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);}}catch(IOException x){throw new ObsException(STATE_DIVERGED,"Cannot restore preserved path after Retry Push recovery: "+e.getKey(),x);}
        }
        for(Map.Entry<String,Backup> e:backups.entrySet())if(!backupMatches(inside(repo,e.getKey()),e.getValue()))throw new ObsException(STATE_DIVERGED,"Restored preserved path does not match its pre-recovery bytes: "+e.getKey());
    }
    private static boolean backupMatches(Path target,Backup b){boolean exists=Files.isRegularFile(target,LinkOption.NOFOLLOW_LINKS);return exists==b.existed&&(!b.existed||Arrays.equals(b.bytes,readBytes(target)));}

    private void resetOwned(Path repo,ChangeSet cs){try{List<String>paths=effectiveGitPaths(repo,cs.ownedPaths);if(paths.isEmpty())return;List<String>x=new ArrayList<>(List.of("reset","-q","--"));x.addAll(paths);git.allow(repo,FINALIZE_FAILED,x.toArray(String[]::new));}catch(Throwable ignored){}}
    private List<String> effectiveGitPaths(Path repo,Collection<String> owned){List<String> out=new ArrayList<>();for(String path:owned){Path target=inside(repo,path);boolean working=Files.exists(target,LinkOption.NOFOLLOW_LINKS);GitClient.Result head=git.run(repo,STATE_DIVERGED,"ls-tree","--name-only","HEAD","--",path);if(working||!head.joined().isBlank())out.add(path);}return out;}
    private boolean pathDirty(Path repo,String path){GitClient.Result w=git.allow(repo,STATE_DIVERGED,"--no-pager","diff","--quiet","HEAD","--",path),s=git.allow(repo,STATE_DIVERGED,"--no-pager","diff","--cached","--quiet","HEAD","--",path);if((w.exitCode()!=0&&w.exitCode()!=1)||(s.exitCode()!=0&&s.exitCode()!=1)){StringBuilder d=new StringBuilder("Failed to inspect path: "+path);if(w.exitCode()!=0&&w.exitCode()!=1)d.append("\n--- working-tree git details ---\n").append(w.failureDetails());if(s.exitCode()!=0&&s.exitCode()!=1)d.append("\n--- staged git details ---\n").append(s.failureDetails());throw new ObsException(STATE_DIVERGED,d.toString());}if(w.exitCode()==1||s.exitCode()==1)return true;GitClient.Result untracked=git.run(repo,STATE_DIVERGED,"ls-files","--others","--",path);return !untracked.joined().isBlank();}
    private void requireRepositoryReady(Path repo){GitClient.Result head=git.allow(repo,REPOSITORY_NOT_READY,"rev-parse","--verify","HEAD");if(head.exitCode()!=0||head.first().isBlank())throw new ObsException(REPOSITORY_NOT_READY,"Repository has no commits; create an initial commit and retry.");}
    private void requireExpectedSource(Path repo,String path,byte[] expected,byte[] actual){if(Arrays.equals(expected,actual))return;GitClient.Result a=git.stdinAllow(repo,SOURCE_STATE_UNVERIFIABLE,expected,"hash-object","--stdin","--path="+path),b=git.stdinAllow(repo,SOURCE_STATE_UNVERIFIABLE,actual,"hash-object","--stdin","--path="+path);if(a.exitCode()!=0||b.exitCode()!=0||a.first().isBlank()||b.first().isBlank())throw new ObsException(SOURCE_STATE_UNVERIFIABLE,"Source state could not be safely verified for "+path+".\n--- expected git details ---\n"+a.failureDetails()+"\n--- actual git details ---\n"+b.failureDetails());if(!a.first().equalsIgnoreCase(b.first()))throw new ObsException(SOURCE_STATE_CHANGED,"Source state changed since the package was prepared: "+path);}
    private static ObsException mapPackageStateFailure(Throwable failure){
        if(failure instanceof ObsException o)return o;
        if(failure instanceof PackageStateApplier.ApplyException e)return switch(e.reason()){
            case ADD_TARGET_EXISTS->new ObsException(BASE_MISMATCH,"Add target already exists: "+e.path());
            case SOURCE_NOT_REGULAR->new ObsException(SOURCE_STATE_CHANGED,"Expected source path is missing: "+e.path());
            case PREPARE_IO->new ObsException(STATE_DIVERGED,e.getMessage(),e);
            case MUTATION_FAILED->new ObsException(RESULT_MISMATCH,e.getMessage(),e);
            case RESULT_MISMATCH->e.getCause()==null?new ObsException(RESULT_MISMATCH,e.getMessage()):new ObsException(RESULT_MISMATCH,e.getMessage(),e);
            case ROLLBACK_FAILED->new ObsException(APPLY_ROLLBACK_UNVERIFIED,"Apply failed and target/ledger rollback could not be verified.",e);
        };
        return asObs(failure,INTERNAL_ERROR);
    }
    private static boolean containsPackageRollbackFailure(Throwable failure){
        Set<Throwable> seen=Collections.newSetFromMap(new IdentityHashMap<>());ArrayDeque<Throwable> pending=new ArrayDeque<>();if(failure!=null)pending.add(failure);while(!pending.isEmpty()){Throwable t=pending.removeFirst();if(!seen.add(t))continue;if(t instanceof PackageStateApplier.ApplyException e&&e.reason()==PackageStateApplier.FailureReason.ROLLBACK_FAILED)return true;if(t.getCause()!=null)pending.addLast(t.getCause());for(Throwable x:t.getSuppressed())if(x!=null)pending.addLast(x);}return false;
    }
    private static String semanticSummary(String message){if(message==null)return"";int p=message.indexOf("\n---");return (p>=0?message.substring(0,p):message).strip();}
    private static void setOutcome(ChangeSet cs,String status,String code,String message){if(cs==null)return;cs.lastOperationStatus=status;cs.lastOperationCode=code;cs.lastOperationMessage=semanticSummary(message);cs.lastOperationAt=Instant.now().toString();}
    private void recordFailureOutcome(String changeSetId,Throwable failure){String code=failure instanceof ObsException oe?oe.code:INTERNAL_ERROR;try{recordOperationOutcome(changeSetId,"FAILED",code,semanticSummary(failure.getMessage()==null?failure.toString():failure.getMessage()));}catch(Throwable ignored){}}
    private void recordOperationOutcomeUnlocked(String changeSetId,String status,String code,String message){if(changeSetId==null||changeSetId.isBlank())return;ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null||!isUnfinished(cs))return;String publicCode="UNEXPECTED".equals(code)?INTERNAL_ERROR:code;setOutcome(cs,status,publicCode,message);cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}
    public void recordOperationOutcome(String changeSetId,String status,String code,String message){if(changeSetId==null||changeSetId.isBlank())return;try(StateStore.Lock ignored=state.lock()){recordOperationOutcomeUnlocked(changeSetId,status,code,message);}}

    private Path repoRoot(Path requested){Path p=requested==null?Path.of("."):requested;GitClient.Result r=git.allow(p,REPOSITORY_MISMATCH,"rev-parse","--show-toplevel");if(r.exitCode()!=0)throw new ObsException(REPOSITORY_MISMATCH,"Not a Git work tree: "+p+"\n--- git details ---\n"+r.failureDetails());if(r.first().isBlank())throw new ObsException(REPOSITORY_MISMATCH,"Not a Git work tree: "+p+". git rev-parse returned no repository root.");return Path.of(r.first()).toAbsolutePath().normalize();}
    private String safeIdentity(Path repo){try{return repositoryIdentity(repo);}catch(Throwable e){return"";}}
    private String repositoryIdentity(Path repo){GitClient.Result r=git.allow(repo,REPOSITORY_MISMATCH,"config","--get","remote.origin.url");if(r.exitCode()!=0)throw new ObsException(REPOSITORY_MISMATCH,"remote.origin.url is missing.\n--- git details ---\n"+r.failureDetails());if(r.first().isBlank())throw new ObsException(REPOSITORY_MISMATCH,"remote.origin.url is missing; git config returned an empty value.");return repositoryIdentityFromUrl(r.first());}
    private String repositoryIdentityFromUrl(String u){Pattern[] ps={Pattern.compile("^https?://github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$",Pattern.CASE_INSENSITIVE),Pattern.compile("^git@github\\.com:([^/]+)/([^/]+?)(?:\\.git)?$",Pattern.CASE_INSENSITIVE),Pattern.compile("^ssh://git@github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$",Pattern.CASE_INSENSITIVE)};for(Pattern p:ps){Matcher m=p.matcher(u);if(m.matches())return"github:"+m.group(1)+"/"+m.group(2);}throw new ObsException(REPOSITORY_MISMATCH,"Unsupported origin for V0.1 repositoryIdentity: "+u);}
    static Path inside(Path repo,String repoPath){
        Path base=repo.toAbsolutePath().normalize(),full=base.resolve(repoPath.replace('/',File.separatorChar)).normalize();
        if(!full.startsWith(base)||full.equals(base))throw new ObsException(PACKAGE_INVALID,"Resolved path escaped repository: "+repoPath);
        try{
            Path realBase=base.toRealPath(),cursor=full;
            while(cursor!=null&&cursor.startsWith(base)){
                if(Files.exists(cursor,LinkOption.NOFOLLOW_LINKS)){
                    if(Files.isSymbolicLink(cursor))throw new ObsException(STATE_DIVERGED,"Repository path traverses symbolic link: "+repoPath);
                    Path real=cursor.toRealPath();
                    if(!real.startsWith(realBase))throw new ObsException(STATE_DIVERGED,"Repository path resolves outside repository root: "+repoPath);
                    break;
                }
                if(cursor.equals(base))break;
                cursor=cursor.getParent();
            }
            return full;
        }catch(ObsException e){throw e;}catch(IOException e){throw new ObsException(STATE_DIVERGED,"Cannot verify repository path confinement for "+repoPath+": "+e.getMessage(),e);}
    }
    private static void validateZipEntry(String n){if(n.indexOf('\\')>=0||n.startsWith("/")||n.matches("^[A-Za-z]:.*")||hasControl(n))throw new ObsException(PACKAGE_INVALID,"Unsafe ZIP entry: "+n);String trimmed=n.endsWith("/")?n.substring(0,n.length()-1):n;if(trimmed.isEmpty())throw new ObsException(PACKAGE_INVALID,"Unsafe ZIP entry: "+n);for(String s:trimmed.split("/",-1))if(s.isEmpty()||s.equals(".")||s.equals(".."))throw new ObsException(PACKAGE_INVALID,"Unsafe ZIP entry: "+n);}
    public static String normalizeRepoPath(String p){if(p==null||p.isBlank())throw new ObsException(PACKAGE_INVALID,"Operation path is empty.");if(p.indexOf('\\')>=0||p.startsWith("/")||p.matches("^[A-Za-z]:.*")||p.endsWith("/")||hasControl(p))throw new ObsException(PACKAGE_INVALID,"Unsafe package path: "+p);Set<String> reserved=Set.of("CON","PRN","AUX","NUL","COM1","COM2","COM3","COM4","COM5","COM6","COM7","COM8","COM9","LPT1","LPT2","LPT3","LPT4","LPT5","LPT6","LPT7","LPT8","LPT9");for(String s:p.split("/",-1)){if(s.isEmpty()||s.equals(".")||s.equals("..")||s.matches(".*[<>:\"|?*].*")||s.endsWith(" ")||s.endsWith("."))throw new ObsException(PACKAGE_INVALID,"Path is not a valid Windows file path: "+p);String stem=s.split("\\.",2)[0].toUpperCase(Locale.ROOT);if(reserved.contains(stem))throw new ObsException(PACKAGE_INVALID,"Reserved Windows path segment: "+s);}return p;}
    private static boolean hasControl(String s){for(int i=0;i<s.length();i++){char c=s.charAt(i);if(c<0x20||c==0x7f)return true;}return false;}
    private static void uuid(String s,String name){try{UUID.fromString(s);}catch(Exception e){throw new ObsException(PACKAGE_INVALID,name+" must be UUID.");}}
    private static String utf8Strict(byte[] b,String name){try{return StandardCharsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT).onUnmappableCharacter(CodingErrorAction.REPORT).decode(ByteBuffer.wrap(b)).toString();}catch(CharacterCodingException e){throw new ObsException(PACKAGE_INVALID,name+" must be valid UTF-8.");}}
    static String sha256(byte[] data){try{MessageDigest d=MessageDigest.getInstance("SHA-256");return HexFormat.of().formatHex(d.digest(data));}catch(NoSuchAlgorithmException e){throw new RuntimeException(e);}}
    static String sha256(Path p){try{MessageDigest d=MessageDigest.getInstance("SHA-256");try(InputStream in=Files.newInputStream(p)){byte[]buf=new byte[8192];for(int n;(n=in.read(buf))>=0;)if(n>0)d.update(buf,0,n);}return HexFormat.of().formatHex(d.digest());}catch(IOException|NoSuchAlgorithmException e){throw new RuntimeException(e);}}
    static byte[] readBytes(Path p){try{return Files.readAllBytes(p);}catch(IOException e){throw new RuntimeException(e);}}
    private static int num(Object x){return x instanceof Number n?n.intValue():Integer.MIN_VALUE;}
    static String str(Object x){return x==null?null:String.valueOf(x);}
    private static boolean same(String a,String b){return a!=null&&b!=null&&a.equalsIgnoreCase(b);}
    private static boolean samePath(Path a,Path b){return a.toAbsolutePath().normalize().equals(b.toAbsolutePath().normalize());}
    private static String changeSetRef(ChangeSet cs){String label=cs.changeSetLabel==null||cs.changeSetLabel.isBlank()?"<unnamed>":cs.changeSetLabel;String status=cs.status==null||cs.status.isBlank()?"<unknown status>":cs.status;return label+" · "+status+" · "+cs.changeSetId;}
    private static String repositoryTargetRef(RepositoryConfig repository){String name=repository.name==null||repository.name.isBlank()?"<unnamed repository>":repository.name;return name+" · "+repository.repositoryIdentity+" · targetId="+repository.id;}
    private static String ownershipConflictMessage(String path,RepositoryConfig repository,ChangeSet owner,ChangeSet applying){return "Path is owned by another unfinished ChangeSet.\nPath: "+path+"\nRepository Target: "+repositoryTargetRef(repository)+"\nOwner ChangeSet: "+changeSetRef(owner)+"\nApplying ChangeSet: "+changeSetRef(applying);}
    private static String dirtyUnownedMessage(String path,RepositoryConfig repository,ChangeSet applying){return "Existing local changes are not owned by any unfinished ChangeSet; Apply cannot adopt them implicitly.\nPath: "+path+"\nRepository Target: "+repositoryTargetRef(repository)+"\nOwnership: Unowned — no unfinished ChangeSet owns this path.\nApplying ChangeSet: "+changeSetRef(applying)+"\nWorking tree: Dirty outside the applying ChangeSet.";}

    private static boolean containsIgnoreCase(Collection<String> c,String s){for(String x:c)if(x.equalsIgnoreCase(s))return true;return false;}
    private static String withCauseDetails(String message,Throwable cause){if(cause==null)return message;String details=throwableDetails(cause);return details.isBlank()?message:message+"\n--- technical details ---\n"+details;}
    private static String throwableDetails(Throwable t){if(t==null)return"";StringWriter out=new StringWriter();t.printStackTrace(new PrintWriter(out));return out.toString().stripTrailing();}
    private static ObsException asObs(Throwable t,String fallback){if(t instanceof ObsException o)return o;return new ObsException(fallback,t.getMessage()==null?t.toString():t.getMessage(),t);}
    private static void deleteTree(Path p){if(p==null||!Files.exists(p))return;try(var s=Files.walk(p)){s.sorted(Comparator.reverseOrder()).forEach(x->{try{Files.deleteIfExists(x);}catch(IOException ignored){}});}catch(IOException ignored){}}
    private record Backup(boolean existed,byte[] bytes){}
}
