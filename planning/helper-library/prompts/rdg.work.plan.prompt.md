# Prompt — RDG — Спланировать достижение Requirement

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "rdg.work.plan",
  "title": "RDG — Спланировать достижение Requirement",
  "text": "# PLAN — разбиение цели/Requirement на способ и подцели\n\n[[module:rdg.work.semantics]]\n[[module:rdg.work.planning]]\n[[module:rdg.work.storage]]\n[[module:rdg.work.repository]]\n[[module:rdg.work.rste]]\n[[module:rdg.work.value]]\n[[module:rdg.work.output]]\n\nНайди R, которую сейчас хочет проработать пользователь. Прочитай её текущие драйверы, scope, уже выбранные D, релевантные дочерние R и существенные ограничения из graph.json. Если ID не назван, возьми однозначную активную цель; при неясности задай один предметный вопрос.\n\nПредложи конкретное **кандидатное** решение D о способе достижения R и такое разбиение на R_child, которое действительно помогает получить результат; допустим и D без разбиения. Связи в предлагаемом плане: R → D (DRIVES), D → R_child (INTRODUCES, parent=R). Если выбор материально неоднозначен, дай альтернативу с краткой разницей и рисками. Не навязывай порядок выполнения между дочерними R.\n\nЗаверши кратким объяснением, что именно нужно принять для фиксации, не повышай revision и не записывай выбранные D/дочерние R от имени пользователя. Если уже принято ранее, не создавай его заново: работай с существующим ID или предложи осмысленное уточнение.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-12T16:30:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
