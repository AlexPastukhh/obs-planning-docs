# Day — YYYY-MM-DD

Status: active

Day file source of truth: this file owns the concrete state, sessions, support facts, penalty events, carryover, and final review for this date.

AI must not infer current day automatically.

User provides the date or establishes an active conversation day date.

If this file does not exist, create it from `Templates/Day File Template.md`.

Reusable owners:

- Compact planning output structure: `Templates/Planning State Output Template.md`
- Support facts table: `Templates/Support Facts Table Template.md`
- Support score review layout: `Templates/Support Score Review Template.md`
- Support score rules: `Support Score Guide.md`
- Pattern meanings and IDs: `Workflows/Real Reward Pattern Playbook.md`
- Main workflow: `Workflows/Real Reward Work Loop Workflow.md`
- Emoji notation: `Emoji Notation Map.md`

---

## 🎯 Result Tracking

| Поле | Значение |
|---|---|
| 🎯 Цель дня | ⚠️ не задана — нужно выбрать цель дня |
| 🌅 Desired | ⚠️ не задан — нужно определить текущую значимую желаемую цель |
| 🌑 Undesired | ⚠️ не задан — нужно определить реальную плохую цену / слив |
| 🗺️ Ближайшие глобальные цели | ⚠️ не подтянуты — нужно прочитать / обновить Current Plan State.md |

---

## 🏁📊 Point 6 — Short D/F Race + Pattern Checks

Pattern source of truth: `Workflows/Real Reward Pattern Playbook.md`

Workflow source of truth: `Workflows/Real Reward Work Loop Workflow.md`

This section stores the active compact Point-6 view for the day. Pattern meanings and Pattern IDs are owned by the playbook.

Normal session = `3.5` = `D 1.75 + F 1.75` before adjustments.

Compact flying-cage workflow:

`🧠🤫💰 → 📚🛤️ → 🚨 → 🧲⚡🧱😣🚀 → 🧵📜🟢🔴 → ✅D max-vs-usual → ⚡F max-vs-usual → 🏁⏱️📊 → 🧾`

| Score layer | Active check |
|---|---|
| ✅D | What useful target work/result did I create?<br>Did I manage the work so it stayed useful for Desired/current goal?<br>Did I choose or notice the stimuli/chemistry needed for the goal?<br>What useful value remains after attention ends? |
| ⚡F | How focused, framed, controlled, and clean was execution?<br>Did stimuli/feelings support doing the work instead of stealing it?<br>Did I use a promise/sewn truth when pull or resistance was strong? |
| 🧩 Active patterns | 🏁🥊👤↔️👤⏱️ Short-distance self-competition<br>🎯💎📉 Useful result with minimal losses<br>🧲⚡🧱👁️🌅➡️🎯 Low-cost stimulus cage toward Desired<br>⏱️🚂🛤️➡️🎯 Session frame / visible target<br>🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only<br>🛤️🌅➡️🎯 Course / Desired connection<br>👁️⏳➡️💎 Value left after attention ends<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent)<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| 🚨 Penalty | 👁️🚫🥊🎭➡️🕳️ No-resistance known drift |
| 🔎 Full patterns | `/patterns` |

Rules:

- D/F are the only score dimensions.
- Course / Desired connection and value-left checks are handled through D and pattern checks.
- Pattern buttons / selected patterns are context for review and do not directly adjust score.
- D/F score buttons or session review create score adjustments.
- Penalty Events are separate from normal Finished Sessions.

---

## 🧵📜>🧪 Active Promises

Нет активных promises.

⚠️ Promise не создаётся автоматически. Сначала нужно определить цель / Desired / текущее ощущение / аналитическое предсказание.

---

## 🧾 Finished Sessions

| # | Time | Session | Goal(s) | D/F | Points | Progress Signal | Result |
|---|---|---|---|---|---:|---|---|

Rules:

- Every finished session records only final `D`, final `F`, and final `Points` as required score fields.
- `Base`, `Adj`, score deltas in parentheses, and other calculation internals are not stored in Finished Sessions.
- `Goal(s)` is optional. Record only goals explicitly provided by the user. Preserve all explicitly named goals.
- `Time`, `Session`, `Goal(s)`, `Progress Signal`, and `Result` remain blank when the user does not provide them.
- Do not replace blank optional cells with `not provided`, `—`, inferred text, or session-name fallbacks.
- A minimal valid row is: blank optional cells + `D <value> / F <value>` + final `Points`.

