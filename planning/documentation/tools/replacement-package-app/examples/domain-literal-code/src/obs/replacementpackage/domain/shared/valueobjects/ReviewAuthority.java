package obs.replacementpackage.domain.shared.valueobjects;

import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record ReviewAuthority(GitTreeId reviewedTree) { public ReviewAuthority { Objects.requireNonNull(reviewedTree); } }
