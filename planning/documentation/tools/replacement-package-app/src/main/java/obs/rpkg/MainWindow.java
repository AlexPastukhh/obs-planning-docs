package obs.rpkg;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.net.URI;
import java.nio.file.*;
import java.util.*;
import java.util.List;

final class MainWindow extends JFrame {
    private final Core core;
    private ChatBridgeServer bridgeServer;
    private Core.ReviewDiff currentReview;
    private Core.RepositoryConfig selectedRepository;
    private Core.ChangeSet selectedChangeSet;
    private boolean loading,launcherInstallRunning;
    private String outputArchiveKey,outputChangeSetId;
    private int outputAttempt;
    private final Set<String> outputReviewAttemptIds=new LinkedHashSet<>();
    private final List<ChatBridgeService.ChatEvent> pendingChatEvents=new ArrayList<>();

    private final JComboBox<RepositoryItem> repositories=new JComboBox<>();
    private final JComboBox<ChangeSetItem> changeSets=new JComboBox<>();
    private final JComboBox<String> handling=new JComboBox<>(new String[]{"Clipboard","RepoDiffFile","Both"});
    private final JComboBox<ChatItem> reviewChats=new JComboBox<>();
    private final JCheckBox showHistory=new JCheckBox("Show history");
    private final JTextField repositoryIdentity=new JTextField(),archive=new JTextField(),changeSetId=new JTextField(),status=new JTextField(),reviewState=new JTextField(),commitMessage=new JTextField("Finalize ChangeSet"),bridgeState=new JTextField(),chatDelivery=new JTextField(),launcherState=new JTextField();
    private final JTextArea action=new JTextArea(7,60),log=new JTextArea(12,60);

