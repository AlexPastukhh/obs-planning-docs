# Use-Case Registry Template

Status: active reusable recommended template
Doc version: v0.1.0-semantic-use-case-registry
Purpose: exact recommended shape for reusable-family or project-local semantic Use-Case Registries.

## 1. Registry Identity

| Field | Value |
|---|---|
| Registry ID | <ID> |
| Status | active / provisional / deferred / superseded |
| Parent Direction Registry | <reference> |
| Scope | <scope> |
| Owner | <file/area> |

## 2. Authority

```text
This registry owns:
  complete semantic Use-Case entries;

Workflow/template/area owners own:
  complete repeated behavior and concrete state;

Root UCM owns:
  executable commands and permissions;

Tampermonkey owns:
  projection only.
```

## 3. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Owner route | Related command |
|---|---|---|---|---|---|
| <UC-ID> | <name> | <status> | <DIR-ID> | <reference> | <command/none> |

## 4. Use-Case Entry

### <UC-ID> — <Semantic Use-Case Name>

#### Status And Ownership

| Field | Value |
|---|---|
| Status | active / accepted / provisional / deferred / superseded |
| Parent Direction | <reference> |
| Complete semantic owner | <this registry> |
| Main workflow/template/area owner | <reference> |
| Related command | <UCM command reference or none> |
| Implementation status | documented / partial / not implemented / unknown |

#### Purpose

<Independently useful capability/result.>

#### Trigger / Accepted Input

```text
<trigger/input>
```

#### Result / End State

```text
<understandable result or explicit unresolved/deferred state>
```

#### Boundaries / Non-Goals

```text
included:
  <scope>;

excluded:
  <scope>;
```

#### Topology / Optionality

```text
mandatory internal flow:
  <only when owned by the workflow>;

optional branches:
  <branches>;

repeatability:
  <rule>;

handoffs:
  <explicit boundaries>;
```

#### Owner Route

```text
1. <registry/area entry>;
2. <workflow>;
3. <template>;
4. <project-local owner/source>.
```

#### Supporting Reads

| Source | Why |
|---|---|
| <reference> | <reason> |

#### Command Relationship

```text
command exists:
  yes / no;

when yes:
  UCM owns trigger, English name, output and permissions;

use-case activation:
  establishes context only.
```

#### Activation

**Adaptive**

```text
<use remembered current context when sufficient; reread when uncertain>
```

**Full**

```text
<always reread complete entry and relevant owner route>
```

#### Dependencies / Handoffs

| Target | Relation | Meaning |
|---|---|---|
| <reference> | depends on / optional / hands off / supports / alternative | <meaning> |

#### Open Decisions

| Decision | Status | Conservative fallback |
|---|---|---|
| <decision> | open / deferred | <fallback> |

## 5. Provisional Candidates — Optional

List candidates separately. Do not present them as active Use Cases until the independent trigger/result criterion passes.

## 6. Validation

```text
- unique Use-Case IDs;
- independent trigger/result/value;
- one complete semantic owner;
- workflow body is linked, not copied;
- optionality/dependencies explicit;
- related command exists in UCM before it is claimed;
- registry activation grants no repository permission;
- provisional status remains visible.
```
