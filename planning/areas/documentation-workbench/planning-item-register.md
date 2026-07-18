# Documentation Workbench Planning Item Register — v0.9.2 consolidated

Status: active project-local working source-linked register / reconciliation proposals not yet applied

Repository owner:

- area: [`planning/areas/documentation-workbench/`](README.md);
- application-level synthesis: [`full-picture.md`](full-picture.md);
- this file owns complete working item bodies, source excerpts, old-item dispositions and open questions.

Migrated from:

- `current-uncovered-documentation-workbench-items-register-v0.9.2-consolidated.md`;
- source SHA-256 `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`;
- uploaded `full-source-linked-planning-items-register-v0.6 (1)(1).md`;
- the current documentation-family review;
- user clarifications `SRC-N1`–`SRC-N83`;
- the v0.9 consolidated application register and linked current-picture artifact.

Counts:

- canonical active uncovered/partially covered bricks: **50**;
- old methodology/app register items audited: **110 / 110**;
- old-item dispositions:
  - active canonical: **16**;
  - merged/split/updated: **35**;
  - deferred implementation: **4**;
  - unresolved/not reconfirmed: **4**;
  - reusable or non-product owner: **51**.

Working-canonical boundary:

```text
canonical active in this file
  = the current working source-linked item set;
  ≠ a final user-approved resulting item set after reconciliation.
```

Reconciliation status:

```text
- The 50-item set is preserved by this repository migration.
- Complete-picture and canonical item-set reconciliation has produced review proposals.
- Proposed renames, merges, splits, moves, supersessions and removals are not applied here.
- Apply an item transformation only after its Current, Incoming and Resulting meanings are explicitly reviewed and accepted.
- Preserve absorbed/replaced source IDs and provenance in the later transformation history.
```

Coverage-snapshot note:

- Content from `## 0. Purpose` onward is preserved from the pre-bootstrap v0.9.2 source snapshot.
- Statements such as `the project lacks a project-local root draft` and item-level `Current coverage` fields describe that source snapshot.
- This CP-1A migration resolves only the missing repository owner by creating this area and [`full-picture.md`](full-picture.md).
- Later accepted reconciliations must update affected coverage fields explicitly; this migration does not silently rewrite item bodies.

## 0. Purpose

This file owns the current source-linked backlog of application/documentation-workbench meaning that is absent from, only partially reflected in, or explicitly requires correction in the current documentation.

The file also guarantees brick integrity:

```text
free-form user input
  → source-linked items
  → canonical active items
  → linked synthesized current picture
  → explicit disposition for every older item
```

No older item is silently deleted. A duplicate is merged into a canonical brick; an unclear item remains visible as unclear; reusable methodology stays with its reusable owner instead of being copied into the app model.

## 1. Major corrections through v0.9.2

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
15. The active brick count remains 50; the complete 110-row old-item audit remains intact.
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

The reusable documentation already defines many concepts—InformationItem, Planning Item, Planning Draft, App Memory, Chat Workspace, Conversation History, Action Log, Object-backed Region, wrappers and review statuses—but it does not yet own the complete application behavior.

Notably:

- reusable methodology supports item-based planning and deeper review, but it does not yet distinguish Concern Suggestion from target-specific Applied Concern;
- multiple presets may be jointly evaluated, but nested preset composition/inheritance is still unresolved;
- file categories define template and view guidance, but not independently assignable concern presets and validation rules;
- current item guidance still risks encouraging artificial brevity because short IDs/code names are not explicitly separated from an unrestricted full canonical body;
- reusable methodology already supports building a living plan from reviewed items, but the application picture still requires explicit concern review at item, initiative and file scales;
- current file views define home/incoming/outgoing object relations and configurable projections, but need explicit suggestion/applied-concern views;
- current Reference Object behavior does not yet define ordinary file/file-location targets;
- current chat history does not yet own user-only `RN/DAM` annotations;
- current AI integration does not yet define a template-linked response document with resolvable app navigation;
- reusable item/documentation workflows do not yet make repository semantic reconciliation explicit on user request and mandatory before every File Update Plan;
- current update-planning guidance does not yet require an explicit old → new meaning review before literal repository changes.

The current project still lacks a single project-local root draft that connects:

