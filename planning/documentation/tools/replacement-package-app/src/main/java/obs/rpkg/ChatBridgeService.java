package obs.rpkg;

import java.io.*;
import java.nio.file.*;
import java.security.SecureRandom;
import java.time.*;
import java.util.*;
import java.util.function.Consumer;
import java.util.zip.ZipFile;

final class ChatBridgeService {
    static final int PORT=17831;
    static final int BRIDGE_PROTOCOL_VERSION=2;
    private static final long CLAIM_SECONDS=180;
    private static final long SEND_UNKNOWN_SECONDS=600;
    private static final Set<String> TERMINAL=Set.of("Sent","Attached","UnknownAfterSend","FailedBeforeSend","PreparedUnsent","NoChanges","Cancelled");
    private static final Set<String> ACTIONABLE=Set.of("Pending","Claimed","Preparing","SendClicked");
    private final StateStore state;
    private final SecureRandom random=new SecureRandom();
    private final LinkedHashMap<String,Core.ChatConversation> conversations=new LinkedHashMap<>();
    private Consumer<ChatEvent> eventSink=e->{};

    record ChatEvent(String taskId,String kind,String changeSetId,String reviewAttemptId,String status,String message){
        String display(){return "ChatGPT "+shortId(taskId)+" · "+status+(message==null||message.isBlank()?"":" · "+message);}
    }
    record PayloadSource(Path path,long size,String sha256,String contentType,String fileName) {}

    ChatBridgeService(StateStore state){this.state=Objects.requireNonNull(state);}
    synchronized void setEventSink(Consumer<ChatEvent> sink){eventSink=sink==null?e->{}:sink;}

    synchronized String pairingToken(){
        Path p=state.root.resolve("chat-bridge.json");
        if(Files.isRegularFile(p)){
            Map<String,Object> m=state.readObject(p);String token=Core.str(m.get("pairingToken"));
            if(token!=null&&token.matches("[0-9a-f]{64}"))return token;
        }
        String token=randomHex(32);Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("pairingToken",token);m.put("port",PORT);m.put("createdAt",Instant.now().toString());state.writeJson(p,m);return token;
    }

    synchronized void replaceInventory(List<Map<String,Object>> raw){
        LinkedHashMap<String,Core.ChatConversation> next=new LinkedHashMap<>();
        for(Map<String,Object> m:raw){
            String key=required(m,"conversationKey"),title=required(m,"title"),url=required(m,"url");
            if(!key.matches("[A-Za-z0-9_-]{8,}"))throw fail("Invalid ChatGPT conversation key.");
            if(!url.equals("https://chatgpt.com/c/"+key))throw fail("Only ordinary chatgpt.com/c/... conversations are supported in V1.");
            LinkedHashSet<Integer> uniqueTabs=new LinkedHashSet<>();Object tabs=m.get("tabIds");if(tabs instanceof List<?> l)for(Object x:l)if(x instanceof Number n&&n.intValue()>=0)uniqueTabs.add(n.intValue());
            if(uniqueTabs.isEmpty())continue;
            List<Integer> tabIds=List.copyOf(uniqueTabs);next.put(key,new Core.ChatConversation(key,title,url,tabIds.size(),tabIds));
        }
        conversations.clear();conversations.putAll(next);expireClaimsAgainstInventory();
    }

    synchronized List<Core.ChatConversation> openConversations(){return List.copyOf(conversations.values());}

    synchronized Core.ChatBinding binding(String changeSetId){
        Path p=bindingPath(changeSetId);if(!Files.isRegularFile(p))return null;
        Map<String,Object> m=state.readObject(p);return new Core.ChatBinding(changeSetId,Core.str(m.get("conversationKey")),Core.str(m.get("title")),Core.str(m.get("url")),Core.str(m.get("boundAt")));
    }

    synchronized void assertRebindSafe(String changeSetId,String conversationKey){
        expireClaims();
        if(!conversations.containsKey(conversationKey))throw fail("Requested ChatGPT conversation is not currently open.");
        Core.ChatBinding prior=binding(changeSetId);
        if(prior==null||!Objects.equals(prior.conversationKey(),conversationKey))requireNoUnsafeInFlight(changeSetId,"Cannot change Review chat while ChatGPT composer preparation or Send is in progress.");
    }

