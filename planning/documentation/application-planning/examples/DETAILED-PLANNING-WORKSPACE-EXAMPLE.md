# Detailed Planning Workspace Example — FixFlow Service Requests

Status: current reusable practical example
Scope: demonstrate how whole-solution/Application Concept planning becomes Prototype Scenarios/Screens, Requirements/change context, canonical Scenario/Screen owners, Domain work, Slice Strategy, Implementation Slices, verification and integration review.

Methodology owner: [`../detailed-planning/README.md`](../detailed-planning/README.md)

This file is an example only. It does not own reusable methodology.

## 1. Problem / Desired Result

A small repair company currently coordinates customer requests through WhatsApp, calls and a shared spreadsheet.

Observed problems:

```text
request details are copied between channels;
responsibility is sometimes unclear;
appointment agreements are hard to reconstruct;
technician completion may be treated as customer acceptance;
customer rejection can restart the conversation without preserving one request history.
```

Desired result:

```text
From customer report to accepted repair result,
there is one understandable responsibility path where:
- the customer knows the current state;
- the dispatcher knows the next responsibility;
- the technician knows assigned work;
- completed work has inspectable evidence;
- unresolved work does not look closed.
```

## 2. Real-World Problem-Resolution Workflow

Before choosing an application, model the real-world path from the problem to the primary desired result:

```text
Anna notices a leak
→ decides professional repair is needed
→ reports the problem and evidence
→ repair company makes the request actionable
→ a visit arrangement is established
→ technician performs physical work
→ evidence/result becomes available
→ Anna judges whether the problem is resolved
→ accepted repair result
```

The application, if any, is only one possible participant in this larger real-world workflow.

Two meaningful solution gaps are visible.

### SLOT-01 — Coordinate one service request without losing responsibility/state

**Context / Before:** the problem has been reported.

**User-world Need:** customer, dispatcher and technician need one understandable current request state and next responsibility.

**Available Inputs / Resources:** problem description, contact details, existing WhatsApp, spreadsheet and calendar access.

**Desired Output / Intermediate Result:** one current request identity/state/history that the relevant people can rely on.

**Continuation:** triage, appointment coordination, work and customer resolution continue on the same request.

**Relation To Primary Desired Result:** coordination should make it easier to reach an accepted repair result without losing context.

### SLOT-02 — Let the customer understand current progress when they need it

**Context / Before:** an active request already exists.

**User-world Need:** understand what is happening now and whether customer action is required.

**Available Inputs / Resources:** request identity and current coordination state.

**Desired Output / Intermediate Result:** understandable current status + next responsibility.

**Continuation:** the customer can wait, respond, confirm or report a remaining problem as appropriate.

A different Workflow Variant could place, combine or eliminate these Slots. They are planning surfaces, not permanent product entities.

## 3. Candidate Fills And Viable Existing Alternatives

The Slots can be filled in several ways.

### Variant A — Process-only

```text
WhatsApp templates
+ strict shared spreadsheet
+ required status rules
+ before/after photos
+ dispatcher checklist
```

### Variant B — Existing field-service SaaS

Use an existing product for scheduling, technician workflow, customer status and notifications.

Checked disposition for this example:

```text
Status:
viable

Coverage:
most coordination/status Needs are covered

Limitation:
workflow/custom lifecycle fit and ownership/control are weaker than desired
```

Because Variant B is viable, it stays in the comparison. It is not discarded merely because a custom application is interesting.

### Variant C — Custom-application Concept candidate

Explore a lightweight coordination application while keeping external communication/maps/calendar/payment/accounting services outside.

### Variant D — Full custom platform

Own nearly all operational responsibilities.

## 4. Application Concept Candidate — FixFlow Coordination

The custom candidate is reviewed before assuming it should be built.

### Concept Statement

```text
Give every service request one understandable current coordination state
so the customer, dispatcher and technician can each see what matters now
without reconstructing the case across messages and spreadsheets.
```

### Life / Workflow Simplification

```text
instead of:
  ask/search/reconstruct current state across channels

the application would let relevant actors:
  identify one request
  understand its current state
  understand the next responsibility
  coordinate the next meaningful step
  preserve evidence/history until customer resolution
```

### Concept Features

