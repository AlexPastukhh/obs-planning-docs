# Scope Action Log

Scope: `SCOPE-REPLACEMENT-PACKAGE-APP`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.

### LOG-RPKG-001 — Replacement Package App SDS planning review

**Type:** IDEA REVIEW  
**Source:** current Replacement Package App planning conversation  
**Current Conclusions / selected meaning:** migrate application documentation to Modular / Medium SDS; define application behavior from user-world Need/result Scenarios before Domain and realization; preserve DATA, Behavior, Visual/Screen and Requirement meaning; treat current implementation operations as downstream Slices rather than Scenario identity.

### LOG-RPKG-002 — Scenario, Domain, Slice and testing clarifications

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-RPKG-001`  
**Clarification / resulting meaning:** `Apply`, `Review`, `Finalize`, snapshot export/attach and ReviewDiff delivery are not Scenarios merely because they are separate commands/capabilities. Current Scenario inventory is regrouped around complete repository work, repository-context handoff and current-change handoff. Domain discovery keeps a small ChangeSet/repository/ownership/lifecycle semantic core and records `Repository Work` as an aggregate candidate rather than deriving entities from Java classes. Current implementation is represented through six separately checkable Slices. Automated E2E is not selected; cross-Slice proof uses automated component/integration tests plus a manual practical-testing plan for real Swing/Windows/Edge/ChatGPT behavior.

### LOG-RPKG-003 — Apply SDS documentation migration

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-001`, `LOG-RPKG-002`  
**Target-State Result:** after successful package Apply, Replacement Package App documentation routes through Modular SDS owners: application-plan → user-world Scenarios/visual meaning → Domain draft → implementation Slices → testing strategy, while legacy operation-shaped UC/Scenario paths remain compatibility-only and existing implementation contracts/source/tests remain downstream evidence.  
**Rationale:** make semantic ownership match reusable SDS methodology without pretending current implementation or manual browser acceptance changed.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`

### LOG-RPKG-004 — ReviewDiff correction for SDS ownership, Slice dependencies and manual proof

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `763133c4-b4fa-4d54-a72c-d7e9b9c370fc` / package `5a91cc08-9655-4ad5-af80-ee07b790b263`  
**Material Finding / selected correction:** root `DIR-REPLACEMENT-PACKAGE-APP` still routed to the legacy Application Use-Case index; the Slice graph incorrectly made current-change delivery look downstream of Finalize; two operation-time safety rules were represented as Domain invariants; and the new testing strategy described Slice-oriented manual practical testing without yet materializing that structure in `MANUAL-ACCEPTANCE.md`.  
**Resulting Current Meaning:** route the Application Direction directly to the Scenario Catalog; branch `SL-RPKG-03` and `SL-RPKG-06` independently from `SL-RPKG-02`; keep repository revalidation/full-applicability rules in Application Behavior/Requirements rather than Domain identity; organize manual practical testing as `PA-SL01..PA-SL06` while preserving shared Windows/launcher/output checks.

### LOG-RPKG-005 — Apply SDS ReviewDiff correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-004`  
**Target-State Result:** after successful package Apply, root semantic navigation, Domain/Slice ownership boundaries and manual practical-testing structure are coherent with the Modular SDS plan; the same six implementation Slices remain current realization and live Edge/ChatGPT success still requires executed manual evidence.  
**Rationale:** correct material semantic/traceability defects without changing application implementation or pretending planned proof has executed.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`  
**Package:** `942b4acd-e43f-49ca-9f01-7ea47ef3b040`

### LOG-RPKG-006 — ReviewDiff correction for Direction semantic name

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `763133c4-b4fa-4d54-a72c-d7e9b9c370fc` / package `942b4acd-e43f-49ca-9f01-7ea47ef3b040`  
**Material Finding / selected correction:** `DIR-REPLACEMENT-PACKAGE-APP` already routes to user-world Scenarios and covers repository work plus repository/change-context handoff, but its remaining semantic name `Apply / Review / Finalize Replacement Packages` still describes three internal operations and understates the Direction scope.  
**Resulting Current Meaning:** preserve stable Direction ID `DIR-REPLACEMENT-PACKAGE-APP` and rename its semantic name to `Use Replacement Package App` in both the root registry and application Direction owner. The existing Purpose and Scenario route remain unchanged.

### LOG-RPKG-007 — Apply Direction semantic-name correction

**Type:** APPLIED  
**Applied From:** `LOG-RPKG-006`  
**Target-State Result:** after successful package Apply, `DIR-REPLACEMENT-PACKAGE-APP` is named `Use Replacement Package App` consistently at root and application scope, so Direction identity expresses the application responsibility rather than the internal Apply/Review/Finalize operations.  
**Rationale:** complete the SDS semantic-ownership correction without changing Direction ID, Scenario boundaries, implementation or testing state.  
**ChangeSet:** `763133c4-b4fa-4d54-a72c-d7e9b9c370fc`  
**Package:** `55948837-d778-41d3-9268-baafea4933d8`
