# Planning State Output Template

Status: active template.

Purpose: compact state/output template for planning AI.

Source values should come from the relevant date-based day file: `Days/YYYY/YYYY-MM-DD.md`

Emoji notation agreements are owned by `Emoji Notation Map.md`.

Support facts layout is owned by `Templates/Support Facts Table Template.md`.

Support facts are not part of default compact output unless relevant, requested, or during day close / support review.

Penalty Events are not part of default compact output unless relevant, requested, or during day close / score review.

## 🎯 Result Tracking

| Поле | Значение |
|---|---|
| 🎯 Цель дня | `<day goal / broad daily target>` |
| 🌅 Desired | `<current meaningful desired goal/result the user wants to get now>` |
| 🌑 Undesired | `<undesired state / bad outcome the user refuses>` |
| 🗺️ Ближайшие глобальные цели | `<3–5 nearest/relevant global goals from Current Plan State.md, then ... if more exist>` |

If a field is missing, do not invent it.

## 🏁📊 Point 6 — Short D/F Race + Pattern Checks

Pattern source of truth: `Workflows/Real Reward Pattern Playbook.md`

This table is a compact rendering of active Point-6 checks. Pattern meanings and Pattern IDs are owned by the playbook.

Normal session = `3.5` = `D 1.75 + F 1.75` before adjustments.

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
- Fundamental score patterns are always active as check lenses.
- Fundamental penalty patterns are always active.
- Frequent situational patterns are active while frequent.
- Non-frequent Situational patterns are not shown by default.
- Full pattern templates are shown only by `/patterns` or `/pattern <name>`.
- This template must not redefine pattern meanings independently from `Workflows/Real Reward Pattern Playbook.md`.

## 🧵📜>🧪 Active Promises

When active promises exist:

| # | 🧪 Сейчас чувствую / тянет | 📐 Аналитически выведено | 🧵📜 Пришить как истину | 🌑 Не покупать | 🏁 Отрезок |
|---|---|---|---|---|---|

If no active promises exist, use:

Нет активных promises.

⚠️ Promise не создаётся автоматически. Сначала нужно определить цель / Desired / текущее ощущение / аналитическое предсказание.

## 🧾 Finished Sessions

| # | Time | Session | D/F | Points | Progress Signal | Result |
|---|---|---|---|---:|---|---|

## Optional: 🚨 Penalty Events

Show only when relevant, requested, or during day close / score review.

| # | Time | Pattern | Base penalty | Time loss | Total penalty | Reason |
|---|---|---|---:|---:|---:|---|

Rules:

- Penalty Events are not normal Finished Sessions.
- Penalty Events create negative Work Score adjustment.
- `👁️🚫🥊🎭➡️🕳️ No-resistance known drift` minimum penalty is `-10`.
- Additional penalty is proportional to lost session-equivalent time.
- Apply penalty only when the user knowingly normalized wrong drift without resistance.

## Optional: 🧯 Between-session / Support Facts

Show only when relevant, requested, or during day close / support review.

Use layout from `Templates/Support Facts Table Template.md`.

Do not calculate Support Score during the day.

## Rule

Default Planning State Output contains only:

1. 🎯 Result Tracking;
2. 🏁📊 Point 6 — Short D/F Race + Pattern Checks;
3. 🧵📜>🧪 Active Promises;
4. 🧾 Finished Sessions.
