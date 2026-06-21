# Support Score Review Workflow

Status: active workflow.

Purpose: calculate previous-day / day-close Support Score from support facts.

## Uses

- `Days/YYYY/YYYY-MM-DD.md`
- `Support Score Guide.md`
- `Templates/Support Score Review Template.md`
- `Examples/Support Score Day Examples.md`

## Core rule

Support Score is separate from Work Score.

Support Score never closes the 35 / 70 work baselines.

During the day, collect support facts only.

At day close / next morning, calculate Support Score approximately from facts.

## Steps

1. Identify the date.
2. Read the date-based day file.
3. Read `Support Score Guide.md`.
4. Read `Templates/Support Score Review Template.md`.
5. Read `Examples/Support Score Day Examples.md` when calibration is useful.
6. Extract Between-session / Support Facts.
7. Group facts into categories:
   - 🛌 Sleep / sleep attempt;
   - 🍽️ Food / no overload;
   - 🏃 Movement / sport;
   - 🧲⚡ Stimulus control;
   - 🔋 Recovery / readiness.
8. Estimate each category:
   - normal category range: 0..2;
   - sleep range: -5..2.
9. Produce Support Score and short reasons.
10. Fill `Day Close / Next-Morning Support Review` in the day file.
11. Fill or update `Final Day Summary` if closing the day.
12. If the day is a useful calibration example and the user asks, summarize it into `Examples/Support Score Day Examples.md`.

## AI role

AI may participate actively in support scoring.

AI should explain the approximate score and accept user correction.

AI should use examples for calibration when available.

## Do not

Do not modify D/F/K/P Work Score.

Do not convert support facts into Work Points.

Do not calculate Support Score from vibes without facts.

Do not force support scoring during the day.
