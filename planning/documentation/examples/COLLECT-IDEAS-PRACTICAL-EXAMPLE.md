# Practical Example — Idea Collection And Review

## Applied methodology

Two global depths are available: `Standard Idea Review` (default) and `Deep Idea Planning` (same Idea with full workspace/Variants/evidence/evaluation when useful).


Для каждой Idea сохраняется понятный baseline:

```text
Source / Status
Problem / Need
Proposed Answer
Relevance / Expected Effect
Current Conclusion
```

И обязательно выполняются проверки:

```text
Necessity / Better-Route
Possible Idea Refinements
Local Consistency
Integrated Consistency
```

При этом:

```
required check ≠ required populated field
```

Если проверка не нашла material finding, отдельный пустой блок не требуется.

Дополнительные invariants:

```
- do not invent criticism;
- do not defend an Idea merely because it was proposed;
- do not invent refinements;
- a genuinely simpler/better route is a successful review result;
- Possible Refinements change the Idea itself,
  not files or implementation actions;
- material unresolved findings are promoted
  to Questions / Risks / Problems;
- aggregate findings reference the Idea(s)
  from whose review they were discovered.
```

---

# Group A — Общая Idea methodology

## IDEA-A1 — Одна общая концепция Idea

**Source / Status:** user-stated; current direction.

**Problem / Need:** одинаковая работа с возможными ответами возникает при conversation review, solution/workflow planning, application planning и file-update planning.

**Proposed Answer:** использовать одну общую концепцию `Idea` и один набор analytical surfaces. Контекст меняет scope/owner и глубину анализа, но не создаёт новый вид Idea.

**Relevance / Expected Effect:**

```
Need / Problem
→ Idea
→ Evaluation
→ Integration
→ Current Conclusion
```

может применяться на разных уровнях planning.

**Necessity / Better-Route:** более простой путь — именно не создавать отдельные `Scenario Idea`, `File Update Idea`, `Review Idea` и другие context-specific разновидности.

**Integrated Consistency:** Scenario, Workflow Step, Behavior Item и другие semantic owners сохраняют свои ответственности; Idea их не заменяет.

**Current Conclusion:** **keep**.

---

## IDEA-A2 — Любая Idea проходит обязательный lightweight review

**Source / Status:** user-stated; current direction.

**Problem / Need:** простой сбор Ideas иначе легко превращается в структурированный пересказ.

**Proposed Answer:** даже в недиповом режиме каждая Idea проходит минимальный meaningful review.

**Relevance / Expected Effect:** `collect ideas` включает анализ, а не только extraction.

**Risk:** если обязательными сделать физически заполненные блоки, review превратится в анкету и начнёт производить искусственный материал.

**Possible Refinement:** обязательными считать **проверки**, а найденный результат выводить только когда он material.

**Current Conclusion:** **keep with conditional output**.

---

## IDEA-A3 — Necessity / Better-Route Check должен быть truth-seeking

**Source / Status:** user-stated; current direction.

**Problem / Need:** модель может автоматически защищать предложенную Idea либо искусственно придумывать objections ради демонстрации критичности.

**Proposed Answer:** активно проверять:

```
можно ли не реализовывать Idea;
можно ли получить Desired Result без неё;
можно ли убрать саму проблему;
достаточно ли существующего решения;
достаточно ли меньшего изменения;
есть ли реально более простой или лучший путь;
не делает ли другая Idea её redundant.
```

**Relevance / Expected Effect:** оптимизируется итоговый solution, а не судьба исходной Idea.

**Possible Refinement:** canonical wording:

> Test whether the Idea actually deserves implementation.

вместо требования обязательно спорить с Idea.

**Current Conclusion:** **keep**.

---

## IDEA-A4 — Possible Idea Refinements входят в обязательный review

**Source / Status:** user-stated; current direction.

**Problem / Need:** Idea может быть в целом корректной, но review может увидеть реальный способ её улучшить без необходимости отвергать core meaning.

**Proposed Answer:** проверять возможные изменения самой Idea:

```
simplify;
narrow;
strengthen;
clarify;
split / merge;
change a boundary;
remove an unnecessary part;
make a risky part conditional.
```

**Relevance / Expected Effect:** review умеет давать результат между `keep as-is` и `reject`.

