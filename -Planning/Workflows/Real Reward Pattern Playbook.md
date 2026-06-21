# Real Reward Pattern Playbook

Status: active workflow companion.

Purpose: store score-relevant behavioral patterns for applying the Real Reward Work Loop.

This is not a log, not today's documentation, and not rendered output.

Owner workflow: `Workflows/Real Reward Work Loop Workflow.md`

Emoji notation owner: `Emoji Notation Map.md`

## Source of truth rule

This playbook owns pattern IDs, pattern names, emoji labels, pattern meanings, active Point-6 status, and Fundamental / Frequent / Situational / Penalty classification.

Other files may duplicate compact labels for rendering or UI, but must link back to this playbook and must not redefine pattern meaning independently.

Templates may render compact Point-6 labels.

Tampermonkey / Pattern Capture may duplicate UI button labels, but each button must map to a Pattern ID owned here.

## D/F-only score model

Normal session = `3.5`.

- ✅D base = `1.75`
- ⚡F base = `1.75`
- Session total = `D + F + score adjustments`

`K` and `P` are no longer separate score dimensions.

Their previous meanings are absorbed into D and pattern checks:

- course / Desired connection is checked through D and active patterns;
- value left after attention ends is checked through D and active patterns;
- focus / frame / tempo / attention control remains F;
- stimuli and chemistry are evaluated in both D and F.

### ✅D — useful target work / result

D asks what was done for the selected goal.

D includes:

- useful work actually performed;
- useful result / artifact / decision / remaining value;
- whether the result is useful for Desired / current goal;
- whether losses were minimized;
- whether the user managed work so it stayed useful;
- whether needed stimuli / chemistry / feelings were noticed, chosen, and attached to the goal;
- whether Desired and Undesired stayed visible.

### ⚡F — focus / execution / state

F asks how the work was done.

F includes:

- focus;
- visible frame / timer / target;
- tempo;
- control of attention;
- quality of execution;
- whether stimuli and feelings supported the action;
- whether promise / sewn truth was used when pull or resistance was strong.

## Pattern categories

### Fundamental score patterns

Always used in point 6. They are score-check lenses for D/F-only session scoring.

They are not separate score dimensions.

### Fundamental penalty patterns

Always checked in point 6, but they are not normal D/F criteria. They create negative Work Score adjustment when the user knowingly normalizes a wrong action without resistance.

Minimum confirmed penalty: `-10`. Additional penalty is proportional to lost session-equivalent time.

Apply only when all are true:

1. The user understood the action was wrong / off-scope / damaging.
2. The user did not fight, stop, mark, recover, or create a promise.
3. The user normalized it as okay.
4. Damage or time loss happened.

### Situational patterns

Used only when the user says the pattern happened, asks to evaluate it, or the situation clearly matches it. They do not go into point 6 by default.

### Frequent situational patterns

Situational patterns marked `Frequency: frequent` are included in point 6 while frequent.

## Active point-6 pattern labels

| Pattern ID | Emoji | Pattern | Type |
|---|---|---|---|
| short_distance_self_competition | 🏁🥊👤↔️👤⏱️ | Short-distance self-competition | Fundamental |
| useful_result_min_losses | 🎯💎📉 | Useful result with minimal losses | Fundamental |
| low_cost_stimulus_cage_desired | 🧲⚡🧱👁️🌅➡️🎯 | Low-cost stimulus cage toward Desired | Fundamental |
| session_frame_visible_target | ⏱️🚂🛤️➡️🎯 | Session frame / visible target | Fundamental |
| targeted_stimuli_chemistry_only | 🧲⚡🧪➡️🎯 | Targeted stimuli / chemistry only | Fundamental |
| course_desired_connection | 🛤️🌅➡️🎯 | Course / Desired connection | Fundamental |
| value_left_after_attention | 👁️⏳➡️💎 | Value left after attention ends | Fundamental |
| no_resistance_known_drift | 👁️🚫🥊🎭➡️🕳️ | No-resistance known drift | Fundamental penalty |
| complex_problem_easy_stimulation | 🧩🪜⚠️➡️🧲⚡ | Complex multi-level problem -> easy stimulation | Frequent situational |
| automatic_rails_result_forgotten | 🚂🛤️⚠️🎯 | Automatic rails but Result forgotten | Frequent situational |

