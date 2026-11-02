# Prompt — токен

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "item-8bodwz-1yxlkvv",
  "title": "токен",
  "text": "В Docker Fortis Repo авторизация GitHub уже настроена через защищённый credential helper:\n\n`/workspace/repo/.fortis-auth/git-credential-fortis-shared`\n\nОн предоставляет GitHub PAT для Git-операций. Сам токен не хранится в репозиториях, и его точное место хранения отдельно не проверялось.\n\nДля push используй:\n\n```bash\ngit -c credential.helper=/workspace/repo/.fortis-auth/git-credential-fortis-shared -c credential.useHttpPath=true push origin main\n```\n\nПеред push проверь ветку, статус Git и коммиты. **Не выводи токен, не копируй его и не добавляй в репозиторий.**",
  "createdAt": "2026-11-02T04:38:18.264Z",
  "updatedAt": "2026-11-02T04:38:18.264Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