---

## 🚨 Penalty Events

| # | Time | Pattern | Base penalty | Time loss | Total penalty | Reason |
|---|---|---|---:|---:|---:|---|

Rules:

- Penalty Events are not normal Finished Sessions.
- Penalty Events create negative Work Score adjustment.
- `👁️🚫🥊🎭➡️🕳️ No-resistance known drift` minimum penalty is `-10`.
- Additional penalty is proportional to lost session-equivalent time.
- Apply penalty only when the user knowingly normalized wrong drift without resistance.
- Fast recovery after slip `📉📈` can prevent a slip from becoming a penalty event.

### Work Score Summary

| Поле | Значение |
|---|---|
| Work Points | 0 |
| Penalties | 0 |
| Net Work Score | 0 |
| Previous-day carryover debt | not provided |
| Net score after carryover | not calculated |
| Old baseline | not calculated |
| Full closure | not calculated |
| Carryover status | not provided |
| Main course movement | not provided |
| Progress | not provided |

Value semantics:

- `0` means a known real zero.
- `not provided` means the source value was not provided.
- `not calculated` means a derived value cannot be calculated yet or has not been calculated.
- `not closed` means the final day result has not been closed.
- Do not replace an unknown input with `0`.
- Do not calculate a derived value until every required input exists.

Notes:

35 points = close old 4y2m baseline / previous-score bucket.

70 points = close old baseline + current day / previous + current score buckets.

Work Points are counted only from Finished Sessions or explicit user-defined manual closure entries.

Penalties come from Penalty Events.

Carryover debt is separate from normal Penalty Events unless explicitly recorded as a penalty/carryover by the user.

Net Work Score = Work Points + Penalties.

Net score after carryover = Net Work Score - Previous-day carryover debt.

Baseline closure is evaluated from the score basis explicitly chosen for the day: raw Work Points, Net Work Score, or net after carryover.

Support Score never closes 35/70 work baselines.

---

## 🧯 Between-session / Support Facts

During the day, collect facts and/or provisional support marks only.

Do not calculate final Support Score during the day.

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 |  |  |  |  |

Types:

| Type | Meaning |
|---|---|
| 🛌 sleep / sleep attempt | сон или честная попытка заснуть |
| 🍽️ food | еда / переедание / не объелся |
| 🏃 movement / sport | движение, спорт, прогулка |
| 🧲⚡ stimulus control | стимулы, залипание, не разжёг стимулы |
| 🔋 recovery / readiness | восстановление, готовность продолжать |
| 🔁 transition | переход между сессиями |
| 🩺 health | доп. время для здоровья |
| 🧩 other | другое |

---

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

Rules:

- Do not normalize Support Score to `/10`.
- Do not calculate `Max Support Score = 10`.
- Do not sum categories into a 10-point total.
- Support Penalty thresholds are non-cumulative; use strongest matching penalty only.
- Typical positive marks often use a `0..2` feel-scale.
- Sleep may use strong negative marks, such as `-5`, when sleep collapses.

### Support Interpretation

not calculated

### Support Facts Used

| Fact | Effect |
|---|---|

---

## 🧾 Final Day Summary

Status: not closed.

| Поле | Значение |
|---|---|
| Work Score | not closed |
| Work Points | 0 |
| Penalties | 0 |
| Net Work Score | 0 |
| Previous-day carryover debt | not provided |
| Net score after carryover | not calculated |
| Support Score | not calculated |
| Support Penalty | not calculated |
| Final Day Score | not calculated |
| Old baseline | not calculated |
| Full closure | not calculated |
| Day class | active |
| Carryover to next day | not calculated |
| Main result | not provided |
| Main risk / lesson | not provided |
| Next-day note | not provided |

---

## Carryover

| Field | Value |
|---|---:|
| Carryover type | not provided |
| Carryover amount | not provided |
| From | not provided |
| To | not provided |
| Reason | not provided |

---

## Notes

-
