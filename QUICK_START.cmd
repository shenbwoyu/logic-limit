@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  call SETUP_ONCE.cmd
  if errorlevel 1 exit /b 1
)
call BUILD_WINDOWS.cmd
