# Module — RDG — примеры и их интерпретация

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "rdg.work.examples",
  "title": "RDG — примеры и их интерпретация",
  "text": "# RDG — проверенные примеры и способы их использования\n\nИсточники примеров хранятся в Fortis Repo, отдельно от рабочих graph.json. **Индекс и карта покрытия**:\n`/workspace/repos/rd-graphs/docs/references/EXAMPLE-COVERAGE.md`.\n**Исходный предоставленный пользователем документ**, сохранённый дословно:\n`/workspace/repos/rd-graphs/docs/references/requirements-decisions-graph-examples-v0.2.source.md`\n(оригинальное имя: `requirements-decisions-graph-examples-v0.1(2).md`, содержимое версии 0.2).\n\nВ каталоге браузерного R–D Viewer доступны три учебные проекции, не предназначенные для записи:\n- `graphs/reference-app-definition/graph.json` — App Definition: семь соседних R, потребности Scenario и Feature, контекст и Realization Requirements (§1–2).\n- `graphs/reference-delegation-status/graph.json` — делегация одного R-ID, внутренний ответ, функциональная потребность, QRPE и граница достаточности (§3).\n- `graphs/reference-behavior-review/graph.json` — конкретный выбор против reusable variant, общий vs локальный scope, кандидаты, изменение контекста и условная история (§4–5).\n\nЧитай **релевантный фрагмент** примеров при обсуждении сложного структурного вопроса или когда пользователь просит показать, как работает граф. Не копируй эти `EX-*` IDs и условные Decisions в новый рабочий проект и не навязывай структуру App Definition любой цели. Исходник не выбирает обязательный набор типов графового хранилища или контракт каждого Target Module. Для спорных моментов приоритет за его текстом, не за упрощённой JSON-проекцией.\n\nReference-графы содержат **иллюстративные** связи и события, которые Viewer умеет отображать, но текущий `graph-apply.py` **не** умеет записывать: `INFORMS`, `IDENTIFIES`, `REVEALS_NEED`, `QRPE_FOR`, `USES_VARIANT`, `RECONSIDERS`, `context_changed`, `candidates_prepared`. Не обещай эти операции без уточнения физического формата и расширения updater. Контекст и содержимое другого решения могут выступать драйверами — не превращай любой драйвер в Requirement.\n\n`graphs/example/graph.json` — минимальный smoke-пример (9 узлов), НЕ полный корпус. `graphs/try-it/graph.json` — отдельный тестовый рабочий граф, где пользователь сам принимает решения; reference-примеры не являются её начальным содержимым.\n\nДля просмотра: кнопка «Граф R–D» → каталог → нужная карточка. Для полноценного чтения основания/ограничений открой индекс или исходный Markdown; не делай выводы о выполнении приложения по иллюстративной схеме.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-12T16:30:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
