# Documentation Workbench Planning Item Register — accepted Planning Item / Full Picture workflow transition

Status: active project-local source-linked register / accepted Documentation And Reference Object transition + accepted recent-chat reconciliation + accepted Planning Item/Full Picture workflow applied

Repository owner:

- area: [`planning/areas/documentation-workbench/`](README.md);
- application-level synthesis: [`full-picture.md`](full-picture.md);
- this file owns complete working item bodies, source excerpts, old-item dispositions and open questions.

Migrated from:

- `current-uncovered-documentation-workbench-items-register-v0.9.2-consolidated.md`;
- source SHA-256 `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`;
- uploaded `full-source-linked-planning-items-register-v0.6 (1)(1).md`;
- the current documentation-family review;
- user clarifications `SRC-N1`–`SRC-N86`;
- the v0.9 consolidated application register and linked current-picture artifact.

Counts:

- canonical active uncovered/partially covered bricks: **51**;
- old methodology/app register items audited: **110 / 110**;
- old-item dispositions:
  - active canonical: **15**;
  - merged/split/updated: **36**;
  - deferred implementation: **4**;
  - unresolved/not reconfirmed: **4**;
  - reusable or non-product owner: **51**.

Working-canonical boundary:

```text
canonical active in this file
  = the current accepted source-linked item set after applied transformations;
  ≠ a finished product specification or automatic approval of future transformations.
```

Reconciliation status:

```text
- Documentation And Reference Object End-To-End Workflow is accepted.
- Planning Item And Full Picture End-To-End Workflow is accepted.
- The former CP-2/CP-3/CP-4/CP-7 split is retained only as structural history.
- The former Planning Items/Full Picture/Deepening thematic slice is re-homed into the accepted Planning Item workflow.
- Explicitly accepted item transformations are applied in this register.
- ITEM-25B maps to ITEM-23B; ITEM-102 maps to ITEM-91.
- ITEM-22B keeps its stable technical identity and now owns the dual portable/application-native boundary.
- Absorbed item bodies, source IDs and provenance remain in Accepted Transformation History.
- Future transformations still require visible Current / Incoming / Resulting review and explicit acceptance.
```

Migration and coverage note:

- The source migration SHA identifies the pre-bootstrap v0.9.2 provenance; it is not the hash of this evolved register.
- Unchanged item bodies may retain coverage language describing the pre-bootstrap source snapshot.
- Items affected by accepted Documentation/Reference and Planning Item/Full Picture transitions have updated coverage, dispositions and workflow placement.
- The Application Root, two accepted end-to-end workflows and supporting model now exist in this area.
- No unrelated item meaning is silently rewritten by this transition.

## 0. Purpose

This file owns the current source-linked Documentation Workbench item set: accepted active meanings, unresolved work, complete source excerpts and explicit transformation history.

The file also guarantees brick integrity:

```text
free-form user input
  → source-linked items
  → canonical active items
  → linked synthesized current picture
  → explicit disposition for every older item
```

No older item is silently deleted. A duplicate is merged into a canonical brick; an unclear item remains visible as unclear; reusable methodology stays with its reusable owner instead of being copied into the app model.

## 1. Major corrections through current accepted transitions

1. Planning Items may represent work at different scales:
   - Goal;
   - Initiative;
   - Workstream;
   - Requirement;
   - Supporting or implementation idea;
   - question, decision, action and other useful planning roles.
2. Concerns are formalized through distinct stages:
   - Planning Lens;
   - Concern Definition;
   - Concern Preset;
   - Concern Suggestion / Candidate Concern;
   - Applied Concern;
   - Concern Work Target.
3. A Concern Suggestion is not an Applied Concern:
   - presets generate or expose candidates;
   - review may reject, defer, mark covered or apply a candidate;
   - only selected candidates create/update target-specific Applied Concerns.
4. Multiple presets may be applied together to one target. Nested preset inclusion/inheritance remains an open design question rather than an accepted requirement.
5. Manual concern addition is a source of a concern suggestion/application, not a Concern Preset type.
6. Document Template, Concern Preset, View Preset and Validation Rule are explicitly different mechanisms:
   - template recommends document shape;
   - concern preset recommends directions of attention;
   - view preset selects already existing related objects/records for display;
   - validation rule checks a condition.
7. Applying a concern preset does not:
   - make every concern applicable;
   - create mandatory document sections;
   - automatically create deep-planning files or objects;
   - automatically make the target incomplete.
8. A concern suggested by several presets is proposed once for the same target; if applied, one Applied Concern preserves all contributing preset/manual-source links.
9. File types may recommend document templates, concern presets, view presets and validation rules independently.
10. `ITEM-119 / CONCERN-PRESET-SYSTEM` owns definitions, presets, suggestions and application review; `ITEM-113` owns the lifecycle and deepening of Applied Concerns.
11. `ITEM-120 / SEMANTICALLY-COMPLETE-ITEM` states that a Planning Item has no arbitrary size or length cap:
    - its canonical body is as long as required to preserve the complete meaning;
    - examples, exceptions, rationale, acceptance detail and necessary context belong inside the item when needed;
    - short ID/code name/navigation summaries do not replace the full body.
12. Item splitting is semantic rather than length-based:
    split only when parts have independent meaning, ownership, lifecycle, review, reuse or decisions—not merely because the text is long.
13. Three older active items (`ITEM-31B`, `ITEM-32B`, `ITEM-93`) now include explicit explanations matching the rest of the register.
14. Prototype implementation, React/Tauri/Electron/Tampermonkey and application-shell choices remain outside this update.
15. The active brick count was 50 in the source snapshot; the Documentation/Reference transition reduced it to 48, and the accepted recent-chat reconciliation added three independent product meanings for a current total of 51 while preserving the complete 110-row old-item audit.
16. No separate `Planning Item Candidate` entity/state is introduced:
    - a Planning Item is formed or updated directly;
    - during creation/update, perform a targeted check of relevant current documentation, principles, workflows and existing items when repository context is available;
    - ordinary checking does not imply a new persisted object type.
17. Repository-backed semantic checking has three presentation/depth levels:
    - during item creation/update, perform a targeted relevant-owner check to avoid duplicates and discover existing solutions, principles or conflicts;
    - when the user explicitly requests the check, show its result as an explicit item-level review;
    - before every `План файл-обновление`, perform and show a complete reconciliation for all meanings that may change repository documentation.
18. Repository semantic reconciliation checks active owners and, when available, the source-linked items/excerpts behind relevant principles or workflows. It classifies the relationship between existing and new meaning without assuming that either side automatically wins.
19. Before a File Update Plan is issued, the user must see an explicit semantic-change review showing:
    - what is already covered;
    - what is supported, extended or clarified;
    - what is corrected, contradicted or replaced;
    - which canonical owners and dependent files are affected;
    - which unresolved conflicts require a user choice.
20. No active meaning may be silently removed, narrowed, replaced or moved. The semantic old → new change must be visible before the literal file update and later remain reviewable in the Git diff/history.
21. A Complete Picture is a trigger-to-result workflow, not a thematic capability slice. Former CP-2/CP-3/CP-4/CP-7 are re-homed into one Documentation And Reference Object End-To-End Workflow plus a supporting Reference Object model.
22. The accepted item transition absorbs only `ITEM-25B → ITEM-23B` and `ITEM-102 → ITEM-91`; `ITEM-108` and `ITEM-106` remain active independent meanings.
23. Object fields are not globally fixed: the application recognizes any correctly represented field, while category-specific contracts/presets describe expected fields and applicability conditions.
24. `ITEM-94 / AI-ITEM-IMPORT` remains active upstream; `ITEM-114 / GENERAL-REFERENCE-TARGETS` belongs to the shared reference-target phase rather than navigation-only ownership.
25. The accepted recent-chat reconciliation added three independent active product meanings: `ITEM-121`, `ITEM-122` and `ITEM-123`; `CHAT-PI-*` and `RESULT-*` remain transformation provenance rather than canonical IDs.
26. Planning Item formation has portable Markdown and application-native modes; portable mode remains supported until deliberately retired.
27. In application-native mode, explicit confirmation creates the Planning Item immediately as a managed Reference Object; later Markdown materialization does not create it again.
28. The former provisional Planning Items/Full Picture/Deepening slice is now an accepted trigger-to-result Complete Picture with an 11-item direct active set.
29. Full Pictures may reference child Full Pictures in their own canonical homes, and significant synthesis remains traceable to contributing Planning Items.
30. Concern observability is derived from concrete suggestions, Applied Concerns, questions, risks, evidence and work state; it is not one opaque quality score or a separate peer workflow.

## 2. Item identity rule

Canonical reference form:

```text
ITEM-110 / SEMANTIC-ITEM-KEY
```

- Numeric ID is the stable historical key.
- Code name is the short semantic key.
- Both should be shown in human-facing navigation and derived artifacts.
- The code names in this v0.9.2 file are working canonical names and may be reviewed later without changing numeric IDs.

## 3. Current coverage conclusion

The project-local area now has:

- an Application Root Full Picture;
- an accepted Documentation And Reference Object End-To-End Workflow;
- an accepted Planning Item And Full Picture End-To-End Workflow;
- a supporting Reference Object model with accepted transformation history;
- a 51-item active source-linked register;
- one remaining provisional Chat/AI/Work-State thematic slice.

The Documentation/Reference workflow covers repository/file/folder loading, mixed-Markdown parsing, accepted entry paths, canonical state and optional home, arbitrary fields and category contracts, authoring, managed references, round trip, dependency review, navigation and optional AI-expanded copy.

The Planning Item/Full Picture workflow covers source preservation, complete item formation, targeted owner checks, explicit transformations and acceptance, portable/application-native modes, item-backed Full Picture synthesis, concern observability/deepening loops, repository semantic reconciliation and documentation handoff.

Reusable methodology still needs synchronization for Planning Item Formation, exact review shape and terminology/principle changes. The final English Reference Object term, exact structured-response/Markdown syntax, category-contract composition, app-only durability, AI current-state transport and runtime/application-shell architecture remain unresolved.

## 4. Source bank

### Legacy excerpts still referenced by active bricks

### SRC-G3 — legacy source-link clarification

```text
когда надо чтобы было содержание информ айтема вставлено в буквальный файл, мы также делаем ссылку но мы как бы оборачиваем текстовое содержание
```

### SRC-G4 — legacy full/bare clarification

```text
иногда там еще и полное содержание этого объекта ... а иногда голая ссылка
```

### Fresh application sources

### SRC-N1

```text
мне для работы с ии нужно иметь документационый слой что хранит инструкции и принципы для выполнения какой либо специальной деятельности по типу создания приложения или планирования чего либо в т ч планирование приложения. я это сделал. получилась огромная папка которая как бы работала
```

### SRC-N2

```text
но были проблемы с тем, что мне нужны зависимости , по типу тех, что есть в языке программирования, связи по ссылке, чтобы при исправлении в одном месте (в родительском/первоначальном месте)было понятно что нужно проверить все места где эта инфа была использована, чтобы не искать вручную, чтобы можно было спокойно пользоваться вот этой ссылочной логикой.
```

### SRC-N3

```text
документационный слой сохранится, он по сути будет выглядеть точно также, только небудет файлов что содержат зависимости между файлами т к эти зависимости будут захендлены приложением
```

### SRC-N4

```text
в файлах что в док слое - те части ифны которые нужны в качестве отдельной сущности для какой либо цели(перенести в отдельный файл или просто в приложении отдельно поработать, без перенесения в док слое в отдельный файл, создать ссылку, чтобы в др файле была эта инфа точно в таком же виде и иметь сигнал при изменении что нужно проверить зависимости) - являются ссылочными обьектами.
```

### SRC-N5

```text
это нужно для того чтобы приложение могло их таковыми воспринять чтобы свернуть весь текст этог ссылочного обьекта для удобства(в приложении) или чтобы создать такой обьект если приложение не нашло его(таким образом можно с помощью ии создать файл с сылочными обьектами, которые считает приложение и при соглассии пользователя создаст)
```

### SRC-N6

```text
в приложении работа может вестись с нераскрытыми ссылочными обьектами - когда только указано что вот тут такой то обьект, и с раскрытыми - когда видно содержание ссыл оббьекта(нужно найти в файле с терминологией, как я там назвал то что тут называю ссылочным обьектом и поменять, т к ссылочный обьект кажется чем то более понятным) .
```

### SRC-N7

```text
по сути циклы такие - я что то меняю в док слое через гит, добавляю там какие то обьекты - приложение считывает локальный гит и копирует в свою память все что надо (полные текста файлов  и плейсхолдеры для ссылочных обьектов+ отдельные ссылочные обьекты) и создает новые обьекты если надо.
```

### SRC-N8

```text
также можно принять отдельно файл или папку, без считывания с гита.
```

### SRC-N9

```text
после того как в приложение все загрузилось, оно позволяет удобно использовать документационный слой, ссылки и тд, т е прилоежние именно для документационного слоя, оно не про планирование , оно именно про работу с документами и ссылочными обьектами и вставку их в документы
```

### SRC-N10

```text
приложение позволяет создать файлы в документационном слое и изменять их и ссылочные обьекты в этих файлах вставляются целиком, хотя внутри приложения я мог их не раскрывать - т к эти обьекты большие и работать с ними в отдельном окне , как с классом в программировании, а в файле эта ссылка на большой класс(ссылочный обьект т е ) нужно логически т к обьект содержит необх информацию и мне нужен ИСТОЧНИК ПРАВДЫ .
```

### SRC-N11

```text
в документационном слое этот источник вставляется полностью даже если он уже где то присутствует в док слое, где то в месте где он разрабатрывался, в родительском для него месте, в единственном месте где в приложении его можно редактировать т к это место этого источника правды, не в файле в который он вставлен как ссылка на источник правды.
```

### SRC-N12

```text
это дублирование в документах нужно для работы с ии, чтобы ии ,читая эти доки, могло сразу видеть всю необх инфу без надобности открыать др файлы и искать там, и это дубл безопасно т к приложение будет гарантировать что это именно та информация. было бы намного опаснее пытаться пересказыаь то что было разработано в другом файле, над чем была проведена большая работа, и потерять часть результата от этой работы.
```

### SRC-N13

```text
вообще при планировании и при выделении каких то айтемов мы отделяем идеи тех реализации от фактической реализации т к тех реализация это не требование, и она выводится после планирования по сути, но есть еще и планирование реализации когда ты пишешь идеи реаизации и вообще оценивание как можно что то реализовать. тут реализация не на 100 проц очевидна, но уже примерно ясна, и именно так стоит воспр такие идеи что тут описаны, но это пиложение также нужно как можно быстрее сделать,чтобы нормально можно было работать с ии
```

### SRC-N14

```text
если углубляться в детали и в сам алгоритм моей будущей работы с приложением- я пишу  что то, проблему/идеи/еще что то - это все помещается в айтемы, айтемы это единицы информации + источник в виде моего текста, они категорицируются, мы идем по воркфлоу планирования  и планируем в какие файлы какой айтем нужно поместить и при этом проходим все нужные ступени воркфлоу, с проверкой дифа и тд.
```

### SRC-N15

```text
я так общо все обьясняю потому что для приложения не важно с какой именно документацией работать. вот что важно.
```

### SRC-N16

```text
я получил список айтемов - ии сделал оболочку для каждого, я вставляю их в приложение или еще каким то образом приложение их получает, может через кнопку и считывание со страницы браузера. приложение спрашивает создать ли вот такие то обьекты, обьекты созданы .
```

### SRC-N17

```text
в приложении есть список всех созданных обьектов, и есть навигация, которая показывает файловую навигацию документационного слоя в котором ты работаешь с помощью этого приложения.
```

### SRC-N18

```text
работа ведется файлами и с сылочными обьектами для которых этот файл родной/либо не родной(в этот файл была помещена ссылка на ссылочный обьект созданный и "прописанный "(как место прописки,город и тд) в другом файле или месте в том же файле, если файл большой или если пользователь так решил), но также есть место в котором показаны все ссылочные обьекты для которых этот файл родной, для которых была создана ссылка в этом файле, а родной другой(лучше всего воспринимать как исходящие и входящие), сколько на этот файл ссылаются др файлов.
```

### SRC-N19

```text
также можно нажать папку в интерфейсе навигации этой и увидеть то же самое но не для файла а для всех файлов в папке и в подпапках(можно выбрать считать файлы в подпапках или нет) .
```

### SRC-N20

```text
каждому файлу можно дать категорию и у этой категории будут рекомендации по шаблону, можно создавать категории для файлов и рекомендации по шаблону для них.
```

### SRC-N21

```text
можно создавать ссылочные обьекты для файла, но не вставлять никуда , это будут неопределенные ссылочные обьекты этого файла, это встроенная категория ссылочных обьектов.
```

### SRC-N22

```text
ну и короче работа ведется как надстройка над документами
```

### SRC-N23

```text
по идее имеет смысл сделать документацию сорсом оф трус. а приложение оно вспомогательно по отношению к документации.
```

### SRC-N24

```text
когда я это писал, я имел ввиду что может быть обьект что относится к этому файлу но не выставлен ни каким образом в нем, т е не размещена ссылка нигде в файле и тд. но я пока уберу лучше это.
```

### SRC-N25

```text
да, на эти айтемы потом можно ссылкаться в файлах принципов или в каких нибудь файлах драфта, в длюбых файлах в которых нужна ссылка на идею/причину и тд, + в айтемах есть первоначальн мой текст.
```

### SRC-N26

```text
при изменении можно понять какие файлы можно проверить на предмет актуальности после изменения , т е появляется предупреждение что файл имеет непроверенную ссылку после ее изменения и надо вручную подтвердить что все актуально или убрать ссылку
```

### SRC-N27

```text
по идее должна быть возможно ситуация когда есть ссылочный обьект с каким то полем(ссылочные обьекты могут иметь разные поля, у меня должна быть возможность создавать эти поля , в т ч такой обьект можно создать из текста , не только из интерфейса приложения(я про ситуацию когда ии генерит файл с обьектами внутри и приложение считывает что возомжно нужно создать обьекты если их нет в приложении))
```

### SRC-N28

```text
и внутри этого поля ссылка на другой обьект. т е можно изменить обьект ссылка на который в поле другого и при этом получить предупр о нужной проверке на актуальность.
```

### SRC-N29

```text
ты не можешь изменить текст котоорый передан по ссылке(это правда как для файлов в которые вставлена ссылка на обьект так и для обьектов в поля котоорых вставлена ссылка наобьект) , ты можешь убрать эту ссылку или изменить сам обьект который передан.
```

### SRC-N30

```text
я без понятия от куда ты взял эту фразу и не знаю контекста чтобы обьяснить
```

### SRC-N31

```text
да. 2 вида ссылок. 1 в документ вставляется ссылка с текстом 2 в документ вставляется просто ссылка, для приложения, но в само документе этот текст не нужен, значит не вставляем его, а в приложении функционал этих 2 видов ссылок одинаковый, это только на содержание файла влияет.
```


### SRC-N32

```text
ITEM-95 я не понял твоего вопроса , нужно было его уточнить а не удалять что то сразу
```

### SRC-N33

```text
у планнинг итемов может не быть дома/родительского места. это возможный вариант- общие обьекты, у которых нет ссылки на родительский обьект
```

### SRC-N34

```text
я вроде говорил когда то про возможность перехода на домашнее место ссылочного обьекта по ссылке, в старых айтемах должно быть, также я говорил про внешний вид ссылок - найди эти моменты, их надо подробнее разобрать,можешь найти и вопросы еще свои приложить
```

### SRC-N35

```text
надо какие то не очень заметные обозначения полей обьекта делать т к мы же в документе это будем хранить + одновременно приложение должно считывать и понимать что вот тут ссылочный обьект с такими то полями + ии же будет читать документацию, нужно чтобы поля и ссылочные оболочки не были перегружены и смотрелись естественно.
```

### SRC-N36

```text
но я думаю что в основном обьекты будут состоять из одного основного поля с текстом и вспомогательных полей по типу местоположения родительского  и тд. если это вопрос был про форму обьектов, то она хранится в маркдауне по сути, это как анонимные обьекты, а не классы с фиксированными полями, хотя для я думаю что базовые вспомогательные поля для каждого обьекта стоит иметь, но это вообще можно захардкодить
```

### SRC-N37

```text
Q-13 — Когда обновляется текст full-text reference? Вариант B:
в файле остаётся предыдущая версия текста
→ пользователь сначала проверяет изменение
→ после подтверждения вставляется новый текст.
```

### SRC-N38

```text
Q-14 — Два режима ссылок применяются и внутри полей объектов? можно сделать да.
```

### SRC-N39

```text
Q-15 — Где хранится общий объект без parent/home? ну давай пока что в приложении пусть хранится потом разберемся .
```

### SRC-N40

```text
Q-16 — Правильно ли окончательно разделить термины?

canonical definition location
= где физически хранится редактируемый объект

parent/home
= к какому контексту объект смыслово относится

Тогда объект может иметь definition location, но не иметь home. согласен .
```

### SRC-N41

```text
«…лучше всего воспринимать как исходящие и входящие), сколько на этот файл ссылаются др файлов». тут как будто нужно более полную фразу поднять т к после скобки скорее всего относится к более раннему контексту и еще раз перезадать вопрос
```

### SRC-N42

```text
provenance / source excerpts скорее относятся не к логике приложения а к логике работы с ии и планированию, не надо это делать сущностью приложения впринципе.
```

### SRC-N43

```text
category/type/status может быть несколько. ну и эти захардкоженные поля можно убрать, в случае чего, т е это именно как шаблон стандартный и контракт которые приложение будет ожидать в случае если надо прочитать категорию, home и тд .
```

### SRC-N44

```text
bare references нужны в случаях когда ии не нужно иметь доступ быстрый к содержимому, но при этом было бы удобно в приложении чтобы были ссылки. также приложение по дефолту предоставляет возможность скопировать файл вместе со всеми ссылками и их содержимым и вставить в чат ии, если сильно надо.
```

### SRC-N45

```text
Q-21 — В полях тоже используется Variant B? да.
```

### SRC-N46

```text
также стоит добавить айтем - мы ведем актион лог, с совершенными действиями. это уже обсуждалось в айтемах.
```

### SRC-N47

```text
и при сохранении истории чата с моими вопросами и ответами чата, нужно как то добавлять в некоторые ответы - какие действия были добавлены в актион лог вот в этом моменте, в контексте этого ответа ии.
```

### SRC-N48

```text
также туда стоит включать какие айтемы были добавлены.
```

### SRC-N49

```text
и айтемы стоит называть не тлоько по номерам но и какое то короткое кодовое имя давать осмысленное .
```

### SRC-N50

```text
ITEM-95 : тут я скорее предложил называть ссылки, обьекты которых в др файлах - входящими а наоборот исходящими т к информация как бы исходит из др места, это немного противоречит понятию ссылки, но нельзя же назвать ситуацию когда у нас в файле обьект для которого этот файл home - входящей.
```

### SRC-N51

```text
(нужно также разобраться с термином для такого обьекта для которого еткущий файл home ).
```

### SRC-N52

```text
также точнее нужно разобраться с возможностью перейти по ссылке в home ссылочного обьекта по входящей ссылке . (для ссылки для обьекта которой текущий файл не home тоже нужно дать термин) .
```

### SRC-N53

```text
также я говорил о необходимости иметь несколько табов в приложении чтобы удобно работать , т к логика перехода из места к месту похоже на то что у нас есть в ide когда мы переходим из класса в класс, это по сути необходимо, но я вроде это давал в качестве айтема.
```

### SRC-N54

```text
нужно будет еще раз пройтись по старым айтемам и разобрать те которые не вписываются или вписываются непонятно в текущую картину общую, надо общую картину составитть более полную и соссылками на айтемы
```

### SRC-N55

```text
по сути таким образом работу я и хочу вести, чтобы я мог отдельно всякого наговорить и потом чтобы это никуда не девлось и можно было это в качестве сырья для чего то другого использовать без потери ценности предыдущей работы, вот сейчас надо полную картину составить из айтемов и выяснить какие кирпичи(айтемы) лишние/непонятные/дублирующие. лишних не должно быть тут
```

### SRC-N56

```text
по направлению системы планирования, а не приложения - есть смысл для поддержания принципа простоты ферст, имеет смысл сначала просто выдавать айтемы и идеи и лепить из них полную картину, настолько насколько это возможно на первом этапе когда у тебя ничего нет кроме этих хайл левел айтемов.
```

### SRC-N57

```text
с самого начала нужно планировать от аксептанс критерия и анализировать что действительно нужно а что нет ... чтобы у каждого айтемы был какой то смысл, т е чтобы он относился к какой то задаче и ты когда писал айтем новый задавался вопросом для чего именно он нужен и нужен ли он .
```

### SRC-N58

```text
у нас могут быть айтемы которые вводят новые требования и аксептанс критерии, а могут быть айтемы которые относятся к другим айтемам, например идея которая в поддержку какого то требования и оба выражены айтемами.
```

### SRC-N59

```text
все те вопросы которые должны задаться айтемам после составления полной картины, должны им задаваться во време их создания в том числе . просто после полной картины мы должны повторно пройтись уже более делально по всем айтемам.
```

### SRC-N60

```text
в принципах и вопркфлоу планирования мы можем по разному называть вещи , более осмысленно- направление планирования, углубление планирования айтема и тд, но в контексте приложения у нас все будет строиться из унифицированных блоков.
```

### SRC-N61

```text
Planning Direction всегда быть отдельным Ссылочным объектом, или иногда достаточно ссылки на обычный planning-файл/раздел документации. - я тоже об этом думал, надо допустить ссылку на файл или на обьект, потом можно более детально и глуббоко рассмотреть.
```

### SRC-N62

```text
возможно стоит когда пишешь сырой текст в чат давать какой нибудь знак о том что какое то место эксплицитно требует доработки в будущем и нужно разобрать вопросы по этому месту и чату нужно пометить это место соотв образом.
```

### SRC-N63

```text
также можно к какому то айтему или сырому тексту из которго будет делаться айтем сделать заметки в плане- выдал текст и добавил 1 какая то идея 2 какой то консерн . и ии не анализирует эти заметки а просто сохранияет на потом в том виде в каком они есть
```

### SRC-N64

```text
можно писать dam что будет означать Deferred Attention Marker. для заметок можно писать rn и 1 что то там 2 что то там и тд. ну или одна заметка может быть .
```

### SRC-N65

```text
я бы вообще сделал чтобы в приложении ко всему можно было цеплять сырые заметки ... в моем воркфлоу может создаваться очень много заметок и приложение должно поддерживать это каким то образом.
```

### SRC-N66

```text
1. Область действия DAM к ближайшему предшествующему фрагменту; 2. RN без target к ближайшему фрагменту; 3. Напоминания - забудем про напоминания 4. Кто может создавать DAM только пользователь.
```

### SRC-N67

```text
1. RN создаёт только пользователь? да  2. Можно ли редактировать сохранённый AI Response Artifact? нет мыслей об этом пока, значит пока нет .
```

### SRC-N68

```text
сделать так чтобы чат отвечал в определенном формате который будет считан приложением и возможно переден в файл и можно будет работать с ответом как с файлом документации , т е видеть ссылки на файлы /фрагменты файлов/айтемы и тд которые делает ии.
```

### SRC-N69

```text
есть только консерн по поводу того что если мы будем интегрировать чат в логику работы прриложения то надо либо давать в чат все что есть в памяти приложения либо чтобы из приложения тем или иным образом все переносилось в гит и гитхаб.
```

### SRC-N70

```text
вот тут еще есть проблема что через гитхаб тул чат не может читать большие файлы а у нас могут быть большие файлы, хотя это можно исправить через проверку того насколько большие файлы нельзя читать через гитхаб тул и через проверку файлов на этот порог и потом черерз вынос в отдельные файлы каких то фрагментов или разделение ответсвтенности.
```

### SRC-N71

```text
либо можно загружать архив со всем гит репозиторием в чат
```

### SRC-N72

```text
я хочу сделать так чтобы когда я получал такой ответ то я мог использовать приложение чтобы выдеть на что ссылается чат в ответе ... я хочу буквально перейти к тому на что ссылается чат ... ответ чата будет не просто какой то текст общий, а полноценный системный документ который ссылается корректно на все предыдущие нужные для контекста вещи и это все можно проверить через приложение.
```

### SRC-N73

```text
когда упоминается какой то источник то нужна полноценная ссылка на него, но я думаю что это должно определяться рекомендуемым шаблоном для конкретного ответа ... возможно удасться уменшить нагрузку через получение ссылки через только одно айди ссылочного обьекта.
```

### SRC-N74

```text
2. Может ли ответ ссылаться на состояние конкретной версии? лучше не стоит .
```

### SRC-N75

```text
3. Что происходит при устаревании ответа? в рамказ чат хистори надо эксплицитно говорить что ссылки могли устареть и не стоит с ними возиться если мы намеренно не пытаемся что то откопать по какой то причине в истории.
```

### SRC-N76

```text
я бы пока не делал отдельным айтемом то что нам надо не собирать всю документацию или всю память и вводить в приложение ... просто нужно разобраться как лучше всего сделать чтобы ии могло работать с этим всем - доками и какой то возможно инфой из приложения.
```

### SRC-N77

```text
возможно надо будет иметь доп файлы с ссылочными обьектами в репозитории и документацию хранилища приложения, т е по типу вот такие то категории, вот такие то айтемы и там мб json файлы ... просто нужно разобраться как лучше всего сделать чтобы ии могло работать с этим всем - доками и какой то возможно инфой из приложения.
```

### SRC-N78

```text
получается что у нас как бы весь процесс планирования идет по полной картине которая будет как бы драфтом состоящим из айтемов и айтемы могут иметь более глубокое планирование у себя + будет возможность(я возможно говорил про это в каких то айтемах) просмотреть все ссылочные обьекты связанные с файлом и имеющие опред категорию, т еможно увидеть будет все прототипы или еще что то, т е учитывая наши елементарные блоки на которых все строится в приложении - мы можем вручную выбрать что именно будет показываться, какоие ссылочные обьекты с какой категорией. но также имеет смысл делать пресеты для файлов опред типа, т е если у нас планнинг драфт то можно по умолчанию сделать чтобы можно было быстро посмотреть все вопросы, все разветвления и тд. ну и еще у нас будут сами айтемы тоже
```

### SRC-N79

