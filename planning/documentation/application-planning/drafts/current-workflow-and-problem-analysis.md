# Current Workflow And Problem Analysis Draft

Status: working first-stage draft

Template: `../templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md`

## Purpose

Capture the user’s current end-to-end experience of using AI, a documentation layer, planning systems, repository commands and change-application workflows for complex work that requires persistent context and careful control.

This draft records the current workflow, current strengths, user experience, experienced problems, suspected risks, workarounds, existing user ideas and unknowns. It does not define what should be improved or select a future solution.

## Capture Scope

### Included

```text
- work that is too complex to handle as one isolated AI request;
- persistent context, rules, templates and documentation used to guide AI;
- Goal Map, day planning and session planning connections;
- repository navigation and command bootstrap;
- planning artifacts for applications and other complex work;
- replacement-archive application and diff review;
- AI-agent execution paths;
- testing and verification as currently understood;
- finalization, documentation and history preservation;
- current user ideas mentioned while describing the workflow.
```

### Excluded

```text
- evaluation of which ideas are best;
- formulation of improvement targets;
- market or ecosystem research;
- a target future workflow;
- accepted application requirements;
- detailed product architecture;
- detailed scenario, domain or slice planning for a future solution.
```

## User Starting Context

| Field | Current statement |
|---|---|
| What the user currently understands | The user has an established but evolving AI-driven planning and execution workflow, a documentation repository, command projections, archive application, Goal Maps and day/session planning. Several parts already work, but the complete workflow has not yet been captured as one current-state artifact. |
| What the user is unsure about | The user is unsure which current difficulties are actual problems, which are only risks, how much implementation documentation is necessary, how review by several AI chats should work, how testing should be planned, and how much activity/chat history should be preserved. |
| Existing ideas already mentioned | Context packaging, automatic command projection updates, navigation validation, deterministic archive application, easier PowerShell output capture, better diff review, multi-chat review, code-linked slice diagrams, stronger testing visibility, action logging and selective chat capture. |

## Actors And Working Environment

| Actor / environment | Current role | Current tools | Unknowns |
|---|---|---|---|
| User | Explains goals and principles, reviews AI work, chooses work for days/sessions, applies or authorizes changes | ChatGPT, browser, PowerShell, VS Code, Git, GitHub, Tampermonkey planning tools | Exact review effort allocation and mandatory checkpoints are not yet defined |
| Primary AI chat | Plans, drafts documentation or code changes, creates replacement packages, reviews pasted diffs | Chat context, connected repository/files, command prompts | Reliability depends on correct bootstrap and loaded documentation |
| Additional AI chats | Possible independent, adjacent-context or research review | Separate chat contexts and bootstrap prompts | Roles, required contexts and output protocol are not formalized |
| Documentation repository | Persistent rules, templates, command owners, navigation and planning artifacts | Markdown repository | Navigation and projection consistency require maintenance |
| Tampermonkey command palette | Inserts command bodies and key reminders into ChatGPT | Userscript | Key reminders and other projected fields may become stale |
| Goal Map / planning system | Connects long work to goals, days and sessions | Current Tampermonkey UI; planned React-based development compiled to one Tampermonkey file | Exact integration with application-planning artifacts is not fully described |
| Replacement archive workflow | Applies full replacement files and transfers a diff to chat | ZIP, PowerShell, Git clipboard diff | Error-output transfer can be inconvenient |
| AI coding agent / IDE path | Applies edits directly and exposes a diff | Codex or another agent, VS Code | The user finds some IDE diff views difficult to read |
| Browser extension | Limits rendering of old ChatGPT messages for performance | Fixed recent-message rendering | Full chat-history access and capture remain inconvenient |

## Workflow Start And End

| Boundary | Current description |
|---|---|
| Start | A problem, goal or task appears that is complex, requires serious control and additional context, or may be larger than the practical context of one AI conversation. |
| End | Work is applied and finalized, related documentation is updated to some degree, and enough history remains to continue later. The exact end boundary is still unclear because future maintenance and reactivation of context are part of the same long-lived experience. |

## Current End-To-End Workflow

```text
WF-01 complex task appears
  → WF-02 connect it to Goal Map / day / session planning
  → WF-03 provide principles, rules and templates
  → WF-04 bootstrap AI into repository documentation and navigation
  → WF-05 invoke documented commands and command projections
  → WF-06 create planning artifacts and perform the work
  → WF-07A apply changes through a replacement archive
       or WF-07B apply changes through an AI coding agent / other path
  → WF-08 review AI output and diffs
  → WF-09 test and verify
  → WF-10 finalize changes and update documentation
  → WF-11 preserve action, task and conversation history for later continuation
```

## Workflow Step Index

