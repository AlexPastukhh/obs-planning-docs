# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Current Repository Work

Status: proposed representation of **current realized** App journey before selected future ownership split.

## Realizes Application Benefits
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

Current implementation also contains App-owned Work Intent/Issue and workspace responsibilities. Those are current responsibility facts, not a recommendation for the future boundary.

## Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-rpkg-keep-work-context-stable-01"></a>**Keep Work Context Stable**<br><code>SR-RPKG-KEEP-WORK-CONTEXT-STABLE-01</code> | Context / Continuity | Once an application journey is bound to Work A/package P, later user/application interactions in that journey keep A/P or stop. | Target Good Example: A/P1 remains A/P1 through Apply outcome.<br>Problem Example: current UI selection silently retargets an in-flight action. |
| <a id="sr-rpkg-show-operation-context-at-user-decisions-02"></a>**Show Operation Context At User Decisions**<br><code>SR-RPKG-SHOW-OPERATION-CONTEXT-AT-USER-DECISIONS-02</code> | Visibility / User Decision | When the user is asked to start/retry an effect, the affected Work/package context is understandable. | Target Good Example: Retry identifies the exact Work/package.<br>Problem Example: user cannot tell what will be retried. |
| <a id="sr-rpkg-keep-terminal-outcome-understandable-03"></a>**Keep Terminal Outcome Understandable**<br><code>SR-RPKG-KEEP-TERMINAL-OUTCOME-UNDERSTANDABLE-03</code> | Outcome / Truthfulness | Terminal interaction distinguishes proven result, expected rejection and uncertainty sufficiently for the next safe action. | Target Good Example: possible Push without confirmation remains uncertain.<br>Problem Example: uncertainty is presented as success. |

## Main Actor / Application Path

Internal journals, Domain transitions and Slice calls are not Scenario steps merely because implementation executes them.

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-rpkg-supply-current-realization-request-01"></a>**Supply Current Realization Request**<br><code>SPS-RPKG-SUPPLY-CURRENT-REALIZATION-REQUEST-01</code> | Actor/automation supplies the exact repository/Work/package request through supported entry. | App entry + Apply Feature | exact Work/package/target context | [Keep Work Context Stable](#sr-rpkg-keep-work-context-stable-01) | Target Good Example: exact identity comes from the handoff, not a label. |
| <a id="sps-rpkg-request-current-package-realization-02"></a>**Request Current Package Realization**<br><code>SPS-RPKG-REQUEST-CURRENT-PACKAGE-REALIZATION-02</code> | App establishes current required Work prerequisites and invokes the package realization capability; manual entries expose the necessary user decision context. | [Apply Replacement Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md) plus current App-owned prerequisite realization | package realization outcome | [Show Operation Context At User Decisions](#sr-rpkg-show-operation-context-at-user-decisions-02) when user-controlled | Problem Example: prerequisite internals are documented as if the actor manually performs them. |
| <a id="sps-rpkg-observe-current-realization-outcome-03"></a>**Observe Current Realization Outcome**<br><code>SPS-RPKG-OBSERVE-CURRENT-REALIZATION-OUTCOME-03</code> | Actor observes the terminal result/attention state. | outcome surface | proven/rejected/uncertain result | [Keep Terminal Outcome Understandable](#sr-rpkg-keep-terminal-outcome-understandable-03) | Target Good Example: exact publication uncertainty is visible. |

## RU-SCEN-02 — Evolution Impact

This current Scenario reverse-references active Steps that materially change it. Future journey meaning remains in those Steps.

| Evolution Step | Current Scenario impact |
|---|---|
| [Parameterize Apply Handoff](../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | Adds actor-selected Apply extent and bounded package wait. |
| [Move Work Orchestration To AI](../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) | Removes App-owned Issue/AI-working-branch orchestration and splits the broader workflow into AI development/review and authoritative realization Scenarios. |
| [Introduce Work Finalization](../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) | Adds independent Finalize interaction after exact reviewed result. |
| [Enable Automatic Finalization](../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | Adds immediate vs deferred Finalize Scenario branch. |
| [Add Apply URI Entry](../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) *(Probable)* | Adds equivalent direct URI entry. |
| [Add Operation Notifications](../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) | Adds attention notifications for long/background operation outcomes without making notification truth authority. |
