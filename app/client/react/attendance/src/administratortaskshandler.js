// administratortaskshandler.js
// Author: Ian Lindquist
import { useState } from "react";

let adminTask="none";

export async function adminTasks(onSuccess){
	const addStudentCheckbox = document.getElementById("addStudent");
	const deactivateStudentCheckbox = document.getElementById("deactivateStudent");
	const checkInOutCheckbox = document.getElementById("checkInOut");
	const createUserCheckbox = document.getElementById("createUser");
	const deactivateUserCheckbox = document.getElementById("deactivateUser");
	const createAdultCheckbox = document.getElementById("createAdult");
	const deactivateAdultCheckbox = document.getElementById("deactivateAdult");
	const runReportCheckbox = document.getElementById("runReport");
	
	// Determine which checkbox is checked. If multiple are checked, it will just go with the first one it finds.
	if (addStudentCheckbox.checked) {
		adminTask ="addStudent";
	}
	else if (deactivateStudentCheckbox.checked) {
		adminTask ="deactivateStudent";
	}
	else if (checkInOutCheckbox.checked){
		adminTask ="checkInOut";
	}
	else if (createUserCheckbox.checked) {
		adminTask ="createUser";
	}
	else if (deactivateUserCheckbox.checked){
		adminTask ="deactivateUser";
	}
	else if (createAdultCheckbox.checked){
		adminTask ="createAdult";
	}
	else if (deactivateAdultCheckbox.checked){
		adminTask ="deactivateAdult";
	}
	else if (runReportCheckbox.checked){
		adminTask="runReport";
	}
	async function handleAdminTask() {
	let APICommand = `http://localhost:3000/${adminTask}`;
	try{
	  const res= await fetch (APICommand, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: adminTask })
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
	await handleAdminTask(); 
}