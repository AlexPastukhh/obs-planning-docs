# ReviewDiff Semantic Review Workflow

Status: active reusable documentation-layer workflow
Scope: truth-seeking semantic review of a repository ReviewDiff after changes are applied or otherwise presented for review. This workflow does not own ReviewDiff transport, package integrity, application persistence, Git staging, Finalize or commit/push mechanics.

Use with:

```text
planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md
planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md
planning/documentation/idtspe-methodology/active/ai-reviewability/AI-OUTPUT-REVIEWABILITY.md
selected current semantic/documentation/application owners affected by the diff
```

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Finding Disposition`](idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Proposal / Decision Lifecycle`](idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`

Practical example: [`examples/REVIEW-DIFF-PRACTICAL-EXAMPLE.md`](examples/REVIEW-DIFF-PRACTICAL-EXAMPLE.md)

## 1. Core Distinction

```text
ReviewDiff technical integrity
≠
ReviewDiff semantic correctness
```

A diff is evidence of a concrete repository transition. It is not semantic authority and does not prove that the selected change is correct, necessary, complete or well integrated.

## 2. Entry

Use this workflow when a ReviewDiff is pasted, attached, delivered by an application, or otherwise selected for semantic review.

Before concluding:

1. identify the repository/change scope represented by the diff;
2. resolve the applicable Use Case / Scenario / specialized current owner(s);
3. distinguish checked source facts from inference;
4. inspect enough surrounding owner context to judge meaning, not only changed lines.

If the diff or required owners are incomplete, report the missing evidence instead of guessing.

## 3. Finding And Proposal Boundary

Do not manufacture a **material Finding** for every typo or non-material mechanical defect.

```text
non-material typo / mechanical cleanup
→ factual correction
→ no Finding/Proposal ceremony required

material Finding
→ canonical Finding Disposition
→ linked IDTSPE Proposal under the canonical Proposal lifecycle

material unresolved semantic/local choice
→ Proposal review/selection only to the depth justified by the RE route
```

A confirmed problem is not selection authority. Once a problem is admitted as a **material Finding**, its linked Proposal exists even for deterministic `RE-0`; that Proposal records the correction/result route without inventing a new semantic Decision. Proposal persistence remains separate.

### 3A. Finding Resolution Escalation

For each material finding, invoke the canonical [`Finding Disposition Contract`](idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md#6a-resolution-escalation-projection). `RE-0..RE-4` definitions and the Decision-Surface Test are owned **only there**; this ReviewDiff workflow must not maintain a second normative copy.

ReviewDiff adds only review context:

```text
Review Priority
→ blast radius / cost if wrong

Resolution Escalation
→ canonical Finding-disposition projection by reference
```

Route the finding to the smallest correct subject. For target-result findings prefer the affected Unit Resolution when that Unit owns the responsibility; use a Contextual Unit only for a new independently useful bounded local responsibility; use Target Formation/another owner directly when appropriate.

Under USER-gated interaction the next corrective action may still be shown as a Generic AI Proposal (GIP) at any RE category. The GIP presents/references the linked IDTSPE Proposal when one exists; for deterministic `RE-0`, the linked Proposal records the already-implied correction and does not create a new semantic selection/Decision surface.

## 4. Candidate Review For Material Corrective Proposals

For each material corrective Proposal, apply the canonical candidate-review checks proportionally:

```text
Source / Status
Problem / Need
Proposed Answer
Relevance / Expected Effect
Necessity / Better-Route
Possible Proposal Refinements
Local Consistency
Integrated Consistency
Current Conclusion
```

`required check ≠ required populated field`. Do not invent risks, alternatives or refinements when none are material.

The review tests whether the correction deserves implementation; it does not defend a change merely because it already appears in the diff.

### Proposal Semantic Change Impact

Every material corrective Proposal uses the canonical Proposal Semantic Change Impact Review before selection. Review the affected Unit/owner, upstream accepted meaning, Requirement/Source/Evidence/downstream/revalidation/temporal consequences proportionally. If the review newly discovers a material contradiction or owner conflict, surface a Finding Candidate and disposition it normally; known intended impact already stated by the Proposal is not a new Finding automatically.

## 5. Current Review Plan And Finding Propagation

Establish `Current Conclusions` before aggregate delta.

For ReviewDiff output:

```text
Current Plan
= the reviewed repository transition
  plus the currently selected corrective route(s) from this review.
```

`Current Plan` is an output baseline, not an application approval state and not proof that selected corrections have already been applied.

A confirmed defect with one clearly selected correction belongs in `Confirmed Findings` + `Current Conclusions`. It does **not** stay in active `Q/R/P` merely because the correction has not yet been applied; material retained Decision/Q-R-P trace is separate.

Material local findings propagate only as far as needed:

```text
changed line/file finding
→ affected owner / Use Case / Scenario
→ Current Conclusion / selected correction when resolved
→ shared Q/R/P / Q/R/P-Group state only when active/residual relative to Current Plan; retain material answer/Decision trace when useful
→ whole-change conclusion when broader
```

Use these review conclusions when useful:

```text
Fix Recommended
No Change
Needs Evidence
Needs User Decision
```

Ask the user only when a material choice remains unresolved after owner/evidence review. A clearly justified mechanical correction should not be turned into a user question.

When alternatives are material:

```text
materially different Proposals / refinements
→ selected Proposal meaning when one route is justified/selected
→ selected route becomes Current Plan
→ only still-active concerns/alternatives remain in active Q/R/P; selected material decisions may retain trace
```

## 6. Q/R/P

Use [`idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md`](idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md). ReviewDiff does not own a separate Q/R/P lifecycle.

Valid active Q/R/P includes:

```text
evidence needed before a selected correction can be judged safe
material user/product choice still unresolved
residual Risk remaining under the selected correction plan
unresolved owner conflict
material Problem intentionally deferred / accepted limitation
```

When several findings are substantially one resolution surface, group them into one Q/R/P Group rather than listing Question/Risk/Problem as independent concerns. Preserve each member's Type/Priority/Review Category/Status.

For material AI-produced Q/R/P/groups include useful AI review: distinguish checked implications/options from user-owned unknowns; recommend only when evidence is sufficient; do not mark a Decision selected until it is actually selected.

Not active Q/R/P:

```text
confirmation that a selected correction is correct
mechanical fix already selected into Current Conclusions
answered Question with no residual current concern
resolved Problem / eliminated Risk
reasoning note with no current adverse effect
```

However material answer/rationale/Decision relation may remain in retained trace, and a residual Risk/Problem remains active even after the related Question is answered.

Related Proposals reference the canonical Q/R/P or Group ID/location. Do not recreate the old full same-ID Proposal mirror.

If the current review area maintains durable/distributed concerns, update its Q/R/P register/index status/storage/Decision refs consistently. If empty: `No material unresolved issues identified.`

## 7. Potential Simplifications / Better Routes

Use this section only for a material **not-yet-selected** alternative that would change the Current Plan/correction route.

Each unit states:

```text
Current Plan
Candidate Better Route
Change To Current Plan
Why Potentially Better
Status
```

Reference Related Proposal IDs when applicable. Once selected, move the route into Current Conclusions / Current Plan and remove it from this section.

## 7.1 Architecture Work-Cost Regression Check — When Material

For a material implementation diff, ask whether actual code materially changed an important Workspace Understanding/Change/Verify path or representative Application Runtime path. Do not run full architecture ceremony for every diff.

```text
material path changed?
  no → no architecture-cost finding required
  yes → compare expected vs actual:
         understanding / analytical cost
         mutation / evolution cost
         verification / diagnosis / operation cost
         runtime / Scenario cost when applicable
         Architectural Tax / reversibility

→ no concern
  | accepted explicit trade-off
  | architecture correction/review needed
```

Use the canonical Architecture Work-Cost Model and relevant `UC-PLAN-ARCH-*` owner when a real concern appears. A rename/file movement alone is not a regression; increased hidden context, duplicated semantic logic, broader synchronized edits, new verification/migration burden or materially worse runtime behavior can be.

## 8. Required Review Output

For a non-trivial ReviewDiff review, produce a compact reviewable structure:

```text
Checked Scope / Owners
Confirmed Findings
Corrective Proposals / refinements / competing Proposals when material
Current Conclusions / Current Plan
Q/R/P + Q/R/P Groups when material
Retained Decision/Q-R-P trace when material
Potential Simplifications / Better Routes when material
ReviewDiff Verdict
```

Material Proposal-derived concerns keep Related Proposal provenance when useful, but one Q/R/P item/group has one detailed storage location and affected Proposals reference its ID/location.

Allowed whole-diff verdicts:

```text
APPROVABLE
NEEDS CORRECTION
BLOCKED BY MATERIAL DECISION
```

Verdict rules:

```text
APPROVABLE
  → no material unapplied correctness correction remains
    and no material unresolved correctness/ownership issue remains;

NEEDS CORRECTION
  → a material confirmed correction is still absent from the reviewed transition,
    even when active Q/R/P is empty because the correction route is already selected;

BLOCKED BY MATERIAL DECISION
  → a material choice/evidence/authority gap prevents safe selection of the correction/current route.
```

Resolution-escalation guidance for the aggregate verdict:

```text
RE-0 / RE-1 with a known but unapplied correction
→ NEEDS CORRECTION, not BLOCKED merely because USER-gated interaction still requires approval to execute it

RE-2 / RE-4 with unresolved required selection
→ BLOCKED BY MATERIAL DECISION

RE-3
→ revalidate the earliest affected upstream owner
→ BLOCKED only while evidence/authority prevents a safe current route
→ if revalidation resolves one deterministic route, use NEEDS CORRECTION until applied

selected RE-2 / RE-4 route not yet applied
→ NEEDS CORRECTION
```

`APPROVABLE` is a semantic review conclusion only. It does not execute or authorize Replacement Package App Finalize, Git staging, commit or push; those remain explicit user/application actions under their own permissions.

## 9. Boundaries

- Do not treat successful Apply, fingerprint equality or a persisted currentReview as semantic approval.
- Do not require an AI approval flag in application state merely to use this methodology.
- Do not create a parallel ReviewDiff-specific Proposal ontology.
- Do not rewrite historical provenance just to remove old wording.
- Do not silently promote implementation details into accepted architecture.
- Do not approve a diff while a material unapplied correction or unresolved correctness/ownership issue remains hidden.
- Do not use active Q/R/P as a log of selected corrections or completed reasoning; preserve only material retained Q/R/P/Decision trace under the Core owners.

## 10. Scope-Log Handoff When Logging Is Active

A ReviewDiff result changes a scope log only when it adds material semantic meaning such as a confirmed defect, selected correction, changed rationale/constraint or other material clarification.

The next correction replacement package uses the latest log bytes as exact base, appends the material ReviewDiff/correction meaning and an `APPLIED` record for what that package makes true. Do not rewrite older records as though later review knowledge existed earlier.

`APPROVABLE` with no new material meaning is not an action-log event and does not require a closing package solely for the verdict.
