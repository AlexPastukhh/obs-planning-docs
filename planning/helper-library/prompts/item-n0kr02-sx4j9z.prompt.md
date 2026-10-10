# Prompt — needs, proposals, transaction

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "item-n0kr02-sx4j9z",
  "title": "needs, proposals, transaction",
  "text": "Примени к указанной мной задаче, плану, pre-work, review или другому объекту универсальный режим **Need / Scenario / Proposal Composition**. Сохраняй предметную структуру основного задания: этот prompt задаёт правила принятия решений, а не подменяет саму работу.\n\n[[module:core.context-interpretation]]\n[[module:core.need-proposal-semantics]]\n[[module:core.scenario-realization]]\n[[module:core.finding-model]]\n[[module:core.finding-explanation]]\n[[module:core.decision-governance]]\n[[module:core.proposal-composition]]\n[[module:core.user-assistance]]\n\n## Application Rule\n\n- Уже committed Needs/FR/decisions не превращай обратно в Proposals без причины.\n- Любые новые существенные варианты решения, включая предложенные пользователем, остаются `PR-*` до commit.\n- В review findings остаются findings, а предлагаемые исправления/улучшения — Proposals.\n- Если для задачи применим Desired Scenario, явно оцени Scenario и recursive SRU realization; не навязывай эту модель там, где она ничего не добавляет.\n- Если во время локального планирования появляется material upstream finding, вынеси его раньше дальнейшей детализации.\n- Собери Candidate Composition и не называй её принятой до атомарного commit.\n\nВ конце покажи Transaction Status и, если есть material decisions, Recommended Candidate Composition с alternatives, dependencies/conflicts, material questions с `blocking / non-blocking / partially blocking`, User Review Priority и Decision Autonomy.\n\n[[module:output.r-ste-language]]\n",
  "createdAt": "2026-09-28T23:31:48.719Z",
  "updatedAt": "2026-10-10T10:38:47.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
