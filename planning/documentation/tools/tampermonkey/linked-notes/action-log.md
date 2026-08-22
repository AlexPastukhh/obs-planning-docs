# Scope Action Log

Scope: `SCOPE-LINKED-NOTES-APP`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.


### XREF-002 — Scenario-first planning, Testing foundation and Review Dependencies

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-014`  
**Reason:** Linked Notes Scenario-Catalog migration and future Review Dependency roadmap handoff are part of the same transition; no runtime implementation is claimed here.


### LN-APP-001 — Reference Object bounded semantic dependencies

**Type:** IDEA REVIEW  
**Source:** current user-selected Linked Notes implementation discussion for this ChangeSet  
**Current Conclusions:** extend `SCN-LN-REFERENCE-OBJECTS` with a third Reference Object relation, `obs-ref:depend`, for a bounded fragment whose correctness depends on one canonical Reference Object value without materializing that value as a literal copy. Keep `obs-ref:use` for literal synchronization and keep whole-file `obs-review:dependency` separate. Dependent fragment content must require explicit semantic review after source change and must never be auto-rewritten from the canonical value.

### LN-APP-002 — Registry-owned dependency acknowledgement

**Type:** IDEA CLARIFICATION  
**Updates:** `LN-APP-001`  
**Clarification / resulting meaning:** keep dependency fingerprints out of working Markdown. Each dependency receives a positive number unique within its consumer file; `path + dep` is its routing identity. `.linked-notes/reference-objects.json` schema v2 stores `depends[]` routing plus optional `reviewedAgainst`, derived as SHA-256 of the exact canonical `obs-ref:def` inner text. `Check dependencies` can classify review state from registry + definition without reading every consumer; `Review complete` validates the selected consumer marker before updating acknowledgement metadata.

### LN-APP-003 — Implement Reference Object fragment dependency lifecycle

**Type:** APPLIED  
**Applied From:** `LN-APP-001`, `LN-APP-002`  
**Target-State Result:** Linked Notes `0.10.0-prototype` supports local-first creation, indexed checking, explicit semantic Review complete, Files diagnostics and validation for `obs-ref:depend`; registry v1 remains readable and current writes use v2; literal-use and bounded-dependency states remain distinct; pending definition-derived acknowledgements cannot publish the Definitions File alone ahead of their source definition. Repository-facing contracts, Scenario/product/architecture/state documentation, generated userscript and automated/manual acceptance evidence are updated coherently.  
**Rationale:** a bounded fragment can depend semantically on a canonical Reference Object value without being a synchronized copy or escalating the relation to whole-file Review Dependency scope. Review state belongs in registry metadata so ordinary working content does not churn merely to record acknowledgement.  
**ChangeSet:** `ea23d844-47c9-4e15-b5fe-3fcd9880911b`  
**Package:** `ad852002-dc4e-4f83-ba92-df5368fa534c`


### LN-APP-004 — ReviewDiff correction: dependency review integrity

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `ea23d844-47c9-4e15-b5fe-3fcd9880911b`, package `ad852002-dc4e-4f83-ba92-df5368fa534c`  
**Material Finding / selected correction:** a dependency could remain `CURRENT` after its bounded fragment changed or disappeared because status tracked only the canonical definition fingerprint; marker parsing also silently accepted duplicate attributes with last-wins behavior. Preserve registry-owned fingerprints, but add `reviewedFragment` for the exact bounded content, require the live `path + dep` marker to resolve during Check dependencies, invalidate acknowledgement when fragment content changes, and reject duplicate marker attributes.  
**Resulting Current Meaning:** `CURRENT` now means the dependency was reviewed against both the current canonical Reference Object value and the exact current bounded fragment, with one resolvable live marker. Working Markdown still contains no review fingerprint.

### LN-APP-005 — Apply dependency review-integrity correction

**Type:** APPLIED  
**Applied From:** `LN-APP-004`  
**Target-State Result:** Linked Notes `0.10.0-prototype` keeps `obs-ref:depend` and registry-owned review metadata, adds paired source/fragment acknowledgements, indexed consumer-marker integrity checking, edit invalidation and strict duplicate-attribute diagnostics. Focused tests and the complete verifier cover source change, fragment change, missing marker and ambiguous marker syntax while preserving local-first publication and no fingerprint churn in working Markdown.  
**ChangeSet:** `ea23d844-47c9-4e15-b5fe-3fcd9880911b`  
**Package:** `5ab8c0b4-fe4b-444a-a4b0-b8283433975e`
