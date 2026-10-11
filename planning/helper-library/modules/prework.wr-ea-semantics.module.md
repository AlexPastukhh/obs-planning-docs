# Module — Work Requirements / Error Axes Semantics

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "prework.wr-ea-semantics",
  "title": "Work Requirements / Error Axes Semantics",
  "text": "## Work Requirements / Error Axes Semantics\n\n### Work Requirements\n\n`WR-*` — проверяемые требования именно к рассматриваемой единице работы. Для каждого указывай формулировку, основание/provenance и verification criterion. Разделяй независимо нарушаемые части. Не превращай recommendation, Opportunity или собственный Proposal в обязательный WR.\n\nЕсли WR непосредственно следует из уже committed Need/FR/constraint, помечай это происхождение. Если WR зависит от ещё не committed Proposal, явно показывай зависимость и не выдавай его за безусловно принятое требование baseline.\n\n### Error Axes\n\n`EA-*` — заранее определённые правдоподобные механизмы, по которым работа может выглядеть выполненной, но не достичь цели или нарушить WR/FR/Scenario. Для каждой EA указывай механизм, связанную цель/WR/FR, условия проявления, наблюдаемое нежелательное следствие и verification method.\n\n`EA != подтверждённая Problem`. Error Axis — направление будущей проверки. Если конкретная EA одновременно описывает существенный Risk, можно связать её с `F-R-*`, но не дублируй одну истину двумя независимыми записями.\n\nВ candidate pre-work состояние WR/EA тоже является частью Candidate Composition до атомарного commit baseline, даже если некоторые WR derived from уже committed inputs.\n### Связь pre-work и Review Axes\n\nКандидатные `EA-*` готовят существенные проверки возможных сбоев результата. **Проверка результата впоследствии использует те же EA как исходные оси**, но не ограничивается ими: отдельно проверяются положительное выполнение WR/FR/Scenario, интеграция, ситуационные зависимости и применимые мета-оси качества действий ИИ. В pre-work заранее отметь известные существенные **дополнительные проверки** в Verification Plan, но не создавай отдельные обязательные долговременные `RA-*` records. При review оси могут быть дополнены на основании новой информации; различай baseline EA и новые review axes.\n",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-11T07:03:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
