# Documentation Update Plan Workflow

Status: active reusable documentation-layer workflow
Scope: plan-first route for non-trivial documentation/ownership/navigation changes using generic Workspace-UC planning before concrete execution.

Generic Workspace Planning: [`workspace-planning/direction-registry.md`](workspace-planning/direction-registry.md)
Workspace planning principles/template: [`workspace-planning/workspace-planning-principles-and-terminology.md`](workspace-planning/workspace-planning-principles-and-terminology.md) + [`workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. Sources

Start from natural navigation and the selected Documentation UC, then read architecture/responsibility owners, task-specific owners and exact current target owners. For an explicit command, resolve `planning/command-routing.md` + the direct command definition separately.

## 2. Resolve The Affected Useful Result

Do not begin from an ordered list of files.

```text
selected documentation Need / Ideas / current change intent
→ affected existing Documentation/Workspace UC(s)
→ candidate new Workspace UC only when independently useful
→ integrated target per UC
```

Use the generic Workspace Planning Establish/Change/Topology UC workflows as applicable. Several Ideas that affect one UC converge into one Target UC. One cross-cutting Idea remains one Idea and contributes local impact to each affected UC.

## 3. Plan Step 1 + Step 2

For documentation work, Step 1 + Step 2 are normally reviewed together once the UC boundary is sufficiently grounded:

```text
Step 1
→ target useful result / trigger / behavior / boundaries / UC graph

Step 2
→ rules / invariants / models when justified / templates / semantic owner placement / verification meaning
```

Step 1 may stand alone when target UCs themselves remain materially unresolved. Preserve known later-step implications as Carry-Forward Context rather than discarding or silently finalizing them.

Current state normally uses high-level summary + links to current canonical owners. Target changed/new semantic owners must be explicit enough to avoid semantic blind spots; keep a separate Current → Target Transition review.

## 4. Plan Step 3 When Selected / Grounded

```text
Target UC + reviewed semantic rules
→ expected Workspace Change Path
→ current Architecture Lens proportionally
→ vertical UC realization
→ exact local/shared owners and files
→ checked-but-unchanged files
→ dependencies
→ verification
```

Prefer capability-local semantic changes and minimize shared coordination owners. Cross-Slice file/owner overlap is an architecture-review signal, not an automatic shared-abstraction command.

Do not optimize raw step/file count; optimize the lowest-cost correct, understandable and independently verifiable path.

## 5. Cross-UC Review

When several documentation UCs are materially affected, review combined UC topology, shared semantic meaning, planned Slice overlap and architecture effect before execution. Locally best realizations are not automatically the best combined architecture.

## 6. Ordered File Update Plan — Only When Selected

`file-update-overview-workflow.md` / `FILE-UPDATE-OVERVIEW-TEMPLATE.md` remain the active explicit capability for an ordered concrete File Update Plan when that route is requested/useful.

Do not force a second ordered file plan when the selected UC-centric Step 3 already provides the realization/file surface needed by the next authorized implementation/package route.

Keep conceptual Idea Variants separate from file actions.

## 7. Replacement Package Planning

When the selected later action is `давай архив`, plan/produce according to the V0.1 producer contract owned by `build-replacement-archive-workflow.md`:

```text
PACKAGE.json
base-files/<replace|delete paths>
replacement-files/<add|replace paths>
```

Renames are represented as delete + add. Exact base bytes are required for replace/delete. Do not plan legacy `MANIFEST.md` / `APPLY.md` / pasted-diff mechanics unless the selected concrete legacy command explicitly owns them.

## 8. Permission Boundary

Planning never authorizes edits, package creation, commit or push. A direct command/update/package route owns its own permission boundary.