- documentation-layer import and authoring;
- Full Picture / Planning Draft composition from sufficiently complete reviewed items;
- Reference Objects and reference modes;
- concern definitions, presets, suggestions, applications and deeper work targets;
- document templates, view presets and validation rules as separate mechanisms;
- dependency invalidation;
- general object/file/location references;
- configurable related-object, concern-suggestion and applied-concern views;
- purposeful Planning Item formation and planning-deepening links;
- user raw annotations;
- IDE-like tabs/navigation;
- AI item import;
- Chat History and answer-linked Action Log/Item deltas;
- template-linked AI response documents;
- AI-expanded copy;
- Git/diff handoff.

The mechanism by which AI receives current documentation plus app-only entities remains deliberately unresolved. Prototype implementation and application-shell choices also remain a separate planning pass.

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
### ITEM-86 / REFERENCE-OBJECT-TERM — «Ссылочный объект» — предпочтительный русскоязычный user-facing термин для отдельно управляемого и переиспользуемого фрагмента документации.

- Kind: terminology correction
- Evidence status: **direct user correction**
- Current coverage: **Частично: текущая терминология использует InformationItem, Object-backed Content и Object-backed Region, но не имеет одного понятного пользовательского имени для самого переиспользуемого объекта.**
- Disposition: Новый terminology item. Английское имя `Reference Object` остаётся working candidate до подтверждения.
- Required documentation action: Обновить terminology: отделить сам ссылочный объект от его home, materialized occurrence и object-backed region.
- Owner candidate: terminology-and-planning-items.md + project-local terminology
- Direct source excerpts:
  - SRC-N4:
    ```text
    в файлах что в док слое - те части ифны которые нужны в качестве отдельной сущности для какой либо цели(перенести в отдельный файл или просто в приложении отдельно поработать, без перенесения в док слое в отдельный файл, создать ссылку, чтобы в др файле была эта инфа точно в таком же виде и иметь сигнал при изменении что нужно проверить зависимости) - являются ссылочными обьектами.
    ```
  - SRC-N6:
    ```text
    в приложении работа может вестись с нераскрытыми ссылочными обьектами - когда только указано что вот тут такой то обьект, и с раскрытыми - когда видно содержание ссыл оббьекта(нужно найти в файле с терминологией, как я там назвал то что тут называю ссылочным обьектом и поменять, т к ссылочный обьект кажется чем то более понятным) .
    ```
- Explanation: Object-backed Region описывает участок файла, а не обязательно сам объект. Пользователь явно просит более понятный термин для объекта.

<a id="item-22b"></a>
### ITEM-22B / ITEM-TO-OBJECT — Reviewed/imported Planning Items may become Reference Objects after confirmation; user raw annotations never become items or objects automatically.

- Kind: item-to-object lifecycle
- Evidence status: **direct user clarification**
- Current coverage: **Отсутствует; raw annotation boundary requires correction.**
- Disposition: Обновить существующий `ITEM-22B`.
- Required documentation action:
  - reviewed/imported item → proposed managed object → user confirmation → created Reference Object;
  - preserve item ID, interpreted statement and source-linked planning content when present;
  - `RN` and `DAM` remain literal user annotations, not Planning Items, requirements or Reference Objects;
  - conversion of an `RN/DAM` requires a separate user-requested interpretation/review;
  - after conversion or merge, retain a link to the original raw annotation;
  - generic Reference Objects do not require provenance/source-excerpt fields.
- Owner candidate: AI item ingestion workflow + Reference Object lifecycle
- Direct source excerpts:
  - SRC-N14
  - SRC-N16
  - SRC-N25
  - SRC-N42
  - SRC-N63
  - SRC-N66
  - SRC-N67
- Explanation: The application preserves raw meaning without silently promoting every annotation into canonical planning state.

<a id="item-87"></a>
### ITEM-87 / OBJECT-EXTRACTION — Произвольный фрагмент документации может быть выделен в Ссылочный объект, когда независимое управление даёт практическую ценность.

