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

public final class Core {
    public static final String SUCCESS="SUCCESS", PACKAGE_INVALID="PACKAGE_INVALID", PACKAGE_NOT_FOUND="PACKAGE_NOT_FOUND",
            ACTION_PACKAGE_MISMATCH="ACTION_PACKAGE_MISMATCH", REPOSITORY_MISMATCH="REPOSITORY_MISMATCH",
            PATH_OWNERSHIP_CONFLICT="PATH_OWNERSHIP_CONFLICT", BASE_MISMATCH="BASE_MISMATCH", RESULT_MISMATCH="RESULT_MISMATCH",
            STATE_DIVERGED="STATE_DIVERGED", REVIEW_STALE="REVIEW_STALE", FINALIZE_FAILED="FINALIZE_FAILED",
            SNAPSHOT_EXPORT_FAILED="SNAPSHOT_EXPORT_FAILED", CHAT_BRIDGE_FAILED="CHAT_BRIDGE_FAILED",
            SOURCE_STATE_CHANGED="SOURCE_STATE_CHANGED", SOURCE_STATE_UNVERIFIABLE="SOURCE_STATE_UNVERIFIABLE",
            REPOSITORY_NOT_READY="REPOSITORY_NOT_READY", REPOSITORY_SELECTION_REQUIRED="REPOSITORY_SELECTION_REQUIRED";

    public static final class ObsException extends RuntimeException {
        public final String code;
        public ObsException(String code,String message){super(message);this.code=code;}
        public ObsException(String code,String message,Throwable cause){super(withCauseDetails(message,cause),cause);this.code=code;}
        @Override public String toString(){return "["+code+"] "+getMessage();}
    }

    public record ObsAction(String action,String name,String archive,String packageId,String chatTabTitle,String chatContextToken) {}
    public record Operation(String path,String action) {}
    public record PackageManifest(int schemaVersion,String packageId,String changeSetId,String changeSetLabel,String repositoryIdentity,List<Operation> operations) {}
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
    public record FinalizeResult(String code,String commitSha,String branch,ChangeSet changeSet) {}
    public record SnapshotExportResult(Path zipPath,String snapshotType,String repositoryIdentity,String commitSha,String branch) {}
    public record ChatConversation(String conversationKey,String title,String url,int tabCount,List<Integer> tabIds) {}
    public record ChatBinding(String changeSetId,String conversationKey,String title,String url,String boundAt) {}
    public record ChatTaskInfo(String taskId,String kind,String changeSetId,String reviewAttemptId,String conversationKey,String conversationTitle,String fileName,boolean autoSend,String status,String message,String createdAt,String updatedAt) {}
    public record ApplyTargetResolution(RepositoryConfig target,List<RepositoryConfig> candidates,boolean contextChanged,String reason) {}
    public record ExternalInteraction(String interactionId,String kind,String changeSetId,String source,String destination,String state,String message,String updatedAt,boolean cancellable) {}

