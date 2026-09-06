package obs.rpkg.work.domain;

import java.util.Objects;

/** Stable correlation identity for one logical work stream. */
public record WorkId(String value) {
    public WorkId {
        Objects.requireNonNull(value, "value");
        value = value.trim();
        if (value.isEmpty()) throw new IllegalArgumentException("workId is required");
        if (!value.matches("[A-Za-z0-9._-]+")) {
            throw new IllegalArgumentException("workId contains characters that cannot be used by deterministic work naming");
        }
    }

    @Override public String toString() { return value; }
}