    MainWindow(Core core){
        super("OBS Replacement Package App — Java 21");this.core=core;setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);setMinimumSize(new Dimension(1060,850));
        for(JTextField f:new JTextField[]{repositoryIdentity,changeSetId,status,reviewState,bridgeState,chatDelivery,launcherState})f.setEditable(false);log.setEditable(false);build();core.setChatBridgeEventSink(event->SwingUtilities.invokeLater(()->handleChatBridgeEvent(event)));startBridge();updateLauncherState();loadState();pack();setLocationRelativeTo(null);
        addWindowListener(new WindowAdapter(){@Override public void windowClosed(WindowEvent e){if(bridgeServer!=null)bridgeServer.close();}});
    }

    private void build(){
        JPanel root=new JPanel();root.setLayout(new BoxLayout(root,BoxLayout.Y_AXIS));root.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
        root.add(row("Repository",repositories,button("Add repository",this::addRepository),button("Remove",this::removeRepository),button("Export repository ZIP",this::exportRepositorySnapshot)));
        root.add(row("Repository identity",repositoryIdentity));
        root.add(row("ReviewDiff",handling));
        root.add(row("Chat bridge",bridgeState,button("Copy pairing token",this::copyBridgeToken)));
        root.add(row("Windows launcher",launcherState,button("Install / update",this::installWindowsLauncher),button("Open folder",this::openWindowsLauncherFolder),button("Copy path",this::copyWindowsLauncherPath)));
        root.add(row("Archive ZIP",archive,button("Browse",()->chooseFile(archive))));
        root.add(new JLabel("OBS-ACTION/1 (optional when ZIP is selected explicitly):"));root.add(new JScrollPane(action));
        root.add(row("",button("Apply",this::apply)));
        root.add(row("ChangeSet",changeSets,showHistory));
        root.add(row("Status",status));root.add(row("ChangeSet ID",changeSetId));
        root.add(row("Review",reviewState));
        root.add(row("",button("Refresh Review",this::refreshReview),button("Copy ReviewDiff",this::copyReviewDiff),button("Open ReviewDiff",this::openReviewDiff)));
        root.add(row("Review chat",reviewChats,button("Refresh chats",this::refreshChatList),button("Bind",this::bindReviewChat),button("Open",this::openBoundChat),button("Unbind",this::unbindReviewChat)));
        root.add(row("Chat delivery",chatDelivery,button("Send current ReviewDiff",this::sendCurrentReviewToChat)));
        root.add(row("Commit message",commitMessage));
        root.add(row("",button("Finalize",this::finalizeChangeSet),button("Retry Push",this::retryPush)));
        root.add(row("Output",button("Copy output",this::copyOutput)));root.add(new JScrollPane(log));setContentPane(root);
        repositories.addActionListener(e->{if(!loading)repositoryChanged();});
        changeSets.addActionListener(e->{if(!loading)changeSetChanged();});
        showHistory.addActionListener(e->{if(!loading)reloadChangeSets(selectedChangeSet==null?null:selectedChangeSet.changeSetId);});
        handling.addActionListener(e->{if(!loading)saveHandling();});
    }

    private void startBridge(){try{bridgeServer=ChatBridgeServer.start(core.chatBridgeService());bridgeState.setText("Listening on 127.0.0.1:"+ChatBridgeService.PORT);append("SUCCESS ChatGPT bridge listening on 127.0.0.1:"+ChatBridgeService.PORT+".");}catch(IOException e){bridgeState.setText("Unavailable — "+e.getMessage());append("WARNING ChatGPT bridge unavailable: "+e.getMessage());}}
    private void updateLauncherState(){if(!WindowsLauncherInstaller.isWindows()){launcherState.setText("Windows only");return;}Path exe=WindowsLauncherInstaller.installedExePath();launcherState.setText(WindowsLauncherInstaller.installed()?exe.toString():"Not installed");}
    private void installWindowsLauncher(){
        if(!WindowsLauncherInstaller.isWindows())throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher installation is available only on Windows.");
        if(launcherInstallRunning)throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher installation is already running.");launcherInstallRunning=true;
        launcherState.setText("Installing…");append("Windows launcher: creating/updating pinnable app image…");
        new SwingWorker<WindowsLauncherInstaller.Result,Void>(){
            @Override protected WindowsLauncherInstaller.Result doInBackground()throws Exception{return WindowsLauncherInstaller.installCurrentJar();}
            @Override protected void done(){launcherInstallRunning=false;try{WindowsLauncherInstaller.Result r=get();updateLauncherState();Core.Handoff h=core.copyPathToClipboard(r.exePath());append("SUCCESS Windows launcher "+(r.replacedExisting()?"updated":"installed")+": "+r.exePath());if(r.warning()!=null&&!r.warning().isBlank())append("WARNING "+r.warning());if(h.warning()!=null&&!h.warning().isBlank())append("WARNING Launcher path was not copied to clipboard: "+h.warning());Object[] options={"Open folder","Close"};int choice=JOptionPane.showOptionDialog(MainWindow.this,"Pinnable Windows app is ready:\n"+r.exePath()+"\n\nRight-click Replacement Package App.exe in the folder and choose Pin to taskbar.\nAfter future source updates, run the source app once and click Install / update again.","Windows launcher",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,options,options[0]);if(choice==0)openWindowsLauncherFolder();}catch(Exception e){updateLauncherState();Throwable cause=e instanceof java.util.concurrent.ExecutionException&&e.getCause()!=null?e.getCause():e;append("ERROR Windows launcher install failed: "+cause.getMessage());JOptionPane.showMessageDialog(MainWindow.this,cause.getMessage(),"Windows launcher install failed",JOptionPane.ERROR_MESSAGE);}}
        }.execute();
    }
    private void openWindowsLauncherFolder(){try{WindowsLauncherInstaller.openInstallFolder();append("SUCCESS Windows launcher folder opened.");}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,e.getMessage(),e);}}
    private void copyWindowsLauncherPath(){Path exe=WindowsLauncherInstaller.installedExePath();if(!Files.isRegularFile(exe,LinkOption.NOFOLLOW_LINKS))throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher is not installed yet.");Core.Handoff h=core.copyPathToClipboard(exe);append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Windows launcher path copied to clipboard.");}
    private JPanel row(String label,JComponent... cs){JPanel p=new JPanel(new BorderLayout(8,4));if(!label.isBlank())p.add(new JLabel(label),BorderLayout.WEST);JPanel inner=new JPanel();inner.setLayout(new BoxLayout(inner,BoxLayout.X_AXIS));for(JComponent c:cs){inner.add(c);inner.add(Box.createHorizontalStrut(6));}p.add(inner,BorderLayout.CENTER);p.setMaximumSize(new Dimension(Integer.MAX_VALUE,38));return p;}
    private JButton button(String text,Runnable r){JButton b=new JButton(text);b.addActionListener(e->run(text,r));return b;}
    private void run(String label,Runnable r){try{r.run();}catch(Core.ObsException e){append("["+e.code+"] "+e.getMessage());}catch(Exception e){append("ERROR "+e);}}
    private void append(String s){log.append(s+System.lineSeparator());log.setCaretPosition(log.getDocument().getLength());}
    private void beginArchiveOutputSession(){
        String raw=archive.getText().trim(),display=raw,key;
        if(!raw.isBlank()){
            try{
                Path p=Path.of(raw).toAbsolutePath().normalize();display=p.toString();
                try{Core.PackageData pkg=core.readPackage(p);key=display+"|"+pkg.manifest().packageId();}
                catch(Throwable invalid){long size=Files.exists(p)?Files.size(p):-1;long modified=Files.exists(p)?Files.getLastModifiedTime(p).toMillis():-1;key=display+"|"+size+"|"+modified;}
            }catch(Exception e){key=raw;}
        }else{
            String packageId=null,archiveHint=null;
            for(String line:action.getText().split("\\R")){if(line.startsWith("packageId:"))packageId=line.substring("packageId:".length()).trim();if(line.startsWith("archive:"))archiveHint=line.substring("archive:".length()).trim();}
            display=archiveHint==null||archiveHint.isBlank()?"<archive resolved from action>":archiveHint;key=display+"|"+(packageId==null?"":packageId);
        }
        if(!Objects.equals(outputArchiveKey,key)){outputArchiveKey=key;outputChangeSetId=null;outputAttempt=0;outputReviewAttemptIds.clear();pendingChatEvents.clear();log.setText("");append("=== Archive output ===");append("Archive: "+display);}
        outputAttempt++;append("--- Apply attempt "+outputAttempt+" ---");
    }
    private void registerOutputReview(Core.ChangeSet cs,Core.ReviewDiff review){
        if(outputArchiveKey==null||cs==null||review==null)return;
        if(outputChangeSetId==null)outputChangeSetId=cs.changeSetId;
        if(!Objects.equals(outputChangeSetId,cs.changeSetId))return;
        outputReviewAttemptIds.add(review.attemptId());
        for(Iterator<ChatBridgeService.ChatEvent> it=pendingChatEvents.iterator();it.hasNext();){ChatBridgeService.ChatEvent event=it.next();if(Objects.equals(event.reviewAttemptId(),review.attemptId())){append("CHAT "+event.display());it.remove();}}
    }
    static boolean eventBelongsToOutput(Set<String> reviewAttemptIds,ChatBridgeService.ChatEvent event){return event!=null&&"reviewDiff".equals(event.kind())&&event.reviewAttemptId()!=null&&reviewAttemptIds.contains(event.reviewAttemptId());}
    private void handleChatBridgeEvent(ChatBridgeService.ChatEvent event){
        if(event==null)return;
        if("reviewDiff".equals(event.kind())&&event.reviewAttemptId()!=null){
            if(outputArchiveKey==null||eventBelongsToOutput(outputReviewAttemptIds,event))append("CHAT "+event.display());
            else pendingChatEvents.add(event);
            return;
        }
        if(outputArchiveKey==null)append("CHAT "+event.display());
    }
    private void copyOutput(){Core.Handoff h=core.copyTextToClipboardVerified(log.getText());if(h.warning()!=null&&!h.warning().isBlank())JOptionPane.showMessageDialog(this,h.warning(),"Copy output failed",JOptionPane.ERROR_MESSAGE);}
    private void chooseFile(JTextField f){JFileChooser c=new JFileChooser();if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}
    private void chooseDirectory(JTextField f){JFileChooser c=new JFileChooser(f.getText().isBlank()?null:new java.io.File(f.getText()));c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}

    private void loadState(){try{Core.Settings s=core.getSettings();loading=true;handling.setSelectedItem(s.reviewDiffHandling());loading=false;reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}catch(Exception e){loading=false;append("Settings warning: "+e.getMessage());}}
    private void reloadRepositories(String selectRepoId,String selectChangeSetId){loading=true;repositories.removeAllItems();for(Core.RepositoryConfig r:core.getRepositories())repositories.addItem(new RepositoryItem(r));selectRepositoryItem(selectRepoId);loading=false;repositoryChanged(selectChangeSetId);}
    private void selectRepositoryItem(String id){if(id!=null)for(int i=0;i<repositories.getItemCount();i++)if(repositories.getItemAt(i).value.id().equals(id)){repositories.setSelectedIndex(i);return;}if(repositories.getItemCount()>0)repositories.setSelectedIndex(0);}
    private void repositoryChanged(){repositoryChanged(null);}
    private void repositoryChanged(String preferredChangeSet){RepositoryItem item=(RepositoryItem)repositories.getSelectedItem();selectedRepository=item==null?null:item.value;repositoryIdentity.setText(selectedRepository==null?"":selectedRepository.repositoryIdentity());if(selectedRepository==null){clearChangeSet();return;}Core.Settings s=core.selectRepository(selectedRepository.id());reloadChangeSets(preferredChangeSet!=null?preferredChangeSet:s.selectedChangeSetId());}
    private void reloadChangeSets(String preferredId){if(selectedRepository==null){clearChangeSet();return;}loading=true;changeSets.removeAllItems();for(Core.ChangeSet cs:core.getChangeSets(selectedRepository.id(),showHistory.isSelected()))changeSets.addItem(new ChangeSetItem(cs));if(preferredId!=null)for(int i=0;i<changeSets.getItemCount();i++)if(changeSets.getItemAt(i).value.changeSetId.equals(preferredId)){changeSets.setSelectedIndex(i);break;}if(changeSets.getSelectedIndex()<0&&changeSets.getItemCount()>0)changeSets.setSelectedIndex(0);loading=false;changeSetChanged();}
    private void changeSetChanged(){ChangeSetItem item=(ChangeSetItem)changeSets.getSelectedItem();selectedChangeSet=item==null?null:item.value;if(selectedChangeSet==null){core.selectChangeSet(null);clearChangeSetFields();return;}core.selectChangeSet(selectedChangeSet.changeSetId);changeSetId.setText(selectedChangeSet.changeSetId);status.setText(selectedChangeSet.status);try{currentReview=core.currentReview(selectedChangeSet);reviewState.setText(currentReview==null?"No current ReviewDiff — Refresh Review":"Current");}catch(Core.ObsException e){currentReview=null;reviewState.setText("Unavailable — Refresh Review");append("WARNING Stored current ReviewDiff is unavailable: "+e.getMessage());}refreshChatList();}
    private void clearChangeSet(){loading=true;changeSets.removeAllItems();loading=false;selectedRepository=null;repositoryIdentity.setText("");clearChangeSetFields();}
    private void clearChangeSetFields(){selectedChangeSet=null;currentReview=null;changeSetId.setText("");status.setText("");reviewState.setText("");chatDelivery.setText("");loading=true;reviewChats.removeAllItems();loading=false;}

    private void addRepository(){JFileChooser c=new JFileChooser();c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)!=JFileChooser.APPROVE_OPTION)return;Path p=c.getSelectedFile().toPath();String def=p.getFileName()==null?p.toString():p.getFileName().toString();String name=JOptionPane.showInputDialog(this,"Display name for this repository:",def);if(name==null)return;Core.RepositoryConfig r=core.registerRepository(name,p);append("SUCCESS Repository registered: "+r.name()+" — "+r.repositoryIdentity());reloadRepositories(r.id(),null);}
    private void removeRepository(){if(selectedRepository==null)return;int result=JOptionPane.showConfirmDialog(this,"Remove '"+selectedRepository.name()+"' from the allowed repository list?","Remove repository",JOptionPane.OK_CANCEL_OPTION);if(result!=JOptionPane.OK_OPTION)return;String id=selectedRepository.id();Core.Settings s=core.removeRepository(id);append("SUCCESS Repository removed from allowlist.");reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}
    private void saveHandling(){core.setReviewDiffHandling(String.valueOf(handling.getSelectedItem()));append("Settings saved.");}
    private void copyBridgeToken(){Core.Handoff h=core.copyTextToClipboardVerified(core.chatBridgePairingToken());append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Chat bridge pairing token copied. Paste it once in the OBS ChatGPT Bridge extension options.");}

    private void refreshChatList(){
        String preferred=null;ChatItem selected=(ChatItem)reviewChats.getSelectedItem();if(selected!=null)preferred=selected.value.conversationKey();Core.ChatBinding bound=selectedChangeSet==null?null:core.getReviewChatBinding(selectedChangeSet.changeSetId);if(bound!=null)preferred=bound.conversationKey();
        loading=true;reviewChats.removeAllItems();for(Core.ChatConversation c:core.getOpenChatConversations())reviewChats.addItem(new ChatItem(c));if(preferred!=null)for(int i=0;i<reviewChats.getItemCount();i++)if(reviewChats.getItemAt(i).value.conversationKey().equals(preferred)){reviewChats.setSelectedIndex(i);break;}loading=false;updateChatDelivery();
    }
    private void updateChatDelivery(){if(selectedChangeSet==null){chatDelivery.setText("");return;}chatDelivery.setText(core.chatDeliveryStatus(selectedChangeSet.changeSetId));}
    private void bindReviewChat(){if(selectedChangeSet==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Select a ChangeSet first.");ChatItem item=(ChatItem)reviewChats.getSelectedItem();if(item==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"No open ordinary ChatGPT conversation is selected.");Core.ChatBinding b=core.bindReviewChat(selectedChangeSet.changeSetId,item.value.conversationKey());append("SUCCESS Review chat bound for this ChangeSet: "+b.title()+". Existing ReviewDiff was not sent automatically.");updateChatDelivery();}
    private void unbindReviewChat(){if(selectedChangeSet==null)return;core.unbindReviewChat(selectedChangeSet.changeSetId);append("SUCCESS Review chat unbound from ChangeSet.");updateChatDelivery();}
    private void openBoundChat(){if(selectedChangeSet==null)return;Core.ChatBinding b=core.getReviewChatBinding(selectedChangeSet.changeSetId);if(b==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"No ChatGPT conversation is bound to this ChangeSet.");try{if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.BROWSE))throw new IOException("Desktop Browse is not supported");Desktop.getDesktop().browse(URI.create(b.url()));}catch(Exception e){throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Cannot open bound ChatGPT conversation: "+e.getMessage(),e);}}
    private void sendCurrentReviewToChat(){if(selectedChangeSet==null||!requireCurrentReview())return;Core.ChatTaskInfo t=core.sendCurrentReviewToChat(selectedChangeSet.changeSetId);append("SUCCESS ReviewDiff queued for ChatGPT: "+t.conversationTitle()+" · "+t.taskId().substring(0,8));updateChatDelivery();}

    private void exportRepositorySnapshot(){
        Path repository=repoPath();
        JComboBox<String> mode=new JComboBox<>(new String[]{"Local working tree + diff","Committed snapshot"});
        JTextField commit=new JTextField("HEAD",32);
        JTextField destination=new JTextField(RepositorySnapshotExporter.defaultOutputDirectory().toString(),32);
        JButton browse=new JButton("Browse");browse.addActionListener(e->chooseDirectory(destination));
        JPanel destinationRow=new JPanel(new BorderLayout(6,0));destinationRow.add(destination,BorderLayout.CENTER);destinationRow.add(browse,BorderLayout.EAST);
        JPanel panel=new JPanel();panel.setLayout(new BoxLayout(panel,BoxLayout.Y_AXIS));
        panel.add(new JLabel("Repository: "+selectedRepository.name()+"  ["+selectedRepository.repositoryIdentity()+"]"));
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Mode"));panel.add(mode);
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Commit / ref (Committed mode)"));panel.add(commit);
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Destination directory"));panel.add(destinationRow);
        Runnable updateCommit=()->commit.setEnabled(mode.getSelectedIndex()==1);mode.addActionListener(e->updateCommit.run());updateCommit.run();
        int choice=JOptionPane.showConfirmDialog(this,panel,"Export Repository ZIP",JOptionPane.OK_CANCEL_OPTION,JOptionPane.PLAIN_MESSAGE);
        if(choice!=JOptionPane.OK_OPTION)return;
        String selectedMode=mode.getSelectedIndex()==0?"local":"committed";
        String commitRef=selectedMode.equals("committed")?commit.getText().trim():null;
        Path out=destination.getText().isBlank()?RepositorySnapshotExporter.defaultOutputDirectory():Path.of(destination.getText().trim());
        Core.SnapshotExportResult r=core.exportRepositorySnapshot(repository,selectedMode,commitRef,out);
        Core.Handoff clip=core.copyPathToClipboard(r.zipPath());
        append("SUCCESS Repository snapshot created: "+r.zipPath().toAbsolutePath().normalize());
        if(clip.warning()!=null&&!clip.warning().isBlank())append("WARNING Snapshot created, but path was not copied to clipboard: "+clip.warning());else append("SUCCESS Snapshot path copied to clipboard.");
        showSnapshotResult(r,clip);
    }

    private void showSnapshotResult(Core.SnapshotExportResult r,Core.Handoff clipboard){
        String path=r.zipPath().toAbsolutePath().normalize().toString();
        String copyState=clipboard.warning()!=null&&!clipboard.warning().isBlank()?"Clipboard warning: "+clipboard.warning():"Path copied to clipboard.";
        Object[] options={"Attach to ChatGPT","Copy path","Open folder","Close"};
        int selected=JOptionPane.showOptionDialog(this,"Snapshot created:\n"+path+"\n\n"+copyState+"\n\nChatGPT attachment is attach-only; the extension never presses Send for snapshot ZIPs.","Repository Snapshot",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,options,options[3]);
        if(selected==0)attachSnapshotToChat(r.zipPath());
        if(selected==1){Core.Handoff h=core.copyPathToClipboard(r.zipPath());append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Snapshot path copied to clipboard.");}
        if(selected==2){Path folder=r.zipPath().toAbsolutePath().normalize().getParent();if(folder==null){append("ERROR Snapshot output folder is unavailable.");return;}if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.OPEN)){append("ERROR Desktop Open is not supported on this system.");return;}try{Desktop.getDesktop().open(folder.toFile());append("SUCCESS Snapshot folder opened: "+folder);}catch(IOException e){append("ERROR Cannot open snapshot folder: "+e.getMessage());}}
    }
    private void attachSnapshotToChat(Path zip){List<Core.ChatConversation> chats=core.getOpenChatConversations();if(chats.isEmpty())throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"No open ordinary ChatGPT conversations are visible to the extension.");JComboBox<ChatItem> box=new JComboBox<>();for(Core.ChatConversation c:chats)box.addItem(new ChatItem(c));int choice=JOptionPane.showConfirmDialog(this,box,"Attach snapshot ZIP to ChatGPT",JOptionPane.OK_CANCEL_OPTION,JOptionPane.PLAIN_MESSAGE);if(choice!=JOptionPane.OK_OPTION)return;ChatItem item=(ChatItem)box.getSelectedItem();Core.ChatTaskInfo t=core.attachSnapshotToChat(zip,item.value.conversationKey());append("SUCCESS Snapshot attachment queued for "+t.conversationTitle()+". The extension will attach it but will not send the message.");}

    private Path repoPath(){if(selectedRepository==null)throw new Core.ObsException(Core.REPOSITORY_MISMATCH,"Select or add an allowed repository first.");return Path.of(selectedRepository.path());}
    private void apply(){beginArchiveOutputSession();saveHandling();Path zip=archive.getText().isBlank()?null:Path.of(archive.getText().trim());Core.ApplyResult r=action.getText().isBlank()?core.applyPackage(zip,repoPath()):core.applyAction(action.getText(),zip,repoPath());registerOutputReview(r.changeSet(),r.review());append("SUCCESS Apply. ReviewDiff is current.");if(r.attempt().handoffWarning!=null&&!r.attempt().handoffWarning.isBlank())append("WARNING "+r.attempt().handoffWarning);reloadChangeSets(r.changeSet().changeSetId);}
    private void refreshReview(){if(selectedChangeSet==null)throw new Core.ObsException(Core.STATE_DIVERGED,"Select a ChangeSet first.");Core.ReviewDiff r=core.refreshReview(selectedChangeSet.changeSetId);currentReview=r;reviewState.setText("Current");selectedChangeSet=core.getChangeSet(selectedChangeSet.changeSetId);registerOutputReview(selectedChangeSet,r);append("SUCCESS ReviewDiff refreshed: "+r.diffPath());updateChatDelivery();}
    private boolean requireCurrentReview(){if(currentReview!=null)return true;append("ERROR No current ReviewDiff is available for the selected ChangeSet. Refresh Review first.");return false;}
    private void copyReviewDiff(){if(!requireCurrentReview())return;Core.Handoff h=core.copyReviewDiffToClipboard(currentReview);if(h.warning()!=null&&!h.warning().isBlank()){append("ERROR "+h.warning());return;}append("SUCCESS ReviewDiff copied to clipboard.");}
    private void openReviewDiff(){if(!requireCurrentReview())return;Path p=core.verifiedReviewDiffPath(currentReview);if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.OPEN)){append("ERROR Desktop Open is not supported on this system.");return;}try{Desktop.getDesktop().open(p.toFile());append("SUCCESS ReviewDiff opened: "+p);}catch(IOException e){append("ERROR Cannot open ReviewDiff: "+e.getMessage());}}
    private void finalizeChangeSet(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");Core.FinalizeResult r=core.finalizeChangeSet(selectedChangeSet.changeSetId,commitMessage.getText(),repoPath());append(r.commitSha()==null?"SUCCESS Finalized with no net changes; no commit/push required.":"SUCCESS Finalized commit "+r.commitSha());reloadChangeSets(null);}
    private void retryPush(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");Core.FinalizeResult r=core.retryPush(selectedChangeSet.changeSetId,repoPath());append("SUCCESS Retry Push commit "+r.commitSha());reloadChangeSets(null);}

    private record RepositoryItem(Core.RepositoryConfig value){@Override public String toString(){return value.name()+"  ["+value.repositoryIdentity()+"]";}}
    private record ChangeSetItem(Core.ChangeSet value){@Override public String toString(){String id=value.changeSetId==null?"":value.changeSetId.substring(0,Math.min(8,value.changeSetId.length()));return value.changeSetLabel+" · "+value.status+" · "+id;}}
    private record ChatItem(Core.ChatConversation value){@Override public String toString(){return value.title()+" · "+value.tabCount()+" tab"+(value.tabCount()==1?"":"s")+" · "+value.conversationKey().substring(0,Math.min(8,value.conversationKey().length()));}}
}