    public static final class ChangeSet {
        public int schemaVersion=2;
        public String changeSetId,changeSetLabel,repositoryIdentity,repositoryTargetId,repositoryRoot,status="Active",lastPackageId;
        public final List<String> ownedPaths=new ArrayList<>();
        public String currentReviewAttemptId,currentReviewDiffPath,currentReviewSha256,currentReviewHead;
        public String commitSha,branch,createdAt,updatedAt;
        public String lastOperationStatus,lastOperationCode,lastOperationMessage,lastOperationAt;
        public final List<Map<String,Object>> finalizationHistory=new ArrayList<>();
        Map<String,Object> json(){
            Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",2);m.put("changeSetId",changeSetId);m.put("changeSetLabel",changeSetLabel);m.put("repositoryIdentity",repositoryIdentity);m.put("repositoryTargetId",repositoryTargetId);m.put("repositoryRoot",repositoryRoot);m.put("ownedPaths",new ArrayList<>(ownedPaths));m.put("status",status);m.put("lastPackageId",lastPackageId);
            Map<String,Object> r=new LinkedHashMap<>();r.put("attemptId",currentReviewAttemptId);r.put("diffPath",currentReviewDiffPath);r.put("sha256",currentReviewSha256);r.put("head",currentReviewHead);m.put("currentReview",r);
            m.put("commitSha",commitSha);m.put("branch",branch);m.put("createdAt",createdAt);m.put("updatedAt",updatedAt);
            Map<String,Object> o=new LinkedHashMap<>();o.put("status",lastOperationStatus);o.put("code",lastOperationCode);o.put("message",lastOperationMessage);o.put("timestamp",lastOperationAt);m.put("lastOperationOutcome",o);
            m.put("finalizationHistory",new ArrayList<>(finalizationHistory));return m;
        }
        @SuppressWarnings("unchecked") static ChangeSet from(Map<String,Object> m){
            ChangeSet c=new ChangeSet();c.changeSetId=str(m.get("changeSetId"));c.changeSetLabel=str(m.get("changeSetLabel"));c.repositoryIdentity=str(m.get("repositoryIdentity"));c.repositoryTargetId=str(m.get("repositoryTargetId"));c.repositoryRoot=str(m.get("repositoryRoot"));c.status=str(m.get("status"));if(c.status==null||c.status.isBlank())c.status="Active";c.lastPackageId=str(m.get("lastPackageId"));c.commitSha=str(m.get("commitSha"));c.branch=str(m.get("branch"));c.createdAt=str(m.get("createdAt"));c.updatedAt=str(m.get("updatedAt"));
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

    private final GitClient git=new GitClient(); private final StateStore state; private final ClipboardAccess clipboard; private final ChatBridgeService chatBridge; private Runnable afterMutationHook=()->{}; private java.util.function.Consumer<String> afterRecoveryPathCleanHook=path->{};
    public Core(){this(new StateStore(),new AwtClipboardAccess());}
    Core(StateStore state){this(state,new AwtClipboardAccess());}
    Core(StateStore state,ClipboardAccess clipboard){this.state=state;this.clipboard=Objects.requireNonNull(clipboard);this.chatBridge=new ChatBridgeService(state);}
    ChatBridgeService chatBridgeService(){return chatBridge;}
    void setChatBridgeEventSink(java.util.function.Consumer<ChatBridgeService.ChatEvent> sink){chatBridge.setEventSink(sink);}
    void setAfterMutationHookForTests(Runnable hook){afterMutationHook=hook==null?()->{}:hook;}
    void setAfterRecoveryPathCleanHookForTests(java.util.function.Consumer<String> hook){afterRecoveryPathCleanHook=hook==null?path->{}:hook;}

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
        for(String k:List.of("action","name","archive","packageId"))if(m.get(k)==null||m.get(k).isBlank())throw new ObsException(PACKAGE_INVALID,"Missing OBS-ACTION field: "+k);
        if(!m.get("action").equals("apply-package"))throw new ObsException(PACKAGE_INVALID,"Unsupported OBS-ACTION action: "+m.get("action"));uuid(m.get("packageId"),"OBS-ACTION packageId");if(!Path.of(m.get("archive")).getFileName().toString().equals(m.get("archive"))||m.get("archive").contains("\\")||m.get("archive").contains("/"))throw new ObsException(PACKAGE_INVALID,"OBS-ACTION archive must be a filename hint, not a path.");
        String chatTabTitle=m.get("chatTabTitle");if(chatTabTitle!=null){chatTabTitle=chatTabTitle.trim();if(chatTabTitle.isBlank())throw new ObsException(PACKAGE_INVALID,"OBS-ACTION chatTabTitle must be omitted or non-empty.");if(chatTabTitle.length()>512)throw new ObsException(PACKAGE_INVALID,"OBS-ACTION chatTabTitle is too long.");}
        String chatContextToken=m.get("chatContextToken");if(chatContextToken!=null){chatContextToken=chatContextToken.trim();uuid(chatContextToken,"OBS-ACTION chatContextToken");}
        return new ObsAction(m.get("action"),m.get("name"),m.get("archive"),m.get("packageId"),chatTabTitle,chatContextToken);
    }

