# Session State worked example — two bounded turns

Status: illustrative projection, not a mandatory Session directory schema or a second Work Runtime. [Session State Runtime Contract](../session-state-runtime-contract.md) owns physical continuity; Core [Work Record](../../documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md) and [PRS](../../documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md) own semantics.

## Case A — relevant review, zero contextual files

The accepted `WORK-MANIFEST.md` revision M-7 says `Current: check an existing documentation link`, `Next: UNESTABLISHED`. `resolution/PRS.md` has zero active, tracked Decision and contextual items. No `context/` directory exists. Input I-8 asks to check the link.

`TWR-8` is created at S0 with the exact input and M-7/PRS basis. `WR-1` classifies the request; `WR-2` reads the current Manifest and empty PRS. `WR-3` establishes the bounded link-check subject; `WR-4` selects DIRECT. Before execution, `WR-5` checks the linked current document and relevant owner contract, derives no material unresolved Question for this bounded check, performs the check and records the result. No ceremonial Question or context file is created. `WR-6` marks the action complete in M-8 and reconciles PRS, TWR/pointers/history; `WR-7` closes the turn. Empty retained context did not skip existing-state review.

## Case B — an answer changes the tentative plan

M-20 currently selects `A: update the existing Scenario` with later work `UNESTABLISHED`. PRS has no prewritten Question about ownership. Input I-21 asks to proceed and explicitly states that the newly described actor path has a distinct Application Contribution. `TWR-21` S0 retains M-20, PRS and input refs. `WR-3` stays on the bounded Scenario-planning subject; `WR-4` selects DIRECT tentatively.

During `WR-5`, contextual review discovers `Q-21: does the new path have a materially distinct Application Contribution?` Intake finds the exact answer in I-21 (`ANSWERED_FROM_USER`) and does not re-ask. The current-work-state owner integrates this selected meaning into PRS and M-21 during `WR-5`, retaining M-20 in history. The tentative action becomes `form a new Step-owned Scenario Target Body`; prior DIRECT readiness is stale. The same `WR-3` primary Scenario-planning subject remains; route re-evaluates to SHELL for substantive Target formation. A second contextual sweep reviews existing paths, Benefit coverage and Step owner; material new Questions are resolved/retained through their normal owners before execution. `WR-6` reconciles M-21, PRS, TWR and archive; `WR-7` finalizes. Had I-21 omitted the USER-owned distinction, the existing User Decision Gate would have stopped affected execution at `USER_REVIEW_REQUIRED`.

If the new Manifest target were an **AI-derived** choice rather than exact USER-selected meaning, M-20 would remain accepted. PRS would link a Proposal to M-20 and a complete candidate M-21 target Manifest; the existing USER review gate would stop prospective execution until selection. A context file appears in either case only if independently material state must be retained as a file; no such file is required here.
