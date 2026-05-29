@echo off
START "" cmd /k "cd /D ..\..\app\server\ && node server.mjs"
START "" cmd /k "cd /D ..\..\app\client\react\attendance && npm install html5-qrcode qrcode && npm run dev"
@REM START "" cmd /k "cd /D ..\..\app\client\react\attendance && npm run dev"
timeout /t 3 >nul
START "" http://localhost:5173
