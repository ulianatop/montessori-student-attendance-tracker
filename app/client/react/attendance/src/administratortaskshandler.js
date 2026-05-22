// administratortaskshandler.js
// Author: Ian Lindquist
import { useState } from "react";

let adminTask="none";

export async function adminTasks(taskName, onSuccess){
	
	const APICommand = `http://localhost:3000/${taskName}`;

  try{
	  const res= await fetch (APICommand, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskName })
    });
	
	const data = await res.json();
	
	if (data && data.message) {
        onSuccess(data.message);
    } else {
      onSuccess("Received unexpected empty response format.");
    }
   } catch (error){
	  console.error("That didn't work,",error);
	  onSuccess("Failed to reach backend server.");
	}

}