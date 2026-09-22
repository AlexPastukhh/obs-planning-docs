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
   - choose registered semantic command prefixes/capabilities in `includes`;
   - fully expand the transitive include DAG conceptually;
   - confirm dependencies-before-dependents execution and that the selected command's own action is last on its branch;
   - confirm shared prefixes can be deduplicated and no include cycle exists;
   - for IDTSPE routes, expose the required base composition explicitly (`idtspe.work`, Port Composition recheck, P-02 trace, plus the natural port/operation prefixes).
4. Define/update the command family, active-context behavior, traversal mode, expected output and permission boundary.
5. Define **composition-time contributions** when the command must make information available before dependency semantic actions execute, for example explicit port capability requirement, required working trace, trace sink preference, or a selected registered TM/Lens identity. Port Composition Refresh must see the complete merged-DAG contributions before it runs.
6. Define `ownerFiles` as broad canonical read routes and define structured `ownerRefs` for the **canonical references added by this command itself**. Every own ref must contain:
   - stable Responsibility ID or registered semantic component ID;
   - exact repository file and canonical anchor;
   - `why` — why this command needs that owner/contract;
   - semantic `role`;
   - `readMode`.
   Do **not** duplicate refs already inherited from included commands. Possible downstream destinations use `POSSIBLE_DESTINATION` / `DESTINATION_ONLY`; they are not prerequisite includes.
7. Keep `ownerFiles` / `ownerRefs` as read/authority routes and `includes` as executable command-prefix dependencies. Never use file lists as executable includes.
8. Do not persist a parallel numeric Shell topology (`requiredPorts`, `portRequirements`, hard-coded `P-*` arrays). Named port-capability commands contribute semantic requirements while the canonical Port Composition owner resolves current topology.
9. Validate every include ID against the complete command catalog, reject self-includes/cycles/unknown IDs, and validate that all structured ref files/anchors exist.
10. Validate semantic ordering: prerequisites belong in `includes`; outputs discovered **after** a command's own action (for example Findings/Needs produced by Review) must route through canonical downstream handoffs/disposition owners rather than being modeled as prerequisite includes.
11. Keep algorithms and reusable semantic meaning in their proper owners; keep the command thin. The methodology/process must remain executable without Helper.
12. Synchronize Planning Helper projection from the command definition. Helper must show direct includes, dependencies-first expanded composition, composition contributions and own canonical refs with `why`; it must not invent a second route.
13. Run command-catalog, DAG, ref/anchor, Helper build/check and tests.

## Related

- [`../commands/README.md`](../commands/README.md) — command-definition contract and catalog rules.
- [`../documentation/command-planning-workflow.md`](../documentation/command-planning-workflow.md) — existing supporting planning Process pending later decomposition.
- [`../documentation/command-routing-workflow.md`](../documentation/command-routing-workflow.md) — existing supporting routing Process.