| ID | Current step | Trigger | Purpose | Previous / next step |
|---|---|---|---|---|
| WF-01 | Recognize a complex task | A task requires significant context and control | Establish that ordinary one-off prompting is insufficient | Start → WF-02 |
| WF-02 | Connect work to planning system | The task must become actionable over time | Link large work to Goal Maps, days and sessions | WF-01 → WF-03 |
| WF-03 | Provide principles, rules and templates | AI needs to respond and work in a specific way | Preserve reusable behavior and information shapes | WF-02 → WF-04 |
| WF-04 | Bootstrap AI into documentation context | A new chat or agent session starts | Make commands, owners and relevant context discoverable | WF-03 → WF-05 |
| WF-05 | Invoke documented commands | A specific planning, update or archive action is needed | Activate a repeatable repository-defined workflow | WF-04 → WF-06 |
| WF-06 | Plan and perform complex work | Context and workflow rules are available | Produce planning artifacts, documentation, code or other work | WF-05 → WF-07A / WF-07B |
| WF-07A | Apply replacement archive | AI returns full replacement package | Apply controlled file replacements locally | WF-06 → WF-08 |
| WF-07B | Apply through AI agent or other direct path | Agent edits files directly | Avoid manual archive application and expose a natural diff | WF-06 → WF-08 |
| WF-08 | Review output and changes | Draft, answer or diff is available | Detect errors before finalization | WF-07A / WF-07B → WF-09 |
| WF-09 | Test and verify | Implementation or behavioral change exists | Establish confidence in the result | WF-08 → WF-10 |
| WF-10 | Finalize and document work | Review and testing are sufficient | Commit/push or otherwise apply and preserve relevant documentation | WF-09 → WF-11 |
| WF-11 | Preserve history and continuity | Work may resume later | Avoid losing actions, explanations, decisions and context | WF-10 → later continuation |

## Detailed Workflow Steps

### Step: WF-01 — Recognize A Complex Task

#### Trigger

A problem or task appears that may require substantial context, rules, documentation and control, such as planning or writing an application or another complex activity.

#### Purpose

Determine that the work should be handled as a long-lived structured process rather than as one isolated AI answer.

#### Current Actions

1. The user identifies a problem, task or desired result.
2. The user begins explaining the context to AI.
3. The user recognizes that the work may exceed one chat context and may continue over a long period.

#### Inputs

```text
- initial problem or task;
- existing knowledge and previous explanations;
- current project/documentation state;
- user expectations about control and quality.
```

#### Outputs

```text
- an initial understanding that persistent planning/context is needed;
- the beginning of a chat or documentation process.
```

#### Tools And Environments

ChatGPT and existing project/documentation repositories.

#### Dependencies

The user must remember enough prior context to explain where the work currently stands or locate it in documentation.

#### Current Strengths

The user already recognizes that complex work needs persistent context and a documentation layer rather than relying only on chat memory.

#### User Experience And Feelings

The user wants previous detailed explanations to remain available, wants AI to remind them of forgotten details, and does not want earlier work to become meaningless over time.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-01 | Important context has to be explained again or recovered from previous work | New or long-running AI work | Repetition and risk of omitting details | Persist principles and project information in documentation | user-reported |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-01 | Work may lose value over time if details remain only in chat | Chat context is limited and old conversations are difficult to use | Partly; exact examples not yet listed | suspected with user experience |

#### Exceptions And Current Alternative Paths

Small tasks may still be handled directly without the full documentation workflow.

#### Frequency And Current Impact

Frequent for serious planning and implementation work; exact frequency is not yet provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-01 | Keep a large documentation block always available to AI and allow AI to remind the user about prior explanations | Fear of losing context and details | Context persistence and reactivation | Exact mechanism is unknown | recorded, not evaluated |

#### Unknowns

Concrete examples of information that was lost or had to be reconstructed are not yet provided.

### Step: WF-02 — Connect Work To Goal Maps, Days And Sessions

#### Trigger

The complex task must be turned into work that can be selected and completed over time.

#### Purpose

Connect high-level planning to achievable daily and session-level actions.

#### Current Actions

1. The user uses a separate planning system based on Goal Maps, minimum requirements, planning bases and sequences.
2. The user plans days and sessions inside days.
3. Project work must be represented well enough to choose what to do during a day.
4. The current planning interface works through Tampermonkey.
5. A React implementation compiled into one Tampermonkey file is planned to make development more convenient.

#### Inputs

Goal, current plan, available time, day/session planning state.

#### Outputs

Selected daily/session work connected to the larger goal.

#### Tools And Environments

Goal Map concepts, day/session planning system, Tampermonkey; planned React development output.

#### Dependencies

The project plan must be decomposed enough to become actionable.

#### Current Strengths

A planning system already exists and explicitly connects long work with day and session planning.

#### User Experience And Feelings

The user considers integration important because an unreachable or insufficiently detailed project plan cannot be used to plan the day.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-02 | A plan that is too distant or insufficiently decomposed cannot be selected as concrete day work | Daily planning | Difficulty choosing a realistic next action | Use Goal Maps and session planning | user-reported principle; concrete case not yet provided |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-02 | Application-planning artifacts may not connect cleanly to Goal Maps and session plans | The systems are being developed separately | Not specified | suspected |

#### Exceptions And Current Alternative Paths

Not provided.

#### Frequency And Current Impact

Applies whenever long-running work is planned; exact operational frequency is not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-02 | Integrate any complex-work planning with the Goal Map/day/session system | Need to select concrete work for the day | Planning continuity | Exact integration model is unknown | recorded, not evaluated |
| IDEA-03 | Develop the planning UI in React and compile it into one Tampermonkey file | Current Tampermonkey development is less convenient | Planning-system development experience | Technical shape is not yet confirmed here | recorded, not evaluated |

#### Unknowns

The current data/link structure between a Goal Map item, a day item, a session and a project planning artifact is not yet described.

### Step: WF-03 — Provide Principles, Rules And Templates

#### Trigger

AI needs to answer, plan or edit according to the user’s preferred behavior.

#### Purpose

Avoid explaining the same behavioral rules and information structures from scratch for every task.

