@echo off
setlocal
cd /d "%~dp0"
if exist build rmdir /s /q build
mkdir build\classes build\test-classes
call javac --release 21 -d build\classes ^
  src\main\java\obs\rpkg\Core.java ^
  src\main\java\obs\rpkg\ChatBridgeService.java ^
  src\main\java\obs\rpkg\ChatBridgeServer.java ^
  src\main\java\obs\rpkg\GitClient.java ^
  src\main\java\obs\rpkg\Json.java ^
  src\main\java\obs\rpkg\Main.java ^
  src\main\java\obs\rpkg\MainWindow.java ^
  src\main\java\obs\rpkg\RepositorySnapshotExporter.java ^
  src\main\java\obs\rpkg\StateStore.java || exit /b 1
call javac --release 21 -cp build\classes -d build\test-classes ^
  src\test\java\obs\rpkg\CoreTests.java ^
  src\test\java\obs\rpkg\ChatBridgeTests.java || exit /b 1
call jar --create --file build\replacement-package-app.jar --main-class obs.rpkg.Main -C build\classes . || exit /b 1
echo BUILD SUCCESS build\replacement-package-app.jar