**Risk:** обязательное наличие refinement приведёт к искусственному перепридумыванию нормальных Ideas.

**Possible Refinement:** обязательна проверка; выводить refinement только если найден meaningful option.

**Integrated Consistency:** Idea refinement не является file edit или implementation action.

**Current Conclusion:** **keep with conditional output**.

---

## IDEA-A5 — Material findings поднимаются выше локальной Idea

**Source / Status:** user-stated; current direction.

**Problem / Need:** важный issue может быть обнаружен внутри одной Idea и потеряться при чтении всего набора.

**Proposed Answer:**

```
Idea-local finding
→ Group Review when group-relevant
→ Questions / Risks / Problems
→ Whole Review when broader
```

**Relevance / Expected Effect:** material uncertainty остаётся заметной.

**Risk:** механическое копирование всего reasoning создаст duplication.

**Possible Refinement:** поднимать только material finding; подробное reasoning оставлять возле originating Idea.

**Current Conclusion:** **keep**.

---

## IDEA-A6 — `Questions / Risks / Problems` является обязательным aggregate section

**Source / Status:** user-stated; current direction.

**Problem / Need:** unresolved decisions, meaningful risks и спорные refinements должны иметь одно хорошо заметное место в итоговом review.

**Proposed Answer:** в conversation Idea review и file-update plan всегда существует:

```
Questions / Risks / Problems
```

Если material findings нет, достаточно коротко это зафиксировать.

**Relevance / Expected Effect:** unresolved material не смешивается с Current Conclusions.

**Possible Refinement:** спорный improvement формулировать как decision question:

```
Should Idea X be changed in way Y,
or should its current form remain unchanged?
```

**Current Conclusion:** **keep as structural invariant for these use cases**.

---

## IDEA-A7 — Review и Deep Planning являются разной глубиной одной методологии

**Source / Status:** previously accepted.

**Problem / Need:** нужны лёгкий review и глубокое исследование без двух параллельных schemas.

**Proposed Answer:**

```
Review
= mandatory lightweight review

Deep Planning
= Review
+ deliberate variants
+ assumptions / risks
+ evidence / tests
+ integration alternatives
+ combination evaluation
+ deeper refinement
```

**Relevance / Expected Effect:** одна Idea может постепенно углубляться.

**Current Conclusion:** **keep**.

---

## IDEA-A8 — Idea Groups являются lightweight grouping

**Source / Status:** previously accepted.

**Problem / Need:** большой плоский список плохо показывает отношения между связанными Ideas.

**Proposed Answer:**

```
Idea Group
  Ideas
  Group Review
  Group Conclusion
```

**Necessity / Better-Route:** отдельный managed object не требуется; heading/grouping может быть достаточной representation.

**Current Conclusion:** **keep proportionally**.

---

## IDEA-A9 — Idea work сохраняет scoped ownership

**Source / Status:** previously accepted reuse from `gdoc`.

**Problem / Need:** local Idea одного Variant/owner не должна молча становиться общей для sibling scopes.

**Proposed Answer:** Idea work принадлежит самому узкому meaningful owner; shared question остаётся parent-level.

**Possible Refinement:** semantic ownership не требует folder/file per Idea.

**Current Conclusion:** **keep semantic rule**.

---

## IDEA-A10 — Aggregate findings обязаны ссылаться на originating / related Ideas

**Source / Status:** latest user addition; current direction.

**Problem / Need:** если `Questions / Risks / Problems` или `Potential Simplifications / Better Routes` содержат только текст finding, сложно понять, **в рамках анализа чего именно он возник**, вернуться к reasoning и оценить его последствия.

**Proposed Answer:** каждый aggregate finding должен указывать одну или несколько связанных Ideas:

```
[IDEA-D5]
Risk:
  ...

[IDEA-A4, IDEA-D6]
Question:
  ...
```

или:

```
Related Ideas: IDEA-D5, IDEA-D6
```

**Relevance / Expected Effect:** появляется простая traceability:

```
Aggregate Finding
→ originating / affected Ideas
→ local reasoning
```

**Necessity / Better-Route:** relying only on section position or wording is less reliable once the review becomes large or Ideas move between Groups.

