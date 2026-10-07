# Module — Review Canonical Records / Disposition

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "review.record-semantics",
  "title": "Review Canonical Records / Disposition",
  "text": "## Review Record Semantics\n\nДля достаточно сложного review используй стабильные локальные IDs и одну каноническую запись на сущность:\n- `F-P-*` — Problems;\n- `F-R-*` — Risks;\n- `F-U-*` — Decision Uncertainties;\n- `F-O-*` — Improvement Opportunities;\n- `PR-*` — Proposals;\n- `PG-*` — Proposal Groups;\n- `UA-*` — User Assistance;\n- при необходимости отдельные IDs для Evidence Gaps / Review Limitations.\n\nQuestions являются атрибутами соответствующего finding/Proposal, а не отдельной верхнеуровневой taxonomy. Если один предмет фигурирует в нескольких разделах, создай одну canonical record и используй cross-reference; Review Log может компактно повторять ID/status/смысл.\n\nДля finding фиксируй, где существенно: Type, semantic target, CURRENT/UPSTREAM, impact, disposition, User Review Priority, связанные questions/proposals, evidence и limitations.\n\nДля material question/Decision Uncertainty сохраняй `blocking / non-blocking / partially blocking`; при частичной блокировке указывай affected scope/downstream work.\n\n`Deferred` храни как disposition существующей finding/record с причиной и revisit trigger, а не как самостоятельную природу находки. Не демотируй реальную текущую Problem в deferred ради удобства завершения.\n\n### Review-of-review identity\n\nЕсли объектом проверки является **другое review**, сохраняй IDs исходного review неизменными как source references. Не перенумеровывай их и не используй тот же локальный ID для новой находки meta-review.\n\nДля новых собственных сущностей meta-review используй отдельный namespace, например:\n- `MR-F-P-* / MR-F-R-* / MR-F-U-* / MR-F-O-*` — новые findings meta-review;\n- `MR-PR-*` — Proposals, сформированные самим meta-review;\n- `MR-UA-*` — новый User Assistance meta-review, если нужен.\n\nТак должно быть видно, что относится к проверяемому review, а что обнаружено уже при его перепроверке.\n\nНе вводи IDs и cross-references ради формальности в тривиальном review.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
