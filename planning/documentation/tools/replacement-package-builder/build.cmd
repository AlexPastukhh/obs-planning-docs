@echo off
setlocal
cd /d "%~dp0"
if exist build rmdir /s /q build
mkdir build\classes build\test-classes
call ..\replacement-package-common\build.cmd || exit /b 1
xcopy /e /i /y "..\replacement-package-common\build\classes\*" "build\classes\" >nul || exit /b 1
call javac --release 21 -cp build\classes -d build\classes ^
  src\main\java\obs\rpkgbuilder\PackageBuilder.java ^
  src\main\java\obs\rpkgbuilder\StateAdvancer.java ^
  src\main\java\obs\rpkgbuilder\Main.java || exit /b 1
call javac --release 21 -cp build\classes -d build\test-classes ^
  src\test\java\obs\rpkgbuilder\PackageBuilderTests.java ^
  src\test\java\obs\rpkgbuilder\StateAdvancerTests.java || exit /b 1
call jar --create --file build\replacement-package-builder.jar --main-class obs.rpkgbuilder.Main -C build\classes . || exit /b 1
echo BUILD SUCCESS build\replacement-package-builder.jar
