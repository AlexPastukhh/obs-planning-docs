# Session State worked example — cold start and two bounded continuation turns

Status: illustrative, synthetic contents; IDs and revisions below belong only to these cases. This is not a mandatory Session directory schema or a second Work Runtime. [Session State Runtime Contract](../session-state-runtime-contract.md) owns physical continuity; Core [Work Record](../../documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md) and [PRS](../../documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md) own semantics. Each fenced block shows the *complete material content for this bounded case*, not a universal file template. `context/` does not exist in any of these cases.

## Case 0 — cold Session State bootstrap and separate archive identities

USER begins one substantive planning turn with no prior Session State. The host allocates `session-state/`, its archive identity and `work-records/TWR-0.md` at S0 before methodology work. The S0 record contains the immutable WR-1…WR-7 kernel and references the exact USER input, Session State location, the current Work Record Principles revision, repository/target `READ_ONLY` authority, Session State `WRITE_ALLOWED` authority, `ContinuationGate: CONTINUE_ALLOWED`, and an `ACCUMULATE` retention rule. There is no accepted Manifest or PRS yet; these are recorded as absent, not invented as pre-existing. The initial archive snapshot carries README navigation and TWR-0/S0 with `Manifest: pending bootstrap`; it is not misrepresented as a completed turn archive.

```text
WR-1 input: I-0 — "Спланируй первое развитие приложения"
WR-2: MANIFEST_BOOTSTRAP_REQUIRED; accepted Manifest absent; PRS absent
WR-3: one bounded subject — initial application development planning
WR-4: SHELL; ContinuationGate = CONTINUE_ALLOWED
WR-5: current owner work; an AI-derived future Manifest remains a Proposal
WR-6: minimal USER-authorized accepted Manifest M-0; candidate refs only in PRS when qualified
WR-7: actual results/gates recorded; Session State archive rematerialized
```

`WORK-MANIFEST.md` M-0 holds only exact USER-selected orientation/current facts; it does not silently accept the AI's candidate development plan. An emerging material Question/Proposal qualifies a bounded `resolution/PRS.md` through its owner. `context/` is absent because no carried contextual file is material. The Session State archive has `WORK-MANIFEST.md` as entry and retains TWR-0 plus material PRS/candidate references. If the USER separately requests a portable SDS Proposal Workspace Archive, it is another ZIP with its own bounded `PRS.md` entry and target-shaped candidate bodies; M-0/TWR-0 point to its identity/basis rather than making the two archives one package.

## Case A — no contextual file and no ceremonial Question

The accepted session state before input is short-horizon. Its current basis is an existing documentation page `DOC-7`, whose link target and applicable owner contract are readable. No material Proposal, Decision or contextual item needs retention.

`WORK-MANIFEST.md` — accepted revision **M-7**:

```text
Basis: DOC-7, accepted documentation owner
Goal: check the requested link against its current destination
Current A-7: check DOC-7 link L-7 and report the observed result
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-7
Recent TWR: TWR-7
```

`resolution/PRS.md` — **P-7**:

```text
RU-PRS-01 / PRS-ACTIVE-ITEMS: 0 items
RU-PRS-02 / PRS-TRACKED-DECISIONS: 0 items
RU-PRS-03 / PRS-CONTEXTUAL-MATERIAL: 0 items
No current retained Question, Proposal, Decision or contextual file.
```

`inputs/I-8.md` contains the exact USER input: “Проверь ссылку L-7 в DOC-7.” `work-records/TWR-8.md` is allocated at **S0**, before the check:

```text
Input: I-8 (exact text retained)
Accepted Manifest at entry: M-7 / A-7
PRS at entry: P-7
Primary subject / route / result: pending WR-1..WR-5
```

`WR-1` classifies the bounded check; `WR-2` reads M-7 and P-7. `WR-3` selects the link-check subject, and `WR-4` chooses `DIRECT`. During `WR-5`, the current page, destination and applicable owner contract are reviewed. No material missing Question emerges, so the link is checked and its observed result recorded without creating a Question or context file. For this illustration the destination resolves to the intended section.

