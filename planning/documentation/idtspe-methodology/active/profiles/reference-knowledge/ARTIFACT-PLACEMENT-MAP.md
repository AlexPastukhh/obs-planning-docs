<a id="reference-knowledge-artifact-placement-map"></a>
# Reference Knowledge Artifact Placement Map

This map separates semantic ownership from physical representation. It does not require one file per semantic object/statement.

| Semantic content | Semantic owner | Persistence / representation owner | Typical representation |
|---|---|---|---|
| Bank identity/configuration | Bank | Bank canonical definition; Registry owns discovery row only | `BANK.md` / DB record |
| Entry identity / locator / intrinsic factual representation | Entry | Entry owning Bank | Entry record/document |
| Tag Assignment | Tag Assignment | assigning Bank | compact statement table/record/edge; standalone file only when useful |
| Entry Relation | Entry Relation | relation-owning Bank | compact statement table/record/edge; standalone file only when useful |
| Analysis concerning Entry/Entries | Analysis Record | analysis-owning Bank | analysis record/document |
| Vocabulary Package definition | Vocabulary Package | Package canonical definition; Registry owns discovery row only | package record/document |
| Tag / Relation Type definition | definition | owning Vocabulary Package | vocabulary record/document |
| Entry retirement / successors | old Entry | Entry owning Bank | old Entry stays resolvable with optional successor refs |
| Landscape understanding | Landscape Snapshot when retained | selected Bank | snapshot document/record |
| binary/media object | represented artifact/object owner where one exists | producer/external/local storage owner | locator/reference; no automatic Bank copy |

Browse/search/filter/query results are projections unless a natural owner such as a Landscape Snapshot retains the relevant inquiry context.
