# EVO-RPKG-ADD-OPERATION-NOTIFICATIONS — Add Operation Notifications

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Impact Identified**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## Entering From
- current realized state; independent of other selected Steps

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Add background/OS attention signals for terminal outcomes of long-running or user-away operations so AI/user does not have to poll the application, while keeping Feature/Domain Result truth as the only authority for what actually happened.

## Scenario Impact
Affected Scenarios may derive an SR like:

<a id="sr-rpkg-notify-background-operation-outcome-01"></a>**Notify Background Operation Outcome**  
`SR-RPKG-NOTIFY-BACKGROUND-OPERATION-OUTCOME-01` — when a material long/background operation reaches a terminal success/failure/attention-required state and the actor may be elsewhere, provide an attention signal tied to the exact operation context.

Potential consumers after their Steps exist:
- Snapshot ready / generation failed;
- Builder package verification ready / failed;
- Apply/Publish terminal or attention-required outcome;
- Finalize terminal or attention-required outcome.

## Screen / Shared Implementation Impact
A notification adapter may be a Screen/shared implementation responsibility. Exact OS mechanism remains OPEN at this target-resolution depth.

## Guards
- notification is **not** proof of success;
- notification does not authorize retry/finalization/another side effect;
- message must not collapse uncertainty into success/failure;
- duplicate notification mechanics must not duplicate the underlying operation;
- app result/state remains canonical truth when notification delivery itself is uncertain.

## Materialization readiness
Do not claim Complete Target until exact affected Scenario SR allocation, notification content/context identity, adapter owner and recovery/duplication behavior are selected.

## Step Readiness

Readiness: **NOT_READY**

Target resolution is only Impact Identified; the exact notification adapter/content policy and affected target owner bodies are not complete.

### Step Q/R/P
- Q [BLOCKING]: which outcomes warrant notification and what content is safe/useful?
- Q [BLOCKING]: which Screen/Shared adapter owns OS/background notification realization?
- P [BLOCKING]: preserve notification as attention signal, never result authority.
