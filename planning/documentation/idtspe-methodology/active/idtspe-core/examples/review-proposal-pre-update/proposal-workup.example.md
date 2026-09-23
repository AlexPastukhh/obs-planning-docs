# Proposal Workup — доставка учебных примеров

**Иллюстративный case**, не история решения пользователя и не план изменения этого репозитория. Owner: [TM-PROPOSAL-WORKUP](../../target-modules/TM-PROPOSAL-WORKUP.md). Оба Units материальны: два допустимых варианта меняют стоимость обновления и автономность доставки. Сохраняемый workup нужен для сравнения и передачи незакрытого выбора.

## Учебная база S-EXPORT-01

Условный владелец **Documentation Delivery Policy** управляет упаковкой учебных примеров. Его принятые правила R-1..R-3 полностью заданы здесь:

- R-1: пример должен читаться автономно после получения; ссылки на живое приложение запрещены.
- R-2: документация приложения внутри снимка сохраняет дату, происхождение и нерешённые Problems.
- R-3: до публикации USER выбирает способ доставки. Ограничения размера/частоты обновления пока не заданы.

Goal G-1: читатель получает требуемый case без потери его source context. Q-1 у того же owner: поставлять все cases одним пакетом или независимыми пакетами? Оба соответствуют R-1..R-2. Ещё не выбранная упаковка не является дефектом; Finding и RE здесь не создаются. Требуется owner policy, а не полный SDS Domain/Scenario body; специализированный SDS TM не заменяется generic Workup.

## RU-PWORK-01 — PWORK-CANDIDATES

Эти компактные canonical Proposal bodies хранятся в учебном case один раз. Collection keys P-A/P-B — те же Proposal identities.

| Proposal | Driver / affected owner | Candidate Result Meaning / route | Basis / relation |
|---|---|---|---|
| P-A | G-1, Q-1 / Documentation Delivery Policy | Один versioned пакет всех examples; каждый release содержит cases и их pinned source context, общий индекс и manifests | S-EXPORT-01 R-1..R-3; конкурирует с P-B |
| P-B | G-1, Q-1 / Documentation Delivery Policy | Отдельный versioned пакет для каждого case; каждый содержит собственный контекст и manifest, каталог ссылается на releases | Та же S-EXPORT-01; конкурирует с P-A |

Оба **UNSELECTED**. Копия требуемого source context входит в каждый поставляемый пакет; ссылка на живой проект не является скрытым третьим вариантом. Общая инфраструктура builder может быть разделена без изменения этих кандидатных результатов.

## RU-PWORK-02 — PWORK-REVIEWS

CHECK: LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT и Proposal Semantic Change Impact Review, поверхность P-A/P-B, база S-EXPORT-01, EXECUTED_THIS_PASS в рамках заданной учебной ситуации. Это логическая проверка заданных правил, не замер реального bandwidth/build. Authority, Dependency/Change Impact, Need/Value/Scope и Artifact Boundary также применимы; SDS Domain/UI не применимы к этой policy.

| Key | Upstream applicability / последствия | Downstream / QRPE | Selection handoff |
|---|---|---|---|
| P-A | R-1 соблюдён включением контекста; R-2 — dated manifests/open statuses. Policy получит новый выбор единого release; upstream запрет live links сохраняется | Все cases обновляются одним release. Риск R-A: скачивание ненужных cases; без размера/частоты нет доказанной величины издержек. Проверка: открыть пакет offline, пройти case links, сопоставить hashes | UNSELECTED. Нужен выбор USER по R-3; AI не может заявить «уже выбрано» |
| P-B | R-1/R-2 соблюдены самодостаточностью каждого пакета. Policy получит иной выбор independent releases; upstream правила также сохраняются | Каталог обязан показывать версии каждого case; риск R-B: reader смешает версии, если индекс скроет version/basis. Проверка: один пакет без остальных, все ссылки локальны, каталог показывает version | UNSELECTED. Тот же USER gate; пригодность зависит от желаемой модели обслуживания |

**Comparison.** P-A упрощает согласованный release всего набора; P-B позволяет брать/обновлять один case. Это следствия предложенной структуры, не эмпирическое обещание скорости. Q-1 остаётся открытым; дополнительный вопрос о размерах нужен только если стоимость передачи определяет выбор. Реального Problem в принятой базе нет. Evidence — явно заданные R-1..R-3; измерения отсутствуют.

**Recommendation.** Если пользователь ценит независимое обновление cases, P-B подходит этому условию. Пока предпочтение не задано, ни один кандидат не объявлен рекомендованным безусловно или selected. Оба пригодны для USER comparison; новый semantic выбор нужен именно потому, что R-1..R-2 допускают оба результата, а R-3 оставляет полномочие USER.

## Checkpoints / continuation

Opening RU-PWORK-01: установлены driver, owner, Sources и применимые Core Lenses. Closing: нет выдуманных альтернатив, P-A/P-B адресуемы и различаются policy. Opening RU-PWORK-02: сформированы обе поверхности Proposal и USER gate. Closing: проверены upstream/downstream для каждого, QRPE и отсутствие selection; неразрешённая Q-1 передана owner.

При выборе USER применяются обычный lifecycle и disposition Q-1/R-A/R-B; принятый результат интегрируется в Documentation Delivery Policy. Decision trace сохраняется только при собственной ценности. Workup не становится новым владельцем policy и не разрешает публикацию. Если появится противоречие R-1, это новый Finding для canonical disposition, а не скрытая правка базы.

## Artifact Placement / lesson

Файл сохранён ради учебного сравнения и незакрытого handoff. Он демонстрирует универсальный driver Question без искусственного review и без Proposal-owned RE. Для единственного очевидного исправления, как P-05 в [review](review-findings.example.md), отдельный Workup Target избыточен.
