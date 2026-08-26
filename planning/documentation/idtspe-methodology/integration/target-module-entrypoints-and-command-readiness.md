# Target Module / Lens Entry Points And Command Readiness

Status: supporting prior-snapshot/current-candidate mapping; fresh repository verification still required; no repository command changes performed.

Primary current integration ledger: [`CURRENT-REPOSITORY-INTEGRATION.md`](CURRENT-REPOSITORY-INTEGRATION.md).

Desired future SDS/IDTSPE command architecture is owned separately by [`idtspe-command-surface-contract.md`](../active/profiles/sds/shared/idtspe-command-surface-contract.md).

Planned helper grouping/order and `IDTSPE` / `SDS — IDTSPE Profile` tab design: [`COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](COMMAND-AND-HELPER-NAVIGATION-PLAN.md).

## Rule

```text
user command
→ semantic Target Module entry point
or
→ generic IDTSPE route + Lens activation
```

Command/palette is invocation only. It does not create a second methodology authority.

## Current Repository Command Candidates → Current Methodology

This section describes the **repository state/candidates already known from the repository snapshot**. It is not the desired complete 17-module command surface.

| Current command id | User command | Current command file | Methodology route |
|---|---|---|---|
| `application_concept.plan` | `план концепции приложения` | `planning/commands/plan-application-concept.command.md` | `TM-APPLICATION-DEFINITION` — concept-focused entry |
| `application_responsibility.establish` | `определи ответственность приложения` | `planning/commands/establish-application-responsibility.command.md` | `TM-APPLICATION-DEFINITION` — boundary-focused entry |
| `application_realization.review` | `проверь реализацию приложения` | `planning/commands/review-application-realization.command.md` | revalidate `TM-APPLICATION-DEFINITION` feasibility or current Slice; not a separate Realization-Stress module by default |
| `application_prototype.plan` | `прототип приложения` | `planning/commands/prototype-application.command.md` | `TM-PROTOTYPE` |
| `application_scenarios.discover` | `собери сценарии приложения` | `planning/commands/discover-application-scenarios.command.md` | `TM-SCENARIO-DISCOVERY` |
| `application_scenario.plan` | `план сценария приложения` | `planning/commands/plan-application-scenario.command.md` | `TM-SCENARIO-DRAFT` |
| `application_domain.discover` | `исследуй домен приложения` | `planning/commands/discover-domain.command.md` | `TM-DOMAIN-DISCOVERY` |
| `application_domain.plan` | `план домена приложения` | `planning/commands/plan-domain.command.md` | `TM-DOMAIN-DRAFT` |
| `application_slice_strategy.plan` | `план стратегии слайсов` | `planning/commands/plan-slice-strategy.command.md` | `TM-SLICE-STRATEGY` |
| `application_slice.plan` | `план слайса приложения` | `planning/commands/plan-application-slice.command.md` | `TM-IMPLEMENTATION-SLICE` |
| `test_design.plan` | `спланируй проверку поведения` | `planning/commands/plan-test-design.command.md` | `TM-TEST-DESIGN` |
| `testing_strategy.plan` | `стратегия тестирования` | `planning/commands/plan-testing-strategy.command.md` | `TM-TEST-STRATEGY` |
| `practical_testing.plan` | `план практического тестирования` | `planning/commands/plan-practical-testing.command.md` | `TM-PRACTICAL-TEST` |
| `test_coverage.review` | `проверь тестовое покрытие` | `planning/commands/review-test-coverage.command.md` | `TM-TEST-COVERAGE` |

## Existing WEUC / Architecture Commands

These commands remain potentially useful shortcuts. WEUC-map work now has a Target Module; architecture-decision evaluation remains Lens/generic-Target driven:

| Current command id | User command | Methodology route |
|---|---|---|
| `architecture_weuc.discover` | `собери WEUC` | overlaps the desired `TM-WEUC` map surface and the new reusable WEUC Lens-check intent; repository audit must decide whether to extend it with explicit target/scope semantics or keep it as map-focused and add a separate lens-check command |
| `architecture_decision.plan` | `прими архитектурное решение` | local choice: current Target + L5 + ordinary Answer Decision; project-global choice: route/promote to `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION`; bounded independently material architecture problem: generic Target Formation |

Desired methodology reusable Lens surfaces now include:

```text
lenscmd.weuc.check
→ проверь эволюцию и архитектуру <target>
→ ordinary target: activate L5 inside that Target
→ whole Workspace architecture: TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION

lenscmd.simplicity.check
→ проверь можно ли упростить <target>
→ activate Simplicity / Implementation Economy Lens against the selected Target

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>
→ explicitly apply the required Documentation / Representation Lens and then hand concrete placement to P-14

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
→ evaluate navigation/query/backlink value without creating notes storage or a new owner
```

These desired surfaces do not yet assert repository command IDs.

Repository command semantics must be audited before any actual repo update; this file does not mutate commands.

## Desired Coverage Boundary

The current repository mapping above is incomplete relative to the accepted methodology command surface.

Canonical rule:

```text
every active Target Module
→ at least one canonical user-level command surface
```

Therefore `TM-REQUIREMENT`, `TM-SCREEN`, `TM-FRONTEND-SLICE` and `TM-CROSS-CUTTING-CONCERN` also require canonical invocation surfaces. Their commands must apply the module gate and may validly conclude that no Target should be created. Conditionality is not a reason to hide the module from direct invocation.

Scenario DATA and Behavior Item remain internal contracts of `TM-SCENARIO-DRAFT`, not command-addressed Target Modules.

Consistency review is `UC-IDTSPE-REVIEW-CONSISTENCY`, not a Target Module; its command is an orchestration/validator surface.

See [`idtspe-command-surface-contract.md`](../active/profiles/sds/shared/idtspe-command-surface-contract.md) for the complete 17-module + focused/orchestration command architecture.

## Helper Presentation Metadata

Every **new IDTSPE canonical/focused command** should define user-facing command commentary in addition to its semantic route:

```text
When To Use
What You Get
```

Canonical helper-extension contract:

[`command-helper-usage-metadata-extension.md`](../active/idtspe-core/shared/command-helper-usage-metadata-extension.md)

Recommended command-definition projection:

```json
{
  "helperPresentation": {
    "whenToUse": "<why / when this command is the right action>",
    "whatYouGet": "<concrete result the user receives>"
  }
}
```

The fields are optional at the helper/schema level for backward compatibility, but required by the methodology when we create the new IDTSPE command surface. Existing commands without them must continue to work unchanged.

The helper may show this information by hover/focus and must also provide an explicit info/details action for touch/mobile use. Opening details must never invoke the command.

## Future Palette Rule

The palette should satisfy the canonical/focused surface in `idtspe-command-surface-contract.md` while preserving useful existing repository commands where possible.

Prefer useful user-level Target/Lens routes. Do not expose every internal Lens or supporting integration point as a separate button.

The planned helper projection must also make runtime identity visible:

```text
SDS Target Module command
→ IDTSPE TARGET

SDS direct Lens command
→ IDTSPE LENS

SDS tab
→ ordered by directed Target Module flow where meaningful
→ WEUC marked cross-cutting/repeatable
→ focused commands nested under their canonical Target Module
→ presentation badges must expose material conditional/optional Target gates without hiding commands
```

The accepted 41 methodology surfaces should project as `9 IDTSPE + 32 SDS` primary helper surfaces. The two additional Core surfaces are generic Lens operations (`idtspe.lenses.select` and `idtspe.lens.apply`), not new fixed Lens identities; contextual cross-links must not create duplicate command identities.