- Kind: object extraction criteria for existing document content
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Сохранить новый item, но ограничить его произвольными фрагментами документации. Он не ограничивает ITEM-22B: imported source-linked items становятся объектами всегда.
- Required documentation action: Зафиксировать критерии выделения существующего текста: отдельная работа без нового файла, точное повторное использование, collapse/expand, единый Source of Truth, dependency tracking или независимый review/lifecycle.
- Owner candidate: Reference Object lifecycle workflow
- Direct source excerpts:
  - SRC-N4:
    ```text
    в файлах что в док слое - те части ифны которые нужны в качестве отдельной сущности для какой либо цели(перенести в отдельный файл или просто в приложении отдельно поработать, без перенесения в док слое в отдельный файл, создать ссылку, чтобы в др файле была эта инфа точно в таком же виде и иметь сигнал при изменении что нужно проверить зависимости) - являются ссылочными обьектами.
    ```
  - SRC-N5:
    ```text
    это нужно для того чтобы приложение могло их таковыми воспринять чтобы свернуть весь текст этог ссылочного обьекта для удобства(в приложении) или чтобы создать такой обьект если приложение не нашло его(таким образом можно с помощью ии создать файл с сылочными обьектами, которые считает приложение и при соглассии пользователя создаст)
    ```
- Explanation: Существующий документ не обязан автоматически дробиться на объекты. Но imported source-linked items имеют отдельное подтверждённое правило и становятся объектами для дальнейшей ссылочной работы.

<a id="item-23b"></a>
### ITEM-23B / MARKDOWN-PRIMARY-TRUTH — Documentation/Markdown is the primary Source of Truth for document-backed objects; temporary app-only general objects are an explicit exception.

- Kind: source-of-truth / product boundary
- Evidence status: **direct user statement**
- Current coverage: **Частично reflected only by broad Markdown-first rules.**
- Disposition: Уточнить старый `ITEM-23B`.
- Required documentation action:
  - document-backed state is owned by canonical Markdown definition location;
  - canonical definition location is distinct from optional parent/home;
  - App Memory is normally auxiliary;
  - general objects without parent/home may temporarily be stored canonically in the app;
  - keep this exception visible as deferred storage debt.
- Owner candidate: terminology + Application Root Planning Draft
- Direct source excerpts:
  - SRC-N23
  - SRC-N33
  - SRC-N39
  - SRC-N40
- Explanation: Two durability modes currently coexist: Markdown-backed canonical objects and temporary app-only general objects.

<a id="item-25b"></a>
### ITEM-25B / HYBRID-APP-MEMORY — App Memory is normally an auxiliary parsed/indexed model, but temporarily owns canonical state for app-only general objects.

- Kind: app-memory boundary
- Evidence status: **direct user clarification**
- Current coverage: **Needs correction.**
- Disposition: Уточнить `ITEM-25B`.
- Required documentation action:
  - Markdown-backed state can be rebuilt from documentation;
  - app-only general objects cannot be rebuilt from Markdown;
  - distinguish cache/index from temporary app-owned canonical state;
  - later plan export, backup and migration.
- Owner candidate: import/refresh + storage boundary
- Direct source excerpts:
  - SRC-N7
  - SRC-N23
  - SRC-N39
- Explanation: The app remains auxiliary except for a deliberate temporary object class.

<a id="item-91"></a>
### ITEM-91 / IN-FILE-HOME-OBJECT — Ссылочный объект может логически принадлежать месту внутри большого файла и при этом редактироваться в отдельном объектном окне без создания отдельного Markdown-файла.

