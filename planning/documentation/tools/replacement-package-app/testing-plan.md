# Target Proof Plan

Tests prove owner requirements; tests do not become owner authority.

## Feature

- prove each current FBS:
  - `FBS-RPKG-RESOLVE-REQUESTED-PACKAGE-01`;
  - `FBS-RPKG-APPLY-PACKAGE-02`;
  - `FBS-RPKG-COMMIT-APPLIED-PACKAGE-03`;
  - `FBS-RPKG-PUBLISH-EXACT-COMMIT-04`;
- prove every material global/step-local BR;
- prove behavior expected errors and their required handling.

## Scenario

For non-obvious Scenario Requirements, proof should make the Target Good Example / Problem Example
distinction concrete, especially Work-context continuity and user-visible choice.

## Domain

Prove Domain realization of the Feature Steps it claims:
- Apply Proven Result;
- exact package commit fact;
- publication proof/uncertainty;
- exact Work/Package Identity binding.

## Slice

Prove end-to-end allocation plus natural IR:
- captured package/request boundary;
- applicability before mutation;
- package-only commit scope;
- fenced publication destination;
- reconciliation before repeat;
- composable stage boundaries for selected Evolution pressure.

## Evolution

A Target Feature Body remains Step-owned until realization. Materialization removes only
planning-only realization annotations, not selected FBS/BR/error semantics.