## Situational pattern labels

| Pattern ID | Emoji | Pattern | Type |
|---|---|---|---|
| fast_recovery_after_slip | 📉📈 | Fast recovery after slip | Situational |
| public_anxiety_inner_dialogue_slowdown | 🏙️🧠🔁⏳ | Public anxiety -> inner-dialogue slowdown | Situational |
| unactionable_out_of_scope_worry | 🧠🌪️🚫🎯 | Unactionable out-of-scope worry | Situational |
| complex_problem_easy_stimulation | 🧩🪜⚠️➡️🧲⚡ | Complex multi-level problem -> easy stimulation | Frequent situational |
| automatic_rails_result_forgotten | 🚂🛤️⚠️🎯 | Automatic rails but Result forgotten | Frequent situational |

## Point 6 compact table

Pattern source of truth: `Workflows/Real Reward Pattern Playbook.md`

This table is a compact rendering of active Point-6 checks. Pattern meanings are defined by Pattern IDs in this playbook.

| Score layer | Check |
|---|---|
| ✅D | What would maximum D look like for this short segment?<br>What would usual D look like?<br>Did I manage the work so it stayed useful for Desired/current goal?<br>Did I create a desired/visible useful result?<br>Did I install the needed stimuli/feelings for the goal?<br>Did I beat usual D and expand its boundary? |
| ⚡F | What would maximum F look like for this short segment?<br>What would usual F look like?<br>Did I manage focus, frame, tempo, and execution?<br>Did I increase useful actions per unit of time?<br>Did I install the needed stimuli/feelings for execution?<br>Did I beat usual F and expand its boundary? |
| 🧩 Active pattern checks | 🏁🥊👤↔️👤⏱️ Short-distance self-competition<br>🎯💎📉 Useful result with minimal losses<br>🧲⚡🧱👁️🌅➡️🎯 Low-cost stimulus cage toward Desired<br>⏱️🚂🛤️➡️🎯 Session frame / visible target<br>🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only<br>🛤️🌅➡️🎯 Course / Desired connection<br>👁️⏳➡️💎 Value left after attention ends<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent)<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| 🚨 Penalty | 👁️🚫🥊🎭➡️🕳️ No-resistance known drift |
| 🔎 Full patterns | `/patterns` |

## Pattern format

Each pattern should include Pattern ID, Emoji, Type, Default point 6 status, Core idea, Adds, Subtracts, Do instead, Promise need when relevant, and Short D/F deadline race questions.

Penalty patterns also include penalty condition, base penalty, time-loss penalty, and confirmation/safety rule.

---

## Fundamental score patterns

### Pattern: 🏁🥊👤↔️👤⏱️ Short-distance self-competition

Pattern ID: `short_distance_self_competition`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: гонка с собой на короткой дистанции добавляет score, если я делаю deadline-сегмент лучше, чем сделал бы прошлый / обычный / дрейфующий я. Race means better useful target work and better execution, not panic-speed.

A short-distance race requires a visible short deadline.

Deadline is not panic-speed. It is a boundary that turns the segment into a race against ordinary/drifting execution.

Adds: short segment, visible short deadline, visible target, tempo, attempt to beat ordinary/drifting self, maximum-vs-usual D comparison, maximum-vs-usual F comparison, useful output, future habit training.

Subtracts: no deadline, no race, no attempt to do better, segment spreads, tempo dies, ordinary result is accepted without pressure, process presence without useful improvement.

Do instead: make the next segment short, set a visible deadline, define ordinary D/F, define best possible D/F, target visible, timer/score visible, then race by improving D/F.

Short D/F deadline race:

