import "./administrator.css";
import React, { useState, useCallback } from "react";
import { adminTasks } from "./administratortaskshandler";
import { findStudent } from "./attendancehandler";
import { useNavigate } from 'react-router-dom';

if (typeof window !== "undefined") {
  window.findStudent = findStudent;
}

export default function Administrator() {
  const navigate = useNavigate();
  const [adminTask, setAdminTask] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resultRef = useCallback((node) => {
    if (node !== null) {
      const findStudentBtn = node.querySelector("#btn-find-student") || 
                            node.querySelector("button");

      if (findStudentBtn) {
        console.log("Found the button inside DOM! Attaching listener...");
        findStudentBtn.removeEventListener("click", renderStudents);
        findStudentBtn.addEventListener("click", renderStudents);
      }
    }
  }, [successMessage]);

const renderStudents = async () => {
    const oldDiv = document.querySelector("#DHTML");
    await oldDiv.replaceWith(await findStudent(oldDiv));
  }
  
  const handleButtonClick = async (e) => {
    const buttonName = e.target.name;
    
    if (buttonName === "do_task") {
      if (!adminTask) {
        setSuccessMessage("Please select a task first.");
        return;
      }
      console.log("Selected adminTask:", adminTask);
      await adminTasks(adminTask, setSuccessMessage);
	  
  

    }

    if (buttonName === "go_back") {
      navigate('/');
    }
  };
	

return (
<> 
<h1>Administrative Tasks</h1>


      <div className="center">
        <div className="boxborder">
          <div className="right">Which task do you want to do?</div>

          <div className="right">
            <label>Add Student</label>
            <input 
              type="radio" 
              name="choose" 
              value="addStudent" 
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="right">
            <label>Deactivate Student</label>
            <input 
              type="radio" 
              name="choose" 
              value="deactivateStudent" 
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="right">
            <label>Check-in/Check-out Student</label>
            <input 
              type="radio" 
              name="choose" 
              value="checkInOut"
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="right">
            <label>Create new admin user</label>
            <input 
              type="radio" 
              name="choose" 
              value="createUser"
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="right">
            <label>Deactivate admin user</label>
            <input 
              type="radio" 
              name="choose" 
              value="deactivateUser"
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>
          
          <div className="right">
            <label>Create new authorized adult user</label>
            <input 
              type="radio" 
              name="choose" 
              value="createAdult"
              onChange={(e) => setAdminTask(e.target.value)} 
            />
          </div>

          <div className="right">
            <label>Deactivate authorized adult user</label>
            <input 
              type="radio" 
              name="choose" 
              value="deactivateAdult"
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="right">
            <label>Run attendance report</label>
            <input 
              type="radio" 
              name="choose" 
              value="runReport"
              onChange={(e) => setAdminTask(e.target.value)}
            />
          </div>

          <div className="buttons">
            <button type="button" name="do_task" onClick={handleButtonClick}>Do Task</button>
            <button type="button" name="go_back" onClick={handleButtonClick}>Go Back</button>
          </div>


          <div id="result" ref={resultRef}>
            <div dangerouslySetInnerHTML={{ __html: successMessage }} />
          </div>
        </div>
      </div>
    </>
  );
}

