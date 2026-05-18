import "./administrator.css";
import React, {useState} from "react";
//import { adminTasks } from "./administratortasks";

export default function AdministratorTask(){
  const [AdminTask, setAdminTask] = useState("");
  const [result, setResult] = useState("");
  const adminTasks=() => {
	   //need logic in here for adminTasks. Probably will remove it since importing this function from a js file (to be implemented still).
  };  
	
	
return(
<> 
<h1>Administrative Tasks</h1>

<div className="center">
  <div className="boxborder">

    <div className="right">Which task do you want to do?</div>

    <div className="right">
      <label>Add Student</label>
      <input type="checkbox" id="addStudent" value="addStudent" />
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
      <input type="submit" value="Do Task" />
    </div>

  </div>
</div>

</>
);}