#### Current Actions

1. The user explains principles that AI should follow.
2. The user defines templates for chat answers and planning files.
3. Reusable rules are stored in a documentation layer.
4. The user expects AI to use the documentation to remain consistent and reviewable.

#### Inputs

User principles, response preferences, file templates, planning methodology.

#### Outputs

Persistent reusable documentation that can guide later AI work.

#### Tools And Environments

Markdown documentation repository, ChatGPT prompts and templates.

#### Dependencies

Rules must be discoverable, current and correctly separated by owner responsibility.

#### Current Strengths

The documentation layer already allows the user to define AI behavior more precisely than generic prompting.

#### User Experience And Feelings

The user wants AI to understand how work should be done and wants its output to be checkable.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-03 | The user may need to repeat principles when a chat lacks the right context | New chat or incomplete bootstrap | Repetition and possible omission | Store rules in documentation and commands | user-reported |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-03 | A large documentation layer may become difficult to keep discoverable and synchronized | Files are added, changed or removed over time | Specific failure not yet provided | suspected |

#### Exceptions And Current Alternative Paths

For small tasks the user may explain the needed behavior directly in chat.

#### Frequency And Current Impact

Frequent across complex work.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-04 | Provide complete current guidelines through generated links or context injection instead of only telling AI to read files | Concern that route-based reading may miss something | Context loading reliability | The user is not sure this would be better | recorded, not evaluated |

#### Unknowns

Which rules are reusable across all work and which are project-specific still need to be mapped more fully.

### Step: WF-04 — Bootstrap AI Into Documentation Context

#### Trigger

A new chat or AI agent needs to work with repository-defined commands and rules.

#### Purpose

Make the AI aware that commands, navigation, owners and documentation routes exist.

#### Current Actions

1. The user supplies a bootstrap prompt or command body.
2. The command points to the root use-case map and linked owner files.
3. The AI reads or is expected to read the required route.
4. Repository navigation is used to discover related documentation.

#### Inputs

Bootstrap prompt, root use-case map, owner documentation, repository context.

#### Outputs

An AI session that understands the relevant command and documentation boundaries.

#### Tools And Environments

ChatGPT, connected repository/files, Markdown navigation.

#### Dependencies

Entry points and links must remain correct; the AI must actually follow them.

#### Current Strengths

Good navigation and a correct prompt often make the command system work adequately.

#### User Experience And Feelings

The user sees this stage as solvable but not fully predictable.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-04 | AI may not recognize commands without repository context or bootstrap | New chat or session | Command intent may be misunderstood | Explicitly provide route-read command bodies | user-reported |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-04 | Navigation may break as files are added, renamed or removed | Documentation evolves | No concrete broken path listed yet | suspected |
| RISK-05 | AI may appear to understand despite missing part of the route | AI behavior is not fully predictable | Not specified | suspected |

#### Exceptions And Current Alternative Paths

The user may explicitly name required files when the route is uncertain.

#### Frequency And Current Impact

Occurs at the start of new chats and agents.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-05 | Make all documentation discoverable from an entry point and validate that every route still leads to its required owners | Navigation maintenance concern | Bootstrap predictability | Exact validation method is unknown | recorded, not evaluated |

#### Unknowns

The exact current bootstrap sequence used for each AI environment is not yet fully documented.

### Step: WF-05 — Invoke Documented Commands

#### Trigger

The user wants a specific planning, update, archive, review or other documented action.

#### Purpose

Activate repeatable behavior without manually restating the complete workflow.

#### Current Actions

1. The user selects or inserts a command from a Tampermonkey command script.
2. The command contains route information and key reminders.
3. Owner documents explain the actual behavior.
4. The AI follows the command route and produces the requested output.

#### Inputs

Command body, active chat context, UCM route, owner docs, key reminders.

#### Outputs

A planning answer, archive, review or other command-specific result.

#### Tools And Environments

Tampermonkey command palette, repository UCM and owner docs, ChatGPT.

#### Dependencies

Command projection and owner docs must remain aligned.

#### Current Strengths

The command system is already usable; command changes do not currently create severe problems in most cases.

#### User Experience And Feelings

The user considers this stage reasonably convenient when the command and documentation format are correct.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-05 | Command-specific reminders require manual maintenance when owner behavior changes | Documentation updates | Additional synchronization work | Manually update Tampermonkey command definitions | current behavior confirmed; failure example not provided |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-06 | Key reminders or other projected command fields may become outdated | Rules are duplicated in projections | Theoretical / not specified | suspected |

#### Exceptions And Current Alternative Paths

The user may paste a command manually rather than use the command palette.

#### Frequency And Current Impact

Frequent in repository work.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-06 | Automatically update or validate key reminders and other Tampermonkey command parts from canonical documentation | Projection staleness concern | Command maintenance | Exact source format is unknown | recorded, not evaluated |

#### Unknowns

The number of command fields that are manually duplicated and how often they change are not yet listed.

### Step: WF-06 — Plan And Perform Complex Work

#### Trigger

The AI has enough context and a command or planning task is active.

#### Purpose

Turn a complex task into persistent planning artifacts, code, documentation or other controlled work.

#### Current Actions

1. The user and AI perform preplanning and idea processing.
2. Scenario drafts may be created.
3. Domain-layer planning may be created.
4. Implementation or slice drafts may describe cross-file behavior.
5. Testing considerations are included to some degree.
6. The AI creates or proposes actual work from these artifacts.

