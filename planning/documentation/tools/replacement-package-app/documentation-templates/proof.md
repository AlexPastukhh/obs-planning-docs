# Templates — Proof and Acceptance

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-test-item"></a>
## Template — Test Item

```text
### TST-RPKG-<SEMANTIC-NAME> — <readable proof requirement>
Requirement:
<additional condition needed for credible proof>

Reason:
<false-positive / boundary / no-mutation / persistence / isolation / refactor-evolution reason>
```

Do not restate every BI/invariant as a Test Item. Normal proof responsibility is already derived from the owning semantics. Refactor/evolution resilience means proof should remain stable while the property it proves remains unchanged; when an Evolution Step genuinely changes that property, the Test Item/test may legitimately change.

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

Use only when how to prove a selected property credibly is itself non-trivial.

```text
Property / authority:
<BI / invariant / SI/DI / Screen requirement / contract>
Proof layer / public boundary:
...
Setup / action / observation / assertions:
...
False-confidence / no-mutation / isolation considerations:
...
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