    public Path resolveArchiveForAction(ObsAction action,Path explicit){if(explicit!=null)return explicit.toAbsolutePath().normalize();List<Path> c=new ArrayList<>();String home=System.getProperty("user.home");for(Path d:List.of(Path.of(home,"Downloads"),Path.of(".").toAbsolutePath().normalize())){Path p=d.resolve(action.archive());if(Files.isRegularFile(p))c.add(p.toAbsolutePath().normalize());}List<Path> matches=new ArrayList<>();for(Path p:new LinkedHashSet<>(c)){try{if(readPackage(p).manifest.packageId.equals(action.packageId()))matches.add(p);}catch(RuntimeException ignored){}}if(matches.isEmpty())throw new ObsException(PACKAGE_NOT_FOUND,"No candidate archive matched packageId "+action.packageId());if(matches.size()>1)throw new ObsException(PACKAGE_INVALID,"More than one candidate archive matched packageId; select ZIP explicitly.");return matches.get(0);}

    public PackageData readPackage(Path archive){
        if(archive==null||!Files.isRegularFile(archive))throw new ObsException(PACKAGE_NOT_FOUND,"Archive not found: "+archive);Map<String,byte[]> files=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);Map<String,String> canonical=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        try(ZipFile zip=new ZipFile(archive.toFile(),StandardCharsets.UTF_8)){
            Enumeration<? extends ZipEntry> en=zip.entries();while(en.hasMoreElements()){ZipEntry e=en.nextElement();String n=e.getName();if(n==null||n.isBlank())continue;validateZipEntry(n);String prior=canonical.putIfAbsent(n,n);if(prior!=null)throw new ObsException(PACKAGE_INVALID,"Colliding ZIP entry: "+n);if(!e.isDirectory()){try(InputStream in=zip.getInputStream(e)){files.put(n,in.readAllBytes());}}}
        }catch(ObsException e){throw e;}catch(IOException e){throw new ObsException(PACKAGE_INVALID,"Cannot open ZIP: "+e.getMessage(),e);}
        byte[] manifestBytes=files.get("PACKAGE.json");if(manifestBytes==null||!canonical.getOrDefault("PACKAGE.json","").equals("PACKAGE.json"))throw new ObsException(PACKAGE_INVALID,"PACKAGE.json missing at ZIP root or wrong case.");String text=utf8Strict(manifestBytes,"PACKAGE.json");Map<String,Object> m;try{m=Json.object(text);}catch(RuntimeException e){throw new ObsException(PACKAGE_INVALID,"PACKAGE.json parse failed: "+e.getMessage());}
        if(num(m.get("schemaVersion"))!=1)throw new ObsException(PACKAGE_INVALID,"Unsupported schemaVersion: "+m.get("schemaVersion"));String packageId=str(m.get("packageId")),changeSetId=str(m.get("changeSetId")),label=str(m.get("changeSetLabel")),repoId=str(m.get("repositoryIdentity"));uuid(packageId,"packageId");uuid(changeSetId,"changeSetId");if(label==null||label.isBlank())throw new ObsException(PACKAGE_INVALID,"changeSetLabel is required.");if(repoId==null||!repoId.matches("^github:[^/\\s]+/[^/\\s]+$"))throw new ObsException(PACKAGE_INVALID,"repositoryIdentity must be github:<owner>/<repo>.");
        Object ovs=m.get("operations");if(!(ovs instanceof List<?> ol))throw new ObsException(PACKAGE_INVALID,"operations[] is required.");List<Operation> ops=new ArrayList<>();Set<String> seen=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);Set<String> expected=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);expected.add("PACKAGE.json");Map<String,byte[]> base=new TreeMap<>(String.CASE_INSENSITIVE_ORDER),repl=new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for(Object x:ol){if(!(x instanceof Map<?,?> raw))throw new ObsException(PACKAGE_INVALID,"Operation must be an object.");String path=normalizeRepoPath(str(raw.get("path"))),action=str(raw.get("action"));if(!List.of("add","replace","delete").contains(action))throw new ObsException(PACKAGE_INVALID,"Unsupported action '"+action+"' for "+path);if(!seen.add(path))throw new ObsException(PACKAGE_INVALID,"Duplicate/colliding operation path: "+path);String b="base-files/"+path,r="replacement-files/"+path;switch(action){case"add"->{if(files.containsKey(b)||!files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid add payload set: "+path);expected.add(r);repl.put(path,files.get(r));}case"replace"->{if(!files.containsKey(b)||!files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid replace payload set: "+path);expected.add(b);expected.add(r);base.put(path,files.get(b));repl.put(path,files.get(r));}case"delete"->{if(!files.containsKey(b)||files.containsKey(r))throw new ObsException(PACKAGE_INVALID,"Invalid delete payload set: "+path);expected.add(b);base.put(path,files.get(b));}}ops.add(new Operation(path,action));}
        for(String n:files.keySet())if(!expected.contains(n))throw new ObsException(PACKAGE_INVALID,"Undeclared ZIP payload file: "+n);
        return new PackageData(archive.toAbsolutePath().normalize(),sha256(archive),new PackageManifest(1,packageId,changeSetId,label,repoId,List.copyOf(ops)),base,repl);
    }

    public ApplyTargetResolution resolveApplyTarget(String actionText,Path archive,String currentRepositoryId){
        ObsAction action=actionText==null||actionText.isBlank()?null:parseAction(actionText);Path p=action==null?archive:resolveArchiveForAction(action,archive);PackageData pkg=readPackage(p);if(action!=null&&!pkg.manifest.packageId.equals(action.packageId()))throw new ObsException(ACTION_PACKAGE_MISMATCH,"OBS-ACTION packageId does not match PACKAGE.json.");
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
        ObsAction action=actionText==null||actionText.isBlank()?null:parseAction(actionText);
        Path selected=action==null?archive:resolveArchiveForAction(action,archive);
        PackageData pkg=readPackage(selected);
        if(action!=null&&!pkg.manifest.packageId.equals(action.packageId()))throw new ObsException(ACTION_PACKAGE_MISMATCH,"OBS-ACTION packageId does not match PACKAGE.json.");
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
    }

    public AuthorizedApply authorizeApply(PreparedApply prepared,String repositoryTargetId,ReviewChatBindingDecision decision){
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
    }

    public ApplyResult executeApply(AuthorizedApply authorized){
        if(authorized==null||authorized.prepared()==null)throw new ObsException(STATE_DIVERGED,"Authorized Apply is required.");
        PreparedApply prepared=authorized.prepared();revalidatePreparedApply(authorized);
        RepositoryConfig target=null;for(RepositoryConfig r:ensureSettings().repositories)if(Objects.equals(r.id(),authorized.repositoryTargetId())){target=r;break;}
        if(target==null)throw new ObsException(REPOSITORY_MISMATCH,"Prepared Repository Target is no longer registered; prepare the operation again.");
        String contextToken=prepared.action()==null?null:prepared.action().chatContextToken();String changeSetId=prepared.packageData().manifest.changeSetId,packageId=prepared.packageData().manifest.packageId;
        if(contextToken!=null)chatBridge.requestContextLookup(contextToken,changeSetId,packageId);
        return applyInternal(prepared.packageData(),Path.of(target.path()),prepared.action(),authorized.reviewChatDecision(),prepared.reviewChatPlan());
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
            ChangeSet prior=state.getChangeSet(pkg.manifest.changeSetId);boolean priorExists=prior!=null;byte[] priorState=priorExists?readBytes(state.changeSetPath(pkg.manifest.changeSetId)):null;cs=priorExists?prior:new ChangeSet();if(priorExists){if(!"Active".equals(cs.status))throw new ObsException(STATE_DIVERGED,"ChangeSet is not Active: "+cs.status);RepositoryConfig owner=repositoryForChangeSet(cs,false);if(!Objects.equals(owner.id,allowed.id)||!same(cs.repositoryIdentity,repoIdentity))throw new ObsException(STATE_DIVERGED,"Existing ChangeSet repository identity/target differs from package/apply target.");if(!Objects.equals(cs.changeSetLabel,pkg.manifest.changeSetLabel))labelDiagnostic="Package changeSetLabel '"+pkg.manifest.changeSetLabel+"' differs from persisted label '"+cs.changeSetLabel+"'; persisted label retained.";}else{cs.changeSetId=pkg.manifest.changeSetId;cs.changeSetLabel=pkg.manifest.changeSetLabel;cs.repositoryIdentity=repoIdentity;cs.repositoryTargetId=allowed.id;cs.repositoryRoot=repo.toString();cs.createdAt=now;cs.updatedAt=now;}
            cs.repositoryTargetId=allowed.id;cs.repositoryRoot=repo.toString();
            Set<String> owned=new TreeSet<>(String.CASE_INSENSITIVE_ORDER);owned.addAll(cs.ownedPaths);for(ChangeSet other:state.activeChangeSets())if(!other.changeSetId.equals(cs.changeSetId)&&belongsTo(other,allowed))for(String p:other.ownedPaths)for(Operation op:pkg.manifest.operations)if(p.equalsIgnoreCase(op.path))throw new ObsException(PATH_OWNERSHIP_CONFLICT,ownershipConflictMessage(op.path,allowed,other,cs));
            for(Operation op:pkg.manifest.operations)if(!containsIgnoreCase(owned,op.path)&&pathDirty(repo,op.path))throw new ObsException(STATE_DIVERGED,dirtyUnownedMessage(op.path,allowed,cs));
            Map<String,Backup> backups=new LinkedHashMap<>();for(Operation op:pkg.manifest.operations){Path target=inside(repo,op.path);boolean exists=Files.isRegularFile(target);byte[] before=exists?readBytes(target):null;backups.put(op.path,new Backup(exists,before));switch(op.action){case"add"->{if(Files.exists(target))throw new ObsException(BASE_MISMATCH,"Add target already exists: "+op.path);}case"replace","delete"->{if(!exists)throw new ObsException(SOURCE_STATE_CHANGED,"Expected source path is missing: "+op.path);requireExpectedSource(repo,op.path,pkg.base.get(op.path),before);}}}
            Path successAttemptPath=state.attemptPath(attemptId);try{
                for(Operation op:pkg.manifest.operations){Path target=inside(repo,op.path);if(op.action.equals("delete")){Files.delete(target);}else{Files.createDirectories(target.getParent());Files.write(target,pkg.replacement.get(op.path),StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);}}
                for(Operation op:pkg.manifest.operations){Path target=inside(repo,op.path);if(op.action.equals("delete")){if(Files.exists(target))throw new ObsException(RESULT_MISMATCH,"Delete result still exists: "+op.path);}else if(!Files.isRegularFile(target)||!Arrays.equals(readBytes(target),pkg.replacement.get(op.path)))throw new ObsException(RESULT_MISMATCH,"Result bytes mismatch: "+op.path);}
                afterMutationHook.run();for(Operation op:pkg.manifest.operations)owned.add(op.path);cs.ownedPaths.clear();cs.ownedPaths.addAll(owned);cs.lastPackageId=pkg.manifest.packageId;cs.updatedAt=Instant.now().toString();review=newReviewDiff(cs,attemptId);cs.currentReviewAttemptId=review.attemptId;cs.currentReviewDiffPath=review.diffPath.toString();cs.currentReviewSha256=review.sha256;cs.currentReviewHead=review.head;setOutcome(cs,"SUCCESS",SUCCESS,"Apply succeeded");state.saveChangeSet(cs);
                success=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repoIdentity,repo,pkg,SUCCESS,SUCCESS,"Package applied and cumulative ReviewDiff generated."+(labelDiagnostic.isBlank()?"":" "+labelDiagnostic),review);state.saveAttempt(success);
            }catch(Throwable t){boolean ok=true;for(Map.Entry<String,Backup> e:backups.entrySet()){try{Path target=inside(repo,e.getKey());Backup b=e.getValue();if(!b.existed){Files.deleteIfExists(target);}else{Files.createDirectories(target.getParent());Files.write(target,b.bytes,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);}}catch(Throwable x){ok=false;}}for(Map.Entry<String,Backup> e:backups.entrySet()){try{Path target=inside(repo,e.getKey());Backup b=e.getValue();if(b.existed!=Files.isRegularFile(target)||(b.existed&&!Arrays.equals(b.bytes,readBytes(target))))ok=false;}catch(Throwable x){ok=false;}}
                try{if(priorExists)Files.write(state.changeSetPath(pkg.manifest.changeSetId),priorState,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);else Files.deleteIfExists(state.changeSetPath(pkg.manifest.changeSetId));Files.deleteIfExists(successAttemptPath);if(review!=null)Files.deleteIfExists(review.diffPath);}catch(Throwable x){ok=false;}if(!ok)throw new ObsException(STATE_DIVERGED,"Apply failed and target/ledger rollback could not be verified.",t);throw asObs(t,RESULT_MISMATCH);
            }
            Handoff h;try{h=publishReviewDiff(cs,review);}catch(Throwable t){h=new Handoff(null,"ReviewDiff handoff failed: "+t.getMessage());}success.serviceReviewDiffPath=h.servicePath;success.handoffWarning=h.warning;
            boolean queueReview=true;
            if(action!=null&&action.chatContextToken()!=null){
                ChatBridgeService.ContextBindingResult contextResult=chatBridge.bindContextAtReviewCutoff(action.chatContextToken(),cs,review);
                queueReview=contextResult.bound();
                if(!contextResult.bound()&&contextResult.message()!=null&&!contextResult.message().isBlank())success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" "+contextResult.message()).trim();
            }else{
                if(reviewChatDecision==ReviewChatBindingDecision.USE_HINT&&reviewChatPlan!=null&&reviewChatPlan.requestedConversation()!=null)try{chatBridge.bind(cs.changeSetId,reviewChatPlan.requestedConversation().conversationKey());}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" ChatGPT rebind warning: "+(t.getMessage()==null?t.toString():t.getMessage())).trim();}
            }
            if(queueReview)try{chatBridge.enqueueReviewIfBound(cs,review);}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" ChatGPT delivery queue warning: "+(t.getMessage()==null?t.toString():t.getMessage())).trim();}
            try{state.saveAttempt(success);}catch(Throwable t){success.handoffWarning=((success.handoffWarning==null?"":success.handoffWarning)+" Attempt handoff metadata update failed.").trim();}return new ApplyResult(SUCCESS,success,cs,review,labelDiagnostic);
        }catch(ObsException e){if(success==null)suspendContextLookupAfterFailedApply(action,pkg,e.getMessage());if(pkg!=null){try{ApplicationAttempt failed=attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repo==null?"":safeIdentity(repo),repo,pkg,"FAILED",e.code,e.getMessage(),null);state.saveAttempt(failed);recordOperationOutcomeUnlocked(pkg.manifest.changeSetId,"FAILED",e.code,semanticSummary(e.getMessage()));}catch(Throwable ignored){}}throw e;}catch(Throwable e){ObsException oe=asObs(e,STATE_DIVERGED);if(success==null)suspendContextLookupAfterFailedApply(action,pkg,oe.getMessage());if(pkg!=null){try{state.saveAttempt(attempt(attemptId,now,action==null?pkg.archivePath.getFileName().toString():action.name,repo==null?"":safeIdentity(repo),repo,pkg,"FAILED",oe.code,oe.getMessage(),null));}catch(Throwable ignored){}}throw oe;}finally{stateLock.close();}
    }

    private void suspendContextLookupAfterFailedApply(ObsAction action,PackageData pkg,String message){if(action==null||action.chatContextToken()==null||pkg==null)return;try{chatBridge.markContextLookupApplyFailed(action.chatContextToken(),pkg.manifest.changeSetId,pkg.manifest.packageId,message);}catch(Throwable ignored){}}

    private ApplicationAttempt attempt(String id,String now,String name,String repoId,Path repo,PackageData pkg,String result,String code,String msg,ReviewDiff review){ApplicationAttempt a=new ApplicationAttempt();a.attemptId=id;a.timestamp=now;a.name=name;a.repositoryIdentity=repoId;a.repositoryRoot=repo==null?null:repo.toString();a.archivePath=pkg.archivePath.toString();a.archiveSha256=pkg.archiveSha256;a.packageId=pkg.manifest.packageId;a.changeSetId=pkg.manifest.changeSetId;a.result=result;a.code=code;a.message=msg;if(review!=null){a.reviewDiffPath=review.diffPath.toString();a.reviewDiffSha256=review.sha256;}a.handoffWarning="";return a;}

    public ReviewDiff refreshReview(String changeSetId){try(StateStore.Lock ignored=state.lock()){ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null)throw new ObsException(STATE_DIVERGED,"Unknown ChangeSet: "+changeSetId);ReviewDiff r=newReviewDiff(cs);cs.currentReviewAttemptId=r.attemptId;cs.currentReviewDiffPath=r.diffPath.toString();cs.currentReviewSha256=r.sha256;cs.currentReviewHead=r.head;cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);try{chatBridge.enqueueReviewIfBound(cs,r);}catch(Throwable ignoredBridge){}return r;}}

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
    private static String semanticSummary(String message){if(message==null)return"";int p=message.indexOf("\n---");return (p>=0?message.substring(0,p):message).strip();}
    private static void setOutcome(ChangeSet cs,String status,String code,String message){if(cs==null)return;cs.lastOperationStatus=status;cs.lastOperationCode=code;cs.lastOperationMessage=semanticSummary(message);cs.lastOperationAt=Instant.now().toString();}
    private void recordFailureOutcome(String changeSetId,Throwable failure){String code=failure instanceof ObsException oe?oe.code:STATE_DIVERGED;try{recordOperationOutcome(changeSetId,"FAILED",code,semanticSummary(failure.getMessage()==null?failure.toString():failure.getMessage()));}catch(Throwable ignored){}}
    private void recordOperationOutcomeUnlocked(String changeSetId,String status,String code,String message){if(changeSetId==null||changeSetId.isBlank())return;ChangeSet cs=state.getChangeSet(changeSetId);if(cs==null||!isUnfinished(cs))return;setOutcome(cs,status,code,message);cs.updatedAt=Instant.now().toString();state.saveChangeSet(cs);}
    public void recordOperationOutcome(String changeSetId,String status,String code,String message){if(changeSetId==null||changeSetId.isBlank())return;try(StateStore.Lock ignored=state.lock()){recordOperationOutcomeUnlocked(changeSetId,status,code,message);}}

    private Path repoRoot(Path requested){Path p=requested==null?Path.of("."):requested;GitClient.Result r=git.allow(p,REPOSITORY_MISMATCH,"rev-parse","--show-toplevel");if(r.exitCode()!=0)throw new ObsException(REPOSITORY_MISMATCH,"Not a Git work tree: "+p+"\n--- git details ---\n"+r.failureDetails());if(r.first().isBlank())throw new ObsException(REPOSITORY_MISMATCH,"Not a Git work tree: "+p+". git rev-parse returned no repository root.");return Path.of(r.first()).toAbsolutePath().normalize();}
    private String safeIdentity(Path repo){try{return repositoryIdentity(repo);}catch(Throwable e){return"";}}
    private String repositoryIdentity(Path repo){GitClient.Result r=git.allow(repo,REPOSITORY_MISMATCH,"config","--get","remote.origin.url");if(r.exitCode()!=0)throw new ObsException(REPOSITORY_MISMATCH,"remote.origin.url is missing.\n--- git details ---\n"+r.failureDetails());if(r.first().isBlank())throw new ObsException(REPOSITORY_MISMATCH,"remote.origin.url is missing; git config returned an empty value.");String u=r.first();Pattern[] ps={Pattern.compile("^https?://github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$",Pattern.CASE_INSENSITIVE),Pattern.compile("^git@github\\.com:([^/]+)/([^/]+?)(?:\\.git)?$",Pattern.CASE_INSENSITIVE),Pattern.compile("^ssh://git@github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$",Pattern.CASE_INSENSITIVE)};for(Pattern p:ps){Matcher m=p.matcher(u);if(m.matches())return"github:"+m.group(1)+"/"+m.group(2);}throw new ObsException(REPOSITORY_MISMATCH,"Unsupported origin for V0.1 repositoryIdentity: "+u);}
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
