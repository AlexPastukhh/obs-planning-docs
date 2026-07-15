# Solution And Workflow Planning Principles

Status: provisional reusable principles
Doc version: v0.7.0-source-linked-review
Scope: stable guidance for planning candidate workflows and solutions before optional detailed implementation planning.

## 1. Purpose

Planning should reduce the risk of:

```text
- solving the wrong problem;
- preserving an unnecessary workflow;
- accepting the first idea too early;
- losing important user-reported context;
- losing the source wording behind an item or decision;
- reviewing the wrong thing at the wrong time;
- designing details before the valuable behavior is understood;
- creating documentation complexity that does not improve thinking.
```

The method is an orientation toward a useful result, not a rigid ceremony.

## 2. Evidence Boundary

Keep these statuses distinct:

```text
confirmed:
  explicit user statement or checked source fact;

inference:
  reasoned interpretation requiring confirmation;

question:
  important unknown;

critical remark:
  structural, logical, economic or technical concern;

related idea:
  possible improvement or alternative;

decision candidate:
  option under consideration;

decision:
  explicit accepted choice with rationale;

evidence:
  observation produced by a test, prototype or checked source.
```

AI must not silently promote an idea, risk, inference or unanswered fallback into a confirmed fact or final requirement.

## 3. Source-Linked Traceability

Important planning claims should stay connected to the source material that caused them.

Use source-linked traceability when a statement may affect:

```text
- desired result;
- acceptance criteria;
- review decisions;
- file-update scope;
- workflow or branch selection;
- future implementation direction;
- deletion, rename or cleanup;
- reusable principle changes.
```

A source may be:

```text
- original user wording;
- checked repository text;
- a returned draft;
- a prototype result;
- a diff;
- an imported file or source excerpt.
```

Preserve original user wording when it is evidence for a planning item, correction, decision or uncertainty. A normalized interpretation may be added, but it should not erase the source wording that makes the interpretation reviewable.

Repeated support should be grouped: one planning item may have several source excerpts, and one excerpt may support several items.

Source-linked items are reviewed raw material. They do not automatically become final documentation, confirmed requirements or accepted decisions.

## 4. Convenience-First Input

The user may provide any mixture of:

```text
workflow facts;
out-of-order steps;
problems;
strengths;
feelings;
risks;
workarounds;
ideas;
alternatives;
questions;
corrections;
decisions;
prototype findings;
implementation thoughts.
```

The user is not required to identify the correct category, artifact or insertion point.

AI should infer from context:

```text
- evidence status;
- information category;
- affected artifact;
- affected workflow step or position between steps;
- whether the input adds, corrects, replaces, splits or links material;
- whether a question is safer than an immediate assertion.
```

The user may correct the interpretation.

## 5. Proposed Information Units Review

For non-trivial free-form input, expose a compact interpretation review when it helps prevent silent misclassification.

Recommended fields:

| Field | Meaning |
|---|---|
| Unit ID | Local ID for the new input fragment |
| Interpreted statement | AI's understanding |
| Source excerpt / anchor | Original wording or checked-source reference when it matters |
| Evidence status | User statement / checked fact / inference / question / decision candidate |
| Category | Workflow fact / problem / risk / workaround / idea / criterion / decision / test / other |
| Target artifact | Reality Capture / root draft / functional workflow / branch / detail / prototype |
| Target location | Existing step / between steps / draft-level section / new candidate section |
| Proposed action | Add / update / replace / split / link / ask / no change |
| Confidence or question | Important ambiguity |

AI may return the updated draft in the same response rather than requiring a separate approval ceremony.

If the user does not correct the interpretation, it becomes the accepted working classification and placement for the current draft. The original evidence status remains unchanged.

A later correction updates the current draft; do not preserve both interpretations as equally valid.

## 6. Review Object Discipline

Before expensive, confusing or irreversible work, identify the review object that prevents the relevant risk.

Review concepts must remain distinct:

```text
Review Gate:
  stage where review happens;

Review Object:
  concrete thing being reviewed;

Review Status:
  state/result after review.
```

The review object may be:

```text
- source-linked item table;
- source excerpt mapping;
- Current Reality Capture section;
- Planning Draft section;
- Result Workflow map;
- Action Workflow or File Update Plan;
- generated literal file;
- replacement archive or diff;
- architecture/conventions checklist;
- object-creation proposal;
- implementation thought or prototype result.
```

A status such as `reviewed`, `accepted`, `needs changes`, `documented` or `superseded` is not the review object.

