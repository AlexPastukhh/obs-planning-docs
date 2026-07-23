# Direction Registry Template

Status: active reusable recommended template
Doc version: v0.1.0-semantic-direction-registry
Purpose: exact recommended shape for root, reusable-family or project-local Direction Registries.

## 1. Registry Identity

| Field | Value |
|---|---|
| Registry ID | <ID> |
| Registry level | root / reusable family / project-local area |
| Status | active / provisional / deferred / superseded |
| Parent registry | <reference or none> |
| Scope | <scope> |
| Owner | <file/area> |

## 2. Authority

```text
This registry owns:
  <semantic Direction entries owned here>;

This registry references:
  <child/local registries>;

This registry does not own:
  command routing;
  complete workflow bodies;
  runtime implementation;
  helper projection.
```

## 3. Registry Index

| Direction ID | Semantic name | Status | Complete owner | Child Use-Case Registry | Related root Direction |
|---|---|---|---|---|---|
| <DIR-ID> | <name> | <status> | <reference> | <reference> | <reference or —> |

## 4. Direction Entry

### <DIR-ID> — <Semantic Direction Name>

#### Status And Ownership

| Field | Value |
|---|---|
| Status | active / accepted / provisional / deferred / superseded |
| Parent/root Direction | <reference or none> |
| Complete semantic owner | <this registry or referenced registry> |
| Main workflow/area owner | <reference> |
| Child Use-Case Registry | <reference> |
| Implementation status | documented / partial / not implemented / unknown |

#### Purpose

<Why this Direction exists and what result/responsibility it coordinates.>

#### Boundaries / Non-Goals

```text
included:
  <scope>;

excluded:
  <scope>;
```

#### Topology

```text
<use case A>
  → <use case B when required>;

optional:
  <use case C>;

conditional:
  <use case D>;

independently triggered:
  <use case E>;
```

#### Child Use Cases

| Use Case | Role in Direction | Activation | Owner |
|---|---|---|---|
| <reference> | <role> | mandatory / optional / conditional / repeatable / independent | <owner> |

#### Related Directions

| Direction | Relation | Boundary / handoff |
|---|---|---|
| <reference> | parent / child / supports / hands off / alternative | <meaning> |

#### Activation

**Adaptive**

```text
<compact context activation; reread owner when uncertain>
```

**Full**

```text
<always reread registry entry and complete relevant owner route>
```

Direction activation establishes context; it does not execute commands or grant permissions.

#### Open Decisions

| Decision | Status | Conservative fallback |
|---|---|---|
| <decision> | open / deferred | <fallback> |

## 5. Child Registry References

| Registry | Scope | Why separate |
|---|---|---|
| <reference> | <scope> | <ownership reason> |

## 6. Validation

```text
- unique Direction IDs;
- one complete owner per Direction;
- root entries reference rather than copy child bodies;
- topology/optionality explicit;
- use-case references resolve;
- command relationships do not change permissions;
- status does not overstate runtime implementation.
```