#### Inputs

Current task, repository context, rules, existing drafts, user explanations.

#### Outputs

Planning drafts, decisions, documentation, code changes and test-related material.

#### Tools And Environments

ChatGPT, Markdown planning files, IDE/code repository.

#### Dependencies

The artifact sequence and templates must remain useful without becoming excessive or stale.

#### Current Strengths

The user currently considers preplanning, scenarios and the domain layer broadly reasonable. Cross-file slice diagrams can show relationships that require several code jumps in an IDE.

#### User Experience And Feelings

The user is uncertain whether all detailed application drafts are necessary. The implementation/slice stage feels less flexible and raises more questions than preplanning, scenarios and domain planning.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-06 | Cross-file algorithms are hard to understand from code alone because the user must follow references file by file | Controller → application service → repository → database paths | More effort to see the whole flow | Use a visual overview or slice diagram | user-reported |
| PS-07 | Real class and method names are difficult to maintain in plain textual slice documentation | Implementation planning and later code changes | Documentation may diverge from implementation | Attempt to use real names in overview text | user-reported difficulty |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-07 | Implementation drafts may duplicate self-explanatory code and reduce flexibility | Detailed planning can repeat implementation details | Specific stale example not yet provided | suspected |
| RISK-08 | Testing may be underplanned despite being especially important in AI-driven work | Current testing method is not yet clear | Not specified | suspected |

#### Exceptions And Current Alternative Paths

Some work may move directly from scenarios/domain planning to code without a detailed slice draft.

#### Frequency And Current Impact

Applies to complex application work; exact frequency of each artifact type is not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-07 | Revisit planning-file templates, especially implementation/slice templates | Concern about rigidity and duplication | Planning flexibility and maintainability | Exact replacement shape is unknown | recorded, not evaluated |
| IDEA-08 | Link slice overviews to real code symbols so real method/class names are easier to use and update | Difficulty maintaining names in text | Cross-file algorithm documentation | Tooling and durability are unknown | recorded, not evaluated |
| IDEA-09 | Examine testing as a major user-review responsibility and provide more testing observability | AI-driven implementation risk | Confidence and review effort | The right amount of user effort is unknown | recorded, not evaluated |

#### Unknowns

One useful slice draft and one problematic slice draft are needed to describe the current experience more concretely. The current testing workflow is also not yet documented.

### Step: WF-07A — Apply Changes Through A Replacement Archive

#### Trigger

The AI prepares full replacement files as a ZIP package.

#### Purpose

Apply controlled file replacements while preserving a review boundary before finalization.

#### Current Actions

1. The user downloads the archive.
2. The user copies the supplied PowerShell apply/diff command.
3. The user opens or selects the correct PowerShell window and repository.
4. The user pastes the command and presses Enter once.
5. The command validates and applies replacement files.
6. The command captures a Git diff and copies it to the clipboard.
7. The user pastes the diff into chat.

#### Inputs

Replacement ZIP, repository path, one-line PowerShell command, current Git state.

#### Outputs

Applied local file changes and a diff transferred to chat.

#### Tools And Environments

Browser downloads, PowerShell, Git, clipboard, ChatGPT.

#### Dependencies

The AI must output the command in the documented non-interactive format. The correct archive and repository path must be available.

#### Current Strengths

The flow is already fairly convenient when the command format is correct. Full replacement files and a pasted diff make the result reviewable.

#### User Experience And Feelings

The user accepts the basic download/copy/paste flow but notices friction when a command fails or produces a large output.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-08 | Long PowerShell error output is inconvenient to copy back into chat | Apply command failure | Manual selection and risk of incomplete error transfer | Copy terminal text manually | user-reported |
| PS-09 | The user must download the archive and use the correct PowerShell location | Every archive application | Several manual handoffs | Follow the supplied command and current procedure | current behavior; inconvenience user-reported |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-09 | AI is unnecessary for generating a mostly fixed apply command and may introduce format mistakes | Command structure is highly deterministic | Formatting mistakes have occurred in the broader workflow | partly experienced, exact count unknown |

#### Exceptions And Current Alternative Paths

Some changes are applied by an AI coding agent instead of an archive.

#### Frequency And Current Impact

The archive path is described as the main current application method; exact frequency is not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-10 | A local application receives or detects the archive name and performs the fixed application workflow | Repeated deterministic command generation | Application convenience and predictability | A custom app may be unnecessary | recorded, not evaluated |
| IDEA-11 | Capture and copy all PowerShell output produced after the last entered command | Difficult manual error copying | Error reporting to AI | The user does not know the best terminal mechanism | recorded, not evaluated |

#### Unknowns

The exact failure frequency, average output size and current PowerShell history/capture options are not yet documented.

### Step: WF-07B — Apply Through An AI Coding Agent Or Other Direct Path

#### Trigger

The user chooses an AI agent or another tool that edits repository files directly.

#### Purpose

Apply changes without downloading and applying a replacement archive.

#### Current Actions

1. The agent edits files.
2. The environment exposes a diff.
3. The user reviews the diff in the IDE or associated tooling.
4. Additional AI review may be requested.

#### Inputs

Task, repository context, agent instructions, existing code and documentation.

#### Outputs

Direct repository edits and a natural diff.

#### Tools And Environments

Codex or another AI agent, VS Code, Git; possible GitHub tools are not yet described.

#### Dependencies

