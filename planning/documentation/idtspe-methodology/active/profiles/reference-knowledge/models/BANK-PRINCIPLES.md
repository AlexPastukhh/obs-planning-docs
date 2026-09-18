<a id="bank-principles"></a>
# Bank Principles

These principles define stable Reference Knowledge Bank semantics.

<a id="bank-ownership-boundary"></a>
## Bank Is An Ownership Boundary

A Bank is a durable ownership/write/lifecycle boundary for Reference Knowledge. It is not a medium/domain category. `Bank ID` is stable and unique within the current Reference Knowledge installation registry.

```text
Bank
= knowledge ownership scope
+ write / mutation authority
+ visibility to other registered Banks
+ Vocabulary Package consumption
```

Physical storage is implementation representation, not part of Bank semantic identity.

<a id="bank-not-domain"></a>
## Bank Is Not A Domain

Do not create separate Banks merely because subjects are visual, music, game, application or design. One Bank may contain all of those domains. Domain Packs provide optional domain-specific Knowledge Basis; Banks own durable records.

<a id="entry-owner"></a>
## Entry Has One Owning Bank

One durable Entry record has one owning Bank for its lifetime. Another Bank may refer to that Entry without copying it.

```text
cross-bank reference
≠ duplicate Entry
≠ ownership transfer
```

A durable Entry is not transferred between Banks. If a better current record belongs at another ownership scope, create/reuse it there and optionally retire the old Entry with successor ref(s).

<a id="statement-ownership"></a>
## Knowledge About An Entry May Have Another Owner

The Bank that owns an Entry does not automatically own every statement concerning it. Another visible Bank may own Tag Assignments, Relations or Analysis about that Entry without mutating the Entry itself.

<a id="mount-semantics"></a>
## Visibility Is Explicit, Local And Non-Transitive

The base profile assumes one Reference Knowledge installation. A Bank may declare another **registered Bank in the same installation** visible/readable.

```text
visibility
≠ copy
≠ ownership
≠ write permission
≠ transitive visibility
```

Seeing Bank B does not automatically make Banks visible to B visible to the current Bank. A visible record may therefore contain durable refs to Banks/objects that the current consumer cannot resolve or access; that nested ref remains preserved as unresolved rather than making the whole record invalid.

Cross-installation Bank federation/resolver protocols are outside the base profile and should be derived only when a real use case requires them.

<a id="cross-bank-identity"></a>
## Cross-Bank References Use Stable Semantic Identity

Cross-bank references use Bank identity + object identity (or an equivalent stable representation), never copied display names or fragile relative file topology.

<a id="vocabulary-access"></a>
## Vocabulary Access Is Explicit

Tag and Relation Type definitions belong to Vocabulary Packages defined by [Vocabulary Model](VOCABULARY-MODEL.md#vocabulary-package-model). A Bank records which Packages registered in the current installation it consumes. Consumption never grants evolution authority.

<a id="bank-placement"></a>
## Place Knowledge At The Smallest Correct Ownership Scope

Prefer the narrowest Bank that genuinely owns the reusable knowledge now:

```text
project-specific reusable knowledge → project Bank
cross-project/studio reusable knowledge → studio/shared Bank
broad personal reusable knowledge → personal/general Bank
```

Do not promote knowledge to a broader Bank merely because broader reuse is imaginable.

<a id="search-capability"></a>
## Search Is A Capability Over Visible Knowledge

Browsing/filtering/searching Entries, assignments, relations and analyses is an ordinary capability. A search/query does not become a durable profile object or Target merely because it was executed.
