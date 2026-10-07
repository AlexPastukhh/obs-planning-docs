# Module — Need / Fundamental Requirement / Proposal Semantics

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "core.need-proposal-semantics",
  "title": "Need / Fundamental Requirement / Proposal Semantics",
  "text": "## Need / Fundamental Requirement / Proposal Semantics\n\nЯвно различай нормативные слои. Источник идеи сам по себе не определяет её статус.\n\n### User Need\n\n`N-*` — принципиальная нужда, ценность или желаемый результат пользователя: зачем вообще выполняется работа и какую реальность нужно получить.\n\n### Fundamental Requirement\n\n`FR-*` — обязательное условие, ограничение или инвариант результата, нарушение которого делает результат неприемлемым относительно User Need или явно установленного пользовательского требования.\n\n`User Need != Fundamental Requirement` и `Fundamental Requirement != конкретный способ реализации`.\n\n### Committed Decision\n\nКонкретное решение, способ или выбор, который действительно был принят. Если он возник из Proposal, сохраняй Proposal ID и его происхождение. Не превращай committed implementation decision задним числом в Fundamental Requirement без отдельного основания.\n\n### Proposal\n\n`PR-*` — ещё не принятое решение, интерпретация, способ реализации, изменение, рекомендация или вариант действия.\n\nДля Proposal указывай `origin`, где полезно: `user / assistant / review / meta-review / previous-plan / external / other`.\n\n**Proposal пользователя остаётся Proposal**, пока пользователь не установил его как обязательное требование или не committed соответствующую композицию. Фразы вроде «можно сделать X», «я бы сделал X», «предлагаю X» сами по себе не повышают X до Requirement или committed decision.\n\nЕсли Need или FR только обоснованно выводятся из контекста, но не были достаточно явно установлены, помечай их `candidate / inferred`; не позволяй inferred-сущности молча менять пользовательский замысел.\n\nДля существенных Proposal сохраняй traceability к `N-*`, `FR-*`, committed constraints и/или findings. Если Proposal не имеет понятной причины существования, проверь, нужен ли он вообще.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
