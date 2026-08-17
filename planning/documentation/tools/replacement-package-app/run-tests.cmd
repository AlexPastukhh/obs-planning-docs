@echo off
setlocal
cd /d "%~dp0"
call build.cmd || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.CoreTests || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.ChatBridgeTests
exit /b %ERRORLEVEL%
