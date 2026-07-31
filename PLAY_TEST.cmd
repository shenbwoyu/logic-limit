@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  echo Run SETUP_ONCE.cmd first.
  pause
  exit /b 1
)
call npm.cmd start
if errorlevel 1 pause
