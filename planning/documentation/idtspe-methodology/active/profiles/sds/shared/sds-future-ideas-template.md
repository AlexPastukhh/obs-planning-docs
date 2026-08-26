# SDS Future Ideas Compatibility Projection

Status: compatibility-only projection; not the default current owner  
Current owner model: `sds-global-planning-state-layout.md`

## Current Default

```text
SDS-PLANNING-STATE/
└── ideas/
    ├── INBOX.md
    ├── early/IDEAS.md
    ├── scenario/IDEAS.md
    ├── domain/IDEAS.md
    └── realization/IDEAS.md
```

A very small workspace may collapse these into one `ideas/IDEAS.md` with sections.

## Compatibility Purpose

Older planning captures may refer to a single `SDS-FUTURE-IDEAS.md`. Treat that name as a projection of the current `SDS-PLANNING-STATE/ideas/` owner, not as a second active store.

## Fundamental Rule

```text
Idea discovered outside current Target scope
→ preserve in current SDS ideas owner
→ remains UNSELECTED
→ later relevant Target evaluates it through normal Sources/Lenses/Decisions
```

```text
Idea in ideas/
≠ accepted Decision
≠ current Target meaning
≠ backlog commitment
≠ implementation authorization
```

## Entry Shape

```text
Idea ID
Status: UNROUTED | ROUTED | DEFERRED | SELECTED-ELSEWHERE | RETIRED
Origin: USER | AI_PROPOSAL | EVIDENCE | SOURCE | PRIOR_TARGET
Discovered During
Potential Need / Problem
Idea
Why out of current scope
Likely Future Target / UNKNOWN
Evidence / Assumptions
Q/R/P — material only
Routing Decision
Current Selection Status: UNSELECTED
```
