import "./attendancetracker.css";
import React, {useState} from "react";
import { findStudent } from "./attendancehandler";
import { adminTasks } from "./administratortaskshandler";
import { useNavigate } from 'react-router-dom';


export default function AttendanceTracker(){
  const [loginID, setLoginID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
	
	
return(
<> 
<br /><br /><br /><br /><br />

<h1>Northern Lights Montessori Attendance Tracker</h1>

<div className="center">
  <div className="boxborder">

    <label htmlFor="login_id">Login PIN:</label>
	<br />
    <input
      type="text"
	  className="boxborder"
      id="login_id"
      value={loginID}
      onChange={(e) => setLoginID(e.target.value)}
    />
    <br />

    <p>Student's Name:</p>

    <label htmlFor="student_firstname">First:</label>
	<br />
    <input
      type="text"
	  className="boxborder"
      id="student_firstname"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
    <br />

    <label htmlFor="student_lastname">Last:</label>
	<br />
    <input
      type="text"
	  className="boxborder"
      id="student_lastname"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
    <br />

    <div className="buttons">
      <input type="button" value="Find Student" onClick={findStudent} />
	  <input type="button" value="Admin Tasks" onClick={() => navigate('/admin-logsin')}/>
    </div>

    <div id="result" className="center">
      {result}
    </div>

  </div>
</div>

</>
);}