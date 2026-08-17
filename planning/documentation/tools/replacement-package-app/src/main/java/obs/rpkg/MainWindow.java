package obs.rpkg;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;
import java.nio.file.*;

final class MainWindow extends JFrame {
    private final Core core;
    private Core.ReviewDiff currentReview;
    private Core.RepositoryConfig selectedRepository;
    private Core.ChangeSet selectedChangeSet;
    private boolean loading;

    private final JComboBox<RepositoryItem> repositories=new JComboBox<>();
    private final JComboBox<ChangeSetItem> changeSets=new JComboBox<>();
    private final JComboBox<String> handling=new JComboBox<>(new String[]{"Clipboard","RepoDiffFile","Both"});
    private final JCheckBox showHistory=new JCheckBox("Show history");
    private final JTextField repositoryIdentity=new JTextField(),archive=new JTextField(),changeSetId=new JTextField(),status=new JTextField(),reviewState=new JTextField(),commitMessage=new JTextField("Finalize ChangeSet");
    private final JTextArea action=new JTextArea(7,60),log=new JTextArea(12,60);

    MainWindow(Core core){super("OBS Replacement Package App — Java 21");this.core=core;setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);setMinimumSize(new Dimension(980,760));for(JTextField f:new JTextField[]{repositoryIdentity,changeSetId,status,reviewState})f.setEditable(false);log.setEditable(false);build();loadState();pack();setLocationRelativeTo(null);}

    private void build(){
        JPanel root=new JPanel();root.setLayout(new BoxLayout(root,BoxLayout.Y_AXIS));root.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
        root.add(row("Repository",repositories,button("Add repository",this::addRepository),button("Remove",this::removeRepository)));
        root.add(row("Repository identity",repositoryIdentity));
        root.add(row("ReviewDiff",handling));
        root.add(row("Archive ZIP",archive,button("Browse",()->chooseFile(archive))));
        root.add(new JLabel("OBS-ACTION/1 (optional when ZIP is selected explicitly):"));root.add(new JScrollPane(action));
        root.add(row("",button("Apply",this::apply)));
        root.add(row("ChangeSet",changeSets,showHistory));
        root.add(row("Status",status));root.add(row("ChangeSet ID",changeSetId));
        root.add(row("Review",reviewState));
        root.add(row("",button("Refresh Review",this::refreshReview),button("Copy ReviewDiff",this::copyReviewDiff),button("Open ReviewDiff",this::openReviewDiff)));
        root.add(row("Commit message",commitMessage));
        root.add(row("",button("Finalize",this::finalizeChangeSet),button("Retry Push",this::retryPush)));
        root.add(new JLabel("Output:"));root.add(new JScrollPane(log));setContentPane(root);
        repositories.addActionListener(e->{if(!loading)repositoryChanged();});
        changeSets.addActionListener(e->{if(!loading)changeSetChanged();});
        showHistory.addActionListener(e->{if(!loading)reloadChangeSets(selectedChangeSet==null?null:selectedChangeSet.changeSetId);});
        handling.addActionListener(e->{if(!loading)saveHandling();});
    }

    private JPanel row(String label,JComponent... cs){JPanel p=new JPanel(new BorderLayout(8,4));if(!label.isBlank())p.add(new JLabel(label),BorderLayout.WEST);JPanel inner=new JPanel();inner.setLayout(new BoxLayout(inner,BoxLayout.X_AXIS));for(JComponent c:cs){inner.add(c);inner.add(Box.createHorizontalStrut(6));}p.add(inner,BorderLayout.CENTER);p.setMaximumSize(new Dimension(Integer.MAX_VALUE,38));return p;}
    private JButton button(String text,Runnable r){JButton b=new JButton(text);b.addActionListener(e->run(text,r));return b;}
    private void run(String label,Runnable r){try{r.run();}catch(Core.ObsException e){append("["+e.code+"] "+e.getMessage());}catch(Exception e){append("ERROR "+e);}}
    private void append(String s){log.append(s+System.lineSeparator());log.setCaretPosition(log.getDocument().getLength());}
    private void chooseFile(JTextField f){JFileChooser c=new JFileChooser();if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}

    private void loadState(){try{Core.Settings s=core.getSettings();loading=true;handling.setSelectedItem(s.reviewDiffHandling());loading=false;reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}catch(Exception e){loading=false;append("Settings warning: "+e.getMessage());}}
    private void reloadRepositories(String selectRepoId,String selectChangeSetId){loading=true;repositories.removeAllItems();for(Core.RepositoryConfig r:core.getRepositories())repositories.addItem(new RepositoryItem(r));selectRepositoryItem(selectRepoId);loading=false;repositoryChanged(selectChangeSetId);}
    private void selectRepositoryItem(String id){if(id!=null)for(int i=0;i<repositories.getItemCount();i++)if(repositories.getItemAt(i).value.id().equals(id)){repositories.setSelectedIndex(i);return;}if(repositories.getItemCount()>0)repositories.setSelectedIndex(0);}
    private void repositoryChanged(){repositoryChanged(null);}
    private void repositoryChanged(String preferredChangeSet){RepositoryItem item=(RepositoryItem)repositories.getSelectedItem();selectedRepository=item==null?null:item.value;repositoryIdentity.setText(selectedRepository==null?"":selectedRepository.repositoryIdentity());if(selectedRepository==null){clearChangeSet();return;}Core.Settings s=core.selectRepository(selectedRepository.id());reloadChangeSets(preferredChangeSet!=null?preferredChangeSet:s.selectedChangeSetId());}
    private void reloadChangeSets(String preferredId){if(selectedRepository==null){clearChangeSet();return;}loading=true;changeSets.removeAllItems();for(Core.ChangeSet cs:core.getChangeSets(selectedRepository.id(),showHistory.isSelected()))changeSets.addItem(new ChangeSetItem(cs));if(preferredId!=null)for(int i=0;i<changeSets.getItemCount();i++)if(changeSets.getItemAt(i).value.changeSetId.equals(preferredId)){changeSets.setSelectedIndex(i);break;}if(changeSets.getSelectedIndex()<0&&changeSets.getItemCount()>0)changeSets.setSelectedIndex(0);loading=false;changeSetChanged();}
    private void changeSetChanged(){ChangeSetItem item=(ChangeSetItem)changeSets.getSelectedItem();selectedChangeSet=item==null?null:item.value;if(selectedChangeSet==null){core.selectChangeSet(null);clearChangeSetFields();return;}core.selectChangeSet(selectedChangeSet.changeSetId);changeSetId.setText(selectedChangeSet.changeSetId);status.setText(selectedChangeSet.status);try{currentReview=core.currentReview(selectedChangeSet);reviewState.setText(currentReview==null?"No current ReviewDiff — Refresh Review":"Current");}catch(Core.ObsException e){currentReview=null;reviewState.setText("Unavailable — Refresh Review");append("WARNING Stored current ReviewDiff is unavailable: "+e.getMessage());}}
    private void clearChangeSet(){loading=true;changeSets.removeAllItems();loading=false;selectedRepository=null;repositoryIdentity.setText("");clearChangeSetFields();}
    private void clearChangeSetFields(){selectedChangeSet=null;currentReview=null;changeSetId.setText("");status.setText("");reviewState.setText("");}

    private void addRepository(){JFileChooser c=new JFileChooser();c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)!=JFileChooser.APPROVE_OPTION)return;Path p=c.getSelectedFile().toPath();String def=p.getFileName()==null?p.toString():p.getFileName().toString();String name=JOptionPane.showInputDialog(this,"Display name for this repository:",def);if(name==null)return;Core.RepositoryConfig r=core.registerRepository(name,p);append("SUCCESS Repository registered: "+r.name()+" — "+r.repositoryIdentity());reloadRepositories(r.id(),null);}
    private void removeRepository(){if(selectedRepository==null)return;int result=JOptionPane.showConfirmDialog(this,"Remove '"+selectedRepository.name()+"' from the allowed repository list?","Remove repository",JOptionPane.OK_CANCEL_OPTION);if(result!=JOptionPane.OK_OPTION)return;String id=selectedRepository.id();Core.Settings s=core.removeRepository(id);append("SUCCESS Repository removed from allowlist.");reloadRepositories(s.selectedRepositoryId(),s.selectedChangeSetId());}
    private void saveHandling(){core.setReviewDiffHandling(String.valueOf(handling.getSelectedItem()));append("Settings saved.");}

    private Path repoPath(){if(selectedRepository==null)throw new Core.ObsException(Core.REPOSITORY_MISMATCH,"Select or add an allowed repository first.");return Path.of(selectedRepository.path());}
    private void apply(){saveHandling();Path zip=archive.getText().isBlank()?null:Path.of(archive.getText().trim());Core.ApplyResult r=action.getText().isBlank()?core.applyPackage(zip,repoPath()):core.applyAction(action.getText(),zip,repoPath());append("SUCCESS Apply. ReviewDiff is current.");if(r.attempt().handoffWarning!=null&&!r.attempt().handoffWarning.isBlank())append("WARNING "+r.attempt().handoffWarning);reloadChangeSets(r.changeSet().changeSetId);}
    private void refreshReview(){if(selectedChangeSet==null)throw new Core.ObsException(Core.STATE_DIVERGED,"Select a ChangeSet first.");Core.ReviewDiff r=core.refreshReview(selectedChangeSet.changeSetId);currentReview=r;reviewState.setText("Current");selectedChangeSet=core.getChangeSet(selectedChangeSet.changeSetId);append("SUCCESS ReviewDiff refreshed: "+r.diffPath());}
    private boolean requireCurrentReview(){if(currentReview!=null)return true;append("ERROR No current ReviewDiff is available for the selected ChangeSet. Refresh Review first.");return false;}
    private void copyReviewDiff(){if(!requireCurrentReview())return;Core.Handoff h=core.copyReviewDiffToClipboard(currentReview);if(h.warning()!=null&&!h.warning().isBlank()){append("ERROR "+h.warning());return;}append("SUCCESS ReviewDiff copied to clipboard.");}
    private void openReviewDiff(){if(!requireCurrentReview())return;Path p=core.verifiedReviewDiffPath(currentReview);if(!Desktop.isDesktopSupported()||!Desktop.getDesktop().isSupported(Desktop.Action.OPEN)){append("ERROR Desktop Open is not supported on this system.");return;}try{Desktop.getDesktop().open(p.toFile());append("SUCCESS ReviewDiff opened: "+p);}catch(IOException e){append("ERROR Cannot open ReviewDiff: "+e.getMessage());}}
    private void finalizeChangeSet(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");Core.FinalizeResult r=core.finalizeChangeSet(selectedChangeSet.changeSetId,commitMessage.getText(),repoPath());append(r.commitSha()==null?"SUCCESS Finalized with no net changes; no commit/push required.":"SUCCESS Finalized commit "+r.commitSha());reloadChangeSets(null);}
    private void retryPush(){if(selectedChangeSet==null)throw new Core.ObsException(Core.FINALIZE_FAILED,"Select a ChangeSet first.");Core.FinalizeResult r=core.retryPush(selectedChangeSet.changeSetId,repoPath());append("SUCCESS Retry Push commit "+r.commitSha());reloadChangeSets(null);}

    private record RepositoryItem(Core.RepositoryConfig value){@Override public String toString(){return value.name()+"  ["+value.repositoryIdentity()+"]";}}
    private record ChangeSetItem(Core.ChangeSet value){@Override public String toString(){String id=value.changeSetId==null?"":value.changeSetId.substring(0,Math.min(8,value.changeSetId.length()));return value.changeSetLabel+" · "+value.status+" · "+id;}}
}