Pick the smallest review object that can catch the specific risk. Do not require a heavy review artifact when a compact source-linked item list or draft section is sufficient.

## 7. Minimal-To-Complex Artifact Design

Start with the smallest representation that is clear, useful and maintainable.

```text
required semantic core
  → compact working representation
  → local expansion
  → linked detail, table, diagram or specialized view when justified
```

Rules:

```text
- Keep related information together.
- Omit empty optional sections.
- Prefer headings and short blocks before large tables.
- Add stable IDs only where references or repeated updates need them.
- Preserve user wording and intuitive grouping before abstraction.
- Keep the high-level view after adding detail.
- Apply progressive complexity to files and folders, not only headings.
- A template is a recommended representation, not a universal schema.
```

Anticipating future growth does not justify starting with the future complex form.

## 8. Navigation And Roadmap Quality

Navigation and high-level roadmap visibility are planning quality, not only UI polish.

A useful planning artifact should help the reader see:

```text
- the desired reality or result;
- the high-level road toward it;
- the current local point;
- the parent plan or workflow it belongs to;
- previous/current/next points when relevant;
- dependencies and review gates;
- source-linked reasons for important items.
```

A local plan or file-update step should not become understandable only as an isolated table. It should preserve enough parent context to show why the step matters.

Key points are useful when they explain both the local content and its role in the larger plan.

## 9. Current Reality Capture

The first artifact is descriptive.

It records:

```text
- current workflow and sequence;
- what currently happens;
- current intended explanation for a step;
- user experience;
- strengths;
- experienced problems;
- suspected risks;
- workarounds;
- existing ideas;
- unknowns and contradictions.
```

The user may begin with fragments, complaints, examples, positive experiences or imagined ideas.

Current intended purpose is not automatically a validated underlying need.

The capture must not formulate:

```text
- accepted future outcomes;
- accepted acceptance criteria;
- target workflow;
- solution comparison;
- build decision;
- architecture.
```

Categorization is allowed. Evaluation is deferred.

## 10. Planning Draft

After enough current reality is visible, create a Planning Draft for one candidate end-to-end way to achieve a result.

Its semantic core may include:

```text
- source-reality references;
- source-linked planning items when they help review;
- current/old workflow when relevant;
- desired/result workflow;
- action workflow or roadmap;
- what needs to be achieved;
- acceptance criteria and status;
- boundaries and non-goals;
- planning steps;
- problems, risks and assumptions;
- existing solutions and alternative workflows;
- decisions;
- tests and evidence;
- branches;
- current conclusion and next action.
```

A simple plan may omit most optional sections.

## 11. Living Plan Growth And Reconstruction

Prefer growing the living plan from the beginning when feasible. Early source-linked items, draft sections and review objects reduce the chance that a correct AI interpretation disappears in chat.

This preference is not absolute. When the plan did not grow from the beginning, reconstruction from reviewed source-linked items is valid.

During reconstruction:

```text
- preserve original source excerpts when available;
- keep evidence status visible;
- mark register-derived or indirect items when raw source is missing;
- do not pretend reconstructed material was accepted earlier than it was;
- ask prioritized questions only for important gaps.
```

## 12. Desired Result And Acceptance Criteria

A desired result or criterion may be:

```text
candidate;
confirmed;
needs evidence;
rejected;
superseded.
```

Do not invent a final criterion to fill a template.

Criteria should attach to validated outcomes, not automatically to every current step.

Different interpretations of the desired result may remain candidates or become branches when independent planning is justified.

## 13. Application Root And Functional Workflows

When one candidate application contains several valuable behavior lines, use one application-level root draft to coordinate them.

The root owns:

```text
application identity;
shared outcomes and criteria;
workflow inventory;
cross-workflow dependencies;
shared concepts and constraints;
actual solution branches;
coordination and selection.
```

A Functional Workflow Draft owns one independently understandable and testable behavior line.

It resembles a possible future slice, but at the early planning stage it does not fix implementation architecture.

Create a separate workflow file only when the behavior has independent outcome, analysis, review or test value.

Functional workflows are siblings inside one solution. They are not competing branches.

## 14. Solution Branching

A branch is created only when independently planning more than one alternative is useful.

Before branching, the parent should record:

```text
- decision point;
- why separate analysis is justified;
- why one option cannot yet be selected;
- why another cannot yet be rejected;
- assumptions;
- evidence required;
- selection criteria;
- rejection criteria;
- cost of maintaining the branch.
```