**Possible Refinement:** различать не требуется жёстко `originating` и `affected` Idea. Для lightweight review достаточно `Related Ideas`, если это понятнее и не теряет связь.

**Local Consistency:** ссылка на Idea не означает, что finding принадлежит только ей; cross-Idea finding может ссылаться на несколько IDs.

**Integrated Consistency:** то же правило применяется к:

```
Questions / Risks / Problems
Potential Simplifications / Better Routes
Group-level material findings
Whole-review findings
```

**Current Conclusion:** **keep as traceability invariant**.

---

# Group B — Conversation Capture

## IDEA-B1 — Нужен addressable capture/review разрозненного разговора

**Source / Status:** confirmed user use case.

**Problem / Need:** разговор смешивает Needs, Ideas, corrections, questions, constraints, decisions и current facts.

**Proposed Answer:** извлекать addressable meanings, сохранять provenance, группировать и проводить local/group/whole review.

**Relevance / Expected Effect:** разговор превращается в reviewable planning picture.

**Necessity / Better-Route:** для короткого разговора обычный summary может быть достаточным; addressable capture нужен proportionally.

**Local Consistency:** не каждое captured statement является Idea. Existing Reality, constraints и checked facts должны сохранять другой смысл.

**Current Conclusion:** **keep use case; exact capture representation unresolved**.

---

## IDEA-B2 — Planning Item убирается из target methodology

**Source / Status:** accepted direction.

**Problem / Need:** универсальный Planning Item дублирует Ideas, Decisions, Constraints, Workflow Steps, Scenarios, Behavior Items и реальные current owners.

**Proposed Answer:** source/conversation decomposes directly into Ideas, Existing Reality, Constraints, Decisions, Questions и другие meaningful categories, которые routing-ятся в реальные owners.

Существующие `ITEM-*` records можно сохранять как provenance/history/migration source, но они больше не являются обязательным промежуточным semantic layer.

**Necessity / Better-Route:** отдельной unique current responsibility для универсального Planning Item после общей Idea methodology не осталось.

**Current Conclusion:** **remove from target methodology; preserve historical records as provenance/history where useful**.

# Group C — Solution / Workflow planning

## IDEA-C1 — Planning начинается с Problem / Question / Idea, а не с Application

**Source / Status:** accepted direction.

**Problem / Need:** app-first framing преждевременно сужает solution space.

**Proposed Answer:**

```
Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ candidate solution approaches
```

Existing tool, process change, automation, integration, no-change и custom app рассматриваются как возможные решения.

**Necessity / Better-Route:** если application decision уже подтверждён внешним контекстом, без причины повторно открывать его не требуется.

**Current Conclusion:** **keep as general default**.

---

## IDEA-C2 — Sequential solution планируется через complete Workflow Variants

**Source / Status:** accepted direction.

**Problem / Need:** лучший local Step answer не гарантирует лучший end-to-end solution.

**Proposed Answer:** для materially sequential решения сравнивать trigger-to-result Workflow Variants.

**Necessity / Better-Route:** простой atomic solution не требует отдельного Workflow layer.

**Current Conclusion:** **keep proportionally**.

---

## IDEA-C3 — Local Workflow questions use the same two global Idea-analysis modes

**Source / Status:** accepted direction.

**Problem / Need:** local question внутри Workflow Step может требовать обычного review или deep exploration, но не отдельного Workflow-specific Idea workspace mode.

**Proposed Answer:** Step остаётся Step; material local question uses `Standard Idea Review` or `Deep Idea Planning` at the narrowest useful owner.

**Integrated Consistency:** local Current Conclusion reintegrates into whole Workflow Variant and whole-workflow evaluation. Best local variant ≠ automatically best whole solution.

**Current Conclusion:** **keep under the global two-mode methodology**.

## IDEA-C4 — Application responsibility должна быть justified или already confirmed

**Source / Status:** accepted direction.

**Problem / Need:** custom application не должно автоматически следовать из любой проблемы.

**Proposed Answer:** application planning начинается, когда app получает meaningful responsibility из текущего solution planning либо из already-confirmed external decision.

**Possible Refinement:** явно различать:

```
justified by current planning;
already confirmed by source/context.
```

**Current Conclusion:** **keep**.

---

# Group D — Spine Scenario → Scenario Draft

