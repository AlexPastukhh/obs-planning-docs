# Study Tab Launcher — копия документации приложения

Дата исходного снимка: **2026-09-24**. [Открыть документацию проекта](project/planning/documentation/README.md). Сохранены 38 файлов собственной документации приложения и связанные Evidence-файлы. Пример независим от живого workspace Launcher. Методологические ссылки ведут к действующим владельцам в этом же репозитории.

## Как читать

1. Прочитать текущий Target Module из таблицы.
2. Открыть соответствующий скопированный документ и учесть его status, Sources и дату.
3. Пройти связи Feature → Scenario → Slice и границу current/future owners. Документы приложения объясняют конкретный результат; текущая методология владеет reusable contracts.

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
| [TM-PLANNING-RESOLUTION-STATE](../../../../idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md) | [resolution-carry-forward.md](project/planning/documentation/resolution-carry-forward.md) | Единый PRS/RCF: открытая работа и Decisions со связанными QRP; порядок и приоритет разделены |
| [TM-PRACTICAL-TEST](../../target-modules/TM-PRACTICAL-TEST.md) | [practical-tests/installed-browser-vscode-handoff.md](project/planning/documentation/practical-tests/installed-browser-vscode-handoff.md) | План практического доказательства с OPEN, не выдуманный success |

## Status / authority boundary

- Нереализованный Step остаётся **unrealized**. Его полные будущие owners не заменяют текущие.
- [P-STL-HANDOFF-01](project/planning/documentation/shared/prepared-project-handoff.md#p-stl-handoff-01) остаётся OPEN: sample нестабилен. Копирование не закрывает Problem и не доказывает runtime success.
- [Installed practical test](project/planning/documentation/practical-tests/installed-browser-vscode-handoff.md) остаётся OPEN; исторические тестовые числа не являются новым прогоном.
- Снимок показывает документирование текущего результата, будущего изменения и незакрытых Evidence. Это не сертификат полной готовности приложения и не образец успешно завершённого Practical Test.
- TM-DOMAIN-DISCOVERY, TM-IMPLEMENTATION-SLICE, TM-PROTOTYPE и
  TM-CODE-REALIZATION не получили искусственных результатов: в исходной
  документации нет самостоятельных полных примеров именно этих Targets.
  Наличие скопированного source/test code само по себе не формирует отдельный
  Code Realization Target.

<a id="provenance"></a>
## Provenance / история редакций

[Snapshot manifest](snapshot-manifest.json) хранит исходные и текущие SHA256 для оставшихся файлов, а также deliberate editorial revisions. Исходная документация была получена из Study Tab Launcher; историческая методологическая база — `obs-planning-docs-main (100).zip`, её SHA256 сохранён в manifest.

В первой упаковке были дополнительно скопированы методология и окружающие repository files. По запросу пользователя ссылки сначала перенаправлены к канонической методологии этого репозитория и проверены, затем дублирующие каталоги удалены. Предыдущая упаковка доступна в истории Git — commit `1e014d0ea9031f22cbcf634bc9615fb470487488`; manifest сохраняет идентификатор прежней редакции, digest прежнего manifest и сводку удалённых копий. Для чтения примера эти удалённые файлы не нужны.

Исторические аудиты остаются историческими: их исходный Basis не изменён. Перенаправленные навигационные ссылки показывают текущего владельца, а не доказывают неизменность его текста со времени аудита. Бывшие ограничения старого source-context и chat attachments относятся к удалённой упаковке.

### Редакция Concept-first

Application Concept (стабильный `RU-APP-05`) стоит первым; дублирующий `RU-APP-01` снят. Benefits и их границы остаются в `RU-APP-03`. Эта ранее согласованная редакция сохранена. Новое перенаправление меняет методологическую навигацию и provenance; статусы приложения и его результаты остаются прежними.

[Core Review / Workup / Pre-Update examples](../../../../idtspe-core/examples/review-proposal-pre-update/README.md) показывают другие Target results. Для обновления примера используйте UC-DOC-MAINTAIN-EXAMPLE.

## 2026-09-24 — Decision retention representation

The example now keeps accepted boundary meaning as ordinary natural Unit content. The one retained handoff Decision is represented in [PRS](project/planning/documentation/resolution-carry-forward.md#dec-stl-prepared-handoff-01) with its actual open Problem. No separate Decision body remains at a Feature/Domain/Slice/Shared owner. This editorial revision follows the current Core retention/PRS contracts; it does not close proof or implement the future Step. The snapshot manifest preserves original source hashes and records revised copied hashes.

## 2026-09-26 — Current SDS alignment refresh

The live copied example was revalidated against the current SDS/Core methodology.
Literal source/test realization is now routed to SDS `TM-CODE-REALIZATION`, the
Practical Test examples use the current Unit names and material-campaign boundary,
and current navigation reflects Carry-Forward/PRS Decision retention. Historical
audits keep their original snapshot basis and wording; this refresh does not turn
them into current conformance certificates or claim new runtime Evidence.