```text
также должны быть пресеты консернов для определенных типов файлов, в некоторых случая для нашей текущей документации шаблоны подходят больше как консерны для которых нужны пресеты в приложении, но не все, а те которые не обязательны или отражают только направления или буквально возможжные консерны а не то как в идеале или примерно должен выглядеть файл.
```

### SRC-N80

```text
т е для планирования приложения пресетами консернов должны быть вещи которые по идее описаны в репозитории в доках где там про на чем делать приложение, как интегрировать, как оно потенциально может постареть - будет ли оно нужно через год? т е это как бы консерны уровня рахработать приложение, а не конкретного мелокого айтема внутри этой задачи, т е как будто разработать прилоежние являетмя айтемом(и соответсвтенно к нему можно применить некоторые из базовых консернов любого айтема и какие то особые тоже).
```

### SRC-N81

```text
обьяснение отличий и принципов надо сохранитььь для добавления в документацию, в принципы

не нужно ограничивать обьем айтема, его описание, если для передачи полного смысла требуются примеры и много текста, т е айтем должен занимать столько сколько потребуется.
```


### SRC-N82

```text
когда работаешь с айтемами имеет смысл проверять есть ли в репозитории в текущей документации айтемы к которым можно отнести то что польователь описывает, т е к примеру описывается айтем, проверяется репо и выясняется что для описываемой задачи уже есть айтем с решением для этой задачи т е это может быть айтем описывающий какой то принцип планирования или еще тчо и таким образом перед обновлением репозитория может быть получен список айтемов которые противоречат новым или решают ту же проблему, т е нужно интегрировать какие то добавления или исправления в документацию таким образом чтобы все что было изменено в текущей документации или заменено на новый смысл из новых айтемов делалось экплицитно, чтобы пользователь знал и мог проверить такие изменения
```

### SRC-N83

```text
я бы не делал никаких отдельных сущностей по типу кандидата, а при создании новго айтема проверял бы доки и существующие принципы и айтемы от которых они пошли по той логике что я уже описал и делал бы это эксплицитно при запросе пользователя, и обязательно перед выдачей плана обновления файлов
```

### SRC-N84

```text
вроде было описано что 1 обьект может содержать разные поля, поля не фиксированы, но могут быть созданы пресеты для категорий обьектов по типу присетов для айтема. приложение распознает то что оно видит , любое поле может быть распознано если корректна форма обьекта, а ожидание какиех то определенных полей делается по контракту категории обьекта, т е можно сделать ограничение по типу - только эта категория или только если присутствует эта категория, если такое ограничение где то уместно.
```

### SRC-N85

```text
cp это что то , по чему можно пройтись от начала и до конца шаг за шагом без возмоности того что где то есть параллельная cp , т е то что у нас есть проблема сейчас говорит о некорректной cp
```

### SRC-N86

```text
все так. давай план
```

Context: explicit acceptance of the immediately preceding corrected end-to-end Complete Picture and item-transition reconciliation.

## 5. Canonical active items

## A. Product boundary and core purpose

<a id="item-28b"></a>
### ITEM-28B / DOC-LAYER-OVERLAY — Приложение является надстройкой над реальным документационным слоем, а не planning application.

- Kind: application identity / scope
- Evidence status: **direct user statement**
- Current coverage: **Частично: reusable-документация определяет Markdown как first-class и допускает app metadata/navigation, но project-local identity продукта отсутствует.**
- Disposition: Обновить существующий ITEM-28B, сохранив его исходный смысл «app works around real files». Не связывать предметную модель приложения только с planning.
- Required documentation action: Создать project-local Application Root Planning Draft и явно отделить универсальный document workbench от planning integration.
- Owner candidate: project-local Application Root Planning Draft
- Direct source excerpts:
  - SRC-N1:
    ```text
    мне для работы с ии нужно иметь документационый слой что хранит инструкции и принципы для выполнения какой либо специальной деятельности по типу создания приложения или планирования чего либо в т ч планирование приложения. я это сделал. получилась огромная папка которая как бы работала
    ```
  - SRC-N9:
    ```text
    после того как в приложение все загрузилось, оно позволяет удобно использовать документационный слой, ссылки и тд, т е прилоежние именно для документационного слоя, оно не про планирование , оно именно про работу с документами и ссылочными обьектами и вставку их в документы
    ```
  - SRC-N15:
    ```text
    я так общо все обьясняю потому что для приложения не важно с какой именно документацией работать. вот что важно.
    ```
  - SRC-N22:
    ```text
    ну и короче работа ведется как надстройка над документами
    ```
- Explanation: Планирование — один из процессов, использующих приложение. Сам продукт предназначен для работы с любыми совместимыми документационными слоями.

<a id="item-85"></a>
### ITEM-85 / DEPENDENCY-FILES-RETIRE — Специальные файлы, существующие только ради ручного учёта зависимостей, должны стать необязательными после переноса dependency handling в приложение.

- Kind: migration / product outcome
- Evidence status: **direct user statement with scope clarification**
- Current coverage: **Отсутствует.**
- Disposition: Новый item. Не трактовать его как удаление документов, которые содержательно объясняют архитектурные зависимости.
- Required documentation action: Зафиксировать migration outcome и критерий: app заменяет dependency bookkeeping, но не удаляет полезную semantic documentation.
- Owner candidate: Application Root Planning Draft + migration workflow
- Direct source excerpts:
  - SRC-N2:
    ```text
    но были проблемы с тем, что мне нужны зависимости , по типу тех, что есть в языке программирования, связи по ссылке, чтобы при исправлении в одном месте (в родительском/первоначальном месте)было понятно что нужно проверить все места где эта инфа была использована, чтобы не искать вручную, чтобы можно было спокойно пользоваться вот этой ссылочной логикой.
    ```
  - SRC-N3:
    ```text
    документационный слой сохранится, он по сути будет выглядеть точно также, только небудет файлов что содержат зависимости между файлами т к эти зависимости будут захендлены приложением
    ```
- Explanation: Пользователь хочет сохранить прежний файловый слой, убрав необходимость вручную поддерживать отдельные dependency-register files.

## B. Implementation discipline and early MVP

<a id="item-99"></a>
### ITEM-99 / IMPLEMENTATION-IDEA-BOUNDARY — Git, storage, wrappers, browser capture и конкретные UI-механизмы из свежего объяснения являются implementation directions, а не автоматически принятыми requirements/architecture.

- Kind: evidence / implementation boundary
- Evidence status: **direct user instruction**
- Current coverage: **Reusable principle есть; app-local implementation-thought register отсутствует.**
- Disposition: Новый app-local item, поддерживающий существующий ITEM-82 boundary.
- Required documentation action: Хранить для механизмов status: user idea, working direction, needs prototype, accepted, rejected.
- Owner candidate: Application Root Planning Draft / implementation thoughts
- Direct source excerpts:
  - SRC-N13:
    ```text
    вообще при планировании и при выделении каких то айтемов мы отделяем идеи тех реализации от фактической реализации т к тех реализация это не требование, и она выводится после планирования по сути, но есть еще и планирование реализации когда ты пишешь идеи реаизации и вообще оценивание как можно что то реализовать. тут реализация не на 100 проц очевидна, но уже примерно ясна, и именно так стоит воспр такие идеи что тут описаны, но это пиложение также нужно как можно быстрее сделать,чтобы нормально можно было работать с ии
    ```
- Explanation: Функциональная цель уже достаточно ясна, но способ реализации должен пройти отдельное планирование.

<a id="item-100"></a>
### ITEM-100 / EARLY-INFRA-MVP — Нужен ранний полезный MVP, потому что приложение является инфраструктурой для дальнейшей нормальной работы с ИИ.

- Kind: priority constraint
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Новый item.
- Required documentation action: Использовать unblock-value как критерий scope, не отменяя confirmation, Source of Truth и diff safeguards.
- Owner candidate: Application Root Planning Draft
- Direct source excerpts:
  - SRC-N13:
    ```text
    вообще при планировании и при выделении каких то айтемов мы отделяем идеи тех реализации от фактической реализации т к тех реализация это не требование, и она выводится после планирования по сути, но есть еще и планирование реализации когда ты пишешь идеи реаизации и вообще оценивание как можно что то реализовать. тут реализация не на 100 проц очевидна, но уже примерно ясна, и именно так стоит воспр такие идеи что тут описаны, но это пиложение также нужно как можно быстрее сделать,чтобы нормально можно было работать с ии
    ```
- Explanation: Скорость важна не сама по себе: приложение должно как можно раньше устранить текущую системную боль.

## C. Reference Object identity, ownership and storage

<a id="item-86"></a>
### ITEM-86 / REFERENCE-OBJECT-TERM — Reference Object Term: «Ссылочный объект» is the confirmed Russian user-facing term for independently managed documentation meaning.

- Semantic name: **Reference Object Term**.
- Kind: terminology and model distinction.
- Evidence status: **direct user correction + accepted reconciliation**.
- Current coverage: **Covered by the accepted supporting model and end-to-end workflow; reusable English terminology remains provisional.**
- Disposition: **Update content; keep current semantic name and technical code.**
- Required documentation action:
  - preserve `Ссылочный объект` as the preferred Russian term;
  - keep `Reference Object` as a working English term until separately accepted;
  - distinguish object identity from canonical state, Markdown definition location, optional parent/home, object-backed region and materialized occurrence;
  - use the term consistently across creation, reference, review and navigation phases.
- Accepted workflow placement: identity, state and home phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Owner: `reference-object-model-and-lifecycle.md` + end-to-end workflow terminology.
- Direct source excerpts:
  - SRC-N4;
  - SRC-N6;
  - SRC-N85;
  - SRC-N86.
- Explanation: A region or occurrence is a representation/use of the object, not the object identity itself.

<a id="item-22b"></a>
### ITEM-22B / ITEM-TO-OBJECT — Planning Item Reference Object Boundary distinguishes already managed application-native Planning Items from portable reviewed meanings that still require managed-object creation.

- Semantic name: **Planning Item Reference Object Boundary**.
- Former semantic names:
  - **Item To Object**;
  - **Planning Item To Reference Object**.
- Kind: dual-mode Planning Item / managed Reference Object lifecycle boundary.
- Evidence status: **direct user clarification + accepted Documentation/Reference reconciliation + accepted recent-chat reconciliation + accepted Planning Item/Full Picture workflow**.
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow, downstream Documentation/Reference workflow and supporting Reference Object model.**
- Disposition: **Update And Rename semantic meaning; preserve `ITEM-22B / ITEM-TO-OBJECT`.**
- Required documentation action:
  - application-native path:
    - proposed Planning Item in a structured response;
    - explicit user review/confirmation;
    - Planning Item is created immediately as a managed Reference Object of category Planning Item;
    - downstream documentation placement does not create it again;
  - portable path:
    - reviewed Planning Item meaning may remain portable/not app-managed;
    - when managed creation is requested, show a Reference Object proposal;
    - explicit confirmation creates managed state;
  - later Markdown materialization, definition-location assignment, semantic-home assignment and documentation integration change owner/durability/location state rather than semantic identity;
  - preserve Planning Item identity, interpreted statement, source contributions and transformation history;
  - keep the Planning Item/source relation reviewable after managed creation;
  - `RN` and `DAM` remain literal user annotations, not Planning Items or Reference Objects;
  - conversion of `RN/DAM` requires separate user-requested interpretation/review;
  - generic Reference Objects do not require Planning Item provenance/source fields;
  - linking/merging with an already compatible managed object remains an explicit duplicate-resolution question.
- Accepted workflow placement:
  - application-native creation boundary in `complete-pictures/planning-items-and-full-picture/full-picture.md`;
  - portable reviewed-item entry and managed handoff in `documentation-and-reference-object-end-to-end-workflow.md`;
  - identity/state distinction in `reference-object-model-and-lifecycle.md`.
- Owner: cross-workflow interface + supporting model.
- Direct source excerpts:
  - SRC-N14;
  - SRC-N16;
  - SRC-N25;
  - SRC-N42;
  - SRC-N63;
  - SRC-N66;
  - SRC-N67;
  - SRC-N86;
  - accepted recent-chat source appendix, especially `CHAT-PI-022`, `CHAT-PI-026` and `CHAT-PI-028`.
- Explanation: User confirmation remains mandatory, but its effect depends on context. In application-native mode it creates a managed Planning Item Reference Object directly; in portable mode it may later authorize managed object creation. The same semantic item is not created twice.
<a id="item-87"></a>
### ITEM-87 / OBJECT-EXTRACTION — Reference Object Extraction: an existing documentation fragment may become a Reference Object when independent management has practical value and the user confirms it.

- Semantic name: **Reference Object Extraction**.
- Former semantic name: **Object Extraction**.
- Kind: confirmation-gated extraction from existing documentation.
- Evidence status: **direct user statement + accepted reconciliation**.
- Current coverage: **Covered in the accepted end-to-end workflow and supporting model.**
- Disposition: **Update And Rename semantic meaning; preserve `ITEM-87 / OBJECT-EXTRACTION`.**
- Required documentation action:
  - propose a semantic boundary and stable identity;
  - require user confirmation before canonical object creation;
  - support independent work without forcing a new file;
  - support exact reuse, collapse/expand, one canonical state, dependency tracking and independent review/lifecycle;
  - never extract merely because a fragment is long.
- Accepted workflow placement: object-creation entry path.
- Owner: end-to-end workflow creation phase + supporting model.
- Direct source excerpts:
  - SRC-N4;
  - SRC-N5;
  - SRC-N85;
  - SRC-N86.
- Explanation: Extraction is based on semantic/work lifecycle value, not automatic document fragmentation.

<a id="item-23b"></a>
### ITEM-23B / MARKDOWN-PRIMARY-TRUTH — Hybrid Source-of-Truth Model: Markdown owns normal document-backed canonical state while App Memory remains auxiliary.

- Semantic name: **Hybrid Source-of-Truth Model**.
- Former semantic name: **Markdown Primary Truth**.
- Kind: canonical-state ownership and App Memory boundary.
- Evidence status: **direct user statements + accepted merge of `ITEM-25B`**.
- Current coverage: **Covered in the accepted supporting model and end-to-end workflow.**
- Disposition: **Merge `ITEM-25B` into this item; update and rename semantic meaning; preserve `ITEM-23B / MARKDOWN-PRIMARY-TRUTH`.**
- Required documentation action:
  - Markdown owns canonical editable state for Markdown-backed objects;
  - canonical-state owner, Markdown definition location and optional parent/home are distinct concepts;
  - Markdown-backed App Memory is parsed/indexed auxiliary state and can be rebuilt;
  - temporary app-only canonical ownership is an explicit exception, not a global replacement for documentation;
  - the independent persistence/recovery/migration debt of that exception remains owned by `ITEM-108`;
  - preserve complete files as durable review/diff artifacts.
- Accepted workflow placement: identity, canonical state and home phase.
- Owner: supporting Reference Object model + end-to-end workflow.
- Direct source excerpts:
  - SRC-N7;
  - SRC-N23;
  - SRC-N33;
  - SRC-N39;
  - SRC-N40;
  - SRC-N85;
  - SRC-N86.
- Absorbed historical identity: `ITEM-25B / HYBRID-APP-MEMORY`.
- Explanation: The normal durable owner and the auxiliary in-app model form one source-of-truth responsibility; temporary app-only durability remains separate work.

<a id="item-91"></a>
### ITEM-91 / IN-FILE-HOME-OBJECT — Optional Reference Object Home: a Reference Object may have an in-file semantic home or no parent/home at all.

- Semantic name: **Optional Reference Object Home**.
- Former semantic name: **In-File Home Object**.
- Kind: optional semantic-home relationship and independent work surface.
- Evidence status: **direct user statements + accepted merge of `ITEM-102`**.
- Current coverage: **Covered in the accepted supporting model and end-to-end workflow.**
- Disposition: **Merge `ITEM-102` into this item; update and rename semantic meaning; preserve `ITEM-91 / IN-FILE-HOME-OBJECT`.**
- Required documentation action:
  - parent/home is optional semantic context;
  - an object may belong to a file/location and still be edited through an independent object surface;
  - an object may exist without parent/home while retaining identity and canonical state;
  - canonical-state owner and Markdown definition location remain separate from home;
  - lack of home is not the withdrawn file-scoped undefined-object category;
  - `Go To Home` is available only when home exists.
- Accepted workflow placement: identity, canonical state and home phase; reused by navigation.
- Owner: supporting Reference Object model + end-to-end workflow.
- Direct source excerpts:
  - SRC-N4;
  - SRC-N10;
  - SRC-N18;
  - SRC-N33;
  - SRC-N39;
  - SRC-N40;
  - SRC-N85;
  - SRC-N86.
- Absorbed historical identity: `ITEM-102 / HOMELESS-GENERAL-OBJECT`.
- Explanation: Home describes semantic belonging; it is neither proof of existence nor storage authority.

<a id="item-108"></a>
### ITEM-108 / TEMP-APP-ONLY-OBJECT — Temporary App-Only Object remains a separate durability, recovery and migration work target.

- Semantic name: **Temporary App-Only Object**.
- Kind: temporary canonical-state exception / deferred durability architecture.
- Evidence status: **direct user decision with explicit deferral + accepted reconciliation**.
- Current coverage: **Represented in the supporting model and workflow as explicit debt; durability behavior remains unresolved.**
- Disposition: **Keep active and update; do not absorb into `ITEM-23B`.**
- Required documentation action:
  - application may temporarily own canonical state when no Markdown definition location exists;
  - mark this as temporary rather than a final global invariant;
  - distinguish it from App Memory reconstructed from Markdown;
  - plan persistence, backup/export, recovery, AI-readable representation and later Markdown conversion;
  - preserve stable identity through a later canonical-state migration.
- Accepted workflow placement: identity/state phase and failure/durability boundary.
- Owner: supporting model + later storage/durability planning.
- Direct source excerpts:
  - SRC-N39;
  - SRC-N85;
  - SRC-N86.
- Explanation: The exception is acknowledged by the hybrid model, but its independent failure/recovery lifecycle justifies a separate active item.

<a id="item-103"></a>
### ITEM-103 / FLEXIBLE-OBJECT-SHAPE — Flexible Object Shape supports an unrestricted text-first body and arbitrary correctly represented fields.

- Semantic name: **Flexible Object Shape**.
- Kind: object content/field representation model.
- Evidence status: **direct user statements + accepted correction**.
- Current coverage: **Covered by the supporting model and end-to-end workflow; exact Markdown syntax remains open.**
- Disposition: **Update content; keep active and separate from category contracts.**
- Required documentation action:
  - object form is flexible/anonymous rather than one fixed class schema;
  - one unrestricted main text body is the common case;
  - users may add arbitrary fields;
  - application recognizes any field whose object/field representation is syntactically valid;
  - category/type/status may each contain multiple values;
  - generic objects do not require planning provenance/source fields;
  - exact marker and parser mechanics remain prototype work.
- Accepted workflow placement: shape and category-contract phase; parser recognition also supports parsing/round trip.
- Owner: supporting model + end-to-end workflow.
- Direct source excerpts:
  - SRC-N27;
  - SRC-N35;
  - SRC-N36;
  - SRC-N42;
  - SRC-N43;
  - SRC-N84;
  - SRC-N86.
- Explanation: Generic recognition is based on valid representation; expectations for particular fields belong to applicable category contracts.

<a id="item-106"></a>
### ITEM-106 / OPTIONAL-FIELD-CONTRACT — Object Category Field Contracts define reusable category-specific field expectations and applicability conditions.

- Semantic name: **Object Category Field Contracts**.
- Former semantic name: **Optional Field Contract**.
- Kind: category contract/preset and field-expectation model.
- Evidence status: **direct user clarification + accepted correction**.
- Current coverage: **Covered at model level; contract combination, precedence and severity remain open.**
- Disposition: **Update And Rename semantic meaning; preserve `ITEM-106 / OPTIONAL-FIELD-CONTRACT`; do not merge into `ITEM-103`.**
- Required documentation action:
  - category contract/preset describes fields expected for objects to which it applies;
  - applicability may require one category or a combination such as category A only when category B is present;
  - contracts may recommend, warn or explicitly restrict only when that behavior is declared;
  - unknown additional fields remain allowed by default;
  - several category/type/status values and several applicable contracts may coexist;
  - preserve all applicable contracts when conflict-resolution rules are unresolved;
  - Planning Item, concern and relation field names are category-contract examples; their semantics remain with their respective owners;
  - distinguish required identity/parser mechanics from category-specific semantic expectations;
  - exact serialization remains prototype work.
- Candidate contract examples:
  - Planning Item: `Planning Direction`, `Item Kind`, `Item Scale`, relations, deepening and raw/deferred fields;
  - Concern definitions/presets/applications: definitions, included definitions, applicability, sources and target-specific statuses;
  - general object metadata: category/type/status, parent/home and relations.
- Accepted workflow placement: shape and category-contract phase; filtered views may consume recognized fields.
- Owner: supporting model + category-contract management inside the end-to-end workflow.
- Direct source excerpts:
  - SRC-N42;
  - SRC-N43;
  - SRC-N60;
  - SRC-N61;
  - SRC-N65;
  - SRC-N79;
  - SRC-N81;
  - SRC-N84;
  - SRC-N86.
- Explanation: The parser may read arbitrary valid fields; the contract says what a category expects rather than defining one universal fixed object schema.

## D. Reference representation, dependency and review

<a id="item-90"></a>
### ITEM-90 / LINKED-CONTENT-READONLY — Текст, полученный по ссылке, read-only в месте использования: его нельзя изменять ни в документе-occurrence, ни внутри поля другого объекта.

- Kind: reference editing invariant
- Evidence status: **direct user clarification**
- Current coverage: **Частично: ранее правило относилось только к non-home materialized occurrence. Новая формулировка расширяет его на object fields и bare/full links.**
- Disposition: Расширить существующий ITEM-90.
- Required documentation action: Любая попытка изменить linked content должна вести к canonical object/home. В месте использования разрешены только удаление/замена ссылки либо редактирование собственных окружающих данных.
- Owner candidate: document/object editing workflow
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N11:
    ```text
    ...в единственном месте где в приложении его можно редактировать т к это место этого источника правды, не в файле в который он вставлен как ссылка на источник правды.
    ```
  - SRC-N29:
    ```text
    ты не можешь изменить текст котоорый передан по ссылке(это правда как для файлов в которые вставлена ссылка на обьект так и для обьектов в поля котоорых вставлена ссылка наобьект) , ты можешь убрать эту ссылку или изменить сам обьект который передан.
    ```
- Explanation: Это правило предотвращает расхождение одной ссылки на нескольких поверхностях и делает объект аналогом управляемой зависимости.

<a id="item-101"></a>
### ITEM-101 / FIELD-LEVEL-REFERENCES — Object fields may contain managed object references and general file/location links; object full-text references use Variant B.

- Kind: object model / dependency
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Уточнить существующий item and delegate general target semantics to `ITEM-114`.
- Required documentation action:
  - user-defined fields may contain full-text or bare Reference Object links;
  - linked object content is read-only;
  - source change leaves old full-text materialization until review;
  - approval inserts the new exact text;
  - remove/replace and invalidation behavior matches document occurrences;
  - fields may also contain ordinary Documentation File or File Location links under `ITEM-114`;
  - a navigation-only file link is not automatically a dependency edge and does not automatically use full-text/bare object semantics.
- Owner candidate: object model + dependency workflow
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N27
  - SRC-N28
  - SRC-N29
  - SRC-N35
  - SRC-N36
  - SRC-N38
  - SRC-N45
  - SRC-N61
- Explanation: Object dependencies and ordinary file navigation can share field placement without losing their different semantics.

<a id="item-88"></a>
### ITEM-88 / REFERENCE-MODE-PARITY — Full-text and bare references have the same app functionality and may be collapsed/expanded; bare mode is used when quick AI access is unnecessary.

- Kind: UI representation invariant
- Evidence status: **direct user clarification**
- Current coverage: **Частично.**
- Disposition: Расширить `ITEM-88`.
- Required documentation action:
  - both modes open object state, canonical location, optional home, fields, dependencies, occurrences and review state;
  - collapsed/expanded is app view state;
  - full/bare is persisted Markdown choice;
  - choose bare when document content does not need immediate AI-visible duplication.
- Owner candidate: Reference Object UI + document representation workflow
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N6
  - SRC-N31
  - SRC-N44
- Explanation: Bare mode is intentional document design, not an incomplete occurrence.

<a id="item-73"></a>
### ITEM-73 / FULL-OR-BARE-LINK — Saved Markdown supports full-text and bare references as equal managed-reference modes.

- Kind: persisted reference representation
- Evidence status: **direct user clarification**
- Current coverage: **Partially present as embedded/reference-only choices.**
- Disposition: Уточнить `ITEM-73`.
- Required documentation action:
  - full-text = identity + last approved materialized text;
  - bare = identity/path without duplicated content;
  - both remain managed occurrences;
  - both are allowed in documents and object fields;
  - bare is suitable when immediate AI-visible content is unnecessary.
- Owner candidate: Markdown/reference representation workflow
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N10
  - SRC-N31
  - SRC-N38
  - SRC-N44
- Explanation: Saved-content choice does not reduce app capabilities.

<a id="item-89"></a>
### ITEM-89 / REVIEWED-REFERENCE-REFRESH — After a referenced object changes, every dependent document or field becomes unreviewed; old full-text materialization remains until approval.

- Kind: dependency invalidation + review workflow
- Evidence status: **direct user clarification**
- Current coverage: **Частично.**
- Disposition: Обновить `ITEM-89`; Variant B is confirmed for documents and fields.
- Required documentation action:
  - detect all affected document and field references;
  - show review-needed state and source change;
  - keep previous approved full text;
  - close through `approve and refresh` or `remove/replace reference`;
  - invalidate again on later changes.
- Owner candidate: Dependency Graph And Impact Review workflow
- Accepted workflow placement: change impact and review phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N2
  - SRC-N26
  - SRC-N28
  - SRC-N37
  - SRC-N45
- Explanation: The app guarantees visible review obligations, not automatic semantic correctness.

<a id="item-29b"></a>
### ITEM-29B / DEPENDENCY-GRAPH — Dependency graph включает file occurrences и ссылки внутри настраиваемых полей других Ссылочных объектов.

- Kind: dependency graph model
- Evidence status: **direct user clarification**
- Current coverage: **Частично: существующий item включал files, objects и occurrences, но не object-field edges.**
- Disposition: Расширить ITEM-29B.
- Required documentation action: Хранить typed edges минимум для `file/region → object` и `object.field → object`, показывать incoming/outgoing relations и propagating review-needed state.
- Owner candidate: Reference Object model + dependency workflow
- Accepted workflow placement: change impact and review phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N2:
    ```text
    ...мне нужны зависимости , по типу тех, что есть в языке программирования, связи по ссылке...
    ```
  - SRC-N28:
    ```text
    и внутри этого поля ссылка на другой обьект. т е можно изменить обьект ссылка на который в поле другого и при этом получить предупр о нужной проверке на актуальность.
    ```
- Explanation: Зависимость является свойством не только файловой materialization, но и структурированных отношений между объектами.

<a id="item-16b"></a>
### ITEM-16B / STALE-REFERENCE-QUEUE — UI показывает unreviewed-reference state для зависимых файлов и объектов и позволяет закрыть его подтверждением актуальности либо удалением/заменой ссылки.

- Kind: review-state UI
- Evidence status: **direct user clarification**
- Current coverage: **Частично: generic review statuses существуют, но конкретный dependency-invalidated lifecycle не определён.**
- Disposition: Расширить ITEM-16B.
- Required documentation action: Определить visible warning, filters/counts, affected-source diff/context и допустимые закрывающие действия.
- Owner candidate: Dependency Review UI
- Accepted workflow placement: change impact and review phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N26:
    ```text
    ...появляется предупреждение что файл имеет непроверенную ссылку после ее изменения и надо вручную подтвердить что все актуально или убрать ссылку
    ```
  - SRC-N28:
    ```text
    ...получить предупр о нужной проверке на актуальность.
    ```
- Explanation: Checkmark/status — не сам review object; пользователь должен видеть изменившийся источник и зависимый контекст.

<a id="item-83"></a>
### ITEM-83 / OBJECT-WRAPPER-CONTRACT — Markdown marker/wrapper кодирует identity, boundaries, canonical/reference role, fields и representation mode, оставаясь визуально лёгким.

- Kind: Markdown bridge / representation contract
- Evidence status: **direct source support; exact syntax open**
- Current coverage: **Частично: identity/boundaries уже существуют как terminology concept, но concrete contract и readability constraint отсутствуют.**
- Disposition: Уточнить старый `ITEM-83`.
- Required documentation action:
  - canonical object definition and linked occurrence must be distinguishable;
  - full-text and bare modes must be distinguishishable;
  - fields and field-level references must be parseable;
  - markers must not dominate the visible Markdown;
  - syntax should be prototyped against human reading, AI reading and reliable round trip.
- Owner candidate: Markdown bridge workflow + prototype
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-G3
  - SRC-G4
  - SRC-N31
  - SRC-N35
  - SRC-N36
- Explanation: Wrapper is both a machine contract and a documentation UX surface.

<a id="item-105"></a>
### ITEM-105 / QUIET-MARKDOWN-MARKERS — Object, field and reference markers in Markdown must be minimally intrusive, natural for humans and AI, and still reliably machine-readable.

- Kind: representation quality / parsing constraint
- Evidence status: **direct user statement**
- Current coverage: **Частично отражено readable/reviewable Markdown и wrapper identity rules; natural visual form is not explicit.**
- Disposition: Новый item.
- Required documentation action:
  - wrappers/field markers must not visually overload documentation;
  - ordinary reading by a person or AI should remain natural;
  - application parsing must still recover object identity, fields, boundaries, role and reference mode;
  - exact syntax remains a prototype/implementation decision.
- Owner candidate: Markdown bridge workflow + prototype plan
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N35:
    ```text
    нужно чтобы поля и ссылочные оболочки не были перегружены и смотрелись естественно.
    ```
- Related old items:
  - `ITEM-30B`: generated Markdown remains readable/reviewable;
  - `ITEM-83`: wrapper identifies source object and local text boundary.
- Explanation: This is a product-quality constraint on any future syntax, not acceptance of a particular marker format.

## E. Import, authoring, round trip and AI reading

<a id="item-31b"></a>
### ITEM-31B / CONFIRMED-OBJECT-DISCOVERY — Приложение обнаруживает object definitions и proposed objects в импортированном тексте/AI-generated файле и создаёт отсутствующие объекты только после подтверждения пользователя.