    synchronized Core.ChatBinding bind(String changeSetId,String conversationKey){
        assertRebindSafe(changeSetId,conversationKey);
        Core.ChatConversation c=conversations.get(conversationKey);
        Core.ChatBinding prior=binding(changeSetId);
        if(prior==null||!Objects.equals(prior.conversationKey(),conversationKey))cancelSafelyCancellableReviewTasks(changeSetId,"Cancelled because Review chat was changed.");
        String now=Instant.now().toString();Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",1);m.put("changeSetId",changeSetId);m.put("conversationKey",c.conversationKey());m.put("title",c.title());m.put("url",c.url());m.put("boundAt",now);state.writeJson(bindingPath(changeSetId),m);return new Core.ChatBinding(changeSetId,c.conversationKey(),c.title(),c.url(),now);
    }

    synchronized void unbind(String changeSetId){
        expireClaims();
        requireNoUnsafeInFlight(changeSetId,"Cannot unbind Review chat while ChatGPT composer preparation or Send is in progress.");
        cancelSafelyCancellableReviewTasks(changeSetId,"Cancelled because Review chat was unbound.");
        try{Files.deleteIfExists(bindingPath(changeSetId));}catch(IOException e){throw fail("Cannot remove ChatGPT binding: "+e.getMessage(),e);}
    }

    synchronized Core.ChatTaskInfo enqueueReviewIfBound(Core.ChangeSet cs,Core.ReviewDiff review){Core.ChatBinding b=binding(cs.changeSetId);return b==null?null:enqueueReview(cs,review,b,false);}
    synchronized Core.ChatTaskInfo enqueueReview(Core.ChangeSet cs,Core.ReviewDiff review,Core.ChatBinding b,boolean manual){
        Path artifact=review.diffPath().toAbsolutePath().normalize();if(!Files.isRegularFile(artifact,LinkOption.NOFOLLOW_LINKS))throw fail("Current ReviewDiff file is unavailable for ChatGPT delivery.");
        long size=size(artifact);String sha=Core.sha256(artifact);if(review.sha256()==null||!sha.equalsIgnoreCase(review.sha256()))throw fail("Current ReviewDiff bytes changed before ChatGPT delivery was queued.");
        Task equivalent=equivalentActionableTask("reviewDiff",cs.changeSetId,review.attemptId(),b.conversationKey(),sha);if(equivalent!=null)return info(equivalent);
        if(!manual){
            for(Task existing:listTasks())if("reviewDiff".equals(existing.kind)&&Objects.equals(existing.changeSetId,cs.changeSetId)&&Objects.equals(existing.reviewAttemptId,review.attemptId())&&existing.autoGenerated)return info(existing);
            supersedeOlderAutoReviewTasks(cs.changeSetId,review.attemptId());
        }
        Task t=new Task();t.taskId=UUID.randomUUID().toString();t.kind="reviewDiff";t.changeSetId=cs.changeSetId;t.reviewAttemptId=review.attemptId();t.conversationKey=b.conversationKey();t.conversationTitle=b.title();t.artifactPath=artifact.toString();t.artifactSha256=sha;t.artifactSize=size;t.fileName=safeFileName(cs.changeSetLabel,"review")+"-review-"+shortId(t.taskId)+".diff";t.autoSend=true;t.autoGenerated=!manual;t.sendRetryIntervalSeconds=state.getSettings().reviewDiffSendRetrySeconds();t.status=size==0?"NoChanges":"Pending";t.message=size==0?"Current ReviewDiff is empty; no ChatGPT message was queued.":null;t.createdAt=t.updatedAt=Instant.now().toString();save(t);return info(t);
    }

