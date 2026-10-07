# Establish Current Work Context

State: current target executable. AI-owned work orchestration is a planned change.

## Actor and need

A person or automation has a concrete repository task. They need a durable description of the work, an isolated place to realize its packages, or just the documented work identity before continuing elsewhere.

## Situation

The actor has a registered Repository Target, exact WorkId and explicit target branch. For Work Intent creation they also supply the work title, goal, reason and acceptance criteria. A repository or work chosen in navigation must remain identifiable; an unavailable saved target is shown as unavailable rather than replaced with another target.

## Interactions

1. The actor supplies or inspects the exact repository and WorkId using [Prepare Current Work Context](../features/F-RPKG-PREPARE-CURRENT-WORK-CONTEXT.md).
2. For standalone `create-work-intent`, the application establishes one exact GitHub Issue for that WorkId. The actor receives the established work context and may stop without creating a workspace or applying a package.
3. For workspace preparation, the actor supplies the target branch and requests Start workspace. The application prepares one isolated workspace from the freshly verified remote target-branch commit.
4. The actor sees the exact workspace and source context, or a rejection/conflict. Repeating the same request recovers established work rather than creating a second Issue or unrelated workspace.

## Desired outcome and alternatives

The actor has the requested Issue and/or workspace and knows which work they belong to. Duplicate Issue markers, conflicting workspace remnants and unavailable repository sources stop the operation with an explanation. A possible Issue creation followed by a lost response is reconciled before another creation is attempted.

## Planned change

[Move Work Orchestration To AI](../../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) gives the semantic Issue, working branch and work narrative to the AI actor. The application then consumes that supplied context and may prepare an internal isolated checkout for realization. The current application-owned preparation behavior is not assumed to persist unchanged after that Step.

## Sources

[Work Intent](../../slices/SL-RPKG-10-manage-work-intent.md), [Start workspace](../../slices/SL-RPKG-11-start-changeset-workspace.md), [work navigation](../../slices/SL-RPKG-07-select-existing-work-context.md), [current consumer contract](../../PACKAGE-PROTOCOL.md).
