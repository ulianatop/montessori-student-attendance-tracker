import { Routes, Route } from 'react-router-dom';
import AttendanceTracker from './AttendanceTracker';
import Administrator from './Administrator.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AttendanceTracker />} />
      <Route path="/admin-tasks" element={<Administrator />} />
    </Routes>
  );
}

export default App;
