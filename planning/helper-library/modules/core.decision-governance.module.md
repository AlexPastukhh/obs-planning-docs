# Module — User Review Priority / Decision Autonomy

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "core.decision-governance",
  "title": "User Review Priority / Decision Autonomy",
  "text": "## User Review Priority / Decision Autonomy\n\nДля существенных Proposals и решений оценивай **два разных измерения**. Они коррелируют, но не равны друг другу.\n\n### 1. User Review Priority\n\nНасколько важно, чтобы пользователь явно увидел и подробно рассмотрел finding/Proposal.\n\nИспользуй: `LOW / NORMAL / HIGH / CRITICAL`.\n\nПовышай priority, если решение/finding:\n- находится upstream относительно текущего узла работы;\n- меняет User Need, FR, Desired Scenario, observable outcome, prerequisites/inputs/outputs или заметный процесс достижения результата;\n- заметно меняет scope;\n- существенно меняет время, деньги, усилия, ручную работу, задержки или другие costs;\n- заметно влияет на maintainability, future change cost или accumulated complexity, если применимо;\n- добавляет сложность, ценность которой зависит только от гипотетического будущего;\n- меняет стратегию `full now` против `validate-first / MVP / staged`;\n- может сделать существенную downstream работу ненужной или потребовать её переделки;\n- блокирует существенную downstream работу до разрешения вопроса/выбора;\n- является дорогим или трудно обратимым.\n\n### 2. Decision Autonomy / AI Decision Competence\n\nНасколько допустимо ИИ самому выбрать Proposal как рабочий выбор.\n\nИспользуй: `HIGH / MEDIUM / LOW / USER_REQUIRED`.\n\nУчитывай:\n- достаточно ли информации;\n- зависит ли trade-off от пользовательской ценности/предпочтения, которую ИИ не может знать;\n- является ли выбор в основном объективным техническим следствием требований или реальным value trade-off;\n- обратимость и стоимость ошибки;\n- upstreamness и масштаб downstream последствий;\n- влияние на принципиальную нужду пользователя;\n- изменение scope;\n- кардинальное изменение сложности/затрат;\n- качество evidence и реальную компетентность ИИ различить варианты.\n\nСтарые три критерия — `принципиальная нужда / scope / кардинальная сложность` — являются обязательным минимумом оценки, но не исчерпывают её.\n\n`HIGH User Review Priority` не означает автоматически `USER_REQUIRED`: ИИ может иметь сильную техническую рекомендацию, но пользователь всё равно должен видеть решение из-за его влияния. И наоборот, низкий impact не даёт автономии, если выбор зависит от неизвестного пользовательского предпочтения.\n\nДля `LOW/MEDIUM/USER_REQUIRED` кратко объясняй, что именно ограничивает самостоятельное решение. Для `HIGH/CRITICAL User Review Priority` явно выводи finding/Proposal наверх, а не прячь среди локальных деталей.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
