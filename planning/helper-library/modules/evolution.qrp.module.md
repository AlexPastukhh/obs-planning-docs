# Module — QRP Evolution Semantics

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "evolution.qrp",
  "title": "QRP Evolution Semantics",
  "text": "## QRP Evolution Semantics\n\nQRP — накопленное знание о жизнеспособности конкретного Proposal, Proposal Group или всей Composition. **QRP является представлением/индексом вокруг canonical Findings, а не второй truth-system.**\n\nРазличай уровни:\n- Proposal QRP;\n- Proposal Group QRP;\n- Composition QRP.\n\nИспользуй:\n- `QRP-Q-*` — вопрос/decision fork, относящийся к Proposal/Group/Composition;\n- `QRP-R-*` — риск этого Proposal/Group/Composition;\n- `QRP-P-*` — подтверждённая проблема этого Proposal/Group/Composition.\n\n### Canonical source of truth\n\nДля **каждого material QRP item** обязателен canonical Finding:\n- material `QRP-Q-*` с реальной развилкой → `F-U-*`;\n- material `QRP-R-*` → `F-R-*`;\n- material `QRP-P-*` → `F-P-*`.\n\nQRP-запись хранит target-specific связь с Proposal/Group/Composition, version/review provenance и историю применимости, но не дублирует содержание/истину независимо от canonical Finding.\n\nОдин canonical Finding может иметь несколько QRP-links к разным Proposals/Groups/Compositions. Их локальная применимость может различаться, но они не должны противоречить canonical status/evidence Finding.\n\n`F-O-*` Improvement Opportunity может быть связана с Proposal/Group/Composition напрямую как related Finding; не выдумывай для неё искусственный Q/R/P тип.\n\nОтдельная QRP-only заметка допустима только как **малозначимое локальное bookkeeping**, которое не влияет на Candidate Composition, пользовательское решение, blocking status, Review Log или существенный risk/problem assessment. Как только пункт становится material, сначала создай/свяжи canonical Finding.\n\n### History\n\nДля истории сохраняй `introduced / open / resolved / mitigated / invalidated / superseded / still applicable / reopened`, связанную version/review и причину изменения статуса. Не стирай ошибочное старое замечание: помечай `invalidated`.\n\nСтатус canonical Finding является нормативным для смысла Q/R/P; QRP history отражает, когда и как этот Finding относился к конкретному Proposal target.\n\nПри новой версии заново проверяй QRP после изменения Proposal relations/composition: проблема может существовать только на уровне сочетания вариантов, даже если каждый Proposal отдельно приемлем.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
