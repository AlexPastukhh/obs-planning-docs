# EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE — Open Repository Folder In VS Code

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Partial Target**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
- current realized downstream owner state; independent of Apply/Finalize/Snapshot evolution

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Add a reusable application capability that opens the **exact selected repository folder** in VS Code. The semantic behavior is folder selection + exact external handoff; process invocation/quoting/platform mechanics belong to realization/shared capability, not to Scenario/Feature prose.

## Owner Impacts

### Feature Impact — NEW
Introduce `F-RPKG-OPEN-FOLDER-IN-VSCODE` as an independently useful external-tool handoff capability, not merely a button identity.

### Screen / Scenario Impact — CHANGED where exposed
A repository-context surface may offer an Open In VS Code action when the exact repository folder is known. Placement is selected Screen solution; the requirement is exact-context handoff.

### Shared Implementation Capability Impact — NEW/OPEN
A reusable VS Code folder-opening mechanism is expected so later branch-Snapshot opening can consume the same realization. Exact owner/body remains open until implementation discovery resolves platform/process boundaries.

## Complete Target Feature Body

<a id="f-rpkg-open-folder-in-vscode"></a>
# F-RPKG-OPEN-FOLDER-IN-VSCODE — Open Folder In VS Code

## Realizes Upstream Meaning
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Intent / Principal Result
Given one exact application-selected folder context, request VS Code to open **that same folder**, without repository mutation or silent retargeting.

## Feature Data
| FDO | Meaning |
|---|---|
| <a id="fdo-rpkg-folder-to-open-in-vscode-01"></a>**Folder To Open**<br><code>FDO-RPKG-FOLDER-TO-OPEN-IN-VSCODE-01</code> | Exact canonical local folder selected by the calling application context. |
| <a id="fdo-rpkg-vscode-open-result-02"></a>**VS Code Open Result**<br><code>FDO-RPKG-VSCODE-OPEN-RESULT-02</code> | Truthful accepted/rejected/failure result of handing that folder to VS Code; it is not proof of later user interaction inside VS Code. |

## Global BR
| BR | Type | Plain required behavior | QRPE / Examples |
|---|---|---|---|
| <a id="br-rpkg-open-exact-folder-in-vscode-01"></a>**Open Exact Selected Folder**<br><code>BR-RPKG-OPEN-EXACT-FOLDER-IN-VSCODE-01</code> | Identity / Scope | The VS Code handoff stays bound to the exact folder captured for this invocation. | Target Good Example: switching repository selection after invocation does not retarget the already-captured open request.<br>Problem Example: action reads the current UI field later and opens another repository. |
| <a id="br-rpkg-vscode-open-does-not-mutate-repository-02"></a>**Open Does Not Mutate Repository**<br><code>BR-RPKG-VSCODE-OPEN-DOES-NOT-MUTATE-REPOSITORY-02</code> | Effect Scope / Safety | This Feature requests external opening only; it does not itself edit, checkout, commit or otherwise mutate repository state. | — |
| <a id="br-rpkg-report-vscode-handoff-truthfully-03"></a>**Report VS Code Handoff Truthfully**<br><code>BR-RPKG-REPORT-VSCODE-HANDOFF-TRUTHFULLY-03</code> | Result / Truthfulness | Do not report a successful handoff when invocation was rejected/failed; do not claim proof of what happened after VS Code accepted the request. | Problem Example: process start failed but UI says repository opened. |

## Main Path
| FBS | Required action | Attached BR |
|---|---|---|
| <a id="fbs-rpkg-capture-folder-for-vscode-01"></a>**Capture Folder For VS Code**<br><code>FBS-RPKG-CAPTURE-FOLDER-FOR-VSCODE-01</code> | Capture/validate exact local folder from calling context. | Open Exact Selected Folder |
| <a id="fbs-rpkg-request-vscode-open-folder-02"></a>**Request VS Code Open Folder**<br><code>FBS-RPKG-REQUEST-VSCODE-OPEN-FOLDER-02</code> | Hand exact captured folder to the selected VS Code opening realization. | Open Does Not Mutate Repository |
| <a id="fbs-rpkg-return-vscode-open-result-03"></a>**Return VS Code Open Result**<br><code>FBS-RPKG-RETURN-VSCODE-OPEN-RESULT-03</code> | Return truthful handoff result. | Report VS Code Handoff Truthfully |

## RU-FEAT-04 — Implementation Concern
The folder-opening mechanism should be reusable by later capabilities, especially **Open Branch Snapshot In VS Code**. Reuse requirement belongs to Shared/IR planning once the natural shared realization owner is resolved.

## Materialization Set
- Open Folder In VS Code Feature — `CREATE`;
- Screen/Scenario exposure — impact identified, but add `REPLACE` only after complete changed owner body is resolved where independently material;
- Shared VS Code folder-opening capability — impact identified but **not yet in the Materialization Set** until a complete natural-owner Target Body exists.

## Step Readiness

Readiness: **NOT_READY**

Typed Operation Results is not yet realized and the reusable VS Code opening implementation owner/body is incomplete.

### Step Q/R/P
- Q [BLOCKING]: resolve the natural Shared/adapter owner and exact cross-platform process/handoff contract.
- P [BLOCKING]: complete that Target Owner Body before materialization.
