@echo off
setlocal
cd /d "%~dp0"
call build.cmd || exit /b 1
java -jar build\replacement-package-app.jar ui