    synchronized Core.ChatTaskInfo enqueueSnapshot(Path zip,String conversationKey){
        Core.ChatConversation c=conversations.get(conversationKey);if(c==null)throw fail("Selected ChatGPT conversation is not currently open.");
        Path p=zip==null?null:zip.toAbsolutePath().normalize();verifySnapshotZip(p);long size=size(p);String sha=Core.sha256(p);
        Task equivalent=equivalentActionableTask("snapshot",null,null,c.conversationKey(),sha);if(equivalent!=null)return info(equivalent);
        Task t=new Task();t.taskId=UUID.randomUUID().toString();t.kind="snapshot";t.conversationKey=c.conversationKey();t.conversationTitle=c.title();t.artifactPath=p.toString();t.artifactSha256=sha;t.artifactSize=size;t.fileName=p.getFileName().toString();t.autoSend=false;t.autoGenerated=false;t.status="Pending";t.createdAt=t.updatedAt=Instant.now().toString();save(t);return info(t);
    }

    synchronized String deliveryStatus(String changeSetId,String currentReviewAttemptId){
        expireClaims();
        Core.ChatBinding b=binding(changeSetId);if(b==null)return "Not connected";
        Task latest=null;for(Task t:listTasks())if("reviewDiff".equals(t.kind)&&Objects.equals(t.changeSetId,changeSetId)&&(currentReviewAttemptId==null||Objects.equals(t.reviewAttemptId,currentReviewAttemptId)))if(latest==null||safe(t.createdAt).compareTo(safe(latest.createdAt))>0)latest=t;
        if(latest==null)return "Bound · "+b.title();return latest.status+" · "+b.title();
    }

    synchronized Map<String,Object> claim(String conversationKey,int tabId){
        expireClaims();requireTabInConversation(conversationKey,tabId);
        for(Task t:listTasks())if(Objects.equals(t.conversationKey,conversationKey)&&Set.of("Claimed","Preparing","SendClicked").contains(t.status)){
            if("Claimed".equals(t.status)&&Objects.equals(t.claimedTabId,tabId)){t.leaseUntil=Instant.now().plusSeconds(CLAIM_SECONDS).toString();t.ticketExpiresAt=t.leaseUntil;t.updatedAt=Instant.now().toString();save(t);return claimResponse(t);}
            return Map.of();
        }
        Task chosen=null;for(Task t:listTasks())if("Pending".equals(t.status)&&Objects.equals(t.conversationKey,conversationKey)){if(chosen==null||safe(t.createdAt).compareTo(safe(chosen.createdAt))<0)chosen=t;}
        if(chosen==null)return Map.of();
        chosen.status="Claimed";chosen.claimedTabId=tabId;chosen.leaseUntil=Instant.now().plusSeconds(CLAIM_SECONDS).toString();chosen.payloadTicket=randomHex(24);chosen.ticketExpiresAt=chosen.leaseUntil;chosen.updatedAt=Instant.now().toString();save(chosen);return claimResponse(chosen);
    }

    synchronized String heartbeat(String taskId,int tabId,String conversationKey){
        expireClaims();Task t=requireTask(taskId);if(TERMINAL.contains(t.status))return t.status;
        if(!Objects.equals(t.conversationKey,conversationKey)||!Objects.equals(t.claimedTabId,tabId)||!tabBelongs(t.conversationKey,tabId))throw fail("Claimed ChatGPT tab is no longer on the task conversation.");
        if(Set.of("Claimed","Preparing").contains(t.status)){t.leaseUntil=Instant.now().plusSeconds(CLAIM_SECONDS).toString();if("Claimed".equals(t.status))t.ticketExpiresAt=t.leaseUntil;t.updatedAt=Instant.now().toString();save(t);}return t.status;
    }

    synchronized String release(String taskId,int tabId,String conversationKey,String message){
        Task t=requireTask(taskId);if(TERMINAL.contains(t.status))return t.status;if(!Objects.equals(t.claimedTabId,tabId))throw fail("ChatGPT task belongs to another tab.");
        if(conversationKey!=null&&!conversationKey.isBlank()&&!Objects.equals(t.conversationKey,conversationKey)&&"Claimed".equals(t.status)){/* navigation is a valid pre-send release */}
        if("Claimed".equals(t.status)){toPending(t,message==null?"Claim released before composer preparation.":message);return t.status;}
        if("Preparing".equals(t.status)){terminal(t,"PreparedUnsent",message==null?"ChatGPT composer preparation was interrupted before SendClicked; inspect the unsent draft before retrying.":message);return t.status;}
        if("SendClicked".equals(t.status)){terminal(t,"UnknownAfterSend",message==null?"Claim was lost after SendClicked.":message);return t.status;}
        throw fail("Task cannot be released from state "+t.status+".");
    }

