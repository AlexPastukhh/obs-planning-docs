# Pattern — Entity vs Value Object

**Problem / pressure:** a Domain concept needs clear identity/lifecycle semantics or should instead be defined purely by value.

**Prefer:** Entity when stable identity/lifecycle is semantically required; Value Object when equality/meaning is by value and independent identity adds no meaning.

**Do not apply mechanically:** source classes do not determine Domain type.

**Possible Items:** stable identity/value semantics when concrete realization needs an additional durable requirement.

**Related discovery:** [D2](../../requirements-discovery/implementation/domain.md#d2-identity-value-and-lifecycle).