`WR-6` keeps the prior M-7 recoverable and writes accepted **M-8**:

```text
Basis: DOC-7, link L-7 checked against its current destination
Goal: check the requested link against its current destination
Current A-7: COMPLETE — destination section resolved; result in TWR-8
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-7 (unchanged, all three Collections empty)
Recent TWR: TWR-8
Prior accepted revision: manifest-history/M-7.md
```

`TWR-8` final material content:

```text
Input/basis: I-8; M-7; P-7; DOC-7
WR-3 subject: check L-7 in DOC-7
WR-4 route: DIRECT
WR-5: destination section resolved; no material missing Question
WR-6: M-8 current; P-7 unchanged; M-7 retained in history
WR-7: closed
```

The current Manifest pointer is M-8; the archive includes the current Manifest, TWR-8, retained I-8, P-7 and the M-7 history reference. There is no `context/` directory. Empty PRS context did not skip existing-state review.

## Case B — exact answer changes the tentative action during `WR-5`

Here `EVO-1` is an already established Evolution Step for the same bounded Scenario-planning subject. The entry plan was to refine one existing Step-owned Scenario. The accepted Manifest has a short horizon, and PRS has no prewritten Question about whether the new actor path has its own Application Contribution.

`WORK-MANIFEST.md` — accepted revision **M-20**:

```text
Basis: EVO-1; existing Step-owned Scenario SCN-1
Goal: plan the actor/Application journey for EVO-1
Current A-20: refine SCN-1 for the requested actor path
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-20
Recent TWR: TWR-20
```

`resolution/PRS.md` — **P-20**:

```text
RU-PRS-01 / PRS-ACTIVE-ITEMS: 0 items
RU-PRS-02 / PRS-TRACKED-DECISIONS: 0 items
RU-PRS-03 / PRS-CONTEXTUAL-MATERIAL: 0 items
No Question about this new path has been recorded yet.
```

`inputs/I-21.md` retains this exact USER input:

> Продолжай планирование в EVO-1. Новый путь имеет отдельный Application Contribution и отличается от SCN-1. Вместо правки SCN-1 спланируй отдельный Step-owned Scenario Target Body для этого пути.

`work-records/TWR-21.md` at **S0**:

```text
Input: I-21 (exact text retained)
Accepted Manifest at entry: M-20 / A-20
PRS at entry: P-20
Primary subject / route / result: pending WR-1..WR-5
```

`WR-1..WR-3` retain one primary subject: **Scenario planning inside EVO-1**. `WR-4` chooses `SHELL`, because forming a Scenario Target Body requires methodology reasoning. In `WR-5`, contextual review compares the new actor path with SCN-1, Application Definition/Benefit intent and the Step owner. It derives `Q-21`: “Is the new path's Application Contribution materially distinct from SCN-1?” The answer is already present in I-21. Intake marks `ANSWERED_FROM_USER`; the USER is not asked again.

The bounded PRS state at this **in-turn checkpoint P-21** makes the relation inspectable before the next sweep:

```text
RU-PRS-01 / PRS-ACTIVE-ITEMS:
  PRS-ACTIVE-21
    SUBJECT: EVO-1 / Scenario coverage for the new actor path
    DRIVER/QRP: Q-21 = ANSWERED_FROM_USER (I-21)
    EFFECT: SCN-1 refinement superseded as the tentative action;
            separate Step-owned Scenario planning is current
    EVIDENCE: comparison with SCN-1 and I-21
RU-PRS-02 / PRS-TRACKED-DECISIONS: 0 items
RU-PRS-03 / PRS-CONTEXTUAL-MATERIAL: 0 items
```

The exact USER-selected action permits the current-work-state owner to write accepted **M-21 during `WR-5`** and retain M-20 in history:

```text
Basis: EVO-1; SCN-1; exact USER selection I-21; Q-21 answered
Goal: plan the actor/Application journey for EVO-1
Current A-21: plan a separate Step-owned Scenario Target Body
              for I-21's distinct path inside EVO-1
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-21
Recent TWR: TWR-21 (in progress)
Prior accepted revision: manifest-history/M-20.md
```

