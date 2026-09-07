package obs.rpkg.foundation.result;

import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;

/** Typed outcome for an operation whose successful completion has no separate return value. */
public sealed interface OperationResult<E> permits OperationResult.Success, OperationResult.Failure {
    record Success<E>() implements OperationResult<E> {}

    record Failure<E>(E error) implements OperationResult<E> {
        public Failure {
            Objects.requireNonNull(error, "error");
        }
    }

    static <E> OperationResult<E> success() {
        return new Success<>();
    }

    static <E> OperationResult<E> failure(E error) {
        return new Failure<>(error);
    }

    default boolean isSuccess() {
        return this instanceof Success<?>;
    }

    default boolean isFailure() {
        return this instanceof Failure<?>;
    }

    @SuppressWarnings("unchecked")
    default Optional<E> failure() {
        return this instanceof Failure<?> failure
                ? Optional.of((E) failure.error())
                : Optional.empty();
    }

    @SuppressWarnings("unchecked")
    default <R> R fold(Supplier<? extends R> onSuccess, Function<? super E, ? extends R> onFailure) {
        Objects.requireNonNull(onSuccess, "onSuccess");
        Objects.requireNonNull(onFailure, "onFailure");
        if (this instanceof Success<?>) return onSuccess.get();
        return onFailure.apply((E) ((Failure<?>) this).error());
    }

    @SuppressWarnings("unchecked")
    default <F> OperationResult<F> mapFailure(Function<? super E, ? extends F> mapper) {
        Objects.requireNonNull(mapper, "mapper");
        if (this instanceof Failure<?> failure) {
            return OperationResult.failure(mapper.apply((E) failure.error()));
        }
        return OperationResult.success();
    }
}
