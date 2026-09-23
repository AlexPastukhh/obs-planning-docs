<a id="cross-bank-local-analysis-example"></a>
# Cross-Bank Local Analysis

Assume both Banks are registered in the same Reference Knowledge installation.

```text
Bank: studio-shared
  Entry: Painting X
  Ref: bank:studio-shared/entry:painting-x

Bank: project-game-a
  Visible Bank:
    studio-shared

  Analysis A
    Analysis ID → painting-x-boss-arena-use
    Ref → bank:project-game-a/analysis:painting-x-boss-arena-use
    Created At → <date/time>
    Subject → bank:studio-shared/entry:painting-x
    Body → useful for boss-arena scale hierarchy because ...

  Tag Assignment B
    Subject → bank:studio-shared/entry:painting-x
    Tag → vocab:project-game-a/tag:boss-arena-reference
```

The project does not copy or mutate `Painting X`. It owns project-local knowledge concerning the shared Entry. Visibility grants reference/read use, not upstream write authority.
