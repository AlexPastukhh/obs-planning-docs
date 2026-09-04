# Shared Implementation Requirements Discovery

Status: active Shared Implementation-specific question set used with [Common Implementation Requirements Discovery](common.md).

Use only after or while testing whether real shared semantic implementation responsibility exists. A repeated helper shape is evidence to inspect, not authority to create a Shared Implementation Capability.

## SH1. Real reusable responsibility

- What one semantic responsibility is shared?
- Which concrete Slices/consumers require it?
- Can its responsibility be stated without referring to duplicated source lines?

Relevant pattern: [Meaningful Capability Extraction](../../patterns/common/meaningful-capability-extraction.md).

## SH2. Stable contract / result

- What semantic contract/result do consumers rely on?
- Can consumers treat implementations as a black box where useful?
- Does the contract remain meaningful if one implementation is replaced?

Relevant pattern: [Stable Result Contract](../../patterns/common/stable-result-contract.md).

## SH3. Variation and evolution

- Are multiple implementations/consumers already real or materially known?
- Does known evolution add consumers/implementations through a stable seam?
- Can that seam be justified without prematurely implementing future variants?

Relevant patterns: [Stable Port / Expected Variation](../../patterns/common/stable-port-expected-variation.md), [Evolution-chain-safe Boundary](../../patterns/common/evolution-chain-safe-boundary.md).

## SH4. Extraction cost versus locality

- Does extracting shared ownership make each consumer easier to reason about?
- Does it introduce indirection that is more complex than the duplication/responsibility it removes?
- Is the shared owner substantial enough to deserve independent semantic ownership?

If not, keep the realization local to consumers.