- Kind: object/document relationship + UX direction
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Новый item. Отдельное окно — явная UX-идея, но не обязательная финальная UI architecture.
- Required documentation action: Поддержать independent object work surface при сохранении home binding к файлу/секции.
- Owner candidate: Reference Object editing workflow
- Direct source excerpts:
  - SRC-N4:
    ```text
    в файлах что в док слое - те части ифны которые нужны в качестве отдельной сущности для какой либо цели(перенести в отдельный файл или просто в приложении отдельно поработать, без перенесения в док слое в отдельный файл, создать ссылку, чтобы в др файле была эта инфа точно в таком же виде и иметь сигнал при изменении что нужно проверить зависимости) - являются ссылочными обьектами.
    ```
  - SRC-N10:
    ```text
    приложение позволяет создать файлы в документационном слое и изменять их и ссылочные обьекты в этих файлах вставляются целиком, хотя внутри приложения я мог их не раскрывать - т к эти обьекты большие и работать с ними в отдельном окне , как с классом в программировании, а в файле эта ссылка на большой класс(ссылочный обьект т е ) нужно логически т к обьект содержит необх информацию и мне нужен ИСТОЧНИК ПРАВДЫ .
    ```
  - SRC-N18:
    ```text
    работа ведется файлами и с сылочными обьектами для которых этот файл родной/либо не родной(в этот файл была помещена ссылка на ссылочный обьект созданный и "прописанный "(как место прописки,город и тд) в другом файле или месте в том же файле, если файл большой или если пользователь так решил), но также есть место в котором показаны все ссылочные обьекты для которых этот файл родной, для которых была создана ссылка в этом файле, а родной другой(лучше всего воспринимать как исходящие и входящие), сколько на этот файл ссылаются др файлов.
    ```
- Explanation: Объектность должна уменьшать необходимость физически дробить документационный слой на множество файлов.

<a id="item-102"></a>
### ITEM-102 / HOMELESS-GENERAL-OBJECT — Ссылочный объект может быть общим объектом без parent/home relation.

- Kind: domain model / navigation
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Уточнить новый item.
- Required documentation action:
  - parent/home is optional;
  - a general object can exist without semantic parent context;
  - absence of home is not the withdrawn file-scoped “undefined object” category;
  - identity and editable canonical state still exist, temporarily in the app when no Markdown location is assigned.
- Owner candidate: terminology + object model workflow
- Direct source excerpts:
  - SRC-N33
  - SRC-N39
  - SRC-N40
- Explanation: `home` is semantic context, not a prerequisite for existence.

<a id="item-108"></a>
### ITEM-108 / TEMP-APP-ONLY-OBJECT — До выбора долговечной Markdown-модели общий объект без parent/home может храниться только в приложении.

- Kind: temporary storage decision / deferred architecture
- Evidence status: **direct user decision with explicit deferral**
- Current coverage: **Отсутствует and intentionally differs from the normal Markdown-first model.**
- Disposition: Новый item.
- Required documentation action:
  - define app-only general-object state;
  - mark it as temporary, not a final invariant;
  - distinguish it from App Memory reconstructed from Markdown;
  - later decide export, backup, migration and Markdown conversion.
- Owner candidate: Application Root Planning Draft + storage implementation planning
- Direct source excerpts:
  - SRC-N39
- Explanation: The immediate workflow is resolved, but durability/recovery remains deferred.

<a id="item-103"></a>
### ITEM-103 / FLEXIBLE-OBJECT-SHAPE — Object shape is flexible/anonymous: usually one main text field plus optional fields rather than a fixed class schema.

- Kind: object representation
- Evidence status: **direct user statement**
- Current coverage: **Отсутствует.**
- Disposition: Уточнить новый item.
- Required documentation action:
  - document-backed object form and values are represented in Markdown;
  - one main text field is the common case;
  - additional user-defined fields are allowed;
  - generic objects do not require provenance/source-excerpt fields;
  - category/type/status may each contain multiple values;
  - common fields are governed by an optional standard contract/template.
- Owner candidate: object model + Markdown serialization workflow
- Direct source excerpts:
  - SRC-N35
  - SRC-N36
  - SRC-N42
  - SRC-N43
- Explanation: Parser conventions are needed, but documents should not become rigid typed records.

<a id="item-106"></a>
### ITEM-106 / OPTIONAL-FIELD-CONTRACT — Standard object fields form a removable template/parsing contract for item, concern and relation metadata without constraining the full text body.

