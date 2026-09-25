# UC-REPO-MAINTAIN-PLANNING-COMMAND — Maintain Planning Command

<a id="command-maintenance"></a>

Responsibility ID: `COMMAND.MAINTENANCE`

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `COMMAND.DEFINITION-CONTRACT`
> Owner: [`Planning Command Definition Contract`](../commands/README.md#planning-command-definition-contract)

## Situation

A stable executable Planning Command is useful, or an existing command trigger, route, output contract, presentation, or permission boundary is stale.

## Result

A valid current direct `planning/commands/*.command.md` definition exists and routes to the correct semantic capability/supporting owners without becoming semantic authority itself. Its registered dependency composition is reproducible, its own canonical references explain why each owner/anchor is needed, and Helper projection remains derived rather than authoritative.

## Process

1. Confirm that a reusable executable invocation surface is useful rather than creating a command merely for navigation text.
2. Resolve the semantic capability and natural owner/process route the command invokes. If that capability/process is missing, maintain the methodology/repository owner first rather than inventing it inside command prose.
3. Resolve the command's **dependency composition** before implementation:
   - choose canonical repository paths to the registered direct command prefixes/capabilities in `includes`;
   - fully expand the transitive include DAG conceptually;
   - confirm dependencies-before-dependents execution and that the selected command's own action is last on its branch;
   - confirm shared prefixes can be deduplicated and no include cycle exists;
   - for IDTSPE routes, expose the required base composition explicitly (`idtspe.work`, Port Composition recheck, P-02 trace, plus the natural port/operation prefixes).
4. Define/update the command family, active-context behavior, traversal mode, expected output and permission boundary.
5. Define **composition-time contributions** when the command must make information available before dependency semantic actions execute, for example explicit port capability requirement, required working trace, trace sink preference, review coverage mode/context, or a selected registered TM/Lens identity. Any owner that consumes a contribution before dependencies execute (for example Review Strategy/Coverage) must be able to establish its working context from the fully merged DAG before those dependency semantic actions begin; Port Composition Refresh likewise must see the complete merged-DAG contributions before it runs.
6. Define `ownerFiles` as broad canonical read routes and define a non-empty structured `ownerRefs` list for the **canonical references added by this command itself**. Every own ref must contain:
   - stable Responsibility ID or registered semantic component ID;
   - exact repository file; a stable explicit canonical anchor when referring to a semantic section (optional for a whole-file reference);
   - `why` — why this command needs that owner/contract;
   - semantic `role`;
   - `readMode`.
   Do **not** duplicate refs already inherited from included commands. Possible downstream destinations use `POSSIBLE_DESTINATION` / `DESTINATION_ONLY`; they are not prerequisite includes.
7. Every active direct command must retain at least one own canonical `ownerRef` with a human-readable `why`; inherited refs from includes are not repeated. Whole-file refs may omit `anchor`; section-specific refs use the owner's stable explicit anchor under the linked Command Definition Contract. Keep `ownerFiles` / `ownerRefs` as read/authority routes and `includes` as executable command-prefix dependencies. `includes` is a list of canonical `planning/commands/*.command.md` dependency paths only — never methodology/Use-Case/owner file lists.
8. Do not persist a parallel numeric Shell topology (`requiredPorts`, `portRequirements`, hard-coded `P-*` arrays). Named port-capability commands contribute semantic requirements while the canonical Port Composition owner resolves current topology.
9. Validate every include command path against the complete command catalog, require it to resolve to exactly one direct registered `.command.md` definition, reject self-includes/cycles/unknown paths, and validate that all structured ref files/anchors exist.
10. Validate semantic ordering: prerequisites belong in `includes`; outputs discovered after a command's own action are not prerequisite includes. Result-dependent stages that are intrinsic to the operation belong to that operation's semantic lifecycle/owner. Do not introduce a parallel `extends`/inheritance relation when the intended dependency is already represented by `includes`; Helper may derive reverse `included by` views from the same DAG. For an explicit traversal guarantee at an owner process point, declare `processCalls` under [the Process Call contract](../commands/README.md#planning-command-process-calls). Validate all reachable command paths, point anchors and mixed cycles. Keep child contributions deferred and preserve current context/basis and reuse evidence. A shared owner link remains the semantic authority.
11. Keep algorithms and reusable semantic meaning in their proper owners; keep the command thin. **No normative methodology rule may exist only in a Planning Command.** The methodology/process must remain executable without Helper/commands through its own references, responsibility routes and handoffs; command composition only guarantees the corresponding USER-invoked traversal.
12. Synchronize Planning Helper projection from the command definition. Helper must show direct includes, derived reverse `included by` dependents, dependencies-first expanded composition, composition contributions, deferred process calls with their owner points/context, and own canonical refs with `why`; it must not invent a second route.
13. Run command-catalog, DAG, ref/anchor, Helper build/check and tests.


<a id="helper-impact-before-command-handoff"></a>
## Projection Impact Before Handoff

After the command delta is concrete and before completing synchronization/handoff, invoke or reuse [Check Helper Impact](UC-REPO-CHECK-HELPER-IMPACT.md#uc-repo-check-helper-impact). Use the current planned or applied basis honestly, resolve its projection/discoverability/verification consequences through the existing workflow, and consume the result before handoff. A planned assessment does not verify an applied delta.

## Related

- [`../commands/README.md`](../commands/README.md) — command-definition contract and catalog rules.
- [`../documentation/command-planning-workflow.md`](../documentation/command-planning-workflow.md) — existing supporting planning Process pending later decomposition.
- [`../documentation/command-routing-workflow.md`](../documentation/command-routing-workflow.md) — existing supporting routing Process.
