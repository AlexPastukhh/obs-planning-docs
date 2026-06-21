# Archive Source vs Output Package Example

Status: supporting reusable example
Doc version: v0.2.0-obs-cleanup
Scope: demonstrates the difference between using an archive as a source and creating a replacement archive.

## `арх`

```text
Meaning:
  Use a provided archive as read-source snapshot.

Output:
  answer/review/plan based on the archive.

Boundary:
  Do not create a replacement archive unless separately requested.
```

## `давай архив`

```text
Meaning:
  Create a replacement archive/package.

Output:
  replacement archive plus apply/diff commands in chat.

Boundary:
  Do not commit or push. Ask user to paste diff before commit.
```

Owner route:

```text
planning/planning-use-case-map.md
```
