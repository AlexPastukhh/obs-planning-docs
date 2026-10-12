# Prompt — RDG — Зафиксировать принятое решение

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "rdg.work.commit",
  "title": "RDG — Зафиксировать принятое решение",
  "text": "# COMMIT — сохранить явно принятое решение и его реальные последствия\n\n[[module:rdg.work.semantics]]\n[[module:rdg.work.planning]]\n[[module:rdg.work.storage]]\n[[module:rdg.work.repository]]\n[[module:rdg.work.rste]]\n[[module:rdg.work.value]]\n[[module:rdg.work.output]]\n\nОпредели, какой **конкретно** D и состав связанных R пользователь уже явно принял. Если доступны только варианты без выбора, не придумывай решение и задай один уточняющий вопрос. Проверь актуальные graph.json, revision, ID, существующие драйверы и аналоги — никаких дублей.\n\nДля принятого нового D: создай node kind=decision, status=committed; DRIVES от исходной R к D; INTRODUCES от D к выбранным под-R с parent исходной R (если разбиение нужно). Добавь ровно одно значимое decision_selected event (type, decisionId, by=user, note суть выбора, уникальный id); не добавляй событие, если новое решение не принималось. Для уточнения уже существующих R/D используй update_node только когда действительно меняется смысл; не меняй id/kind.\n\nВ папке соответствующего графа подготовь минимальный patch JSON с expectedRevision=фактически прочитанной revision и перечисленными операциями. Сначала `graph-apply.py --dry-run`, затем apply без флага, после — фактический read-back revision и всех существенных связей. При отклонённом/конфликтном patch перечитай состояние; не заявляй, что запись сделана, и не обходи validator. Если правка требует удаления/замены связей и текущий updater не поддерживает этого, честно остановись на proposed change вместо небезопасной ручной записи.\n\nОтвет: изменённые ID/связи, revision до→после, статус проверки и следующий разумный шаг. Не повторяй в ответе весь JSON без запроса.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-12T16:30:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
