# Prompt — оцени пропозалы

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "proposal.evaluate-existing",
  "title": "оцени пропозалы",
  "text": "Независимо рассмотри уже имеющиеся в доступном контексте Proposals без запуска полного review объекта.\n\nСначала определи, какие именно Proposals, Proposal Groups, Candidate Composition, версия или часть плана пользователь просит рассмотреть. Если scope явно ограничен — не расширяй его молча.\n\n[[module:core.context-interpretation]]\n[[module:core.need-proposal-semantics]]\n[[module:core.proposal-composition]]\n[[module:core.scenario-realization]]\n[[module:core.decision-governance]]\n\nНе ищи новые проблемы по всему объекту и не проводи независимый аудит реализации, кроме минимального анализа, необходимого для честной оценки самих Proposals.\n\nДля каждого material Proposal оцени:\n- что именно он решает/изменяет и его origin/status;\n- связь с N/FR, Scenario, SRU или текущим планом;\n- relations/groups с другими Proposals;\n- влияние на Desired Scenario и observable outcome;\n- влияние на способ достижения Scenario;\n- scope;\n- время, усилия, деньги/resources и другие существенные costs;\n- maintainability, future change cost и accumulated complexity, если применимо;\n- reversibility и стоимость ошибки;\n- возможность `validate-first / MVP / staged` вместо преждевременной полной реализации;\n- способен ли вариант сделать downstream работу ненужной или потребовать её переделки;\n- current-level он или upstream относительно текущего узла;\n- User Review Priority;\n- Decision Autonomy.\n\nЕсли несколько Proposals связаны через `REQUIRES / RECOMMENDED_WITH / CONFLICTS_WITH / ALTERNATIVE_TO / SUPERSEDES / BUNDLE`, оценивай не только элементы отдельно, но и жизнеспособные композиции.\n\nНе превращай preferred/selected Proposal в committed decision.\n\n## Output\n\nПокажи:\n1. какие Proposals / Groups рассмотрены;\n2. краткую сравнительную оценку каждого;\n3. User Review Priority и основание;\n4. Decision Autonomy и основание;\n5. material Scenario / SRU / cost / complexity / staging impacts;\n6. dependencies, conflicts и groups;\n7. рекомендуемый порядок, в котором пользователю стоит рассматривать решения;\n8. Preferred Candidate Composition или несколько жизнеспособных Candidate Compositions, если это полезно;\n9. какие решения действительно требуют пользователя;\n10. какие material данные отсутствуют для надёжного сравнения, если это применимо.\n\n[[module:output.r-ste-language]]\n",
  "createdAt": "2026-10-07T20:00:00.000Z",
  "updatedAt": "2026-10-10T10:38:47.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
