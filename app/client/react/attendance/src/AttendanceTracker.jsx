import "./attendancetracker.css";
import React, { useState } from "react";
import { findStudent } from "./attendancehandler";
import { adminTasks } from "./administratortaskshandler";
import { useNavigate } from 'react-router-dom';


export default function AttendanceTracker() {
  const [loginID, setLoginID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();


  return (
    <>
      <br /><br /><br /><br /><br />

      <h1>Northern Lights Montessori Attendance Tracker</h1>

      <div className="center">
        <div className="boxborder">

          <form>
            <fieldset>
              <legend id="legend">Check in/out:</legend>
            
              <div id="log_in">
                <label htmlFor="login_id">Login PIN:&nbsp;&nbsp;</label>
            <input
              type="text"
              id="login_id"
              value={loginID}
              onChange={(e) => setLoginID(e.target.value)}
            />
              </div>

            <p>Student's Name:</p>

            <label htmlFor="student_firstname">First:</label>
            <input
              type="text"
              id="student_firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <div id="last_name">
              <label htmlFor="student_lastname">Last:</label>
            <input
              type="text"
              id="student_lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            <br />

            <div className="buttons">
              <input type="button" value="Find Student" onClick={async () => {
                let oldDiv = document.querySelector(".center");
                let result = document.querySelector("#result");

                await oldDiv.replaceWith(await findStudent(oldDiv, result));
              }} />
            </div>

            <div id="result" className="center">
              {result}
              <div id="error"></div>
            </div>
          </fieldset>
          </form>

        </div>
      </div>

      <div className="lower">
        <br /><br /><br /><br /><br /><br />
        <input type="button" value="Admin Tasks" onClick={() => navigate('/admin-logsin')} />
      </div>

    </>
  );
}