@echo off
title SAT Master
cd /d "%~dp0"

echo.
echo ========================================
echo    SAT Master
echo ========================================
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Restart your computer after installing from https://nodejs.org
    echo.
    goto keepopen
)

if not exist "node_modules" (
    echo Installing... (first time takes 1-2 minutes)
    call npm install
    if errorlevel 1 (
        echo ERROR: Install failed!
        goto keepopen
    )
    echo.
)

echo Opening app... When you see "Ready", go to: http://localhost:3000
echo.
call npm run dev
if errorlevel 1 echo.
if errorlevel 1 echo App stopped or crashed - see errors above.

:keepopen
echo.
echo ----------------------------------------
echo Press any key to close.
pause >nul
