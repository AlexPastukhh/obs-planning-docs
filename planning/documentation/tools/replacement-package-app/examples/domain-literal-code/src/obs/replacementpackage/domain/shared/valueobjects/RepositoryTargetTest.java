package obs.replacementpackage.domain.shared.valueobjects;

import java.util.*;
import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.errors.*;
import obs.replacementpackage.domain.testing.*;
import obs.replacementpackage.domain.repositorywork.*;
import obs.replacementpackage.domain.workissue.*;
import obs.replacementpackage.domain.replacementpackage.*;
import obs.replacementpackage.domain.packagereview.*;
import obs.replacementpackage.domain.packageapplication.*;
import obs.replacementpackage.domain.workfinalization.*;
import obs.replacementpackage.domain.snapshotexport.*;
import obs.replacementpackage.domain.externalinteraction.*;

public final class RepositoryTargetTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        RepositoryTargetTest test = new RepositoryTargetTest();
        runner.run("repository_target_keeps_repository_identity_separate_from_registered_local_path", test::repository_target_keeps_repository_identity_separate_from_registered_local_path);
        runner.run("registered_repository_path_must_revalidate_to_the_same_canonical_location_before_local_use", test::registered_repository_path_must_revalidate_to_the_same_canonical_location_before_local_use);
    }

    private void repository_target_keeps_repository_identity_separate_from_registered_local_path() {
        RepositoryTarget target = RepositoryTarget.create(
                repo(), new RegisteredRepositoryPath(new CanonicalPath("/repo")));
        equal(repo(), target.repositoryIdentity());
        equal(new CanonicalPath("/repo"), target.registeredPath().canonicalPath());
        equal(target, new RepositoryTarget(repo(), new RegisteredRepositoryPath(new CanonicalPath("/repo"))));
        notEqual(target, new RepositoryTarget(repo(), new RegisteredRepositoryPath(new CanonicalPath("/other-clone"))));
    }

    private void registered_repository_path_must_revalidate_to_the_same_canonical_location_before_local_use() {
        RepositoryTarget target = RepositoryTarget.create(
                repo(), new RegisteredRepositoryPath(new CanonicalPath("/repo")));
        isTrue(target.requireCurrentLocalPath(new CanonicalPath("/repo")));
        isFalse(target.requireCurrentLocalPath(new CanonicalPath("/other")));
    }
}
