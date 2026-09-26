# PTEST-STL-INSTALLED-HANDOFF — Installed browser-to-VS Code handoff

Status: planned Practical Test owner; execution evidence is not yet recorded.

## RU-PTEST-01 — Evidence Intent / Real Subject

**Methodology:** [RU-PTEST-01 Unit Definition](../../../../../../target-modules/TM-PRACTICAL-TEST.md#ru-ptest-01-processing-envelope), [Practical Test Result Contract](../../../../../../target-modules/TM-PRACTICAL-TEST.md#target-step-result-contract).

Target ID: `PTEST-STL-INSTALLED-HANDOFF`.

Target system: the installed Tampermonkey userscript and packaged Study Tab
Launcher extension operating through the real browser, Windows protocol
handler and installed VS Code, not an in-process substitute.

Properties to establish:

- each selected file action preserves one/set cardinality and add/close-others
  policy across clipboard/paste, protocol confirmation and final editor state;
- folder, ZIP, adaptive-project and trusted-copy routes retain source,
  destination, publication, window and Workspace Trust authority;
- the owning VS Code window is foregrounded before confirmation/effect when
  platform policy permits, while blocked automation remains recoverable;
- dirty-editor cancellation, existing-destination reuse and failures are
  visible and do not become false success.

## RU-PTEST-02 — Observation / Data Collection Plan

**Methodology:** [RU-PTEST-02 Unit Definition](../../../../../../target-modules/TM-PRACTICAL-TEST.md#ru-ptest-02-processing-envelope), [Practical Test Result Contract](../../../../../../target-modules/TM-PRACTICAL-TEST.md#target-step-result-contract).

Record browser, Tampermonkey, userscript, VS Code, extension, Windows and
workspace configuration versions before execution. Use disposable fixtures and
retain screenshots/logs sufficient to relate observation to the exact build.

1. Exercise all four file actions with one file and an ordered group; include
   an already-open target and dirty unrelated editor cancellation.
2. Exercise folder and ZIP project opening for immediate and delayed source
   arrival, existing extracted destination and new safe extraction.
3. Exercise trusted-copy for absent-child confirm/cancel, safe-existing reuse
   and visible actual Workspace Trust state.
4. For each project route observe browser protocol confirmation, initiating
   versus coordinator window focus, modal placement, final selected/new window
   and retained retry/copy recovery when launch automation is blocked.
5. Compare visible state/result with the current Feature and Scenario owners;
   record every mismatch as a Q/R/P in its natural owner.

### Campaign boundary

This is a material repeated real-environment campaign. The plan is bounded as
follows; these are planning criteria, not executed Evidence:

- **Representative variants / environments:** the file, folder, ZIP,
  adaptive-project and trusted-copy routes listed above across the recorded
  installed browser/Tampermonkey/VS Code/Windows configuration, including the
  adverse and recovery cases already named in this Unit.
- **Minimum sufficient Evidence set:** at least one attributable observation for
  every property in `RU-PTEST-01`, including one normal path and the material
  adverse/recovery cases that can falsify that property.
- **Stop / pass criterion:** stop with a passing interpretation only when every
  required property has attributable real-system Evidence, no required adverse
  case contradicts it, and any mismatch has been dispositioned rather than
  ignored.
- **Conditions that require expanding the campaign:** results differ materially by
  route/window/environment, an observed failure is not explained by the current
  owner model, or current Evidence is too sparse to distinguish host variance
  from an application defect.

## RU-PTEST-03 — Evidence Results / Interpretation

**Methodology:** [RU-PTEST-03 Unit Definition](../../../../../../target-modules/TM-PRACTICAL-TEST.md#ru-ptest-03-processing-envelope), [Practical Test Result Contract](../../../../../../target-modules/TM-PRACTICAL-TEST.md#target-step-result-contract).

Result: `OPEN`.

No installed-system execution record is currently owned here. Automated tests
are supporting executable evidence but do not substitute for browser/OS/VS
Code foreground, modal, dirty-editor and Workspace Trust observation.

