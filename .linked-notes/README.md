# Linked Notes Repository Conventions

This directory contains repository-owned conventions used by OBS Linked Notes and by humans or AI agents that edit this repository directly.

## Files

- [`templates/README.md`](templates/README.md) — repository file-template format and creation rules.
- [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md) — Reference Object definition/use markers and explicit synchronization rules.
- [`reference-objects.json`](reference-objects.json) — Reference Object routing and rebuildable usage index.

## Agent rule

Before creating a document of a known template type, read `templates/README.md` and use the matching repository template instead of reconstructing its expected fields from memory.

Before copying a value that is meant to stay synchronized with an existing Reference Object, read `REFERENCE-OBJECTS.md`. A synchronized copy must keep the `obs-ref:use` marker; a plain copied value is not a Reference Object use and cannot be checked or updated by the helper.

These convention files do not authorize automatic GitHub writes. Linked Notes keeps read/check actions separate from explicit write actions.
