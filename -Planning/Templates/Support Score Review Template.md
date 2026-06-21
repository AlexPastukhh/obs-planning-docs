# Support Score Review Template

Status: active template.

Purpose: layout for day close / next-morning support review.

This template owns the rendered support-review structure.

Support scoring rules are owned by:

`Support Score Guide.md`

## 🌙 Day Close / Next-Morning Support Review

Status: not calculated yet.

Support Score is calculated only at day close / next-morning review from support facts and support marks.

### Support Marks

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 |  |  |  |

Support Score: not calculated

Formula:

`Support Score = average(support marks used for the day)`

### Support Penalty

| Rule | Penalty |
|---|---:|
| Support Score `< 1.0` | -20 |
| Support Score `< 1.25` and `>= 1.0` | -10 |
| Support Score `>= 1.25` | 0 |

Support Penalty: not calculated

Final Day Score: not calculated

Formula:

`Final Day Score = Net Work Score + Support Penalty`

### Rules summary

| Rule | Value |
|---|---|
| Scoring method | Average of support marks |
| Normalize to /10 | No |
| Max Support Score | Not used |
| Category sum | Not used |
| Support penalty thresholds | `<1.0 => -20`; `<1.25 => -10`; otherwise 0 |
| Penalty stacking | Non-cumulative; use strongest matching penalty only |
| Typical positive mark scale | 0..2 feel-scale |
| Sleep negative marks | allowed, e.g. -5 for major sleep collapse |
| When calculated | Day close / next morning |
| During day | Collect facts / provisional marks only |
| AI role | AI may participate actively in approximate support marking |
| Relation to Work Score | Support Score does not replace Work Score; Support Penalty is day-final, not a session penalty |

### Support Interpretation

not calculated

### Support Facts Used

| Fact | Effect |
|---|---|

## Rule

Support Score is approximate and individual.

Use support facts from the day file.

Use `Examples/Support Score Day Examples.md` for calibration when available.

Do not calculate final Support Score during the day unless the user explicitly asks for a premature estimate.
