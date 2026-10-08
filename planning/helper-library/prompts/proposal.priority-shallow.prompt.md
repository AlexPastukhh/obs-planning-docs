# Prompt — приоритет пропозалов

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "proposal.priority-shallow",
  "title": "приоритет пропозалов",
  "text": "Оцени **только** приоритет пользовательского рассмотрения и допустимость самостоятельного решения для указанных или однозначно определяемых из контекста Proposals.\n\nНе запускай полный review, не перепланируй весь объект и не ищи новые findings без необходимости для этой узкой оценки.\n\n[[module:core.context-interpretation]]\n[[module:core.need-proposal-semantics]]\n[[module:core.decision-governance]]\n\nДля каждого material Proposal выведи:\n- Proposal ID / краткое название;\n- `User Review Priority: LOW / NORMAL / HIGH / CRITICAL`;\n- почему этот уровень внимания уместен;\n- `Decision Autonomy: HIGH / MEDIUM / LOW / USER_REQUIRED`;\n- почему ИИ может или не может принять решение самостоятельно;\n- какие факторы дают основной вес: upstreamness, Need/FR, Scenario/outcome, scope, time/effort/cost, maintainability/accumulated complexity, reversibility, staged/validation-first option value, downstream consequences;\n- если Priority и Autonomy расходятся — явно объясни почему.\n\nВ конце отсортируй Proposals по тому, насколько важно пользователю рассмотреть их раньше остальных. Не commit никакой Proposal и не подменяй оценку приоритета полноценным выбором решения.\n\n[[module:output.file-link-filename]]",
  "createdAt": "2026-10-07T20:00:00.000Z",
  "updatedAt": "2026-10-09T00:01:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
