# Module — Review Log / Persistence

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "review.log-persistence",
  "title": "Review Log / Persistence",
  "text": "## Review Log / Persistence\n\n**Review Log — краткий раздел результата, а не автоматически отдельный файл или новое рабочее состояние.** Если текущая команда требует Log, помести его в конец полного review Markdown; при наличии большой читаемой копии она публикуется по правилам `output.situational-github-artifacts`. Не создавай дополнительно отдельный `review-log.md`, PRS или запись в project owner только ради существования Log. Отдельное долговременное рабочее сохранение — лишь если есть явная задача/согласованный owner и соответствующие полномочия.\n\nЕсли применимый prompt требует Review Log, в конце дай **краткий индекс уже существующих canonical записей**, не вторую копию состояния: target/scope/version, итог, ID существенных Findings/PR/PG, проверенные факты/доказательства, unresolved decisions, upstream, blockers, Evidence Gaps, deferred с revisit trigger и, если применимы, статусы WR/EA. Для связанных PR достаточно указателя на Candidate Composition и маршрут **с версией/основаниями**; не копируй все этапы и таблицы заново.\n\nIntervention Priority, User Review Priority, `CURRENT/UPSTREAM` и следующий шаг в полном отчёте — оценки на дату/относительно scope, а не поля, требующие синхронизации между Log, Overview и историческими копиями. При следующей работе перечитай первоисточник и пересчитай изменчивые выводы. Сохраняй фактический статус committed PR и подтверждения исполнения отдельно.\n\nОтличай **представленный в отчёте Review Log** от его **фактически записанной копии**. Считай опубликованный Review Log сохранённым для чтения лишь после подтверждённой записи полного Markdown и проверки обратным чтением; это **не означает** актуализацию рабочего owner или принятие Proposal. Если записать/подтвердить нельзя, не утверждай, что он опубликован: оставь Log в полном результате и укажи ограничение.\n\nПри подтверждаемой записи сохраняй предыдущую историю, а не затирай её молча.\n**Оси проверки:** если review материально сложное, кратко сохрани в рамках основного отчёта проверенные направления и существенные непроверенные оси/ограничения с ссылками на evidence/Findings. Не веди второй постоянный `Axis Status Log` или отдельный файл осей: это snapshot покрытия конкретной проверки.\n",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-11T07:03:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
