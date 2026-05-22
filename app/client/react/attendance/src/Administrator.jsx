import "./administrator.css";
import React, {useState} from "react";
import { adminTasks } from "./administratortaskshandler";

export default function Administrator(){
  const [adminTask, setAdminTask] = useState("");
  const [result, setResult] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleButtonClick = async () => {
	if (!adminTask) {
      setSuccessMessage("Please select a task first.");
      return;
    }
	console.log("Selected adminTask:", adminTask);

      await adminTasks(adminTask, setSuccessMessage);
    };
	
return(
<> 
<h1>Administrative Tasks</h1>

 <div className="center">
  <div className="boxborder">

    <div className="right">Which task do you want to do?</div>

    <div className="right">
      <label>Add Student</label>
      <input type="radio" name="choose" value="addStudent" 
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="right">
      <label>Deactivate Student</label>
      <input type="radio" name="choose" value="deactivateStudent" 
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="right">
      <label>Check-in/Check-out Student</label>
      <input type="radio" name="choose" value="checkInOut"
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="right">
      <label>Create new admin user</label>
      <input type="radio" name="choose" value="createUser"
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="right">
      <label>Deactivate admin user</label>
      <input type="radio" name="choose" value="deactivateUser"
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>
	<div className="right">
      <label>Create new authorized adult user</label>
      <input type="radio" name="choose" value="createAdult"
	  onChange={(e) => setAdminTask(e.target.value)} />
    </div>

    <div className="right">
      <label>Deactivate authorized adult user</label>
      <input type="radio" name="choose" value="deactivateAdult"
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="right">
      <label>Run attendance report</label>
      <input type="radio" name="choose" value="runReport"
	  onChange={(e) => setAdminTask(e.target.value)}/>
    </div>

    <div className="buttons">
      <button type="button" onClick={handleButtonClick}>Do Task </button>
    </div>
	<div id="result" className="center">
      {successMessage && (
                <p style={{ color: "white", fontWeight: "bold", marginTop: "15px" }}>
                    {successMessage}
                </p>
            )}
    </div>
  </div>
</div>
</>
);}