    synchronized void releaseTab(int tabId,String message){
        for(Task t:listTasks())if(Objects.equals(t.claimedTabId,tabId)){if("Claimed".equals(t.status))toPending(t,message);else if("Preparing".equals(t.status))terminal(t,"PreparedUnsent",message);else if("SendClicked".equals(t.status))terminal(t,"UnknownAfterSend",message);}
    }

    synchronized PayloadSource verifiedPayloadSource(String taskId,String ticket){
        Task t=requireTask(taskId);if(ticket==null||!Objects.equals(ticket,t.payloadTicket))throw fail("Invalid or expired artifact ticket.");if(expired(t.ticketExpiresAt))throw fail("Artifact ticket expired.");if(!List.of("Claimed","Preparing").contains(t.status))throw fail("Artifact is not claimable in state "+t.status+".");
        Path p=Path.of(t.artifactPath).toAbsolutePath().normalize();if(!Files.isRegularFile(p,LinkOption.NOFOLLOW_LINKS))throw fail("Queued artifact is unavailable.");long actualSize=size(p);String actualSha=Core.sha256(p);if(actualSize!=t.artifactSize||!actualSha.equalsIgnoreCase(t.artifactSha256))throw fail("Queued artifact bytes changed after the task was created.");
        return new PayloadSource(p,actualSize,actualSha,"snapshot".equals(t.kind)?"application/zip":"text/x-diff; charset=utf-8",t.fileName);
    }

    synchronized byte[] payload(String taskId,String ticket){PayloadSource s=verifiedPayloadSource(taskId,ticket);try{return Files.readAllBytes(s.path());}catch(IOException e){throw fail("Cannot read queued artifact: "+e.getMessage(),e);}}

    synchronized void stagePreparing(String taskId,int tabId,String conversationKey){
        expireClaims();Task t=requireClaim(taskId,tabId,conversationKey);t.status="Preparing";t.updatedAt=Instant.now().toString();t.leaseUntil=Instant.now().plusSeconds(CLAIM_SECONDS).toString();t.payloadTicket=null;t.ticketExpiresAt=null;save(t);
    }

    synchronized void stageSendClicked(String taskId,int tabId,String conversationKey){
        expireClaims();Task t=requirePreparing(taskId,tabId,conversationKey);if(!"reviewDiff".equals(t.kind)||!t.autoSend)throw fail("Send is not allowed for this task.");t.status="SendClicked";t.updatedAt=Instant.now().toString();t.leaseUntil=Instant.now().plusSeconds(SEND_UNKNOWN_SECONDS).toString();save(t);
    }

    synchronized void result(String taskId,int tabId,String conversationKey,String status,String message){
        expireClaims();Task t=requireTask(taskId);if(TERMINAL.contains(t.status))throw fail("ChatGPT task is already terminal in state "+t.status+".");if(!Objects.equals(t.claimedTabId,tabId))throw fail("ChatGPT task belongs to another tab.");if(!Objects.equals(t.conversationKey,conversationKey)||!tabBelongs(t.conversationKey,tabId))throw fail("ChatGPT task result came from the wrong conversation.");
        if("snapshot".equals(t.kind)){
            boolean ok=("Claimed".equals(t.status)&&Set.of("FailedBeforeSend","PreparedUnsent").contains(status))||("Preparing".equals(t.status)&&Set.of("Attached","PreparedUnsent").contains(status));if(!ok)throw fail("Invalid snapshot task transition "+t.status+" → "+status+".");
        }else if("reviewDiff".equals(t.kind)){
            boolean ok=("Claimed".equals(t.status)&&Set.of("FailedBeforeSend","PreparedUnsent").contains(status))||("Preparing".equals(t.status)&&Set.of("PreparedUnsent","UnknownAfterSend").contains(status))||("SendClicked".equals(t.status)&&Set.of("Sent","UnknownAfterSend").contains(status));if(!ok)throw fail("Invalid ReviewDiff task transition "+t.status+" → "+status+".");
        }else throw fail("Unsupported ChatGPT task kind.");
        terminal(t,status,message);
    }