The agent must receive the correct context and scope. The diff view must be understandable enough for review.

#### Current Strengths

The diff is naturally available and there is no separate archive-application step.

#### User Experience And Feelings

The user finds the Codex/VS Code diff difficult to read and is unsure whether this is a learning issue or an interface issue.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-10 | The VS Code/Codex diff is difficult for the user to read | Agent-applied changes | Harder personal review | Ask AI to explain or use another review path | user-reported |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-10 | Direct editing may reduce the clarity of the planned-vs-actual review boundary | Changes appear directly in the workspace | Not specified | suspected |

#### Exceptions And Current Alternative Paths

Potential GitHub-tool or pull-request-based paths have been mentioned but are not currently described as an established workflow.

#### Frequency And Current Impact

Not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-12 | Investigate other application routes, including GitHub tools | Uncertainty about agent/archive trade-offs | Change application and review | Current capabilities are unknown | recorded, not evaluated |
| IDEA-13 | Find or build a more readable diff-review experience | Difficulty reading current IDE diff | Personal review | Existing tools may already be sufficient | recorded, not evaluated |

#### Unknowns

Which agents and GitHub operations are used today, and how their review/finalization steps differ, are not yet described.

### Step: WF-08 — Review AI Output And Changes

#### Trigger

An AI answer, plan, archive diff or agent diff is available.

#### Purpose

Detect errors, missing requirements and unintended effects before finalization.

#### Current Actions

1. The producing chat may recheck its own answer.
2. The user pastes archive diffs back into the producing chat.
3. The user intends to review the complete diff personally.
4. The user may consider asking another chat to review.
5. Different chats may be bootstrapped with different adjacent contexts.

#### Inputs

AI answer, plan, raw diff, relevant documentation and user expectations.

#### Outputs

Review findings, corrected work or approval to continue.

#### Tools And Environments

ChatGPT chats, terminal/clipboard, VS Code diff, possibly GitHub diff.

#### Dependencies

Reviewers need the right context and a clear target. The diff must be readable and complete.

#### Current Strengths

The current archive workflow already forces the diff to be pasted before finalization. The user intends to keep personal review as part of the process.

#### User Experience And Feelings

The user wants AI review to reduce personal effort before final human review, but the orchestration is not yet defined.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-11 | Raw diffs can be difficult to inspect completely and comfortably | Large or cross-file changes | Review takes effort and may miss context | Ask AI to review and inspect manually | user-reported concern |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-11 | The producing chat may share the same blind spots as its original answer | Self-review is not independent | Not specified | suspected |
| RISK-12 | Several AI reviewers may duplicate effort if their roles and contexts are not distinct | Proposed multi-chat review is not formalized | Not yet implemented | suspected |

#### Exceptions And Current Alternative Paths

Small changes may receive only one AI review plus a quick human check.

#### Frequency And Current Impact

Every meaningful archive diff is reviewed by chat; other review frequencies are not defined.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-14 | Create a command for a chat to check its own answer or another chat’s answer against the required workflow | Need for repeatable review | Obvious error detection | Exact protocol is unknown | recorded, not evaluated |
| IDEA-15 | Use separate chats with different contexts: self-review, adjacent-area review and a chat that searches for simpler established solutions | Desire for independent perspectives | Review coverage | Cost and orchestration are unknown | recorded, not evaluated |
| IDEA-16 | Provide a dedicated place to paste and inspect a full diff in a convenient form | Raw diff review discomfort | Human and AI review | Existing tools may already solve it | recorded, not evaluated |

#### Unknowns

Mandatory review roles, output formats, context packages, stop conditions and the relationship between AI review and line-by-line human review are not defined.

### Step: WF-09 — Test And Verify

#### Trigger

Implementation or another behavior-changing result exists.

#### Purpose

Establish confidence that the result behaves correctly and does not only appear plausible.

#### Current Actions

Testing is considered during application planning and implementation, but the current detailed workflow is not yet provided.

#### Inputs

Scenarios, implementation, tests, expected behavior and risks.

#### Outputs

Test results and confidence for finalization.

#### Tools And Environments

Not fully described.

#### Dependencies

Tests must reflect meaningful behavior rather than only AI-generated implementation details.

#### Current Strengths

The user already recognizes testing as especially important in AI-driven work.

#### User Experience And Feelings

The user suspects this may be one of the areas where personal time and attention should be concentrated, but is not sure how much.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-12 | The current testing workflow is not clear enough to the user | AI-driven implementation planning | Uncertainty about confidence and review effort | Consider testing in plans; details not provided | user-reported uncertainty |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-13 | Passing tests may provide false confidence if the tests are weak or generated from the same misunderstanding | AI may generate both implementation and tests | Not specified | suspected |

#### Exceptions And Current Alternative Paths

Not provided.

#### Frequency And Current Impact

Applies to implementation work; exact current test types and frequency are not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-17 | Give testing greater visibility and possibly greater personal review effort | Importance of testing in AI-driven work | Confidence and error prevention | The correct balance is unknown | recorded, not evaluated |

#### Unknowns

Current test levels, tools, planning artifacts, acceptance criteria and human review steps are not described.

### Step: WF-10 — Finalize And Document Work

#### Trigger

Work has been reviewed and, where applicable, tested.

#### Purpose

Make the change final and preserve enough explanation for future maintenance.

#### Current Actions

