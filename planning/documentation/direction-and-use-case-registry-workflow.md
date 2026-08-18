# Direction And Use-Case Registry Workflow

Status: active reusable documentation-layer workflow
Scope: create/maintain semantic Direction and Use-Case Registries consistently across repositories.

## Entities

**Direction** — broad semantic work direction grouping independently useful Use Cases around a responsibility/result/planning intent.

**Use Case** — independently useful supported capability with recognizable trigger/input, purpose, meaningful result/end state, boundaries and owner route.

**Application Scenario** — detailed behavioral owner reached from an Application Use Case when material behavior exists.

**Command** — optional executable shortcut with explicit output/read/permission contract. It may relate to a Use Case but never replaces it.

## Authority Hierarchy

```text
root Direction Registry
→ root orientation + local registry references

local/family Direction Registry
→ complete Direction entries

local/family Use-Case Registry
→ complete semantic Use-Case entries

Scenario owner(s)
→ detailed application behavior

project command routing
→ executable shortcuts only
```

A global root Use-Case Registry is optional when local registries plus root Direction routing cover all capabilities; repository-wide cross-family capabilities may live there.

## Direction Contract

Stable ID/name/status, purpose, boundaries, complete owner registry, parent/root relation, real topology/optionality, child UC references, related Directions and open decisions when material.

## Use-Case Contract

Stable ID/name/status, parent Direction, purpose, trigger/input, result/end state, boundaries, topology/optionality, complete owner route, required supporting reads, related Scenario owner(s) for application behavior, related command when one exists, dependencies/handoffs and open decisions when material.

## Independent Usefulness

Create a peer Use Case only when independently useful trigger/result/owner/review/lifecycle/repeated activation/branch choice justifies it. A workflow step, heading, button, model/view or implementation module is not automatically a Use Case.

## Application Boundary

```text
Application Use Case
→ Need/Purpose + Trigger + meaningful Result + boundaries
→ Scenario owner(s) for detailed behavior
```

One Use Case may route to several Scenarios when they are contextual paths of one Need/result. A Scenario with its own independently meaningful Need + observable Result is a strong signal that a separate Use Case may be warranted.

## Update Algorithm

1. identify semantic capability and parent Direction;
2. confirm independent usefulness;
3. choose root aggregation vs narrow local/family owner;
4. assign stable ID/name/status;
5. write trigger/purpose/result/boundaries/topology;
6. link complete owner route;
7. for application behavior link Scenario owner(s);
8. link command only when a real command exists;
9. update root/navigation/responsibility owners;
10. run navigation/use-case coverage review;
11. consider projection separately.

## Do Not

- do not create a semantic Command Routing as a second owner;
- do not copy complete local entries into root aggregation;
- do not turn every step/button/file into a Use Case;
- do not imply all Use Cases are mandatory stages;
- do not let command activation or Use-Case activation expand repository permissions;
- do not let helper projections own semantic entries.