| ID | User Need / Value | Concept contribution | Interaction hypothesis | Feasibility / cost note |
|---|---|---|---|---|
| `CF-REQUEST-STATE` | understand current request state | one current lifecycle/history view | request details surface + status summary | ordinary web/data work; medium |
| `CF-NEXT-RESPONSIBILITY` | know who/what is expected next | explicit next-responsibility presentation | status/attention zone | low/medium |
| `CF-APPOINTMENT-COORDINATION` | reach a usable visit arrangement | coordinate feasible availability and confirmation | scheduling interaction | calendar/provider uncertainty; medium/high |
| `CF-WORK-EVIDENCE` | inspect completed-work evidence | keep evidence on same request | evidence surface | medium |
| `CF-CUSTOMER-RESOLUTION` | accept or report unresolved result | explicit customer resolution state | resolution interaction | medium |

Concept Features are capability hypotheses inside the Concept. They are not Application Scenarios or Implementation Slices and no 1:1 mapping is assumed.

### Interaction / Solution Hypothesis

A plausible current hypothesis is a small web application with Request List / Request Details / scheduling and evidence/resolution surfaces, while WhatsApp or another transport may still deliver notifications/links. This is a hypothesis used to judge the Concept, not accepted detailed UI behavior.

### Technical Feasibility Sketch

```text
likely shape:
  web application
  + authenticated role-aware access
  + relational request/lifecycle store
  + external calendar/message integrations

main feasibility unknown:
  whether technician/calendar availability can be read with sufficient freshness
  for the preferred scheduling experience
```

### Rough Development / Ownership Cost

| Dimension | Estimate | Assumptions / confidence |
|---|---|---|
| initial development complexity | medium/high | lifecycle + roles are ordinary; scheduling integration less certain |
| time/effort | multi-slice project, not a one-step script | low precision at Concept stage |
| maintenance | medium | app upkeep + provider API changes |
| support/operations | low/medium initially | small company, limited user population |

These are rough bands, not false-precision commitments. If the availability uncertainty can change the build-vs-buy decision, research/prototype it before selection.

## 5. Concept Vs Viable Existing Alternative

Compare the Concept against the best still-viable existing route, not against doing nothing.

| Dimension | Existing SaaS | FixFlow Concept |
|---|---|---|
| Need coverage | strong generic field-service coverage | focused exact request lifecycle |
| time to useful result | faster | slower |
| custom lifecycle/control | constrained | strong |
| implementation burden | low | medium/high |
| maintenance/support burden | vendor-owned | locally owned |
| integration flexibility | product-dependent | selected integrations can stay external |

For this example, integrated evaluation selects the lightweight custom Concept because exact request-state/customer-resolution semantics are important enough to justify ownership. In another project the valid conclusion could be to use the SaaS and stop Application planning.

## 6. Selected Application Responsibility

Inside Application responsibility:

```text
Service Request identity/state
triage
assignment
appointment coordination state
work evidence
customer acceptance/reopen
current lifecycle/history
customer-visible current status / next responsibility
```

Outside:

```text
WhatsApp transport
maps/geocoding
calendar provider
payment processing
accounting
physical repair work itself
```

This boundary is derived from the selected Concept + whole-solution choice; the Concept itself did not automatically authorize custom application work.

## 7. Candidate Application Scenarios

Before detailed Scenario decomposition, the selected Concept can be projected into candidate independently useful application capabilities:

| Application Scenario | Real-world Need / result | Concept Feature coverage |
|---|---|---|
| manage actionable service request | keep one request understandable/actionable | `CF-REQUEST-STATE`, `CF-NEXT-RESPONSIBILITY` |
| coordinate visit arrangement | reach a usable visit arrangement | `CF-APPOINTMENT-COORDINATION` |
| record work evidence | preserve inspectable result evidence | `CF-WORK-EVIDENCE` |
| understand current request status | customer understands current state/next responsibility | `CF-REQUEST-STATE`, `CF-NEXT-RESPONSIBILITY` |
| resolve repair result | customer accepts or reports remaining problem | `CF-CUSTOMER-RESOLUTION` |

These candidate Application Scenarios may be split/merged/refined as real Scenario boundaries become clearer.

## 8. Prototype Planning And Scenario Discovery

The Concept/Application boundary is selected, but interaction/spatial detail is still uncertain. Use `UC-PLAN-PROTOTYPE` before creating canonical detailed Scenarios/Screens.

A rough end-to-end walkthrough is useful here only as disposable discovery evidence; it is not a separate Scenario type or semantic owner:

```text
Anna notices a leak
→ reports the problem and photo
→ dispatcher triages
→ technician/availability is considered
→ visit arrangement is established
→ technician performs work
→ technician records evidence
→ Anna reviews current result/status
→ Anna accepts or reports unresolved problem
```