The parent owns comparison.

Each branch should be logically readable as a complete end-to-end option, even when physical storage uses inherited or linked content.

Nested branches are allowed.

## 15. Upstream Revision And Parallel Branches

Later analysis may reveal that material before a divergence point must change.

Possible responses:

```text
- update the parent and affected descendants;
- create a new parent version;
- keep a snapshot branch;
- create an independent parallel branch;
- discard the proposed upstream change.
```

The method records the consequence. It does not require one application-specific versioning implementation.

## 16. Details And File Creation

Keep information together by default.

Create a separate detail artifact when it has independent value because it:

```text
- is large enough to impair the parent;
- has its own lifecycle or review;
- is reused;
- is opened independently;
- changes at a different rate;
- needs focused testing or research.
```

The parent keeps a useful summary and entry point.

## 17. InformationItem References And Literal Files

Reusable methodology may describe reference modes, but it must not choose concrete app storage, wrapper syntax or UI controls.

When a Planning Item or InformationItem is referenced from a literal file, three reusable representation choices exist:

```text
embedded content:
  app-readable reference plus wrapped/materialized literal content;

reference-only:
  app-readable reference without duplicate literal content;

no link:
  ordinary text when a managed reference would add more burden than clarity.
```

Use embedded content when a literal file must be readable and reviewable without resolving app state.

Use reference-only when duplicating the item would make the file harder for humans or AI to read, or when an app-expanded view is the intended review surface.

Do not silently create canonical object state from AI-generated wrappers, tags or proposed regions. A proposed object-backed region requires explicit user confirmation before it becomes canonical app state.

## 18. Implementation Thoughts

Early planning may include:

```text
Implementation Thoughts / Future Implementation Notes
```

Keep each note near the workflow step, capability or model question it affects.

Record its status:

```text
explicit user idea;
AI suggestion;
open alternative;
needs prototype;
accepted direction;
rejected direction.
```

An implementation thought is not an architecture decision merely because it is technically plausible.

Concrete object models, class boundaries, storage and serialization belong in project-specific drafts, not reusable principles.

## 19. Tests And Prototypes

Start from uncertainty, not from a desired feature.

A prototype should state:

```text
hypothesis;
question;
reason to test now;
minimum sufficient setup;
evidence;
success criteria;
failure criteria;
inconclusive criteria;
timebox;
decision affected;
code fate.
```

Useful types include:

```text
workflow/UX prototype;
technical spike;
integration prototype;
value prototype;
horizontal prototype;
vertical/steel-thread prototype;
proof of concept;
pilot.
```

A prototype may be embedded or stored separately.

Observed evidence updates affected criteria, assumptions, decisions, workflows and branches.

## 20. Dynamic Revision

Planning is not append-only.

When corrected or new evidence arrives:

```text
- update the current truth;
- preserve deliberate user edits;
- revisit affected downstream artifacts;
- revisit upstream assumptions when necessary;
- change representation when it no longer works;
- keep the high-level entry point.
```

Detailed implementation planning may return the process to an earlier draft or another branch.

## 21. Structured Source And AI Explanation

The structured draft is the canonical working source.

AI may generate:

```text
overview;
deep explanation;
resume-context explanation;
selected-section explanation.
```

The explanation is a reading view derived from the structured source. It should not become a separately maintained truth.

## 22. Entry Into Detailed Planning

Detailed scenario/domain/slice/implementation planning becomes useful when enough of the following are stable:

```text
- desired outcome;
- acceptance criteria;
- selected candidate workflow;
- valuable functional workflows;
- major constraints and integrations;
- critical assumptions and evidence;
- remaining known risks.
```

This is a judgment boundary, not a rigid gate.

## 23. Do Not

```text
- Do not require template-ordered user input.
- Do not treat silence as evidence-status promotion.
- Do not evaluate solution ideas inside Reality Capture.
- Do not lose source wording when it is the evidence for an item.
- Do not treat source-linked items as automatic final documentation.
- Do not confuse Review Object with Review Status.
- Do not create a branch for every option.
- Do not treat functional workflows as branches.
- Do not create an empty artifact family in advance.
- Do not make optional detail mandatory.
- Do not turn implementation thoughts into architecture automatically.
- Do not put a concrete application schema in reusable methodology.
- Do not choose exact wrapper syntax in reusable principles.
- Do not silently create canonical object state from AI-generated wrappers/tags.
- Do not make AI explanation a second canonical source.
```
