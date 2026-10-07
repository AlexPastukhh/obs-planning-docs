# Module — Concrete Finding Explanation / Reproduction

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "core.finding-explanation",
  "title": "Concrete Finding Explanation / Reproduction",
  "text": "## Concrete Finding Explanation / Reproduction\n\nДля существенной находки сначала дай короткое общее объяснение, затем, где применимо, покажи конкретную ситуацию так, чтобы пользователь мог понять и проверить утверждение без самостоятельной реконструкции механизма.\n\n### Problem\n\nПокажи:\n`цель/requirement → preconditions → steps/trigger → observed result → expected result → mechanism → consequence`.\n\nГде возможно, приведи минимально воспроизводимый сценарий. Укажи, локальна проблема или влияет на основной результат/Scenario.\n\n### Risk\n\nНе описывай его как уже произошедший дефект. Покажи:\n`условия → trigger → потенциальная проблемная ситуация → возможное consequence → способ проверки/предотвращения/mitigation`.\n\n### Decision Uncertainty\n\nПокажи конкретный decision fork:\n`что известно → что именно не установлено → вариант A / вариант B / ... → материально разные последствия → что позволит разрешить выбор`.\n\n### Improvement Opportunity\n\nПокажи:\n`текущий приемлемый путь → предлагаемый альтернативный путь → что конкретно меняется → выигрыш → стоимость/риски изменения → почему улучшение может или не может быть оправдано сейчас`.\n\n### Evidence Gap / Review Limitation\n\nПокажи:\n`что проверено → чего именно не удалось проверить → почему → какие выводы нельзя считать подтверждёнными → что нужно для проверки`.\n\nНе создавай искусственный reproduction, если природа finding этого не допускает. Детализация должна быть пропорциональна существенности, но одной абстрактной фразы недостаточно для material finding.",
  "createdAt": "2026-10-07T18:56:00.000Z",
  "updatedAt": "2026-10-07T18:56:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
