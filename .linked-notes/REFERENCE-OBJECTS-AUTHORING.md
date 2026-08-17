# Reference Objects Direct Repository Authoring

Status: active repository-facing workflow
Scope: procedure order for humans or AI agents that intentionally create or maintain OBS Linked Notes Reference Objects directly in repository files, without relying on the Linked Notes UI.

This file owns **procedure order only**. It does not redefine Reference Object semantics, marker syntax, identity rules, freshness rules or registry structure.

Canonical contract:

[`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md)

Current live routing/index data:

[`reference-objects.json`](reference-objects.json)

If this workflow and the canonical contract appear to disagree, the canonical contract wins.

## 1. Decide Whether This Workflow Applies

1. Read the applicable rules in [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md).
2. If the task only consumes an existing materialized use, follow the contract's [`Ordinary consumption vs freshness verification`](REFERENCE-OBJECTS.md#ordinary-consumption-vs-freshness-verification) section and stop here unless direct authoring is actually required.
3. If direct Reference Object creation or maintenance is required, continue with the matching procedure below.

## 2. Create A New Reference Object

1. Read the current [`reference-objects.json`](reference-objects.json).
2. Follow [`Creating a new object outside the UI`](REFERENCE-OBJECTS.md#creating-a-new-object-outside-the-ui).
3. For any synchronized copies created in the same change, follow [`Inserting a synchronized value into a file`](REFERENCE-OBJECTS.md#inserting-a-synchronized-value-into-a-file).
4. Bring the registry/index into the state required by [`Definitions File`](REFERENCE-OBJECTS.md#definitions-file).
5. Finish with [`Validation expectations`](REFERENCE-OBJECTS.md#validation-expectations).

## 3. Add A Use Of An Existing Object

1. Follow [`Finding an existing object`](REFERENCE-OBJECTS.md#finding-an-existing-object).
2. Follow [`Inserting a synchronized value into a file`](REFERENCE-OBJECTS.md#inserting-a-synchronized-value-into-a-file).
3. Update the affected usage index according to [`Definitions File`](REFERENCE-OBJECTS.md#definitions-file).
4. Finish with [`Validation expectations`](REFERENCE-OBJECTS.md#validation-expectations).

## 4. Change The Canonical Definition

1. Follow [`Changing the source value`](REFERENCE-OBJECTS.md#changing-the-source-value).
2. If synchronized uses are also being refreshed, continue with Section 5 below.
3. Finish with [`Validation expectations`](REFERENCE-OBJECTS.md#validation-expectations) for the intended resulting state.

## 5. Synchronize Stale Uses

1. Resolve freshness according to [`Ordinary consumption vs freshness verification`](REFERENCE-OBJECTS.md#ordinary-consumption-vs-freshness-verification).
2. Follow [`Changing the source value`](REFERENCE-OBJECTS.md#changing-the-source-value) and [`Editing existing uses`](REFERENCE-OBJECTS.md#editing-existing-uses).
3. Update affected registry/index metadata according to [`Definitions File`](REFERENCE-OBJECTS.md#definitions-file).
4. Finish with [`Validation expectations`](REFERENCE-OBJECTS.md#validation-expectations).

## 6. Registry / Index Maintenance After Direct Edits

1. Use [`Definitions File`](REFERENCE-OBJECTS.md#definitions-file) as the sole owner of registry/index semantics.
2. Reconcile only the entries affected by the intended direct edit.
3. If the intended repair is ambiguous, stop at the contract boundary rather than inventing repository state.
4. Finish with [`Validation expectations`](REFERENCE-OBJECTS.md#validation-expectations).

## 7. Undefined Operations

If the desired direct operation is not defined by [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md), do not define its semantics in this workflow. Resolve the contract gap first, then add only the procedure order here if a dedicated authoring path is still useful.
