# Architecture Planning Worked Example — Scheduling And Calendar Provider

Status: reusable example only; canonical semantics live in the Architecture Planning owners.

## 1. Current Workspace Work

Assume a scheduling web application/codebase.

Important Workspace UCs:

```text
UC-WORK-01 — Understand how scheduling eligibility is decided
UC-WORK-02 — Change one scheduling rule
UC-WORK-03 — Add one API endpoint exposing scheduling status
UC-WORK-04 — Diagnose why a scheduling request failed
UC-WORK-05 — Verify scheduling invariants
```

Notice `UC-WORK-01` is read-only: the useful result is trustworthy understanding of the Workspace.

Important concrete change:

```text
replace the current calendar provider
```

Planned Extension:

```text
support multiple calendar providers
```

Proportional expected future Workspace UCs:

```text
add a calendar provider
configure/provider-map an account
verify provider-independent scheduling behavior
diagnose provider-specific failure
replace one provider implementation
```

## 2. Representative Understanding Path

For `Understand how scheduling eligibility is decided`:

```text
repository navigation
→ scheduling Scenario / Behavior owner
→ Domain eligibility policy
→ current Requirement/invariant evidence
→ verification examples
```

If the real Workspace instead requires remembering an undocumented SQL exception, a middleware rule and a provider-specific status mapping in unrelated files, the problem is not merely file count. Discoverability, Comprehension Cost and Working-Context Load are high; forgetting one hidden fact can produce a correctness defect.

## 3. Representative Change Path

For `Add one scheduling endpoint`:

```text
understand selected behavior
→ reuse/change Domain policy only if needed
→ orchestration / endpoint
→ persistence/integration only where required
→ verification
→ configuration/docs only where required
```

Count boundaries/authorities/coordination, not just raw steps.

## 4. Change Pressure / Axis

The current provider-replacement change plus the selected multi-provider Extension and its future UCs provide evidence for:

```text
AXIS-CALENDAR-PROVIDER
```

The axis does not itself require a Port everywhere. It creates pressure only at boundaries it actually crosses.

## 5. Material Architecture Decision

Question:

```text
Should the current scheduling implementation introduce a CalendarPort now?
```

Evaluate candidate designs against:

```text
Does it help or burden UC-WORK-03 now?
Does it reduce future provider-add/replace path cost?
Does it make UC-WORK-01 easier to understand?
Does it reduce provider payload detail the Domain developer must remember?
Does it add mapping/mock/configuration ceremony to every ordinary scheduling-rule change?
Are provider-independent semantics real and stable enough now?
Does the Planned Extension pay today's abstraction tax at this exact boundary?
```

Possible selected result:

```text
Selected:
introduce one narrow semantic CalendarAvailability boundary
between scheduling meaning and provider-specific availability mechanics.

Why it pays now:
- scheduling rules already need provider-independent semantic availability;
- current verification benefits from isolating provider payload semantics;
- the planned second-provider Extension crosses this exact boundary.

Rejected Complexity:
generic plugin/provider-registry architecture.

Revisit Trigger:
providers acquire independently configurable capabilities
or provider selection itself becomes a material current behavior/axis.
```

The example demonstrates the intended reasoning: architecture is evaluated through current/future Workspace UCs and their paths, including understanding cost, rather than by making the code resemble a preferred pattern catalogue.
