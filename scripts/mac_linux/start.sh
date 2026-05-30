#!/bin/bash
# quick script to call nodejs concurrently package
cd ../../app/client/react/attendance
npm install html5-qrcode qrcode
cd ../../app
npm run dev