`TWR-21` records the `WR-5` transition `M-20/P-20 → M-21/P-21`, the I-21 authority and the invalidation of A-20's prior readiness. The next **session-task contextual sweep** now reads **M-21/P-21**, checks Scenario coverage, Step ownership and still-material Questions on this new maturity basis, and re-evaluates readiness. It does not silently start a different `WR-3` subject. In this illustration no further blocker appears, so the authorized Scenario planning continues through the selected Shell route. The Scenario Target Body remains Step-owned; the example does not invent a Feature owner. EVO-1 is not being handed to realization in this turn; its separate SDS Evolution Step sweep and `RU-EVO-06` start-readiness conclusion are not substituted by this session-task check.

At `WR-6`, resolved Q-21 has no remaining carry-forward value. PRS **P-22** removes `PRS-ACTIVE-21` after its answer and Manifest consequence are recorded in TWR-21 and M-21:

```text
RU-PRS-01 / PRS-ACTIVE-ITEMS: 0 items
RU-PRS-02 / PRS-TRACKED-DECISIONS: 0 items
RU-PRS-03 / PRS-CONTEXTUAL-MATERIAL: 0 items
```

`WR-6` advances the Manifest's PRS pointer through factual synchronization. Final accepted **M-22**:

```text
Basis: EVO-1; SCN-1; exact USER selection I-21; Q-21 answered
Goal: plan the actor/Application journey for EVO-1
Current A-21: plan a separate Step-owned Scenario Target Body
              for I-21's distinct path inside EVO-1
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-22
Recent TWR: TWR-21 (closed)
Prior accepted revision: manifest-history/M-21.md
```

`TWR-21` final material content:

```text
Input/basis: I-21; M-20; P-20; EVO-1 / SCN-1
WR-3 subject: Scenario planning inside EVO-1
WR-4 route: SHELL
WR-5: Q-21 derived, ANSWERED_FROM_USER (I-21);
      M-20/P-20 → M-21/P-21 before second sweep;
      A-20 readiness stale; A-21 replanned within same subject;
      second sweep stable; Scenario Target planning continued
WR-6: P-22 exits Q-21; M-22 current; M-20/M-21 retained
WR-7: closed
```

The current pointer is M-22/P-22; M-20 and M-21 are recoverable. No separate context file is created.

### Same finding when the new Manifest action is AI-derived

This is an **alternative** to the exact I-21 selection above, not another step in that turn. Suppose the USER only asks to review the new path. Contextual review finds it distinct, but choosing “plan a separate Scenario now” is still AI-derived prospective work. The accepted M-20 stays current. PRS gets a bounded active item relating current basis M-20, `P-21-AI`, Q-21 and the complete candidate target Manifest:

```text
Proposal: P-21-AI — choose separate Scenario planning as next action
Current basis: accepted WORK-MANIFEST.md @ M-20
Candidate target: proposals/P-21-AI/target-state/WORK-MANIFEST.md
Q-21: distinct path finding; USER-owned action selection remains unresolved
ContinuationGate: USER_REVIEW_REQUIRED
```

The candidate target file has ordinary final-shaped Manifest content, without “proposed” language inside it:

```text
Basis: EVO-1; SCN-1; reviewed distinct path
Goal: plan the actor/Application journey for EVO-1
Current A-21: plan a separate Step-owned Scenario Target Body
              for the reviewed distinct path inside EVO-1
Next: UNESTABLISHED
PRS: resolution/PRS.md @ P-21-AI
Recent TWR: TWR-21
Prior accepted revision: manifest-history/M-20.md
```

`WR-5` stops prospective execution at the existing USER review gate. `WR-6` still reconciles M-20 as accepted, PRS's Proposal/current/candidate relation, TWR-21 and archive pointers. A target-shaped candidate filename or file body does not select the Proposal. If a material answer instead changed the work to a different primary subject, the current TWR would also stop rather than executing that new subject.
