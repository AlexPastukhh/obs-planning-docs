# Module — Review Log / Persistence

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "review.log-persistence",
  "title": "Review Log / Persistence",
  "text": "## Review Log / Persistence\n\n**Review Log — краткий раздел результата, а не автоматически отдельный файл или новое рабочее состояние.** Если текущая команда требует Log, помести его в конец полного review Markdown; при наличии большой читаемой копии она публикуется по правилам `output.situational-github-artifacts`. Не создавай дополнительно отдельный `review-log.md`, PRS или запись в project owner только ради существования Log. Отдельное долговременное рабочее сохранение — лишь если есть явная задача/согласованный owner и соответствующие полномочия.\n\nЕсли применимый prompt требует Review Log, в конце сформируй компактную запись, пригодную для следующей работы. Она должна содержать по применимости:\n- target/scope и проверенную версию;\n- краткий итог;\n- canonical findings `F-P/F-R/F-U/F-O` и их disposition/impact;\n- Upstream findings с повышенным User Review Priority;\n- Evidence Gaps / Review Limitations;\n- актуальный User Assistance;\n- deferred findings с revisit triggers;\n- существенные Proposals/Proposal Groups, их User Review Priority и Decision Autonomy;\n- material questions/Decision Uncertainties с `blocking / non-blocking / partially blocking` и affected scope;\n- Recommended Remediation Candidate Composition, если несколько связанных remediation/improvement Proposals нужно рассматривать именно как композицию;\n- для review с baseline — статусы Work Requirements/Error Axes и material changes.\n\nОтличай **представленный в отчёте Review Log** от его **фактически записанной копии**. Считай опубликованный Review Log сохранённым для чтения лишь после подтверждённой записи полного Markdown и проверки обратным чтением; это **не означает** актуализацию рабочего owner или принятие Proposal. Если записать/подтвердить нельзя, не утверждай, что он опубликован: оставь Log в полном результате и укажи ограничение.\n\nПри подтверждаемой записи сохраняй предыдущую историю, а не затирай её молча.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-09T03:00:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