- Kind: extensible field contract
- Evidence status: **direct user clarification**
- Current coverage: **Absent as a concern-aware and unrestricted-body contract.**
- Disposition: Expand the existing item.
- Required documentation action:
  - define a small standard vocabulary the app recognizes when present;
  - permit omission/removal of optional semantic fields;
  - allow multiple values for category, type and status;
  - do not hardcode planning provenance into every object;
  - distinguish required parser/identity mechanics from optional semantic fields;
  - candidate planning-item fields:
    - `Planning Direction`;
    - `Item Kind`;
    - `Item Scale`;
    - `Related Requirements`;
    - `Item Relations`;
    - `Planning Deepening`;
    - `Raw Notes`;
    - `Deferred Attention`;
  - candidate concern-definition/preset fields:
    - `Concern Definition`;
    - `Included Concern Definitions`;
    - `Applicability Guidance`;
    - `Recommended Target Kinds`;
  - candidate target/application fields:
    - `Recommended Concern Presets`;
    - `Concern Suggestions`;
    - `Applied Concerns`;
    - `Applied Concern Status`;
    - `Concern Work Target`;
    - `Concern Sources`;
  - `Concern Sources` records which presets/file-type assignments/item-kind rules/manual actions suggested or applied the concern;
  - evidence/source fields, when used, describe what supports an analysis and are not the same as Concern Sources;
  - candidate item presentation fields:
    - concise display title/summary;
    - unrestricted full canonical body;
  - the full body may contain as much text, examples, exceptions and explanation as required by `ITEM-120`;
  - field values may reference a Reference Object, Documentation File or File Location through `ITEM-114`;
  - these names are a recommended contract, not a mandatory class schema;
  - Concern Suggestion and Applied Concern are separate states/records even if both are rendered compactly inside a target;
  - an Applied Concern may begin as a compact application record and later gain a separate work target when its lifecycle requires it.
- Owner candidate: object model + parser contract
- Direct source excerpts:
  - SRC-N42
  - SRC-N43
  - SRC-N60
  - SRC-N61
  - SRC-N65
  - SRC-N79
  - SRC-N81
- Explanation: Structured metadata improves filtering and linking, while suggestions, applications and the unrestricted main body keep distinct semantics.

## D. Reference representation, dependency and review

<a id="item-90"></a>
### ITEM-90 / LINKED-CONTENT-READONLY — Текст, полученный по ссылке, read-only в месте использования: его нельзя изменять ни в документе-occurrence, ни внутри поля другого объекта.

- Kind: reference editing invariant
- Evidence status: **direct user clarification**
- Current coverage: **Частично: ранее правило относилось только к non-home materialized occurrence. Новая формулировка расширяет его на object fields и bare/full links.**
- Disposition: Расширить существующий ITEM-90.
- Required documentation action: Любая попытка изменить linked content должна вести к canonical object/home. В месте использования разрешены только удаление/замена ссылки либо редактирование собственных окружающих данных.
- Owner candidate: document/object editing workflow
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
- Current coverage: **Отсутствует.**
- Disposition: Расширить `ITEM-94` and connect it to `ITEM-116`.
- Required documentation action:
  - batch import and object preview;
  - recognize proposed items inside a template-linked AI response;
  - distinguish an existing item reference from a proposed new item;
  - require confirmation before item/object creation;
  - preserve the source answer and source user fragment when applicable;
  - allow optional parent/home assignment and reference placement;
  - allow a general object to remain temporarily app-only;
  - never import user `RN/DAM` as reviewed items automatically.
- Owner candidate: AI Item Ingestion workflow
- Direct source excerpts:
  - SRC-N16
  - SRC-N25
  - SRC-N39
  - SRC-N63
  - SRC-N66
  - SRC-N68
  - SRC-N72
- Explanation: Machine-readable AI output improves ingestion but does not bypass interpretation review or user confirmation.

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
- Current coverage: **Absent as a complete identity-versus-body rule.**
- Disposition: Expand the existing item and connect it to `ITEM-120`.
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
- Owner candidate: item terminology + registry contract
- Direct source excerpts:
  - SRC-N49
  - SRC-N81
- Explanation: Compact identity and semantically sufficient detail solve different problems and must not be conflated.

<a id="item-41"></a>
### ITEM-41 / ITEM-BRICK-REUSE — Reviewed Planning Items and Concern Definitions are durable reusable bricks; raw annotations and target-specific concern applications keep their own boundaries.

- Kind: reusable work principle / derived-document rule
- Evidence status: **direct fresh source + older item support**
- Current coverage: **Partially reflected; concern reuse and semantic-size boundaries are absent.**
- Disposition: Expand old `ITEM-41`.
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
- Owner candidate: drafting workflow + item/concern registry workflow
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