    synchronized Core.ChatTaskInfo taskInfo(String taskId){Task t=load(taskId);return t==null?null:info(t);}

    synchronized List<Core.ExternalInteraction> externalInteractions(){
        expireClaims();List<Core.ExternalInteraction> out=new ArrayList<>();
        for(Task t:listTasks())if(!TERMINAL.contains(t.status)||"UnknownAfterSend".equals(t.status))out.add(interaction(t));
        out.sort(Comparator.comparing(Core.ExternalInteraction::updatedAt,Comparator.nullsFirst(Comparator.naturalOrder())).reversed());return List.copyOf(out);
    }

    synchronized Core.ExternalInteraction cancelExternalInteraction(String taskId){
        expireClaims();Task t=requireTask(taskId);
        if(Set.of("Pending","Claimed").contains(t.status)){terminal(t,"Cancelled","Cancelled before external preparation; no further automation.");return interaction(t);}
        if("Preparing".equals(t.status)){terminal(t,"Cancelled","Cancelled — prepared content retained; no further automation or Send.");return interaction(t);}
        if("SendClicked".equals(t.status))throw fail("Send may already have happened; cancellation cannot rewrite this interaction as Cancelled.");
        throw fail("Interaction is already terminal in state "+t.status+".");
    }

    private Core.ExternalInteraction interaction(Task t){String kind="reviewDiff".equals(t.kind)?"Deliver Current Change":"Attach Repository Snapshot";String source=t.fileName==null?t.artifactPath:t.fileName;String title=t.conversationTitle==null||t.conversationTitle.isBlank()?"ChatGPT conversation":t.conversationTitle;String destination=title+" ["+t.conversationKey+"]";String semantic=switch(t.status){case "Pending","Claimed"->"Pending";case "Preparing"->"Preparing";case "SendClicked"->"Sending";default->t.status;};boolean cancellable=Set.of("Pending","Claimed","Preparing").contains(t.status);return new Core.ExternalInteraction(t.taskId,kind,t.changeSetId,source,destination,semantic,t.message,t.updatedAt,cancellable);}

    private Core.ChatTaskInfo info(Task t){return new Core.ChatTaskInfo(t.taskId,t.kind,t.changeSetId,t.reviewAttemptId,t.conversationKey,t.conversationTitle,t.fileName,t.autoSend,t.status,t.message,t.createdAt,t.updatedAt);}
    private Map<String,Object> claimResponse(Task t){Map<String,Object> m=new LinkedHashMap<>();m.put("bridgeProtocolVersion",BRIDGE_PROTOCOL_VERSION);m.put("taskId",t.taskId);m.put("kind",t.kind);m.put("changeSetId",t.changeSetId);m.put("reviewAttemptId",t.reviewAttemptId);m.put("conversationKey",t.conversationKey);m.put("fileName",t.fileName);m.put("autoSend",t.autoSend);m.put("artifactSha256",t.artifactSha256);m.put("artifactSize",t.artifactSize);if("reviewDiff".equals(t.kind))m.put("sendRetryIntervalMs",Math.multiplyExact((long)t.sendRetryIntervalSeconds,1000L));m.put("payloadUrl","http://127.0.0.1:"+PORT+"/v1/tasks/"+t.taskId+"/payload?ticket="+t.payloadTicket);return m;}

    private Task requireClaim(String taskId,int tabId,String conversationKey){Task t=requireTask(taskId);if(!"Claimed".equals(t.status)||!Objects.equals(t.claimedTabId,tabId))throw fail("ChatGPT task is not claimed by this tab.");if(!Objects.equals(t.conversationKey,conversationKey)||!tabBelongs(conversationKey,tabId))throw fail("Claimed ChatGPT tab is no longer on the task conversation.");return t;}
    private Task requirePreparing(String taskId,int tabId,String conversationKey){Task t=requireTask(taskId);if(!"Preparing".equals(t.status)||!Objects.equals(t.claimedTabId,tabId))throw fail("ChatGPT task is not preparing in this tab.");if(!Objects.equals(t.conversationKey,conversationKey)||!tabBelongs(conversationKey,tabId))throw fail("Preparing ChatGPT tab is no longer on the task conversation.");return t;}
    private Task requireTask(String id){Task t=load(id);if(t==null)throw fail("Unknown ChatGPT task.");return t;}
    private void requireTabInConversation(String conversationKey,int tabId){if(!tabBelongs(conversationKey,tabId))throw fail("ChatGPT tab does not belong to the requested conversation.");}
    private boolean tabBelongs(String conversationKey,int tabId){Core.ChatConversation c=conversations.get(conversationKey);return c!=null&&c.tabIds().contains(tabId);}

