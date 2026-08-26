# THM-TESTING-DETAIL-CA768B61 — Raw Testing Theory Snapshot

Status: `IMPORTED_RAW` theoretical module  
Source repository: `github:AlexPastukhh/obs-planning-docs`  
Source base: `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7`  
Import rule: source bodies below are preserved **byte-for-byte** from the supplied 2026-08-25 snapshot.

## Why It Is Theoretical

The current SDS Test Target Modules and Test Proof Lens already own the processed testing workflow and timing. The repository also contains useful detailed testing theory whose final operational placement has not been fully decided.

Instead of prematurely merging/rewording it, this package preserves the source theory intact.

```text
TM-TEST-STRATEGY / TM-TEST-DESIGN / TM-TEST-COVERAGE
+ LENS-TEST-PROOF-EVIDENCE
= current processed operational methodology

THM-TESTING-DETAIL-CA768B61
= raw detailed theory/reference
= not another Testing workflow authority
```

## Included Source Bodies

- [Testing Planning Principles And Terminology](testing-planning-principles-and-terminology.md)
- [API / Integration Test Guidance](api-integration-test-guidance.md)
- [E2E Testing Guidance](e2e-testing-guidance.md)
- [Test Object Patterns](test-object-patterns.md)

These four files are intentionally not edited to match the new methodology vocabulary. Their old links/status wording are source evidence, not current navigation authority.

## Use

Consult the package when detailed testing theory is materially useful and the processed Test Module/Lens does not yet answer the question strongly enough. Any accepted stable rule should later be promoted deliberately into the appropriate Test Target Module/Lens/Core owner.

## Source SHA256

```text
6ddcdd37274d007dfbe5af5346a0025eed3c984aceba87bb83bb2f5fe2247404  testing-planning-principles-and-terminology.md
808a19c986dff2f677628518e8d4af08b5a639cf7423d660f1d5489ea8656aa8  api-integration-test-guidance.md
d4bc286a0288d8f64e1c36dfbe7e5bd58ddd5f77efbbed6db767ce946f3948b2  e2e-testing-guidance.md
d90c0cc35b107a4c35c6c2e2182ce7bed679257a49ede6315ecc9a3dac4b101f  test-object-patterns.md
```