### Prototype Scenarios

```text
PSCN-CHECK-STATUS
Need:
  understand what is happening and whether customer action is required
Approximate result:
  Anna understands current status + next responsibility
Possible Screens:
  PSCR-REQUEST-LIST, PSCR-REQUEST-DETAILS
Candidate information:
  request state, latest event, next responsible actor

PSCN-SCHEDULE-VISIT
Need:
  establish a usable visit arrangement
Approximate interaction:
  inspect request → choose/propose feasible availability → confirm arrangement
Candidate Behavior:
  feasible-window validation, confirmation-state rule
```

The prototype may later split/merge/reject these boundaries. `PSCN-*` is not `SCN-*` authority.

### Prototype Screens

```text
PSCR-REQUEST-DETAILS

[ request identity / summary ]
[ current status              ]
[ next responsibility         ]
[ appointment                 ]
[ history / evidence          ]
[ primary contextual action   ]
```

Prototype spatial findings:

```text
current status + next responsibility should be immediately visible;
appointment controls belong in an appointment zone;
work evidence and customer resolution should not visually collapse into one state.
```

`PSCR-*` is provisional and may merge/split before canonical Screen ownership.

### Candidate Requirements / Change Context

Prototype evidence discovers these candidates:

```text
REQ-STATUS-01
Status: candidate
Statement: current customer-visible state and next responsibility must not contradict the request lifecycle.
Expected Stability: stable

REQ-SPATIAL-01
Status: candidate
Statement: current status/next responsibility must be available without entering edit mode.
Expected Stability: stable

AXIS-CALENDAR-PROVIDER
Current assumption: one external calendar provider.
Likely variation: provider may differ later.
Confidence: medium.
Meaning: Domain/Slice planning should evaluate coupling; this does not require a generic provider framework now.
```

The prototype also exposes candidate Scenario DATA (`current state`, `next responsibility`, `feasible window`) and Behavior Items. They remain provisional until promoted.

### Promotion And Current Scenario Discovery

After review, supported Requirements are promoted to their real owners and current Scenario boundaries are selected:

| Scenario | Need | Observable result | Prototype origin |
|---|---|---|---|
| `SCN-CHECK-REQUEST-STATUS` | customer needs to understand what is happening and whether action is required | customer understands current status + next responsibility; no mutation is required | `PSCN-CHECK-STATUS` |
| `SCN-SCHEDULE-VISIT` | parties need an agreed visit arrangement | one current appointment arrangement is visible/confirmed | `PSCN-SCHEDULE-VISIT` |
| `SCN-PERFORM-WORK` | technician needs to complete assigned visit and evidence | visit completion/evidence is recorded | prototype finding |
| `SCN-ACCEPT-RESULT` | customer needs to judge whether the problem is resolved | result accepted or same request explicitly returns to work | prototype finding |

`SCN-CHECK-REQUEST-STATUS` is a valid informational/read-only Scenario because obtaining reliable understanding is itself an independently meaningful result.

By contrast, these are not peer Scenarios merely because they are addressable actions/commands:

```text
Open request
Show status
Add photo
Confirm proposal
Load request API
Persist status change
```

They remain actions/presentation/implementation inside a Scenario unless a separate user-world Need + independently meaningful result actually justifies a boundary. Scenario identity is not command identity.

## 9. Scenario Draft Collection

Project-local target tree:

```text
scenario-drafts/
├── README.md
├── ideas/
│   └── .gitkeep
├── data/
│   ├── DATA-SERVICE-REQUEST-IDENTITY.md
│   └── DATA-CUSTOMER-VISIBLE-STATUS.md
├── behavior/
│   └── BI-SHARED-CURRENT-REQUEST-IDENTITY.md
├── visual/
│   └── VIS-REQUEST-LIFECYCLE-JOURNEY.md
│
├── SCN-REPORT-PROBLEM/
│   ├── README.md
│   ├── scenario.md
│   ├── ideas/
│   │   └── .gitkeep
│   ├── data/
│   ├── behavior/
│   └── visual/
│
├── SCN-SCHEDULE-VISIT/
│   └── ...
│
└── SCN-ACCEPT-RESULT/
    └── ...
```

Shared request identity/status meaning lives once at the collection level because several Scenarios use it.

## 10. Detailed Scenario — Schedule Visit

`SCN-SCHEDULE-VISIT/scenario.md` initially owns one selected design.

