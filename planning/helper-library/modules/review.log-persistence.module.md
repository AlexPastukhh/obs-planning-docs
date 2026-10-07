# Module — Review Log / Persistence

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "review.log-persistence",
  "title": "Review Log / Persistence",
  "text": "## Review Log / Persistence\n\nЕсли применимый prompt требует Review Log, в конце сформируй компактную запись, пригодную для следующей работы. Она должна содержать по применимости:\n- target/scope и проверенную версию;\n- краткий итог;\n- canonical findings `F-P/F-R/F-U/F-O` и их disposition/impact;\n- Upstream findings с повышенным User Review Priority;\n- Evidence Gaps / Review Limitations;\n- актуальный User Assistance;\n- deferred findings с revisit triggers;\n- существенные Proposals/Proposal Groups, их User Review Priority и Decision Autonomy;\n- material questions/Decision Uncertainties с `blocking / non-blocking / partially blocking` и affected scope;\n- Recommended Remediation Candidate Composition, если несколько связанных remediation/improvement Proposals нужно рассматривать именно как композицию;\n- для review с baseline — статусы Work Requirements/Error Axes и material changes.\n\nСчитай Review Log **сохранённым** только если фактически выполнена операция записи в доступное постоянное или рабочее хранилище и её успешность можно разумно подтвердить. Если записать/подтвердить нельзя, не утверждай, что он сохранён: выведи отдельный явно помеченный блок для последующего сохранения.\n\nПри подтверждаемой записи сохраняй предыдущую историю, а не затирай её молча.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
