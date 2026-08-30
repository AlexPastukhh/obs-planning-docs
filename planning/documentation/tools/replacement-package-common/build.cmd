@echo off
setlocal
cd /d "%~dp0"
if exist build rmdir /s /q build
mkdir build\classes build\test-classes
call javac --release 21 -d build\classes ^
  src\main\java\obs\rpkgcommon\PackageStateApplier.java || exit /b 1
call javac --release 21 -cp build\classes -d build\test-classes ^
  src\test\java\obs\rpkgcommon\PackageStateApplierTests.java || exit /b 1
call jar --create --file build\replacement-package-common.jar -C build\classes . || exit /b 1
echo BUILD SUCCESS build\replacement-package-common.jar
