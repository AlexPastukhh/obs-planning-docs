# Study Tab Launcher — самостоятельная копия документации

Дата снимка: **2026-09-24**. [Открыть документацию проекта](project/planning/documentation/README.md). Скопированы все 318 исходных файлов документации, включая pinned methodology; добавлены только связанные исходные Evidence-файлы и исторический source context, нужный для локальных ссылок. Это независимый учебный пакет внутри методологии. На момент исходного копирования документация/код приложения не менялись; последующая согласованная редакция документации описана ниже. Пакет остаётся независимым от живого workspace.

## Как читать

1. Открыть текущий Target Module в таблице и прочитать его contract.
2. Перейти в соответствующий скопированный файл: читать его как датированный результат с указанным статусом.
3. Использовать связи внутри копии для Feature→Scenario→Slice и current/future owner границы. Сопоставить форму результата с текущим contract; не переносить все исторические правила pinned snapshot в текущую работу.

| Current owner | Скопированный документ | Что показывает |
|---|---|---|
| [TM-APPLICATION-DEFINITION](../../target-modules/TM-APPLICATION-DEFINITION.md) | [application-definition.md](project/planning/documentation/application-definition.md) | Need/Benefits могут предшествовать realization; selected AB-STL-04 не превращает будущее поведение в current |
| [TM-FEATURE](../../target-modules/TM-FEATURE.md) | [features/open-local-project.md](project/planning/documentation/features/open-local-project.md) | Benefit slices и связь с Scenario/Slice |
| [TM-SCENARIO-PLANNING](../../target-modules/TM-SCENARIO-PLANNING.md) | [scenarios/open-selected-project.md](project/planning/documentation/scenarios/open-selected-project.md) | Сценарный путь, SPS/SR и результат |
| [TM-SCREEN](../../target-modules/TM-SCREEN.md) | [screens/chatgpt-launcher-widget.md](project/planning/documentation/screens/chatgpt-launcher-widget.md) | UI actions → Features / Scenarios |
| [TM-DOMAIN-OWNER](../../target-modules/TM-DOMAIN-OWNER.md) | [domain/local-project-selector.md](project/planning/documentation/domain/local-project-selector.md) | Доменные значения и инварианты |
| [TM-SLICE-OWNER](../../target-modules/TM-SLICE-OWNER.md) | [slices/open-local-project.md](project/planning/documentation/slices/open-local-project.md) | Текущая реализованная ответственность и связи |
| [TM-SHARED-IMPLEMENTATION-CAPABILITY](../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md) | [shared/prepared-project-handoff.md](project/planning/documentation/shared/prepared-project-handoff.md) | Shared owner и честный OPEN P-STL-HANDOFF-01 |
| [TM-EVOLUTION-STEP](../../target-modules/TM-EVOLUTION-STEP.md) | [evolution/unrealized/close-superseded-project-windows.md](project/planning/documentation/evolution/unrealized/close-superseded-project-windows.md) | Полные будущие Target Bodies вне bounded Impacts, отдельная readiness |
| [TM-EVOLUTION-STEPS-MAP](../../target-modules/TM-EVOLUTION-STEPS-MAP.md) | [evolution-steps.md](project/planning/documentation/evolution-steps.md) | Текущая/будущая/realized lineage навигация |
| [TM-PRACTICAL-TEST](../../target-modules/TM-PRACTICAL-TEST.md) | [practical-tests/installed-browser-vscode-handoff.md](project/planning/documentation/practical-tests/installed-browser-vscode-handoff.md) | План практического доказательства с OPEN, не выдуманный success |

## Status / authority boundary

- Нереализованный Step остаётся **unrealized**. Его полные будущие owners не заменяют текущие.
- [P-STL-HANDOFF-01](project/planning/documentation/shared/prepared-project-handoff.md#p-stl-handoff-01) остаётся OPEN: sample нестабилен. Копирование не закрывает Problem и не доказывает runtime success.
- [Installed practical test](project/planning/documentation/practical-tests/installed-browser-vscode-handoff.md) остаётся OPEN; исторические тестовые числа не являются новым прогоном.
- Снимок показывает документирование текущего результата, будущего изменения и незакрытых Evidence. Это не сертификат полной готовности приложения и не образец успешно завершённого Practical Test.
- TM-DOMAIN-DISCOVERY, TM-IMPLEMENTATION-SLICE и TM-PROTOTYPE не получили искусственных результатов: в исходной документации нет самостоятельных полных примеров именно этих Targets.

## Provenance / переносимость

[Snapshot manifest](snapshot-manifest.json) перечисляет source path, SHA256 исходных и скопированных байтов, количество замен навигационных ссылок. Все исходные файлы приложения доступны внутри `project/`; старый окружающий methodology context — в `source-context/`. Ссылки переадресованы только в копии. Generated directory indexes служат навигацией по выбранному контексту; это не полный bootstrap/runtime repository.

Вложенная pinned methodology основана на архиве `obs-planning-docs-main (100).zip`. Её собственный provenance описывает исходный снимок до упаковки, а внешний manifest — эту упаковку. Исторический счётчик 12 в старом MANIFEST не заменяет registry с 13 SDS modules. Не использовать вложенные registry для discovery текущей методологии.

В старом контексте оставлены три ссылочных placeholders `...` из шаблонов и отсутствующая историческая `legacy/direction-registry.md`; они перечислены в manifest как ограничения источника. Это не ссылки к приложению за пределами пакета. Рабочие ссылки из путеводителя и приложение→pinned owners проверяются отдельно.

[Core Review / Workup / Pre-Update examples](../../../../idtspe-core/examples/review-proposal-pre-update/README.md) показывают другие Target results. При обновлении примера используйте UC-DOC-MAINTAIN-EXAMPLE; живое приложение не становится его semantic owner.

В сохранённых discussion-history также остались 167 исторических URI вложений `sandbox:/mnt/data/`: это записи старой беседы, не локальные файлы пакета; они отдельно перечислены в manifest и не входят в проверенные owner reading routes.

## 2026-09-24 — Редакция Concept-first

По явному запросу пользователя Application Definition проекта и этой копии обновлены вместе: `RU-APP-05 Application Concept` стоит первым, отдельный дублирующий `RU-APP-01` снят. Stable ID Concept сохранён. Его Summary/How it roughly works дают короткую общую картину; Benefits и их границы остаются в `RU-APP-03`. Локальные TM/Lens bindings согласованы. Исходные capture hashes сохранены в manifest, а изменения четырёх файлов записаны как `editorialRevisions` с before/after hashes. Это осознанная редакция примера после снимка; исходная дата capture не выдаётся за дату последующего текста.
