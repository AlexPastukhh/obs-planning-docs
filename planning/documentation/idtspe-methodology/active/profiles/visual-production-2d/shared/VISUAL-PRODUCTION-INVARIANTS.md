<a id="shared-visual-production-invariants"></a>
# Visual Production Invariants

1. **Candidate Units are selected from the current situation, not from the module inventory alone.** Every module-defined candidate Unit is evaluated against the actual Target scope, requested change, downstream need and accepted visual Sources/references before the AI recommends inclusion, thin resolution, omission or an open choice.
2. **Visual Source/reference coverage is responsibility-specific.** A Source may strongly cover one Unit responsibility and poorly cover another; avoid global labels such as “the reference covers everything”.
3. **Strong visual Sources reduce invention.** Preserve trustworthy source-covered identity, form, pose, composition, appearance or other relevant information unless the selected change explicitly overrides it.
4. **Omission proposals are explicit and user-visible.** If the AI recommends omitting a Unit, the Candidate Unit Selection must retain that Unit's semantic name/ID and state:
   - the current situation/goal relevant to the Unit;
   - the relevant reference/Source coverage, including `none/not relevant` when appropriate;
   - why no independently useful unresolved result responsibility remains;
   - the USER selection or `OPEN`.
   Do not collapse several omitted Units into one aggregate omission record; each omitted Unit requires its own named entry and reason.
5. **Omission is proposal/selection meaning, not a runtime placeholder.** A user-selected omission remains in the Candidate Unit Selection trace but does not instantiate an `N/A` Target Work Unit.
6. **Candidate Unit composition is not silently selected by AI.** The AI presents recommendations; material include/omit changes are user-selected unless the same selection is already current.
7. **Canonical editable source remains distinguishable from previews and exports.** Review images are projections/evidence unless the active owner explicitly makes them canonical.
8. **Generative image/3D output is supporting material by default.** Treat it as derived/synthetic unless an explicit owner decision gives it stronger authority for a specific responsibility.
9. **Construction is progressively inspectable.** Produce meaningful viewable states early enough to discover macro failures before expensive detail work.
10. **Prefer local revision when the representation supports it.** Correct the smallest owned structure that explains the defect instead of redrawing unrelated accepted work.
11. **Route defects to their semantic cause.** A construction defect stays in construction; a whole-design defect re-enters Whole Visual Design; missing visual information re-enters Visual Material Preparation; a requirement mismatch re-enters Visual Requirements.
12. **Construction route follows the required representation.** Pixel, vector, raster, painterly and procedural work use their own construction responsibilities instead of one universal drawing sequence.
13. **Hybrid construction is explicit only when integration matters.** Mechanical use of several accepted route outputs does not by itself justify a composition Target.
