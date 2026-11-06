@echo off
title ScamShield AI - Local Mode Launcher
cd /d "%~dp0"

echo ======================================================
echo    Opening ScamShield AI in Standalone Browser Mode   
echo ======================================================
echo.
echo Opening index.html directly...
start "" "%~dp0index.html"