    private Task equivalentActionableTask(String kind,String changeSetId,String reviewAttemptId,String conversationKey,String artifactSha256){for(Task t:listTasks())if(ACTIONABLE.contains(t.status)&&Objects.equals(t.kind,kind)&&Objects.equals(t.changeSetId,changeSetId)&&Objects.equals(t.reviewAttemptId,reviewAttemptId)&&Objects.equals(t.conversationKey,conversationKey)&&Objects.equals(t.artifactSha256,artifactSha256))return t;return null;}
    private void supersedeOlderAutoReviewTasks(String changeSetId,String keepAttempt){for(Task t:listTasks())if("reviewDiff".equals(t.kind)&&t.autoGenerated&&Objects.equals(t.changeSetId,changeSetId)&&!Objects.equals(t.reviewAttemptId,keepAttempt)&&Set.of("Pending","Claimed").contains(t.status))cancel(t,"Superseded by a newer current ReviewDiff before composer preparation began.");}
    private void cancelSafelyCancellableReviewTasks(String changeSetId,String why){for(Task t:listTasks())if("reviewDiff".equals(t.kind)&&Objects.equals(t.changeSetId,changeSetId)&&Set.of("Pending","Claimed").contains(t.status))cancel(t,why);}
    private void requireNoUnsafeInFlight(String changeSetId,String message){for(Task t:listTasks())if("reviewDiff".equals(t.kind)&&Objects.equals(t.changeSetId,changeSetId)&&Set.of("Preparing","SendClicked").contains(t.status))throw fail(message);}
    private void cancel(Task t,String message){terminal(t,"Cancelled",message);}
    private void terminal(Task t,String status,String message){t.status=status;t.message=message;t.payloadTicket=null;t.ticketExpiresAt=null;t.leaseUntil=null;t.updatedAt=Instant.now().toString();save(t);emit(t);}
    private void toPending(Task t,String message){t.status="Pending";t.claimedTabId=null;t.payloadTicket=null;t.ticketExpiresAt=null;t.leaseUntil=null;t.message=message;t.updatedAt=Instant.now().toString();save(t);}

    private void expireClaims(){for(Task t:listTasks())if("Claimed".equals(t.status)&&expired(t.leaseUntil))toPending(t,"Claim lease expired before composer preparation.");else if("Preparing".equals(t.status)&&expired(t.leaseUntil))terminal(t,"PreparedUnsent","Composer preparation lease expired before SendClicked; inspect the unsent draft before retrying.");else if("SendClicked".equals(t.status)&&expired(t.leaseUntil))terminal(t,"UnknownAfterSend","Automatic Send attempts could not be confirmed before the safety timeout.");}
    private void expireClaimsAgainstInventory(){for(Task t:listTasks())if(t.claimedTabId!=null&&!tabBelongs(t.conversationKey,t.claimedTabId)){if("Claimed".equals(t.status))toPending(t,"Claimed tab left the task conversation before composer preparation.");else if("Preparing".equals(t.status))terminal(t,"PreparedUnsent","Claimed tab left the task conversation after composer preparation began; inspect the unsent draft before retrying.");else if("SendClicked".equals(t.status))terminal(t,"UnknownAfterSend","Claimed tab left the task conversation after SendClicked.");}}

