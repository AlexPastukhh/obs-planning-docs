# Documentation / Representation / Materialization Consistency Audit

Status: **PASS — current recheck after completing the adaptive materialization projection**

Scope: verify the current Documentation / Representation policy, SDS adaptive artifact topology, AP/AG projection completeness and preservation of the existing IDTSPE/SDS ownership model.

## 1. Fundamental Lens Identity

- no duplicate Documentation Lens was added: **PASS**
- existing `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` is the canonical Documentation / Representation / Artifact Boundary Lens: **PASS**
- Lens location is `active/idtspe-core/lenses/required/`: **PASS**
- required Core Lens count is **4**: L1 / L2 / L3 + Documentation / Representation: **PASS**
- total installed Lens count is **17 = 11 Core + 6 SDS-specific**: **PASS**
- all **16 / 16** SDS Target Modules inherit/link the Documentation / Representation Lens: **PASS**

## 2. Persistence / File Boundary

Current invariant:

```text
IDTSPE instance boundary
≠ semantic owner boundary
≠ physical file boundary
```

Checks:

- an IDTSPE iteration may persist nothing: **PASS**
- implementation-native representation (`code / type / test / schema / config / names / focused WHY-comment`) is valid when sufficient: **PASS**
- existing owner/coordinator section is preferred before unnecessary dedicated files: **PASS**
- dedicated owner file does not require full-template completion: **PASS**
- consolidated owner artifact is preferred before specialized companion split: **PASS**
- split/promotion is pressure-driven by independent review/addressability/lifecycle/reuse, not by Target/Lens invocation count: **PASS**
- `PERSISTENCE_GUIDANCE: REQUIRED` means required survival of meaning, not required Markdown-file creation: **PASS**

## 3. Domain / Slice / Scenario Representation

- Domain Discovery may remain the durable coordinator for several logical Domain owners: **PASS**
- Domain current semantics may be represented by `DOMAIN-DISCOVERY` residue + implementation-native code/tests without `<DomainOwner>.md`: **PASS**
- one complex Domain may be promoted while peer Domains remain consolidated/code-native: **PASS**
- Slice Strategy preserves Slice inventory/useful vertical results/order/dependencies and may keep small per-Slice Decisions/QRP: **PASS**
- Test Strategy may preserve a registry-like cross-Slice/Domain test-realization topology (proof owner → test class/suite/setup/fixture/harness/helper) when code alone makes that relation hard to discover; separate supporting map remains pressure-driven and must not duplicate test bodies: **PASS**
- a logical Slice Target does not imply `SL-<id>.md`: **PASS**
- one complex Slice may be promoted while other Slice owners remain sections in `SLICE-STRATEGY`: **PASS**
- Test Design / Evolution / Frontend / Part artifacts are companions only after independent pressure: **PASS**
- Scenario behavioral authority has stronger durable human-readable persistence pressure and is not replaced by code/tests: **PASS**

## 3A. Guidance Ownership Boundary

```text
Target Module AP-*
→ representation / placement guidance for the Target-specific result

Lens AG-*
→ supporting-artifact / artifact-placement guidance produced by a Lens
→ not semantic Finding routing / owner / reopen authority
```

Checks:

- target-profile Lens files may legitimately contain zero `AG-*` records when no distinct supporting-artifact guidance is needed; Finding Candidates are dispositioned by Core and may resolve back to the current Target owner without requiring an AG record: **PASS**
- Domain/Slice/Frontend current result representation is owned by their Target Modules, not duplicated by Domain/Slice/UI Lens AG records: **PASS**
- L5/WEUC `AG-L5-02` is the canonical proposer for optional target-local evolution sections/`<owner>.evolution.md`: **PASS**
- semantic finding owner/handoff/reopen is resolved by Core Finding Disposition; `AG-*` and P-14 / TF-10 govern supporting representation/placement only: **PASS**
- `TEST-REALIZATION-MAP.md` remains a Test Strategy representation because it captures the Test Strategy result rather than a Lens finding: **PASS**

## 4. Worked Physical Topologies

The fundamental Lens contains **6** explained topologies:

```text
A  compact / registry-strategy-heavy
B  one promoted Domain owner
C  one promoted Slice owner
D  mature Slice with specialized companions
E  Scenario-heavy / Domain-code-native
F  mixed asymmetric growth
```

Each explains situation, physical tree, what stays consolidated/code-native and what triggers promotion/split: **PASS**.

## 5. SDS Topology Ownership

- `SDS-PHYSICAL-PLANNING-TREE.md` is now a coordinator / allowed-destination-family map, not a mandatory scaffold: **PASS**
- `ARTIFACT-PLACEMENT-MAP.md` is the canonical human-facing annotated SDS Artifact Materialization Tree: **PASS**
- worked-tree explanations live in the Documentation / Representation Lens rather than being duplicated in the coordinator: **PASS**
- Linked Notes still define no `notes/` / `linked-notes/` content tree: **PASS**
- Reference Object technical registry/index remains a separate open responsibility: **PASS**

## 6. AP / AG Source And Projection Integrity

Canonical source records remain in their natural owners:

```text
Target Modules → AP-*
Lenses         → AG-*
```

Current counts:

```text
AP  34 unique
AG  24 unique
TOTAL 58 unique
```

Schema check: every record contains the normalized source fields including `PERSISTENCE_GUIDANCE` and `PLACEMENT_DIRECTIVE`: **58 / 58 PASS**.

Materialization projection check:

```text
source AP/AG IDs                  58
IDs represented in materialization projection 58
missing                            0
extra                              0
```

The projection covers records in two legitimate forms:

```text
materialization-tree node
or
explicit Non-tree Representation / Routing Guidance
```

Embed/route records are not converted into fake files merely to fit the tree: **PASS**.

## 7. Compatibility / Historical Boundaries

- old `ARTIFACT-PLACEMENT-GUIDANCE-REGISTRY.md` contains no placement semantics and is compatibility-only: **PASS**
- Part-1 and Part-2 audits retain their historical 17-Lens/75-record checkpoint counts but are now explicitly marked historical: **PASS**
- `sources-readonly/` provenance files were not modified by this pass: **PASS**

## 8. Testing-Theory Preservation

The four raw testing bodies remain byte-identical to repository snapshot base `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7`:

```text
testing-planning-principles-and-terminology.md
api-integration-test-guidance.md
e2e-testing-guidance.md
test-object-patterns.md
```

Result: **4 / 4 PASS**.

## 9. Mechanical Recheck

- current Target Module count: **16**
- current reusable Lens count: **17**
- required Core Lens count: **4**
- AP/AG source-record uniqueness/schema: **PASS**
- materialization projection exact source-ID parity: **58 / 58 PASS**
- active/root/integration Markdown links: **649 / 649 resolved — PASS**
- active/root/integration Markdown fenced blocks: **PASS**
- current relative path literals checked by the maintenance pass: **PASS**

## Result

The adaptive documentation/materialization model is internally consistent and can replace the former assumption that SDS physical topology is a file scaffold.

The current flow is:

```text
IDTSPE semantic result
↓
Documentation / Representation Lens
  persist? / code? / existing owner? / coordinator? / dedicated? / companion? / generated?
↓
SDS Artifact Materialization Tree when SDS destinations are relevant
↓
P-14 / TF-10 concrete destination + action
```