## IDEA-D1 — Spine Scenario — временный ранний способ начать Scenario planning

**Source / Status:** user-stated; current direction.

**Problem / Need:** правильные reusable Scenario boundaries часто неизвестны в начале.

**Proposed Answer:** при необходимости начинать с concrete representative Spine Scenario и постепенно его углублять.

```
Spine Scenario
→ deeper understanding
→ split / merge
→ Scenario Drafts
```

**Necessity / Better-Route:** если Scenarios уже очевидны, Spine stage не нужен.

**Possible Refinement:** после decomposition сохранять только provenance/navigation, если отдельный Spine больше ничего не добавляет.

**Current Conclusion:** **keep as optional temporary scaffold**.

---

## IDEA-D2 — Permanent canonical Spine Unit сейчас не нужен

**Source / Status:** current direction.

**Problem / Need:**

```
Spine Unit
→ Scenario
→ Behavior Item
```

создаёт дополнительный semantic layer и может пересечься с существующей ролью Behavior Items.

**Proposed Answer:** использовать provisional sections / temporary IDs внутри Spine без permanent entity type.

**Necessity / Better-Route:** temporary addressability можно получить без новой ontology.

**Current Conclusion:** **do not introduce canonical Spine Unit unless unique responsibility later emerges**.

---

## IDEA-D3 — Scenario должен начинаться с Motivational Trigger / Need

**Source / Status:** user-stated; current direction.

**Problem / Need:** текущая формула Scenario недостаточно показывает, почему Actor вообще начал действовать.

**Proposed Answer:** явно рассматривать:

```
Actor
Starting Context / Situation
Motivational Trigger
Need / Motivation
Goal / Intent
Observable Result
```

Successful Observable Result удовлетворяет relevant Need.

**Risk:** `Trigger`, `Need` и `Goal` в простых Scenarios могут сильно пересекаться.

**Possible Refinement:** сохранять semantic distinction, но разрешить compact physical representation в общем `Motivation / Starting Situation` block.

**Current Conclusion:** **keep; exact representation remains to refine**.

---

## IDEA-D4 — Scenario содержит один `Actor Understanding / Plan` block

**Source / Status:** accepted after dedicated review.

**Problem / Need:** Goal не показывает, понимает ли Actor desired result и путь к нему.

**Proposed Answer:** один proportional block с analytical sub-surfaces:

```text
Initial Understanding
Goal Understanding
Action / Path Understanding
Important Unknowns
Required Understanding
Current Plan / Expectation — when material
```

**Necessity / Better-Route:** separate top-level Goal/Path/Plan sections heavier without enough benefit.

**Current Conclusion:** **one combined block; distinct analytical meanings inside it**.

## IDEA-D5 — Scenario boundary uses Need + meaningful result

**Source / Status:** accepted after dedicated review.

**Problem / Need:** `one Need = one Scenario` can over-split, while Scenario still needs a meaningful motivational boundary.

**Proposed Answer:** primary boundary test:

```text
meaningful user Need
+
meaningful Observable Result
```

Supporting signals for ambiguous cases:

```text
independent occurrence/result;
meaningful re-entry;
reuse from several larger paths;
independent recurrence;
wait / interruption / handoff;
independent acceptance/testing value.
```

They are lenses, not a mandatory checklist.

**Current Conclusion:** **Need + meaningful result as primary boundary; independence signals only for ambiguous cases**.

## IDEA-D6 — Existing Scenario Draft остаётся canonical; changes are targeted

**Source / Status:** accepted clarification.

**Problem / Need:** новые planning meanings нужны без создания параллельного Scenario format.

**Proposed Answer:** меняются две вещи:

```text
1. how we arrive at Scenario Draft:
   Application responsibility → optional Spine → Scenario discovery → Scenario Draft;

2. targeted parts of the existing Scenario Draft:
   + Motivation / Starting Situation
   + Actor Understanding / Plan
   + richer proportional Main Flow
   + optional cross-cutting presentation/visual meaning.
```

Existing Entry Points, Preconditions, Flow, Branches, Invariants, Outcomes, Acceptance, Scenario DATA, Behavior Items and Open Questions stay preserved.

**Current Conclusion:** **keep canonical Scenario Draft; targeted evolution only**.

