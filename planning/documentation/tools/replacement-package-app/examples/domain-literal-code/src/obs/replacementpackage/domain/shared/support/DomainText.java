package obs.replacementpackage.domain.shared.support;

import java.util.Objects;

public final class DomainText {
    private DomainText() {}

    public static String text(String value, String name) {
        Objects.requireNonNull(value, name);
        if (value.isBlank()) throw new IllegalArgumentException(name + " must not be blank");
        return value;
    }
}