- Kind: object discovery and confirmation
- Evidence status: **direct user statements**
- Current coverage: **Частично: proposed region confirmation определена reusable-принципом, но concrete import behavior отсутствует.**
- Disposition: Расширить ITEM-31B за пределы UI-created objects.
- Required documentation action: Parse known identities, detect missing definitions, show proposed object/fields/source, resolve duplicate/conflict, confirm creation and write canonical Markdown home.
- Owner candidate: Object Discovery And Confirmation workflow
- Accepted workflow placement: scope, parsing and creation phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N5:
    ```text
    ...приложение не нашло его... с помощью ии создать файл с сылочными обьектами, которые считает приложение и при соглассии пользователя создаст
    ```
  - SRC-N16:
    ```text
    ...приложение спрашивает создать ли вот такие то обьекты, обьекты созданы .
    ```
  - SRC-N27:
    ```text
    ...такой обьект можно создать из текста , не только из интерфейса приложения...
    ```
- Explanation: Discovery may propose identities and definitions, but canonical object creation remains an explicit reviewed action rather than a side effect of parsing or AI output.

<a id="item-32b"></a>
### ITEM-32B / MIXED-MARKDOWN-ROUNDTRIP — Приложение читает, редактирует и экспортирует mixed Markdown с ordinary text, canonical object definitions, full-text references и bare references.

- Kind: document round-trip behavior
- Evidence status: **direct user clarification**
- Current coverage: **Частично: mixed regions описаны, но два persisted reference modes и field-backed objects не включены.**
- Disposition: Расширить ITEM-32B.
- Required documentation action: Preserve ordinary text, identity, boundaries, mode, canonical/non-canonical role, fields and exact user formatting through parse/edit/write round trip.
- Owner candidate: Mixed Document Parsing And Authoring workflow
- Accepted workflow placement: scope, parsing and creation phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N7:
    ```text
    ...полные текста файлов и плейсхолдеры для ссылочных обьектов+ отдельные ссылочные обьекты...
    ```
  - SRC-N31:
    ```text
    ...1 в документ вставляется ссылка с текстом 2 в документ вставляется просто ссылка...
    ```
- Explanation: Round trip is trustworthy only when ordinary prose, object identity, fields, reference mode and user formatting survive parse/edit/write without silent semantic conversion.

<a id="item-34b"></a>
### ITEM-34B / REPO-FILE-FOLDER-ROUNDTRIP — Round trip принимает рабочее дерево repository, отдельный файл или папку, загружает их в App Memory и возвращает полные Markdown-файлы в обычный diff workflow.

- Kind: import/export/sync workflow
- Evidence status: **direct user statement; Git mechanism remains candidate**
- Current coverage: **Частично: abstract import/export/sync item существует.**
- Disposition: Расширить существующий ITEM-34B. Не утверждать, что обязателен Git API: свежий текст может означать чтение локального working tree.
- Required documentation action: Описать import scopes, refresh, materialization/export и conflict detection.
- Owner candidate: repository/file round-trip workflow
- Accepted workflow placement: scope, parsing and creation phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N7:
    ```text
    по сути циклы такие - я что то меняю в док слое через гит, добавляю там какие то обьекты - приложение считывает локальный гит и копирует в свою память все что надо (полные текста файлов  и плейсхолдеры для ссылочных обьектов+ отдельные ссылочные обьекты) и создает новые обьекты если надо.
    ```
  - SRC-N8:
    ```text
    также можно принять отдельно файл или папку, без считывания с гита.
    ```
  - SRC-N14:
    ```text
    если углубляться в детали и в сам алгоритм моей будущей работы с приложением- я пишу  что то, проблему/идеи/еще что то - это все помещается в айтемы, айтемы это единицы информации + источник в виде моего текста, они категорицируются, мы идем по воркфлоу планирования  и планируем в какие файлы какой айтем нужно поместить и при этом проходим все нужные ступени воркфлоу, с проверкой дифа и тд.
    ```
- Explanation: Файл и папка являются самостоятельными входами; Git нужен как часть привычного процесса, но механизм интеграции ещё не выбран.

<a id="item-93"></a>
### ITEM-93 / DOCUMENT-AUTHORING — Приложение позволяет создавать и изменять файлы документационного слоя, вставляя full-text или bare references на Ссылочные объекты.

- Kind: document authoring
- Evidence status: **direct user clarification**
- Current coverage: **Отсутствует как concrete app behavior.**
- Disposition: Обновить новый item.
- Required documentation action: File editor должен позволять выбрать reference mode; linked content остаётся read-only, а обычный окружающий текст — редактируемым.
- Owner candidate: document authoring workflow
- Accepted workflow placement: authoring and references phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N10:
    ```text
    приложение позволяет создать файлы в документационном слое и изменять их...
    ```
  - SRC-N31:
    ```text
    ...1 в документ вставляется ссылка с текстом 2 в документ вставляется просто ссылка...
    ```
- Explanation: Authoring keeps ordinary document text editable while managed linked content preserves identity, mode and read-only source ownership.

<a id="item-94"></a>
### ITEM-94 / AI-ITEM-IMPORT — Structured AI responses may propose Planning Items; existing references and proposed items must remain distinct until confirmation.

- Kind: AI item ingestion
- Evidence status: **direct user clarification**
- Current coverage: **Covered as the application-native proposed-item import mode of the accepted Planning Item/Full Picture workflow; exact parser/response syntax remains open.**
- Disposition: **Keep active and update workflow placement; connect to `ITEM-116` and `ITEM-22B`.**
- Required documentation action:
  - batch import and object preview;
  - recognize proposed items inside a template-linked AI response;
  - distinguish an existing item reference from a proposed new item;
  - require confirmation before item/object creation;
  - preserve the source answer and source user fragment when applicable;
  - allow optional parent/home assignment and reference placement;
  - allow a general object to remain temporarily app-only;
  - never import user `RN/DAM` as reviewed items automatically.
- Owner: accepted Planning Item/Full Picture workflow application-native mode.
- Accepted workflow placement: proposed-item import and application-native delivery phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`; confirmed managed items enter the Documentation/Reference workflow through `ITEM-22B` without repeated creation.
- Direct source excerpts:
  - SRC-N16
  - SRC-N25
  - SRC-N39
  - SRC-N63
  - SRC-N66
  - SRC-N68
  - SRC-N72
- Explanation: Machine-readable AI output improves ingestion but does not bypass interpretation review or user confirmation.

#### Accepted recent-chat reconciliation expansion

AI Item Import is the application-native entry mode of the wider Planning Item formation lifecycle. A template-linked response may contain existing item references and proposed new/updated items. The application must preserve that distinction, show the complete accumulating meaning and complete source context, and create the confirmed Planning Item directly as a managed Planning Item Reference Object. Portable Markdown review remains a separate fallback/interoperability mode and is not removed.

<a id="item-107"></a>
### ITEM-107 / AI-EXPANDED-COPY — The app can copy/export a selected file with referenced object contents expanded for insertion into an AI chat.

- Kind: AI reading/export workflow
- Evidence status: **direct user statement**
- Current coverage: **Partially anticipated by older `ITEM-77`.**
- Disposition: Keep with deliberately narrow ownership.
- Required documentation action:
  - provide “copy with all references expanded”;
  - resolve bare and full-text object references to current object content in the copied view;
  - preserve identity/boundary information;
  - do not mutate saved Markdown;
  - identify missing/unresolved objects explicitly;
  - do not treat this item as the complete mechanism for supplying all application state to AI.
- Owner candidate: AI-expanded copy/export workflow
- Accepted workflow placement: optional AI-expanded output phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N44
- Older support:
  - `ITEM-77`.
- Explanation: This is a simple one-document transfer path; broader AI knowledge synchronization remains a separate planning concern.

## F. Chat history, Action Log, raw annotations, AI responses and reusable item ledger

<a id="item-11b"></a>
### ITEM-11B / CHAT-HISTORY-LEDGER — Chat History stores immutable user/AI turns as addressable historical records linked to work-state changes, annotations and resolvable response references.

- Kind: chat history / product workflow
- Evidence status: **direct fresh source + older register support**
- Current coverage: **Conversation History and Turn exist in terminology, but the product workflow is incomplete.**
- Disposition: Expand active `ITEM-11B`; keep old `ITEM-36B` merged into it.
- Required documentation action:
  - preserve original user questions and AI answers without editing stored history;
  - give turns, answers and relevant semantic fragments stable addresses;
  - attach user-created `RN/DAM` to the nearest preceding fragment;
  - link a specific answer to created Action Log Entries and Planning Items;
  - retain structured AI response type and its links;
  - historical links resolve to current targets when possible but may become stale;
  - historical answers display an explicit stale-link warning;
  - historical links do not require repair and do not enter normal dependency-review queues;
  - version-pinned target state is not required at this stage.
- Owner candidate: Chat History And Work Trace workflow
- Direct source excerpts:
  - SRC-N47
  - SRC-N48
  - SRC-N55
  - SRC-N66
  - SRC-N68
  - SRC-N72
  - SRC-N74
  - SRC-N75
- Older supporting items:
  - `ITEM-11B`: full chat history with turns and documentation status;
  - `ITEM-36B`: chat workspace with full history and extracted items.
- Explanation: The history record remains exact even though the current entities reached through its links may later change.

#### Accepted recent-chat reconciliation expansion

Source navigation must resolve from a Planning Item to the complete supporting user message, exact semantic fragment/anchor and surrounding previous/next turns. Historical source records remain immutable. Several source messages are kept in chronological order, and one message may support several items through typed contribution relations.

<a id="item-12a"></a>
### ITEM-12A / COMPLETED-ACTION-LOG — Action Log является отдельным журналом совершённых действий, а не копией истории чата или списком будущих шагов.

- Kind: terminology / workflow boundary
- Evidence status: **direct fresh clarification + older item family**
- Current coverage: **Частично и неточно: текущая терминология включает в Action Log также decisions и next steps.**
- Disposition: Вернуть `ITEM-12A` как terminology-correction brick; объединить старые `ITEM-37A` и `ITEM-54`.
- Required documentation action:
  - core Action Log = действия, которые уже были совершены, и произведённые operational changes;
  - полная Conversation History остаётся отдельным evidence record;
  - будущие действия/next steps остаются planning/task material, а не выполненным Action Log entry;
  - decision may be linked as rationale, but should not masquerade as a completed action.
- Owner candidate: terminology + Chat/Action workflow
- Direct source excerpts:
  - SRC-N46
  - SRC-N47
- Older supporting items:
  - `ITEM-12A`, `ITEM-37A`, `ITEM-54`.
- Explanation: Это уточняет старое понятие, а не создаёт второй параллельный лог.

<a id="item-12b"></a>
### ITEM-12B / ACTION-LOG-CAPTURE — A template-linked AI response may contain a proposed completed-action delta that the app reviews and adds to the Action Log.

- Kind: app execution / chat integration
- Evidence status: **direct fresh source + older register-derived item**
- Current coverage: **Отсутствует.**
- Disposition: Update old `ITEM-12B`; keep duplicate `ITEM-37B` merged.
- Required documentation action:
  - a response template may define a machine-readable or app-recognizable completed-action block;
  - the app shows a proposed Action Log delta;
  - accepted entries receive stable identity and answer link;
  - empty/non-action answers do not create artificial entries;
  - `RN/DAM` are user-authored annotations and are never generated as Action Log entries;
  - exact syntax is owned by `ITEM-116` implementation planning.
- Owner candidate: Action Log Capture workflow
- Direct source excerpts:
  - SRC-N46
  - SRC-N47
  - SRC-N66
  - SRC-N67
  - SRC-N68
- Older supporting items:
  - `ITEM-12B`: machine-readable action-log blocks;
  - `ITEM-37B`: tool/script extraction from assistant output.
- Explanation: The semantic requirement is the reviewed answer-to-action bridge, not one hardcoded block syntax.

<a id="item-109"></a>
### ITEM-109 / ANSWER-CHANGESET — Some template-linked AI responses contain an Answer Change Set listing work-state records added in the context of that answer.

- Kind: provenance / chat-to-work-state bridge
- Evidence status: **direct fresh user statement**
- Current coverage: **Отсутствует.**
- Disposition: Update the item and place it inside the wider `ITEM-116` response model.
- Required documentation action:
  - an answer may have an optional `Answer Change Set`;
  - confirmed minimum:
    - Added Action Log Entries;
    - Added Planning Items;
  - entries link to canonical log/item records rather than duplicating untracked prose;
  - show the delta beside or inside the stored answer;
  - do not require a delta when the answer changed nothing;
  - merely referenced items are not “added items”;
  - user `RN/DAM` are outside AI-generated Answer Change Sets;
  - later consider Updated/Superseded Items separately.
- Owner candidate: Chat History And Work Trace workflow
- Direct source excerpts:
  - SRC-N47
  - SRC-N48
  - SRC-N67
  - SRC-N68
- Explanation: Answer Change Set is one structured section of a larger response document, not the response format by itself.

<a id="item-115"></a>
### ITEM-115 / USER-RAW-ANNOTATIONS — The application supports user-authored literal `RN` and `DAM` annotations attached to the nearest preceding addressable fragment.

- Kind: raw capture / annotation workflow
- Evidence status: **direct fresh user clarification**
- Current coverage: **Absent.**
- Disposition: New active item.
- Required documentation action:
  - annotation kinds:
    - `RN` — Raw Note;
    - `DAM` — Deferred Attention Marker;
  - only the user creates `RN` or `DAM`;
  - both attach to the nearest preceding semantic fragment;
  - `RN` may contain one note or an ordered/numbered set;
  - preserve literal wording, order and numbering;
  - do not analyze, rewrite, promote or merge automatically;
  - `DAM` means the target needs future attention but does not itself formulate a question/concern;
  - no proactive reminder behavior;
  - possible addressable targets include chat/turn/message fragment, answer fragment, Planning Item, Reference Object, object field, Documentation File, File Location and Action Log Entry;
  - when the target is a Reference Object, optional fields are one possible implementation;
  - high-volume acceptance:
    - search;
    - filter;
    - group by target;
    - processed/unprocessed state;
    - bulk review;
    - stable attachment after target updates;
    - acceptable performance with many annotations.
- Owner candidate: Raw Annotation workflow
- Direct source excerpts:
  - SRC-N62
  - SRC-N63
  - SRC-N64
  - SRC-N65
  - SRC-N66
  - SRC-N67
- Explanation: Raw annotations preserve user intent before interpretation while remaining deliberately outside canonical item state.

<a id="item-116"></a>
### ITEM-116 / TEMPLATE-LINKED-AI-RESPONSE — An AI response can be an immutable file-like system document whose recommended task template defines the required resolvable links.

- Kind: AI response integration / navigation
- Evidence status: **direct fresh user clarification**
- Current coverage: **Absent.**
- Disposition: New active item.
- Required documentation action:
  - display a structured AI answer as a file-like document in the application;
  - response type/task selects a recommended response template;
  - the template defines which sources/entities must be linked for review;
  - link important referenced managed sources rather than every ordinary word;
  - possible targets:
    - Documentation File;
    - File Location;
    - Planning Item;
    - Reference Object;
    - Object Field;
    - Action Log Entry;
    - another stored answer;
  - an object/item reference may use only its stable ID when the app can resolve it;
  - open targets through IDE-like tabs;
  - distinguish existing references from proposed items/actions/document changes;
  - allow Answer Change Set sections through `ITEM-109`;
  - permit explicit materialization/copy to Markdown without automatically making the response canonical documentation;
  - stored historical answer is immutable for now;
  - do not pin links to historical object/file versions;
  - show a historical warning that linked entities may have changed;
  - do not repair historical links automatically and do not place them in normal stale queues;
  - exact machine-readable syntax and template catalogue remain implementation/prototype planning.
- Owner candidate: AI Response Document workflow
- Direct source excerpts:
  - SRC-N68
  - SRC-N72
  - SRC-N73
  - SRC-N74
  - SRC-N75
- Related active items:
  - `ITEM-11B`, `ITEM-12B`, `ITEM-35B`, `ITEM-94`, `ITEM-109`, `ITEM-114`.
- Explanation: The central requirement is verifiable navigation from AI prose to the exact managed sources it relies on.

<a id="item-110"></a>
### ITEM-110 / SEMANTIC-ITEM-KEY — Every Planning Item has a stable numeric ID and a short meaningful code name, while its full canonical body remains as detailed as semantically necessary.

- Kind: item identity / navigation quality
- Evidence status: **direct fresh user statement**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow; reusable terminology/registry synchronization remains pending.**
- Disposition: **Keep active; connect compact identity to `ITEM-120` without limiting the full body.**
- Required documentation action:
  - numeric ID remains stable historical identity;
  - code name is short, meaningful and unique inside the relevant registry;
  - references preferably show both: `ITEM-110 / SEMANTIC-ITEM-KEY`;
  - code name improves search, navigation, tabs and human memory;
  - display title/summary may be concise;
  - the short code name, title or list preview must never become a limit on the canonical item body;
  - the complete description remains accessible from every compact representation;
  - concise navigation metadata must not imply that irrelevant verbosity is desirable—the full body is detailed only as far as complete meaning requires;
  - if a code name changes because meaning changed, preserve the old alias/history.
- Accepted workflow placement: item identity and complete-meaning phase of `complete-pictures/planning-items-and-full-picture/full-picture.md`; reusable terminology/registry contract later.
- Direct source excerpts:
  - SRC-N49
  - SRC-N81
- Explanation: Compact identity and semantically sufficient detail solve different problems and must not be conflated.

#### Accepted recent-chat reconciliation expansion

Compact identity remains navigation metadata. Review-time `CHAT-PI-*` and `RESULT-*` labels are preserved as provenance/mapping aliases and do not automatically become canonical numeric item identities. A new `ITEM-*` is assigned only when an independently useful product meaning has no surviving current owner.

<a id="item-41"></a>
### ITEM-41 / ITEM-BRICK-REUSE — Reviewed Planning Items and Concern Definitions are durable reusable bricks; raw annotations and target-specific concern applications keep their own boundaries.

- Kind: reusable work principle / derived-document rule
- Evidence status: **direct fresh source + older item support**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow for durable item reuse, item-backed synthesis and recursive child-picture references; reusable-method synchronization remains pending.**
- Disposition: **Keep active and update workflow placement.**
- Required documentation action:
  - free-form input may first survive as source-linked items or literal `RN/DAM`;
  - `RN/DAM` are not silently treated as reviewed bricks;
  - a reviewed Planning Item is a durable canonical planning brick;
  - a Concern Definition is a reusable canonical question/direction;
  - a Concern Preset is a reusable configuration of Concern Definitions;
  - an Applied Concern is target-specific and must not merge statuses/results across different targets;
  - one Concern Definition may be reused by many Applied Concerns without copying independent definitions into every file;
  - Full Picture synthesis links back to supporting canonical items;
  - accepted results of concern work return to the relevant item and Full Picture;
  - item reuse must preserve its full canonical meaning, including examples and qualifications required by `ITEM-120`;
  - every older item receives an explicit disposition:
    - active brick;
    - merged duplicate;
    - reusable-methodology owner;
    - deferred implementation;
    - unresolved;
    - superseded/withdrawn;
  - no item or annotation disappears because it did not fit the latest prose;
  - no duplicate remains as a separate active brick when one canonical item owns the meaning.
- Accepted workflow placement: item reuse and Full Picture synthesis phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`; reusable drafting/registry owners remain later synchronization targets.
- Direct source excerpts:
  - SRC-N54
  - SRC-N55
  - SRC-N62
  - SRC-N63
  - SRC-N65
  - SRC-N79
  - SRC-N81
- Older supporting items:
  - `META-04`, `ITEM-41`, `ITEM-62`, `ITEM-71`, `ITEM-78`.
- Explanation: Reuse belongs to stable meanings; target-specific state and raw pre-interpretation material remain linked rather than flattened into one text.

#### Accepted recent-chat reconciliation expansion

Full Pictures may recursively reference child Full Pictures that live in their own canonical homes. Parent synthesis keeps readable summaries/references; child pictures own their complete local meaning. Significant Full Picture statements trace to contributing Planning Items without copying item bodies into a second independently edited source of truth.

<a id="item-98"></a>
### ITEM-98 / PLANNING-TO-DOC-PIPELINE — Planning proceeds from sufficiently complete items through an item-backed Full Picture, explicit repository semantic reconciliation, scale-appropriate concern review and justified deeper work.

- Kind: external workflow integration
- Evidence status: **direct user statement + reusable methodology support**
- Current coverage: **Covered by the accepted project-local Planning Item/Full Picture workflow; reusable Planning Item Formation and exact review-template synchronization remain pending.**
- Disposition: **Keep active and update workflow placement; do not hard-code planning as the whole product and do not introduce a separate Planning Item Candidate entity.**
- Required documentation action:
  - workflow:
    ```text
    free-form input
      → optional user RN/DAM capture
      → purposeful, sufficiently complete Planning Items
      → lightweight purpose/necessity/relationship check
      → targeted repository semantic check during item creation/update
      → lightweight base and item-kind concern check
      → high-level Full Picture / Planning Draft assembled from reviewed items
      → relevant task/domain/file-type concern presets shown as suggestions
      → applicability review and Applied Concerns
      → detailed item/group/picture coverage pass
      → separate deep work only where justified
      → update Applied Concerns, canonical items and Full Picture
      → mandatory repository semantic reconciliation before File Update Plan
      → explicit old → new meaning review
      → document/object placement
      → file and diff review
    ```
  - form or update the Planning Item directly; do not create a separate persisted candidate entity/state;
  - during creation/update of a Planning Item, perform a targeted check of relevant current items, principles, workflows, decisions and canonical owners when repository context is available;
  - keep the default check proportional and focused on likely semantic matches rather than scanning unrelated repository areas;
  - when the user explicitly asks to check current documentation, show the matches, relations and proposed item effect as an explicit review;
  - before every File Update Plan, perform and show complete repository semantic reconciliation for every meaning that may be added, corrected, narrowed, replaced, superseded or moved;
  - inspect the active canonical owner and, when available, the source-linked Planning Items/Source Excerpts from which the relevant principle, workflow or definition was derived;
  - distinguish at least:
    - already covered;
    - supports;
    - extends;
    - clarifies;
    - corrects;
    - conflicts;
    - replaces/supersedes;
    - different scope;
    - new meaning;
  - repository text proves what current documentation says, not automatically that the current wording is the correct final decision; owner, status, active/deprecated role, checked facts and later explicit user corrections must be considered;
  - before issuing the File Update Plan, show an explicit review containing:
    - existing meaning;
    - new meaning;
    - relation;
    - source/reason;
    - canonical owner;
    - affected dependent files;
    - proposed integration/change;
    - unresolved choice when meanings cannot safely coexist;
  - no active meaning may be silently deleted, narrowed, replaced or moved;
  - clear duplication/support/extension may be reconciled in the proposed plan, while unresolved direct contradiction/replacement requires an explicit user choice;
  - the reconciliation result is a review section/output, not a new application entity by default;
  - base/item-kind concerns may be checked during item creation;
  - task/domain/file-type presets may be introduced when the corresponding target or context is known;
  - after the Full Picture exists, repeat the concern/lens review more systematically;
  - the Full Picture may use linked item blocks, groupings, summaries and optional explanatory text;
  - no arbitrary item-length rule may force meaningful context out of the canonical item;
  - planning meaning introduced outside a canonical item should link to a supporting item, become a new Planning Item or remain explicitly marked as an inference/question;
  - not every source fragment becomes an item;
  - not every suggested concern is applicable;
  - not every Applied Concern receives a separate file/object immediately;
  - results of deeper work return to the Applied Concern, relevant items and Full Picture.
- Owner: `complete-pictures/planning-items-and-full-picture/full-picture.md` + reusable application-planning drafting/update-plan preflight.
- Direct source excerpts:
  - SRC-N14
  - SRC-N15
  - SRC-N56
  - SRC-N57
  - SRC-N59
  - SRC-N78
  - SRC-N79
  - SRC-N80
  - SRC-N81
  - SRC-N82
  - SRC-N83
- Older supporting items:
  - reusable `ITEM-17`: initial categorization is only the first pass;
  - `ITEM-21`, `ITEM-38`, `ITEM-39`, `ITEM-41`, `ITEM-45`, `ITEM-46`, `ITEM-55`, `ITEM-65`.
- Explanation: Simplicity-first controls premature structure, not semantic completeness. Repository reconciliation is an explicit workflow gate, not a new item-candidate object: it prevents duplicate meaning and silent semantic replacement before literal file updates.

#### Accepted recent-chat reconciliation expansion

Planning Item formation now has two review/delivery modes:

```text
portable Markdown mode
  → complete review block
  → explicit acceptance
  → full updated portable ledger;

application-native mode
  → structured response review
  → explicit acceptance
  → immediate managed Planning Item Reference Object creation.
```

The route must expose both modes; the portable mode remains a fallback until deliberately retired. The main AI explanation may be the complete accumulating item meaning and must not be replaced by a shorter lossy duplicate in the final review block.

<a id="item-112"></a>
### ITEM-112 / ITEM-ROLE-RELATION-MODEL — Every reviewed Planning Item has a purpose, appropriate scale, semantic role and explicit relations where they improve meaning.

- Kind: planning methodology support / item semantics
- Evidence status: **direct fresh user clarification**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow for item purpose, scale, roles, relations and Direction membership; reusable formation/registry synchronization remains pending.**
- Disposition: **Keep active and update workflow placement; reusable `ITEM-17/21/38/39` remain methodology owners rather than duplicate product requirements.**
- Required documentation action:
  - during item creation ask minimally:
    - what the item states;
    - why it is needed;
    - which task/outcome/planning direction it belongs to;
    - what scale of work it represents;
    - whether it is a requirement or supports another item;
    - whether it is an implementation idea rather than a requirement;
    - whether equivalent meaning is already known in the current working context;
  - during item creation/update, inspect relevant current items, principles, workflows and their source-linked origins when repository context is available;
  - when the user explicitly requests repository comparison, expose that check as a visible review before finalizing the item;
  - complete repository semantic reconciliation is mandatory again before any File Update Plan, even if a lighter targeted item-time check was already performed;
  - this check does not create a separate candidate entity; it may merge, extend, correct, relate or retain the Planning Item based on the explicit review;
  - candidate scales/kinds include:
    - Goal;
    - Initiative;
    - Workstream;
    - Requirement;
    - Acceptance Criterion;
    - Supporting Idea;
    - Implementation Idea;
    - Question;
    - Risk;
    - Assumption;
    - Evidence;
    - Prototype Need;
    - Action;
    - Decision;
  - a large task such as `Develop Documentation Workbench` may be one initiative-level Planning Item;
  - smaller items may belong to, support, refine or implement that initiative;
  - candidate relations include:
    - `part of`;
    - `contains`;
    - `belongs to direction`;
    - `supports`;
    - `refines`;
    - `defines acceptance for`;
    - `implements`;
    - `tests`;
    - `provides evidence for`;
    - `depends on`;
    - `alternative to`;
    - `contradicts`;
    - `supersedes`;
    - `derived from`;
  - do not force every relationship into a strict tree; typed graph relations remain valid;
  - concerns must be applied at the scale that owns the uncertainty:
    - initiative longevity belongs to the initiative;
    - a local UI-label item should not independently inherit every initiative-level concern;
  - Planning Items remain first-class Reference Objects and have a dedicated view in Planning Draft contexts;
  - item kind/category/status may be used by `ITEM-118` views and `ITEM-97` recommendations;
  - full item detail is governed by `ITEM-120`, not by the short code name or list preview;
  - treat vocabularies as candidates to simplify through real usage, not hardcoded final enums.
- Accepted workflow placement: item formation, targeted checking and relation review phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`.
- Direct source excerpts:
  - SRC-N57
  - SRC-N58
  - SRC-N59
  - SRC-N60
  - SRC-N78
  - SRC-N80
  - SRC-N81
  - SRC-N82
  - SRC-N83
- Older support:
  - reusable `ITEM-17`, `ITEM-21`, `ITEM-38`, `ITEM-39`, `ITEM-47`, `ITEM-52A`.
- Explanation: The same item model can represent a local requirement or an initiative without losing scale, relations or sufficient detail.

#### Accepted recent-chat reconciliation expansion

Direction membership is modeled through broad Directions that own a topology of independently useful whole use cases. Use cases are supported capabilities, not mandatory universal stages. Internal mandatory workflow steps remain inside one Complete Picture unless they have an independent trigger, result and lifecycle.

<a id="item-113"></a>
### ITEM-113 / PLANNING-DEEPENING-LINK — Planning lenses and reusable concern definitions may lead to target-specific Applied Concerns whose substantial work remains linked to the owning item, direction or file.

- Kind: planning methodology support / deepening workflow
- Evidence status: **direct fresh user clarification**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow for Applied Concern lifecycle/deepening; catalogue/preset/application review remains with `ITEM-119`.**
- Disposition: **Keep active; delegate catalogue, preset, suggestion and applicability review to `ITEM-119`.**
- Required documentation action:
  - distinguish:
    - **Planning Lens** — reusable perspective used to inspect planning;
    - **Concern Definition** — reusable named question/direction;
    - **Concern Preset** — recommended set of Concern Definitions;
    - **Concern Suggestion / Candidate Concern** — a concern proposed for a target but not yet applied;
    - **Applied Concern** — one Concern Definition accepted for tracking on one concrete target;
    - **Concern Work Target** — object/file/location containing separate deep work;
  - a lens check or preset suggestion does not always create an Applied Concern;
  - suggestion-review dispositions may include:
    - apply;
    - not applicable;
    - already covered;
    - covered at parent/full-picture level;
    - defer review;
  - candidate Applied Concern lifecycle states may include:
    - open;
    - deferred;
    - needs separate work;
    - resolved;
  - candidate concerns/lenses include:
    - Need And Value;
    - Acceptance;
    - Necessity;
    - Existing Solutions;
    - Alternatives;
    - Branches;
    - Evidence;
    - Risks And Assumptions;
    - Prototype Need;
    - Dependencies;
    - Implementation;
    - Future Relevance;
    - Portability/Migration where relevant;
  - Concern Suggestions may originate:
    - manually;
    - from a base-item preset;
    - from an item-kind preset;
    - from a task/domain preset;
    - from a file-type preset;
  - one target + one Concern Definition should normally produce at most one active Applied Concern even when several sources proposed it;
  - preserve all contributing preset/manual-source links;
  - during item creation perform only the applicable lightweight check;
  - after the Full Picture exists, repeat a systematic deeper pass over items, item groups and the picture;
  - an Applied Concern may remain a compact record or link to a separate Reference Object, Documentation File or File Location under `ITEM-114`;
  - separate work is created only when independent depth/lifecycle justifies it;
  - accepted results update:
    - Applied Concern status/summary;
    - relevant Planning Item;
    - Full Picture when shared understanding changes;
    - resulting Decisions/Actions when applicable;
  - deeper-planning objects use ordinary categories/statuses, allowing `ITEM-118` views to display them.
- Accepted workflow placement: concern review, justified deepening and feedback phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`.
- Direct source excerpts:
  - SRC-N56
  - SRC-N57
  - SRC-N59
  - SRC-N60
  - SRC-N61
  - SRC-N78
  - SRC-N79
  - SRC-N80
