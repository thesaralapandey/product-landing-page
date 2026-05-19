@echo off
cd /d "%~dp0"
title Marketing Uplift Local Server
echo Building and starting Marketing Uplift on http://localhost:3001
call "C:\Program Files\nodejs\npm.cmd" run build
if errorlevel 1 (
  echo.
  echo Build failed. Press any key to close this window.
  pause >nul
  exit /b 1
)
echo.
echo Server is starting at http://localhost:3001
call "C:\Program Files\nodejs\npm.cmd" run start -- --port 3001
