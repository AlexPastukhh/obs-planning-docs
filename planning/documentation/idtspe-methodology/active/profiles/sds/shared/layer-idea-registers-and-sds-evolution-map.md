# Layer Idea Registers And SDS Evolution Map

Status: active generic working model  
Scope: one application/SDS planning run

## 1. Two Different Things

Do not mix:

```text
LOOSE / FUTURE IDEA
  something potentially useful, not yet selected or scheduled

EVOLUTION ITEM
  future/current Need/Scenario/capability/change whose development state,
  horizon/version or implementation status is worth tracking
```

An Idea does not become an Evolution Item automatically.

## 2. Global Ideas Location And Logical Registers

Default physical owner:

```text
SDS-PLANNING-STATE/
├── SDS-EVOLUTION-MAP.md
└── ideas/
    ├── INBOX.md
    ├── early/IDEAS.md
    ├── scenario/IDEAS.md
    ├── domain/IDEAS.md
    └── realization/IDEAS.md
```

Logical scopes:

```text
EARLY       Solution / Application Definition / Prototype
SCENARIO    Scenario / Screen / DATA / Behavior / local Requirement ideas
DOMAIN      Domain
REALIZATION WEUC / Architecture / Slices / Frontend / Cross-Cutting / Testing
```

`INBOX.md` is the unstructured capture point when routing is not yet clear.

Do not scatter loose/future Idea files beside individual Targets by default.

See `sds-global-planning-state-layout.md`.

## 3. Idea Entry

```text
Idea ID
Layer Register
Status:
  UNROUTED | ROUTED | DEFERRED | SELECTED-ELSEWHERE | RETIRED
Origin:
  USER | AI_PROPOSAL | EVIDENCE | SOURCE | PRIOR_TARGET
Discovered During
Idea / Possible Need / Problem
Why not current selected meaning
Likely Future Target — optional
Related current/future Need/Scenario — optional
Evidence / assumptions
Material Q/R/P refs — optional
Routing / reconsider trigger
Selection Status:
  UNSELECTED
```

These registers are deliberately suitable for premature implementation/UI/technical ideas discovered during Prototype or other earlier layers.

## 4. Promotion To Evolution Map

A loose Idea may be promoted when planning decides that the future change itself is worth tracking as expected/selected evolution.

```text
Idea
↓ evidence / Decision / accepted future intent
Evolution Item
```

Promotion does not mean implementation authorization.

## 5. SDS Evolution Map

Recommended owner:

```text
SDS-EVOLUTION-MAP.md
```

Purpose:
- keep future Needs/Scenarios/capabilities visible;
- record when/roughly where they may enter development;
- show what is already implemented;
- provide stronger future-change Sources for Change Axes and WEUC;
- avoid hiding product evolution inside loose Idea notes.

Suggested item:

```text
Evolution Item ID
Kind:
  NEED | REAL_LIFE_SCENARIO | APPLICATION_SCENARIO | CAPABILITY | INTEGRATION | OTHER
Title / Meaning
Status:
  CANDIDATE | ACCEPTED_FUTURE | PLANNED | IMPLEMENTING | IMPLEMENTED | RETIRED
Source / Decision basis
Why it matters
Related current owners
Expected horizon / version — optional
Planned implementation version — optional
Actual implementation version — optional
Dependencies
Related Change Axis
Candidate / accepted WEUC refs
Evidence / confidence
Revalidation trigger
```

Versions/horizons are recorded only when useful. Do not invent release precision.

## 6. Evolution Map ≠ Backlog

```text
Evolution Map
= product/workspace evolution context

Backlog / task tracker
= execution commitments and tasks
```

The map can say a Need/Scenario is `ACCEPTED_FUTURE` without decomposing it into implementation tasks.

## 7. WEUC Relationship

Loose future Ideas are weak WEUC evidence by themselves.

Preferred route:

```text
future Idea
→ Evidence / planning Decision
→ Evolution Item / credible expected change
→ `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`
→ architecture/evolution Finding Candidate when material
→ Core Finding Disposition
→ Architecture/Slice Answer-Decision input only when that State/owner consequence is selected
```

`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` may inspect loose Ideas as low-confidence discovery input, but they do not justify preparation-now architecture by themselves.
