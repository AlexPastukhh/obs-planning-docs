<a id="reference-knowledge-target-module-registry"></a>
# Reference Knowledge Target Module Registry

Responsibility ID: `RK.TARGET-MODULE-DISCOVERY`

| Target Module | Stable ID | Typical role | Result family |
|---|---|---|---|
| [Bank Formation](../target-modules/TM-RK-05-BANK-FORMATION.md#tm-rk-05-bank-formation) | `TM-RK-05-BANK-FORMATION` | PRIMARY | one usable Bank definition/configuration |
| [Entry](../target-modules/TM-RK-10-ENTRY.md#tm-rk-10-entry) | `TM-RK-10-ENTRY` | PRIMARY / SUPPORTING | one correctly owned and sufficiently resolved Entry record |
| [Vocabulary Evolution](../target-modules/TM-RK-20-VOCABULARY-EVOLUTION.md#tm-rk-20-vocabulary-evolution) | `TM-RK-20-VOCABULARY-EVOLUTION` | PRIMARY | accepted Vocabulary Package definition change + material consequence review |
| [Landscape Analysis](../target-modules/TM-RK-50-LANDSCAPE-ANALYSIS.md#tm-rk-50-landscape-analysis) | `TM-RK-50-LANDSCAPE-ANALYSIS` | PRIMARY | bounded evidence-grounded understanding of a selected knowledge landscape |

The registry contains recurring Target Step-Result families, not every bank operation.

Ordinary browse/search/filter, Tag Assignment, Relation creation/refinement, Analysis creation/refinement, and small owner-clear Entry fact/locator corrections may occur without a separate Target. They may also happen alongside a Target when useful without becoming module-defined Units merely because they occurred.

Entry identity ambiguity/duplication/over-broad pressure is evaluated by [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication). Old records remain resolvable and may be retired with optional successor refs; there is no separate merge/split/identity-surgery Target family.

Candidate Unit selection follows the current IDTSPE Core Unit applicability/materiality contract. A clear USER request or accepted scope may already imply obvious Unit selection; profile-specific approval ceremony is not added here.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`

