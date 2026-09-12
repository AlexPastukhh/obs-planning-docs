# Requirement Ownership And Natural-Owner Rule

Status: S4 proposed synchronized SDS requirement contract

## Core Rule

A durable Requirement belongs to **exactly one natural semantic/implementation owner**.

```text
Requirement
≠ automatically separate Target
≠ automatically separate file
≠ copied equal authority across several owners
```

There is no baseline `TM-REQUIREMENT`.

## Requirement Families

### Feature Behavior Requirement — `BR-*`

Feature owns durable must-hold behavior.

Canonical `BR-*` text stays with the Feature behavior/branch it constrains when practical. Scenario/Screen/Slice/Domain reference the identity rather than copying canonical prose.

### Scenario journey must-hold

Scenario may own sparse constraints that are genuinely about the whole journey across Features/Screens/contexts.

Fresh R2 sometimes labels these `SR-*`. SDS preserves the semantic meaning but does **not** establish a mandatory target-state `SR-*` Requirement family. Use an addressable local identifier only when independent traceability is useful.

A journey must-hold must not duplicate Feature BR text.

### Domain Implementation Requirement — `IR-DOMAIN-*`

Owns durable implementation constraint whose natural authority is one durable Domain owner.

### Slice Implementation Requirement — `IR-SLICE-*`

Owns durable constraint on one end-to-end Slice responsibility.

### Shared Implementation Requirement — `IR-SHARED-*`

Owns durable constraint natural to one Shared Implementation Capability. It must not duplicate the consumer Slice's `IR-SLICE-*`.

### Proof Requirement — `PFR-*`

Rare owner-local durable non-obvious constraint on **how proof itself must be realized/executed**.

`PFR-*` is not a test catalog and not required merely because a behavior/IR needs proof.

## Other Owner-Local Must-Holds

Application Definition and Screen may own material responsibility/spatial/accessibility/platform must-holds as part of their own selected result. Stable addressability may be added when useful without creating a universal Requirement Target family.

## Discovery

Use `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` when a durable implementation/proof constraint may exist.

Possible outcomes:

```text
KEEP
REFINE / WEAKEN / STRENGTHEN
MERGE
REPLACE DECISION
RETIRE
ADD NEW
REOPEN BEHAVIOR / OWNER / BOUNDARY
ACCEPT RISK WITHOUT NEW REQUIREMENT
no durable output
```

Requirement discovery is non-monotonic and may legitimately produce zero durable Requirements.

## Behavioral Necessity / Relevance

For each proposed/existing IR/PFR ask:

```text
Which selected behavior / journey must-hold / Domain invariant does this protect?
What breaks if it is removed?
Is it durable, or only a current implementation habit?
Can code-level choice solve it without durable Requirement authority?
Does another owner already own it?
Is it stronger than selected behavior needs?
Is it too weak for a known failure class?
Is it relevant only in a rare/unsupported/trusted condition?
Does persistent complexity exceed the risk?
Does known Evolution still justify it?
```

## Rare Cases / Trust / Accepted Risk

Classify material rare cases before creating a Requirement:
- supported normal behavior;
- supported rare edge;
- abnormal but plausible operating condition;
- trusted-environment customization/misconfiguration;
- explicitly unsupported condition;
- outside selected trust boundary;
- host compromise.

Accepted risk does not silently override a Requirement.

If an existing Requirement is knowingly not fully satisfied, state the `PARTIAL / KNOWN EXCEPTION` meaning and rationale or revalidate the upstream contract.

## Reusable Guidance

Reusable `RG-*`, `RR-*` and `RRC-*` are discovery sources, not application authority.

```text
RR-...
→ optional discovery source

IR-...
→ independently approved natural-owner authority
```

No live normative inheritance. Later reusable-guidance edits do not silently mutate existing owner IRs.

Keep reusable-source references only when they have continuing future-discovery value.

## Cross-Owner Meaning

When a must-hold affects several consumers:

```text
identify one natural canonical owner
→ keep canonical statement there
→ consumers reference/derive their local obligations
```

If the constraint is implementation-shared, ask whether a genuine `TM-SHARED-IMPLEMENTATION-CAPABILITY` owns the reusable responsibility.

If no natural durable owner exists, use Core Proposal/Decision/Question/Risk reasoning or revise the owner boundary; do **not** create a standalone Requirement Target solely to avoid making that choice.

## Consumer / Revalidation

When owner Requirement meaning changes:
- identify material consumers;
- revalidate dependent owner-local obligations/bindings/proof;
- do not assume copied text is synchronized;
- preserve stable identity where meaning is refined rather than replaced.

## Guards

```text
one Requirement ≠ one test
Finding ≠ Requirement
reusable RR ≠ owner IR
PFR ≠ expected-test list
shared applicability ≠ duplicated authority
accepted risk ≠ silent Requirement violation
zero durable Requirements = valid result
```
