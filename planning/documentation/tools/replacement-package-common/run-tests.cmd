@echo off
setlocal
cd /d "%~dp0"
call build.cmd || exit /b 1
call java -cp build\classes;build\test-classes obs.rpkgcommon.PackageStateApplierTests || exit /b 1
echo TESTS SUCCESS
