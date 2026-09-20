<a id="shared-visual-material-storage-and-registry"></a>
# Visual Material Storage And Registry

Use a project-level visual-material store when retained material volume, provenance or reuse pressure makes central discovery useful.

Preferred shape:

```text
visual-materials/
├── external/
│   └── <retained external binaries or links>
├── prepared/
│   └── <derived/cropped/annotated/helper materials owned here>
├── scratch/
│   └── <ephemeral working material when useful>
└── registry.md | registry.yaml
```

## Ownership

If an artifact already has a producer Target owner, do not copy it into `prepared/` merely because later work can use it visually. Registry entries may reference the producer-owned artifact.

## Registry Content

Use [Visual Material Registry Template](templates/VISUAL-MATERIAL-REGISTRY.template.md#template-visual-material-registry).

Retain material identity/provenance/intrinsic qualification. Do not store per-consumer Source authority/requiredness/role in the shared registry.

## Retention

Keep transient search/exploration ephemeral unless provenance, Evidence, reuse or downstream use makes retention valuable.

Physical placement is resolved through the active artifact/representation process; the tree above is the profile-preferred project representation when selected.