## IDEA-D7 — Main Flow поддерживает application / understanding / visual detail

**Source / Status:** current direction.

**Problem / Need:** одних observable steps недостаточно для некоторых application Scenarios.

**Proposed Answer:** material flow point может пропорционально содержать:

```
Observable Behavior
Surface / Window
Relevant DATA / Information
Actor Understanding
Desired User Response
System Response / State Change
Presentation Requirement
Visual Requirement
Result / Transition
```

**Risk:** раскрытие всех surfaces для каждого шага сделает Scenario чрезмерно тяжёлым.

**Possible Refinement:** Main Flow остаётся простым ordered behavioral flow, а дополнительные details появляются только where material.

**Current Conclusion:** **keep proportionally**.

---

## IDEA-D8 — Scenario-wide Experience / Presentation / Visual requirements

**Source / Status:** user-stated.

**Problem / Need:** некоторые UX/visual requirements относятся к нескольким steps или всему Scenario.

**Proposed Answer:** иметь доступное scenario-wide место для:

```
Desired User Response / Experience
Presentation Requirements
Visual Requirements
Attention / Salience
Feedback / State Communication
Cross-Surface Continuity
```

**Necessity / Better-Route:** отдельный content block не нужен, если meaningful cross-step requirement отсутствует.

**Current Conclusion:** **keep as available surface**.

---

# Group E — Application-level complementary views

## IDEA-E1 — Window / Surface Map is explicit opt-in

**Source / Status:** accepted clarification.

**Problem / Need:** cross-scenario application-space/navigation view can be useful, but not every application benefits from maintaining it.

**Proposed Answer:** create/maintain the Map only when:

```text
it is materially useful for the specific application
+
there is an explicit planning decision to use it.
```

**Current Conclusion:** **explicit opt-in per application**.

## IDEA-E2 — Application Core Loops

**Source / Status:** user-stated; current direction.

**Problem / Need:** отдельные Scenarios не показывают recurring high-value sequences.

**Proposed Answer:** выделять Core Loops там, где реально существует повторяемая sequence, через которую пользователь получает primary recurring value.

**Necessity / Better-Route:** отдельный Core Loop view может быть избыточным, если достаточно пометить frequent Scenario chain.

**Possible Refinement:** canonical loop meaning должен быть behavioral/value-based; sequence of windows является лишь его current UI manifestation.

**Current Conclusion:** **keep proportionally**.

---

# Group F — File Update planning

## IDEA-F1 — File Update workflow explicitly distinguishes conceptual and mechanical updates

**Source / Status:** accepted direction.

**Problem / Need:** mechanical updates should not trigger synthetic Idea analysis; conceptual choices must be reviewed before concrete file actions.

**Proposed Answer:** if material conceptual question/alternative/conflict exists → use shared Idea review/planning. If update is mechanical consequence of selected meaning → go directly to Update Steps.

**Current Conclusion:** **keep as canonical workflow rule**.

## IDEA-F2 — Conceptual uncertainty uses Idea Variants, not file-edit variants

**Source / Status:** accepted direction.

**Problem / Need:** file-edit variants duplicate semantic alternatives at the wrong layer.

**Proposed Answer:**

```text
Idea
→ Idea Variants
→ Current Selected Variant
→ Current Conclusion
→ one concrete current file-update path.
```

Use `fallback` only when something is genuinely a fallback.

**Current Conclusion:** **keep**.

## IDEA-F3 — Unresolved Idea Variant remains visible while file plan follows selected meaning

**Source / Status:** accepted direction.

**Problem / Need:** unresolved alternative should neither silently replace current meaning nor produce speculative alternate edit plans.

**Proposed Answer:** unresolved alternative goes to `Questions / Risks / Problems` with Related Idea IDs; concrete Update Steps follow `Current Selected Variant`.

**Current Conclusion:** **keep**.

# Existing Reality / Must Preserve

Следующие пункты не являются новыми Ideas.

## P-01 — Behavior Item остаётся low-level required-behavior unit Scenario

Новый Spine flow не должен создавать competing permanent behavioral unit.

## P-02 — Behavior Items имеют downstream значение

Сохраняется смысловая цепочка:

```
Scenario
→ Scenario DATA / Behavior Items
→ Domain planning
→ Features / Implementation Slices
```