### Identity

```text
Actor/context:
customer + dispatcher coordinating one service visit

Need:
reach a usable visit arrangement without losing the current request context

Observable result:
one current appointment arrangement is explicit to the relevant parties

Related Requirements:
REQ-STATUS-01 + appointment-specific confirmation constraints
```

### Initial Main Flow

```text
1. Dispatcher reviews triaged request.
2. Dispatcher selects a technician.
3. Dispatcher proposes one exact time.
4. Customer receives the proposal.
5. Customer accepts or rejects.
6. Accepted proposal becomes the current confirmed appointment.
```

### Scenario-local DATA

```text
SCN-SCHEDULE-VISIT/data/
├── DATA-TECHNICIAN-AVAILABILITY.md
└── DATA-APPOINTMENT-PROPOSAL.md
```

### Scenario-local Behavior

```text
SCN-SCHEDULE-VISIT/behavior/
├── BI-PROPOSE-VISIT.md
├── BI-CUSTOMER-CONFIRM.md
└── BI-CUSTOMER-REJECT.md
```

### Scenario visual material

```text
SCN-SCHEDULE-VISIT/visual/
└── scheduling-journey.md
```

This visual may show the Scenario transition but does not become the canonical Screen layout owner.

## 11. Current-Draft-relative Risk

A real risk is found:

```text
R-SCN-SCHEDULE-01

Type:
Risk

Current Draft Plan:
`scenario.md` Main Flow 2–3:
final technician selection happens before one exact customer slot is proposed.

Finding:
For some jobs, technician availability changes rapidly and a final assignment
may be invalid by the time the customer responds.

Relation / Impact On Current Draft Plan:
The current ordering may create stale assignments and repeated coordination.

Needed Resolution:
Evaluate whether assignment should remain provisional or whether the customer
should select a feasible window before final assignment.

Blocking:
no
```

This is not preserved as a risk forever once one route is selected.

## 12. Scoped Idea Work

Because the ordering question requires real answer-seeking work:

```text
SCN-SCHEDULE-VISIT/
└── ideas/
    └── assignment-vs-slot-order.md
```

Idea Variants:

```text
Idea Variant A
→ final technician first, exact slot second

Idea Variant B
→ customer feasible window first, technician second

Idea Variant C
→ provisional technician + customer slot + final confirmation
```

Local evaluation prefers B/C over A, but integrated evaluation checks dispatcher workload, customer comprehension, calendar provider limits and neighboring technician-work Scenarios.

## 13. Whole Scenario Variant Appears

The Idea work reveals not merely one local field change but two integrated Scenario designs.

### Existing root design

```text
VAR-A
Dispatcher-driven exact-slot scheduling
```

### New candidate

```text
VAR-B
Customer chooses among feasible windows;
exact technician/time is finalized after customer selection.
```

Only now does explicit Variant topology appear:

```text
SCN-SCHEDULE-VISIT/
├── README.md
├── scenario--VAR-A--selected.md
├── ideas/
├── data/
├── behavior/
├── visual/
└── variants/
    └── VAR-B-candidate/
        ├── scenario.md
        ├── ideas/
        ├── data/
        ├── behavior/
        └── visual/
```

VAR-B reuses shared/root Scenario DATA/Behavior unless something actually differs.

For example, if only VAR-B introduces `Availability Window` semantics:

```text
variants/VAR-B-candidate/data/DATA-AVAILABILITY-WINDOW.md
```

There is no need to copy unrelated request identity/status files into VAR-B.

## 14. Variant Selection

Integrated review selects VAR-B.

Workspace navigation becomes conceptually:

```text
Current Selected Variant:
VAR-B

VAR-A:
not-selected

VAR-B:
selected
```

The first Variant does not need to be physically moved into `variants/VAR-A/`. Status/navigation makes the semantic peer relationship explicit.

The answered Question/selected route leaves active Q/R/P, but any material residual Risk/Problem would remain active and the material Decision trace may be retained. In this example no residual risk remains, so the active concern projection is empty after selection.

Current Decision (shared Decision-trace semantics):

```text
D-SCN-SCHEDULE-02 — Feasible window precedes final appointment assignment

Decision:
Customer selects from currently feasible windows;
final technician/exact appointment is established afterward.

Rationale:
Avoid treating a provisional technician/time as confirmed customer-visible state.

Integrated Into:
VAR-B current Scenario flow,
appointment DATA,
related Behavior Items.

Affected Owners:
DOM-APPOINTMENT
SL-APPOINTMENT-COORDINATION
SCR-REQUEST-DETAILS
```

