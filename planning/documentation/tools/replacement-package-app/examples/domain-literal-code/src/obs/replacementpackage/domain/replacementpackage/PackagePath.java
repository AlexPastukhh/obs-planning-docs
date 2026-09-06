package obs.replacementpackage.domain.replacementpackage;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record PackagePath(String value) {
        private static final Pattern DRIVE = Pattern.compile("^[A-Za-z]:.*");
        public PackagePath {
            value = DomainText.text(value, "packagePath").replace('\\', '/');
            if (value.startsWith("/") || DRIVE.matcher(value).matches())
                throw new IllegalArgumentException("package path must be repository-relative");
            for (String part : value.split("/")) {
                if (part.isEmpty() || part.equals(".") || part.equals(".."))
                    throw new IllegalArgumentException("unsafe package path");
            }
        }
    }
