@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title LOGIC LIMIT - Windows Builder

echo ============================================================
echo LOGIC LIMIT v4.0.0 - WINDOWS BUILD
echo ============================================================
echo.

where node.exe >nul 2>nul || goto NO_NODE
where npm.cmd >nul 2>nul || goto NO_NODE

if not exist "node_modules\electron\dist\electron.exe" goto NEED_SETUP
if not exist "node_modules\.bin\electron-builder.cmd" goto NEED_SETUP

if exist "dist" rmdir /s /q "dist"

echo [1/3] Checking source files...
call npm.cmd run check
if errorlevel 1 goto FAILED

echo.
echo [2/3] Building portable version...
call npm.cmd run build:portable
if errorlevel 1 goto FAILED

echo.
echo [3/3] Building installer version...
call npm.cmd run build:installer
if errorlevel 1 goto PARTIAL

echo.
echo ============================================================
echo BUILD COMPLETE
echo ============================================================
echo dist\LOGIC_LIMIT_Portable_4.0.0_x64.exe
echo dist\LOGIC_LIMIT_Setup_4.0.0_x64.exe
echo.
explorer.exe "%~dp0dist"
pause
exit /b 0

:PARTIAL
echo.
echo The portable EXE was built, but the installer failed.
echo The playable portable file remains in the dist folder.
explorer.exe "%~dp0dist"
pause
exit /b 2

:NEED_SETUP
echo Required packages are not installed in this folder.
echo Run SETUP_ONCE.cmd first.
echo.
pause
exit /b 1

:NO_NODE
echo Node.js or npm was not found.
echo Install Node.js LTS and restart Windows Terminal/File Explorer.
echo.
pause
exit /b 1

:FAILED
echo.
echo BUILD FAILED. The final error is shown above.
echo Keep this window open and take a screenshot of the final lines.
echo.
pause
exit /b 1