## 15. Screens As Spatial Owners

Several Scenarios use one Request Details Screen.

```text
screens/
├── README.md
├── ideas/
├── visual/
└── SCR-REQUEST-DETAILS/
    ├── README.md
    ├── screen.md
    ├── ideas/
    └── visual/
        └── request-details-wireframe.md
```

`screen.md` owns spatial boundaries:

```text
Header zone
Request summary zone
Appointment zone
Work evidence zone
Customer resolution zone
Primary action zone
```

Example ownership split:

```text
"primary scheduling action belongs in the Appointment/Primary Action zone"
→ Screen spatial requirement

"action is available only for a feasible current window and confirmation state"
→ Scenario / Behavior requirement

"implement the zone with a sticky React action container"
→ frontend Slice implementation plan
```

Screen-side Scenario Coverage:

```text
SCN-CHECK-REQUEST-STATUS
→ Request summary + current-status / next-responsibility zones

SCN-SCHEDULE-VISIT
→ Appointment zone

SCN-PERFORM-WORK
→ Work evidence zone

SCN-ACCEPT-RESULT
→ Customer resolution zone
```

The reciprocal Scenario-side view is also kept. For example:

```text
SCN-SCHEDULE-VISIT

Screens Used:
  SCR-REQUEST-DETAILS
    Role:
      primary coordination surface
    Relevant Flow:
      review current request → choose/propose availability → observe confirmed arrangement
```

A Scenario × Screen matrix may summarize this application-wide, but it is navigation only. The Screen does not copy Scenario Main Flows and has no `data/` or `behavior/` folder.

## 16. Domain Discovery

Detailed Scenarios expose a conceptual distinction:

```text
Technician completed work
≠
Customer accepted result
```

A separate Domain is now useful. Domain planning reads the current Scenarios/Requirements plus justified change context rather than generalizing from imagination.

Inputs include:

```text
REQ-STATUS-01
→ customer-visible state must match lifecycle meaning

AXIS-CALENDAR-PROVIDER
→ provider choice may vary, but provider-specific transport is not Service Request domain truth
```

This supports keeping provider mechanics outside the stable Service Request core rather than creating a universal integration framework.

```text
domains/
└── DOM-SERVICE-REQUEST/
    ├── README.md
    ├── domain.md
    └── ideas/
```

Selected lifecycle:

```text
NEW
→ TRIAGED
→ SCHEDULED
→ IN_PROGRESS
→ AWAITING_CUSTOMER
→ CLOSED

AWAITING_CUSTOMER
→ REOPENED
→ active work continues on the same request
```

Domain invariant:

```text
Customer rejection does not automatically create a new Service Request.
```

The Domain links the Scenarios that establish this meaning; it does not replace their behavioral flow.

## 17. Reference Object Candidate

The Domain invariant above is defined through real Scenario/Domain work and may need to appear literally in:

```text
SCN-ACCEPT-RESULT
DOM-SERVICE-REQUEST
SL-CUSTOMER-ACCEPTANCE
verification plan
manual acceptance documentation
```

If those consumers merely need the semantic owner, use ordinary Markdown links.

If they intentionally need the exact literal statement and it would be harmful for ten copied versions to drift after the Domain definition changes, that literal becomes a strong `Reference Object Candidate`.

Practical question:

```text
If I change the canonical invariant tomorrow,
do I want tooling to identify every materialized literal copy
that might still contain the old value?
```

If yes, materializing that fragment through Linked Notes RO may be justified. The relation `Slice → Domain` itself is not an RO.

A consumer may discover the candidate first. For example, the Slice can record:

```text
Source Owner:
  DOM-SERVICE-REQUEST

Canonical Meaning / Fragment:
  customer rejection keeps the same Service Request

Use Here:
  SL-CUSTOMER-ACCEPTANCE verification target

Usage Mode:
  exact-literal candidate

Reference Object Candidate:
  yes

Materialized Linked Notes RO:
  no
```

This consumer-side note is not a second definition. The Domain remains the canonical source of the invariant until/unless the exact literal is intentionally materialized through the Linked Notes contract.

## 18. Slice Strategy And Implementation Slices

The implementation is large enough that decomposition/order is a meaningful planning result. `UC-PLAN-SLICE-STRATEGY` selects a current vertical route:

