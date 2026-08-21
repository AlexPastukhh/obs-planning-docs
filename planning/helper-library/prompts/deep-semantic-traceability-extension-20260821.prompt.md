# Prompt — Deep semantic traceability extension

Status: active Planning Helper library item
Scope: exact insertion text; not semantic authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "deep-semantic-traceability-extension-20260821",
  "title": "Deep semantic traceability extension",
  "text": "Продолжи уже выполненный bootstrap более глубоким semantic/implementation verification. Не считай предыдущий ответ источником истины: используй current repository/snapshot и уже найденный authority route, перечитывая owners там, где контекст не доказан.\n\nСначала определи применимый semantic-entry type для целевого Direction: Workspace/methodology → Use Case; Application → Scenario. Не создавай параллельный Application-UC слой.\n\nДля КАЖДОГО current semantic entry в выбранном scope установи: stable ID/name; trigger/Need; useful/observable result; boundaries; material relations/handoffs; canonical semantic owner; primary realization/implementation owners; automated verification evidence; manual acceptance/evidence when applicable. Не копируй registry механически — дай краткое понимание того, что entry реально означает и как его реализующая цепочка устроена.\n\nЗатем покажи: (1) semantic-entry graph / основные end-to-end flows; (2) Files Checked с exact path + FULL/DEEP/TARGETED/ROUTING ONLY + зачем файл читался; (3) реальные contradictions/stale routes/ambiguous ownership/missing required owners; (4) Questions / Risks / Problems только если они действительно найдены; (5) Not Read / Not Verified; (6) confidence: checked fact vs inference.\n\nЕсли material problems не найдены — так и скажи, не производи objections ради заполнения секций. Не редактируй repository, не создавай archive и не расширяй permissions. Current semantic owners всегда сильнее этого prompt.",
  "createdAt": "2026-08-21T12:35:00.000Z",
  "updatedAt": "2026-08-21T12:35:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
