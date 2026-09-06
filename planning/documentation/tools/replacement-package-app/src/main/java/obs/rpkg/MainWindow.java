package obs.rpkg;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.nio.file.Path;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.function.Consumer;

import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.application.AutomaticPackageRealization;
import obs.rpkg.features.apply.application.CommitAppliedPackage;
import obs.rpkg.features.apply.application.PublishAppliedCommit;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository;
import obs.rpkg.features.apply.infrastructure.GitPublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.work.application.StartWorkWorkspace;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.domain.WorkId;
import obs.rpkg.work.infrastructure.FileGitWorkspaceRepository;

/** Target-only Work-centered UI. Legacy ChangeSet review/finalize surfaces are intentionally retired. */
final class MainWindow extends JFrame {
    private final Core core;
    private final ReplacementPackageStateRepository states;
    private final GitWorkspaceRepository workspaces;
    private final WorkPackageRuntime mechanics;
    private final StartWorkWorkspace startWorkspace;
    private final ApplyReplacementPackage apply;
    private final CommitAppliedPackage commit;
    private final PublishAppliedCommit publish;
    private final AutomaticPackageRealization automatic;

    private Core.RepositoryConfig selectedRepository;
    private final JComboBox<RepositoryItem> repositories = new JComboBox<>();
    private final JTextField repositoryIdentity = new JTextField();
    private final JTextField workId = new JTextField(UUID.randomUUID().toString());
    private final JTextField targetBranch = new JTextField();
    private final JTextField archive = new JTextField();
    private final JTextField packageId = new JTextField();
    private final JTextField operation = new JTextField();
    private final JTextArea action = new JTextArea(7, 72);
    private final JTextArea output = new JTextArea(24, 100);

    MainWindow(Core core) {
        super("OBS Replacement Package App — Work runtime");
        this.core = Objects.requireNonNull(core, "core");
        Path stateRoot = FileReplacementPackageStateRepository.defaultAppStateRoot();
        this.states = new FileReplacementPackageStateRepository(stateRoot);
        this.workspaces = new FileGitWorkspaceRepository(stateRoot);
        this.mechanics = new WorkPackageRuntime(stateRoot);
        this.startWorkspace = new StartWorkWorkspace(mechanics, workspaces, states);
        this.apply = new ApplyReplacementPackage(core, workspaces, states, mechanics);
        this.commit = new CommitAppliedPackage(workspaces, states, mechanics);
        this.publish = new PublishAppliedCommit(workspaces, states, new GitPublicationObserver(), mechanics);
        this.automatic = new AutomaticPackageRealization(core, startWorkspace, apply, commit, publish);

        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setMinimumSize(new Dimension(1080, 760));
        repositoryIdentity.setEditable(false);
        operation.setEditable(false);
        output.setEditable(false);
        build();
        reloadRepositories();
        pack();
        setLocationRelativeTo(null);
    }

    private void build() {
        JPanel root = new JPanel();
        root.setLayout(new BoxLayout(root, BoxLayout.Y_AXIS));
        root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        root.add(row("Repository", repositories, button("Add repository", this::addRepository)));
        root.add(row("Repository identity", repositoryIdentity));
        root.add(row("Work ID", workId, button("New ID", () -> workId.setText(UUID.randomUUID().toString()))));
        root.add(row("Target branch", targetBranch, button("Current branch", this::loadCurrentBranch)));
        root.add(row("Archive ZIP", archive, button("Browse", this::chooseArchive)));
        root.add(row("Package ID", packageId));
        root.add(new JLabel("OBS-ACTION/1:"));
        root.add(new JScrollPane(action));
        root.add(row("",
                button("Run OBS Action", this::runObsAction),
                button("Start workspace", this::startWorkspace),
                button("Apply Package", this::applyPackage),
                button("Commit applied", this::commitPackage),
                button("Publish", () -> publishPackage(false)),
                button("Retry Publish", () -> publishPackage(true))));
        root.add(row("Operation", operation));
        root.add(new JScrollPane(output));
        repositories.addActionListener(e -> repositoryChanged());
        setContentPane(root);
    }

