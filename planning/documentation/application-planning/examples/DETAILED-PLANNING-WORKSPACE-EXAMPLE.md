# Detailed Planning Workspace Example — FixFlow Service Requests

Status: current reusable practical example
Scope: demonstrate how whole-solution planning progressively becomes Scenario Draft workspaces, shared/local DATA/Behavior/Visual, Screen spatial owners, Domain work, Implementation Slices, verification and integration review.

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

## 2. Whole-Solution Variants

### Variant A — Process-only

```text
WhatsApp templates
+ strict shared spreadsheet
+ required status rules
+ before/after photos
+ dispatcher checklist
```

### Variant B — Existing field-service SaaS

Use an existing product for scheduling/technician workflow/notifications.

### Variant C — Hybrid lightweight application

```text
keep customer communication lightweight
+ own request coordination application
+ external calendar/maps/message/payment/accounting services
```

### Variant D — Full custom platform

Own nearly all operational responsibilities.

Integrated evaluation selects Variant C because it improves one request lifecycle without unnecessarily taking ownership of messaging, maps, accounting or payment processing.

## 3. Selected Application Responsibility

Inside Application responsibility:

```text
Service Request identity/state
triage
assignment
appointment coordination state
work evidence
customer acceptance/reopen
current lifecycle/history
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

## 4. Temporary Spine Scenario

```text
Anna notices a leak
→ reports the problem and photo
→ dispatcher triages
→ technician is selected
→ visit is proposed
→ Anna confirms
→ technician performs work
→ technician records evidence
→ Anna reviews result
→ Anna accepts or reports unresolved problem
```

The Spine is only a discovery scaffold. It is not preserved as the permanent detailed behavior owner.

## 5. Scenario Discovery

The Spine exposes these independently meaningful Need/result boundaries:

| Scenario | Need | Observable result |
|---|---|---|
| `SCN-REPORT-PROBLEM` | customer needs to report one service problem | registered request exists and customer sees it was received |
| `SCN-TRIAGE-REQUEST` | dispatcher needs to make a request actionable | urgency/work type/next responsibility are established |
| `SCN-SCHEDULE-VISIT` | parties need an agreed visit arrangement | one current appointment arrangement is visible/confirmed |
| `SCN-PERFORM-WORK` | technician needs to complete assigned visit and evidence | visit completion/evidence is recorded |
| `SCN-ACCEPT-RESULT` | customer needs to judge whether the problem is resolved | result accepted or same request explicitly returns to work |

Buttons such as `Add photo`, `Open request` or `Confirm` are not peer Scenarios merely because they are visible actions.

## 6. Scenario Draft Collection

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

## 7. Detailed Scenario — Schedule Visit

`SCN-SCHEDULE-VISIT/scenario.md` initially owns one selected design.

### Identity

```text
Actor/context:
customer + dispatcher coordinating one service visit

Need:
reach a usable visit arrangement without losing the current request context

Observable result:
one current appointment arrangement is explicit to the relevant parties
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

## 8. Current-Draft-relative Risk

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

## 9. Scoped Idea Work

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

## 10. Whole Scenario Variant Appears

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

## 11. Variant Selection

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

The old risk is removed from Q/R/P because the route is selected.

Current Decision:

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

## 12. Screens As Spatial Owners

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

Scenario mapping:

```text
SCN-SCHEDULE-VISIT
→ Appointment zone

SCN-PERFORM-WORK
→ Work evidence zone

SCN-ACCEPT-RESULT
→ Customer resolution zone
```

The Screen does not copy the Scenario Main Flows and has no `data/` or `behavior/` folder.

## 13. Domain Discovery

Detailed Scenarios expose a conceptual distinction:

```text
Technician completed work
≠
Customer accepted result
```

A separate Domain is now useful:

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

## 14. Reference Object Candidate

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

## 15. Implementation Slices

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

`slice.md` owns the integrated vertical result. `frontend.md` and `server.md` are implementation-part plans, not separate product Slices. `visual/` owns presentation planning, not frontend code design.

## 16. Verification

For `SL-CUSTOMER-ACCEPTANCE`, verification derives from current semantic sources:

```text
Scenario Acceptance:
customer can distinguish accepted vs unresolved result.

Behavior Item:
reject returns the same request to active work.

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

## 17. Downstream Finding Returns Upstream

Suppose Slice implementation planning discovers that technicians often have no connectivity during a visit.

Do not solve this only inside `server.md`.

```text
downstream finding
→ affected SCN-PERFORM-WORK
→ possible Scenario DATA/state implications
→ Domain transition guarantees
→ Slice synchronization plan
→ whole-application integration review
```

The result may be a scoped Idea about offline evidence capture. Selected meaning then propagates explicitly to each affected current owner.

## 18. Final Planning Map

```text
Problem / Need
→ Whole Solution Variants
→ selected hybrid responsibility
→ temporary Spine
→ meaningful Scenarios
→ Scenario Draft workspaces
   → shared/local Ideas
   → DATA
   → Behavior
   → Visual
   → integrated Variants when real alternatives appear
→ Screens for spatial composition
→ Domain when conceptual ownership helps
→ vertical Implementation Slices
→ verification evidence
→ repeated integration review
```

This example demonstrates the methodology. Current project truth always belongs to the project's real owners, not to this example.