- Older support:
  - reusable `ITEM-17`, `ITEM-21`, `ITEM-43`, `ITEM-45`, `ITEM-46`, `ITEM-65`, `ITEM-69`.
- Explanation: Reusable questions, pre-application suggestions and target-specific planning state are separated so review results do not create premature or duplicate concerns.

#### Accepted recent-chat reconciliation expansion

Concern work exposes elaboration observability rather than one opaque quality score. Derived indicators may show unreviewed suggestions, open questions, unverified assumptions, risks, prototype/test needs, blocked/deferred work and resolved work. Common lifecycle state and concern-type-specific assessment remain distinct and must be reviewed before hardcoding final enums.

<a id="item-119"></a>
### ITEM-119 / CONCERN-PRESET-SYSTEM — The application supports reusable Concern Definitions and multiple Concern Presets that may jointly propose scale-appropriate concerns for items, directions and files.

- Kind: planning support / concern catalogue, suggestion and application review
- Evidence status: **direct fresh user statement**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow for product-local concern suggestion/application review; reusable catalogue/preset synchronization remains pending.**
- Disposition: **Keep active and update workflow placement.**
- Required documentation action:
  - define reusable **Concern Definition** identity with:
    - stable ID/code name;
    - title;
    - question/description;
    - category/domain;
    - optional applicability guidance;
    - optional suggested result/work types;
  - define **Concern Preset** as a reusable collection of Concern Definition references;
  - candidate preset kinds/sources include:
    - Base Planning Item;
    - Item-Kind;
    - Task/Domain;
    - File-Type;
  - manual concern addition is a separate suggestion/application source, not a preset kind;
  - confirmed first target classes:
    - Planning Item;
    - Planning Direction;
    - Documentation File;
  - candidate later targets:
    - File Location;
    - Folder;
  - multiple presets may be selected or recommended together for one target;
  - application flow:
    ```text
    select target
      → select/apply one or more recommended presets
      → derive Concern Suggestions / candidate concerns
      → review each suggestion
      → create/update only selected Applied Concerns
    ```
  - Concern Suggestion is distinct from Applied Concern and may remain transient or be persisted according to later lifecycle decisions;
  - candidate suggestion-review dispositions:
    - Pending Review;
    - Apply;
    - Not Applicable;
    - Already Covered;
    - Covered At Parent Level;
    - Covered At Full-Picture Level;
    - Review Deferred;
  - candidate Applied Concern statuses:
    - Open;
    - Deferred;
    - Needs Separate Work;
    - Resolved;
  - a preset recommends attention; it does not mandate applicability;
  - applying/evaluating a preset does not automatically:
    - create document sections;
    - create deep-work files/objects;
    - create duplicate Applied Concerns;
    - declare the target incomplete;
  - deduplicate suggestions by target + Concern Definition while preserving all contributing:
    - presets;
    - file-type recommendations;
    - item-kind recommendations;
    - task/domain recommendations;
    - manual sources;
  - if the target already has the Applied Concern, additional sources update provenance rather than creating another active application;
  - nested preset inclusion/inheritance is a candidate capability, not yet a confirmed requirement; cycle prevention, overrides and source tracking must be planned before adoption;
  - apply concerns at the scale that owns the uncertainty;
  - example task/domain content for an application-development initiative may include:
    - Product Need;
    - User/Workflow Value;
    - Existing Solutions;
    - Build Versus Integrate;
    - Application Form;
    - Platform Dependence;
    - Data Ownership;
    - Source Of Truth;
    - Git Integration;
    - AI Integration;
    - Browser/Chat Integration;
    - Security And Permissions;
    - Future Relevance;
    - Portability And Migration;
    - Maintainability;
    - Dependency Aging;
    - Scale And Performance;
    - Failure And Recovery;
    - Reversibility;
  - exact concern catalogue, suggestion persistence and nested preset composition remain documentation/planning work rather than hardcoded final enums;
  - file-type assignment is owned by `ITEM-97`;
  - Applied Concern lifecycle/deepening is owned by `ITEM-113`;
  - concern suggestion/application views are owned by `ITEM-118`.
- Accepted workflow placement: concern suggestion and applicability-review phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`.
- Direct source excerpts:
  - SRC-N79
  - SRC-N80
  - SRC-N81
- Older support:
  - reusable `ITEM-17`, `ITEM-21`, `ITEM-43`, `ITEM-52A`, `ITEM-65`, `ITEM-69`.
- Explanation: Presets make repeatable planning attention available, while the suggestion stage prevents candidate questions from becoming mandatory structure or target-specific concerns before review.

#### Accepted recent-chat reconciliation expansion

The default pre-application state is explicitly observable as not reviewed/pending review. Presets and manual sources may jointly suggest one concern for a target, but only review creates or updates the target-specific Applied Concern. Dashboard-like views are projections over this state, not a separate concern subsystem or a new Complete Picture.

<a id="item-120"></a>
### ITEM-120 / SEMANTICALLY-COMPLETE-ITEM — A Planning Item has no arbitrary length cap; its canonical body occupies as much space as needed to transmit its complete meaning.

- Kind: item authoring principle / semantic completeness
- Evidence status: **direct fresh user statement**
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow; reusable authoring-principle synchronization remains pending.**
- Disposition: **Keep active and reusable-principle candidate.**
- Required documentation action:
  - do not impose a fixed word, paragraph, line or screen-length limit on a Planning Item;
  - include inside the canonical item every element required to understand and correctly reuse its meaning, which may include:
    - detailed statement;
    - rationale/purpose;
    - examples and counterexamples;
    - important distinctions;
    - exceptions and edge cases;
    - acceptance detail;
    - dependencies and relations;
    - consequences;
    - source context where needed;
    - explicit unresolved ambiguity;
  - use compact identity separately:
    - stable numeric ID;
    - short semantic code name;
    - concise display title;
    - optional summary/preview;
  - compact representations must link to and never replace the complete canonical body;
  - UI truncation/collapse is presentation only and must preserve access to the full item;
  - AI extraction, export, synthesis and deduplication must not silently discard examples, qualifications or constraints merely to shorten the item;
  - split an item only when parts have independent:
    - semantic claims;
    - ownership;
    - lifecycle/status;
    - review or acceptance;
    - reuse;
    - decisions/actions;
    - work targets;
  - do not split solely because:
    - the item is long;
    - it occupies several paragraphs;
    - examples are necessary;
    - the UI list should stay compact;
  - do not use this principle to justify unrelated accumulation:
    - remove irrelevant prose;
    - avoid copying the same meaning into several items;
    - move genuinely independent deep work to linked objects/files;
  - when splitting is justified, preserve relations and a parent/summary item where the combined meaning still matters;
  - Full Picture may summarize an item, but the item remains the complete source for its planning meaning.
- Accepted workflow placement: complete proposed-item meaning and review phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`.
- Direct source excerpts:
  - SRC-N81
- Related active items:
  - `ITEM-41`, `ITEM-98`, `ITEM-106`, `ITEM-110`, `ITEM-112`.
- Older support:
  - `META-04`, `ITEM-47`, `ITEM-62`, `ITEM-65`, `ITEM-78`.
- Explanation: Simplicity-first prevents unnecessary structure and duplication; it does not require compressing away meaning that the item must preserve.

#### Accepted recent-chat reconciliation expansion

At planning stages that precede later Full Picture reconciliation, the detailed document-ready explanation produced in the main answer is the accumulating item meaning. The final review block should reuse or materialize that complete meaning instead of generating a second shorter paraphrase. Later reconciliation may simplify, correct, merge or split it explicitly.


## F2. Accepted recent-chat additions — independently useful product meanings

<a id="item-121"></a>
### ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER — Structured User Message Composer preserves literal wording while helping the user separate topics, subtopics, ideas, questions, corrections and examples before sending a long message.

- Semantic name: **Structured User Message Composer**.
- Kind: user input composition / source-addressability workflow.
- Evidence status: **direct user proposal + accepted reconciliation**.
- Current coverage: **Covered as an optional upstream step of the accepted Planning Item/Full Picture workflow; detailed Chat/AI/Work-State integration remains provisional.**
- Disposition: **New active item.**
- Required documentation action:
  - allow a lightweight topic/subtopic/idea structure without forcing a rigid template;
  - preserve literal wording and user order rather than silently normalizing the source;
  - give addressable fragment identities that later source relations can target;
  - support questions, corrections, examples and explicit proposed-item boundaries;
  - keep unstructured writing possible;
  - treat the structure as an aid to source mapping, not proof that every fragment is a separate Planning Item;
  - keep exact UI, storage and editor behavior as later implementation/prototype work.
- Accepted workflow placement: optional source-capture step of `complete-pictures/planning-items-and-full-picture/full-picture.md`; future semantic use-case registry entry.
- Source provenance: accepted recent-chat review set, especially `CHAT-PI-020`; complete source messages are preserved in the imported source appendix below.
- Explanation: The workflow reduces source ambiguity and cognitive burden before AI interpretation while keeping the original user text as evidence.

<a id="item-122"></a>
### ITEM-122 / TYPED-SOURCE-CONTRIBUTIONS — Planning Items and source messages/fragments use typed many-to-many contribution relations that survive merge, split, correction and supersession.

- Semantic name: **Typed Source Contribution Model**.
- Kind: source/provenance relation model.
- Evidence status: **direct user proposal + accepted reconciliation**.
- Current coverage: **Covered by the accepted Planning Item/Full Picture workflow and canonical source register; reusable terminology synchronization remains pending.**
- Disposition: **New active item.**
- Required documentation action:
  - one item may use several source messages/fragments;
  - one source message/fragment may support several items;
  - initial contribution roles include Primary, Supporting, Clarifying, Correcting, Contradicting, Example and Confirmation;
  - preserve chronological order, exact anchors and complete source-message context;
  - merge items by combining/deduplicating contribution relations without losing roles or provenance;
  - split items may keep the same source contribution on several resulting items;
  - rejected/superseded item meaning does not erase its source relation;
  - do not introduce a separate Source Idea entity now.
- Accepted workflow placement: source capture, item transformation and provenance phases of `complete-pictures/planning-items-and-full-picture/full-picture.md`; reusable source terminology later.
- Source provenance: accepted recent-chat review set, especially `CHAT-PI-021`; complete source messages are preserved in the imported source appendix below.
- Explanation: Source roles describe how evidence contributes to meaning without turning normalized AI interpretation into a replacement for the original message.

<a id="item-123"></a>
### ITEM-123 / CONFIGURABLE-APPLICATION-SETTINGS — Documentation Workbench exposes configurable values for conventions and behavior that should not be hardcoded, with controlled synchronization into AI-readable project documentation.

- Semantic name: **Configurable Application Settings**.
- Kind: application configuration / documentation synchronization capability.
- Evidence status: **direct user proposal + accepted reconciliation**.
- Current coverage: **Canonical product item exists; runtime storage/synchronization and project-readable convention projection remain unimplemented and are planned for a later batch.**
- Disposition: **New active item.**
- Required documentation action:
  - settings may include Planning Item delimiters, owner paths, labels, default views, parser options and other values that benefit from configuration;
  - first accepted Planning Item delimiter convention is opening `it(` and closing `)it`;
  - delimiters mark a user-proposed semantic boundary for review and do not create a separate Planning Item Candidate entity;
  - settings used by AI routes must have a project-readable representation;
  - changing a convention produces a controlled documentation/configuration update rather than blind global replacement;
  - application/runtime synchronization and exact settings storage remain implementation planning.
- Owner: future application settings/configuration workflow + planned `planning/planning-input-conventions.md` projection.
- Source provenance: accepted recent-chat review set, especially `CHAT-PI-024` and `CHAT-PI-025`; complete source messages are preserved in the imported source appendix below.
- Explanation: Configurability keeps conventions evolvable while preserving a reviewable documentation contract for AI and repository workflows.

## G. IDE-like navigation and file/folder views

<a id="item-35b"></a>
### ITEM-35B / IDE-TAB-NAVIGATION — The core UI uses multiple IDE-like tabs for files, objects, home contexts, dependency review and targets opened from AI responses.

- Kind: core UI / navigation
- Evidence status: **direct fresh statement + older item support**
- Current coverage: **Absent as a coherent application workflow.**
- Disposition: Expand active `ITEM-35B`.
- Required documentation action:
  - keep several files/objects/views open in parallel;
  - preserve the source tab while following references;
  - open canonical state and optional parent/home separately;
  - open Documentation File and File Location targets;
  - open a target directly from a template-linked AI response;
  - compare source and dependent context in separate tabs;
  - support ordinary back/forward/recent navigation where useful;
  - exact tab persistence and layout remain implementation planning.
- Owner candidate: IDE-Like Navigation workflow
- Accepted workflow placement: cross-step navigation and views phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N53
  - SRC-N61
  - SRC-N68
- Older supporting items:
  - `ITEM-35A`, `ITEM-35B`, `ITEM-48`.
- Explanation: The response document remains open while the user inspects each referenced target.

#### Accepted recent-chat reconciliation expansion

Navigation from an item or structured AI response must support opening the exact source turn/fragment, complete item body, semantic home, definition location and related Full Picture in separate IDE-like tabs while preserving the original response context.

<a id="item-114"></a>
### ITEM-114 / GENERAL-REFERENCE-TARGETS — Application references can resolve to a Reference Object, Documentation File or stable File Location, with target and relation semantics kept separate.

- Kind: reference/navigation model
- Evidence status: **direct fresh user clarification**
- Current coverage: **Object references exist; ordinary managed file/location targets do not.**
- Disposition: New active item.
- Required documentation action:
  - supported target types:
    - Reference Object;
    - Documentation File;
    - File Location / stable addressable fragment;
  - a managed object may be referenced compactly by stable object/item ID;
  - a file uses repository-relative identity/path;
  - a file location uses path plus stable anchor/address;
  - target answers “where does this link go?”;
  - relation answers “why does this link exist?”;
  - candidate relations include:
    - navigation only;
    - planning direction;
    - supports;
    - documented in;
    - work maintained in;
    - evidence source;
    - dependency requiring review;
  - a navigation-only file link does not create dependency invalidation by default;
  - unresolved/ambiguous targets must be visible rather than silently guessed.
- Owner candidate: General Reference And Navigation workflow
- Accepted workflow placement: authoring and references / target resolution phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N61
  - SRC-N72
  - SRC-N73
- Older support:
  - `ITEM-40`, `ITEM-48`, `ITEM-72`, `ITEM-74`, `ITEM-77`.
- Explanation: Unified navigation supports files and objects without pretending they have identical ownership or refresh behavior.

<a id="item-111"></a>
### ITEM-111 / HOME-RELATION-VOCABULARY — File-centric relation vocabulary uses information-flow direction: Home Object, Incoming Reference and Outgoing Use.

- Kind: terminology / file relation model
- Evidence status: **direct fresh clarification; exact labels remain reviewable**
- Current coverage: **Отсутствует; прежняя интерпретация ITEM-95 использовала обычное направление ссылки и не совпадала с пользовательским смыслом.**
- Disposition: Новый terminology item; использовать вместе с `ITEM-95`.
- Working terms:
  - **Home Object / домашний объект файла** — object whose optional `parent/home` points to the selected file or a place inside it;
  - **Incoming Reference / входящая ссылка** — reference located in the selected file whose target object has `parent/home` elsewhere; information enters the file from another place;
  - **External-Home Object / объект с внешним home** — target object of an Incoming Reference;
  - **Outgoing Use / исходящее использование** — occurrence in another file of an object whose `parent/home` is the selected file; information owned by the current file flows outward.
- Required documentation action:
  - explicitly state that incoming/outgoing use **information-flow viewpoint**, which is opposite to conventional graph-edge wording in some tools;
  - display relation role and target/home location to prevent ambiguity;
  - keep exact Russian UI labels reviewable until accepted.
- Owner candidate: terminology + File Relation View workflow
- Accepted workflow placement: cross-step navigation and views phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N50
  - SRC-N51
  - SRC-N52
- Explanation: Нельзя называть Home Object «входящим» только потому, что другие документы ссылаются на него; направление описывает поток информации относительно выбранного файла.

<a id="item-118"></a>
### ITEM-118 / CONFIGURABLE-RELATED-OBJECT-VIEWS — For a selected file or folder, the application derives manually configurable views of related Reference Objects and concern records.

- Kind: configurable view / object discovery
- Evidence status: **direct fresh user statement**
- Current coverage: **Covered as a cross-workflow view/projection capability; the accepted Planning Item workflow now defines concern/item observability and drill-down expectations.**
- Disposition: Expand the active item; concern suggestion/application behavior remains owned by `ITEM-119`, and Applied Concern lifecycle by `ITEM-113`.
- Required documentation action:
  - confirmed selected context:
    - Documentation File;
    - Folder through `ITEM-96`;
  - File Location is a candidate extension rather than a confirmed first-version scope;
  - selectable relation scopes may include:
    - canonical definition stored here;
    - parent/home is here;
    - reference occurrence is here;
    - object directly links to this file;
    - incoming/outgoing relation groups from `ITEM-95`;
    - deeper-planning target directly linked from an item represented in the file;
  - filters may use:
    - object category;
    - Planning Item kind/scale;
    - status;
    - planning direction;
    - Concern Definition;
    - Concern Preset source;
    - Concern Suggestion disposition;
    - Applied Concern status;
    - other recognized optional fields;
  - provide projections such as:
    - All Planning Items;
    - Open Questions;
    - Alternatives And Branches;
    - Pending Concern Suggestions;
    - Suggestions From A Selected Preset;
    - All Applied Concerns;
    - Open Applied Concerns;
    - Concerns Needing Separate Work;
    - Concern Work Targets;
  - manual selection of relation scopes, categories and statuses is always available;
  - recommended view presets come from file type/category under `ITEM-97`;
  - View Preset only displays existing objects/records:
    - it does not evaluate/apply a Concern Preset;
    - it does not create Concern Suggestions or Applied Concerns;
    - it does not alter canonical content;
  - counts must drill down to concrete objects, files, locations and occurrences;
  - opening a result uses IDE-like tabs under `ITEM-35B`;
  - direct versus transitive relationship expansion remains an open design question; every view must make its relation scope explicit.
- Owner: cross-workflow Related Object And Concern Views capability.
- Accepted workflow placement: cross-step navigation/views in `documentation-and-reference-object-end-to-end-workflow.md` and concern/item observability in `complete-pictures/planning-items-and-full-picture/full-picture.md`.
- Direct source excerpts:
  - SRC-N78
  - SRC-N79
  - SRC-N80
- Related active items:
  - `ITEM-95`, `ITEM-96`, `ITEM-97`, `ITEM-103`, `ITEM-106`, `ITEM-112`, `ITEM-113`, `ITEM-119`.
- Older support:
  - `ITEM-16B`, `ITEM-40`, `ITEM-48`, `ITEM-51`, `ITEM-71`.
- Explanation: Views expose selected existing state; they do not turn recommendations into suggestions or suggestions into applied planning work.

#### Accepted recent-chat reconciliation expansion

Views should expose derived concern/item observability with compact icons or counts and drill down to concrete records. They may include working, needs-documentation, documented/integrated, unresolved, deferred, absorbed/superseded and rejected Planning Item states. Views do not create or accept semantic state.

<a id="item-95"></a>
### ITEM-95 / HOME-RELATION-VIEW — File view separates Home Objects, Incoming References and Outgoing Uses using information-flow direction.

- Kind: file dependency view
- Evidence status: **direct fresh clarification; one count detail remains open**
- Current coverage: **Отсутствует.**
- Disposition: Keep active and provide relation primitives to `ITEM-118`.
- Required documentation action:
  - show **Home Objects** whose parent/home is the selected file/location;
  - show **Incoming References** located in the selected file but targeting External-Home Objects;
  - show **Outgoing Uses** in other files of the selected file's Home Objects;
  - allow drill-down from each relation to occurrence, object, canonical state and home;
  - show counts without hiding concrete files/occurrences;
  - expose these relation groups as selectable scopes in configurable related-object views;
  - do not force every category preset to show all three relation groups.
- Owner candidate: File Relation View workflow
- Accepted workflow placement: cross-step navigation and views phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Full source context:
  - SRC-N18
  - SRC-N32
  - SRC-N41
  - SRC-N50
  - SRC-N51
  - SRC-N52
  - SRC-N78
- Remaining clarification:
  - for Outgoing Uses, should the headline count be:
    1. number of distinct external files;
    2. number of reference occurrences;
    3. both values separately?
- Explanation: This item owns relationship direction; `ITEM-118` owns configurable projections over those and other direct file relations.

<a id="item-104"></a>
### ITEM-104 / DEFINITION-HOME-JUMP — From an Incoming Reference, the user can open the target object and jump separately to its canonical state and optional home context.

- Kind: object navigation
- Evidence status: **direct fresh clarification**
- Current coverage: **Частично: ID/path navigation exists conceptually, but incoming-reference → home behavior is not explicit.**
- Disposition: Уточнить `ITEM-104`.
- Required documentation action:
  - reference action `Open Object`;
  - action `Go To Canonical Definition/State`;
  - action `Go To Home` when parent/home exists;
  - for app-only general object without home, keep object/canonical-state navigation and hide/disable home action;
  - support opening targets in another IDE-like tab.
- Owner candidate: Object Navigation + IDE Tab Navigation
- Accepted workflow placement: cross-step navigation and views phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N34
  - SRC-N40
  - SRC-N52
  - SRC-N53
- Older support:
  - `ITEM-72`, `ITEM-74`, `ITEM-77`.
- Explanation: Home and canonical state remain distinct destinations.

<a id="item-96"></a>
### ITEM-96 / FOLDER-DEPENDENCY-VIEW — Folder view aggregates object, relation and category-based views across selected files, optionally including subfolders.

- Kind: folder aggregate view
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Expand existing item and reuse `ITEM-118` filtering/preset behavior.
- Required documentation action:
  - define recursive/non-recursive scope;
  - aggregate Home Objects, Incoming References, Outgoing Uses and other recognized direct relations;
  - allow category/kind/status filters over the folder result;
  - allow a compatible view preset to be applied at folder scope;
  - show counts with drill-down to concrete files, objects and occurrences;
  - avoid silently including unrelated transitive objects unless the chosen view explicitly requests them.
- Owner candidate: dependency navigation workflow
- Accepted workflow placement: cross-step navigation and views phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N19
  - SRC-N78
- Explanation: Folder overview is the same derived-view mechanism applied to a selectable collection of files.

<a id="item-97"></a>
### ITEM-97 / FILE-TYPE-GUIDANCE-ASSIGNMENTS — File categories/types independently recommend document templates, concern presets, view presets and validation rules.

- Kind: file classification / guidance assignment
- Evidence status: **direct user statement**
- Current coverage: **Template and view guidance exist, but concern-preset and validation-role separation is absent.**
- Disposition: Expand and rename the existing item without absorbing `ITEM-119` semantics.
- Required documentation action:
  - support file-category/type CRUD;
  - allow a file type to independently recommend:
    - Document Template;
    - Concern Presets;
    - View Presets;
    - Validation Rules;
  - Document Template recommends how the file may be structured;
  - Concern Preset recommends possible questions/directions to consider;
  - View Preset configures which existing related objects are displayed;
  - Validation Rule checks a condition and is neither a template section nor a concern;
  - a recommendation may be omitted independently for each mechanism;
  - applying a file type does not automatically:
    - create document sections;
    - create Applied Concerns;
    - create Reference Objects;
    - fail validation;
  - candidate concerns should be reviewed through `ITEM-119`;
  - related-object filtering/presentation is owned by `ITEM-118`;
  - users may always manually change active filters or add concerns outside recommendations;
  - confirmed Planning Draft view examples:
    - All Planning Items;
    - Open Questions;
    - Alternatives And Branches;
  - exact first template/preset/rule catalogue remains a documentation audit task.
- Owner candidate: file category and guidance-assignment workflow
- Accepted workflow placement: shape and category contracts phase of `documentation-and-reference-object-end-to-end-workflow.md`.
- Direct source excerpts:
  - SRC-N20
  - SRC-N78
  - SRC-N79
- Explanation: File type is an assignment point; each guidance mechanism retains its own semantics, lifecycle and application behavior.

## 5A. Accepted Transformation History

The following identities are no longer active items, but their full former responsibility and source mapping remain reviewable.

<a id="item-25b"></a>
### ITEM-25B / HYBRID-APP-MEMORY — Absorbed historical item