1. Changes are committed/pushed or otherwise applied.
2. Git records file history.
3. Planning and product documentation may be updated.
4. The current documentation approach may include preplanning, scenarios, domain-layer artifacts and implementation/slice drafts.

#### Inputs

Reviewed changes, tests, planning artifacts and documentation.

#### Outputs

Final repository state and updated documentation/history.

#### Tools And Environments

Git, GitHub, documentation repository, code repository.

#### Dependencies

Documentation must remain useful without duplicating code excessively or becoming stale.

#### Current Strengths

The workflow does not rely only on a Git log. Preplanning, scenarios and domain artifacts preserve reasoning and context.

#### User Experience And Feelings

The user considers preplanning, scenarios and domain-layer documentation broadly adequate, but is concerned about the amount and flexibility of implementation documentation.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-13 | Cross-file implementation relationships are easier to see in a slice diagram than by following code links one by one | Maintenance or review of application logic | Need to keep visual documentation alongside code | Maintain slice overviews | user-reported benefit and burden |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-14 | Detailed implementation documentation may become stale or duplicate code | Real symbol names and code structure change | Specific stale case not yet provided | suspected |

#### Exceptions And Current Alternative Paths

Some changes may be sufficiently explained by code, tests and commit history without a separate slice update.

#### Frequency And Current Impact

Applies after meaningful changes; documentation update frequency is not provided.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-18 | Reconsider which implementation details belong in planning documentation and which should be expressed by code | Concern about duplication and rigidity | Documentation burden and clarity | Boundary is unresolved | recorded, not evaluated |

#### Unknowns

The current mandatory documentation update checklist and examples of stale/valuable implementation documents are not provided.

### Step: WF-11 — Preserve Action And Conversation History

#### Trigger

Work spans several sessions or may need to be resumed later.

#### Purpose

Avoid confusion about what was done, why it was done and which task or subtask it belonged to.

#### Current Actions

1. Git retains commits.
2. Some planning and documentation files retain decisions and work state.
3. The user considers keeping an action log connected to tasks and subtasks.
4. Chat history contains user explanations and AI responses.
5. A browser extension limits rendered old messages to avoid ChatGPT performance problems.

#### Inputs

Tasks, actions, chats, diffs, decisions, commits and documentation updates.

#### Outputs

Partial historical trace available through several separate systems.

#### Tools And Environments

Git/GitHub, planning documents, ChatGPT history, browser extension.

#### Dependencies

Relevant history must remain accessible without making ChatGPT unusable or creating excessive duplicate storage.

#### Current Strengths

Git and planning files already preserve some history. The user actively thinks about linking work to tasks and subtasks.

#### User Experience And Feelings

The user feels a need for a clearer action log to avoid getting confused. The user is unsure whether complete chat history or selected messages should be preserved.

#### Experienced Problem Situations

| ID | Current situation | Context / trigger | Experienced consequence | Current response / workaround | Evidence status |
|---|---|---|---|---|---|
| PS-14 | Long ChatGPT conversations have performance/rendering problems | Large chat history | Old messages are difficult to keep rendered and accessible | Browser extension renders only a fixed number of recent messages | user-reported |
| PS-15 | Actions, task relationships, chat explanations and commits are not available as one clear chain | Long-running work | Risk of confusion and difficult reconstruction | Use separate logs, docs, chats and Git history | user-reported need; exact failure example not provided |

#### Suspected Problems Or Risks

| ID | Concern | Why the user suspects it | Has it occurred? | Current evidence status |
|---|---|---|---|---|
| RISK-15 | Saving all chat messages may create too much information and another retrieval problem | Chats are long and performance is already poor | Not implemented | suspected |

#### Exceptions And Current Alternative Paths

The user may preserve only selected explanations or decisions rather than complete conversations.

#### Frequency And Current Impact

Continuous across long-running projects.

#### Existing User Ideas Related To This Step

| Idea ID | User idea | What led to it | What the user thinks it may affect | User doubts | Evaluation status |
|---|---|---|---|---|---|
| IDEA-19 | Keep an action log linked to concrete tasks and subtasks | Need to avoid confusion | Work traceability | Exact schema is unknown | recorded, not evaluated |
| IDEA-20 | Capture selected user and AI messages from ChatGPT through copy buttons and associate them with work | Chat performance and history concerns | Context preservation | It is unclear whether full chat capture is useful | recorded, not evaluated |

#### Unknowns

Which historical questions the user has actually failed to answer later, and what minimum evidence would have been enough, are not yet provided.

## Cross-Step User Experience

| ID | Experience / concern | Affected current steps | Current description | Evidence status |
|---|---|---|---|---|
| UX-01 | Fear of losing important context and prior explanations | WF-01, WF-03, WF-04, WF-11 | The user wants previous detailed explanations to remain available and useful over time | user-reported |
| UX-02 | Need for AI behavior to be predictable and reviewable | WF-03, WF-04, WF-05, WF-08 | The user uses rules, commands, owner docs and diff review so AI works in a controlled way | user-reported |
| UX-03 | Friction from repeated manual handoffs | WF-07A, WF-08 | Download, copy, PowerShell and chat transfer are acceptable but not effortless, especially on failure | user-reported |
| UX-04 | Difficulty seeing complete cross-file behavior | WF-06, WF-10 | Code navigation shows local links, while slice diagrams show the whole path | user-reported |
| UX-05 | Uncertainty about review and testing sufficiency | WF-08, WF-09 | The user wants several review perspectives and stronger testing but has no stable protocol | user-reported |
| UX-06 | Need to connect long-term planning to daily action | WF-02, WF-06 | A plan is only useful when it can become reachable day/session work | user-reported |
| UX-07 | Need for continuity over time | All steps, especially WF-11 | Work should not become meaningless because context, decisions or history are lost | user-reported |

