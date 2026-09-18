<a id="artifact-placement-map"></a>
# Artifact Placement Map

This profile projection indexes Target Module `ARTIFACT_PROPOSAL` and Lens `ARTIFACT_GUIDANCE` records. Final placement remains P-14 / TF-10.

| Content kind | Guidance owner | Typical semantic owner | Proposal representation | Notes |
|---|---|---|---|---|
| Candidate Unit proposal / user-selection trace | `AG-VIS-UNIT-01` | current Target planning / Proposal-Decision owner | section in `target.md` or equivalent | retains every candidate heading + AI recommendation + USER selection; OMIT entries also retain situation/goal + relevant Source/reference coverage + explicit omission reason; omitted headings are not runtime Units |
| material Unit-need / Source-coverage finding | `AG-VIS-UNIT-02` | resolved Finding/Evidence/Target owner | embedded finding/evidence or supporting artifact | only when it must survive |
| accepted visual requirements | `AP-2D-REQ-01` | Requirements Target | embedded owner or visual brief | dedicated file not forced |
| retained visual-material registry | `AP-2D-MAT-01` | Material Preparation / project material owner | registry artifact when useful | consumer authority remains in Source State Units |
| whole visual design | `AP-2D-WVD-01` | Whole Visual Design Target | owner artifact + optional sketches/previews | produced sketch is not automatically a downstream Source |
| route canonical source | route `AP-2D-*` | construction-route Target | implementation-native editable source | canonical editable authority should be explicit |
| review previews | producer / Evidence owner | producer Target / Evidence | generated/supporting evidence artifact | never canonical merely because reviewable |
| integrated hybrid source | `AP-2D-VC-01` | multi-route Construction Target | implementation-native integrated source | only when composition Target is material |
| delivery variants | `AP-2D-DEL-01` | Delivery Adaptation Target | output/variant family owner | mechanical exports need no new semantic owner |
