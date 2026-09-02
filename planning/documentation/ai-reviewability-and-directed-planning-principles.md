# AI Reviewability And Directed Planning Principles

Status: active reusable cross-cutting principles owner
Scope: material AI planning/development answers, their review surface, dependency direction and built-in self-recheck. This is not a new planning entity, stage or command family.

## 1. Purpose

Material AI work should be easy for a person to review and should minimize avoidable rediscovery on a second pass.

```text
complete enough candidate picture
→ directed stabilization/review
→ reviewable Key Points
→ built-in recheck
→ answer
```

A short/trivial reply does not need ceremony. Apply these rules proportionally when the answer changes a plan, selects meaning, closes a material planning step, proposes implementation, or contains high-impact conclusions.

## 2. Key Points

A material answer exposes its major conclusions as `Key Points`. A Key Point normally corresponds to a major body section and contains a short but complete statement of the selected/current conclusion.

A reader who scans only Key Points should understand every material conclusion, while supporting evidence/reasoning remains in the body.

Stable `KP-*` IDs are optional and useful mainly for long-lived review/discussion.

## 3. Review Priority

Review Priority expresses the cost/blast radius of being wrong. It is not confidence and not prose complexity.

- **Critical** — an error may change the global/current direction, invalidate several downstream owners/stages or cause expensive broad rework.
- **High** — an error may materially change one major owner/stage or several connected parts of the plan.
- **Normal** — material but mainly local; correction should not substantially change the wider plan.
- **Low** — local, cheaply reversible detail with little downstream effect.

Planning Concern Priority reuses this exact impact semantics as the compact aliases `P0 / Critical`, `P1 / High`, `P2 / Normal`, `P3 / Low`. Do not create another concern-specific impact scale. Concern Priority is distinct from Concern Category, confidence, status and derived Review Order. See `planning-concerns-and-decisions-model.md`.

Use current Requirements/Constraints and evidence-backed Change Pressure/Change Axes when they materially affect impact. Do not raise priority for speculative future possibilities alone.

## 4. Directed Planning

Arrange planning responsibilities by semantic dependency:

```text
upstream meaning
→ downstream realization
```

An upstream stage must be sufficiently correct by its own responsibility before normal handoff. A downstream stage may consume upstream meaning, expose contradiction or supply genuinely new evidence, but must not normally define upstream meaning merely because one implementation route is convenient.

Examples:

```text
Application responsibility
→ Scenario
→ Domain / Rules
→ Slice
→ implementation

Workspace useful result
→ Use Case
→ Domain / Rules
→ Vertical Slice / Realization
→ repository change
```

If later work frequently forces earlier meaning to be redesigned, review the planning structure itself: the earlier completion contract may be too weak, the stage order may be wrong, or responsibility boundaries may be leaking.

## 5. Provisional Whole Picture Vs Selection Order

AI may first build a provisional whole picture to see integration, alternatives and downstream implications. This is discovery, not authority reversal.

```text
provisional whole picture
→ stabilize/review upstream
→ stabilize/review dependent downstream
```

Known later-layer implications may be preserved as provisional/Carry-Forward context. They are not silently finalized before their own review and do not make the later layer the normal author of upstream meaning.

## 6. Built-In Recheck

Before returning a material result, perform two proportional passes.

### Current-Target Recheck

Reconstruct what the current target/scope must answer from the current source/owner rather than merely rereading the draft prose. Check for omissions, contradictions, unsupported assumptions, silently selected unresolved alternatives and incomplete completion criteria.

### Plan / Integration Recheck

Check Critical/High Key Points and the current target/scope against selected upstream/global direction, affected owners, Requirements/Constraints and material change pressure. Confirm that downstream planning realizes rather than silently rewrites upstream meaning.

Quality target:

> Repeating an ordinary recheck of the same current target/scope with no new evidence should normally find no material omission that should have been found before the first answer.

This is a quality objective, not a proof of truth.

## 7. Evidence-Driven Backflow

Backflow is allowed when later work reveals material new evidence, contradiction or infeasibility.

```text
new downstream evidence
→ explicit finding
→ earliest affected upstream owner
→ revise selected meaning
→ dependent downstream review becomes stale
→ rebuild affected downstream work
```

Do not use implementation inconvenience alone as authority to change Scenario/UC/Domain meaning.

## 8. Planning Intent Vs Execution Order

Keep two meanings separate:

```text
Planning dependency direction
= what semantic meaning must be established before dependent planning

Execution order
= how already planned work is intended to be realized/delivered
```

Execution order may be partial: independent work can be parallel and dependencies can be explicit. It must not be used as an excuse to reverse planning authority.

## 9. Critical Review Boundary

`крит` remains an optional explicit adversarial/truth-seeking review of a claim/plan/diff as a hypothesis. It is different from the built-in recheck:

```text
built-in recheck
→ did this answer its selected target/scope correctly and integrate with current direction?

крит
→ is the selected answer/plan itself actually the best supported route under adversarial review?
```

The retired `обс` shortcut is not part of the current reviewability architecture. Former answer Levels 1/2/3 are also not current methodology; useful practices such as truthful checked/not-checked source reporting may still be reused proportionally.

## 10. Do Not

- Do not turn Key Points into a second semantic authority separate from the answer/current owners.
- Do not confuse Review Priority with confidence.
- Do not force Critical/High labels just because a topic is complex.
- Do not make normal downstream work responsible for redesigning upstream meaning.
- Do not hide a real upstream contradiction merely to preserve a linear workflow.
- Do not treat repeated self-review as a substitute for reading the current canonical owner/evidence.

## 11. Current Planning Root / Review Lenses

Before material planning review, establish the semantic owner first:

```text
Need / situation
→ UC / Scenario / semantic owner
→ Current → Target meaning
→ active/residual Planning Concern/Q/R/P only if material; retain material Decision trace separately when useful
```

`Review Order` is a derived lens over attached concerns in the current semantic scope and uses Concern Priority + dependency/blocking/blast-radius/timing; Priority itself reuses the Review Priority semantics above. Key Points are a conclusion-first projection of existing meaning, not a separate UC. Ordinary chat text may request depth/lens/redirection without persistent Focus state.

## 12. Review Audit Boundary

Built-in recheck tries to make the current answer good before return. `UC-REPO-AUDIT-REVIEW` is independently useful when the result itself must report checked files/semantic units, quality/sufficiency, partial/unchecked material and delta versus a prior review. A repeated audit should prefer new value over mechanically replaying already-current sufficient checks.
