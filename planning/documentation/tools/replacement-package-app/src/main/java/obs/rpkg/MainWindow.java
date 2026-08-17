package obs.rpkg;

import javax.swing.*;
import java.awt.*;
import java.nio.file.*;

final class MainWindow extends JFrame {
    private final Core core;
    private final JTextField repo=new JTextField(),archive=new JTextField(),changeSet=new JTextField(),currentSha=new JTextField(),reviewedSha=new JTextField(),commitMessage=new JTextField("Update reviewed ChangeSet");
    private final JTextArea action=new JTextArea(7,60),log=new JTextArea(12,60);
    private final JComboBox<String> handling=new JComboBox<>(new String[]{"Clipboard","RepoDiffFile","Both"});

    MainWindow(Core core){super("OBS Replacement Package App — Java 21");this.core=core;setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);setMinimumSize(new Dimension(900,720));currentSha.setEditable(false);log.setEditable(false);build();loadSettings();pack();setLocationRelativeTo(null);}
    private void build(){JPanel root=new JPanel();root.setLayout(new BoxLayout(root,BoxLayout.Y_AXIS));root.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));root.add(row("Repository",repo,button("Browse",()->chooseDir(repo)),button("Save settings",this::saveSettings)));root.add(row("ReviewDiff",handling));root.add(row("Archive ZIP",archive,button("Browse",()->chooseFile(archive))));root.add(new JLabel("OBS-ACTION/1 (optional when ZIP is selected explicitly):"));root.add(new JScrollPane(action));root.add(row("",button("Apply",this::apply),button("Refresh review",this::refreshReview)));root.add(row("ChangeSet ID",changeSet));root.add(row("Current Review SHA-256",currentSha));root.add(row("Reviewed SHA-256",reviewedSha));root.add(row("Commit message",commitMessage));root.add(row("",button("Finalize",this::finalizeChangeSet),button("Retry Push",this::retryPush)));root.add(new JLabel("Output:"));root.add(new JScrollPane(log));setContentPane(root);}
    private JPanel row(String label,JComponent... cs){JPanel p=new JPanel(new BorderLayout(8,4));if(!label.isBlank())p.add(new JLabel(label),BorderLayout.WEST);JPanel inner=new JPanel();inner.setLayout(new BoxLayout(inner,BoxLayout.X_AXIS));for(JComponent c:cs){inner.add(c);inner.add(Box.createHorizontalStrut(6));}p.add(inner,BorderLayout.CENTER);p.setMaximumSize(new Dimension(Integer.MAX_VALUE,38));return p;}
    private JButton button(String text,Runnable r){JButton b=new JButton(text);b.addActionListener(e->run(text,r));return b;}
    private void run(String label,Runnable r){try{r.run();}catch(Core.ObsException e){append("["+e.code+"] "+e.getMessage());}catch(Exception e){append("ERROR "+e);}}
    private void append(String s){log.append(s+System.lineSeparator());log.setCaretPosition(log.getDocument().getLength());}
    private void chooseDir(JTextField f){JFileChooser c=new JFileChooser();c.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}
    private void chooseFile(JTextField f){JFileChooser c=new JFileChooser();if(c.showOpenDialog(this)==JFileChooser.APPROVE_OPTION)f.setText(c.getSelectedFile().getAbsolutePath());}
    private Path repoPath(){return repo.getText().isBlank()?null:Path.of(repo.getText().trim());}
    private void loadSettings(){try{Core.Settings s=core.getSettings();repo.setText(s.repositoryRoot());handling.setSelectedItem(s.reviewDiffHandling());}catch(Exception e){append("Settings warning: "+e.getMessage());}}
    private void saveSettings(){core.setSettings(repo.getText().trim(),String.valueOf(handling.getSelectedItem()));append("Settings saved.");}
    private void apply(){saveSettings();Path zip=archive.getText().isBlank()?null:Path.of(archive.getText().trim());Core.ApplyResult r=action.getText().isBlank()?core.applyPackage(zip,repoPath()):core.applyAction(action.getText(),zip,repoPath());changeSet.setText(r.changeSet().changeSetId);currentSha.setText(r.review().sha256());reviewedSha.setText("");append("SUCCESS Apply. Review SHA-256: "+r.review().sha256());if(r.attempt().handoffWarning!=null&&!r.attempt().handoffWarning.isBlank())append("WARNING "+r.attempt().handoffWarning);}
    private void refreshReview(){Core.ChangeSet cs=core.getChangeSet(changeSet.getText().trim());if(cs==null)throw new Core.ObsException(Core.STATE_DIVERGED,"Unknown ChangeSet");Core.ReviewDiff r=core.newReviewDiff(cs);currentSha.setText(r.sha256());reviewedSha.setText("");append("Current Review SHA-256: "+r.sha256()+" file="+r.diffPath());}
    private void finalizeChangeSet(){Core.FinalizeResult r=core.finalizeChangeSet(changeSet.getText().trim(),reviewedSha.getText().trim(),commitMessage.getText(),repoPath());append(r.commitSha()==null?"SUCCESS Finalized with no net changes; no commit/push required.":"SUCCESS Finalized commit "+r.commitSha());}
    private void retryPush(){Core.FinalizeResult r=core.retryPush(changeSet.getText().trim(),repoPath());append("SUCCESS Retry Push commit "+r.commitSha());}
}
