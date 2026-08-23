# Solution / Application SDS Planning Governance Read Workflow

Status: active reusable Application-planning workflow
Scope: establish or refresh the complete reusable Solution/Application SDS planning governance context, and provide the reusable governance preflight for `DIR-PLAN-SOLUTION` commands whose current owner route explicitly requires complete SDS governance.

## 1. Purpose

This workflow owns **how to load and refresh Application/SDS planning governance**. It does not own Scenario/Domain/Slice semantics themselves; those remain in the Direction/Use-Case Registries and the linked principles/workflows/profiles.

Explicit command route:

```text
бутстреп сдс
→ UC-PLAN-ORIENT
→ this workflow
```

The same workflow may run internally as a preflight for another Solution/Application planning command when that command's current owner route explicitly requires complete SDS governance and that governance is not currently reliable. A command does not acquire this dependency merely because it produces a planning result.

## 2. Permission Boundary

```text
This route is read-only.
It may load governance, resolve an active Application target and identify current owners.
It does not itself perform the requested planning operation.
It does not edit repository files, create packages, implement, run tests, commit or push.
```

When used internally by another command, the outer command keeps its own output and permission boundary. Bootstrap activation never expands that permission.

## 3. Reuse / Targeted Refresh / Full Bootstrap

Follow the shared command-routing preflight rule. For SDS governance specifically:

```text
CURRENT
→ a sufficient full SDS governance pass was already completed in the working context;
→ the Step 0–4 model, semantic owner boundaries and sibling Architecture/Testing handoffs remain confidently remembered;
→ no material evidence says those relevant owners changed;
→ REUSE without replaying the full read order.

TARGETED REFRESH
→ the prior pass remains broadly reliable, but a relevant registry/workflow/profile/owner may have changed;
→ the active task enters a previously unread/uncertain SDS area;
→ or one ownership boundary is no longer certain;
→ reread only that affected owner route plus the minimum registry context needed to reconnect it.

FULL BOOTSTRAP
→ no reliable sufficient SDS governance pass exists;
→ the prior pass cannot be reconstructed confidently;
→ several relevant governance owners changed materially;
→ or current SDS ownership/boundaries are uncertain enough that targeted refresh is unsafe.
```

Do **not** invalidate a current SDS bootstrap merely because a new snapshot, commit, branch or repository target appears. Source identity/state matters only when it can materially change the relevant governance route, semantic owner, reusable rule or permission boundary. Elapsed chat time/message count alone is not a stale signal.

## 4. Full SDS Governance Read Order

A full bootstrap reads the reusable governance owners below completely enough to preserve their current boundaries. Do not expand into every template/example merely because this is a full bootstrap.

```text
1. planning/AI-WORKING-CONTRACT.md

2. planning/documentation/application-planning/README.md
3. planning/documentation/application-planning/direction-registry.md
4. planning/documentation/application-planning/use-case-registry.md
5. planning/documentation/application-planning/application-planning-responsibility-map.md
6. planning/documentation/application-planning/application-planning-principles-and-terminology.md

7. planning/documentation/planning-concerns-and-decisions-model.md
8. planning/documentation/idea-planning-principles-and-terminology.md
9. planning/documentation/idea-review-and-planning-workflow.md

10. planning/documentation/application-planning/solution-and-scenario-planning-workflow.md
11. planning/documentation/application-planning/requirements-and-change-context.md
12. planning/documentation/application-planning/detailed-planning/README.md
13. planning/documentation/application-planning/domain-discovery-workflow.md
14. planning/documentation/application-planning/domain-planning-workflow.md
15. planning/documentation/application-planning/application-realization-workflow.md
16. planning/documentation/application-planning/slice-planning-workflow.md

17. planning/documentation/profiles/sds-planning-profiles.md
18. planning/documentation/profiles/scenario-domain-slice-docs-profile.md

19. planning/documentation/architecture-planning/direction-registry.md
20. planning/documentation/architecture-planning/use-case-registry.md
21. planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md

22. planning/documentation/testing-planning/direction-registry.md
23. planning/documentation/testing-planning/use-case-registry.md
24. planning/documentation/testing-planning/practical-testing-plan-workflow.md

25. when an active Application/project target exists:
    resolve its current Scenario Catalog / Scenario owners and only the current
    Domain/Slice/Requirement/Screen/WEUC/testing owners needed to understand
    the active planning state.
```