    private void verifySnapshotZip(Path p){
        if(p==null||!Files.isRegularFile(p,LinkOption.NOFOLLOW_LINKS))throw fail("Snapshot ZIP is unavailable.");
        try(ZipFile z=new ZipFile(p.toFile(),java.nio.charset.StandardCharsets.UTF_8)){
            if(z.getEntry("PACKAGE.json")!=null||z.getEntry("SNAPSHOT.json")==null||z.getEntry("snapshot/")==null)throw fail("Only Repository Snapshot ZIPs created by the app can be attached in V1.");
            String manifestText;try(InputStream in=z.getInputStream(z.getEntry("SNAPSHOT.json"))){manifestText=new String(in.readAllBytes(),java.nio.charset.StandardCharsets.UTF_8);}
            Map<String,Object> manifest=Json.object(manifestText);Object schema=manifest.get("schemaVersion");String type=Core.str(manifest.get("snapshotType")),folder=Core.str(manifest.get("snapshotFolder"));
            if(!(schema instanceof Number n)||n.intValue()!=1||!"snapshot/".equals(folder)||!("local".equals(type)||"committed".equals(type)))throw fail("Snapshot ZIP manifest is not a supported app snapshot.");
            boolean correctMarker="local".equals(type)?z.getEntry("BASE-COMMIT.txt")!=null&&z.getEntry("WORKING-TREE.diff")!=null&&z.getEntry("COMMIT.txt")==null:z.getEntry("COMMIT.txt")!=null&&z.getEntry("BASE-COMMIT.txt")==null&&z.getEntry("WORKING-TREE.diff")==null;
            if(!correctMarker)throw fail("Snapshot ZIP root markers do not match SNAPSHOT.json.");
        }catch(Core.ObsException e){throw e;}catch(Exception e){throw fail("Cannot inspect snapshot ZIP: "+e.getMessage(),e);}
    }

    private List<Task> listTasks(){
        List<Task> out=new ArrayList<>();Path dir=state.root.resolve("chat-handoffs");
        try(DirectoryStream<Path> ds=Files.newDirectoryStream(dir,"*.json")){
            for(Path p:ds){
                Task t=Task.from(state.readObject(p));
                if(!TERMINAL.contains(t.status)&&(t.artifactSize<0||t.artifactSha256==null||!t.artifactSha256.matches("[0-9a-fA-F]{64}"))){
                    if("SendClicked".equals(t.status)){t.status="UnknownAfterSend";t.message="Legacy task lacked an artifact fingerprint after SendClicked; automatic retry is disabled.";}
                    else{t.status="Cancelled";t.message="Legacy task lacked an artifact fingerprint and was cancelled during bridge hardening migration.";}
                    t.payloadTicket=null;t.ticketExpiresAt=null;t.leaseUntil=null;t.updatedAt=Instant.now().toString();save(t);
                }
                out.add(t);
            }
        }catch(IOException e){throw fail("Cannot read ChatGPT handoff state: "+e.getMessage(),e);}return out;
    }
    private Task load(String id){Path p=taskPath(id);return Files.isRegularFile(p)?Task.from(state.readObject(p)):null;}
    private void save(Task t){state.writeJson(taskPath(t.taskId),t.json());}
    private Path taskPath(String id){if(!isUuid(id))throw fail("Invalid ChatGPT task id.");return state.root.resolve("chat-handoffs").resolve(id+".json");}
    private Path bindingPath(String id){if(!isUuid(id)&&!id.matches("[A-Za-z0-9._-]{1,128}"))throw fail("Invalid ChangeSet id for chat binding.");return state.root.resolve("chat-bindings").resolve(id+".json");}
    private static boolean isUuid(String s){try{UUID.fromString(s);return true;}catch(Exception e){return false;}}
    private static long size(Path p){try{return Files.size(p);}catch(IOException e){throw fail("Cannot read artifact size: "+e.getMessage(),e);}}
    private boolean expired(String iso){if(iso==null)return true;try{return !Instant.parse(iso).isAfter(Instant.now());}catch(Exception e){return true;}}
    private static String safeFileName(String s,String fallback){String v=s==null?"":s.replaceAll("[\\p{Cntrl}\\/:*?\"<>|]+","-").trim();return v.isBlank()?fallback:v;}
    private String randomHex(int bytes){byte[] b=new byte[bytes];random.nextBytes(b);return HexFormat.of().formatHex(b);}
    private static String required(Map<String,Object> m,String key){String v=Core.str(m.get(key));if(v==null||v.isBlank())throw fail("Missing ChatGPT inventory field: "+key);return v;}
    private static String safe(String s){return s==null?"":s;}
    private void emit(Task t){try{eventSink.accept(new ChatEvent(t.taskId,t.kind,t.changeSetId,t.reviewAttemptId,t.status,t.message));}catch(Throwable ignored){}}
    private static String shortId(String id){return id==null?"????????":id.substring(0,Math.min(8,id.length()));}
    private static Core.ObsException fail(String message){return new Core.ObsException(Core.CHAT_BRIDGE_FAILED,message);}
    private static Core.ObsException fail(String message,Throwable cause){return new Core.ObsException(Core.CHAT_BRIDGE_FAILED,message,cause);}

