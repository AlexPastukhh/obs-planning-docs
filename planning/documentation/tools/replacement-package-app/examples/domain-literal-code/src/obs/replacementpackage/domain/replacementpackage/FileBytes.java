package obs.replacementpackage.domain.replacementpackage;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public final class FileBytes {
        private final byte[] value;
        public FileBytes(byte[] value) {
            Objects.requireNonNull(value);
            this.value = value.clone();
        }
        public static FileBytes utf8(String value) {
            return new FileBytes(Objects.requireNonNull(value).getBytes(StandardCharsets.UTF_8));
        }
        public byte[] value() { return value.clone(); }
        @Override public boolean equals(Object o) {
            return o instanceof FileBytes other && Arrays.equals(value, other.value);
        }
        @Override public int hashCode() { return Arrays.hashCode(value); }
        @Override public String toString() { return "FileBytes[" + value.length + " bytes]"; }
    }
