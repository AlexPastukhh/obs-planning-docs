# Support Facts Table Template

Status: active template.

Purpose: table structure for between-session / support facts inside date-based day files.

This template owns the support-facts table layout.

It does not own Support Score rules.

Support Score rules are owned by:

`Support Score Guide.md`

## 🧯 Between-session / Support Facts

During the day, collect facts only.

Do not calculate Support Score during the day.

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 |  |  |  |  |

## Types

| Type | Meaning |
|---|---|
| 🛌 sleep / sleep attempt | сон или честная попытка заснуть |
| 🍽️ food | еда / переедание / не объелся |
| 🏃 movement / sport | движение, спорт, прогулка |
| 🧲⚡ stimulus control | стимулы, залипание, не разжёг стимулы |
| 🔋 recovery / readiness | восстановление, готовность продолжать |
| 🔁 transition | переход между сессиями |
| 🩺 health | доп. время для здоровья |
| 🧩 other | другое |

## Example facts

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 | after S3 | 🍽️ food | Не объелся | helped continue |
| 2 | after S5 | 🏃 movement / sport | 15 минут ходьбы | restored energy |
| 3 | after S8 | 🍽️ food | Объелся | worsened F / sleep risk |
| 4 | night | 🛌 sleep / sleep attempt | Пытался заснуть 1 час | valid sleep attempt |
| 5 | before sleep | 🧲⚡ stimulus control | 40 минут stimulus drift | hurt sleep/readiness |

## Rule

The `Type` column includes the emoji.

Do not create a separate `Tags` column.

Support facts are raw facts for later review.

They do not add Work Score points.
