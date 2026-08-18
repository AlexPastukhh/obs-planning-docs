# Prompt — обс консп команда арх текст

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "item-1fn6jzu-cvvm3e",
  "title": "обс консп команда арх текст",
  "text": "& { $Src=\"C:\\Users\\alexa\\obs\\_ai-conspects\"; $Tmp=Join-Path $env:TEMP \"_ai-conspects-text\"; $Zip=\"C:\\Users\\alexa\\obs\\_ai-conspects-text.zip\"; Remove-Item $Tmp -Recurse -Force -ErrorAction SilentlyContinue; New-Item -ItemType Directory -Path $Tmp | Out-Null; robocopy $Src $Tmp *.md *.txt *.json *.yaml *.yml *.csv *.xml *.html *.css *.js *.jsx *.ts *.tsx *.cs *.py *.ps1 /S /R:0 /W:0 /NFL /NDL /NJH /NJS | Out-Null; if (Test-Path $Zip) { Remove-Item $Zip -Force }; Compress-Archive -Path \"$Tmp\\*\" -DestinationPath $Zip -Force; Remove-Item $Tmp -Recurse -Force; Write-Host \"Created: $Zip\" }",
  "createdAt": "2026-08-18T03:32:09.049Z",
  "updatedAt": "2026-08-18T03:32:09.049Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