## P-03 — Scenario DATA остаётся scenario-relevant behavioral DATA

Не превращать его автоматически в Domain/API/database/component schema.

## P-04 — Existing Scenario Draft behavioral core сохраняется

Motivation, Understanding, Surface и Visual meaning расширяют существующий Scenario Draft, а не вытесняют его existing behavioral contents.

---

# Current Overall Conclusions

```text
ONE IDEA CONCEPT
  Standard Idea Review
  Deep Idea Planning

For every Idea:
  baseline meaning;
  mandatory Necessity / Refinement / Local / Integrated checks;
  conditional output;
  no invented criticism/refinements.

Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ solution alternatives / Workflow Variants
→ justified/already-confirmed Application responsibility
→ optional Spine Scenario
→ Scenario Drafts
→ Scenario DATA / Behavior Items
→ optional Domain
→ optional Implementation Slices.
```

`Window / Surface Map` is explicit opt-in for a specific application that benefits from it. `Core Loop` is optional.

Planning Item is removed from target methodology; historical ITEM-* records may remain provenance/history/migration sources.

For `собери идеи`, `план файл-обновление` and ReviewDiff semantic review, aggregate units are delta to the established Current Plan: each real unit states Current Plan and its unresolved/adverse relation or candidate change; accepted/resolved conclusions are not repeated there.

For File Update planning:

```text
conceptual uncertainty
→ Idea Variants
→ Current Selected Variant
→ concrete Update Steps
```

Unresolved alternatives remain visible in Questions / Risks / Problems rather than becoming alternate file-edit plans.

# Questions / Risks / Problems

### [R-IDEA-A2-A4] — Mandatory checks can still tempt synthetic review theater

**Related Idea(s):** `IDEA-A2`, `IDEA-A3`, `IDEA-A4`

**Current Plan:** perform every mandatory Idea check, but print only supported material findings.

**Finding:** a chat may still invent objections/refinements merely because the analytical surfaces exist.

**Relation / Impact On Current Plan:** this is a residual quality risk of the selected mandatory-check design; synthetic findings would corrupt review output.

**Needed Resolution / Treatment:** keep `required check ≠ required populated field` explicit and reject unsupported findings during review.

**Blocking:** no.

---

### [R-IDEA-A5-A10] — Aggregate propagation can drift into duplicated reasoning

**Related Idea(s):** `IDEA-A5`, `IDEA-A10`

**Current Plan:** detailed reasoning remains local; aggregate units contain only concise material delta plus Related Idea IDs and Current Plan relation.

**Finding:** repeated local reasoning can still be copied into aggregate sections and create a second unsynchronized explanation.

**Relation / Impact On Current Plan:** duplication would weaken the selected single-reasoning-owner boundary and make aggregate sections harder to interpret.

**Needed Resolution / Treatment:** keep aggregate units concise and route the reader back to originating Ideas for detail.

**Blocking:** no.

---

### [R-IDEA-F2-F3] — Unresolved alternatives can leak into concrete file actions

**Related Idea(s):** `IDEA-F2`, `IDEA-F3`

**Current Plan:** one `Current Selected Variant` / Current Plan drives one concrete file-update path; unresolved variants remain aggregate delta only.

**Finding:** an unresolved refinement/variant may still be copied into Update Steps as if selected.

**Relation / Impact On Current Plan:** leakage would make the concrete file plan contradict its own selected baseline.

**Needed Resolution / Treatment:** require concrete Update Steps to trace only to Current Conclusions / Current Selected Variant and keep unresolved alternatives out of file actions.

**Blocking:** no.

---

### [Q-IDEA-E2] — Independent value threshold for a separate Core Loop view remains contextual

**Related Idea(s):** `IDEA-E2`

**Current Plan:** Core Loop is optional and used only when a recurring high-value sequence materially adds more than Scenario-chain notation.

**Finding:** the exact threshold depends on the application and cannot be made universal from the reviewed source alone.

**Relation / Impact On Current Plan:** this does not change the current optional rule, but a concrete application still needs contextual judgment before creating a separate Core Loop view.

**Needed Resolution / Treatment:** decide at application scope from current Scenarios/value flow; preserve no separate Core Loop by default when independent value is not demonstrated.

**Blocking:** no.

