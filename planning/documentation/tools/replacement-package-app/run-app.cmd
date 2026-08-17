@echo off
setlocal
cd /d "%~dp0"
if not exist build\replacement-package-app.jar call build.cmd || exit /b 1
java -jar build\replacement-package-app.jar ui
