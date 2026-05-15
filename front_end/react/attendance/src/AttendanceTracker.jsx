import "./attendancetracker.css";
import React, {useState} from "react";
import { findStudent } from "./attendancehandler";

export default function AttendanceTracker(){
  const [loginID, setLoginID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState("");
  const adminTasks=() => {
	  //need logic in here for adminTasks
  };  
	
	
return(
<> 
<br /><br /><br /><br /><br />
<h1>Northern Lights Montessori Attendance Tracker</h1>
<div className="center">
<div className="boxborder">
  <label htmlFor="login_id">Login PIN:&nbsp;&nbsp;</label>
  <input type="text" id="login_id" value={loginID}
  onChange={(e) => setLoginID(e.target.value)} />
  <br />
  <p>Student's Name:</p>
  
  <label htmlFor="student_firstname">First:</label>
  <input type="text" id="student_firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
  <br />
  
  <label htmlFor="student_lastname">Last:</label>
  <input type="text" id="student_lastname" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
  <br />
  
  <div className="buttons">
    <input type="button" value="Find Student" onClick={findStudent} />
  </div>
  
  <div id ="result" className="center">
  {result}
  </div>
  
</div>
</div>
<div className="lower">
        <br /><br /><br /><br /><br /><br />
        <input type="submit" value="Admin Tasks" onClick={adminTasks} />
</div>

</>
);}