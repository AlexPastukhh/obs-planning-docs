# Prompt — проверь другого

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "item-1ir0x2w-197y55w",
  "title": "проверь другого",
  "text": "SOURCE / PATH VERIFICATION — ОБЯЗАТЕЛЬНО\n\nНе проверяй assimilation-файл только против собственного контекста,\nпамяти этого чата или уже известных тебе формулировок.\n\nКаждый materially important repository path,\nкоторый указан в проверяемом файле,\nнужно рассматривать как проверяемое утверждение.\n\nДля важных points:\n\n1. Открой указанный repository path самостоятельно.\n2. Проверь, что файл действительно существует в current repository.\n3. Проверь, что его current role / status / scope соответствует тому,\n   как его использует assimilation-файл.\n4. Проверь, что утверждение реально поддерживается этим файлом,\n   а не только похоже на то, что ты помнишь из предыдущего контекста.\n5. Если point ссылается на несколько paths,\n   проверь materially relevant paths, а не только один удобный источник.\n6. Если заявлен owner,\n   проверь сам owner/navigation route,\n   а не только файл, где похожая формулировка встречается вторично.\n7. Если path ведёт в history / migration / supporting material,\n   проверь, нет ли более свежего active owner,\n   прежде чем принимать его за current truth.\n\nНе считай источник проверенным только потому,\nчто:\n- он уже упоминался в предыдущем чате;\n- его содержание есть в твоём conversation context;\n- другой чат раньше назвал его authoritative;\n- утверждение выглядит знакомым.\n\nCURRENT REPOSITORY FILE\n> remembered chat context\nдля проверки current repository truth.\n\nОтдельно проверь `Reading Coverage Ledger`.\n\nПроверь:\n- действительно ли перечисленные paths релевантны заявленным points;\n- не отсутствуют ли очевидные critical owners;\n- не поставлена ли высокая Reading depth файлу,\n  который фактически не покрывает сделанные выводы;\n- не построено ли сильное утверждение на secondary/supporting path;\n- не указан ли неправильный или устаревший path.\n\nЕсли обнаружен неправильный source/path,\nиспользуй класс:\n\nSOURCE/PATH ERROR\n\nЕсли path существует,\nно не является owner для заявленного смысла:\n\nOWNER ERROR\n\nЕсли source поддерживает только более слабое утверждение:\n\nINFERENCE TOO STRONG\n\nЕсли использован устаревший repository state:\n\nSTALE REPO STATE\n\nЕсли current source contradicts assimilation point:\n\nSEMANTIC ERROR / STATUS ERROR / SCOPE ERROR\nв зависимости от характера расхождения.\n\nПроверка должна быть repository-grounded,\nа не context-grounded.",
  "createdAt": "2026-08-15T23:47:26.959Z",
  "updatedAt": "2026-08-15T23:47:26.959Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
