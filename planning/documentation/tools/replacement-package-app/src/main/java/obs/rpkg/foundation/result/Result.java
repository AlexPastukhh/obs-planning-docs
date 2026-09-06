package obs.rpkg.foundation.result;

import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

/** Minimal dependency-free typed operation result. */
public sealed interface Result<T, E> permits Result.Success, Result.Failure {
    record Success<T, E>(T value) implements Result<T, E> {
        public Success {
            Objects.requireNonNull(value, "value");
        }
    }

    record Failure<T, E>(E error) implements Result<T, E> {
        public Failure {
            Objects.requireNonNull(error, "error");
        }
    }

    static <T, E> Result<T, E> success(T value) {
        return new Success<>(value);
    }

    static <T, E> Result<T, E> failure(E error) {
        return new Failure<>(error);
    }

    default boolean isSuccess() {
        return this instanceof Success<?, ?>;
    }

    default boolean isFailure() {
        return this instanceof Failure<?, ?>;
    }

    @SuppressWarnings("unchecked")
    default Optional<T> success() {
        return this instanceof Success<?, ?> success
                ? Optional.of((T) success.value())
                : Optional.empty();
    }

    @SuppressWarnings("unchecked")
    default Optional<E> failure() {
        return this instanceof Failure<?, ?> failure
                ? Optional.of((E) failure.error())
                : Optional.empty();
    }

    @SuppressWarnings("unchecked")
    default <R> R fold(
            Function<? super T, ? extends R> onSuccess,
            Function<? super E, ? extends R> onFailure) {
        Objects.requireNonNull(onSuccess, "onSuccess");
        Objects.requireNonNull(onFailure, "onFailure");
        if (this instanceof Success<?, ?> success) {
            return onSuccess.apply((T) success.value());
        }
        return onFailure.apply((E) ((Failure<?, ?>) this).error());
    }

    @SuppressWarnings("unchecked")
    default <U> Result<U, E> map(Function<? super T, ? extends U> mapper) {
        Objects.requireNonNull(mapper, "mapper");
        if (this instanceof Success<?, ?> success) {
            return Result.success(mapper.apply((T) success.value()));
        }
        return Result.failure((E) ((Failure<?, ?>) this).error());
    }

    @SuppressWarnings("unchecked")
    default <F> Result<T, F> mapFailure(Function<? super E, ? extends F> mapper) {
        Objects.requireNonNull(mapper, "mapper");
        if (this instanceof Failure<?, ?> failure) {
            return Result.failure(mapper.apply((E) failure.error()));
        }
        return Result.success((T) ((Success<?, ?>) this).value());
    }
}
