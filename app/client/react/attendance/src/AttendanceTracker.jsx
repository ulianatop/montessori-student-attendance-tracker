import "./attendancetracker.css";
import React, { useState, useEffect } from "react";
import { findStudent } from "./attendancehandler";
import { adminTasks } from "./administratortaskshandler";
import { useNavigate } from 'react-router-dom';
import { generate, startScanner, stopScanner } from './qrcodehandling';


export default function AttendanceTracker() {
  const [loginID, setLoginID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const openBtn = document.getElementById('open-scanner');
  //   const closeBtn = document.getElementById('close-scanner');
  //   openBtn?.addEventListener('click', startScanner);
  //   closeBtn?.addEventListener('click', stopScanner);
  //   return () => {
  //     openBtn?.removeEventListener('click', startScanner);
  //     closeBtn?.removeEventListener('click', stopScanner);
  //   };
  // }, []);



  return (
    <>
      <br /><br /><br /><br /><br />
      <h1>Northern Lights Montessori Attendance Tracker</h1>
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
<<<<<<< HEAD
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
=======
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
>>>>>>> main

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

<<<<<<< HEAD
</>
);}
=======

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
              <input type="button" value="Scan QR code" id="open-scanner" onClick={startScanner}/>
            </div>

            <div className="buttons">
              <input type="button" value="Generate QR code" id="Generate" onClick={generate}/>
            </div>

            <div
              id="scanner-modal"
              style={{
                display: 'none',
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                zIndex: 9999,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <div
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '450px',
                  position: 'relative',
                }}>

                <button
                  id="close-scanner"
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: 0,
                    background: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                  onClick={stopScanner}>
                  CLOSE [X]
                </button>

                <div id="reader"></div>
              </div>
            </div>

            <div id="result" className="center">
              {result}
              <div id="error"></div>
            </div>

            <div>
              <img src="" id="qrImage" alt="QR code can appear here"/>
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
>>>>>>> main