```text
1. Request Intake & Triage
   → establish usable request identity/state first

2. Appointment Coordination
   → exercise scheduling/provider uncertainty while the request core already works

3. Work Visit & Evidence
   → extend lifecycle/evidence vertically

4. Customer Acceptance / Reopen
   → complete customer-resolution loop and lifecycle invariant
```

The strategy uses current Scenario/Requirement coverage and considers `AXIS-CALENDAR-PROVIDER`, but deliberately does not introduce a generic provider framework until evidence justifies it.

### Slice 1 — Request Intake & Triage

```text
customer report
→ registered request
→ dispatcher receives actionable request
```

### Slice 2 — Appointment Coordination

```text
triaged request
→ feasible windows
→ customer selection
→ finalized appointment
```

### Slice 3 — Work Visit & Evidence

```text
assigned visit
→ technician work
→ evidence
→ awaiting-customer result
```

### Slice 4 — Customer Acceptance / Reopen

```text
customer reviews result
→ accept → CLOSED
or
→ reject → same request returns to active work
```

A rich Slice workspace may be:

```text
SL-CUSTOMER-ACCEPTANCE/
├── README.md
├── slice.md
├── ideas/
├── visual/
├── frontend.md
├── server.md
└── verification.md
```

`slice.md` owns the integrated vertical result and links the Requirements/Scenario/Domain meaning it implements. `frontend.md` and `server.md` are implementation-part plans, not separate planning Use Cases or product Slices. `visual/` does not replace canonical Screen spatial authority.

## 19. Verification

For `SL-CUSTOMER-ACCEPTANCE`, verification derives from current semantic sources:

```text
Scenario Acceptance:
customer can distinguish accepted vs unresolved result.

Behavior Item:
reject returns the same request to active work.

Requirement:
customer-visible current state remains consistent with the selected lifecycle.

Domain invariant:
rejection does not create a new request automatically.

Slice target:
customer acceptance/reopen is deliverable end-to-end.
```

Planned evidence can include:

```text
Domain/unit test
→ allowed lifecycle transitions

Application/integration test
→ technician complete → awaiting customer → reject → active same request

Browser test
→ customer sees distinct Accept / Problem remains outcomes

Persistence check
→ prior visit/evidence history remains attached

Manual acceptance
→ human can complete/reject the result and understand current state
```

Tests do not become the behavior owner simply because they encode expected outcomes.

## 20. Downstream Finding Returns Upstream

Suppose Slice implementation planning discovers that technicians often have no connectivity during a visit.

Do not solve this only inside `server.md`.

```text
downstream finding
→ affected SCN-PERFORM-WORK
→ possible Requirement / Scenario DATA/state implications
→ Change-Axis review if offline operation is likely recurring evolution
→ Domain transition guarantees
→ Slice synchronization plan
→ whole-application integration review
```

The result may be a scoped Idea about offline evidence capture. Selected meaning then propagates explicitly to each affected current owner.

## 21. Final Planning Map

```text
Problem / Need
→ Current Reality when useful
→ real-world problem-resolution Workflow Variant(s)
   → Open Solution Slots when the mechanism is unresolved
→ candidate fills
   → process / manual / existing solutions / integrations / Application Concept / hybrid
→ keep viable existing alternatives in comparison
→ Application Concept review when custom software is a material candidate
   → Concept Features
   → interaction hypotheses
   → technical feasibility
   → rough effort/time/maintenance + confidence
→ compare Concept against viable alternatives in the whole workflow
→ selected Whole Solution
→ selected Application Concept when custom app wins / is already mandated
→ Application Responsibility
→ candidate Application Scenarios
→ Prototype Planning when useful
   → Prototype Scenarios / Prototype Screens
   → candidate Requirements / DATA / Behavior
   → Future Scenario Ideas / Change Axes
→ meaningful current user-visible Scenarios
   → informational/read-only Scenarios when understanding itself is the meaningful result
→ Scenario Draft workspaces
   → shared/local Ideas
   → DATA
   → Behavior
   → Related Requirements
   → Visual
   → integrated Variants when real alternatives appear
→ reciprocal Scenario ↔ Screen coverage
→ Domain when conceptual ownership helps
   → stable semantics + justified evolution stress check
→ Slice Strategy when decomposition/order matters
→ vertical Implementation Slices
→ verification evidence
→ cross-file dependency / Reference Object Candidate review
→ repeated integration review
   → Application Concept / real-world workflow / Whole Solution when material
```

This example demonstrates the methodology. Current project truth always belongs to the project's real owners, not to this example.