## Descriptive Problem Groupings

| ID | Current description | Related situations | Affected current steps | Current workarounds | Status |
|---|---|---|---|---|---|
| PG-01 | Persistent context is distributed across chat, documentation and memory | PS-01, PS-03, PS-14, PS-15 | WF-01, WF-03, WF-04, WF-11 | Documentation layer, bootstrap prompts, browser extension, Git history | descriptive only |
| PG-02 | Documentation and command routes require ongoing synchronization and discoverability | PS-04, PS-05; RISK-03 to RISK-06 | WF-03, WF-04, WF-05 | Explicit file references, owner docs, manual projection updates | descriptive only |
| PG-03 | Applying archive changes involves deterministic but manual handoffs and awkward error transfer | PS-08, PS-09; RISK-09 | WF-07A | One-line commands, clipboard diff, manual terminal copying | descriptive only |
| PG-04 | Review is split across chat, terminal, IDE and personal inspection | PS-10, PS-11; RISK-11, RISK-12 | WF-07B, WF-08 | AI review, pasted diff, manual review | descriptive only |
| PG-05 | Implementation planning and code do not provide one stable shared view of cross-file behavior | PS-06, PS-07, PS-13; RISK-07, RISK-14 | WF-06, WF-10 | Slice drafts and diagrams | descriptive only |
| PG-06 | Testing responsibilities and confidence are not fully described | PS-12, RISK-08, RISK-13 | WF-06, WF-09 | Testing considered informally in planning | descriptive only |
| PG-07 | Work history is fragmented across tasks, chats, docs and commits | PS-14, PS-15, RISK-15 | WF-10, WF-11 | Git, planning files, browser extension | descriptive only |
| PG-08 | Large plans need continuity into daily/session execution | PS-02, RISK-02 | WF-02, WF-06 | Goal Maps and day/session planning | descriptive only |

## Current Strengths

| Current workflow area | What already works well | User evidence / comment |
|---|---|---|
| Persistent documentation | Rules and explanations can live outside one chat context | The user already relies on a documentation layer |
| Command system | Reusable commands reduce repeated explanation | The user says this stage is generally not too bad |
| Archive review boundary | Full replacements plus pasted diff allow review before finalization | The user considers the flow fairly convenient when command format is correct |
| Goal Map and daily planning | Long work can be connected conceptually to days and sessions | The user already has a separate planning system |
| Preplanning, scenarios and domain planning | These layers currently do not create major concerns | Explicit user statement |
| Slice visualization | One diagram can expose a controller → service → repository → database path | Explicit user example |
| Direct agent path | A diff is naturally available after agent edits | Explicit user statement |
| Human control | The user intends to inspect changes personally even when AI reviews first | Explicit user statement |
| Git history | File changes and commits remain available | Current tool behavior and user workflow |

## Existing Satisfactory Solutions

| Current step / need | Existing solution | Why it currently helps | Remaining uncertainty |
|---|---|---|---|
| Reusable AI behavior | Documentation principles, workflows and templates | Reduces repeated prompting and makes output reviewable | Long-term discoverability and synchronization |
| Command activation | Tampermonkey command palette plus UCM/owner files | Fast command insertion with route reading | Projected reminders may become stale |
| Controlled file application | Replacement archive plus PowerShell and pasted Git diff | Predictable full-file replacement and review boundary | Failure-output handling and manual handoffs |
| Long-term planning | Goal Maps, day plans and sessions | Connects large goals to executable work | Exact linkage to application-planning artifacts |
| Cross-file explanation | Slice drafts and visual diagrams | Shows a complete algorithm in one place | Synchronization with real code symbols |
| Change history | Git and planning documentation | Preserves commits and some reasoning | Unified task/chat/action trace |

## Existing User Ideas

