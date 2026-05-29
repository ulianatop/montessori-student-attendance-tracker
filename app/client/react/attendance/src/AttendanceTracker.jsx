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

        <form className="boxborder">
          <fieldset className="field">
            <legend id="legend">Check in/out:</legend>
            <label htmlFor="login_id">Login PIN:&nbsp;&nbsp;</label>

            <input
              type="text"
              id="login_id"
              value={loginID}
              onChange={(e) => setLoginID(e.target.value)}
            />

            <label htmlFor="sub_title">
              Student's Name:
            </label>

            <div>
              <label htmlFor="student_firstname">First:</label>
              <input
                type="text"
                id="student_firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="student_lastname">Last:</label>
              <input
                type="text"
                id="student_lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="buttons">
              <input type="button" value="Find Student" onClick={async () => {
                let oldDiv = document.querySelector(".center");
                let result = document.querySelector("#result");

                await oldDiv.replaceWith(await findStudent(oldDiv, result));
              }} />
            </div>

            <div className="buttons">
              <input type="button" value="Scan QR code" id="open-scanner" />
            </div>

            <div id="scanner-modal"
              style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999; align-items: center; justify-content: center;">
              <div
                style="background: white; padding: 20px; border-radius: 12px; width: 90%; max-width: 450px; position: relative;">

                <button id="close-scanner"
                  style="position: absolute; top: -40px; right: 0; background: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                  CLOSE [X]
                </button>

                <div id="reader"></div>
              </div>
            </div>

            <div id="result" className="center">
              {result}
              <div id="error"></div>
            </div>
          </fieldset>
        </form>
      </div>

      <div className="lower">
        <br /><br /><br /><br /><br /><br />
        <input type="button" value="Admin Tasks" onClick={() => navigate('/admin-logsin')} />
      </div>

    </>
  );
}