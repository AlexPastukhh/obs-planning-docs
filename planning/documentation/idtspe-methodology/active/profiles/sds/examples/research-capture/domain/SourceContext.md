
# SourceContext — Current Domain Owner

Target Module: `TM-DOMAIN-DRAFT`

## Meaning

A value describing enough source identity/context for a captured fragment to remain understandable later.

## Selected Rules

```text
source identity must not be empty
normalization must preserve semantic identity
provider-specific transport fields are not Domain authority
```

## Domain Verification Meaning

Prove value validation/normalization/equality behavior in isolation.

Default proof layer:

```text
unit tests
```

## Methodology Direction

```text
Recommended next:
  testing/domain/SourceContext.test-design.md
```
