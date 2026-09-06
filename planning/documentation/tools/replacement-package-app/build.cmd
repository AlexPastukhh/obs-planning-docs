@echo off
setlocal
cd /d "%~dp0"
if exist build rmdir /s /q build
mkdir build\classes build\test-classes
call ..\replacement-package-common\build.cmd || exit /b 1
xcopy /e /i /y "..\replacement-package-common\build\classes\*" "build\classes\" >nul || exit /b 1
call javac --release 21 -cp build\classes -d build\classes ^
  src\main\java\obs\rpkg\Core.java ^
  src\main\java\obs\rpkg\foundation\result\Result.java ^
  src\main\java\obs\rpkg\foundation\result\OperationResult.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplyExtent.java ^
  src\main\java\obs\rpkg\features\apply\domain\PublicationConfirmationState.java ^
  src\main\java\obs\rpkg\features\apply\domain\PackageApplication.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplyRequest.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplySuccess.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplyFailureCode.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplyFailureDisposition.java ^
  src\main\java\obs\rpkg\features\apply\domain\ApplyFailure.java ^
  src\main\java\obs\rpkg\features\apply\application\ApplyReplacementPackage.java ^
  src\main\java\obs\rpkg\ReviewChatTitleMatcher.java ^
  src\main\java\obs\rpkg\ChatBridgeService.java ^
  src\main\java\obs\rpkg\ChatBridgeServer.java ^
  src\main\java\obs\rpkg\GitClient.java ^
  src\main\java\obs\rpkg\GitHubClient.java ^
  src\main\java\obs\rpkg\Json.java ^
  src\main\java\obs\rpkg\Main.java ^
  src\main\java\obs\rpkg\MainWindow.java ^
  src\main\java\obs\rpkg\WindowsNotifier.java ^
  src\main\java\obs\rpkg\RepositorySnapshotExporter.java ^
  src\main\java\obs\rpkg\StateStore.java ^
  src\main\java\obs\rpkg\WindowsLauncherInstaller.java || exit /b 1
call javac --release 21 -cp build\classes -d build\test-classes ^
  src\test\java\obs\rpkg\CoreTests.java ^
  src\test\java\obs\rpkg\features\apply\ApplyReplacementPackageFeatureIntegrationTests.java ^
  src\test\java\obs\rpkg\ApplyReceiptTests.java ^
  src\test\java\obs\rpkg\ChatBridgeTests.java ^
  src\test\java\obs\rpkg\WindowsLauncherInstallerTests.java || exit /b 1
call jar --create --file build\replacement-package-app.jar --main-class obs.rpkg.Main -C build\classes . || exit /b 1
echo BUILD SUCCESS build\replacement-package-app.jar
