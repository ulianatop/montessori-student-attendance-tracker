import "./administrator.css";
import React, {useState} from "react";
import { adminTasks } from "./administratortaskshandler";

export default function Administrator(){
  const [adminTask, setAdminTask] = useState("");
  const [result, setResult] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleButtonClick = async () => {
      await adminTasks(setSuccessMessage);
    };
return(
<> 
<h1>Administrative Tasks</h1>

<div className="center">
  <div className="boxborder">

    <div className="right">Which task do you want to do?</div>

    <div className="right">
      <label>Add Student</label>
      <input type="checkbox" id="addStudent" value="addStudent"  />
    </div>

    <div className="right">
      <label>Deactivate Student</label>
      <input type="checkbox" id="deactivateStudent" value="deactivateStudent" />
    </div>

    <div className="right">
      <label>Check-in/Check-out Student</label>
      <input type="checkbox" id="checkInOut" value="checkInOut" />
    </div>

    <div className="right">
      <label>Create new admin user</label>
      <input type="checkbox" id="createUser" value="createUser" />
    </div>

    <div className="right">
      <label>Deactivate admin user</label>
      <input type="checkbox" id="deactivateUser" value="deactivateUser" />
    </div>
	<div className="right">
      <label>Create new authorized adult user</label>
      <input type="checkbox" id="createAdult" value="createAdult" />
    </div>

    <div className="right">
      <label>Deactivate authorized adult user</label>
      <input type="checkbox" id="deactivateAdult" value="deactivateAdult" />
    </div>

    <div className="right">
      <label>Run attendance report</label>
      <input type="checkbox" id="runReport" value="runReport" />
    </div>

    <div className="buttons">
      <button type="button" onClick={handleButtonClick}>Do Task </button>
    </div>
	<div id="result" className="center">
      {successMessage && (
                <p style={{ color: "purple", fontWeight: "bold", marginTop: "15px" }}>
                    {successMessage}
                </p>
            )}
    </div>
  </div>
</div>

</>
);}