    private static final class Task {
        String taskId,kind,changeSetId,reviewAttemptId,conversationKey,conversationTitle,artifactPath,artifactSha256,fileName,status,message,createdAt,updatedAt,leaseUntil,payloadTicket,ticketExpiresAt;long artifactSize;int sendRetryIntervalSeconds=Core.DEFAULT_REVIEW_SEND_RETRY_SECONDS;boolean autoSend,autoGenerated;Integer claimedTabId;
        Map<String,Object> json(){Map<String,Object> m=new LinkedHashMap<>();m.put("schemaVersion",2);m.put("taskId",taskId);m.put("kind",kind);m.put("changeSetId",changeSetId);m.put("reviewAttemptId",reviewAttemptId);m.put("conversationKey",conversationKey);m.put("conversationTitle",conversationTitle);m.put("artifactPath",artifactPath);m.put("artifactSha256",artifactSha256);m.put("artifactSize",artifactSize);m.put("fileName",fileName);m.put("autoSend",autoSend);m.put("autoGenerated",autoGenerated);if("reviewDiff".equals(kind))m.put("sendRetryIntervalSeconds",sendRetryIntervalSeconds);m.put("status",status);m.put("claimedTabId",claimedTabId);m.put("message",message);m.put("createdAt",createdAt);m.put("updatedAt",updatedAt);m.put("leaseUntil",leaseUntil);m.put("payloadTicket",payloadTicket);m.put("ticketExpiresAt",ticketExpiresAt);return m;}
        static Task from(Map<String,Object> m){Task t=new Task();t.taskId=Core.str(m.get("taskId"));t.kind=Core.str(m.get("kind"));t.changeSetId=Core.str(m.get("changeSetId"));t.reviewAttemptId=Core.str(m.get("reviewAttemptId"));t.conversationKey=Core.str(m.get("conversationKey"));t.conversationTitle=Core.str(m.get("conversationTitle"));t.artifactPath=Core.str(m.get("artifactPath"));t.artifactSha256=Core.str(m.get("artifactSha256"));Object sz=m.get("artifactSize");t.artifactSize=sz instanceof Number n?n.longValue():-1;t.fileName=Core.str(m.get("fileName"));t.autoSend=Boolean.TRUE.equals(m.get("autoSend"));t.autoGenerated=Boolean.TRUE.equals(m.get("autoGenerated"));Object retry=m.get("sendRetryIntervalSeconds");if(retry instanceof Number n)t.sendRetryIntervalSeconds=n.intValue();if(t.sendRetryIntervalSeconds<Core.MIN_REVIEW_SEND_RETRY_SECONDS||t.sendRetryIntervalSeconds>Core.MAX_REVIEW_SEND_RETRY_SECONDS)t.sendRetryIntervalSeconds=Core.DEFAULT_REVIEW_SEND_RETRY_SECONDS;t.status=Core.str(m.get("status"));Object tab=m.get("claimedTabId");t.claimedTabId=tab instanceof Number n?n.intValue():null;t.message=Core.str(m.get("message"));t.createdAt=Core.str(m.get("createdAt"));t.updatedAt=Core.str(m.get("updatedAt"));t.leaseUntil=Core.str(m.get("leaseUntil"));t.payloadTicket=Core.str(m.get("payloadTicket"));t.ticketExpiresAt=Core.str(m.get("ticketExpiresAt"));return t;}
    }
}