- D: what would maximum D look like for this segment, what would usual D look like, and what useful target work/result did I improve versus usual/drifting me?
- F: what would maximum F look like for this segment, what would usual F look like, and did the deadline race improve focus, tempo, frame, useful actions per unit of time, and execution?
- Deadline: did the visible deadline make the segment tighter without turning it into panic-speed?

---

### Pattern: 🎯💎📉 Useful result with minimal losses

Pattern ID: `useful_result_min_losses`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: D grows when the segment creates a useful result that moves the real goal with the smallest reasonable losses. D does not grow maximally from just “some result”, process repetition, busy movement, or a result that costs too much.

Useful result means: it moves Desired/current goal, leaves usable value, reduces future friction, and justifies the time and attention spent.

Losses include: wasted time, focus leakage, unnecessary complexity, overbuilding, stimulation residue, future inertia damage, and process loops.

Adds: useful output exists; result is on-target; losses are limited; next action is easier; result leaves reusable value; result is not merely “something happened”.

Subtracts: process continued but useful result stayed weak; some result appeared but cost was too high; overbuilt solution; unnecessary rabbit holes; stimulation/process residue; result did not justify losses; useful-looking process left little real value.

Do instead: ask what useful result should exist, what losses must be avoided, what the smallest sufficient output is, and when marginal value drops enough to stop or switch.

Short D/F race:

- D: useful result exists with minimal reasonable losses.
- F: focus and execution control kept losses from spreading.

Deprecated previous name: `🎯📈≠🎭🔁 Result Tracking over process`.

---

### Pattern: 🧲⚡🧱👁️🌅➡️🎯 Low-cost stimulus cage toward Desired

Pattern ID: `low_cost_stimulus_cage_desired`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: low-cost stimuli and feelings are present, but contained. The user is in a “cage” of cheap pulls / discomfort / easy feelings, but clearly sees real Desired, sees the inconvenience and energy, and routes that energy into the useful target result instead of buying low-cost relief.

Adds: low-cost stimuli noticed; cheap relief contained; Desired visible; Undesired / real price visible; discomfort named; energy routed into target; promise used if the cage is sticky; work continues toward the useful result.

Subtracts: low-cost feelings become authority; cheap stimuli define the next action; discomfort turns into escape; Desired disappears; energy leaks into relief, browsing, food, pseudo-work, or unnecessary branches.

Do instead: name the cage, name Desired, name Undesired/price, choose the smallest target action, use timer/score/promise, redirect energy into the useful result.

Short D/F race:

- D: did I keep Desired visible and route energy toward useful target work/result?
- F: did I stay contained enough that stimuli/feelings supported execution instead of stealing it?

Questions:

- Какие low-cost стимулы/ощущения сейчас образуют клетку?
- Вижу ли я реально желаемый результат?
- Вижу ли я неудобства и цену?
- Направляю ли я энергию в Desired, а не в low-cost relief?

---

### Pattern: ⏱️🚂🛤️➡️🎯 Session frame / visible target

Pattern ID: `session_frame_visible_target`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: F grows when there is a session frame, visible target, timer/short segment, score awareness, and clear end. `🚂🛤️` means rails/frame; bare `🛤️` means course/direction.

Adds: session frame, visible target, timer, score awareness, clear end, loggable result.

Subtracts: unframed work, no target, unclear D/F, foggy “doing something”.

Do instead: start a session, name target, make target visible, use timer/frame, log after.

---

### Pattern: 🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only

Pattern ID: `targeted_stimuli_chemistry_only`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: score rises when valid stimulation and useful chemistry are narrowed to target. Non-target stimuli/chemistry should not become authority.

Adds: stimuli fuel target, chemistry supports target, wrong stimuli not fed, non-target reactions noticed and not treated as truth, promise used when pull is strong.

Subtracts: stimuli spread to non-target branches, chemistry becomes authority, easy stimuli replace target, reaction is served instead of result.

Do instead: notice/name chemistry, do not argue/feed it, let it burn out when needed, redirect stimulation to timer/visible progress/score/race/D-F.

---

### Pattern: 🛤️🌅➡️🎯 Course / Desired connection