<a id="item-98"></a>
### ITEM-98 / PLANNING-TO-DOC-PIPELINE — Planning proceeds from sufficiently complete items through an item-backed Full Picture, explicit repository semantic reconciliation, scale-appropriate concern review and justified deeper work.

- Kind: external workflow integration
- Evidence status: **direct user statement + reusable methodology support**
- Current coverage: **Reusable planning workflow exists, but concern-preset application, item-completeness boundaries and explicit repository semantic reconciliation are incomplete.**
- Disposition: Expand `ITEM-98`; do not hard-code planning as the only domain of the documentation workbench and do not introduce a separate `Planning Item Candidate` entity.
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
- Owner candidate: item-to-document planning integration workflow + documentation update-plan preflight
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

<a id="item-112"></a>
### ITEM-112 / ITEM-ROLE-RELATION-MODEL — Every reviewed Planning Item has a purpose, appropriate scale, semantic role and explicit relations where they improve meaning.

- Kind: planning methodology support / item semantics
- Evidence status: **direct fresh user clarification**
- Current coverage: **Reusable methodology contains pieces, but scale-aware app-facing item semantics are incomplete.**
- Disposition: Expand the active item; reusable `ITEM-17/21/38/39` remain methodology owners rather than duplicate app requirements.
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
- Owner candidate: Planning Item Formation workflow + optional field contract
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

<a id="item-113"></a>
### ITEM-113 / PLANNING-DEEPENING-LINK — Planning lenses and reusable concern definitions may lead to target-specific Applied Concerns whose substantial work remains linked to the owning item, direction or file.

- Kind: planning methodology support / deepening workflow
- Evidence status: **direct fresh user clarification**
- Current coverage: **Questions, alternatives and prototypes exist in methodology, but the complete concern lifecycle is absent.**
- Disposition: Expand the active item; delegate catalogue, preset, suggestion and applicability-review behavior to `ITEM-119`.
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
- Owner candidate: Planning Deepening workflow
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

<a id="item-119"></a>
### ITEM-119 / CONCERN-PRESET-SYSTEM — The application supports reusable Concern Definitions and multiple Concern Presets that may jointly propose scale-appropriate concerns for items, directions and files.

- Kind: planning support / concern catalogue, suggestion and application review
- Evidence status: **direct fresh user statement**
- Current coverage: **Absent as a complete reusable system.**
- Disposition: New active item.
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
- Owner candidate: Concern Catalogue, Preset And Suggestion Review workflow
- Direct source excerpts:
  - SRC-N79
  - SRC-N80
  - SRC-N81
- Older support:
  - reusable `ITEM-17`, `ITEM-21`, `ITEM-43`, `ITEM-52A`, `ITEM-65`, `ITEM-69`.
- Explanation: Presets make repeatable planning attention available, while the suggestion stage prevents candidate questions from becoming mandatory structure or target-specific concerns before review.

<a id="item-120"></a>
### ITEM-120 / SEMANTICALLY-COMPLETE-ITEM — A Planning Item has no arbitrary length cap; its canonical body occupies as much space as needed to transmit its complete meaning.

- Kind: item authoring principle / semantic completeness
- Evidence status: **direct fresh user statement**
- Current coverage: **Absent as an explicit rule.**
- Disposition: New active item and reusable-principle candidate.
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
- Owner candidate: Planning Item Authoring principles + registry/editor contract
- Direct source excerpts:
  - SRC-N81
- Related active items:
  - `ITEM-41`, `ITEM-98`, `ITEM-106`, `ITEM-110`, `ITEM-112`.
- Older support:
  - `META-04`, `ITEM-47`, `ITEM-62`, `ITEM-65`, `ITEM-78`.
- Explanation: Simplicity-first prevents unnecessary structure and duplication; it does not require compressing away meaning that the item must preserve.

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
- Direct source excerpts:
  - SRC-N53
  - SRC-N61
  - SRC-N68
- Older supporting items:
  - `ITEM-35A`, `ITEM-35B`, `ITEM-48`.
- Explanation: The response document remains open while the user inspects each referenced target.

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
- Direct source excerpts:
  - SRC-N50
  - SRC-N51
  - SRC-N52
