@echo off
START "" cmd /k "cd /D ..\..\app\client\react\attendance && npm install html5-qrcode qrcode"
START "" cmd /k "cd /D ..\..\app\ && npm run dev"
timeout /t 3 >nul
START "" http://localhost:5173
