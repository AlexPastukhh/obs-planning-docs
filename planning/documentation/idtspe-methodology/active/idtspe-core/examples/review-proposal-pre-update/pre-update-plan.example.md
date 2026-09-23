# Pre-Update Plan — пять известных исправлений

Иллюстрирует [TM-PRE-UPDATE-PLAN](../../target-modules/TM-PRE-UPDATE-PLAN.md). Реконструированный план перед применением исправлений, дата 2026-09-24. Текущие результаты применения отделены в [verification.md](verification.md). Это самостоятельный пример того, как известное принятое значение превращается в операции; он не требует повторного review.

## RU-PUPDATE-01 — Pre-Update Plan

**Basis.** [Review B-02.1 / P-01..P-06](review-findings.example.md) уже устанавливает дефекты и основания детерминированных коррекций; исходные файлы доступны через [manifest](source-basis/manifest.json). USER разрешил: «сразу можно исправить все файндинги». Для P-05 U-04 подтверждает уже установленный Core omission. Отдельное новое policy Decision не нужно; допустимость не выводится только из разрешения редактировать. F-03 уже исправлен и не требует новой операции.

**Scope/preserve.** Исправить F-01/F-02/F-04/F-05/F-06. Сохранить Core lifecycle, независимость модулей и optional Target gates. Документы приложения и его runtime не входят в этот план. Создание копии Launcher/новых examples — отдельная разрешённая задача, не маскируется под эти Findings. Результат полезен как обзор нескольких связанных файлов до записи.

### PUPDATE-OPERATIONS

Все пути от корня methodology repository. Natural owner операции — соответствующий TM, Review Strategy, registry/command либо Helper projection. Операции не являются отдельными formal Proposals.

| Item | Action / exact destination | Driver / semantic delta | Preserve | Check |
|---|---|---|---|---|
| OP-01 | CHANGE `planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-REVIEW-FINDINGS.md` | P-01/P-02: Объявить diagnoses Collection; local labels; diagnostic/full boundary | Сохранить Item Contracts и Core lifecycle | candidate→diagnosis; LINKED blocked Proposal ≠ selectable |
| OP-02 | CHANGE `planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PROPOSAL-WORKUP.md` | P-01: Объявить candidate reviews Collection | Один canonical Proposal body, без новой RE шкалы | candidate→review; comparison не отдельная Collection |
| OP-03 | CHANGE `planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md` | P-01/P-05: Объявить operation Collection; исправить запрет omission в таблице | Core disposition и Target activation gate | MOVE содержит source/destination; unknown ≠ empty; omission видим с причиной |
| OP-04 | CHANGE `planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md` | P-02: Ограничить обещание completion полным review | Diagnostic-only сохраняет pending Proposal obligations | diagnostic-only/full/zero-material cases |
| OP-05 | CHANGE `planning/documentation/idtspe-methodology/active/profiles/sds/registries/TARGET-MODULE-REGISTRY.md` | P-04: Добавить inherited PRS | 13 SDS, generic Core gates | Сверить пять Core TM и прямую SDS applicability PRS |
| OP-06 | CHANGE `planning/commands/bootstrap-application-sds-planning.command.md` | P-04: Согласовать пять inherited Core TM | Governance-only bootstrap | DAG и body без автоматического Target |
| OP-07 | CHANGE `planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs` | P-06: Извлекать Core aliases из registry; убрать fallback двух TM | Exact-ID invocation и уникальность карточек | Пять mappings, включая planning resolution state, до/после normalization |
| OP-08 | CHANGE `planning/documentation/tools/tampermonkey/chat-command-palette/tests/semantic-navigation.test.mjs` | P-06: Проверять многословный alias и актуальный полный inventory | Registry остаётся source of truth | Проверка source→metadata не пропускает PRS |
| OP-09 | CHANGE generated destinations: `planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json`, `planning/documentation/tools/tampermonkey/chat-command-palette/seed/semantic-components.json`, `planning/documentation/tools/tampermonkey/chat-command-palette.user.js` | P-04/P-06: пересобрать проекции изменённых canonical Sources | Только builder производит generated content | build:check + helper verify; фактический changed-file manifest после build подтверждает destinations |

**Order.** OP-01..OP-06 меняют владельцев; OP-07/08 восстанавливают и проверяют проекцию. Затем build OP-09 и проверить изменившийся набор; записи не выполняются при несовпадении текущих входных hashes с inspected basis. Никаких DELETE/MOVE в этом случае не требуется.

**QRPE.** Ошибочная Q-05 отозвана: C6/C7 из review уже задают disposition. Риск — вернуть запрет omission или превратить локальный label в lifecycle; конкретные checks выше его покрывают. Evidence — captured owners и затем executed verification, а не тесты старого review. Неизвестные последствия внешних consumers остаются ограничением; проверяем локальные projections.

**Lens / checkpoints.** Opening: Authority, Target Resolution Coverage, Artifact Boundary, Dependency Change Impact и Verifiability применимы к accepted basis/операциям; Resolution Context CHECK переиспользует связанный impact review P-* только при неизменных основаниях. Closing: каждая операция имеет destination, delta, driver, preserve/check; нет новой semantic развилки; сформирован concrete reviewable result. План не является разрешением записи. В данном реальном случае запись отдельно разрешена USER; ограничения filesystem обрабатываются отдельно.

### Контрпример: явный omission

В другом, явно иллюстративном продолжении Target уже сформирован, но после сравнения destination с accepted basis установлено, что ожидаемая коррекция ранее применена и отдельный план теперь нематериален. Оставить **RU-PUPDATE-01: omitted — отдельные intended changes не нужны, checked current destination уже соответствует принятой базе**, со ссылкой на сравнение. Не скрывать Unit и не писать bare N/A. Если конкретный план остаётся материален, но операции неизвестны, это unresolved work, а не omission/нулевой набор. Если же предметом плана был аудит необходимости изменений и проверка установила ноль операций, это substantive checked zero-operation result.

## Artifact Placement / lesson

Сохранение оправдано продолжительным review/handoff и учебной адресацией операций. В обычном разговоре такой план может оставаться в Work Context. Он не производит exact patch, не запускает Review и не навязывает Pre-Update перед каждым изменением.
