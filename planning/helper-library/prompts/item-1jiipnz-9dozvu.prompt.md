# Prompt — логи

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "item-1jiipnz-9dozvu",
  "title": "логи",
  "text": "Проверь текущую систему parallel-work scope + action logging в репозитории github:AlexPastukhh/obs-planning-docs.\n\nНачни с:\n- planning/command-routing.md\n- planning/commands/start-parallel-work.command.md\n- parallel-work-scope-registry.md\n\nДальше не ограничивайся этим списком: следуй по owner/reference links из этих файлов и прочитай все связанные canonical owners, которые определяют:\n- scope boundaries и path ownership;\n- action-log semantics;\n- cross-scope routing;\n- replacement-package / ChangeSet integration;\n- post-apply logging;\n- operational apply/review/finalize state, если он вынесен в отдельное приложение или ledger.\n\nИспользуй authority chain самого репозитория, а не заранее предполагаемую архитектуру.\n\nПосле чтения объясни текущую систему:\n\n- какие registered scopes существуют и кто является authority их границ;\n- как определяется scope конкретного path;\n- как определяется affected scope set для одного work item / ChangeSet;\n- как выбирается canonical action log;\n- что происходит при cross-scope change и какие другие scope logs получают reference-only entries;\n- что обязан хранить canonical action log и какие типы записей/identity rules у него есть;\n- как один ChangeSet проходит через initial package, ReviewDiff correction и последующие packages;\n- как обеспечивается coherent post-apply log state;\n- как разделены repository action logs и operational ChangeSet/ApplicationAttempt/ReviewDiff/finalize state.\n\nОсобое внимание удели не только описанию intended model, но и audit текущих owners.\n\nОтдельно укажи:\n- противоречия между canonical owners;\n- дублирование одного правила в нескольких местах;\n- semantic drift между такими копиями;\n- неясные ownership/routing rules;\n- места, где правило существует только как текущая практика, но не закреплено owner-контрактом;\n- места, где два корректно читающих систему агента могут принять разные решения.\n\nЕсли видишь возможное нарушение правил в существующих action logs, называй его нарушением только если это можно доказать по доступному repository state. Иначе пометь как audit question.\n\nВ выводе явно разделяй:\n1. что прямо установлено canonical owners;\n2. что следует из совместного чтения нескольких owners;\n3. что остаётся неоднозначным, недоопределённым или противоречивым.\n\nВ конце дай короткую нормализованную схему:\n\npath\n→ owning scope\n\nwork item / ChangeSet\n→ affected scopes\n→ canonical log\n→ reference-only logs\n\npackage / correction\n→ cumulative log state\n→ Apply\n\nFinalize\n→ repository-log responsibility\nvs\n→ operational application/Git responsibility\n\nНичего не меняй в репозитории.\nНе создавай package/archive.\nТолько анализ текущей системы.",
  "createdAt": "2026-08-20T01:46:27.245Z",
  "updatedAt": "2026-08-20T01:54:27.826Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
