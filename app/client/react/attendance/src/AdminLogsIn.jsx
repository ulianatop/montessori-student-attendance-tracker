import React, {useState} from "react"; // import the React library, useState hook to track input field changes.
import { useNavigate } from 'react-router-dom'; // Import navigation hook from react-router-dom
import "./administrator.css"; //import CSS
import { checkPassword } from "./adminloginhandler"; //import password checking helper function
export default function AdminLogsIn(){ // declare main function AdminLogsIn
	const [loginMessage, setLoginMessage] = useState(""); // init state viariable for login messages or errors
	const [adminName, setAdminName] = useState(""); // init state variable for username input
	const [adminPassword, setAdminPassword] = useState(""); // init state variable for password input
	const navigate = useNavigate(); // init nav function

const handleLoginClick = async () => { // trigger for when user clicks Login button
    try {
        setLoginMessage(""); //Clear old login messages 
        const message = await checkPassword(adminName, adminPassword); // call the API function to check username & password
        setLoginMessage(message);  // store the reply from the server
		if (message === "Login successful!") { //if success, wait one then redirect to admin tasks API
			setTimeout(() => {
                navigate('/admin-tasks');
            }, 1000);
		}
    } catch (err) {     
        setLoginMessage(err.message || "An error occurred during login."); //catch any errors during login
    }
};

return( // return the UI stuff
<>
<br /><br /><br /><br /><br />
	<h1>Administrator Login Page</h1>
  <div className="center">
    <div className="boxborder">
    <label htmlFor="admin_name">Username:</label>
    <input
      type="text"
	  className="boxborder"
      id="admin_name"
      value={adminName}
      onChange={(e) => setAdminName(e.target.value)}
    />
    <br />
    <label htmlFor="admin_password">Password:&nbsp;</label>
    <input
      type="password"
	  className="boxborder"
      id="admin_password"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
    />
	<div className="buttons">
            <input type="button" value="Login" onClick={handleLoginClick} />
          </div>
          {loginMessage && (
            <div id="result">
              <div dangerouslySetInnerHTML={{ __html: loginMessage }} />
            </div>
          )}

        </div>
      </div>
    </> 
  );
}
 