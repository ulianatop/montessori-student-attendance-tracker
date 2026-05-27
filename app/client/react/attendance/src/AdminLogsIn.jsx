import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./attendancetracker.css";
import { checkPassword } from "./adminloginhandler";
export default function AdminLogsIn(){
	const [loginMessage, setLoginMessage] = useState("");
	const [adminName, setAdminName] = useState("");
	const [adminPassword, setAdminPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	 const [result, setResult] = useState("");
	const navigate = useNavigate();

const handleLoginClick = async () => {
    try {
        setLoginMessage(""); 
        const message = await checkPassword(adminName, adminPassword);
        setLoginMessage(message); 
		if (message === "Login successful!") {
			setTimeout(() => {
                navigate('/admin-tasks');
            }, 1000);
		}
    } catch (err) {     
        setLoginMessage(err.message || "An error occurred during login.");
    }
};

return(
<>
<br /><br /><br /><br /><br />
	<h1>Administrator Login Page</h1>
  <div className="center">
    <div className="boxborder">

    <label htmlFor="admin_name">Username:</label>
    <input
      type="text"
      id="admin_name"
      value={adminName}
      onChange={(e) => setAdminName(e.target.value)}
    />
    <br />
    <label htmlFor="admin_password">Password:&nbsp;</label>
    <input
      type="text"
      id="admin_password"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
    />
    <br />
	</div>
  </div>
	<div className="lower">
	<br /><br />
	<input type="button" value="login" onClick={() => handleLoginClick()}/>
  </div>
  <div id="result" className="center">
            <div dangerouslySetInnerHTML={{ __html: loginMessage }} />
      {result}
  </div>
</>	
);}