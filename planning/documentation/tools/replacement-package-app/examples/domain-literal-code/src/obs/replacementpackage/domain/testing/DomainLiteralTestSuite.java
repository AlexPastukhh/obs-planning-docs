package obs.replacementpackage.domain.testing;

import obs.replacementpackage.domain.repositorywork.RepositoryWorkTest;
import obs.replacementpackage.domain.workissue.WorkIssueTest;
import obs.replacementpackage.domain.replacementpackage.ReplacementPackageTest;
import obs.replacementpackage.domain.packagereview.PackageReviewTest;
import obs.replacementpackage.domain.packageapplication.PackageApplicationTest;
import obs.replacementpackage.domain.workfinalization.WorkFinalizationTest;
import obs.replacementpackage.domain.snapshotexport.SnapshotExportTest;
import obs.replacementpackage.domain.externalinteraction.ExternalInteractionTest;
import obs.replacementpackage.domain.shared.valueobjects.RepositoryTargetTest;

public final class DomainLiteralTestSuite {
    private DomainLiteralTestSuite() {}

    public static void main(String[] args) {
        DomainTestRunner runner = new DomainTestRunner();
        RepositoryWorkTest.runAll(runner);
        WorkIssueTest.runAll(runner);
        ReplacementPackageTest.runAll(runner);
        PackageReviewTest.runAll(runner);
        PackageApplicationTest.runAll(runner);
        WorkFinalizationTest.runAll(runner);
        SnapshotExportTest.runAll(runner);
        ExternalInteractionTest.runAll(runner);
        RepositoryTargetTest.runAll(runner);
        runner.finish();
    }
}
