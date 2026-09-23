# Проверка ремонта и примеров

Дата: 2026-09-24. Объект: подготовленная рабочая копия методологии. Запись отделяет исторический B-02.1 от результата ремонта.

| Finding | Проверенный результат ремонта |
|---|---|
| F-01 | RFIND-DIAGNOSES, PWORK-REVIEWS, PUPDATE-OPERATIONS объявлены; identities и прежние Item Contracts сохранены. Обычное сравнение не вынесено в новую Collection. |
| F-02 | Локальные handoff labels не объявлены canonical lifecycle. Diagnostic-only сохраняет pending obligations; full review требует linked Proposal. BLOCKED_BY_REVALIDATION Proposal уже LINKED. |
| F-03 | Повторной коррекции нет: R-1 положительно задаёт CURRENT_BASIS, C — исправляемый owner, H — downstream consumer. |
| F-04 | SDS registry и bootstrap отражают 13 SDS-specific + 5 inherited Core, включая PRS; gates не менялись. |
| F-05 | Локальная таблица следует Core: нематериальный сформированный Unit остаётся видим с omission/reason. Материальный unresolved результат не превращается в omission. |
| F-06 | Registry aliases пяти Core TM проецируются и сохраняются после normalization; exact-ID invocation остаётся прежним. |

## Проверки

EXECUTED_THIS_PASS: `node verify-chat-command-palette.mjs` — **290 tests, 290 passed, 0 failed**; 114 command definitions, 16 source modules, 23 test files. Generated userscript и catalogs совпадают с текущими Sources. Новые проверки покрывают все пять Core aliases до/после normalization, adaptive/full example-reading routes, hashes 318 документов Launcher и дополнительного контекста, ссылки/anchors новых examples и 13 связанных TM owners. Отдельная проверка после добавления SDS index подтверждает его ссылки.

Это evidence проверенной редакции до переноса. Перенос выполняется только после сверки исходных hashes и подтверждается равенством применённых байтов staged manifest. Runtime proof приложения и браузерная установка Helper этим не заявляются.

## Семантический closing check

Authority/SoT CHECK: исправления сохраняют Core authority; F-05 не требует нового policy выбора. Need/Value/Scope CHECK: Review/Workup/Pre-Update независимы; детерминированные P-* не создают Workup Target. Resolution Context CHECK: примеры показывают basis, upstream/downstream, QRPE/selection; synthetic workup не выдаётся за выбранное пользователем решение. Artifact Boundary CHECK: копия независима, доступна из owner, исторический source context не попадает в активные registries. Uncertainty CHECK: OPEN handoff и незапущенный Practical Test остаются открыты. Dependency/Verifiability CHECK: ссылки, snapshots/hashes и Helper projections проверяются отдельно от runtime приложения.

SDS Lens scan: для этой упаковки не меняется Domain/UI/Slice meaning; дополнительные SDS Lenses не нужны. Исходная SDS conformance-review внутри копии остаётся историческим evidence, не новым глобальным подтверждением всех Targets.

## Ограничения

Не запускались runtime приложения, installed browser/VSCode proof или установленный браузерный Helper. Snapshot содержит заданные исторические template placeholders и один отсутствующий legacy target; их список хранит snapshot manifest. Они не используются как текущие workflow examples.
