@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title LOGIC LIMIT - First-time setup

echo ============================================================
echo LOGIC LIMIT - FIRST-TIME SETUP
echo ============================================================
echo.
echo Run this file only once on this project folder.
echo It downloads Electron and the Windows packaging tools.
echo The download can take several minutes.
echo.

where node.exe >nul 2>nul || goto NO_NODE
where npm.cmd >nul 2>nul || goto NO_NODE

if exist "node_modules\electron\dist\electron.exe" if exist "node_modules\.bin\electron-builder.cmd" goto ALREADY_READY

call npm.cmd config set fetch-retries 5
call npm.cmd config set fetch-retry-mintimeout 20000
call npm.cmd config set fetch-retry-maxtimeout 120000

echo Installing packages. Live output is shown below:
echo.
call npm.cmd install --no-audit --no-fund
if errorlevel 1 goto FAILED

echo.
echo ============================================================
echo SETUP COMPLETE
echo ============================================================
echo You can now use BUILD_WINDOWS.cmd whenever the game changes.
echo.
pause
exit /b 0

:ALREADY_READY
echo Required packages are already installed.
echo You can use BUILD_WINDOWS.cmd now.
echo.
pause
exit /b 0

:NO_NODE
echo Node.js or npm was not found.
echo Install the Node.js LTS version, then run this file again.
echo https://nodejs.org/
echo.
pause
exit /b 1

:FAILED
echo.
echo ============================================================
echo SETUP FAILED
echo ============================================================
echo Check the error shown above. Do not close this window before

echo taking a screenshot of the final error lines.
echo.
pause
exit /b 1
