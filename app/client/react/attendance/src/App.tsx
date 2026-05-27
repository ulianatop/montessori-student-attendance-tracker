import { Routes, Route } from 'react-router-dom';
import AttendanceTracker from './AttendanceTracker';
import Administrator from './Administrator.jsx';
import AdminLogsIn from './AdminLogsIn.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AttendanceTracker />} />
      <Route path="/admin-tasks" element={<Administrator />} />
	  <Route path="/admin-logsin" element={<AdminLogsIn />}/>
	  <Route path="/check-password" element={<checkPassword />} />
    </Routes>
  );
}

export default App;
