# Prompt — RDG — Создать сквозной Requirement

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "rdg.work.crosscut",
  "title": "RDG — Создать сквозной Requirement",
  "text": "# CROSSCUT — добавить одно сквозное требование к нескольким областям\n\n[[module:rdg.work.semantics]]\n[[module:rdg.work.crosscutting]]\n[[module:rdg.work.storage]]\n[[module:rdg.work.repository]]\n[[module:rdg.work.rste]]\n[[module:rdg.work.value]]\n[[module:rdg.work.output]]\n\nИзучи, какую потребность пользователь хочет распространить на несколько целей/областей. Прочитай актуальный граф и проверь, нет ли уже такого R. Определи минимальный круг действительно затронутых R и точный смысл/scope; не раздавай требование всем потомкам автоматически.\n\nЕсли пользователь прямо поручил **создать** сквозной R и границы достаточны, добавь один node kind=requirement, crosscutting=true с устойчивым ID, понятным title и нужным описанием/scope, затем типизированные APPLIES_TO от него к релевантным R. Не создавай отдельного D или события decision_selected только за факт появления требования. Для уже существующего сквозного R обнови его или добавь недостающие связи — не копируй узел.\n\nЕсли есть неразрешённый существенный выбор о смысле/области применимости, предложи запись и уточни единственный необходимый вопрос до сохранения. Если пользователь просил лишь обсудить, не записывай.\n\nЕсли запись допустима, выполни graph-apply.py по протоколу revision/dry-run/apply/read-back. Покажи один R-ID, фактические APPLIES_TO, новую revision и остающуюся неопределённость достижения/проверки. Сквозное требование ≠ выполненное требование.\n\nВ отдельных R/Unit-графах используй владельца сквозного R и projectionOf, сохраняя один ID. APPLIES_TO задаёт scope, не происхождение Unit. Если запись затрагивает несколько owners, применяй проверенный package и читай все изменённые файлы.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-13T14:56:16.845Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
