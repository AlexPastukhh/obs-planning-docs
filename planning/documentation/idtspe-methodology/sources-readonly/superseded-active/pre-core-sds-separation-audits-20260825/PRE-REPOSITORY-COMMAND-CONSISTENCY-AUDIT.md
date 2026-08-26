# Pre-Repository Command / Helper Consistency Audit

Status: **PASS after methodology-only consistency fixes**

Scope: latest methodology state immediately before planning actual repository command/helper updates.

No repository command, codec, seed, Tampermonkey UI or test implementation is planned or changed by this audit.

## Source Baseline

Input methodology baseline:

```text
idtspe-methodology-workspace-command-helper-metadata-updated.zip
```

A separate preserved copy exists before these fixes:

```text
idtspe-methodology-workspace-before-pre-repo-consistency-fixes.zip
```

## Problems Found Before Fix

### 1. Conditional Target Modules were incorrectly marked as non-command-addressable

The old readiness map still said:

```text
TM-REQUIREMENT
TM-SCREEN
TM-FRONTEND-SLICE
TM-CROSS-CUTTING-CONCERN
→ were treated as lacking canonical direct invocation
```

This contradicted the accepted command-surface rule:

```text
every active Target Module
→ at least one canonical user-level command surface
```

Fixed by separating current repository mapping from the desired methodology command surface. Conditional modules now receive canonical invocation surfaces; their gates may validly conclude that no Target should be created.

### 2. No canonical owner for the desired 17-module command surface

The desired command architecture existed only in conversation and partial readiness notes.

Fixed by adding:

```text
shared/idtspe-command-surface-contract.md
```

It owns:
- all 17 canonical module command surfaces;
- focused-command admission rule;
- current focused surfaces worth preserving/adding;
- conditional module gate behavior;
- `idtspe.next`, `idtspe.continue`, `idtspe.review_consistency` orchestration surfaces;
- helper `When To Use` / `What You Get` requirement for new IDTSPE commands;
- repository-compatibility rule separating methodology Surface Keys from actual repo command IDs/files.

### 3. Phase 00 mixed two different mode dimensions

The old generic Phase 00 combined:

```text
CREATE / INTEGRATE / SHOW / REVIEW / RECONCILIATION / PRE-UPDATE / REALIZATION
```

as one “invocation mode” set, while the canonical shell uses:

```text
CREATE / REFINE / EXTEND / REVALIDATE / REPAIR
```

Fixed by distinguishing:

```text
Requested operation / outer workflow intent
vs
IDTSPE Target invocation mode
```

The two are no longer one enum.

### 4. Target Module lifecycle still treated command routing as optional/later

`target-module-model.md` and `target-module-creation-and-integration-use-case.md` still said command/Tampermonkey routing may be added later/optionally.

Fixed:

```text
active Target Module
→ exactly one semantic Entry Point
→ at least one canonical user-level command surface
```

Repository implementation may reuse an existing command; this does **not** imply one new file per module.

## Canonical Command Boundary After Fix

```text
Target Module / Use Case / Lens
= semantic methodology authority

IDTSPE Command Surface Contract
= desired stable user invocation projection

Current Repository Command Readiness Map
= facts/candidates from current repository

Command Helper Metadata Contract
= backward-compatible presentation extension

future repository update plan
= chooses concrete command IDs/files/codec/UI/test changes
```

Current repository implementation therefore cannot silently define methodology capability.

## Helper Compatibility Checks

- `helperPresentation` remains optional for old `schemaVersion: 1` commands: **PASS**
- new IDTSPE canonical/focused commands require `When To Use` + `What You Get`: **PASS**
- existing semantic `trigger` / `result` remain fallback presentation Sources: **PASS**
- `expectedOutput` / `description` fallback remains supported: **PASS**
- helper commentary is not routing or prompt semantics: **PASS**
- info/details action must never invoke/insert/send command: **PASS**
- catalog order / aliases / permissions remain unchanged by metadata contract: **PASS**

## Full Methodology Regression Checks

- active Target Modules: **17 / PASS**
- reusable Lenses: **16 = 3 required + 4 frequent + 9 target-profile / PASS**
- all 17 Target Modules covered by canonical command surface: **PASS**
- conditional modules remain gate-driven, not forced Targets: **PASS**
- repeat modes do not create generic duplicate command families: **PASS**
- focused shortcuts stay under the same semantic Target Module: **PASS**
- orchestration commands remain non-Target surfaces: **PASS**
- directed workflow / methodology next-step model unchanged: **PASS**
- Domain-test-before-Slice / Test Strategy / Slice TDD ordering unchanged: **PASS**
- TM-WEUC / WEUC Lens split unchanged: **PASS**
- Artifact Placement contract unchanged: **PASS**
- Artifact Placement registry remains **38 AP + 36 AG = 74** records: **PASS**
- Target Module files unchanged relative to immediate baseline: **PASS**
- Lens files unchanged relative to immediate baseline: **PASS**
- worked examples unchanged relative to immediate baseline: **PASS**
- Artifact Placement registry byte-identical to immediate baseline: **PASS**
- relative Markdown links resolve: **PASS**
- Markdown fences balanced: **PASS**
- stale conditional-module non-command-addressable policy removed: **PASS**
- stale Target Module policy that treated command reachability as optional/later removed: **PASS**
- stale Phase-00 future-command TODO removed: **PASS**

## Repository-Planning Gate

The methodology is now internally consistent enough to begin a **separate repository-current-state audit and update plan**.

That next activity must not assume the desired command IDs already exist. It must read the actual repository command definitions/helper implementation and classify every methodology surface as one of:

```text
REUSE_EXISTING_COMMAND
EXTEND_EXISTING_COMMAND_ALIASES/METADATA
ADD_FOCUSED_COMMAND
ADD_NEW_CANONICAL_COMMAND
KEEP_EXISTING_NON-IDTSPE_COMMAND_UNCHANGED
```

No repository update has been planned or authorized by this audit itself.


## Post-Audit WEUC / Global Architecture Command Extension

Before actual repository planning, the methodology additionally fixed one reusable Lens command surface:

```text
lenscmd.weuc.check
→ проверь эволюцию и архитектуру <target>
```

This surface is **in addition to** the 17 canonical Target Module commands. It does not imply that every Lens gets a command. It is justified because applying current evolution/global architecture to a selected Target is a stable recurring user intent.

Resolution is explicit:

```text
ordinary Target
→ current Target + L5

whole Workspace architecture
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION + L5
```

Current repository `architecture_weuc.discover` is only an overlap/candidate until the repository audit decides whether to extend it or add a separate command. No repository mutation is implied here.
