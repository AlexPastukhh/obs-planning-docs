package obs.replacementpackage.domain.shared.valueobjects;

import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record RepositoryTargetRef(String value) { public RepositoryTargetRef { value = DomainText.text(value, "repositoryTargetRef"); } }
