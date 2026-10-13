# Prompt — RDG — Зафиксировать принятое решение

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "rdg.work.commit",
  "title": "RDG — Зафиксировать принятое решение",
  "text": "# COMMIT — сохранить явно принятое решение и его реальные последствия\n\n[[module:rdg.work.semantics]]\n[[module:rdg.work.planning]]\n[[module:rdg.work.storage]]\n[[module:rdg.work.repository]]\n[[module:rdg.work.rste]]\n[[module:rdg.work.value]]\n[[module:rdg.work.output]]\n\nОпредели, какой **конкретно** D и состав связанных R пользователь уже явно принял. Если доступны только варианты без выбора, не придумывай решение и задай один уточняющий вопрос. Проверь актуальные graph.json, revision, ID, существующие драйверы и аналоги — никаких дублей.\n\nДля принятого нового D: создай node kind=decision, status=committed; DRIVES от исходной R к D; INTRODUCES от D к выбранным под-R с parent исходной R (если разбиение нужно). Добавь ровно одно значимое decision_selected event (type, decisionId, by=user, note суть выбора, уникальный id); не добавляй событие, если новое решение не принималось. Для уточнения существующих R используй update_node без смены id/kind. У принятого D через update_node меняй только проверочные evidenceStatus/achievement/verification/openQuestion на основании доступных фактов. Изменение содержания, scope, оснований или статуса принятия выполняй отдельной revise_decision с новым ID и подтверждённой санкцией; update_node для этого отклоняется. Не обходи защиту и не выдавай предлагаемую ревизию за применённую.\n\nВ папке соответствующего графа подготовь минимальный patch JSON с expectedRevision=фактически прочитанной revision и перечисленными операциями. Сначала `graph-apply.py --dry-run`, затем apply без флага, после — фактический read-back revision и всех существенных связей. При отклонённом/конфликтном patch перечитай состояние; не заявляй, что запись сделана, и не обходи validator. Произвольное удаление связей по-прежнему не поддерживается; revise_decision архивирует только прежние связи пересматриваемого D. Неподдерживаемую правку оставь proposed change, не обходи validator.\n\nОтвет: изменённые ID/связи, revision до→после, статус проверки и следующий разумный шаг. Не повторяй в ответе весь JSON без запроса.\n\nДля создания/обновления связанных Unit-графов используй --package по storage. До записи проверь типизированный preparedModelRef, источник/версию, реальные driver/child bindings и revision каждого owner. Повтор использует тот же transactionId. После неопределённого результата сначала прочитай журнал/файлы; не создай второй пакет или событие наугад. Читай результат всех файлов и производный каталог. Unit-перенос без нового выбора не создаёт decision_selected.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-13T14:56:16.845Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
