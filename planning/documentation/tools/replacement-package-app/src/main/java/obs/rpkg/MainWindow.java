package obs.rpkg;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.URI;
import java.nio.file.*;
import java.util.*;
import java.util.List;

final class MainWindow extends JFrame {
    private static final long APPLY_ZIP_POLL_INTERVAL_MS=2000, APPLY_ZIP_POLL_MAX_MS=12000;
    private final Core core;
    private ChatBridgeServer bridgeServer;
    private Core.RepositoryConfig selectedRepository;
    private Core.ChangeSet selectedChangeSet;
    private boolean loading,launcherInstallRunning,backgroundOperationRunning;
    private final Map<String,StringBuilder> outputByChangeSet=new LinkedHashMap<>();
    private final Map<String,Integer> outputApplyAttempts=new LinkedHashMap<>();
    private String visibleOutputChangeSetId;

    private final JComboBox<RepositoryItem> repositories=new JComboBox<>();
    private final JComboBox<ChangeSetItem> changeSets=new JComboBox<>();
    private final JComboBox<String> handling=new JComboBox<>(new String[]{"Clipboard","RepoDiffFile","Both"});
    private final JSpinner reviewSendRetrySeconds=new JSpinner(new SpinnerNumberModel(Core.DEFAULT_REVIEW_SEND_RETRY_SECONDS,Core.MIN_REVIEW_SEND_RETRY_SECONDS,Core.MAX_REVIEW_SEND_RETRY_SECONDS,1));
    private final JTextField reviewChatTitleIgnoredCharacters=new JTextField();
    private final JComboBox<ChatItem> reviewChats=new JComboBox<>();
    private final JComboBox<InteractionItem> interactions=new JComboBox<>();
    private final JCheckBox allRepositories=new JCheckBox("All repositories"),showHistory=new JCheckBox("Show history");
    private final JTextField repositoryIdentity=new JTextField(),archive=new JTextField(),changeSetId=new JTextField(),status=new JTextField(),reviewState=new JTextField(),commitMessage=new JTextField("Finalize ChangeSet"),bridgeState=new JTextField(),chatDelivery=new JTextField(),launcherState=new JTextField(),operationState=new JTextField();
    private final JTextArea action=new JTextArea(7,60),log=new JTextArea(12,60),diagnostics=new JTextArea(24,100);
    private final JButton reopenButton=new JButton("Reopen ChangeSet");