- Status: **absorbed after accepted reconciliation; not active**.
- Former semantic name: **Hybrid App Memory**.
- Surviving item: [`ITEM-23B / MARKDOWN-PRIMARY-TRUTH`](#item-23b), semantic name **Hybrid Source-of-Truth Model**.
- Preserved former meaning:
  - Markdown-backed state can be rebuilt from documentation;
  - app-only objects cannot be rebuilt from Markdown;
  - cache/index state differs from temporary app-owned canonical state;
  - export, backup and migration require later planning.
- Direct source excerpts preserved: `SRC-N7`, `SRC-N23`, `SRC-N39`.
- Transformation: normal Markdown/App-Memory ownership distinction merged into `ITEM-23B`; independent temporary durability debt remains active as `ITEM-108`.

<a id="item-102"></a>
### ITEM-102 / HOMELESS-GENERAL-OBJECT — Absorbed historical item

- Status: **absorbed after accepted reconciliation; not active**.
- Former semantic name: **Homeless General Object**.
- Surviving item: [`ITEM-91 / IN-FILE-HOME-OBJECT`](#item-91), semantic name **Optional Reference Object Home**.
- Preserved former meaning:
  - parent/home is optional;
  - a general Reference Object can exist without semantic parent context;
  - absence of home is not the withdrawn undefined-object category;
  - identity and editable canonical state still exist;
  - home remains distinct from canonical-state owner and definition location.
- Direct source excerpts preserved: `SRC-N33`, `SRC-N39`, `SRC-N40`.
- Transformation: home-present and home-absent states now belong to one optional-home responsibility under `ITEM-91`.

## 6. Non-item planning concerns and withdrawn candidates

### CONCERN / AI-KNOWLEDGE-SOURCE-AND-SYNC

- Status: **open planning concern; not an accepted standalone product requirement**
- Related active items:
  - `ITEM-23B / MARKDOWN-PRIMARY-TRUTH`;
  - `ITEM-34B / REPO-FILE-FOLDER-ROUNDTRIP`;
  - `ITEM-107 / AI-EXPANDED-COPY`;
  - `ITEM-11B / CHAT-HISTORY-LEDGER`;
  - `ITEM-109 / ANSWER-CHANGESET`;
  - `ITEM-116 / TEMPLATE-LINKED-AI-RESPONSE`.
- Question:
  ```text
  How does AI obtain current identifiers, documentation and app-only entities
  well enough to create correct resolvable links?
  ```
- Candidate directions to compare:
  - Git/GitHub access to canonical documentation;
  - auxiliary Markdown object-store/registry files;
  - auxiliary JSON read/export models;
  - action/history/change deltas after an earlier full read;
  - repository archive upload for bootstrap or fallback;
  - direct application integration;
  - combinations of the above.
- Mandatory investigation:
  - measure actual GitHub-tool single-file and range-reading limits;
  - test large Markdown files and several-file workflows;
  - determine a safe recommended file-size range from evidence;
  - split documents only when semantic responsibility/lifecycle or measured tool limits justify it;
  - decide whether auxiliary app-state files are Source of Truth, export/read model or temporary bridge.
- Direct source support:
  - SRC-N69
  - SRC-N70
  - SRC-N71
  - SRC-N72
  - SRC-N76
  - SRC-N77
- Note: Action Log/history may reduce repeated reading, but they do not replace access to current Source of Truth when verification is necessary.

### Withdrawn candidate — `ITEM-117 / TASK-SCOPED-AI-CONTEXT`

- Status: **withdrawn before canonical item creation**
- Reason: The user requirement concerned exact resolvable links inside an AI response, not mandatory minimization or automatic dependency-closure selection of context.
- Preserved useful remainder: context transport and app-only state synchronization stay inside `AI-KNOWLEDGE-SOURCE-AND-SYNC`.

## 7. Complete old-item brick audit

Reading rule:

- **active canonical brick** — the old ID remains a direct current brick;
- **merged / split / updated** — meaning survives under the listed canonical owner; the old row is not a second active requirement;
- **reusable or non-product owner** — useful meaning belongs in reusable methodology or repo documentation, not in the application picture;
- **deferred implementation** — retained, but not part of current core behavior;
- **unresolved / not reconfirmed** — preserved for review rather than guessed or deleted.

| Old ID | Old meaning | Disposition | Canonical owner / note |
|---|---|---|---|
| `META-01` | Draft-making principles and corrections are themselves planning items. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `META-02` | Do not jump from a raw idea directly to file update; first preserve planning meaning and evidence. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `META-03` | A draft should show what source text caused an item or decision. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `META-04` | Repeated support should be grouped: one item may have multiple source excerpts. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `META-05` | Meaning-level draft review can happen before repository work. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-01` | Review workflow needs explicit review stages and review objects. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-02` | Long AI answers are overloaded when they combine too many directions and review objects. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-03` | Independent planning/file-update directions should be split early by default. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-04` | Coordinated directions are a special case that needs dependency-aware planning. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-05` | Living plan should grow from the start when feasible, not appear as a surprise at the end. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-06` | A local plan/update step needs parent-plan context. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-07` | Problem/planning draft navigation should show previous/current/next. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-08` | Key points should be attached to major draft points and explain local role in parent plan. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-09` | Source excerpts are required for reviewable planning items. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-10A` | Accepted AI understanding should become durable planning material before final file update. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-10B` | App stores accepted assistant interpretation in chat/workspace/item registry. | merged / split / updated | ITEM-22B / ITEM-94 / ITEM-109 / ITEM-116 |
| `ITEM-11A` | Conversation history can be planning evidence, not only transient chat. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-11B` | App/script stores full chat history with turns and topic/documentation status. | active canonical brick | ITEM-11B / CHAT-HISTORY-LEDGER |
| `ITEM-12A` | Action log is useful but distinct from conversation history. | active canonical brick | ITEM-12A / COMPLETED-ACTION-LOG |
| `ITEM-12B` | AI may emit machine-readable action-log blocks for capture by tool/app. | active canonical brick | ITEM-12B / ACTION-LOG-CAPTURE |
| `ITEM-13` | Literal files/draft sections still need review even after plan review. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-14` | Draft/section review can happen before commit/diff. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-15` | Future flow may commit snapshot then diff review, but this is not current mandatory default. | deferred implementation | optional commit-snapshot-before-diff flow |
| `ITEM-16A` | Review status should be explicit for items, drafts, files, decisions and object proposals. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-16B` | App UI shows review status/checkmarks/filtering. | active canonical brick | ITEM-16B / STALE-REFERENCE-QUEUE; generic filtering pattern also supports ITEM-118 |
| `ITEM-17` | Raw categorization is only first stage; deeper analysis follows. | reusable or non-product owner | reusable owner of the two-pass rule; application support: ITEM-112 / ITEM-113 / ITEM-119 / ITEM-98 |
| `ITEM-18` | Separate Result Workflow from Action Workflow. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-19` | Action Workflow should be a navigable end-to-end goal map. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-20` | Result Workflow also needs navigation because the desired future reality can be complex. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-21` | Goal-map analysis checks whether a step is needed and what it contributes. | reusable or non-product owner | reusable necessity/value owner; application support: ITEM-112 / ITEM-113 / ITEM-119 |
| `ITEM-22A` | Notes and linkable information can share a general InformationItem concept. | merged / split / updated | ITEM-86 / ITEM-22B / ITEM-103 |
| `ITEM-22B` | App implements notes/objects as one or compatible entity type. | active canonical brick | ITEM-22B / ITEM-TO-OBJECT |
| `ITEM-23A` | Markdown may be source of truth for some regions and snapshot/view for others. | merged / split / updated | ITEM-23B / ITEM-73 |
| `ITEM-23B` | App stores source-of-truth metadata per file region/object. | active canonical brick | ITEM-23B / MARKDOWN-PRIMARY-TRUTH |
| `ITEM-24` | Object-canonical-everything is deferred; real Markdown remains first-class. | merged / split / updated | ITEM-23B / ITEM-28B |
| `ITEM-25A` | Markdown should remain AI-readable context. | merged / split / updated | ITEM-105 / ITEM-107 |
| `ITEM-25B` | Structured JSON/object storage may support snapshots/imports. | merged / split / updated | absorbed into ITEM-23B / HYBRID SOURCE-OF-TRUTH MODEL; temporary durability remains ITEM-108 |
| `ITEM-26` | Archive assistant is future convenience, not raw-stage default. | deferred implementation | Archive Apply Assistant |
| `ITEM-27` | Terminology needs an early owner. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-28A` | Real Markdown files remain first-class documentation. | merged / split / updated | ITEM-28B |
| `ITEM-28B` | App works around real files and adds navigation/object metadata. | active canonical brick | ITEM-28B / DOC-LAYER-OVERLAY |
| `ITEM-29A` | Dependencies, links, duplication and source-of-truth boundaries must be explicit. | merged / split / updated | ITEM-29B |
| `ITEM-29B` | App visualizes and stores dependencies/links/canonical ownership. | active canonical brick | ITEM-29B / DEPENDENCY-GRAPH |
| `ITEM-30A` | App memory can materialize Markdown files/views when useful. | merged / split / updated | ITEM-32B / ITEM-107 |
| `ITEM-30B` | Generated Markdown should still be readable/reviewable. | merged / split / updated | ITEM-32B / ITEM-105 |
| `ITEM-31A` | Markdown text can propose app-memory objects. | merged / split / updated | ITEM-31B |
| `ITEM-31B` | App creates objects from file wrappers only after confirmation. | active canonical brick | ITEM-31B / CONFIRMED-OBJECT-DISCOVERY |
| `ITEM-32A` | A file may contain hardwritten and object-backed regions. | merged / split / updated | ITEM-32B |
| `ITEM-32B` | App manages mixed regions during read/write. | active canonical brick | ITEM-32B / MIXED-MARKDOWN-ROUNDTRIP |
| `ITEM-33A` | Object creation from file-import must be confirmable. | merged / split / updated | ITEM-31B |
| `ITEM-33B` | App asks before creating an object from a proposed-object region. | merged / split / updated | ITEM-31B |
| `ITEM-34A` | File/app synchronization can be bidirectional in principle. | merged / split / updated | ITEM-34B |
| `ITEM-34B` | App implements import/export/sync mechanisms. | active canonical brick | ITEM-34B / REPO-FILE-FOLDER-ROUNDTRIP |
| `ITEM-35A` | Navigation convenience is a first-class planning/documentation need. | merged / split / updated | ITEM-35B |
| `ITEM-35B` | App offers tabs, file navigation and jump-to-anywhere links. | active canonical brick | ITEM-35B / IDE-TAB-NAVIGATION |
| `ITEM-36A` | One chat can be treated as a planning workspace boundary. | unresolved / not reconfirmed | one-chat = one workspace boundary not reconfirmed; history storage itself is active |
| `ITEM-36B` | App stores chat workspace with full history and extracted items. | merged / split / updated | ITEM-11B / ITEM-115 / ITEM-116 |
| `ITEM-37A` | Full history and action log should remain distinct. | merged / split / updated | ITEM-12A |
| `ITEM-37B` | Tool/script extracts machine-readable action log from assistant output. | merged / split / updated | ITEM-12B / ITEM-116 |
| `ITEM-38` | Ideas, intentions and questions from chat become candidate items with evidence status. | reusable or non-product owner | reusable interpretation owner; application support: ITEM-112, with RN/DAM boundary in ITEM-115 |
| `ITEM-39` | Planning items are raw material, not automatic final documentation. | reusable or non-product owner | reusable owner; application boundaries: ITEM-41 / ITEM-115 / ITEM-116 |
| `ITEM-40` | Items can be linked from files/sections anywhere when traceability helps. | merged / split / updated | ITEM-73 / ITEM-93 / ITEM-94 / ITEM-114 / ITEM-116 |
| `ITEM-41` | Future plans can reuse reviewed fruits/items instead of reconstructing from scratch. | active canonical brick | ITEM-41 / ITEM-BRICK-REUSE |
| `ITEM-42` | Any planning/question flow should start with a situation frame when useful. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-43` | Before expensive/irreversible work, choose the correct review object. | reusable or non-product owner | reusable owner of review-object choice; supports ITEM-113 / ITEM-119 |
| `ITEM-44` | Review may check architecture/conventions, not only text. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-45` | Planning needs whole-picture roadmap visibility. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-46` | Local responses/steps must connect back to the full draft. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-47` | It should be visible why a point exists and which source excerpts support it. | reusable or non-product owner | reusable traceability owner; supports ITEM-112 / ITEM-120 |
| `ITEM-48` | Navigation should expose dependencies across files, sections and items. | reusable or non-product owner | reusable navigation principle; application support: ITEM-35B / ITEM-114 / ITEM-116 / ITEM-118 |
| `ITEM-49` | Strong navigation can reduce file splitting pressure. | reusable or non-product owner | reusable owner; also informs GitHub file-size concern without forcing file splitting |
| `ITEM-50A` | Reviewed planning items can be referenced or embedded in documents with provenance. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-50B` | App implements live/snapshot/hybrid transclusion. | merged / split / updated | ITEM-73 / ITEM-89 / ITEM-107; live persisted refresh superseded by Variant B |
| `ITEM-51` | Planning items are session-bound notes with categories and statuses. | unresolved / not reconfirmed | category/status part supports ITEM-103 / ITEM-106 / ITEM-112 / ITEM-118; session-bound note model not confirmed |
| `ITEM-52A` | Note types may include question-answer, link, observation, decision, etc. | merged / split / updated | ITEM-103 / ITEM-106 / ITEM-112 / ITEM-115 / ITEM-119 |
| `ITEM-52B` | App UI implements note-type tabs/forms. | unresolved / not reconfirmed | note-type tabs/forms are not the same as confirmed IDE tabs |
| `ITEM-53` | Documentation status should track whether chat content was documented, deferred, superseded or not worth documenting. | unresolved / not reconfirmed | documentation-status lifecycle not reconfirmed |
| `ITEM-54` | Action log is separate from full history. | merged / split / updated | ITEM-12A |
| `ITEM-55` | Accepted AI understanding should be durable. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-56` | Early drafts should be created when boundaries are clear enough. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-57` | Current/Old Workflow belongs in Planning Draft when it exists and helps analysis. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-58` | Ask questions about goal and current workflow before committing to solution workflow. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-59A` | AI-generated wrappers/tags must not silently create canonical state. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-59B` | App scans wrappers/tags and asks confirmation before object creation. | merged / split / updated | ITEM-31B |
| `ITEM-60A` | Object creation from wrappers must be confirmable and reversible. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-60B` | App supports creation confirmation and undo/rollback around wrappers. | merged / split / updated | ITEM-31B for confirmation; undo/rollback remains deferred |
| `ITEM-61` | App memory must not hide repository docs. | merged / split / updated | ITEM-23B / ITEM-28B |
| `ITEM-62` | Workspace items are raw material and can later be promoted into docs. | merged / split / updated | ITEM-41 / ITEM-94 |
| `ITEM-63` | Git/archive support can help living-plan versioning but should not be raw-stage default. | deferred implementation | Git/archive living-plan support |
| `ITEM-64` | Archive helper can reduce repeated command burden later. | deferred implementation | archive command helper |
| `ITEM-65` | Living-plan growth is a preference/heuristic, not an absolute requirement. | reusable or non-product owner | reusable anti-rigidity owner; supports ITEM-98 / ITEM-119 / ITEM-120 |
| `ITEM-66` | Review Stage, Review Object and Review Status must be defined separately. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-67` | A Review Object is the concrete content/artifact/proposal/checklist that the user reviews at a stage. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-68` | "Marking reviewed/unreviewed" is Review Status, not the Review Object itself. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-69` | Result Workflow navigation should expose whole goal, road, local point role, parent-plan relation, dependencies and source-linked reasons. | reusable or non-product owner | reusable context owner; supports ITEM-112 / ITEM-113 / ITEM-119 |
| `ITEM-70` | Review can target architecture/conventions before text/file changes are accepted. | reusable or non-product owner | existing reusable methodology; do not duplicate in app picture |
| `ITEM-71` | Traceability should attach reviewed InformationItems/PlanningItems to relevant places, not only to final files. | merged / split / updated | ITEM-41 / ITEM-73 / ITEM-94 / ITEM-114 / ITEM-116 / ITEM-118 |
| `ITEM-72` | File places that reference an InformationItem should always have an app-readable reference/link. | merged / split / updated | ITEM-73 / ITEM-104 / ITEM-114 / ITEM-116 |
| `ITEM-73` | Embedded InformationItem mode includes both a reference and wrapped literal content. | active canonical brick | ITEM-73 / FULL-OR-BARE-LINK |
| `ITEM-74` | Reference-only InformationItem mode includes an app-readable ID/path link without duplicating content in the literal file. | merged / split / updated | ITEM-73 |
| `ITEM-75` | Reference-only mode is useful when the content is for app navigation/user convenience and would harm AI reading if duplicated. | merged / split / updated | ITEM-88 / ITEM-107 |
| `ITEM-76` | Wrapped content should be treated as InformationItem-backed text; if the object does not exist, the app asks before creating it. | merged / split / updated | ITEM-31B |
| `ITEM-77` | AI should be able to resolve bare references by ID/path when needed, or the user can copy the app-expanded file/view into chat. | merged / split / updated | ITEM-107 / ITEM-114 / ITEM-116 |
| `ITEM-78` | The item register itself should preserve original chat excerpts, not only polished summaries. | reusable or non-product owner | reusable source-integrity owner; supports ITEM-41 / ITEM-120 |
| `ITEM-79` | Reusable-methodology item and app-execution item must be split when one source idea contains both. | merged / split / updated | ITEM-99 |
| `ITEM-80` | Parent documentation navigation should list the terminology file, not only the application-planning family README. | reusable or non-product owner | repo documentation navigation correction; not app product brick |
| `ITEM-81` | Existing application-planning docs already have file-type owners; new methodology material should mostly update existing owners rather than create another file by default. | reusable or non-product owner | documentation owner rule; not app product brick |
| `ITEM-82` | Do not finalize concrete JSON/object storage syntax in reusable principles; keep it in project-local app drafts or later implementation docs. | merged / split / updated | ITEM-99 |
| `ITEM-83` | When item content is embedded in a literal file, the wrapper must indicate both the source object identity and the local materialized text boundary. | active canonical brick | ITEM-83 / OBJECT-WRAPPER-CONTRACT |
| `ITEM-84` | When only a bare link is used, the literal file should remain readable enough without that item content unless the app-expanded view is intentionally required. | merged / split / updated | ITEM-73 / ITEM-107 |

### Audit integrity result

```text
110 old items
= 15 active
+ 36 merged/split
+ 4 deferred
+ 4 unresolved
+ 51 reusable/non-product
```

Every old ID appears exactly once in the table.

## 8. Brick integrity and derived-picture rules

1. The item register is source-linked planning material.
2. The Full Picture / Planning Draft is an item-backed planning synthesis/view; its exact narrative, list and materialization mix remains flexible.
3. Planning Items remain directly inspectable independently of any draft rendering.
4. A Planning Item has no arbitrary length limit:
   - semantic completeness determines its size;
   - compact ID/title/summary are navigation layers, not replacements for the full body.
5. Split items by independent meaning, ownership, lifecycle, review, reuse or decision—not by word count.
6. A picture statement without a supporting item is either:
   - a clearly marked inference/question;
   - a new or updated Planning Item;
   - or an error.
7. Keep planning concern stages distinct:
   - Lens/Definition/Preset describe reusable attention;
   - Concern Suggestion proposes applicability to a target;
   - Applied Concern stores accepted target-specific planning state;
   - Work Target stores separate deep work.
8. Document Template, Concern Preset, View Preset and Validation Rule remain separate mechanisms.
9. Concern presets recommend candidate attention; they do not mandate applicability or document structure.
10. Several presets may be evaluated together, but nested preset inclusion/inheritance requires a separate accepted design.
11. Manual concern addition is not a preset type.
12. Apply concerns at the scale that owns the uncertainty.
13. Reuse one Concern Definition; keep each Applied Concern target-specific.
14. When several sources suggest the same concern for one target, keep one suggestion/application identity and all contributing-source links.
15. A canonical item should not combine independent behavior merely to reduce item count.
16. Two items should not remain active when they express the same requirement at the same ownership level.
17. Corrections update the canonical item and retain old ID/source relationships.
18. `RN/DAM` remain literal user annotations until a separate review changes their disposition.
19. Purposeful item capture performs a lightweight check; the post-picture sweep performs the deeper systematic check.
20. Deeper-planning work remains linked to the item/picture context that justified it and returns accepted results to that context.
21. Related-object views and presets are derived projections:
    - they do not create semantic truth;
    - they do not evaluate/apply concern presets;
    - manual filter selection remains available.
22. Answer Change Sets provide temporal provenance:
    - which actions were logged;
    - which items were added;
    - in which AI-answer context.
23. Template-linked AI responses provide navigable historical evidence but do not become canonical documentation automatically.
24. Historical response links may age without creating maintenance obligations.
25. Future implementations may create additional views, but they must not create new semantic truths independent of item/document sources.

## 9. Resolved clarifications and remaining questions

### Resolved in this update

```text
RN creator:
  user only

DAM creator:
  user only

RN target:
  nearest preceding semantic fragment

DAM target:
  nearest preceding semantic fragment

proactive reminders:
  none

stored historical AI response editing:
  no, for now

version-pinned response links:
  no

historical-link repair/stale queue:
  no
```

### Q-17 — Outgoing count in the file view

The relation direction is now clear:

```text
Incoming Reference:
  current file receives information from an object whose home is elsewhere

Outgoing Use:
  another file uses an object whose home is the current file
```

Should `Outgoing Uses` show:

1. number of distinct external files;
2. number of individual reference occurrences;
3. both values separately?

### Q-23 — Confirm working relation labels

Current candidates:

```text
Home Object / домашний объект файла
Incoming Reference / входящая ссылка
External-Home Object / объект с внешним home
Outgoing Use / исходящее использование
```

### Q-24 — Action Log boundary

Should a decision with no performed action remain completely outside Action Log, or may it appear as linked rationale without being an Action Log Entry?

### Q-25 — Answer Change Set scope

Confirmed minimum:

- actions added;
- items added.

Later review:

- items updated/corrected;
- items superseded;
- actions reverted/corrected.

### Q-26 — Code-name language and format

Keep English `UPPER-KEBAB-CASE`, or use Russian/mixed-language human-facing names?

### Q-27 — Minimal item-kind and relation vocabulary

Which candidate kinds and relations from `ITEM-112` are necessary in the first optional contract, and which should remain free-form?

### Q-28 — Planning-deepening terminology

Reusable methodology and UI may use different names. Review:

- Planning Deepening;
- Planning Concern;
- Direction Of Work;
- направление проработки;
- углубление планирования.

### Q-29 — First response-template catalogue

Candidate template types:

- Item Extraction;
- Full Picture;
- Plan File Update;
- Comparison;
- Prototype Result;
- Documentation Update;
- Review Response.

For each template, define only the links required for its review purpose.

### Q-30 — Compact link syntax and resolution

Prototype representation for:

- object/item stable ID;
- repository-relative file path;
- file location/anchor;
- proposed object/item;
- unresolved target.

### Q-31 — App-only state representation for AI

Compare auxiliary Markdown, JSON, Git-tracked read/export model, direct integration and combinations.

### Q-32 — GitHub-readable file-size threshold

Measure real tool behavior before establishing a recommended limit or splitting policy.

### Q-33 — Template-validation severity

When a template-required source is mentioned but not resolvably linked, should the application show:

- advisory warning;
- review issue;
- blocking validation error?

### Q-34 — What counts as directly related to a file?

`ITEM-118` currently includes explicit/direct relations:

- definition stored here;
- parent/home here;
- reference occurrence here;
- object links directly to this file/location;
- incoming/outgoing relations;
- deeper-planning target directly linked from an item represented here.

Should the first version include any transitive relation, or keep transitive expansion out of the default model?

### Q-35 — First Planning Draft presets

Directly confirmed examples:

- All Planning Items;
- Open Questions;
- Alternatives And Branches.

Select or defer the additional candidate views:

- Requirements And Acceptance;
- Planning Deepening;
- Tests And Prototypes;
- Risks And Assumptions;
- Decisions;
- Actions;
- Unprocessed RN/DAM.

### Q-36 — User-saved view presets

Should the first version support saving user-customized presets, or only recommended presets by file type plus temporary manual filter changes?

### Q-37 — Planning Draft composition mode

How should a Full Picture / Planning Draft physically include its Planning Items?

Candidates:

- full-text item references;
- bare item references plus an application view;
- generated item sections;
- ordinary explanatory text with linked supporting items;
- a controlled mixture of these forms.

The requirement is item-backed planning, not one preselected representation.

### Q-38 — First Concern target types

Confirm the first supported targets:

- Planning Item;
- Planning Direction;
- Documentation File.

Defer or include:

- File Location;
- Folder.

### Q-39 — Lightweight Applied Concern representation

Should every Applied Concern receive stable identity immediately, or may it begin as a compact target-owned record and receive independent identity only when lifecycle/reuse/deep work requires it?

### Q-40 — Nested Concern Preset composition

Confirmed:

- several independent presets may be selected/recommended together for one target.

Still open:

- may one preset include or inherit another preset?

Example:

```text
Application Development
  includes:
    Base Planning Item
    Long-Lived Tool
    Repository-Integrated Tool
```

If supported, define cycle prevention, source tracking, versioning and override behavior.

### Q-41 — Similar/duplicate Concern Definitions

When two presets propose similar but not identical concerns:

- merge into one canonical definition;
- keep separate definitions;
- offer a review/alias relationship;
- allow target-specific choice?

### Q-42 — Default file-type concern behavior

Current preferred direction:

```text
file type recommends concern presets
→ application derives Concern Suggestions
→ user/review workflow selects applicable concerns
→ only then create/update Applied Concerns
```

Confirm whether any trusted rule may bypass suggestion review and auto-apply a concern, or whether all preset-derived concerns require review.

### Q-43 — Initiative scale representation

Is `Item Kind = Initiative/Workstream` sufficient, or is a separate optional `Item Scale` field useful for filtering and concern applicability?

### Q-44 — Concern suggestion dispositions and Applied Concern statuses

Keep the vocabularies separate.

Candidate Concern Suggestion dispositions:

- Pending Review;
- Apply;
- Not Applicable;
- Already Covered;
- Covered At Parent Level;
- Covered At Full-Picture Level;
- Review Deferred.

Candidate Applied Concern statuses:

- Open;
- Deferred;
- Needs Separate Work;
- Resolved.

Which values should be canonical stored states, and which should be derived/display labels?

### Q-45 — Persistence of reviewed-out concern suggestions

After a suggestion is marked Not Applicable, Already Covered or Covered Elsewhere, should the decision be persisted so the same preset does not repeatedly propose it without relevant changes?

If persisted, define invalidation/review behavior when:

- the target changes materially;
- the Concern Definition changes;
- the source preset changes;
- a parent/full-picture coverage claim becomes stale.

### Q-46 — Object Category Contract Composition And Enforcement

Confirmed:

```text
- any correctly represented field may be recognized;
- category contracts/presets define expected fields for applicable object categories;
- additional fields are allowed by default;
- a hard restriction exists only when an applicable contract states it explicitly.
```

Open:

- how several applicable contracts combine;
- precedence and conflict handling;
- advisory warning versus review issue versus blocking validation;
- contract inclusion/inheritance and cycle prevention;
- invalidation/review when a category or contract changes.

### Q-19 — Minimal Markdown syntax

Prototype visually quiet forms for canonical objects, fields, full/bare object references, general file/location links, home metadata and field-level references.

### Q-22 — Temporary app-only object durability

Persistence, backup/export, recovery and later Markdown conversion remain deferred but materially important.

## 10. Required documentation work packages

### Package 1 — terminology and identity

Update terminology for:

- Planning Item scale/kind;
- unrestricted full item body versus compact ID/code/title/summary;
- Planning Lens;
- Concern Definition;
- Concern Preset;
- Concern Suggestion / Candidate Concern;
- Applied Concern;
- Concern Work Target;
- Document Template;
- View Preset;
- Validation Rule;
- Reference Object;
- canonical definition/state versus parent/home;
- general Object/File/File Location reference targets;
- `RN` and `DAM`;
- Answer Change Set;
- Template-Linked AI Response.

### Package 2 — reusable principles

Add principles for:

- semantic completeness over arbitrary brevity;
- semantic rather than length-based item splitting;
- structure versus attention versus presentation versus validation;
- suggestion versus applied target-specific concern state;
- presets recommend rather than mandate;
- joint evaluation of several presets without duplicate suggestions/applications;
- nested preset inheritance remains optional until separately accepted;
- concern application at the correct scale;
- reuse definitions while separating target-specific applications;
- no premature deep-work materialization;
- accepted concern results return to items and Full Picture;
- targeted repository semantic comparison occurs during item creation/update when repository context is available;
- the comparison is shown explicitly when the user requests it;
- complete repository semantic reconciliation is mandatory and explicit before every File Update Plan;
- no silent semantic replacement: existing → new meaning, source, owner, affected files and proposed action are shown before literal file changes.

### Package 3 — template semantic classification audit

Review existing templates and classify each element as one or more of:

- Document Structure;
- Concern Definition;
- View Preset Entry;
- Validation Rule;
- Example.

For each element record:

- current location and wording;
- semantic class;
- keep in template?;
- move/link to concern catalogue?;
- convert/link to validation?;
- use in view preset?;
- preserve as example?

An element such as `Risks` may legitimately have several explicit roles; the audit separates those roles instead of forcing one interpretation.

### Package 4 — project-local Application Root and accepted workflow ownership

Current state:

- the Application Root Full Picture exists;
- Documentation And Reference Object End-To-End Workflow is the accepted primary Complete Picture;
- Reference Object Model And Lifecycle is a supporting model;
- Chat/AI/Work-State and Planning/Deepening remain provisional slices pending end-to-end review;
- accepted requirements and implementation thoughts remain distinct;
- AI knowledge/source synchronization and runtime architecture remain open concerns.

### Package 5 — end-to-end workflow structure

Accepted primary workflow:

1. Documentation And Reference Object End-To-End Workflow:
   - scope loading and mixed-Markdown parsing;
   - object discovery/confirmation and creation paths;
   - identity/state/home and field/category-contract model;
   - authoring, managed references and round trip;
   - dependency invalidation/review;
   - cross-step navigation/views;
   - optional AI-expanded copy.

Provisional workflows still requiring complete trigger-to-result review:

2. Chat, AI Responses And Work-State Trace.
3. Planning Items, Full Picture And Deepening, including upstream AI Item Import.

Supporting/reusable processes remain separately owned where their independent lifecycle justifies it, including repository semantic reconciliation and literal Git/diff handoff.

### Package 6 — syntax and representation planning

Plan before prototyping:

- compact item identity plus unrestricted body representation;
- concern definition/preset/suggestion/application serialization;
- suggestion-review and Applied Concern status vocabularies;
- arbitrary field representation plus Object Category Field Contract serialization;
- object/file/file-location link syntax;
- file relation and concern views;
- response templates and required-link validation;
- repository representation of app-only entities;
- app-only object persistence boundary.

Prototype implementation and shell/technology selection remain explicitly outside this update.

## 11. Source-integrity note

The uploaded old register sometimes preserved only normalized rows or indirect source support. Such old evidence remains marked through its old-item disposition.

Fresh `SRC-N46`–`SRC-N86` preserve direct user wording and take precedence when they correct prior interpretations.

In particular:

- `ITEM-117 / TASK-SCOPED-AI-CONTEXT` is withdrawn and its number is not reused;
- `RN/DAM` are user-only and non-reminding;
- historical AI responses are immutable records whose current-target links may become stale;
- GitHub file-size limits and app-only-state transport remain evidence-seeking concerns rather than assumed architecture;
- Full Picture, related-object views and presets remain derived structures over canonical items/documents rather than independent truth;
- Document Template, Concern Preset, View Preset and Validation Rule are separate mechanisms;
- Concern Suggestion is not an Applied Concern;
- several presets may be evaluated jointly, while nested preset inheritance remains unresolved;
- Planning Items are not constrained by arbitrary length; source-linked semantic completeness takes precedence over artificial brevity;
- no separate `Planning Item Candidate` entity is introduced by this revision;
- targeted repository comparison occurs during item creation/update, is shown explicitly on user request and becomes a complete mandatory review before every File Update Plan;
- semantic corrections/replacements must be shown as existing → new meaning before literal repository changes;
- a Complete Picture is an end-to-end workflow rather than a peer thematic slice;
- object fields are generically recognizable while category contracts define expectations;
- accepted absorbed identities remain fully traceable;
- prototype implementation and technology choices remain outside the accepted items in this version.

# Accepted Recent-Chat Reconciliation Transition — 2026-07-23

## Decision and scope

The user explicitly accepted the reconciliation of the recent 39-row review set into 32 resulting semantic meanings/entries.

```text
CHAT-PI-* and RESULT-* identities
  → remain source/review traceability;
  → do not become canonical ITEM-* identities mechanically.

Current ITEM-* identity
  → survives when its semantic responsibility survives.

New ITEM-* identity
  → is created only for a genuinely independent product meaning
    with no compatible current canonical owner.
```

This transition updates the canonical product register first. Reusable owners, project-local Full Pictures/workflows, root registries, command routing and Tampermonkey projection are later batches and are not claimed as already updated here.

## Accepted aggregate mapping

| Accepted review meaning | Canonical register disposition |
|---|---|
| Root Interaction Route Map | Reusable/root owner; no duplicate product item |
| Semantic Use-Case Registry | Reusable/root owner; no duplicate product item |
| Direction Registry Hierarchy | Reusable/root owner; no duplicate product item |
| Command And Use-Case Activation Semantics | Reusable/root owner; no duplicate product item |
| Documentation Orientation And Task Navigation | Root/helper use case; product navigation items support it |
| Multi-Surface Tampermonkey Projection | Tool/projection owner; no duplicate product item |
| Direction-Owned Whole-Use-Case Topology | Reusable planning principle; `ITEM-112` gains product-facing relation context |
| Plan A Solution Or Workflow | Reusable Direction entry |
| Understand Current Workflow And Reality | Reusable use-case entry |
| Research Existing Solutions And Alternative Workflows | Reusable provisional use-case entry |
| Perform Detailed Scenario/Domain/Slice Planning | Reusable Direction entry; prototype-depth method deferred |
| Maintain Documentation, Use Cases And Commands | Reusable/root Direction entry |
| Auxiliary Solution Use-Case Inventory Principle | Reusable principle |
| Extract Planning Items Command Route | Root route after command-name decision |
| Planning Item Formation Workflow | Reusable owner to be created in a later batch |
| Portable Markdown Review Mode | Reusable formation mode; retained fallback |
| Application-Native Managed Object Mode | Expand `ITEM-94`, `ITEM-116`, `ITEM-22B` |
| Managed Planning Item Lifecycle And Reference Boundary | Expand `ITEM-22B`, `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Hierarchical Full Picture, Semantic Home And Item Trace | Expand `ITEM-41`, `ITEM-98`, `ITEM-91` |
| Full Accumulating Item Meaning Contract | Expand `ITEM-120`, `ITEM-110`, `ITEM-98` |
| Full-Message Source Review Contract | Reusable formation owner + source model; source appendix preserved here |
| Structured User Message Composer | New `ITEM-121` |
| Typed Source Contribution Model | New `ITEM-122` |
| Working Planning Item Store And Documentation-State Views | Existing `ITEM-108`, `ITEM-94`, `ITEM-118`; no new item in this transition |
| Configurable Planning Input Conventions | New general `ITEM-123`; project-readable convention file later |
| Conversation-History Source Navigation | Expand `ITEM-11B`, `ITEM-35B`, `ITEM-116` |
| Concern Elaboration Observability | Distributed across `ITEM-113`, `ITEM-119`, `ITEM-118`, `ITEM-97`, `ITEM-106` |
| Planning And Documentation Terminology Consistency Audit | Reusable terminology/update work |
| Retire Or Replace Legacy Broad InformationItem | Accepted reusable terminology correction |
| Retire Origin As A Separate Canonical Term | Accepted reusable terminology correction |
| Documentation Workbench Prototype Planning Set | Deferred project-local prototype planning |
| Simplified Two-Layer Prototype Architecture Candidate | Deferred; not accepted architecture |

## Active-count effect

```text
before this accepted transition: 48 active items
new independent active product items: 3
  ITEM-121
  ITEM-122
  ITEM-123
result after this transition: 51 active items
```

No current active item is removed by this transition. Existing items receive accepted expansions; later Full Picture/workflow and reusable-owner batches may re-home meanings without losing this history.

## Full-message source review contract

For portable Planning Item review output:

```text
- repeat every supporting user message in full under each item it supports;
- highlight the relevant spans while retaining surrounding context;
- preserve chronological order when several messages contribute;
- use exact anchors in addition to, not instead of, the complete message;
- never invent a missing original source.
```

For canonical storage, a shared full-message source bank plus typed item-to-source contribution relations is allowed so long as the application/review renderer can reproduce the full per-item presentation above.

## Imported accepted source artifact

The following complete review artifact is preserved verbatim as migration provenance. Its `CHAT-PI-*` identities are temporary review identities; this register's Current/Incoming/Resulting mapping above owns their accepted canonical disposition.

<details>
<summary>pending-planning-items-from-recent-chat-v3.md — complete imported review source</summary>

# Pending Planning Items From Recent Chat — Reconciled Review Set v3

Status: **updated provisional review ledger — no repository update or canonical acceptance implied**

This file is a complete regenerated review ledger for the recent discussion. It preserves full working meanings and repeats complete user messages under every item with relevant spans highlighted.

## Reconciliation applied in v3

- `CHAT-PI-005` remains absorbed into `CHAT-PI-001`.
- `CHAT-PI-009` and `CHAT-PI-010` remain absorbed into `CHAT-PI-006`.
- Former `CHAT-PI-015` remains split into `CHAT-PI-015A` and `CHAT-PI-015B`.
- `CHAT-PI-015B` now marks Existing Solutions Research as a supported but provisional use case without a prematurely designed specialized workflow.
- `CHAT-PI-016` routes to portable `CHAT-PI-018` and application-native `CHAT-PI-022` modes.
- `CHAT-PI-021` now says that `Source Idea` is not introduced for now; reconsideration requires independent lifecycle value.
- `CHAT-PI-028` keeps the rule that a confirmed app-created Planning Item is immediately a managed Reference Object.
- Added recursive Full-Picture ownership, local/root Direction Registries, Planning Item semantic home and Full-Picture-to-item traceability.
- `Restore Detailed Scenario/Domain/Slice Owners` is not added as a new item.
- `Prototype-Depth Scenario/Domain/Slice Planning` remains intentionally excluded for the next task.

## Source and item-body rules

1. `CHAT-PI-*` identities are temporary review identities, not canonical repository IDs.
2. The full working meaning is the item body; a shorter summary must not replace it.
3. Main AI response sections should accumulate the complete item meaning when they are intended to become item bodies.
4. Supporting user messages are repeated in full under every item.
5. Relevant spans are shown in uppercase while surrounding context is preserved.
6. The same full message is repeated for every item it supports.
7. Several supporting messages are shown in chronological order.
8. Exact Source Anchors may supplement the full message but do not replace it in review output.
9. Missing earlier source wording must be declared rather than invented.
10. This file does not itself approve file placement, stable IDs, merges into repository items or documentation edits.

---

## Item index

- [CHAT-PI-001 — Work Directions With Direction-Owned Use-Case Topology](#chat-pi-001)
- [CHAT-PI-002 — Use-Case Registry Separate From Command Routes](#chat-pi-002)
- [CHAT-PI-003 — Commands Execute; Use Cases Establish Workflow Context](#chat-pi-003)
- [CHAT-PI-004 — Whole Use Cases Instead Of Workflow Micro-Steps](#chat-pi-004)
- [CHAT-PI-006 — Tampermonkey Separates Orientation, Directions, Use Cases And Commands](#chat-pi-006)
- [CHAT-PI-007 — Adaptive And Full Direction/Use-Case Route Reading](#chat-pi-007)
- [CHAT-PI-008 — New-Chat Documentation Onboarding](#chat-pi-008)
- [CHAT-PI-011 — Maintain Documentation, Use Cases And Commands Direction](#chat-pi-011)
- [CHAT-PI-012 — Auxiliary Solutions Must Have Their Own Use-Case Inventory](#chat-pi-012)
- [CHAT-PI-013 — Plan A Solution Or Workflow Direction](#chat-pi-013)
- [CHAT-PI-014 — Perform Detailed Scenario Domain And Slice Planning Direction](#chat-pi-014)
- [CHAT-PI-015A — Understand Current Workflow And Reality As An Explicit Use Case](#chat-pi-015a)
- [CHAT-PI-015B — Research Existing Solutions And Alternative Workflows As A Provisional Explicit Use Case](#chat-pi-015b)
- [CHAT-PI-016 — Extract Planning Items From Discussion Command](#chat-pi-016)
- [CHAT-PI-017 — Accumulating Full Item Meaning In Main Response Sections](#chat-pi-017)
- [CHAT-PI-018 — Portable Markdown Item Review And Ledger Workflow](#chat-pi-018)
- [CHAT-PI-019 — Full-Message Source Presentation With Relevant Spans Highlighted](#chat-pi-019)
- [CHAT-PI-020 — Structured User Message Composer With Lightweight Topic Templates](#chat-pi-020)
- [CHAT-PI-021 — Typed Many-To-Many Source Contributions Without A Source Idea Entity For Now](#chat-pi-021)
- [CHAT-PI-022 — Application-Native Item Review And Managed Object Workflow](#chat-pi-022)
- [CHAT-PI-023 — Working Planning Item Store And Documentation-State Views](#chat-pi-023)
- [CHAT-PI-024 — Explicit Configurable Planning Item Delimiters](#chat-pi-024)
- [CHAT-PI-025 — Configurable Application Settings](#chat-pi-025)
- [CHAT-PI-026 — One Planning Item Entity Across Draft And Reusable Documentation](#chat-pi-026)
- [CHAT-PI-027 — Retire Or Replace The Legacy Broad InformationItem Term](#chat-pi-027)
- [CHAT-PI-028 — Persisted Managed Planning Items Are Reference Objects](#chat-pi-028)
- [CHAT-PI-029 — Planning Item Source And Conversation-History Navigation](#chat-pi-029)
- [CHAT-PI-030 — Retire Origin As A Separate Canonical Term](#chat-pi-030)
- [CHAT-PI-031 — Concern-State Observability For All Supported Targets](#chat-pi-031)
- [CHAT-PI-032 — Extensible Concern Lifecycle And Type-Specific Assessment](#chat-pi-032)
- [CHAT-PI-033 — Generic Concern Dashboard Through Views Presets And Contracts](#chat-pi-033)
- [CHAT-PI-034 — Task-Oriented Documentation Navigation](#chat-pi-034)
- [CHAT-PI-035 — Planning And Documentation Terminology Consistency Audit](#chat-pi-035)
- [CHAT-PI-036 — Documentation Workbench Prototype Planning Draft Set](#chat-pi-036)
- [CHAT-PI-037 — Simplified Two-Layer Documentation Workbench Prototype Architecture](#chat-pi-037)
- [CHAT-PI-038 — Recursive Full-Picture Ownership Through Reference Objects](#chat-pi-038)
- [CHAT-PI-039 — Local And Root Direction Registries Separate From The Use-Case Map](#chat-pi-039)
- [CHAT-PI-040 — Semantic Home For Documented Planning Items](#chat-pi-040)
- [CHAT-PI-041 — Full-Picture Meanings Trace To Contributing Planning Items](#chat-pi-041)

---

<a id="chat-pi-001"></a>
## CHAT-PI-001 — Work Directions With Direction-Owned Use-Case Topology

### Full working meaning

Документационная система должна показывать широкие Work Directions, чтобы пользователь и новый чат могли понять, над какой общей областью ведётся работа. Direction объединяет связанные use cases, но не задаёт одну универсальную линейную модель. В конкретном направлении use cases могут быть последовательными, частично последовательными, необязательными, условными, ситуативными, альтернативными, повторяемыми или независимо запускаемыми. Список use cases представляет поддерживаемые capabilities, а не обязательный маршрут, который всегда выполняется полностью. Owner-документация направления должна определять поддерживаемые use cases, их topology, activation rules, обязательные и необязательные связи, входы, результаты, возможные циклы и способ определения текущей стадии.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.
- Note: CHAT-PI-005 absorbed here.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить юзкейсы которые не являются командами т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, планирование решения (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть планирование  прототипа(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет разветвление в планировании т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно существующие решения для проблемы  , где разбираем сцществвующий вокрфлоу решения какой то проблемы . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что НЕ ВСЕ КЕЙСЫ ОБЯЗАНЯ БЫТЬ ВСЕГДА ВЫПОЛНЕНЫ - это именно возможные кейсы поддержанные документацией

#### Source 2 — S2

> я думаю что НУЖНО ОБОЗНАЧИТЬ ОБЩИЕ НАПРАВЛЕНИЯ РАБОТЫ по типу планирования решения внутри которого могут быть ОТДЕЛЬНЫЕ ЭКСПЛИЦИТНЫЕ ЮЗКЕЙСЫ, чтобы было видно над чем можно работать в целом и какие действия внутри(ты делал так в предыд ответе по сути) можно также упоминать отдельные части чтобы в большом воркфлоу не было упущено деталей, хотя я не уверен что возможна ситуация что в хорошем большом воркфлоу можно что то упустить. я бы может не усложнял сейчас, но запомнил след идею: надо расширтть виджет команд нашими юзкейсам чтобы можно было нажать кнопку и в чат ввелась инфа о конкр юзкейсе по тому же принципу по кот мы работаем с командами, т е название юзкейса и если чат не помнит или не знает что это за юзкейс - направить его на соотв файлы (возможно стоит в тексте его направить именно на регистр юзкейсов и оттуда он пройдется по роуту всех релевантных файлов документации для конкр юзкейса) . ну и рядом кнопка фулл, которая обязывает ии пройтись по релевантным файлам и не имеет этого "если чат не помнит или не знает" .

#### Source 3 — S4

> DIRECTION МОЖЕТ БЫТЬ НАБОРОМ ПОСЛЕДОВАТЕЛЬНЫХ ЮЗКЕЙСОВ, НО НЕ ОБЯЗЗАТЕЛЬНО. может быть частично из последовательных  с некоторыми необязательными или ситуативными т е тут все не однозначно всегда . это может быть уточнено в релевантных доках направления . насчет info item - я забыл что у нас есть сущность с таким названием, опиши что она из себя представляет, пока не принимай по ее поводу решений

---

<a id="chat-pi-002"></a>
## CHAT-PI-002 — Use-Case Registry Separate From Command Routes

### Full working meaning

Root use-case documentation должна содержать отдельный реестр поддерживаемых пользовательских use cases, а не описывать всю систему только через короткие команды. Реестр должен хранить semantic identity, Work Direction, пользовательскую цель, границы, owner route, основные входы и ожидаемый результат. Command routes должны быть отдельным интерфейсным слоем и при необходимости ссылаться на use case, который они запускают или специализируют.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить ЮЗКЕЙСЫ КОТОРЫЕ НЕ ЯВЛЯЮТСЯ КОМАНДАМИ т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, планирование решения (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть планирование  прототипа(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет разветвление в планировании т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно существующие решения для проблемы  , где разбираем сцществвующий вокрфлоу решения какой то проблемы . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что не все кейсы обязаня быть всегда выполнены - это именно возможные кейсы поддержанные документацией

#### Source 2 — S2

> я думаю что нужно обозначить общие направления работы по типу планирования решения внутри которого могут быть отдельные эксплицитные юзкейсы, чтобы было видно над чем можно работать в целом и какие действия внутри(ты делал так в предыд ответе по сути) можно также упоминать отдельные части чтобы в большом воркфлоу не было упущено деталей, хотя я не уверен что возможна ситуация что в хорошем большом воркфлоу можно что то упустить. я бы может не усложнял сейчас, но запомнил след идею: надо расширтть виджет команд нашими юзкейсам чтобы можно было нажать кнопку и в чат ввелась инфа о конкр юзкейсе по тому же принципу по кот мы работаем с командами, т е название юзкейса и если чат не помнит или не знает что это за юзкейс - направить его на соотв файлы (возможно стоит в тексте его направить именно на РЕГИСТР ЮЗКЕЙСОВ и оттуда он пройдется по роуту всех релевантных файлов документации для конкр юзкейса) . ну и рядом кнопка фулл, которая обязывает ии пройтись по релевантным файлам и не имеет этого "если чат не помнит или не знает" .

---

<a id="chat-pi-003"></a>
## CHAT-PI-003 — Commands Execute; Use Cases Establish Workflow Context

### Full working meaning

Команда и use case должны иметь разную interaction semantics. Команда требует немедленно выполнить конкретную операцию и вернуть установленный формат результата с определёнными permission boundaries. Use case вводит чат в контекст документированного workflow: объясняет, что будет происходить, помогает определить текущую стадию, доступные входы и следующего участника действия. Первое действие после активации use case может требоваться от пользователя, AI или внешнего инструмента; use-case prompt не является приказом немедленно выполнить весь процесс.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть КОМАНДЫ КОТОРЫЕ УЖЕ БУКВАЛЬНО ТРЕБУЮТ НЕМЕДЛЕННОГО ОТВЕТА в нужном формате от ии, а есть ЮЗКЕЙСЫ ДЛЯ КОТОРЫХ ЕСТЬ ОПИСАНИЕ В ДОКУМЕНТАЦИИ и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. ОТ МЕНЯ ПЕРВОГО МОЖЕТ ТРЕБОВАТЬСЯ ДЕЙСТВИЕ в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-004"></a>
## CHAT-PI-004 — Whole Use Cases Instead Of Workflow Micro-Steps

### Full working meaning

Use-case catalogue не должен механически превращать каждый внутренний шаг хорошего большого workflow в отдельный use case. Когда чат подключается в середине работы, его предпочтительно познакомить со всем целостным процессом use case и затем определить текущую стадию. Отдельно выделяются только independently useful пользовательские цели или процессы с самостоятельным результатом, значимыми boundaries, отдельным owner workflow либо высокой ценностью как точки входа для нового или перегруженного чата.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S2

> я думаю что нужно обозначить общие направления работы по типу планирования решения внутри которого могут быть отдельные эксплицитные юзкейсы, чтобы было видно над чем можно работать в целом и какие действия внутри(ты делал так в предыд ответе по сути) можно также упоминать отдельные части чтобы в большом воркфлоу не было упущено деталей, хотя я не уверен что возможна ситуация что в хорошем большом воркфлоу можно что то упустить. Я БЫ МОЖЕТ НЕ УСЛОЖНЯЛ СЕЙЧАС, но запомнил след идею: надо расширтть виджет команд нашими юзкейсам чтобы можно было нажать кнопку и в чат ввелась инфа о конкр юзкейсе по тому же принципу по кот мы работаем с командами, т е название юзкейса и если чат не помнит или не знает что это за юзкейс - направить его на соотв файлы (возможно стоит в тексте его направить именно на регистр юзкейсов и оттуда он пройдется по роуту всех релевантных файлов документации для конкр юзкейса) . ну и рядом кнопка фулл, которая обязывает ии пройтись по релевантным файлам и не имеет этого "если чат не помнит или не знает" .

#### Source 2 — S3

> когда чат поключился к середине имеет смысл ПОЗНАКОМИТ ЕГО СО ВСЕМ ПРОЦЕССОМ который будет хорошо описан цельными юзкейсами, ЛУЧШЕ НЕ УСЛОЖНЯТЬ. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-006"></a>
## CHAT-PI-006 — Tampermonkey Separates Orientation, Directions, Use Cases And Commands

### Full working meaning

Tampermonkey helper должен визуально и семантически разделять Orientation, Work Directions, Use Cases и Commands. Commands остаются немедленными operational triggers. Direction и use-case buttons вставляют workflow-context prompts, а onboarding знакомит новый чат с high-level документационной архитектурой. Projection не владеет полными owner routes: вставляемый prompt хранит identity и направляет к Use-Case Registry, который ведёт к актуальным owner docs. До появления удобного ссылочного functionality UI не должен дублировать use-case button для операции, уже удобно представленной command button; эта boundary относится к текущей projection, а не запрещает связи command ↔ use case в registry.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.
- Note: CHAT-PI-009 and CHAT-PI-010 absorbed here.

### Full user-message source(s)

#### Source 1 — S2

> я думаю что нужно обозначить общие направления работы по типу планирования решения внутри которого могут быть отдельные эксплицитные юзкейсы, чтобы было видно над чем можно работать в целом и какие действия внутри(ты делал так в предыд ответе по сути) можно также упоминать отдельные части чтобы в большом воркфлоу не было упущено деталей, хотя я не уверен что возможна ситуация что в хорошем большом воркфлоу можно что то упустить. я бы может не усложнял сейчас, но запомнил след идею: надо РАСШИРТТЬ ВИДЖЕТ КОМАНД НАШИМИ ЮЗКЕЙСАМ чтобы можно было нажать кнопку и в чат ввелась инфа о конкр юзкейсе по тому же принципу по кот мы работаем с командами, т е название юзкейса и если чат не помнит или не знает что это за юзкейс - направить его на соотв файлы (возможно стоит в тексте его направить именно на РЕГИСТР ЮЗКЕЙСОВ и оттуда он пройдется по роуту всех релевантных файлов документации для конкр юзкейса) . ну и рядом кнопка фулл, которая обязывает ии пройтись по релевантным файлам и не имеет этого "если чат не помнит или не знает" .

#### Source 2 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про РАЗДЕЛЕНИЕ КОМАНД И ЮЗКЕЙСОВ В ТАМПЕРМОНКИ согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно НЕ ДОБАВЛЯТЬ ЮЗКЕЙСЫ НА КОТОРЫЕ УЖЕ ЕСТЬ КОМАНДЫ, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь КНОПКУ КОТОРАЯ ВЫДАЕТ ПРОМПТ ДЛЯ НОВОГО ЧАТА и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-007"></a>
## CHAT-PI-007 — Adaptive And Full Direction/Use-Case Route Reading

### Full working meaning

Каждый projected Direction и use case должен иметь Adaptive и Full варианты. Adaptive использует уже прочитанный и всё ещё понятный контекст, но направляет чат к registry и owner route, если workflow неизвестен, забыт или неясен. Full всегда требует перечитать entry и весь релевантный owner route независимо от памяти текущего чата, не расширяясь в нерелевантные documentation families.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S2

> я думаю что нужно обозначить общие направления работы по типу планирования решения внутри которого могут быть отдельные эксплицитные юзкейсы, чтобы было видно над чем можно работать в целом и какие действия внутри(ты делал так в предыд ответе по сути) можно также упоминать отдельные части чтобы в большом воркфлоу не было упущено деталей, хотя я не уверен что возможна ситуация что в хорошем большом воркфлоу можно что то упустить. я бы может не усложнял сейчас, но запомнил след идею: надо расширтть виджет команд нашими юзкейсам чтобы можно было нажать кнопку и в чат ввелась инфа о конкр юзкейсе по тому же принципу по кот мы работаем с командами, т е название юзкейса и ЕСЛИ ЧАТ НЕ ПОМНИТ ИЛИ НЕ ЗНАЕТ что это за юзкейс - направить его на соотв файлы (возможно стоит в тексте его направить именно на регистр юзкейсов и оттуда он пройдется по роуту всех релевантных файлов документации для конкр юзкейса) . ну и РЯДОМ КНОПКА ФУЛЛ, которая обязывает ии пройтись по релевантным файлам и не имеет этого "если чат не помнит или не знает" .

---

<a id="chat-pi-008"></a>
## CHAT-PI-008 — New-Chat Documentation Onboarding

### Full working meaning

Helper должен иметь отдельную onboarding-кнопку для нового чата. Prompt знакомит чат с high-level архитектурой документации, указывает корневые файлы для чтения, объясняет различия Directions, use cases и commands, reusable и project-local layers, после чего помогает выбрать релевантное направление и пройти его owner route. Onboarding не должен требовать чтения всего репозитория или автоматически запускать несвязанную команду.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь КНОПКУ КОТОРАЯ ВЫДАЕТ ПРОМПТ ДЛЯ НОВОГО ЧАТА и помогает познакомиться с документацией, ГОВОРИТ ЧТО ПРОЧИТАТЬ и ОПЫСЫВАЕТ ХАЙ ЛЕВЕЛ ДОКУМЕНТАЦИИ, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-011"></a>
## CHAT-PI-011 — Maintain Documentation, Use Cases And Commands Direction

### Full working meaning

Направление работы с самой документационной системой должно называться и описываться как `Maintain Documentation, Use Cases And Commands`, а не как абстрактное `Maintain Documentation System`. Оно охватывает архитектуру и ownership документации, use-case registry, coverage, command routes, навигацию и projection. `Coordinate Parallel Work` пока не включается в основной список Directions до появления ясной повторяемой пользовательской потребности.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. COORDINATE PARALLEL WORK ПОКА НЕ ДОБАВЛЯТЬ, не совсем ясно нужен ли он.  Direction 3 — MAINTAIN DOCUMENTATION SYSTEM НЕ ПОНЯТНОЕ НАЗВАНИЕ, тут скорее МЕЙНТЕЙН ДОКУМЕНТЕЙШН, ЮЗКЕЙСЕС И КОММАНДС. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-012"></a>
## CHAT-PI-012 — Auxiliary Solutions Must Have Their Own Use-Case Inventory

### Full working meaning

Когда для решения основной задачи создаётся вспомогательный слой — framework, documentation system, planning system, codebase tooling, automation layer или другой регулярно используемый инструмент — его следует планировать как самостоятельное пользовательское решение. Для него пропорционально определяются акторы, пользовательские цели, use cases, workflows, результаты, usability, failure/recovery situations и точки входа. Принцип относится не только к конечным приложениям, но и к средствам, с помощью которых они создаются.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ВЕДЕНИЯ СПИСКА СЦЕНАРИЕВ ИСПОЛЬЗОВАНИЯ ДЛЯ ЛЮБОГО РЕШЕНИЯ , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится ВСПОМОГАТЕЛЬНЫЙ СЛОЙ, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно ОТНОСИТЬСЯ К НЕМУ КАК К ПРИЛОЖЕНИЮ со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

---

<a id="chat-pi-013"></a>
## CHAT-PI-013 — Plan A Solution Or Workflow Direction

### Full working meaning

Документация должна явно поддерживать Direction `Plan A Solution Or Workflow`, который помогает понять текущую ситуацию, разобрать существующий workflow и проблемы, исследовать готовые решения, сформировать Full Picture, работать с Planning Items, alternatives, branches, tests и prototypes. Внутри направления допускаются отдельные independently useful use cases, но их выполнение не является обязательной универсальной последовательностью.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить юзкейсы которые не являются командами т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, ПЛАНИРОВАНИЕ РЕШЕНИЯ (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть ПЛАНИРОВАНИЕ  ПРОТОТИПА(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет РАЗВЕТВЛЕНИЕ В ПЛАНИРОВАНИИ т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно СУЩЕСТВУЮЩИЕ РЕШЕНИЯ для проблемы  , где разбираем сцществвующий вокрфлоу решения какой то проблемы . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что не все кейсы обязаня быть всегда выполнены - это именно возможные кейсы поддержанные документацией

---

<a id="chat-pi-014"></a>
## CHAT-PI-014 — Perform Detailed Scenario Domain And Slice Planning Direction

### Full working meaning

Документационная система должна поддерживать отдельное Work Direction для подробного планирования выбранного решения: Draft Detailed Scenario, Draft or Review Domain, Plan Implementation Slice и review их согласованности. Направление использует существующую глубокую Scenario/Domain/Slice methodology и объясняет отношения между этими use cases. Восстановление detailed owners не является новым pending item, поскольку эта работа уже проводилась ранее. Prototype-depth adaptation намеренно не включена: она будет отдельной следующей задачей после изучения полного deep-planning workflow.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить юзкейсы которые не являются командами т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, планирование решения (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть ПЛАНИРОВАНИЕ  ПРОТОТИПА(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет разветвление в планировании т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно существующие решения для проблемы  , где разбираем сцществвующий вокрфлоу решения какой то проблемы . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что не все кейсы обязаня быть всегда выполнены - это именно возможные кейсы поддержанные документацией

#### Source 2 — S10

> CHAT-PI-022 и 018 скорее как итоговый и временный вариант работы с айтемами, имеет смысл оба добавить и чтобы роутинг команды по айтемам позволял это увидеть, но в будущем может понадобиться убрать вариант  с файлом. RESTORE DETAILED SCENARIO/DOMAIN/SLICE OWNERS ты как будто и так уже делал.PROTOTYPE-DEPTH SCENARIO/DOMAIN/SLICE PLANNING нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. с остальным согласен

#### Source 3 — S11

> давай обновленный файл. PROTOTYPE-DEPTH SCENARIO/DOMAIN/SLICE PLANNING МОЖНО НЕ ВКЛЮЧАТЬ мы след задачей будем его делать

---

<a id="chat-pi-015a"></a>
## CHAT-PI-015A — Understand Current Workflow And Reality As An Explicit Use Case

### Full working meaning

Solution planning documentation должна поддерживать independently useful use case для разбора текущего способа решения проблемы: существующего workflow, фактических участников, входов, действий, обходных путей, ограничений, experienced problems и текущих результатов. Use case может запускаться отдельно либо быть входом в более широкое Plan A Solution Or Workflow Direction. Его результат должен быть достаточно понятен новому чату и пригоден как основание для дальнейшего Full Picture, comparison или redesign.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.
- Note: Split from former CHAT-PI-015.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить юзкейсы которые не являются командами т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, планирование решения (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть планирование  прототипа(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет разветвление в планировании т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно существующие решения для проблемы  , где РАЗБИРАЕМ СЦЩЕСТВВУЮЩИЙ ВОКРФЛОУ РЕШЕНИЯ КАКОЙ ТО ПРОБЛЕМЫ . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что не все кейсы обязаня быть всегда выполнены - это именно возможные кейсы поддержанные документацией

---

<a id="chat-pi-015b"></a>
## CHAT-PI-015B — Research Existing Solutions And Alternative Workflows As A Provisional Explicit Use Case

### Full working meaning

Solution planning documentation должна поддерживать independently useful use case для исследования уже существующих решений проблемы и альтернативных workflows. Use case регистрируется как отдельная полезная точка входа и связывается с текущим solution-planning workflow, но process maturity остаётся provisional. Сейчас не следует преждевременно проектировать отдельный большой research workflow, comparison model, source-quality process, category-specific presets или собственный Full Picture. Улучшенный процесс разрабатывается позже на основе реального опыта, когда станет ясно, какие повторяемые проблемы действительно требуют отдельного owner workflow.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.
- Note: Updated: supported use case, provisional process, no premature specialized workflow.

### Full user-message source(s)

#### Source 1 — S1

> значит что сейчас нужно составить юзкейсы которые не являются командами т к то что сейчас это чистые комманды. какие юзкейсы могут быть у нашей док системы - у нас есть как бы вложенные юз кейсы, планирование решения (там где все эти айтемы и тд) (имеет смысл наверное выделить какие действия могут быть совершены или нужны/юзкейсы могут быть в рамках этого общего планирования решения, это может быть не обязательно т к у нас есть один воркфлоу который все включает но надо уточнить есть ли какие то более менее значимыве вещи которые стоит выделить отдельно чтобы когда я говорил это в неопытный или нагруженный чат  - имело смысл чтобы этот юзкейс был выделен отдельно )в нем может быть планирование  прототипа(то для чего еще нет отдельной документации, надо будет создать на основе планирования полоноценного приложения) , плюс может возможно отдлеьно можно выделить кейс когда у нас идет разветвление в планировании т к это может быть комплексной темой (возможно для этого даже есть свой вокрфлоу, в целом все для чего есть отдельный вокрфлоу  -- точно стоит делать отдельный юзкейс в списке доступных юзкейсов), также у нас может быть юзкейс где мы разбираем эксплицитно - нужно СУЩЕСТВУЮЩИЕ РЕШЕНИЯ ДЛЯ ПРОБЛЕМЫ  , где разбираем сцществвующий вокрфлоу решения какой то проблемы . короче, надо поднять все вокрфлоу которые там есть и те что я упомянул и создать предварительный список юзкейсов в которых может быть полезна наша документация и предварительный набор файлов которые полезны для каждого юзкейса(в которых он описан), нужно понимать что не все кейсы обязаня быть всегда выполнены - это именно возможные кейсы поддержанные документацией

#### Source 2 — S12

> т е у нас будет например папка по планированию решений(уже есть) и в ней полная картина что включает в себя и другие полные картины, внутренние, но эти картины это ссылочные обьекты в этой картине, переданные по ссылке а живут они в вподпапках в своих полных картинах. отдельно стоит иметь файл Direction registry для папки с каждым направлением и будет внешний Direction registry который будет иметь все как ссылочные обьекты из локальных , по типу того как онно будет с картинами и он будет рядом с юзкейс мепом, не в нем. EXISTING SOLUTIONS RESEARCH ЗАСЛУЖИВАЕТ БОЛЕЕ КАЧЕСТВЕННОГО ПРОЦЕССА возможно но НЕЛЬЗЯ ПОКА СКАЗАТЬ КАКОГО, В БУДУЩЕМ НА ОПЫТЕ может что то придумаю, пока что так.. Source Idea entity -  покабез. . вот ответ чата:

---

<a id="chat-pi-016"></a>
## CHAT-PI-016 — Extract Planning Items From Discussion Command

### Full working meaning

Нужно создать отдельную команду и owner route для формирования или обновления Planning Items из активного разговора либо выбранного source. Команда пригодна для передачи новому чату, имеет Adaptive и Full route-reading modes и читает item terminology, formation rules, действующие input conventions, current item state и релевантные canonical owners. Route должен явно показывать два режима: application-native item workflow и portable Markdown review/ledger workflow. В режиме `auto` используется application-native mode, когда доступна интеграция приложения; иначе используется portable Markdown. Full-вызов обязан прочитать оба owner workflow и текущее правило выбора, не предполагая, что файловый fallback уже отменён.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас КОМАНДА КОТОРАЯ ОТВЕЧАЕТ ЗА СОЗДАНИЕ АЙТЕМОВ ИЗ РАЗГОВОРА? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна КНОПКА ФУЛЛ как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, навигация для любых маркдаун файлов документации через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

#### Source 2 — S10

> CHAT-PI-022 И 018 скорее как итоговый и временный вариант работы с айтемами, имеет смысл оба добавить и чтобы РОУТИНГ КОМАНДЫ ПО АЙТЕМАМ позволял это увидеть, но в будущем может понадобиться убрать вариант  с файлом. Restore Detailed Scenario/Domain/Slice Owners ты как будто и так уже делал.Prototype-Depth Scenario/Domain/Slice Planning нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. с остальным согласен

---

<a id="chat-pi-017"></a>
## CHAT-PI-017 — Accumulating Full Item Meaning In Main Response Sections

### Full working meaning

На этапах, после которых ещё будет общее уточнение Full Picture, основные содержательные пункты ответа AI должны быть накапливающимися полными версиями смысла соответствующих Planning Items. Пользователь читает эти подробные разборы в первую очередь; отдельная поздняя переформулировка того же смысла создаёт дублирование, дополнительную работу и риск потери уже раскрытых деталей. Поэтому итоговый item не должен быть ленивым кратким пересказом: он использует полный document-ready раздел ответа как своё meaning body либо материализует его полностью. При последующем рассмотрении общей картины item meaning можно упростить, исправить, разделить или объединить.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S9

> я говорил о том  что можно, особенно на этапах после которых будет еще общее уточнение полной картины, ПРИНИМАТЬ В КАЧЕСТВЕ СМЫСЛА АЙТЕМА - то что ии дает в качестве ПОЛНОГО ОПИСАНИЯ С ПОДРОБНОСТЯМИ т к это то что я читаю в первую очередь, а если мне выдавать что то другое но с тем же смыслом это ДУБЛИРОВАНИЕ РАБОТЫ + РИСК ПОТЕРИ ДАННЫХ + ии может лениво выдать после того как подробно расписал основную часть и не заметить чего то. нужно чтобы в основных пунктах выдавалась ПОЛНАЯ НАКАПЛИВАЮЩАЯСЯ ВЕРСИЯ СМЫСЛА АЙТЕМА , потом можно будет упростить или исправить когда будем рассматривать общие картины для всех непринятых планнинг айтемов. плюс я заметил что Source excerpt реально плохо выделяются, это вообще нужно чтобы проследить за мыслью и понять смысл, а ты какой то обрубок берешь по типу «не отдельных функционал, а готовые вещи на основе общего функционала приложения» без контекста. я думаю чтобы это исправить надо более структурированно будет доавать сообщения с помощью приложения и легкого шаблона для разных тем и внутренних тем/идей + нужно не выделять сорс, а брать полоностью сообщение и выделять в нем капсом релевантные части.   и так показывать сорс , для каждого айтема, даже если одно и то же сообщ повтторяется. если нескольк  сообщений, то нужно соблюдать их порядок при показе сорса. также вспомни все предыдущие айтемы которые были созданы относительно недавно в этом чате и не добавлены в доки ни в каком виде, но которые как бы не были отвергнуты, ничего не упусти, выдай их в файле, даже учитывая что они не приняты эксплицитно, я просмотрю айтемы в этом файле и дальше решение будет по принятию не принятию

---

<a id="chat-pi-018"></a>
## CHAT-PI-018 — Portable Markdown Item Review And Ledger Workflow

### Full working meaning

Когда application-native item integration недоступна или нужен переносимый fallback, команда item extraction использует portable Markdown review-and-ledger workflow. AI свободно даёт необходимые объяснения и полные накапливающиеся item meanings в основной части ответа. В конце он обязательно показывает полные resulting versions всех новых и исправленных Planning Items как review surface. Ранее одобренные items находятся в переносимом Markdown ledger; новые и исправленные items добавляются только после явного пользовательского одобрения, после чего чат возвращает полную обновлённую версию файла. Этот workflow является текущим transitional/fallback mode и в будущем может быть сужен до export/interoperability либо удалён, если application-native mode полностью его заменит.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я ПОДТВЕРДИЛ - ПОМЕЩАЕТСЯ В МАРКДАУН ФАЙЛ и чат дает этот файл, там где НОВЫЕ ИЛИ ИСПРАВЛЕННЫЕ - В КОНЦЕ сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), ПОСЛЕ ОДОБРЕНИЯ ТАКЖЕ ДОБАВЛЯЮТСЯ В ФАЙЛ - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом через конфигурацию можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

#### Source 2 — S10

> CHAT-PI-022 и 018 скорее как итоговый и ВРЕМЕННЫЙ ВАРИАНТ РАБОТЫ С АЙТЕМАМИ, имеет смысл оба добавить и чтобы роутинг команды по айтемам позволял это увидеть, но в будущем может понадобиться УБРАТЬ ВАРИАНТ  С ФАЙЛОМ. Restore Detailed Scenario/Domain/Slice Owners ты как будто и так уже делал.Prototype-Depth Scenario/Domain/Slice Planning нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. с остальным согласен

---

<a id="chat-pi-019"></a>
## CHAT-PI-019 — Full-Message Source Presentation With Relevant Spans Highlighted

### Full working meaning

Для каждого Planning Item source review должен показывать полное пользовательское сообщение, а не вырванный короткий Source Excerpt. Релевантные части полного сообщения выделяются верхним регистром, чтобы можно было проследить ход мысли и одновременно увидеть окружающий контекст. Одно и то же полное сообщение повторяется у каждого item, который оно поддерживает. Если item поддерживается несколькими сообщениями, они показываются в хронологическом порядке. Точные anchors могут дополнять полное сообщение, но не заменяют его в review-представлении.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S9

> я говорил о том  что можно, особенно на этапах после которых будет еще общее уточнение полной картины, принимать в качестве смысла айтема - то что ии дает в качестве полного описания с подробностями т к это то что я читаю в первую очередь, а если мне выдавать что то другое но с тем же смыслом это дублирование работы + риск потери данных + ии может лениво выдать после того как подробно расписал основную часть и не заметить чего то. нужно чтобы в основных пунктах выдавалась полная накапливающаяся версия смысла айтема , потом можно будет упростить или исправить когда будем рассматривать общие картины для всех непринятых планнинг айтемов. плюс я заметил что SOURCE EXCERPT РЕАЛЬНО ПЛОХО ВЫДЕЛЯЮТСЯ, это вообще нужно чтобы проследить за мыслью и понять смысл, а ты какой то обрубок берешь по типу «не отдельных функционал, а готовые вещи на основе общего функционала приложения» без контекста. я думаю чтобы это исправить надо более структурированно будет доавать сообщения с помощью приложения и легкого шаблона для разных тем и внутренних тем/идей + нужно не выделять сорс, а БРАТЬ ПОЛОНОСТЬЮ СООБЩЕНИЕ и ВЫДЕЛЯТЬ В НЕМ КАПСОМ РЕЛЕВАНТНЫЕ ЧАСТИ.   и так показывать сорс , ДЛЯ КАЖДОГО АЙТЕМА, даже если одно и то же сообщ повтторяется. если нескольк  сообщений, то нужно СОБЛЮДАТЬ ИХ ПОРЯДОК при показе сорса. также вспомни все предыдущие айтемы которые были созданы относительно недавно в этом чате и не добавлены в доки ни в каком виде, но которые как бы не были отвергнуты, ничего не упусти, выдай их в файле, даже учитывая что они не приняты эксплицитно, я просмотрю айтемы в этом файле и дальше решение будет по принятию не принятию

---

<a id="chat-pi-020"></a>
## CHAT-PI-020 — Structured User Message Composer With Lightweight Topic Templates

### Full working meaning

Documentation Workbench должен помогать пользователю структурировать длинное сообщение до отправки в AI, сохраняя literal wording. Лёгкий composer/template позволяет выделять темы, подтемы, идеи, вопросы, corrections, examples и explicit item boundaries. Каждый фрагмент получает стабильный адрес. Это уменьшает риск неправильной AI-normalization, когда одна идея распределена по началу, середине и концу сообщения либо переплетается с другими идеями, и улучшает точность source mapping без принудительного переписывания пользовательского текста.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо ЛУЧШЕ СОСТАВЛЯТЬ СООБЩЕНИЯ от меня чату, мб чтобы в прилоджении был какой то функционал по типу РАЗДЕЛЕНИЯ НА ОТДЕЛЬНЫЕ ТЕМЫ И ПОДТЕМЫ или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к ИДЕИ МОГУТ БЫТЬ РАСПРЕДЕЛЕНЫ по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

#### Source 2 — S9

> я говорил о том  что можно, особенно на этапах после которых будет еще общее уточнение полной картины, принимать в качестве смысла айтема - то что ии дает в качестве полного описания с подробностями т к это то что я читаю в первую очередь, а если мне выдавать что то другое но с тем же смыслом это дублирование работы + риск потери данных + ии может лениво выдать после того как подробно расписал основную часть и не заметить чего то. нужно чтобы в основных пунктах выдавалась полная накапливающаяся версия смысла айтема , потом можно будет упростить или исправить когда будем рассматривать общие картины для всех непринятых планнинг айтемов. плюс я заметил что Source excerpt реально плохо выделяются, это вообще нужно чтобы проследить за мыслью и понять смысл, а ты какой то обрубок берешь по типу «не отдельных функционал, а готовые вещи на основе общего функционала приложения» без контекста. я думаю чтобы это исправить надо более СТРУКТУРИРОВАННО будет доавать сообщения с помощью приложения и ЛЕГКОГО ШАБЛОНА ДЛЯ РАЗНЫХ ТЕМ и внутренних тем/идей + нужно не выделять сорс, а брать полоностью сообщение и выделять в нем капсом релевантные части.   и так показывать сорс , для каждого айтема, даже если одно и то же сообщ повтторяется. если нескольк  сообщений, то нужно соблюдать их порядок при показе сорса. также вспомни все предыдущие айтемы которые были созданы относительно недавно в этом чате и не добавлены в доки ни в каком виде, но которые как бы не были отвергнуты, ничего не упусти, выдай их в файле, даже учитывая что они не приняты эксплицитно, я просмотрю айтемы в этом файле и дальше решение будет по принятию не принятию

---

<a id="chat-pi-021"></a>
## CHAT-PI-021 — Typed Many-To-Many Source Contributions Without A Source Idea Entity For Now

### Full working meaning

Связь source material с Planning Items должна быть many-to-many и typed. Один item может иметь несколько сообщений или фрагментов с ролями Primary, Supporting, Clarifying, Correcting, Contradicting, Example или Confirmation. Один source fragment может поддерживать несколько items с разными contribution roles. При merge items все source contributions объединяются и дедуплицируются без потери порядка, ролей, absorbed identities и provenance; при split один source может остаться связанным с несколькими resulting items. Отдельная `Source Idea` entity пока не вводится. Непрерывные и распределённые части одной мысли связываются несколькими Source Contributions. К отдельной сущности возвращаются только при появлении самостоятельного review, lifecycle, reuse, navigation, editing или grouping, которое нельзя удобно получить как projection.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.
- Note: Updated: Source Idea is deferred, not an equal current model option.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять НЕСКОЛЬКО СОРСОВ, один по сути будет ГЛАВНЫЙ, ДРУГИЕ ВСПОМОГАТЕЛЬНЫЕ . плюс у нас же есть возможность МЕРДЖИТЬ АЙТЕМЫ , значит нужно и СОРСЫ БЫЛО МЕРДЖИТЬ. тут это решится

#### Source 2 — S12

> т е у нас будет например папка по планированию решений(уже есть) и в ней полная картина что включает в себя и другие полные картины, внутренние, но эти картины это ссылочные обьекты в этой картине, переданные по ссылке а живут они в вподпапках в своих полных картинах. отдельно стоит иметь файл Direction registry для папки с каждым направлением и будет внешний Direction registry который будет иметь все как ссылочные обьекты из локальных , по типу того как онно будет с картинами и он будет рядом с юзкейс мепом, не в нем. Existing Solutions research заслуживает более качественного процесса возможно но нельзя пока сказать какого, в будущем на опыте может что то придумаю, пока что так.. SOURCE IDEA ENTITY -  ПОКАБЕЗ. . вот ответ чата:

---

<a id="chat-pi-022"></a>
## CHAT-PI-022 — Application-Native Item Review And Managed Object Workflow

### Full working meaning

Целевой item workflow должен использовать structured, template-linked AI response как addressable file-like work artifact. AI формирует полные document-ready semantic sections и итоговый блок proposed Planning Items. Приложение распознаёт existing object references и proposed items, показывает review, а после подтверждения создаёт Planning Item сразу как managed Reference Object категории Planning Item. Addressable explanation section может использоваться как полное meaning body, раскрываться inline, открываться через navigation и становиться source для нового объекта. Existing referenced objects могут отображаться в response view полным текстом с переходом к canonical source. Workflow использует Working Planning Item Store и documentation-state views, а portable Markdown ledger остаётся отдельным fallback/export mode, а не обязательным промежуточным шагом.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал ПУНКТЫ ОТВЕТА С ПОДРОБНЫМ РАЗБОРОМ/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу СОЗДАТЬ ОБЬЕКТ ИЗ ПУНКТА с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со ВСТАВКОЙ УЖЕ СУЩСТВУЮЩИХ из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием ВРЕМЕННЫХ ОБЬЕКТОВ ПЛАННИГ АЙТЕМОВ - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

#### Source 2 — S9

> я говорил о том  что можно, особенно на этапах после которых будет еще общее уточнение полной картины, принимать в качестве СМЫСЛА АЙТЕМА - то что ии дает в качестве ПОЛНОГО ОПИСАНИЯ С ПОДРОБНОСТЯМИ т к это то что я читаю в первую очередь, а если мне выдавать что то другое но с тем же смыслом это дублирование работы + риск потери данных + ии может лениво выдать после того как подробно расписал основную часть и не заметить чего то. нужно чтобы в основных пунктах выдавалась полная накапливающаяся версия смысла айтема , потом можно будет упростить или исправить когда будем рассматривать общие картины для всех непринятых планнинг айтемов. плюс я заметил что Source excerpt реально плохо выделяются, это вообще нужно чтобы проследить за мыслью и понять смысл, а ты какой то обрубок берешь по типу «не отдельных функционал, а готовые вещи на основе общего функционала приложения» без контекста. я думаю чтобы это исправить надо более структурированно будет доавать сообщения с помощью приложения и легкого шаблона для разных тем и внутренних тем/идей + нужно не выделять сорс, а брать полоностью сообщение и выделять в нем капсом релевантные части.   и так показывать сорс , для каждого айтема, даже если одно и то же сообщ повтторяется. если нескольк  сообщений, то нужно соблюдать их порядок при показе сорса. также вспомни все предыдущие айтемы которые были созданы относительно недавно в этом чате и не добавлены в доки ни в каком виде, но которые как бы не были отвергнуты, ничего не упусти, выдай их в файле, даже учитывая что они не приняты эксплицитно, я просмотрю айтемы в этом файле и дальше решение будет по принятию не принятию

#### Source 3 — S10

> CHAT-PI-022 И 018 скорее как ИТОГОВЫЙ И ВРЕМЕННЫЙ ВАРИАНТ работы с айтемами, имеет смысл оба добавить и чтобы роутинг команды по айтемам позволял это увидеть, но в будущем может понадобиться убрать вариант  с файлом. Restore Detailed Scenario/Domain/Slice Owners ты как будто и так уже делал.Prototype-Depth Scenario/Domain/Slice Planning нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. с остальным согласен

---

<a id="chat-pi-023"></a>
## CHAT-PI-023 — Working Planning Item Store And Documentation-State Views

### Full working meaning

После пользовательского подтверждения Planning Items могут существовать в отдельном Working Planning Item Store до интеграции в durable documentation. Proposed text внутри ответа ещё не является отдельной persisted candidate entity; после подтверждения он становится обычным Working Planning Item. Система должна показывать views для Working, Needs Documentation, Documented/Integrated, Unresolved, Deferred, Absorbed/Superseded и Rejected items. Физическое хранение — app-only, repository JSON, Markdown ledger или hybrid — остаётся prototype/architecture decision.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то НАХОДЯЩИЕСЯ В ПРОЦЕССЕ ПЛАНИРОВАНИЯ ПЛАННИНГ АЙТЕМЫ вместо создания локального файла - держим в приложении в мб В КАКОМ ТО ФАЙЛЕ JSON В РЕПО и будет как раз возм посмотреть НЕОБРАБОТАННЫЕ/ НЕ ВВЕДЕННЫЕ В ДОКИ планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-024"></a>
## CHAT-PI-024 — Explicit Configurable Planning Item Delimiters

### Full working meaning

Пользователь может обозначить границу предполагаемого Planning Item маркерами `it(` и `)it`. Маркер означает просьбу проверить enclosed fragment как самостоятельный item, но не заставляет AI принять ровно один item: возможны split, merge/update существующего item, supporting-source disposition или аргументированное отклонение отдельности. Opening/closing delimiters хранятся в project-readable conventions file и являются configurable application settings. Full-вызов item-extraction команды всегда перечитывает этот файл, чтобы новый чат использовал актуальное обозначение.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, навигация для любых маркдаун файлов документации через приложение)). также стоит договориться о каком то ОБОЗНАЧЕНИИ ТОГО, ЧТО Я В СВОЕМ СООБЩЕНИИ УЖЕ СЧИТАЮ ОТДЕЛЬНЫМ АЙТЕМОМ, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это НЕ БУКВАЛЬНО ПРИКАЗ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

#### Source 2 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал НАЧАЛО ИТЕМА IT( И КОНЕЦ )IT. также стоит добавить в команду нахождения итемов ПУТЬ К ФАЙЛУ что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом ЧЕРЕЗ КОНФИГУРАЦИЮ можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

---

<a id="chat-pi-025"></a>
## CHAT-PI-025 — Configurable Application Settings

### Full working meaning

Приложение должно иметь общую settings-модель для значений, которые разумно изменять без изменения исходного кода. К ним относятся marker delimiters, planning input conventions, paths, view/navigation defaults, UI labels, parser/integration options и другие неинвариантные значения. Documentation conventions являются одной категорией settings. Изменение setting, влияющего на workflows, examples, prompts или parser contracts, должно подготавливать контролируемый docs/config ChangeSet и review, а не выполнять blind global replacement.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, навигация для любых маркдаун файлов документации через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно СОЗДАТЬ НАСТРОЙКИ ДЛЯ ПРИЛОЖЕНИЯ чтобы можно было менять какие то значения которые НЕ СТОИТ ХАРДКОДИТЬ, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

#### Source 2 — S6

> я не знаю что может быть общей единицей апп мемори и не быть референс обьектом. Несоответствие 2 - понятие Reference Object имеет смысл в рамках работы с документами с помощью приложения , т е это что то что появляется когда мы добавляем это в доки тем или иным образом, планнинг айтем может существовать в локальной памяти чата. он может быть референс обьектом и после добавления тоже, но тут то я  и хотел ввести новое поняте айтема который отходит от планнинг айтема т к мы уже отпланировали значимые части и сохраняет только некоторые поля (вспомни что я говорил про инфо айтем когда речь зашла об этом ) и чтобы он был в реюзабл доках а не в планнинг драфтах и одноразках в которых обязательно надо чтобы айтемы были именно планнинг всегда т к это планнинг вокрфлоу.  по всем новым терминам в целом согласен , только Configurable Documentation Convention не подходит, там скорее про необзодимость ввести НАСТРОЙКИ ДЛЯ ВСЕХ ЗНАЧЕНИЙ ЧТО ИМЕЕТ СМЫСЛ КОНФИГУРИРОВАТЬ, хотя можно в целом ввести и отдельное описание конфигурироуемого дока. не понятна четкая разница, обьясни: Source Excerpt — буквальный supporting fragment; Source Anchor — адрес excerpt: chat turn, path, heading, line range, object ID, selection range или imported fragment ID; Provenance — происхождение и transformation history; Origin;

#### Source 3 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом ЧЕРЕЗ КОНФИГУРАЦИЮ можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

---

<a id="chat-pi-026"></a>
## CHAT-PI-026 — One Planning Item Entity Across Draft And Reusable Documentation

### Full working meaning

Planning Drafts, chat workspaces, project-local registers и reusable documentation используют одну semantic entity `Planning Item`; отдельный post-planning Information Item пока не вводится. Различается не тип сущности, а место, состояние проработки и пропорциональный набор актуальных полей. В reusable documentation следует быстрее закрывать существенные ambiguities, conflicts, risks, questions и evidence needs, но item может временно сохранять незакрытые concerns, tests или prototypes. После resolution поля могут упроститься, не меняя item identity и semantic type.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ссылку на обссуждение и сообщение чата и мб точное место (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл РАЗДЕЛИТЬ ПЛАННИНГ АЙТЕМ И ИНФО АЙТЕМ - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

#### Source 2 — S6

> я не знаю что может быть общей единицей апп мемори и не быть референс обьектом. Несоответствие 2 - понятие Reference Object имеет смысл в рамках работы с документами с помощью приложения , т е это что то что появляется когда мы добавляем это в доки тем или иным образом, планнинг айтем может существовать в локальной памяти чата. он может быть референс обьектом и после добавления тоже, но тут то я  и хотел ввести НОВОЕ ПОНЯТЕ АЙТЕМА КОТОРЫЙ ОТХОДИТ ОТ ПЛАННИНГ АЙТЕМА т к мы уже отпланировали значимые части и сохраняет только некоторые поля (вспомни что я говорил про инфо айтем когда речь зашла об этом ) и чтобы он был в реюзабл доках а не в планнинг драфтах и одноразках в которых обязательно надо чтобы айтемы были именно планнинг всегда т к это планнинг вокрфлоу.  по всем новым терминам в целом согласен , только Configurable Documentation Convention не подходит, там скорее про необзодимость ввести настройки для всех значений что имеет смысл конфигурировать, хотя можно в целом ввести и отдельное описание конфигурироуемого дока. не понятна четкая разница, обьясни: Source Excerpt — буквальный supporting fragment; Source Anchor — адрес excerpt: chat turn, path, heading, line range, object ID, selection range или imported fragment ID; Provenance — происхождение и transformation history; Origin;

#### Source 3 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я НЕ УВЕРЕН ЧТО НУЖНО БУКВАЛЬНО ДЕЛАТЬ ЧЕТКО ТИПИЗИРОВАННЫЕ РАЗНЫЕ СУЩНОСТИ, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как ОДНУ СУЩНОСТЬ ПЛАННИНГ АЙТЕМА, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом через конфигурацию можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

---

<a id="chat-pi-027"></a>
## CHAT-PI-027 — Retire Or Replace The Legacy Broad InformationItem Term

### Full working meaning

Старое определение `InformationItem` как общей единицы App Memory относится к другому понятию и создаёт неясность рядом с Reference Object и конкретными semantic types. Нужно провести полный usage audit и заменить каждое употребление конкретной сущностью — Planning Item, Reference Object, Source material, Raw Note, Decision, Concern record или technical App/Runtime Record. Общий пользовательский umbrella-термин `InformationItem` не сохраняется без доказанной самостоятельной ответственности.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая РАЗНИЦА МЕЖДУ ССЫЛОЧНЫМ ОБЬЕКТОМ И INFORMTION ITEM в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще НЕСООТАВЕТСТВИЯ И СОМНИТЕЛЬНЫЕ МОМЕНТЫ + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, навигация для любых маркдаун файлов документации через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

#### Source 2 — S6

> я не знаю что может быть ОБЩЕЙ ЕДИНИЦЕЙ АПП МЕМОРИ И НЕ БЫТЬ РЕФЕРЕНС ОБЬЕКТОМ. Несоответствие 2 - понятие Reference Object имеет смысл в рамках работы с документами с помощью приложения , т е это что то что появляется когда мы добавляем это в доки тем или иным образом, планнинг айтем может существовать в локальной памяти чата. он может быть референс обьектом и после добавления тоже, но тут то я  и хотел ввести новое поняте айтема который отходит от планнинг айтема т к мы уже отпланировали значимые части и сохраняет только некоторые поля (вспомни что я говорил про инфо айтем когда речь зашла об этом ) и чтобы он был в реюзабл доках а не в планнинг драфтах и одноразках в которых обязательно надо чтобы айтемы были именно планнинг всегда т к это планнинг вокрфлоу.  по всем новым терминам в целом согласен , только Configurable Documentation Convention не подходит, там скорее про необзодимость ввести настройки для всех значений что имеет смысл конфигурировать, хотя можно в целом ввести и отдельное описание конфигурироуемого дока. не понятна четкая разница, обьясни: Source Excerpt — буквальный supporting fragment; Source Anchor — адрес excerpt: chat turn, path, heading, line range, object ID, selection range или imported fragment ID; Provenance — происхождение и transformation history; Origin;

#### Source 3 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, ПРЕДЫДУЩЕЕ ОПРЕДЕЛЕНИЕ ОТНОСИЛОСЬ К ДРУГОМУ и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно ПРОСМОТРЕТЬ ГДЕ ИСПЛЬЗУЕТСЯ СТАРОЕ ОПРЕДЕЛЕНИЕ и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом через конфигурацию можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

---

<a id="chat-pi-028"></a>
## CHAT-PI-028 — Persisted Managed Planning Items Are Reference Objects

### Full working meaning

Reference Object — это самостоятельно адресуемая и управляемая приложением единица смысла, которая была сохранена или импортирована в managed state Documentation Workbench и поэтому может разрешаться, показываться, связываться и использоваться приложением. Она может быть Markdown-backed или temporary app-only; обязательное присутствие в reusable Markdown не является условием. Неподтверждённое описание в обычном чате ещё не является Planning Item Reference Object. Proposed item внутри распознаваемого AI response остаётся proposal до review. После подтверждения Planning Item создаётся сразу как Reference Object категории Planning Item. Его последующее помещение в Planning Draft, reusable docs или другой Markdown owner не создаёт новый Reference Object, а меняет durability mode, canonical-state owner, definition location, home, relations, occurrences и Documentation Status.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S6

> я не знаю что может быть общей единицей апп мемори и не быть референс обьектом. Несоответствие 2 - понятие REFERENCE OBJECT ИМЕЕТ СМЫСЛ В РАМКАХ РАБОТЫ С ДОКУМЕНТАМИ с помощью приложения , т е это что то что появляется когда мы добавляем это в доки тем или иным образом, ПЛАННИНГ АЙТЕМ МОЖЕТ СУЩЕСТВОВАТЬ В ЛОКАЛЬНОЙ ПАМЯТИ ЧАТА. он может быть референс обьектом и после добавления тоже, но тут то я  и хотел ввести новое поняте айтема который отходит от планнинг айтема т к мы уже отпланировали значимые части и сохраняет только некоторые поля (вспомни что я говорил про инфо айтем когда речь зашла об этом ) и чтобы он был в реюзабл доках а не в планнинг драфтах и одноразках в которых обязательно надо чтобы айтемы были именно планнинг всегда т к это планнинг вокрфлоу.  по всем новым терминам в целом согласен , только Configurable Documentation Convention не подходит, там скорее про необзодимость ввести настройки для всех значений что имеет смысл конфигурировать, хотя можно в целом ввести и отдельное описание конфигурироуемого дока. не понятна четкая разница, обьясни: Source Excerpt — буквальный supporting fragment; Source Anchor — адрес excerpt: chat turn, path, heading, line range, object ID, selection range или imported fragment ID; Provenance — происхождение и transformation history; Origin;

#### Source 2 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как ПРИЛОЖЕНИЕ МОЖЕТ ОБРАБАТЫВАЬТ ОТВЕТ ЧАТА,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с СОЗДАНИЕМ ВРЕМЕННЫХ ОБЬЕКТОВ ПЛАННИГ АЙТЕМОВ - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-029"></a>
## CHAT-PI-029 — Planning Item Source And Conversation-History Navigation

### Full working meaning

Planning Item должен сохранять навигационную связь с точным пользовательским и assistant discussion context в immutable Conversation History. Из item можно перейти к сообщению или stable semantic fragment, увидеть предыдущие и следующие turns и использовать обычную navigation модель Markdown files. Full source review показывает целые сообщения, а exact anchors обеспечивают переход к местоположению. После интеграции в durable documentation source/provenance сохраняется пропорционально необходимости проверки, восстановления rationale или дальнейшего unresolved work.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S3

> когда чат поключился к середине имеет смысл познакомит его со всем процессом который будет хорошо описан цельными юзкейсами, лучше не усложнять. про разделение команд и юзкейсов в тампермонки согласен. Coordinate Parallel Work пока не добавлять, не совсем ясно нужен ли он.  Direction 3 — Maintain Documentation System не понятное название, тут скорее мейнтейн документейшн, юзкейсес и коммандс. как будто у нас есть команды которые уже буквально требуют немедленного ответа в нужном формате от ии, а есть юзкейсы для которых есть описание в документации и которые как бы настраивают на определнный вокрфлоу. мне нужны юзкейсы рядом с командами чтобы настроить чат, чтобы он понял что будет происходить и какой предполагаемый протокол действий. от меня первого может требоваться действие в этой ситуации. желательно не добавлять юзкейсы на которые уже есть команды, пока у нас нет нормального ссылочного функционала, чтобы было удобно это делать. также желательно иметь кнопку которая выдает промпт для нового чата и помогает познакомиться с документацией, говорит что прочитать и опысывает хай левел документации, ну и соответственно чтобы можно было познакомить чат с направлением а не только юзкейсами внутри него. это все нужно для  соблюдения принципа ведения списка сценариев использования для любого решения , не только приложения, но и того с помощью чего ты делаешь приложения - документации, кодовой базы и тд. этот принцип можно было бы явно куда то вклинить в планирование решений - когда для решения задачи вводится вспомогательный слой, какой то фреймворк или скорее интсрумент который ты строишь для решения задачи - нужно относиться к нему как к приложению со своими пользовательскими сценариями которые нужно учитывать чтобы тебе было максимлаьно удобно и полезно им пользоваться. это стоит сделать айтемом для будущего добавления. я бы также уточнил что наверное айтемы имеют смысл когда какая та инфа - часть планирования и еще окончательно не уложилась в существующую систему и тд, т е могут быть какие то вопросы, изменения и потребность в том чтобы сохранять сорсовый контекст т к не была создана полная картина  в результате чего ты просматриваешь все те идеи и тебе нужен часто сорсовый контекст чтобы слебить адекватную итоговую картину. после этого, хранить инфу в виде айтемов имеет смысл если это драфт, если это какой то план. если это что т очто стало частью каких принципов юзкейсов, т е метой планирования и документационной системы, то имеет смысл хранить ССЫЛКУ НА ОБССУЖДЕНИЕ И СООБЩЕНИЕ ЧАТА и мб ТОЧНОЕ МЕСТО (возможно это путь в файл истории с конкретной строкой если мы будем таким образом хранить), также имеет смысл хранить какие то вопросы если они не кончилисЬ , т е в зависимости от проработки айтема он может упроситься намеренно либо сохранить какие то свои части, но нет правила что ты должен хранить все ввиде айтемов, скорее ты должен обработаь инфу чтобы айтем упросился и над ним не надо было больше работать, чтобы ты мог ссылаться на него в других местах и в сл чего смотреть сорс (и то не так однозначно что это нужно после того ка кты составил полную картину и во всем разобрался). возможн оимеет смысл разделить планнинг айтем и инфо айтем - который сохраняется после удачного планирования и добавления планнинг айтема в долговечный слой документации, не в какой то одноразовый драфт планирования (там они всегда остаются планнинг айтемами)

#### Source 2 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ССЫЛКА НА ИСТОРИЮ ЧАТА (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и ПРЕДЫДУЩИЕ ПОСМОТРЕТЬ И СЛЕДУЮЩИЕ и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, НАВИГАЦИЯ ДЛЯ ЛЮБЫХ МАРКДАУН ФАЙЛОВ документации через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

---

<a id="chat-pi-030"></a>
## CHAT-PI-030 — Retire Origin As A Separate Canonical Term

### Full working meaning

Отдельный canonical term `Origin` избыточен, если он обозначает только первое source/creation location, уже представимое initial Source Anchor и первым событием Provenance. Его не нужно переопределять как файл появления Reference Object: для текущего файлового положения уже существуют Definition Location, canonical-state owner, Parent/Home и occurrences, и их следует оставить без изменений. Origin удаляется после usage audit, если не обнаружится независимая ответственность.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить отслеживание качества айтемов и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять насколько разобран айтем по своим консернам(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 ORIGIN И PROVENANCE У ТЕБЯ ПОВТОРЯЮТ СМЫСЛ. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и НАМ ПРОСТО НЕ НУЖЕН он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом через конфигурацию можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

#### Source 2 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. ORIGIN ИЗБЫТОЧЕН, ДЛЯ ФАЙЛА ПОЯВЛЕНИЯ ВСЕ СЕЙЧАС ТАК КАК НУЖНО, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-031"></a>
## CHAT-PI-031 — Concern-State Observability For All Supported Targets

### Full working meaning

Для всех target types, которые поддерживают concerns, система должна предоставлять observability текущего состояния проработки. Это не единая оценка качества, а derived view количества нерассмотренных concerns, открытых вопросов, непроверенных assumptions, active risks, необходимых tests/prototypes, blocked/deferred work и resolved directions. UI может показывать compact icons, numbers и drill-down до конкретных records. Concern targets не ограничиваются Reference Objects; используется фактическая поддерживаемая target model.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S7

> 1 лучше сделать сбор планнинг итемов след образом - там где я подтвердил - помещается в маркдаун файл и чат дает этот файл, там где новые или исправленные - в конце сообщения чата показываются и именно в полной версии, так как требует команда создания айтемов из обсуждения (с сорсом, нет олько с кандидатом смысла), после одобрения также добавляются в файл - это предпочтительный вокрфлоу, стоит это добавить. правда я бы не замещал подробные пункты ответа ии с обьясненими - показом полных версий исправленных айтемов, как будто нужно и то и то, в конце айтемы это как бы что то удобное для окончательного ревью  того что будет принято или отвергнуто, без подробных обьяснений которые могут идти в отдельных пунктах до этого (ии тут как бы может самое решить как удобее и понятнее дать ответ до этих айтемов, зависит от возможных других требований к шаблоны и от ситуации, не ограничиваем ии тут намеренно, только требуем айтемы в конце так как я это описал) 2 нужно понимать что я только что ввел info item, предыдущее определение относилось к другому и там где оно используется это все про совершенно другое и как будто не имеет смысла когда есть понятие референс обьекта, нужно просмотреть где испльзуется старое определение и поправить. 3 т е нужно именно стремление того чтобы в реюзабл документации  были не планнинг айтемы которые включают в себя поля для тестов/прототипов, а инфо айтемы, но я не уверен что нужно буквально делать четко типизированные разные сущности, т к возможно ситуация когда ты временно вводишь айтем в реюзабл доки ,но тебе нужно еще что то от планнинг айтема в нем, какие то незакрытые риски , тесты или вопросы + у инфо айтема могут появиться доп проблемы или вопрсоы. так что я бы сделал это как одну сущность планнинг айтема, разница между реюзабл доками и планнинг драфтом по сути в том что тебе желательно полностью закрыть все неоднозначности как можно быстрее для реюзабл доков, но наверное я поспешил с разными сущностями, надо добавить ОТСЛЕЖИВАНИЕ КАЧЕСТВА АЙТЕМОВ и именно универсальное для этой сущности, как для реюзабл доков так и для планнинг драфтов и тд, т е можно будет понять НАСКОЛЬКО РАЗОБРАН АЙТЕМ ПО СВОИМ КОНСЕРНАМ(у нас вроде было обсуждение про консерны, это по сути возможные направленяи для углоубления качества планирования конкретного айтема) имеет смысл дать возможность вручную проставлять галочки по консернам, как бы помечая что вот этот консерн обработан (это эксклюзивно для референс обьектов у которых есть консерны, надо определить что это за категории обьектов, только ли это планнинг айтемы) 4 origin и provenance у тебя повторяют смысл. provenance  в своем виде имеет смысл, но origin как будто изначально должен был обозначать файл в рамках которого появился референс обьект или я что то путаю? возможно путаю и нам просто не нужен он, когда есть ссылка на точно место anchor. 5 текущим обозначение кандидата на планнинг итем я предлагал начало итема it( и конец )it. также стоит добавить в команду нахождения итемов путь к файлу что будет содержать это обозначение(нужно чтобы так или иначе это было указано, чтобы потом через конфигурацию можно было поменять в доках это обозначения для начала и конца и выдать команду еще раз на фулл и чтобы чат подхватил  новое обозначение).

#### Source 2 — S8

> 1 я НЕ ГОВОРИЛ ЧТО КОНСЕРН ДОЛЖЕН БЫТЬ ТОЛЬКО ДЛЯ РЕФЕРЕНС ОБЬЕКТОВ, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее ОБСЕРВАБИЛИТИ, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то ЗНАЧКИ ввести напротив которых будут ЧИСЛА или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-032"></a>
## CHAT-PI-032 — Extensible Concern Lifecycle And Type-Specific Assessment

### Full working meaning

Concern должен иметь явное состояние. По умолчанию он не рассмотрен; далее может быть in review/in progress, deferred/return later, not applicable, already covered, applied, blocked, evidence-needed или resolved. Нужно определить, какие значения являются общими canonical lifecycle statuses, а какие — derived display states. Отдельные concern types могут иметь type-specific assessment fields и indicators, например question status, assumption verification, risk state, test/prototype progress или acceptance coverage, не заменяя общий lifecycle несовместимыми enum.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - ПО УМОЛЧАНИЮ НЕ РАССМОТРЕНО(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать СТАТУС ЧТО ВЕДЕТСЯ РАБОТА или ТРЕБУЕТСЯ ПОТОМ ВЕРНУТЬСЯ, ндао опрдеделиться с возможными статусами консернов. ДЛЯ КАЖДОГО ТИПА КОНСЕРНА можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем унифицированную систему по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то дашборд лайк представление для обсервабилити  и внедренными в маркдаун пометками что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать пресеты, не отдельных функкионал, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-033"></a>
## CHAT-PI-033 — Generic Concern Dashboard Through Views Presets And Contracts

### Full working meaning

Concern observability и documentation-specific planning dashboards должны строиться на общих возможностях Documentation Workbench: addressable targets, Reference Objects, categories/fields, Concern Definitions and Presets, Applied Concern records, View Presets, Object Category Field Contracts, Markdown markers и drill-down navigation. Конкретные use cases документационного слоя предоставляют готовые presets и contracts поверх общего functionality, а не отдельный hardcoded subsystem. Пользователь также может вручную собрать аналогичное представление для любого поддерживаемого target.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S8

> 1 я не говорил что консерн должен быть только для референс обьектов, я просил проверить как это на самом деле, я согласен с тем что есть. можно ввести оценку текущего состояния проработки для всего у чего есть консерны. эту оценку я мог назвать качеством проработки ранее, но это скорее обсервабилити, количество вопросов, нужных тестов/прототипов/асампшенов которые нужно проверить и тд . можно какие то значки ввести напротив которых будут числа или обозначения для обсервабилити сущьносей что поодерживают консерны. можно делать не галочку а возможность поставить статус - по умолчанию не рассмотрено(для консерна, таким образом можно выводить кол во не расмотренных консернов напротив какого нибудь значка) и можно дать статус что ведется работа или требуется потом вернуться, ндао опрдеделиться с возможными статусами консернов. для каждого типа консерна можно придумать свои статусы и то , что будет выводиться для обервабилити. вообще т к мы делаем УНИФИЦИРОВАННУЮ СИСТЕМУ по работе с файлами с помощью концепции референс обьектов, то надо придумать как это поместить в общую концепцию не вводя особого функционала какого то, наверное через какое то ДАШБОРД ЛАЙК ПРЕДСТАВЛЕНИЕ для обсервабилити  и внедренными в МАРКДАУН ПОМЕТКАМИ что есть что для приложения (уже по идее обсуждали)+ возможностью вручную сделать  то что я описал для любого ссылочного обьекта, чтобы для наших конкретных юзкейсов исходящих из самого док слоя мы можгли просто сделать ПРЕСЕТЫ, НЕ ОТДЕЛЬНЫХ ФУНККИОНАЛ, а готовые вещи на основе общего функционала приложения. нужны идеи, мб мы уже из того что есть можем реализовать нужную гибкость. также пришла идея что когда я вижу обьяснения некоторые то их прямо в таком виде и хочется добавить в доки т к нечего исправить. нужно чтобы ии формировал пункты ответа с подробным разбором/Обьяснением как что то что пойдет в документацию (будь то реюзабл или пункт план драфта) и в конце где я говорил надо в полном виде айтемы, чтобы чат говорил  что он прделагает в пункт описывающий смысл включить то что он выдал в таком то пункте (это должно быть удобно когда будет приложение т к можно будет перемещаться свободно по пунктам с помощью навигации(у нас же описано это в существующией документации? )) . т е можно будет иметь обширные и хорошо обьясненные смыслы для айтемов. плюс мы все равно будет в конце обьщую картину рассматривать и будут уточняться смыслы и при уточнениях также можно ссылкаться на какой то там пункт в котором раскрыт  смысл айтема подробно.  ну и приложение может позволить сразу создать обьект из пункта с описанием смысла и в конце ты сможешь раскрыть это описание по ссылке как текст не переходя по навигации к месту. правда тут уже идет речь о том как приложение может обрабатываьт ответ чата,  т е это не какой то файл который добавляется в документацию а именно доп функционал для удобства работы с ответами чата. со вставкой уже сущствующих из предыдущих действий обьектов (их полного текста с восможностью перейти к источнику) в представление ответа чата, чтобы лучше воспринимать этот отет + с созданием временных обьектов планниг айтемов - возможно стоит вести какие то находящиеся в процессе планирования планнинг айтемы вместо создания локального файла - держим в приложении в мб в каком то файле json в репо и будет как раз возм посмотреть необработанные/ не введенные в доки планниг айтемы. origin избыточен, для файла появления все сейчас так как нужно, менять не надо. также появилась идея что надо лучше составлять сообщения от меня чату, мб чтобы в прилоджении был какой то функционал по типу разделения на отдельные темы и подтемы или идеи внутри, чтобы более структурированно выдавать при том что часто в процессе написания сообщений приходят какие то мысли и получается не очень связно. также смущает тут то что сорсы могут быть не особо точными т к идеи могут быть распределены по типу - в начале сообщения, в середине и чуть чуть в конце а между - другие идеи. тут либо заставлять ии нормализовать но тогда будет как бы измененн сорс и есть риски - то что будет более структурированный запрос может помочь. была идея сделать сорсы с указанием ссылки на сообщение и конкр строки с началом предложения, возможно лучше реально ввести новые сущьности - сорс идеи или что то типо того. также смущало что иногда я выдаю переплетающиеся сообщения где описываю одну идею но она начинает относиться и к другой для которой возможно уже есть айтем , а соответственно и сорс, т е с новыми сущностями можно добавлять несколько сорсов, один по сути будет главный, другие вспомогательные . плюс у нас же есть возможность мерджить айтемы , значит нужно и сорсы было мерджить. тут это решится

---

<a id="chat-pi-034"></a>
## CHAT-PI-034 — Task-Oriented Documentation Navigation

### Full working meaning

Документационная навигация должна помогать отвечать не только на вопрос ownership, но и на практический вопрос пользователя: что я хочу сделать, с какого файла начать, какой route прочитать, какой результат получится и где хранится project-local state. Приложение должно поддерживать навигацию по любым Markdown files, sections, related objects, sources и history fragments через единый IDE-like механизм.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо просмотреть внимательнее термины и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал какие приняты там термины и какие еще надо принять по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, НАВИГАЦИЯ ДЛЯ ЛЮБЫХ МАРКДАУН ФАЙЛОВ ДОКУМЕНТАЦИИ через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

---

<a id="chat-pi-035"></a>
## CHAT-PI-035 — Planning And Documentation Terminology Consistency Audit

### Full working meaning

Нужно провести целостный terminology audit существующей reusable и project-local документации. Audit показывает принятые, provisional, conflicting, legacy и missing terms; сверяет определения с фактическими workflows и pending Planning Items; устраняет несогласованности вроде legacy InformationItem, Planning Item ↔ Reference Object, managed response fragments, source/provenance concepts и Work Direction ↔ Planning Direction. Для каждого сомнительного термина нужно показать current usages, owner, конфликт, required decision и безопасный interim wording. Audit сам по себе не должен молча переименовывать canonical concepts.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S5

> 1 не совсем ясно какая разница между ссылочным обьектом и informtion item в текущей документации, как будто это скорее ссылочный обьект, надо ПРОСМОТРЕТЬ ВНИМАТЕЛЬНЕЕ ТЕРМИНЫ и определить есть ли где то еще несоотаветствия и сомнительные моменты + в целом чтобы ты показал КАКИЕ ПРИНЯТЫ ТАМ ТЕРМИНЫ и КАКИЕ ЕЩЕ НАДО ПРИНЯТЬ по той документации которая уже есть в репо + по еще не принятым айтемам 2 есть ли у нас команда которая отвечает за создание айтемов из разговора? вроде нет. а воркфлоу файл для этого есть? надо наверное команду сделать чтобы явно можно было отправить новому чату чтобы он просмотрел нужные доки (т е также нужна кнопка фулл как и в др командах) . также желательно чтобы когда чат выводил какие есть айтемы, он еще и сорс выводил , не только кандидат смысла . вообще я бы хотел чтобы у айтемов был не только сорс который добавлен как бы вручную чатом и как бы одобрен мной, но и чтобы была ссылка на историю чата (мы планируем каким то образом хранить историю и могло бы быть полезно иметь возм перенестись от айтема к сообщению моему и твоему и при ээтом можно будет и предыдущие посмотреть и следующие и увидеть навигацию обсуждения. нужно только понять границы для этой навигации, предварительно мы сохраняем какую то часть смысловую в одном файле и можно сделать в приложении навигацию по этому файлу чтобы удобно просматривать эту историю(у нас вроде должны уже быть какие то идеи по навигации через приложение для маркдаун файлов, это именно так должно быть, навигация для любых маркдаун файлов документации через приложение)). также стоит договориться о каком то обозначении того, что я в своем сообщении уже считаю отдельным айтемом, или можно сделтаь команду что как бы будет говорить чату после какого то моего предложения, что я считаю это отдельным айтемом(т е если это вообще не отдщельный айтем и чат это понимает то он может возразить в моменте в этом, это не буквально приказ считать отдельным айтемом), наверное лучше обозначение (It )it, что то типо того. также пришла идея о том что нужно создать настройки для приложения чтобы можно было менять какие то значения которые не стоит хардкодить, по типу того что будет считаться обозначением для кандидата в айтемы (кандидат в айтемы = айтем по всем пунктам, не нужно создавать отдельную сущность) т е можно в настройках поменять и нажать обновление доков и там все поменяется .

#### Source 2 — S6

> я не знаю что может быть общей единицей апп мемори и не быть референс обьектом. Несоответствие 2 - понятие Reference Object имеет смысл в рамках работы с документами с помощью приложения , т е это что то что появляется когда мы добавляем это в доки тем или иным образом, планнинг айтем может существовать в локальной памяти чата. он может быть референс обьектом и после добавления тоже, но тут то я  и хотел ввести новое поняте айтема который отходит от планнинг айтема т к мы уже отпланировали значимые части и сохраняет только некоторые поля (вспомни что я говорил про инфо айтем когда речь зашла об этом ) и чтобы он был в реюзабл доках а не в планнинг драфтах и одноразках в которых обязательно надо чтобы айтемы были именно планнинг всегда т к это планнинг вокрфлоу.  по всем новым терминам в целом согласен , только Configurable Documentation Convention не подходит, там скорее про необзодимость ввести настройки для всех значений что имеет смысл конфигурировать, хотя можно в целом ввести и отдельное описание конфигурироуемого дока. НЕ ПОНЯТНА ЧЕТКАЯ РАЗНИЦА, обьясни: Source Excerpt — буквальный supporting fragment; Source Anchor — адрес excerpt: chat turn, path, heading, line range, object ID, selection range или imported fragment ID; Provenance — происхождение и transformation history; Origin;

---

<a id="chat-pi-036"></a>
## CHAT-PI-036 — Documentation Workbench Prototype Planning Draft Set

### Full working meaning

Для Documentation Workbench / Reference Object prototype нужен связанный project-local planning set: Prototype Scenario Draft, Prototype Domain Draft, Prototype Use-Case/Slice Draft, связь с Prototype Plan и affected decision, real/simulated boundary, evidence requirements и exit criteria. Набор должен быть достаточен для реализации и проверки выбранного прототипа, но не утверждать production completeness. Точная reusable prototype-depth methodology в этот item не входит и будет разрабатываться следующей задачей.

### Evidence and documentation status

- Evidence: prior conversation decision reaffirmed; exact earlier source should be restored before canonical acceptance.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S10

> CHAT-PI-022 и 018 скорее как итоговый и временный вариант работы с айтемами, имеет смысл оба добавить и чтобы роутинг команды по айтемам позволял это увидеть, но в будущем может понадобиться убрать вариант  с файлом. Restore Detailed Scenario/Domain/Slice Owners ты как будто и так уже делал.Prototype-Depth Scenario/Domain/Slice Planning нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. С ОСТАЛЬНЫМ СОГЛАСЕН

#### Source 2 — S11

> давай обновленный файл. PROTOTYPE-DEPTH SCENARIO/DOMAIN/SLICE PLANNING МОЖНО НЕ ВКЛЮЧАТЬ мы след задачей будем его делать

---

<a id="chat-pi-037"></a>
## CHAT-PI-037 — Simplified Two-Layer Documentation Workbench Prototype Architecture

### Full working meaning

Первый Documentation Workbench prototype использует Tampermonkey UI внутри ChatGPT, localhost ASP.NET Core companion-server и реальный Git worktree с Markdown files. Solution разделяется на Domain и Application: Domain владеет entities, value objects, invariants и domain policies; Application владеет use cases, orchestration, ASP.NET Core host, Markdown/filesystem integration, workspace state, ChangeSets и Git diff. Application зависит от Domain. Для первой версии не вводятся без доказанной необходимости MediatR/CQRS, отдельный Infrastructure project, база данных, automatic watcher, universal command endpoint или полный Markdown editor. Markdown остаётся durable source of truth; workspace indexes/session state являются derived/rebuildable; commit/push не входят в prototype execution.

### Evidence and documentation status

- Evidence: prior conversation architecture decision reaffirmed; exact earlier source should be restored before canonical acceptance.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S10

> CHAT-PI-022 и 018 скорее как итоговый и временный вариант работы с айтемами, имеет смысл оба добавить и чтобы роутинг команды по айтемам позволял это увидеть, но в будущем может понадобиться убрать вариант  с файлом. Restore Detailed Scenario/Domain/Slice Owners ты как будто и так уже делал.Prototype-Depth Scenario/Domain/Slice Planning нужно будет еще обсудить на основе того как выглядит глубокий планнинг , нужно упрощенная для прототипа версия. С ОСТАЛЬНЫМ СОГЛАСЕН

---

<a id="chat-pi-038"></a>
## CHAT-PI-038 — Recursive Full-Picture Ownership Through Reference Objects

### Full working meaning

Достаточно крупные documentation families и внутренние направления могут иметь собственные `full-picture.md`. Родительский Full Picture содержит дочерние Full Pictures как managed Reference Objects/occurrences и не копирует их canonical bodies. Дочерняя картина живёт в своей semantic/canonical home, обычно в соответствующей подпапке, и может раскрываться inline или открываться через navigation. Модель рекурсивна: один Full Picture может включать ссылки на несколько внутренних Full Pictures, а те — на свои дочерние картины. Новый дочерний Full Picture создаётся только при достаточной самостоятельности смысла, ownership, review и развития; целевая иерархия не означает немедленного создания каждой возможной папки.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S12

> т е у нас будет например ПАПКА ПО ПЛАНИРОВАНИЮ РЕШЕНИЙ(уже есть) и в ней ПОЛНАЯ КАРТИНА ЧТО ВКЛЮЧАЕТ В СЕБЯ И ДРУГИЕ ПОЛНЫЕ КАРТИНЫ, внутренние, но ЭТИ КАРТИНЫ ЭТО ССЫЛОЧНЫЕ ОБЬЕКТЫ в этой картине, переданные по ссылке а ЖИВУТ ОНИ В ВПОДПАПКАХ в своих полных картинах. отдельно стоит иметь файл Direction registry для папки с каждым направлением и будет внешний Direction registry который будет иметь все как ссылочные обьекты из локальных , по типу того как онно будет с картинами и он будет рядом с юзкейс мепом, не в нем. Existing Solutions research заслуживает более качественного процесса возможно но нельзя пока сказать какого, в будущем на опыте может что то придумаю, пока что так.. Source Idea entity -  покабез. . вот ответ чата:

---

<a id="chat-pi-039"></a>
## CHAT-PI-039 — Local And Root Direction Registries Separate From The Use-Case Map

### Full working meaning

Каждая documentation family, владеющая несколькими направлениями, может иметь локальный `direction-registry.md`, который хранит canonical definitions внутренних Directions, их purpose, boundary, owner, Full Picture reference, supported use cases, topology, entry conditions, expected result и status. Отдельный root `planning/direction-registry.md` располагается рядом с `planning-use-case-map.md`, но не внутри него, и агрегирует project-wide Directions как Reference Objects из локальных registries без копирования их owner state. Root registry отвечает за общий перечень и отношения направлений; local registries — за внутреннюю topology family; Use-Case Map остаётся owner конкретных use-case/command routes, required reads, outputs и permissions.

### Evidence and documentation status

- Evidence: explicit user requirement / correction.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S12

> т е у нас будет например папка по планированию решений(уже есть) и в ней полная картина что включает в себя и другие полные картины, внутренние, но эти картины это ссылочные обьекты в этой картине, переданные по ссылке а живут они в вподпапках в своих полных картинах. отдельно стоит иметь файл DIRECTION REGISTRY ДЛЯ ПАПКИ С КАЖДЫМ НАПРАВЛЕНИЕМ и будет ВНЕШНИЙ DIRECTION REGISTRY который будет иметь все как ССЫЛОЧНЫЕ ОБЬЕКТЫ ИЗ ЛОКАЛЬНЫХ , по типу того как онно будет с картинами и он будет РЯДОМ С ЮЗКЕЙС МЕПОМ, НЕ В НЕМ. Existing Solutions research заслуживает более качественного процесса возможно но нельзя пока сказать какого, в будущем на опыте может что то придумаю, пока что так.. Source Idea entity -  покабез. . вот ответ чата:

---

<a id="chat-pi-040"></a>
## CHAT-PI-040 — Semantic Home For Documented Planning Items

### Full working meaning

Подтверждённый Working Planning Item является managed Reference Object и временно может не иметь окончательного semantic home либо иметь proposed home. Когда item принимается в reusable documentation, Planning Draft или другой durable слой, ему назначается semantic home — owner section/file/family, к которой его смысл принадлежит. Semantic home отличается от физического register, где хранится canonical body, от Full Picture occurrences, от других reference occurrences и от source message. Items, описывающие общую картину или cross-direction boundary, могут иметь home в соответствующем Full Picture; workflow-, principle- и terminology-items получают более точный owner.

### Evidence and documentation status

- Evidence: user direction plus accepted clarification from the supplied previous-chat answer.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S12

> т е у нас будет например папка по планированию решений(уже есть) и в ней полная картина что включает в себя и другие полные картины, внутренние, но эти картины это ссылочные обьекты в этой картине, переданные по ссылке а ЖИВУТ ОНИ В ВПОДПАПКАХ В СВОИХ ПОЛНЫХ КАРТИНАХ. отдельно стоит иметь файл Direction registry для папки с каждым направлением и будет внешний Direction registry который будет иметь все как ссылочные обьекты из локальных , по типу того как онно будет с картинами и он будет рядом с юзкейс мепом, не в нем. Existing Solutions research заслуживает более качественного процесса возможно но нельзя пока сказать какого, в будущем на опыте может что то придумаю, пока что так.. Source Idea entity -  покабез. . вот ответ чата:

---

<a id="chat-pi-041"></a>
## CHAT-PI-041 — Full-Picture Meanings Trace To Contributing Planning Items

### Full working meaning

Каждый значимый принятый смысл Full Picture должен быть связан с формирующими его Planning Items. Full Picture остаётся читаемой synthesis и не превращается в список items, но приложение и literal Markdown references позволяют перейти от statement к contributing items, их полным bodies, semantic homes, sources/provenance и open concerns. Такая связь сохраняет проверяемость общей картины и предотвращает появление второго независимо редактируемого owner смысла.

### Evidence and documentation status

- Evidence: user direction plus accepted clarification from the supplied previous-chat answer.
- Documentation: pending repository reconciliation and explicit acceptance.

### Full user-message source(s)

#### Source 1 — S12

> т е у нас будет например папка по планированию решений(уже есть) и в ней ПОЛНАЯ КАРТИНА ЧТО ВКЛЮЧАЕТ В СЕБЯ И ДРУГИЕ ПОЛНЫЕ КАРТИНЫ, внутренние, но эти картины это ССЫЛОЧНЫЕ ОБЬЕКТЫ в этой картине, переданные по ссылке а живут они в вподпапках в своих полных картинах. отдельно стоит иметь файл Direction registry для папки с каждым направлением и будет внешний Direction registry который будет иметь все как ссылочные обьекты из локальных , по типу того как онно будет с картинами и он будет рядом с юзкейс мепом, не в нем. Existing Solutions research заслуживает более качественного процесса возможно но нельзя пока сказать какого, в будущем на опыте может что то придумаю, пока что так.. Source Idea entity -  покабез. . вот ответ чата:

---



</details>
# Accepted Planning Item And Full Picture Workflow Transition — 2026-07-23

## Decision

The accepted recent-chat reconciliation is now applied to project-local workflow ownership.

```text
former provisional slice:
  Planning Items, Full Picture And Deepening

result:
  accepted Planning Item And Full Picture End-To-End Workflow
  at:
    complete-pictures/planning-items-and-full-picture/full-picture.md
```

This transition does not change the active item count.

## Direct active item set

```text
ITEM-121  Structured User Message Composer
ITEM-94   AI Item Import
ITEM-110  Semantic Item Key
ITEM-120  Semantically Complete Item
ITEM-122  Typed Source Contributions
ITEM-112  Item Role And Relation Model
ITEM-41   Item Brick Reuse
ITEM-98   Planning To Documentation Pipeline
ITEM-119  Concern Preset System
ITEM-113  Planning Deepening Link
ITEM-118  Configurable Related Object Views
```

Direct active count: **11**.

## Supporting interfaces

```text
ITEM-11B:
  immutable source/conversation history;

ITEM-35B:
  IDE-like source/item/home/picture navigation;

ITEM-116:
  template-linked AI response document;

ITEM-22B:
  Planning Item Reference Object Boundary;

ITEM-23B / ITEM-108 / ITEM-91:
  canonical-state owner, app-only durability and optional home;

ITEM-123:
  configurable application settings and later project-readable conventions.
```

## Cross-workflow boundary

```text
application-native path:
  confirmed Planning Item
    → immediately a managed Reference Object
    → downstream workflow does not create it again
    → chooses/materializes owner, definition location,
      optional home and documentation references;

portable path:
  reviewed item meaning
    → may remain portable
    → or enter Reference Object proposal/confirmation
    → managed creation and downstream materialization.
```

## Preserved boundaries

- No runtime implementation or storage architecture is accepted.
- Portable Markdown mode remains supported.
- `Source Idea` is not introduced.
- Prototype-Depth Scenario/Domain/Slice methodology remains a separate next task.
- Direction/Use-Case registries, item-formation command and Tampermonkey semantic surfaces remain later batches.
- Chat/AI/Work-State remains provisional.
- No new `ITEM-*` identity is created by this workflow-placement transition.
