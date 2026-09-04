# DOC-UC-09 — Communicate documentation meaning clearly

### Goal

Make durable documentation easy to scan and accurately understand without simplifying away conditions, exceptions, boundaries or rationale.

### Process

For any normative owner being written or revised:

1. Identify the main semantic claim of each block before formatting it.
2. Keep one connected idea as prose when prose communicates it best.
3. When a block contains several independently meaningful facts, conditions, exceptions or consequences, use bullets/sub-bullets or another explicit structure so the reader does not have to reconstruct them from a dense paragraph.
4. Make meaningful contrasts explicit when useful, for example:
   - current vs planned future;
   - before vs after a semantic boundary;
   - success vs known failure vs uncertainty;
   - Result vs Outputs;
   - runtime branch vs design alternative;
   - Evolution Step vs lower-owner change required by that step.
5. Use Process Maps/tables only when they reveal structure better than prose; do not use formatting for decoration.
6. Re-read the structured version against the source meaning and verify that no condition, exception, reason, authority boundary or outcome disappeared during rewriting.
7. Give Scenario, Feature Interaction, BI, UI/Screen requirement, Evolution Step, Evolution Impact, Slice, Aggregate/Object, Shared Implementation Capability, Test Item and other durable entities intuitive readable names.
8. Use technical IDs only as stable reference aids:
   - pair them with readable names;
   - prefer semantic IDs where practical;
   - avoid arbitrary ordinal numbering that implies false ordering/architecture.
9. Apply the same rules to templates: examples should demonstrate meaningful names and readable information structure.
10. If the readability problem is caused by the physical size/cohesion of a documentation owner rather than local prose structure, use DOC-UC-13 instead of compressing meaning merely to keep one file.

### Principles

- Optimize for **semantic readability without semantic compression**.
- Shorter is not better when it removes a condition needed to recover the actual meaning.
- More bullets are not better when one coherent paragraph is clearer.
- A reader should not need implementation knowledge to decode a behavioral name.
- A technical identifier is navigation, not meaning.
- Do not preserve one physically oversized/cohesion-poor file merely to avoid another file; physical decomposition is not semantic-owner creation.

### Owners used by this process

- every normative documentation owner being authored/revised;
- [`documentation-templates.md`](../documentation-templates.md) as the recommended presentation examples.

---