    private JPanel row(String label, Component... components) {
        JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));
        p.add(new JLabel(label));
        for (Component c : components) {
            if (c instanceof JTextField f) f.setPreferredSize(new Dimension(360, f.getPreferredSize().height));
            p.add(c);
        }
        return p;
    }

    private JButton button(String label, Runnable action) {
        JButton b = new JButton(label);
        b.addActionListener(e -> {
            try { action.run(); }
            catch (Throwable t) { fail(label, t); }
        });
        return b;
    }

    private void reloadRepositories() {
        repositories.removeAllItems();
        for (Core.RepositoryConfig repository : core.getRepositories()) repositories.addItem(new RepositoryItem(repository));
        if (repositories.getItemCount() > 0) repositories.setSelectedIndex(0);
        repositoryChanged();
    }

    private void repositoryChanged() {
        RepositoryItem item = (RepositoryItem) repositories.getSelectedItem();
        selectedRepository = item == null ? null : item.value();
        repositoryIdentity.setText(selectedRepository == null ? "" : selectedRepository.repositoryIdentity());
        if (selectedRepository != null && targetBranch.getText().isBlank()) loadCurrentBranch();
    }

    private void addRepository() {
        JFileChooser chooser = new JFileChooser();
        chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
        if (chooser.showOpenDialog(this) != JFileChooser.APPROVE_OPTION) return;
        Core.RepositoryConfig registered = core.registerRepository(null, chooser.getSelectedFile().toPath());
        reloadRepositories();
        for (int i = 0; i < repositories.getItemCount(); i++) {
            if (repositories.getItemAt(i).value().id().equals(registered.id())) repositories.setSelectedIndex(i);
        }
    }

    private void loadCurrentBranch() {
        requireRepository();
        targetBranch.setText(core.currentRepositoryBranch(selectedRepository.id()));
    }

    private void chooseArchive() {
        JFileChooser chooser = new JFileChooser();
        chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
        if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) archive.setText(chooser.getSelectedFile().toPath().toString());
    }

    private void startWorkspace() {
        requireRepository();
        WorkId id = requireWorkId();
        String branch = targetBranch.getText().trim();
        runAsync("Starting Work workspace…",
                () -> startWorkspace.execute(selectedRepository, id, branch),
                result -> {
                    if (result.isFailure()) { append("[WORKSPACE_FAILED] " + result.failure().orElseThrow().message()); return; }
                    var ws = result.success().orElseThrow().workspace();
                    append("SUCCESS Workspace " + ws.workBranch() + " @ " + shortSha(ws.baseCommit()) + " · " + ws.worktree());
                });
    }

    private void applyPackage() {
        WorkId id = requireWorkId();
        Path zip = requireArchive();
        runAsync("Applying package…",
                () -> apply.execute(new ApplyReplacementPackage.Request(zip, id.value())),
                result -> {
                    if (result.isFailure()) { var f=result.failure().orElseThrow(); append("["+f.code()+"] "+f.message()); return; }
                    ReplacementPackageState state=result.success().orElseThrow(); packageId.setText(state.packageIdentity().packageId());
                    append("SUCCESS Package Applied: " + state.packageIdentity().packageId());
                });
    }

    private void commitPackage() {
        WorkId id = requireWorkId();
        String pkg = requirePackageId();
        runAsync("Committing applied package…", () -> commit.execute(id.value(), pkg), result -> {
            if (result.isFailure()) { var f=result.failure().orElseThrow(); append("["+f.code()+"] "+f.message()); return; }
            append("SUCCESS Package committed: " + result.success().orElseThrow().commitSha());
        });
    }

    private void publishPackage(boolean retry) {
        WorkId id = requireWorkId();
        String pkg = requirePackageId();
        runAsync(retry ? "Reconciling / retrying Publish…" : "Publishing package commit…",
                () -> publish.execute(id.value(), pkg), result -> {
                    if (result.isFailure()) { var f=result.failure().orElseThrow(); append("["+f.code()+"] "+f.message()); return; }
                    ReplacementPackageState state=result.success().orElseThrow();
                    String tip = state.publication() instanceof PublicationObservation.ConfirmedTip t ? t.commitSha() : state.commitSha();
                    append("SUCCESS Publication confirmed: " + tip);
                });
    }

    private void runObsAction() {
        String text = action.getText();
        Core.ObsAction parsed = core.parseAction(text);
        if (parsed == null) throw new Core.ObsException(Core.PACKAGE_INVALID, "Paste OBS-ACTION/1 first.");
        if ("create-work-intent".equals(parsed.action())) {
            runAsync("Ensuring Work Intent…", () -> core.executeCreateWorkIntentAction(text),
                    r -> append("SUCCESS Work Intent Issue #" + r.issueNumber() + " · " + r.changeSetId()));
            return;
        }
        if (!"apply-package".equals(parsed.action())) throw new Core.ObsException(Core.PACKAGE_INVALID, "Unsupported OBS-ACTION: " + parsed.action());
        Path explicit = archive.getText().isBlank() ? null : Path.of(archive.getText().trim());
        String selectedId = selectedRepository == null ? null : selectedRepository.id();
        runAsync("Running automatic Work realization…",
                () -> automatic.execute(text, explicit, selectedId),
                result -> {
                    if (result.isFailure()) { var f=result.failure().orElseThrow(); append("["+f.code()+"] "+f.message()); return; }
                    var done=result.success().orElseThrow();
                    workId.setText(done.workspace().workId().value());
                    targetBranch.setText(done.workspace().targetBranch());
                    archive.setText(done.archive().toString());
                    packageId.setText(done.state().packageIdentity().packageId());
                    Core.Handoff receipt = core.copyApplyReceiptToClipboard(new Core.ApplyReceipt(
                            "applied", done.state().packageIdentity().packageId(), done.workspace().workId().value(), null, null));
                    append("SUCCESS Automatic Apply Package is published at " + done.state().commitSha() + ".");
                    if (receipt.warning() != null && !receipt.warning().isBlank()) append("WARNING Apply receipt clipboard: " + receipt.warning());
                    else append("SUCCESS OBS-APPLY-RESULT/1 copied to clipboard.");
                });
    }

    private <T> void runAsync(String progress, ThrowingSupplier<T> work, Consumer<T> success) {
        operation.setText(progress);
        new SwingWorker<T,Void>() {
            @Override protected T doInBackground() throws Exception { return work.get(); }
            @Override protected void done() {
                try { T value=get(); operation.setText("Ready"); success.accept(value); }
                catch (InterruptedException e) { Thread.currentThread().interrupt(); fail(progress, e); }
                catch (ExecutionException e) { fail(progress, e.getCause()==null?e:e.getCause()); }
            }
        }.execute();
    }

    private void requireRepository() {
        if (selectedRepository == null) throw new Core.ObsException(Core.REPOSITORY_SELECTION_REQUIRED, "Select or add a Repository Target.");
    }
    private WorkId requireWorkId() { return new WorkId(workId.getText().trim()); }
    private Path requireArchive() { if (archive.getText().isBlank()) throw new Core.ObsException(Core.PACKAGE_NOT_FOUND, "Select replacement package ZIP."); return Path.of(archive.getText().trim()); }
    private String requirePackageId() { String value=packageId.getText().trim(); if(value.isBlank())throw new Core.ObsException(Core.STATE_DIVERGED,"Package ID is required."); return value; }
    private void append(String message) { output.append(message + System.lineSeparator()); output.setCaretPosition(output.getDocument().getLength()); }
    private void fail(String operationName, Throwable t) { operation.setText("Failed"); append("ERROR " + operationName + ": " + (t.getMessage()==null?t.toString():t.getMessage())); }
    private static String shortSha(String sha) { return sha==null?"":sha.substring(0,Math.min(10,sha.length())); }

    @FunctionalInterface private interface ThrowingSupplier<T> { T get() throws Exception; }
    private record RepositoryItem(Core.RepositoryConfig value) { @Override public String toString(){return value.name()+"  ["+value.repositoryIdentity()+"]";} }
}
