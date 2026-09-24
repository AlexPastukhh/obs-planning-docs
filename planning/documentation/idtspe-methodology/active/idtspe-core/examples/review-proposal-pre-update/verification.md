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

## Исторические проверки до объединения Units

EXECUTED_THIS_PASS: `node verify-chat-command-palette.mjs` — **290 tests, 290 passed, 0 failed**; 114 command definitions, 16 source modules, 23 test files. Generated userscript и catalogs совпадают с текущими Sources. Новые проверки покрывают все пять Core aliases до/после normalization, adaptive/full example-reading routes, hashes 318 документов Launcher и дополнительного контекста, ссылки/anchors новых examples и 13 связанных TM owners. Отдельная проверка после добавления SDS index подтверждает его ссылки.

Это evidence проверенной редакции до переноса. Перенос выполняется только после сверки исходных hashes и подтверждается равенством применённых байтов staged manifest. Runtime proof приложения и браузерная установка Helper этим не заявляются.

## Актуализация формы Review Findings — один Unit

Последующее выбранное изменение пользователя: «надо бы чтобы диагнозы шли после файндинга, убрать 2 юнита»; на уточнение об изменении самого Target Module получен ответ «Да, изменить и Target Module».

Текущий TM-REVIEW-FINDINGS содержит один RU-RFIND-01 / RFIND-FINDINGS: один item объединяет наблюдение и последующий диагноз. Связанный Proposal может идти сразу после этого item как отдельное Core State. Command definition, Target Module Registry и Helper projections согласованы; учебный пример перестроен в том же порядке. Source-basis B-02.1 и исторический ремонт RFIND-DIAGNOSES выше сохранены: они описывают прежнюю редакцию, а не текущий inventory.

Проверка новой редакции во временной копии текущего рабочего дерева: `node verify-chat-command-palette.mjs` — **292 tests, 292 passed, 0 failed**, 115 command definitions, 16 source modules, 23 test files; generated userscript/catalog parity подтверждена. Проверка относится к методологическому изменению и его проекциям, не к исправлению runtime-дефектов Launcher.

Семантический check: сохранены полные поля Item Contract, evidence-backed Priority/RE/upstream/downstream/USER attention, pending diagnosis, zero-material-findings и диагностический handoff. Отдельный Core Proposal сохраняет candidate authority; отсутствие linked Proposal у материального Finding по-прежнему не позволяет объявить полный review завершённым.

## Исторический семантический closing check

Authority/SoT CHECK: исправления сохраняют Core authority; F-05 не требует нового policy выбора. Need/Value/Scope CHECK: Review/Workup/Pre-Update независимы; детерминированные P-* не создают Workup Target. Resolution Context CHECK: примеры показывают basis, upstream/downstream, QRPE/selection; synthetic workup не выдаётся за выбранное пользователем решение. Artifact Boundary CHECK: копия независима, доступна из owner, исторический source context не попадает в активные registries. Uncertainty CHECK: OPEN handoff и незапущенный Practical Test остаются открыты. Dependency/Verifiability CHECK: ссылки, snapshots/hashes и Helper projections проверяются отдельно от runtime приложения.

SDS Lens scan: для этой упаковки не меняется Domain/UI/Slice meaning; дополнительные SDS Lenses не нужны. Исходная SDS conformance-review внутри копии остаётся историческим evidence, не новым глобальным подтверждением всех Targets.

## Ограничения

Не запускались runtime приложения, installed browser/VSCode proof или установленный браузерный Helper. Snapshot содержит заданные исторические template placeholders и один отсутствующий legacy target; их список хранит snapshot manifest. Они не используются как текущие workflow examples.
