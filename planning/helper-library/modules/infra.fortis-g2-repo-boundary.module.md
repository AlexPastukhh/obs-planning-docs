# Module — Fortis G2 / Repo — границы доступа и выбор контура

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "infra.fortis-g2-repo-boundary",
  "title": "Fortis G2 / Repo — границы доступа и выбор контура",
  "text": "## Fortis G2 и Fortis Repo — границы\n\n**Fortis Repo** — основной инструмент для исходников, Git, CLI, сборок и тестов через Linux Docker. По последней проверке `/workspace/repos` и `/workspace/files` — RW-монтирования Windows, а `/workspace/repo` — отдельный Docker volume. Изменения в RW-монтировании затрагивают настоящие Windows-файлы. Перед работой проверь актуальный путь, mount и права. Repo не даёт автоматически доступа к Windows PowerShell, процессам и GUI владельца.\n\n**Fortis G2** — отдельный Windows-инструмент в гостевой учётной записи, с её полномочиями и собственным GUI/браузером. Он не получает права владельца автоматически. **Прежний owner HOST** был остановлен; не используй его или старые `app://`-ссылки как действующий маршрут и не запускай самостоятельно. G2 и Repo независимы; Sites и Snapshot Bridge не обязательны.\n\nВыбирай доступное подключение по цели, расположению файлов и реальным правам. Не обходи запреты одного контура через другой, не расширяй mounts, ACL, полномочия и доступ к owner home, не создавай туннели/копии проектов без соответствующего согласия. Для меняющегося состояния опирайся на актуальные инструменты, `README.md`/`AGENTS.md` и действующие инструкции, а не на старые схемы.",
  "createdAt": "2026-10-17T14:27:09.067Z",
  "updatedAt": "2026-10-17T14:58:03.416Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