    MainWindow(Core core){
        super("OBS Replacement Package App — Java 21");this.core=core;setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);setMinimumSize(new Dimension(1120,960));
        for(JTextField f:new JTextField[]{repositoryIdentity,changeSetId,status,reviewState,bridgeState,chatDelivery,launcherState,operationState})f.setEditable(false);log.setEditable(false);diagnostics.setEditable(false);build();core.setChatBridgeEventSink(event->SwingUtilities.invokeLater(()->handleChatBridgeEvent(event)));startBridge();updateLauncherState();loadState();pack();setLocationRelativeTo(null);
        addWindowListener(new WindowAdapter(){@Override public void windowClosed(WindowEvent e){if(bridgeServer!=null)bridgeServer.close();}});
    }

    private void build(){
        JPanel root=new JPanel();root.setLayout(new BoxLayout(root,BoxLayout.Y_AXIS));root.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
        root.add(row("Repository",repositories,button("Add repository",this::addRepository),button("Remove",this::removeRepository),button("Change location",this::changeRepositoryLocation),button("Export repository ZIP",this::exportRepositorySnapshot)));
        root.add(row("Repository identity",repositoryIdentity));
        root.add(row("ReviewDiff",handling));
        root.add(row("Review send retry",reviewSendRetrySeconds,new JLabel("seconds")));
        root.add(row("Review title ignores",reviewChatTitleIgnoredCharacters));
        root.add(row("Chat bridge",bridgeState,button("Copy pairing token",this::copyBridgeToken)));
        root.add(row("Windows launcher",launcherState,button("Install / update",this::installWindowsLauncher),button("Open folder",this::openWindowsLauncherFolder),button("Copy path",this::copyWindowsLauncherPath)));
        root.add(row("Archive ZIP",archive,button("Browse",()->chooseFile(archive))));
        root.add(new JLabel("OBS-ACTION/1 (optional when ZIP is selected explicitly):"));root.add(new JScrollPane(action));
        root.add(row("",button("Apply",this::apply),button("Apply (wait for ZIP)",this::applyWithPolling)));
        root.add(row("ChangeSet",changeSets));
        root.add(row("",allRepositories,showHistory));
        root.add(row("Status",status));root.add(row("ChangeSet ID",changeSetId));
        root.add(row("Review",reviewState));
        root.add(row("",button("Refresh Review",this::refreshReview),button("Copy ReviewDiff",this::copyReviewDiff),button("Open ReviewDiff",this::openReviewDiff)));
        root.add(row("Review chat",reviewChats,button("Refresh chats",this::refreshChatList),button("Bind",this::bindReviewChat),button("Open",this::openBoundChat),button("Unbind",this::unbindReviewChat)));
        root.add(row("Chat delivery",chatDelivery,button("Send current ReviewDiff",this::sendCurrentReviewToChat)));
        root.add(row("Commit message",commitMessage));
        reopenButton.addActionListener(e->run("Reopen ChangeSet",this::reopenChangeSet));reopenButton.setVisible(false);
        root.add(row("",button("Finalize",this::finalizeChangeSet),button("Retry Push",this::retryPush),reopenButton));
        root.add(row("External interactions",interactions));
        root.add(row("",button("Refresh interactions",this::refreshInteractions),button("Cancel interaction",this::cancelInteraction),button("Dismiss interaction",this::dismissInteraction)));
        root.add(row("Operation",operationState));
        root.add(row("Output",button("Copy output",this::copyOutput),button("Technical diagnostics",this::showDiagnostics)));root.add(new JScrollPane(log));setContentPane(root);
        repositories.addActionListener(e->{if(!loading)repositoryChanged();});
        changeSets.addActionListener(e->{if(!loading)changeSetChanged();});
        allRepositories.addActionListener(e->{if(!loading)reloadChangeSets(selectedChangeSet==null?null:selectedChangeSet.changeSetId,!allRepositories.isSelected());});
        showHistory.addActionListener(e->{if(!loading)reloadChangeSets(selectedChangeSet==null?null:selectedChangeSet.changeSetId,!allRepositories.isSelected());});
        handling.addActionListener(e->{if(!loading)saveHandling();});
        reviewSendRetrySeconds.addChangeListener(e->{if(!loading)saveReviewSendRetryInterval();});
        reviewChatTitleIgnoredCharacters.addActionListener(e->{if(!loading)saveReviewChatTitleIgnoredCharacters();});
        reviewChatTitleIgnoredCharacters.addFocusListener(new FocusAdapter(){@Override public void focusLost(FocusEvent e){if(!loading)saveReviewChatTitleIgnoredCharacters();}});
    }

    private void startBridge(){try{bridgeServer=ChatBridgeServer.start(core.chatBridgeService());bridgeState.setText("Listening on 127.0.0.1:"+ChatBridgeService.PORT);append("SUCCESS ChatGPT bridge listening on 127.0.0.1:"+ChatBridgeService.PORT+".");}catch(IOException e){bridgeState.setText("Unavailable — "+message(e));append(withTechnicalDetails("WARNING ChatGPT bridge unavailable: "+message(e),e));}}
    private void updateLauncherState(){if(!WindowsLauncherInstaller.isWindows()){launcherState.setText("Windows only");return;}Path exe=WindowsLauncherInstaller.installedExePath();launcherState.setText(WindowsLauncherInstaller.installed()?exe.toString():"Not installed");}
    private void installWindowsLauncher(){
        if(!WindowsLauncherInstaller.isWindows())throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher installation is available only on Windows.");
        if(launcherInstallRunning)throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher installation is already running.");launcherInstallRunning=true;
        launcherState.setText("Installing…");append("Windows launcher: creating/updating pinnable app image…");
        new SwingWorker<WindowsLauncherInstaller.Result,Void>(){
            @Override protected WindowsLauncherInstaller.Result doInBackground()throws Exception{return WindowsLauncherInstaller.installCurrentJar();}
            @Override protected void done(){launcherInstallRunning=false;try{WindowsLauncherInstaller.Result r=get();updateLauncherState();Core.Handoff h=core.copyPathToClipboard(r.exePath());append("SUCCESS Windows launcher "+(r.replacedExisting()?"updated":"installed")+": "+r.exePath());if(r.warning()!=null&&!r.warning().isBlank())append("WARNING "+r.warning());if(h.warning()!=null&&!h.warning().isBlank())append("WARNING Launcher path was not copied to clipboard: "+h.warning());Object[] options={"Open folder","Close"};int choice=JOptionPane.showOptionDialog(MainWindow.this,"Pinnable Windows app is ready:\n"+r.exePath()+"\n\nRight-click Replacement Package App.exe in the folder and choose Pin to taskbar.\nAfter future source updates, run the source app once and click Install / update again.","Windows launcher",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,options,options[0]);if(choice==0)openWindowsLauncherFolder();}catch(Exception e){updateLauncherState();Throwable cause=e instanceof java.util.concurrent.ExecutionException&&e.getCause()!=null?e.getCause():e;append(withTechnicalDetails("ERROR Windows launcher install failed: "+message(cause),cause));JOptionPane.showMessageDialog(MainWindow.this,message(cause),"Windows launcher install failed",JOptionPane.ERROR_MESSAGE);}}
        }.execute();
    }
    private void openWindowsLauncherFolder(){try{WindowsLauncherInstaller.openInstallFolder();append("SUCCESS Windows launcher folder opened.");}catch(IOException e){throw new Core.ObsException(Core.STATE_DIVERGED,e.getMessage(),e);}}
    private void copyWindowsLauncherPath(){Path exe=WindowsLauncherInstaller.installedExePath();if(!Files.isRegularFile(exe,LinkOption.NOFOLLOW_LINKS))throw new Core.ObsException(Core.STATE_DIVERGED,"Windows launcher is not installed yet.");Core.Handoff h=core.copyPathToClipboard(exe);append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Windows launcher path copied to clipboard.");}
    private JPanel row(String label,JComponent... cs){JPanel p=new JPanel(new BorderLayout(8,4));if(!label.isBlank())p.add(new JLabel(label),BorderLayout.WEST);JPanel inner=new JPanel();inner.setLayout(new BoxLayout(inner,BoxLayout.X_AXIS));for(JComponent c:cs){inner.add(c);inner.add(Box.createHorizontalStrut(6));}p.add(inner,BorderLayout.CENTER);p.setMaximumSize(new Dimension(Integer.MAX_VALUE,38));return p;}
    private JButton button(String text,Runnable r){JButton b=new JButton(text);b.addActionListener(e->run(text,r));return b;}
    private void run(String label,Runnable r){try{r.run();}catch(Throwable e){reportFailure(label,e);}}
    private <T> void runBackground(String label,java.util.concurrent.Callable<T> work,java.util.function.Consumer<T> success,java.util.function.Consumer<Throwable> failure){
        if(backgroundOperationRunning){append("WARNING Another background operation is still running; wait for it to finish before starting "+label+".");return;}
        backgroundOperationRunning=true;setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
        new SwingWorker<T,Void>(){
            @Override protected T doInBackground()throws Exception{return work.call();}
            @Override protected void done(){backgroundOperationRunning=false;setCursor(Cursor.getDefaultCursor());try{success.accept(get());}catch(InterruptedException e){Thread.currentThread().interrupt();failure.accept(e);}catch(java.util.concurrent.ExecutionException e){failure.accept(e.getCause()==null?e:e.getCause());}}
        }.execute();
    }
    private void reportFailure(String label,Throwable e){reportFailureToOutput(null,label,e);}
    private void reportFailureToOutput(String changeSetId,String label,Throwable e){String code=e instanceof Core.ObsException oe?oe.code:"UNEXPECTED";String summary=semanticMessage(message(e));if(changeSetId==null)showOperation("["+code+"] "+summary);else appendToOutput(changeSetId,"["+code+"] "+summary);appendDiagnostic(label,e);}
    private void appendDiagnostic(String label,Throwable e){StringWriter out=new StringWriter();e.printStackTrace(new PrintWriter(out));diagnostics.append("=== "+java.time.Instant.now()+" · "+label+" ==="+System.lineSeparator()+out.toString().stripTrailing()+System.lineSeparator()+System.lineSeparator());diagnostics.setCaretPosition(diagnostics.getDocument().getLength());}
    private static String semanticMessage(String text){if(text==null)return"";int p=text.indexOf("\n---");return (p>=0?text.substring(0,p):text).strip();}
    private void trackedFailure(String operation,Throwable e,String repositoryId,String changeSet){if(changeSet!=null)try{String code=e instanceof Core.ObsException oe?oe.code:"UNEXPECTED";core.recordOperationOutcome(changeSet,"FAILED",code,semanticMessage(message(e)));}catch(Throwable ignored){}reportFailureToOutput(changeSet,operation,e);notifyOperation(operation+" failed",semanticMessage(message(e)),repositoryId,true);}
    private void notifyOperation(String title,String message,String repositoryId,boolean failure){WindowsNotifier.show(title,message,failure,()->SwingUtilities.invokeLater(()->openFromNotification(repositoryId)));}
    private void openFromNotification(String repositoryId){setVisible(true);setExtendedState(JFrame.NORMAL);toFront();requestFocus();if(repositoryId!=null&&findRepositoryIndex(repositoryId)>=0)selectRepositoryOnly(repositoryId);}
    static String withTechnicalDetails(String summary,Throwable cause){if(cause==null)return summary;StringWriter out=new StringWriter();cause.printStackTrace(new PrintWriter(out));String details=out.toString().stripTrailing();return details.isBlank()?summary:summary+"\n--- technical details ---\n"+details;}
    private static String message(Throwable t){if(t==null)return"unknown error";String m=t.getMessage();return m==null||m.isBlank()?t.toString():m;}
    private StringBuilder outputBuffer(String changeSetId){return outputByChangeSet.computeIfAbsent(Objects.requireNonNull(changeSetId),k->new StringBuilder());}
    private void showOutputForChangeSet(String changeSetId){visibleOutputChangeSetId=changeSetId;log.setText(changeSetId==null?"":outputBuffer(changeSetId).toString());log.setCaretPosition(log.getDocument().getLength());}
    private void appendToOutput(String changeSetId,String s){if(changeSetId==null){showOperation(s);return;}String line=s+System.lineSeparator();outputBuffer(changeSetId).append(line);if(Objects.equals(visibleOutputChangeSetId,changeSetId)){log.append(line);log.setCaretPosition(log.getDocument().getLength());}}
    private void showOperation(String s){String text=semanticMessage(s).replace('\r',' ').replace('\n',' ').strip();operationState.setText(text);}
    private void append(String s){showOperation(s);}
    private static String preparedChangeSetId(Core.PreparedApply prepared){return prepared.packageData().manifest().changeSetId();}
    private void beginPreparedApplyOutput(Core.PreparedApply prepared){
        operationState.setText("");String csId=preparedChangeSetId(prepared);showOutputForChangeSet(csId);int attempt=outputApplyAttempts.merge(csId,1,Integer::sum);Core.PackageData pkg=prepared.packageData();String file=pkg.archivePath().getFileName()==null?pkg.archivePath().toString():pkg.archivePath().getFileName().toString();appendToOutput(csId,"--- Apply attempt "+attempt+" · packageId "+pkg.manifest().packageId()+" · "+file+" ---");appendToOutput(csId,"INFO Preparing Apply…");
    }
    private void handleChatBridgeEvent(ChatBridgeService.ChatEvent event){
        if(event==null)return;appendToOutput(event.changeSetId(),"CHAT "+event.display());
        refreshInteractions();
        if(Set.of("Sent","Attached","UnknownAfterSend","FailedBeforeSend","PreparedUnsent","NoChanges","Cancelled").contains(event.status())){String repoId=null;if(event.changeSetId()!=null){Core.RepositoryConfig repo=core.repositoryForChangeSet(event.changeSetId());if(repo!=null)repoId=repo.id();if(Set.of("FailedBeforeSend","PreparedUnsent").contains(event.status()))core.recordOperationOutcome(event.changeSetId(),"FAILED",Core.CHAT_BRIDGE_FAILED,event.message());else if("UnknownAfterSend".equals(event.status()))core.recordOperationOutcome(event.changeSetId(),"UNCERTAIN",Core.CHAT_BRIDGE_FAILED,event.message());else if(Set.of("Sent","NoChanges").contains(event.status()))core.recordOperationOutcome(event.changeSetId(),"SUCCESS",Core.SUCCESS,event.message());}boolean failure=Set.of("UnknownAfterSend","FailedBeforeSend","PreparedUnsent").contains(event.status());notifyOperation("ChatGPT handoff · "+event.status(),event.message()==null?event.status():event.message(),repoId,failure);}
    }
    private void copyOutput(){Core.Handoff h=core.copyTextToClipboardVerified(log.getText());if(h.warning()!=null&&!h.warning().isBlank())JOptionPane.showMessageDialog(this,h.warning(),"Copy output failed",JOptionPane.ERROR_MESSAGE);}
    private void showDiagnostics(){JTextArea copy=new JTextArea(diagnostics.getText(),28,110);copy.setEditable(false);copy.setCaretPosition(copy.getDocument().getLength());JButton copyButton=new JButton("Copy diagnostics");copyButton.addActionListener(e->{Core.Handoff h=core.copyTextToClipboardVerified(copy.getText());if(h.warning()!=null&&!h.warning().isBlank())JOptionPane.showMessageDialog(this,h.warning(),"Copy diagnostics failed",JOptionPane.ERROR_MESSAGE);});JPanel panel=new JPanel(new BorderLayout(6,6));panel.add(new JScrollPane(copy),BorderLayout.CENTER);panel.add(copyButton,BorderLayout.SOUTH);JOptionPane.showMessageDialog(this,panel,"Technical diagnostics — current session",JOptionPane.PLAIN_MESSAGE);}
    private void chooseFile(JTextField f){JFileChooser c=new JFileChooser();if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}
    private void chooseDirectory(JTextField f){JFileChooser c=new JFileChooser(f.getText().isBlank()?null:new java.io.File(f.getText()));c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}

    private void loadState(){try{Core.Settings s=core.getSettings();loading=true;handling.setSelectedItem(s.reviewDiffHandling());reviewSendRetrySeconds.setValue(s.reviewDiffSendRetrySeconds());reviewChatTitleIgnoredCharacters.setText(s.reviewChatTitleIgnoredCharacters());loading=false;reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}catch(Exception e){loading=false;append(withTechnicalDetails("Settings warning: "+message(e),e));}}
    private void reloadRepositories(String selectRepoId,String selectChangeSetId){loading=true;repositories.removeAllItems();for(Core.RepositoryConfig r:core.getRepositories())repositories.addItem(new RepositoryItem(r));int index=findRepositoryIndex(selectRepoId);if(index>=0)repositories.setSelectedIndex(index);else if(repositories.getItemCount()>0)repositories.setSelectedIndex(0);loading=false;repositoryChanged(selectChangeSetId);}
    private int findRepositoryIndex(String id){if(id!=null)for(int i=0;i<repositories.getItemCount();i++)if(repositories.getItemAt(i).value.id().equals(id))return i;return -1;}
    private void repositoryChanged(){repositoryChanged(null);}
    private void repositoryChanged(String preferredChangeSet){RepositoryItem item=(RepositoryItem)repositories.getSelectedItem();selectedRepository=item==null?null:item.value;repositoryIdentity.setText(selectedRepository==null?"":selectedRepository.repositoryIdentity());if(selectedRepository==null){clearChangeSet();return;}Core.Settings settings=core.selectRepository(selectedRepository.id());String preferred=preferredChangeSet!=null?preferredChangeSet:settings.selectedChangeSetId();reloadChangeSets(preferred,!allRepositories.isSelected());}
    private void reloadChangeSets(String preferredId){reloadChangeSets(preferredId,!allRepositories.isSelected());}
    private void reloadChangeSets(String preferredId,boolean autoSelect){if(selectedRepository==null&&!allRepositories.isSelected()){clearChangeSet();return;}loading=true;changeSets.removeAllItems();List<Core.ChangeSet> visible=allRepositories.isSelected()?core.getGlobalChangeSets(showHistory.isSelected()):core.getChangeSets(selectedRepository.id(),showHistory.isSelected());for(Core.ChangeSet cs:visible){Core.RepositoryConfig repo=allRepositories.isSelected()?core.findRepositoryForChangeSet(cs.changeSetId):selectedRepository;changeSets.addItem(new ChangeSetItem(cs,repositoryDisplay(repo)));}boolean selected=false;if(preferredId!=null)for(int i=0;i<changeSets.getItemCount();i++)if(changeSets.getItemAt(i).value.changeSetId.equals(preferredId)){changeSets.setSelectedIndex(i);selected=true;break;}if(!selected){if(autoSelect&&changeSets.getItemCount()>0)changeSets.setSelectedIndex(0);else changeSets.setSelectedIndex(-1);}loading=false;changeSetChanged();}
    private static String repositoryDisplay(Core.RepositoryConfig repo){return repo==null?"Repository unavailable":repo.name();}
    private void selectRepositoryOnly(String repositoryId){int index=findRepositoryIndex(repositoryId);if(index<0)return;loading=true;repositories.setSelectedIndex(index);RepositoryItem item=(RepositoryItem)repositories.getSelectedItem();selectedRepository=item==null?null:item.value;repositoryIdentity.setText(selectedRepository==null?"":selectedRepository.repositoryIdentity());loading=false;if(selectedRepository==null)return;core.selectRepository(selectedRepository.id());core.selectChangeSet(null);reloadChangeSets(null,false);}
    private void changeSetChanged(){ChangeSetItem item=(ChangeSetItem)changeSets.getSelectedItem();Core.ChangeSet next=item==null?null:item.value;if(next==null){selectedChangeSet=null;core.selectChangeSet(null);clearChangeSetFields();updateReopenButton();return;}if(allRepositories.isSelected()){Core.RepositoryConfig repo=core.findRepositoryForChangeSet(next.changeSetId);if(repo==null){appendToOutput(next.changeSetId,"[REPOSITORY_MISMATCH] ChangeSet Repository Target is unavailable: "+next.changeSetId);loading=true;changeSets.setSelectedIndex(-1);loading=false;selectedChangeSet=null;clearChangeSetFields();return;}if(selectedRepository==null||!Objects.equals(selectedRepository.id(),repo.id())){int index=findRepositoryIndex(repo.id());if(index<0){appendToOutput(next.changeSetId,"[REPOSITORY_MISMATCH] ChangeSet Repository Target is unavailable: "+next.changeSetId);return;}loading=true;repositories.setSelectedIndex(index);loading=false;selectedRepository=repo;repositoryIdentity.setText(repo.repositoryIdentity());core.selectRepository(repo.id());}}
        selectedChangeSet=next;core.selectChangeSet(selectedChangeSet.changeSetId);showOutputForChangeSet(selectedChangeSet.changeSetId);changeSetId.setText(selectedChangeSet.changeSetId);status.setText(displayLifecycle(selectedChangeSet.status));try{Core.ReviewDiff review=core.currentReview(selectedChangeSet);reviewState.setText(review==null?"No current ReviewDiff — Refresh Review":"Current");}catch(Core.ObsException e){reviewState.setText("Unavailable — Refresh Review");appendToOutput(selectedChangeSet.changeSetId,"WARNING Stored current ReviewDiff is unavailable: "+semanticMessage(e.getMessage()));appendDiagnostic("Restore Current Review",e);}updateReopenButton();refreshChatList();refreshInteractions();}
    private void updateReopenButton(){reopenButton.setVisible(showHistory.isSelected()&&selectedChangeSet!=null&&"Finalized".equals(selectedChangeSet.status));}
    private void clearChangeSet(){loading=true;changeSets.removeAllItems();loading=false;selectedRepository=null;repositoryIdentity.setText("");clearChangeSetFields();}
    private void clearChangeSetFields(){selectedChangeSet=null;changeSetId.setText("");status.setText("");reviewState.setText("");chatDelivery.setText("");loading=true;reviewChats.removeAllItems();loading=false;showOutputForChangeSet(null);updateReopenButton();refreshInteractions();}

    private void addRepository(){JFileChooser c=new JFileChooser();c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)!=JFileChooser.APPROVE_OPTION)return;Path p=c.getSelectedFile().toPath();String def=p.getFileName()==null?p.toString():p.getFileName().toString();String name=JOptionPane.showInputDialog(this,"Display name for this repository:",def);if(name==null)return;Core.RepositoryConfig r=core.registerRepository(name,p);append("SUCCESS Repository registered: "+r.name()+" — "+r.repositoryIdentity());reloadRepositories(r.id(),null);}
    private void removeRepository(){if(selectedRepository==null)return;int result=JOptionPane.showConfirmDialog(this,"Remove '"+selectedRepository.name()+"' from the allowed repository list?","Remove repository",JOptionPane.OK_CANCEL_OPTION);if(result!=JOptionPane.OK_OPTION)return;String id=selectedRepository.id();Core.Settings s=core.removeRepository(id);append("SUCCESS Repository removed from allowlist.");reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}
    private void changeRepositoryLocation(){if(selectedRepository==null)throw new Core.ObsException(Core.REPOSITORY_MISMATCH,"Select a Repository Target first.");String repoId=selectedRepository.id(),csId=selectedChangeSet==null?null:selectedChangeSet.changeSetId;JFileChooser c=new JFileChooser(selectedRepository.path());c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)!=JFileChooser.APPROVE_OPTION)return;try{Core.RepositoryConfig updated=core.changeRepositoryLocation(repoId,c.getSelectedFile().toPath());append("SUCCESS Repository location changed: "+updated.path());reloadRepositories(updated.id(),csId);notifyOperation("Repository location changed",updated.name(),updated.id(),false);}catch(Throwable e){trackedFailure("Change Repository Location",e,repoId,null);}}
    private void saveHandling(){core.setReviewDiffHandling(String.valueOf(handling.getSelectedItem()));append("Settings saved.");}
    private void saveReviewSendRetryInterval(){core.setReviewDiffSendRetrySeconds(((Number)reviewSendRetrySeconds.getValue()).intValue());append("Settings saved.");}
    private void saveReviewChatTitleIgnoredCharacters(){String value=reviewChatTitleIgnoredCharacters.getText(),current=core.getSettings().reviewChatTitleIgnoredCharacters();if(Objects.equals(value,current))return;core.setReviewChatTitleIgnoredCharacters(value);append("Settings saved.");}
    private void copyBridgeToken(){Core.Handoff h=core.copyTextToClipboardVerified(core.chatBridgePairingToken());append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Chat bridge pairing token copied. Paste it once in the OBS ChatGPT Bridge extension options.");}

    private void refreshChatList(){
        String preferred=null;ChatItem selected=(ChatItem)reviewChats.getSelectedItem();if(selected!=null)preferred=selected.value.conversationKey();Core.ChatBinding bound=selectedChangeSet==null?null:core.getReviewChatBinding(selectedChangeSet.changeSetId);if(bound!=null)preferred=bound.conversationKey();
        loading=true;reviewChats.removeAllItems();for(Core.ChatConversation c:core.getOpenChatConversations())reviewChats.addItem(new ChatItem(c));if(preferred!=null)for(int i=0;i<reviewChats.getItemCount();i++)if(reviewChats.getItemAt(i).value.conversationKey().equals(preferred)){reviewChats.setSelectedIndex(i);break;}loading=false;updateChatDelivery();
    }
    private void updateChatDelivery(){if(selectedChangeSet==null){chatDelivery.setText("");return;}chatDelivery.setText(core.chatDeliveryStatus(selectedChangeSet.changeSetId));}
    private void bindReviewChat(){if(selectedChangeSet==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Select a ChangeSet first.");String cs=selectedChangeSet.changeSetId;ChatItem item=(ChatItem)reviewChats.getSelectedItem();if(item==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"No open ordinary ChatGPT conversation is selected.");Core.ChatBinding b=core.bindReviewChat(cs,item.value.conversationKey());appendToOutput(cs,"SUCCESS Review chat bound for this ChangeSet: "+b.title()+". Existing ReviewDiff was not sent automatically.");updateChatDelivery();}
    private void unbindReviewChat(){if(selectedChangeSet==null)return;String cs=selectedChangeSet.changeSetId;core.unbindReviewChat(cs);appendToOutput(cs,"SUCCESS Review chat unbound from ChangeSet.");updateChatDelivery();}
    private void openBoundChat(){if(selectedChangeSet==null)return;Core.ChatBinding b=core.getReviewChatBinding(selectedChangeSet.changeSetId);if(b==null)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"No ChatGPT conversation is bound to this ChangeSet.");try{if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.BROWSE))throw new IOException("Desktop Browse is not supported");Desktop.getDesktop().browse(URI.create(b.url()));}catch(Exception e){throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Cannot open bound ChatGPT conversation: "+e.getMessage(),e);}}
    static String reviewDeliveryOutput(Core.ChatTaskInfo t){String destination=t.conversationTitle()+" · "+t.taskId().substring(0,8);return switch(t.status()){case "Pending"->"WAITING ReviewDiff queued for ChatGPT; waiting for the bound ChatGPT tab to claim it: "+destination;case "Claimed"->"DELIVERING ReviewDiff is claimed by the bound ChatGPT tab: "+destination;case "Preparing"->"DELIVERING ReviewDiff is preparing in ChatGPT: "+destination;case "SendClicked"->"SENDING ReviewDiff send attempt is in progress: "+destination;default->"ReviewDiff delivery "+t.status()+": "+destination;};}
    private void sendCurrentReviewToChat(){if(selectedChangeSet==null||requireCurrentReview()==null)return;String repoId=selectedRepository==null?null:selectedRepository.id(),cs=selectedChangeSet.changeSetId;try{Core.ChatTaskInfo t=core.sendCurrentReviewToChat(cs);if("NoChanges".equals(t.status())){appendToOutput(cs,"SUCCESS Current Change is empty; no ChatGPT message was sent.");core.recordOperationOutcome(cs,"SUCCESS",Core.SUCCESS,"No current change to send.");notifyOperation("Current Change · No changes","No ChatGPT message was sent.",repoId,false);}else appendToOutput(cs,reviewDeliveryOutput(t));updateChatDelivery();refreshInteractions();}catch(Throwable e){trackedFailure("Deliver Current Change",e,repoId,cs);}}
    private void refreshInteractions(){Core.ExternalInteraction selected=interactions.getSelectedItem() instanceof InteractionItem ii?ii.value:null;String keep=selected==null?null:selected.interactionId();loading=true;interactions.removeAllItems();for(Core.ExternalInteraction x:core.getExternalInteractions())interactions.addItem(new InteractionItem(x));if(keep!=null)for(int i=0;i<interactions.getItemCount();i++)if(interactions.getItemAt(i).value.interactionId().equals(keep)){interactions.setSelectedIndex(i);break;}loading=false;}
    private void cancelInteraction(){InteractionItem item=(InteractionItem)interactions.getSelectedItem();if(item==null)return;if(!item.value.cancellable())throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Selected interaction cannot be cancelled truthfully in state "+item.value.state()+".");Core.ExternalInteraction result=core.cancelExternalInteraction(item.value.interactionId());append("SUCCESS "+result.state()+" · "+(result.message()==null?"":result.message()));refreshInteractions();}
    private void dismissInteraction(){InteractionItem item=(InteractionItem)interactions.getSelectedItem();if(item==null)return;if(item.value.cancellable())throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Active interaction must be cancelled, not dismissed.");if(!"UnknownAfterSend".equals(item.value.state()))throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Selected interaction does not require acknowledgement/dismissal in state "+item.value.state()+".");Core.ExternalInteraction result=core.dismissExternalInteraction(item.value.interactionId());append("ACKNOWLEDGED "+result.state()+" · interaction hidden from the working list; terminal truth retained.");refreshInteractions();}

    private void exportRepositorySnapshot(){
        Path repository=repoPath();Core.RepositoryConfig repositoryTarget=selectedRepository;
        JComboBox<String> mode=new JComboBox<>(new String[]{"Local working tree + diff","Committed snapshot"});
        JTextField commit=new JTextField("HEAD",32);
        JTextField destination=new JTextField(RepositorySnapshotExporter.defaultOutputDirectory().toString(),32);
        JButton browse=new JButton("Browse");browse.addActionListener(e->chooseDirectory(destination));
        JPanel destinationRow=new JPanel(new BorderLayout(6,0));destinationRow.add(destination,BorderLayout.CENTER);destinationRow.add(browse,BorderLayout.EAST);
        JComboBox<ChatItem> snapshotChat=new JComboBox<>();for(Core.ChatConversation c:core.getOpenChatConversations())snapshotChat.addItem(new ChatItem(c));
        JPanel panel=new JPanel();panel.setLayout(new BoxLayout(panel,BoxLayout.Y_AXIS));
        panel.add(new JLabel("Repository: "+repositoryTarget.name()+"  ["+repositoryTarget.repositoryIdentity()+"]"));
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Mode"));panel.add(mode);
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Commit / ref (Committed mode)"));panel.add(commit);
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("Destination directory"));panel.add(destinationRow);
        panel.add(Box.createVerticalStrut(8));panel.add(new JLabel("ChatGPT conversation (used by attach options)"));panel.add(snapshotChat);
        panel.add(new JLabel(snapshotChat.getItemCount()==0?"No open ordinary ChatGPT conversations are currently visible; Export only is still available.":"Choose the destination before export. This does not change the ChangeSet Review chat binding."));
        Runnable updateCommit=()->commit.setEnabled(mode.getSelectedIndex()==1);mode.addActionListener(e->updateCommit.run());updateCommit.run();
        Object[] options={"Export only","Export + Attach","Export + Attach + Send","Cancel"};
        int choice=JOptionPane.showOptionDialog(this,panel,"Repository Snapshot",JOptionPane.DEFAULT_OPTION,JOptionPane.PLAIN_MESSAGE,null,options,options[0]);
        if(choice<0||choice==3)return;boolean attachAfterExport=choice==1||choice==2,sendAfterAttach=choice==2;ChatItem chosenChat=attachAfterExport?(ChatItem)snapshotChat.getSelectedItem():null;
        if(attachAfterExport&&chosenChat==null){JOptionPane.showMessageDialog(this,"No open ordinary ChatGPT conversation is available. Open the intended chat, then reopen Repository Snapshot.",sendAfterAttach?"Export + Attach + Send":"Export + Attach",JOptionPane.WARNING_MESSAGE);return;}
        String snapshotConversationKey=chosenChat==null?null:chosenChat.value.conversationKey();String snapshotConversationTitle=chosenChat==null?null:chosenChat.value.title();
        String selectedMode=mode.getSelectedIndex()==0?"local":"committed";
        String commitRef=selectedMode.equals("committed")?commit.getText().trim():null;
        Path out=destination.getText().isBlank()?RepositorySnapshotExporter.defaultOutputDirectory():Path.of(destination.getText().trim());
        String repositoryId=repositoryTarget.id();append("INFO Exporting Repository Snapshot"+(snapshotConversationKey==null?"…":" for ChatGPT conversation "+snapshotConversationTitle+"…"));
        runBackground("Repository Snapshot",()->{
            Core.SnapshotExportResult export=core.exportRepositorySnapshot(repository,selectedMode,commitRef,out);
            if(snapshotConversationKey==null)return new SnapshotOperationResult(export,null,null);
            try{return new SnapshotOperationResult(export,core.attachSnapshotToChat(export.zipPath(),snapshotConversationKey,sendAfterAttach),null);}
            catch(Throwable attachmentError){return new SnapshotOperationResult(export,null,attachmentError);}
        },operation->{Core.SnapshotExportResult r=operation.export();append("SUCCESS Repository snapshot created: "+r.zipPath().toAbsolutePath().normalize());notifyOperation("Repository snapshot created",r.zipPath().getFileName().toString(),repositoryId,false);if(attachAfterExport){snapshotHandoffState(operation,snapshotConversationTitle,repositoryId);return;}Core.Handoff clip=core.copyPathToClipboard(r.zipPath());if(clip.warning()!=null&&!clip.warning().isBlank())append("WARNING Snapshot created, but path was not copied to clipboard: "+clip.warning());else append("SUCCESS Snapshot path copied to clipboard.");showSnapshotResult(r,clip);},e->trackedFailure("Export Repository Snapshot",e,repositoryId,null));
    }

    private record SnapshotOperationResult(Core.SnapshotExportResult export,Core.ChatTaskInfo attachment,Throwable attachmentError){}

    private String snapshotHandoffState(SnapshotOperationResult operation,String selectedTitle,String repositoryId){
        if(operation.attachment()==null&&operation.attachmentError()==null)return "ChatGPT attachment: not requested.";
        if(operation.attachment()!=null){String state=operation.attachment().autoSend()?"ChatGPT attachment + Send queued for "+operation.attachment().conversationTitle()+".":"ChatGPT attachment queued for "+operation.attachment().conversationTitle()+". The extension will attach it but will not send the message.";append("SUCCESS "+state);refreshInteractions();return state;}
        Throwable e=operation.attachmentError();String summary=semanticMessage(message(e)),state="Snapshot exported, but ChatGPT attachment was not started for "+selectedTitle+": "+summary;append("WARNING "+state);appendDiagnostic("Attach Repository Snapshot",e);notifyOperation("ChatGPT snapshot handoff not started",summary,repositoryId,true);return state;
    }

    private void showSnapshotResult(Core.SnapshotExportResult r,Core.Handoff clipboard){
        String path=r.zipPath().toAbsolutePath().normalize().toString();
        String copyState=clipboard.warning()!=null&&!clipboard.warning().isBlank()?"Clipboard warning: "+clipboard.warning():"Path copied to clipboard.";
        Object[] options={"Copy path","Open folder","Close"};
        int selected=JOptionPane.showOptionDialog(this,"Snapshot created:\n"+path+"\n\n"+copyState,"Repository Snapshot",JOptionPane.DEFAULT_OPTION,JOptionPane.INFORMATION_MESSAGE,null,options,options[2]);
        if(selected==0){Core.Handoff h=core.copyPathToClipboard(r.zipPath());append(h.warning()!=null&&!h.warning().isBlank()?"ERROR "+h.warning():"SUCCESS Snapshot path copied to clipboard.");}
        if(selected==1){Path folder=r.zipPath().toAbsolutePath().normalize().getParent();if(folder==null){append("ERROR Snapshot output folder is unavailable.");return;}if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.OPEN)){append("ERROR Desktop Open is not supported on this system.");return;}try{Desktop.getDesktop().open(folder.toFile());append("SUCCESS Snapshot folder opened: "+folder);}catch(IOException e){append(withTechnicalDetails("ERROR Cannot open snapshot folder: "+message(e),e));}}
    }

    private Path repoPath(){if(selectedRepository==null)throw new Core.ObsException(Core.REPOSITORY_MISMATCH,"Select or add an allowed repository first.");return Path.of(selectedRepository.path());}
    private void apply(){
        saveHandling();saveReviewChatTitleIgnoredCharacters();
        Path zip=archive.getText().isBlank()?null:Path.of(archive.getText().trim());String actionText=action.getText(),currentId=selectedRepository==null?null:selectedRepository.id();
        showOperation("INFO Preparing Apply…");
        runBackground("Prepare Apply",()->core.prepareApply(actionText,zip,currentId),prepared->continuePreparedApply(prepared,currentId),e->trackedFailure("Apply",e,currentId,null));
    }

    private void applyWithPolling(){
        saveHandling();saveReviewChatTitleIgnoredCharacters();
        Path zip=archive.getText().isBlank()?null:Path.of(archive.getText().trim());String actionText=action.getText(),currentId=selectedRepository==null?null:selectedRepository.id();
        showOperation("INFO Waiting up to 12 seconds for replacement ZIP…");
        runBackground("Prepare Apply (wait for ZIP)",()->prepareApplyWithPolling(actionText,zip,currentId),prepared->continuePreparedApply(prepared,currentId),e->trackedFailure("Apply",e,currentId,null));
    }

    private Core.PreparedApply prepareApplyWithPolling(String actionText,Path zip,String currentId)throws Exception{
        long deadline=System.nanoTime()+java.util.concurrent.TimeUnit.MILLISECONDS.toNanos(APPLY_ZIP_POLL_MAX_MS);Core.ObsException lastMissing=null;
        while(true){
            try{return core.prepareApply(actionText,zip,currentId);}
            catch(Core.ObsException e){
                if(!Core.PACKAGE_NOT_FOUND.equals(e.code))throw e;lastMissing=e;long remaining=deadline-System.nanoTime();
                if(remaining<=0)throw new Core.ObsException(Core.PACKAGE_NOT_FOUND,"Replacement package did not become available within 12 seconds. "+semanticMessage(message(lastMissing)));
                java.util.concurrent.TimeUnit.NANOSECONDS.sleep(Math.min(java.util.concurrent.TimeUnit.MILLISECONDS.toNanos(APPLY_ZIP_POLL_INTERVAL_MS),remaining));
            }
        }
    }

    private void continuePreparedApply(Core.PreparedApply prepared,String initialRepositoryId){
        String csId=preparedChangeSetId(prepared);beginPreparedApplyOutput(prepared);
        try{
            for(Core.OperationNotice notice:prepared.notices())appendToOutput(csId,notice.level()+" "+notice.code()+" · "+notice.message());
            Core.ApplyTargetResolution resolution=prepared.targetResolution();Core.RepositoryConfig target=resolution.target();
            if(target==null){JComboBox<RepositoryItem> choices=new JComboBox<>();for(Core.RepositoryConfig r:resolution.candidates())choices.addItem(new RepositoryItem(r));int selected=JOptionPane.showConfirmDialog(this,choices,"Select concrete Repository Target",JOptionPane.OK_CANCEL_OPTION,JOptionPane.PLAIN_MESSAGE);if(selected!=JOptionPane.OK_OPTION){appendToOutput(csId,"INFO Apply cancelled before repository mutation.");return;}RepositoryItem item=(RepositoryItem)choices.getSelectedItem();if(item==null){appendToOutput(csId,"INFO Apply cancelled before repository mutation.");return;}target=item.value;}
            if(selectedRepository==null||!Objects.equals(selectedRepository.id(),target.id())){reloadRepositories(target.id(),null);showOutputForChangeSet(csId);appendToOutput(csId,"✓ Repository selected: "+target.name());}
            Core.ReviewChatBindingDecision decision=reviewChatDecision(prepared);
            if(decision==null){appendToOutput(csId,"INFO Apply cancelled before repository mutation.");return;}
            Core.AuthorizedApply authorized=core.authorizeApply(prepared,target.id(),decision);Core.RepositoryConfig selectedTarget=target;
            showOutputForChangeSet(csId);appendToOutput(csId,"INFO Applying prepared package…");
            runBackground("Apply",()->core.executeApply(authorized),r->completeApply(r,selectedTarget),e->trackedFailure("Apply",e,selectedTarget.id(),csId));
        }catch(Throwable e){trackedFailure("Apply",e,initialRepositoryId,csId);}
    }

    private Core.ReviewChatBindingDecision reviewChatDecision(Core.PreparedApply prepared){
        Core.ReviewChatBindingPlan plan=prepared.reviewChatPlan();
        if(plan.kind()==Core.ReviewChatPlanKind.UNBOUND_UNIQUE)return Core.ReviewChatBindingDecision.USE_HINT;
        if(plan.kind()==Core.ReviewChatPlanKind.SAME_AS_EXISTING)return Core.ReviewChatBindingDecision.KEEP_EXISTING;
        if(plan.kind()!=Core.ReviewChatPlanKind.REBIND_REQUIRED)return Core.ReviewChatBindingDecision.NONE;
        String current=plan.existingBinding()==null?"<none>":plan.existingBinding().title()+" ["+plan.existingBinding().conversationKey()+"]";
        String requested=plan.requestedConversation()==null?plan.requestedTitle():plan.requestedConversation().title()+" ["+plan.requestedConversation().conversationKey()+"]";
        String text="This ChangeSet is already bound to a different Review chat.\n\nCurrent:\n"+current+"\n\nRequested by OBS-ACTION:\n"+requested+"\n\nChoose how this Apply should proceed."+(prepared.notices().isEmpty()?"":"\n\nWarnings are recorded in Output.");
        if(!plan.rebindSafe()){Object[] options={"Apply without rebind","Cancel"};int choice=JOptionPane.showOptionDialog(this,text+"\n\nRebind is currently unavailable: "+plan.rebindBlockReason(),"Review chat binding",JOptionPane.DEFAULT_OPTION,JOptionPane.WARNING_MESSAGE,null,options,options[0]);return choice==0?Core.ReviewChatBindingDecision.KEEP_EXISTING:null;}
        Object[] options={"Apply without rebind","Apply and rebind","Cancel"};int choice=JOptionPane.showOptionDialog(this,text,"Review chat binding",JOptionPane.DEFAULT_OPTION,JOptionPane.QUESTION_MESSAGE,null,options,options[0]);if(choice==0)return Core.ReviewChatBindingDecision.KEEP_EXISTING;if(choice==1)return Core.ReviewChatBindingDecision.USE_HINT;return null;
    }

    private void completeApply(Core.ApplyResult r,Core.RepositoryConfig target){
        String cs=r.changeSet().changeSetId;appendToOutput(cs,"SUCCESS Apply. ReviewDiff is current.");if(r.diagnostic()!=null&&!r.diagnostic().isBlank())appendToOutput(cs,"WARNING "+r.diagnostic());if(r.attempt().handoffWarning!=null&&!r.attempt().handoffWarning.isBlank())appendToOutput(cs,"WARNING "+r.attempt().handoffWarning);reloadChangeSets(cs);notifyOperation("Apply succeeded",r.changeSet().changeSetLabel,target.id(),false);
    }
    private void refreshReview(){if(selectedChangeSet==null)throw new Core.ObsException(Core.STATE_DIVERGED,"Select a ChangeSet first.");String cs=selectedChangeSet.changeSetId,repo=selectedRepository==null?null:selectedRepository.id();appendToOutput(cs,"INFO Refreshing ReviewDiff…");runBackground("Refresh Review",()->core.refreshReview(cs),r->appendToOutput(cs,"SUCCESS ReviewDiff refreshed: "+r.diffPath()),e->trackedFailure("Refresh Review",e,repo,cs));}
    private Core.ReviewDiff requireCurrentReview(){if(selectedChangeSet==null)return null;String cs=selectedChangeSet.changeSetId;Core.ChangeSet current=core.getChangeSet(cs);Core.ReviewDiff review=current==null?null:core.currentReview(current);if(review!=null)return review;appendToOutput(cs,"ERROR No current ReviewDiff is available for the selected ChangeSet. Refresh Review first.");return null;}
    private void copyReviewDiff(){Core.ReviewDiff review=requireCurrentReview();if(review==null)return;String cs=selectedChangeSet.changeSetId;Core.Handoff h=core.copyReviewDiffToClipboard(review);if(h.warning()!=null&&!h.warning().isBlank()){appendToOutput(cs,"ERROR "+h.warning());return;}appendToOutput(cs,"SUCCESS ReviewDiff copied to clipboard.");}
    private void openReviewDiff(){Core.ReviewDiff review=requireCurrentReview();if(review==null)return;String cs=selectedChangeSet.changeSetId;Path p=core.verifiedReviewDiffPath(review);if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.OPEN)){appendToOutput(cs,"ERROR Desktop Open is not supported on this system.");return;}try{Desktop.getDesktop().open(p.toFile());appendToOutput(cs,"SUCCESS ReviewDiff opened: "+p);}catch(IOException e){appendToOutput(cs,"ERROR Cannot open ReviewDiff: "+message(e));appendDiagnostic("Open ReviewDiff",e);}}
    private void finalizeChangeSet(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");String cs=selectedChangeSet.changeSetId,repo=selectedRepository.id(),label=selectedChangeSet.changeSetLabel,message=commitMessage.getText();Path repository=repoPath();appendToOutput(cs,"INFO Finalizing ChangeSet…");runBackground("Finalize",()->core.finalizeChangeSet(cs,message,repository),r->{appendToOutput(cs,r.commitSha()==null?"SUCCESS Finalized with no net changes; no commit/push required.":"SUCCESS Finalized commit "+r.commitSha());reloadChangeSets(null);notifyOperation("Finalize succeeded",label,repo,false);},e->{trackedFailure("Finalize",e,repo,cs);reloadChangeSets(cs);});}
    private void retryPush(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");String cs=selectedChangeSet.changeSetId,repo=selectedRepository.id();Path repository=repoPath();appendToOutput(cs,"INFO Retrying Push…");runBackground("Retry Push",()->core.retryPush(cs,repository),r->{appendToOutput(cs,"SUCCESS Retry Push commit "+r.commitSha());reloadChangeSets(null);notifyOperation("Retry Push succeeded","Publication completed",repo,false);},e->{trackedFailure("Retry Push",e,repo,cs);reloadChangeSets(cs);});}
    private void reopenChangeSet(){if(selectedChangeSet==null||!"Finalized".equals(selectedChangeSet.status))throw new Core.ObsException(Core.STATE_DIVERGED,"Select a Finalized ChangeSet from Show History first.");String cs=selectedChangeSet.changeSetId,repo=selectedRepository.id();try{Core.ChangeSet reopened=core.reopenChangeSet(cs);showHistory.setSelected(false);reloadChangeSets(reopened.changeSetId);appendToOutput(cs,"SUCCESS ChangeSet reopened as Active.");notifyOperation("ChangeSet reopened",reopened.changeSetLabel,repo,false);}catch(Throwable e){trackedFailure("Reopen ChangeSet",e,repo,cs);reloadChangeSets(cs);}}

    private static String displayLifecycle(String status){return "CommittedPendingPush".equals(status)?"Publication Pending":status;}
    private record RepositoryItem(Core.RepositoryConfig value){@Override public String toString(){return value.name()+"  ["+value.repositoryIdentity()+"]";}}
    static String changeSetDisplay(Core.ChangeSet value,String repositoryDisplay){String id=value.changeSetId==null?"":value.changeSetId.substring(0,Math.min(8,value.changeSetId.length()));String marker=value.lastOperationStatus!=null&&!"SUCCESS".equals(value.lastOperationStatus)&&!"Finalized".equals(value.status)?" ⚠ "+(value.lastOperationMessage==null?value.lastOperationStatus:value.lastOperationMessage):"";String repo=repositoryDisplay==null||repositoryDisplay.isBlank()?"Repository unavailable":repositoryDisplay;return repo+" · "+value.changeSetLabel+" · "+displayLifecycle(value.status)+" · "+id+marker;}
    private record ChangeSetItem(Core.ChangeSet value,String repositoryDisplay){@Override public String toString(){return changeSetDisplay(value,repositoryDisplay);}}
    private record InteractionItem(Core.ExternalInteraction value){@Override public String toString(){return value.kind()+" · "+value.source()+" → "+value.destination()+" · "+value.state()+(value.message()==null||value.message().isBlank()?"":" · "+value.message());}}
    private record ChatItem(Core.ChatConversation value){@Override public String toString(){return value.title()+" · "+value.tabCount()+" tab"+(value.tabCount()==1?"":"s")+" · "+value.conversationKey().substring(0,Math.min(8,value.conversationKey().length()));}}
}