| ID | User idea | Related current steps / experiences | User expectation | User doubts | Status |
|---|---|---|---|---|---|
| IDEA-01 | Persistent context available to AI with reminders about prior details | WF-01, WF-03, WF-04, WF-11 | Reduce repeated explanation and loss of details | Mechanism unknown | recorded, not evaluated |
| IDEA-02 | Integrate application planning with Goal Map/day/session planning | WF-02, WF-06 | Make plans actionable | Integration shape unknown | recorded, not evaluated |
| IDEA-03 | React development compiled to one Tampermonkey file | WF-02 | Improve planning UI development | Technical trade-offs not assessed | recorded, not evaluated |
| IDEA-04 | Insert or assemble complete guidelines instead of only route-based file reading | WF-03, WF-04 | More reliable context loading | May be worse than navigation; user unsure | recorded, not evaluated |
| IDEA-05 | Validate documentation discoverability and navigation | WF-04 | Make bootstrap predictable | Method unknown | recorded, not evaluated |
| IDEA-06 | Generate or validate Tampermonkey command projections | WF-05 | Reduce stale reminders | Canonical source format unknown | recorded, not evaluated |
| IDEA-07 | Revisit slice and implementation planning templates | WF-06, WF-10 | Improve flexibility and reduce duplication | Better shape unknown | recorded, not evaluated |
| IDEA-08 | Link planning diagrams/overviews to real code symbols | WF-06, WF-10 | Keep real names and cross-file relationships visible | Tool support unknown | recorded, not evaluated |
| IDEA-09 | Increase testing visibility and personal attention | WF-06, WF-09 | Improve confidence in AI-driven work | Right effort level unknown | recorded, not evaluated |
| IDEA-10 | Deterministic local replacement-package runner | WF-07A | Reduce command generation and manual handoffs | Custom app may be unnecessary | recorded, not evaluated |
| IDEA-11 | Capture all PowerShell output after the last command | WF-07A | Easier error transfer to chat | Terminal mechanism unknown | recorded, not evaluated |
| IDEA-12 | Investigate GitHub-tool or other direct application paths | WF-07B | Compare archive and direct-edit workflows | Current capabilities unknown | recorded, not evaluated |
| IDEA-13 | Better diff-review interface | WF-07B, WF-08 | Easier complete review | Existing tools may suffice | recorded, not evaluated |
| IDEA-14 | Commands for self-review and review of another AI answer | WF-08 | Repeatable first-pass verification | Protocol unknown | recorded, not evaluated |
| IDEA-15 | Different reviewer chats with different contexts and a simple-solution research role | WF-08 | Independent perspectives | Cost and orchestration unknown | recorded, not evaluated |
| IDEA-16 | Dedicated diff inspection and AI review surface | WF-08 | Combine full diff and readable review | Need not confirmed | recorded, not evaluated |
| IDEA-17 | Stronger testing workflow | WF-09 | Better confidence | Current baseline not documented | recorded, not evaluated |
| IDEA-18 | Clarify which implementation documentation should exist beyond code | WF-10 | Preserve value without duplication | Boundary unresolved | recorded, not evaluated |
| IDEA-19 | Action log linked to task and subtask | WF-11 | Avoid confusion | Schema unknown | recorded, not evaluated |
| IDEA-20 | Selective ChatGPT message capture through copy controls | WF-11 | Preserve useful explanations despite chat performance | Full vs selective capture unresolved | recorded, not evaluated |

## User Uncertainties

| ID | User uncertainty | Related current material | Status |
|---|---|---|---|
| U-01 | Whether full guideline injection is better than asking AI to read owner files | WF-03, WF-04, IDEA-04 | open |
| U-02 | Whether a separate archive runner application is justified | WF-07A, IDEA-10 | open |
| U-03 | Whether VS Code diff difficulty is an interface problem or a learning issue | WF-07B, PS-10 | open |
| U-04 | How several AI reviewers should be separated by role and context | WF-08, IDEA-14, IDEA-15 | open |
| U-05 | How much implementation/slice documentation is really needed | WF-06, WF-10 | open |
| U-06 | How testing should be planned and how much personal effort it deserves | WF-09 | open |
| U-07 | Whether full chat history or selected messages should be retained | WF-11 | open |
| U-08 | What other current workflow steps may have been omitted | Whole workflow | open |

## Missing Information And Questions

| ID | Question | Priority | Blocking for first-stage completeness | Status | Answer |
|---|---|---:|---:|---|---|
| Q-01 | What exact bootstrap prompt and file-reading sequence is currently used for a new chat and for an AI coding agent? | 1 | no | open | not provided |
| Q-02 | How are Goal Map items currently linked to day items, sessions and application-planning artifacts? | 1 | no | open | not provided |
| Q-03 | Which archive/command/navigation failures have actually occurred repeatedly, and how often? | 1 | no | open | not provided |
| Q-04 | Provide one slice draft that is clearly useful and one that feels rigid, duplicative or stale. | 1 | no | open | not provided |
| Q-05 | What tests are currently planned and run, at which stage and with which tools? | 1 | no | open | not provided |
| Q-06 | Which execution path is used most often: archive, coding agent, manual edit or another path? | 2 | no | open | not provided |
| Q-07 | What review steps are currently mandatory versus only desired? | 2 | no | open | not provided |
| Q-08 | What current action log exists, and what information has previously been difficult to reconstruct? | 2 | no | open | not provided |
| Q-09 | Does the current workflow end at commit/push, or does it explicitly include later maintenance and context reactivation? | 2 | no | open | not provided |

## Critical Remarks About The Record

| ID | Record issue | Why it matters | Status |
|---|---|---|---|
| CR-01 | The user’s dictated material mixes current workflow, experienced friction, suspected risks and future ideas. This draft separates them, but some individual classifications may need correction. | Later stages need reliable source status | open |
| CR-02 | Several concerns are theoretical or expressed as uncertainty rather than as repeated failures. | They should not be represented later as validated problems without examples | open |
| CR-03 | The current testing workflow and Goal Map linkage are only partially described. | Two important parts of the current experience remain incomplete | open |

## User Answers

```text
- The first planning stage must capture the current workflow and user experience as source material.
- The user is not required to know what should be improved during this stage.
- Existing ideas should be recorded but not evaluated in the first-stage artifact.
```

## Decisions About Scope Or Terminology

| ID | Decision | Rationale | Status |
|---|---|---|---|
| D-01 | Treat the first stage as current workflow and user-experience capture, not improvement design | User correction during methodology drafting | accepted |
| D-02 | Keep user ideas in the first-stage draft without evaluating them | They are part of the user’s current understanding and should remain available to later stages | accepted |
| D-03 | Use descriptive problem groupings only as organization of current material | Avoid premature root-cause or solution conclusions | proposed |
