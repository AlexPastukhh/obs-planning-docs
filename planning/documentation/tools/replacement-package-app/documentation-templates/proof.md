# Templates — Proof and Acceptance

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-test-item"></a>
## Template — Test Item

```text
### TST-RPKG-<SEMANTIC-NAME> — <readable proof requirement>
Requirement:
<additional durable condition needed for credible proof>

Reason:
<bug-escape / wrong-boundary / no-mutation / persistence / isolation / failure / refactor-evolution reason>

Derived from:
<BI / invariant / Implementation Item / Proof Requirements Discovery finding>

Pattern / rationale:
<optional reusable proof Pattern reference>

Group:
<optional GRP-* when coupled with Implementation/Test Items>
```

Do not restate every BI/invariant as a Test Item. Normal proof responsibility is already derived from owning semantics. Proof Requirements Discovery may separately expose an Implementation Item; the Test Item itself does not own production structure. Use [Template — Item Group](implementation.md#template-item-group) when production/proof Items are one coupled decision.

Refactor/evolution resilience means proof should remain stable while the property it proves remains unchanged; when an Evolution Step genuinely changes that property, the Test Item/test may legitimately change.

---
<a id="template-shared-test-capability"></a>
## Template — Shared Test Capability

Use only for real reusable test machinery/behavior shared by several suites.

```text
# <readable Shared Test Capability>
Responsibility:
...
Consumers:
- <test suite/owner>
Requirements:
<durable reusable test-capability requirements only when useful>
Evolution Impact:
<only when future evolution changes this shared test machinery>
```

Testing policy belongs in Test Strategy, not here.

---
<a id="template-test-design"></a>
## Template — Optional Test Design

Use only when how to prove a selected property credibly remains independently non-trivial after Proof Requirements Discovery.

```text
Property / authority:
<BI / invariant / SI/DI / Screen requirement / contract>
Proof layer / public boundary:
...
Setup / action / observation / assertions:
...
False-confidence / no-mutation / isolation considerations:
...
Requirements Discovery / Pattern refs:
<only when useful>
Decision:
...
```

Embed locally by default; separate only when independently substantial.

---
<a id="template-practical-acceptance"></a>
## Template — Practical Acceptance plan and Evidence

```text
## Acceptance Plan
Target property:
Operator / environment:
Setup:
Action:
Observable evidence:
Pass/fail rule:

## Evidence Campaign
Date/build/environment:
Acceptance plan ref:
Result: PASS | FAIL | STALE
Evidence:
Limitations:
```

A plan is not executed Evidence.

---
