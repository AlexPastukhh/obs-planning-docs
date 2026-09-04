# Replacement Package App — Documentation Templates

Status: active recommended-template owner
Scope: recommended starting forms for Scenario/Screen design and maintenance, Scenario-owned Evolution Steps, evolution planning, Domain/Slice/shared implementation owners, local proof/Test Items and generated implementation-trace documentation.

## Template rule

These templates are **recommended forms, not schemas**.

A concrete document should contain the information needed to understand its owner or design decision. Sections may be omitted, combined, renamed, reordered or supplemented when another structure communicates the same meaning more clearly.

Presentation should preserve meaning while making it easy to recover:

- keep one connected idea as prose when prose is clearer;
- expose independent facts, conditions, exceptions or consequences as bullets/sub-bullets or another explicit structure;
- use readable entity names and pair technical IDs with human meaning;
- do not use arbitrary numeric IDs as roadmap/architecture order;
- never drop a condition merely to shorten the text.

Do not add empty sections merely to conform to a template. Do not turn template headings into a new bureaucracy, lifecycle or validation taxonomy.

Planning depth is intentionally progressive:

- during early Scenario design, `Application Benefit / Desired Result` + a candidate FI map + brief FI roles/local Results may be enough;
- deepen uncertain FIs only far enough to validate boundaries and compare designs;
- once behavior is selected/current, the Scenario owner should carry the complete Process Specification, including the needed FI Interaction Processes and BI.

The documentation process and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md) and its linked detailed files. The use cases link directly to the canonical detailed forms at the step where each form is useful.

---


## Template groups

Detailed forms are physically separated for focused reading while this file remains the stable template entry point.

- [Scenario and Feature Interaction](documentation-templates/scenario.md)
- [Screen and UI](documentation-templates/screen.md)
- [Evolution](documentation-templates/evolution.md)
- [Implementation requirements and Item Groups](documentation-templates/implementation.md)
- [Domain](documentation-templates/domain.md)
- [Slice and Shared Implementation](documentation-templates/slice-and-shared.md)
- [Proof and Acceptance](documentation-templates/proof.md)
- [Generated implementation trace](documentation-templates/generated-trace.md)

## Compatibility anchors

Existing links to this file's historic anchors remain navigable below; new methodology links should point directly to the canonical detailed file.

<a id="template-scenario-owner"></a>
### Template — Scenario owner

Moved to [`scenario.md#template-scenario-owner`](documentation-templates/scenario.md#template-scenario-owner).

<a id="template-feature-interaction-entry"></a>
### Template — Feature Interaction entry

Moved to [`scenario.md#template-feature-interaction-entry`](documentation-templates/scenario.md#template-feature-interaction-entry).

<a id="template-feature-interaction-variant-analysis"></a>
### Template — Feature Interaction Variant analysis

Moved to [`scenario.md#template-feature-interaction-variant-analysis`](documentation-templates/scenario.md#template-feature-interaction-variant-analysis).

<a id="template-scenario-process-variant"></a>
### Template — Scenario Process Variant

Moved to [`scenario.md#template-scenario-process-variant`](documentation-templates/scenario.md#template-scenario-process-variant).

<a id="template-screen-variant-analysis"></a>
### Template — Screen Set / Screen Variant analysis

Moved to [`screen.md#template-screen-variant-analysis`](documentation-templates/screen.md#template-screen-variant-analysis).

<a id="template-ui-requirement"></a>
### Template — UI / Screen requirement forms

Moved to [`screen.md#template-ui-requirement`](documentation-templates/screen.md#template-ui-requirement).

<a id="template-screen-owner"></a>
### Template — Screen owner

Moved to [`screen.md#template-screen-owner`](documentation-templates/screen.md#template-screen-owner).

<a id="template-evolution-step"></a>
### Template — Evolution Step

Moved to [`evolution.md#template-evolution-step`](documentation-templates/evolution.md#template-evolution-step).

<a id="template-evolution-impact"></a>
### Template — Evolution Impact

Moved to [`evolution.md#template-evolution-impact`](documentation-templates/evolution.md#template-evolution-impact).

<a id="template-evolution-steps-map-entry"></a>
### Template — Evolution Steps Map entry

Moved to [`evolution.md#template-evolution-steps-map-entry`](documentation-templates/evolution.md#template-evolution-steps-map-entry).

<a id="template-implementation-item"></a>
### Template — Implementation Item

Moved to [`implementation.md#template-implementation-item`](documentation-templates/implementation.md#template-implementation-item).

<a id="template-item-group"></a>
### Template — Item Group

Moved to [`implementation.md#template-item-group`](documentation-templates/implementation.md#template-item-group).

<a id="template-aggregate-domain-owner"></a>
### Template — Aggregate Domain owner

Moved to [`domain.md#template-aggregate-domain-owner`](documentation-templates/domain.md#template-aggregate-domain-owner).

<a id="template-domain-object-owner"></a>
### Template — Domain Object owner

Moved to [`domain.md#template-domain-object-owner`](documentation-templates/domain.md#template-domain-object-owner).

<a id="template-slice-owner"></a>
### Template — Slice owner

Moved to [`slice-and-shared.md#template-slice-owner`](documentation-templates/slice-and-shared.md#template-slice-owner).

<a id="template-shared-implementation-capability-owner"></a>
### Template — Shared Implementation Capability owner

Moved to [`slice-and-shared.md#template-shared-implementation-capability-owner`](documentation-templates/slice-and-shared.md#template-shared-implementation-capability-owner).

<a id="template-test-item"></a>
### Template — Test Item

Moved to [`proof.md#template-test-item`](documentation-templates/proof.md#template-test-item).

<a id="template-shared-test-capability"></a>
### Template — Shared Test Capability

Moved to [`proof.md#template-shared-test-capability`](documentation-templates/proof.md#template-shared-test-capability).

<a id="template-test-design"></a>
### Template — Optional Test Design

Moved to [`proof.md#template-test-design`](documentation-templates/proof.md#template-test-design).

<a id="template-practical-acceptance"></a>
### Template — Practical Acceptance plan and Evidence

Moved to [`proof.md#template-practical-acceptance`](documentation-templates/proof.md#template-practical-acceptance).

<a id="template-generated-implementation-trace"></a>
### Recommended generated implementation-trace output

Moved to [`generated-trace.md#template-generated-implementation-trace`](documentation-templates/generated-trace.md#template-generated-implementation-trace).

## Physical authority rule

This index plus the linked template files form one recommended-template owner. Physical separation does not turn template groups into independent schemas or competing methodology authority.
