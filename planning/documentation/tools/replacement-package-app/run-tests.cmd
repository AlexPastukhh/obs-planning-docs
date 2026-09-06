@echo off
setlocal
cd /d "%~dp0"
call build.cmd || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.work.domain.WorkAggregateTests || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.features.apply.ApplyReplacementPackageFeatureIntegrationTests || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.ApplyReceiptTests || exit /b 1
java -cp "build\classes;build\test-classes" obs.rpkg.WindowsLauncherInstallerTests
exit /b %ERRORLEVEL%
