// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AttendanceTracker from './AttendanceTracker.jsx'; // Import your component

// Render your React application into the #app element found in your index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AttendanceTracker />
  </React.StrictMode>
);