- Explanation: Нельзя называть Home Object «входящим» только потому, что другие документы ссылаются на него; направление описывает поток информации относительно выбранного файла.

<a id="item-118"></a>
### ITEM-118 / CONFIGURABLE-RELATED-OBJECT-VIEWS — For a selected file or folder, the application derives manually configurable views of related Reference Objects and concern records.

- Kind: configurable view / object discovery
- Evidence status: **direct fresh user statement**
- Current coverage: **File/folder relation views and category templates exist separately, but concern-suggestion/applied-concern projections are incomplete.**
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
- Owner candidate: Related Object And Concern Views workflow
- Direct source excerpts:
  - SRC-N78
  - SRC-N79
  - SRC-N80
- Related active items:
  - `ITEM-95`, `ITEM-96`, `ITEM-97`, `ITEM-103`, `ITEM-106`, `ITEM-112`, `ITEM-113`, `ITEM-119`.
- Older support:
  - `ITEM-16B`, `ITEM-40`, `ITEM-48`, `ITEM-51`, `ITEM-71`.
- Explanation: Views expose selected existing state; they do not turn recommendations into suggestions or suggestions into applied planning work.

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
- Direct source excerpts:
  - SRC-N20
  - SRC-N78
  - SRC-N79
- Explanation: File type is an assignment point; each guidance mechanism retains its own semantics, lifecycle and application behavior.

## 6. Non-item planning concerns and withdrawn candidates

### CONCERN / AI-KNOWLEDGE-SOURCE-AND-SYNC

- Status: **open planning concern; not an accepted standalone product requirement**
- Related active items:
  - `ITEM-23B / MARKDOWN-PRIMARY-TRUTH`;
  - `ITEM-25B / HYBRID-APP-MEMORY`;
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
| `ITEM-25B` | Structured JSON/object storage may support snapshots/imports. | active canonical brick | ITEM-25B / HYBRID-APP-MEMORY |
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
= 16 active
+ 35 merged/split
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

### Package 4 — project-local Application Root Planning Draft

Create one root draft that owns:

- product identity and non-goals;
- workflow inventory;
- shared data/relationship model;
- item scale, semantic completeness and relations;
- concern catalogue/preset/suggestion/application model;
- raw annotation boundary;
- UI/navigation model;
- configurable related-object and concern views;
- AI response integration;
- accepted requirements versus implementation thoughts;
- open AI knowledge/source synchronization concern;
- prototype planning as a later separate pass.

### Package 5 — functional workflows

At minimum:

1. Documentation Import And Refresh.
2. AI Item Import And Object Confirmation.
3. Purposeful And Semantically Complete Planning Item Formation, including targeted repository comparison and explicit review when requested.
4. Concern Catalogue And Preset Management.
5. Concern Suggestion And Applicability Review.
6. Applied Concern And Planning Deepening.
7. Full-Picture Sweep.
8. User Raw Annotation Capture.
9. Configurable Related-Object And Concern Views.
10. File-Type Guidance Assignment.
11. File/Object Authoring.
12. Reference Placement And General Targets.
13. Dependency Invalidation And Review.
14. IDE-Like Tab Navigation.
15. Chat History And Answer Change Sets.
16. Action Log Capture.
17. Template-Linked AI Response.
18. AI-Expanded Copy.
19. Repository Semantic Reconciliation, explicit old → new meaning review and Git/Diff Handoff.

### Package 6 — syntax and representation planning

Plan before prototyping:

- compact item identity plus unrestricted body representation;
- concern definition/preset/suggestion/application serialization;
- suggestion-review and Applied Concern status vocabularies;
- optional field contract;
- object/file/file-location link syntax;
- file relation and concern views;
- response templates and required-link validation;
- repository representation of app-only entities;
- app-only object persistence boundary.

Prototype implementation and shell/technology selection remain explicitly outside this update.

## 11. Source-integrity note

The uploaded old register sometimes preserved only normalized rows or indirect source support. Such old evidence remains marked through its old-item disposition.

Fresh `SRC-N46`–`SRC-N83` preserve direct user wording and take precedence when they correct prior interpretations.

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
- prototype implementation and technology choices remain outside the accepted items in this version.