Templates are read when their concrete shape is needed. Examples are demonstrations only and are not part of the mandatory full governance pass.

## 5. Governance Assimilation Contract

A sufficient SDS bootstrap must leave these boundaries clear:

```text
STEP 0 — WHY / SOLUTION DISCOVERY
Need / Current Reality
→ whole-solution choice
→ Application Concept / Responsibility only when justified
→ Prototype when useful

STEP 1 — SCENARIO
Scenario = application behavioral authority
+ Scenario DATA / Behavior Items
+ Requirements / Screens when material

STEP 2 — DOMAIN
optional evidence-backed conceptual language / lifecycle / rules / invariants
→ Domain never silently redefines Scenario behavior

STEP 3 — REALIZATION / SLICES + VERIFICATION PLANNING
Slice decomposition / implementation-part planning
+ contextual Workspace/WEUC and architecture evidence when material
+ Testing Strategy / Test Design / Practical Test Plan when material

STEP 4 — PRACTICAL REALIZATION FEEDBACK
real implementation/proof evidence
→ Coverage / semantic ReviewDiff
→ upstream correction only when actual evidence requires it
```

Mini, Modular/Medium and Full SDS have the same semantic-quality requirement. Profile choice changes physical organization/addressability only. Full SDS is **not** the governance bootstrap.

Architecture Planning and Testing Planning are sibling Directions consumed when material; they do not take Application behavior authority from Scenario owners. Planning Concerns/Q/R/P are a secondary owner-attached lens, not the planning root. Idea is not Decision.

## 6. Internal Preflight For Result-Producing Commands

Commands whose current `ownerFiles` / semantic owner route explicitly includes this workflow are complete-SDS-governance-dependent. Current high-level command routes include `собери идеи приложения`, `собери модульный план приложения`, `мини сдс`, `модульный сдс` and `фулл сдс`. Other narrow `DIR-PLAN-SOLUTION` commands continue through their own owners and use this preflight only if their actual traversal reaches a material complete-SDS governance dependency:

```text
requested command
→ check whether SDS governance is CURRENT / TARGETED / FULL
→ reuse or refresh this governance proportionally
→ read the selected command's task-specific owners
→ perform the requested planning operation
→ return that operation's result
```

Do not require a separate `бутстреп сдс` invocation. Do not emit a standalone bootstrap result during an implicit preflight unless it materially helps explain a blocking ownership problem.

## 7. Explicit Bootstrap Output

When `бутстреп сдс` itself is invoked, return a compact assimilation result:

```text
Solution/Application SDS governance loaded.

Bootstrap state:
  FULL | TARGETED REFRESH | REUSED CURRENT

Step 0–4 / profile / Architecture / Testing boundaries:
  loaded

Active Application/project target:
  <resolved target / none yet>

Current semantic owners:
  <Scenario/Domain/Slice/etc owners actually needed / none yet>

Permission boundary:
  read-only bootstrap; subsequent work follows its own command/UC permission

Material unresolved ownership/questions:
  <findings / none>
```

If no active target exists, do not invent one and do not force a target question.

## 8. Do Not

- Do not treat every result-producing Application-planning command as requiring complete SDS governance; the dependency must come from its current owner route or arise materially during traversal.
- Do not treat a source snapshot/commit/branch change alone as governance invalidation.
- Do not confuse `бутстреп сдс` with selecting the Full SDS physical profile.
- Do not make commands, profiles, examples or implementation second authorities over Scenario/Domain/Slice semantics.
- Do not read every template/example during bootstrap without a task-specific reason.
- Do not execute planning, repository mutation, implementation, testing, packaging, commit or push from this read-only route.