Pattern ID: `course_desired_connection`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: the segment should connect to current course / Desired / nearest global goals. It is now a D and pattern-check question, not a separate score dimension.

Adds: day goal, Desired, nearest global goals, current course, useful-now over useful-later.

Subtracts: interesting replaces needed, easy branch replaces course, important-but-not-now steals segment, side branch pretends to be main.

Do instead: check day goal / Desired / global goals. Defer non-current work or explicitly allow it.

---

### Pattern: 👁️⏳➡️💎 Value left after attention ends

Pattern ID: `value_left_after_attention`

Type: Fundamental score pattern. Default point 6: yes.

Core idea: D grows when something useful remains after the segment. The session should not disappear with attention.

Adds: artifact, structure, written decomposition, decision, draft, removed blocker, clear next action, continuation material.

Subtracts: only memory of effort remains; nothing can be continued; process ate time but left no value.

Do instead: leave a small artifact, capture decision, write decomposition, name blocker, create next action.

---

## Fundamental penalty patterns

### Pattern: 👁️🚫🥊🎭➡️🕳️ No-resistance known drift

Pattern ID: `no_resistance_known_drift`

Type: Fundamental penalty pattern. Default point 6: yes.

Emoji: 👁️ = saw/understood; 🚫🥊 = no fight; 🎭 = pretended it was fine; ➡️🕳️ = drifted into damage.

Core idea: this is not ordinary drift. I understand the action is not needed / off-scope / not Desired / damaging, but I do not fight, recover, stop, mark, or promise. I normalize it and continue.

Penalty rule: minimum `-10`; add time-loss penalty proportional to lost sessions.

Prevents penalty: 📉📈 Fast recovery after slip, honest mark, stopping branch, promise, small recovery segment.

Do instead: mark event, stop wrong action, use 📉📈 if recovered, create Penalty Event if no-resistance happened, use promise if pull is strong, return to smallest target segment.

---

## Situational patterns

### Pattern: 📉📈 Fast recovery after slip

Pattern ID: `fast_recovery_after_slip`

Type: Situational pattern. Default point 6: no unless marked frequent later.

Core idea: a slip is not good, but fast recovery sharply reduces damage and can prevent `👁️🚫🥊🎭➡️🕳️`.

---

### Pattern: 🏙️🧠🔁⏳ Public anxiety -> inner-dialogue slowdown

Pattern ID: `public_anxiety_inner_dialogue_slowdown`

Type: Situational pattern. Default point 6: no unless marked frequent later.

Core idea: internal dialogue often does not solve public anxiety; it becomes a loop that slows physical action. Replacement is external next action.

---

### Pattern: 🧠🌪️🚫🎯 Unactionable out-of-scope worry

Pattern ID: `unactionable_out_of_scope_worry`

Type: Situational pattern. Default point 6: no unless marked frequent later.

Core idea: if worry cannot become action now, it is not planning; it is an unactionable loop that steals focus and leaves residue.

---

### Pattern: 🧩🪜⚠️➡️🧲⚡ Complex multi-level problem -> easy stimulation

Pattern ID: `complex_problem_easy_stimulation`

Type: Situational pattern. Frequency: frequent. Default point 6: yes while frequent.

Core idea: the problem is not decomposed enough. The user is not choosing real rest. The mind is escaping from unclear analytical pressure. The real blocker is written decomposition.

Do instead: name the real blocker, write 3–5 small points, pick first layer, make first analytical move tiny, use target-related stimulation.

Promise need: use promise if pull to easier stimulation is strong or repeated.

---

### Pattern: 🚂🛤️⚠️🎯 Automatic rails but Result forgotten

Pattern ID: `automatic_rails_result_forgotten`

Type: Situational pattern. Frequency: frequent. Default point 6: yes while frequent.

Core idea: the system is working at process level, but the result has gone dim. The user is not off the rails, but the engine needs fuel.

Formula: ты на рельсах, но нужно ещё дрова в двигатель подкидывать.

Do instead: pause briefly, name Desired / useful result, ask what should become more real, add timer/score/visible progress, continue rails with result pressure.
