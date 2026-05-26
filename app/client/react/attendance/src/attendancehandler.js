let verifiedStudent = null;

export async function findStudent() { 
    const pin = document.getElementById("login_id").value.trim();
    const first = document.getElementById("student_firstname").value.trim();
    const last = document.getElementById("student_lastname").value.trim();

   const resultDiv = document.getElementById("result");
    if (!resultDiv) {
        console.error("Main container #result not found.");
        return;
    }

  
    let displayDiv = document.getElementById("attendance-status-display");
    if (!displayDiv) {
        displayDiv = document.createElement("div");
        displayDiv.id = "attendance-status-display";
        displayDiv.style.marginTop = "15px";
		displayDiv.className = "center";
        resultDiv.appendChild(displayDiv); 
    }
    displayDiv.innerHTML = ""; 

   
    if (!pin || !first || !last) {
        displayDiv.textContent = "Please enter PIN, first name and last name.";
        displayDiv.style.color = "red";
        return;
    }

try{
    // Verify pin and student
    const res = await fetch("http://localhost:3000/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pin,
            firstName: first,
            lastName: last
        })
    });

    const data = await res.json();

    if (!data.success) {
        resultDiv.textContent = "Invalid PIN or student name";
        return;
    }

    verifiedStudent = data.student;

    const statusText = document.createElement("p");
    statusText.textContent =
        `${verifiedStudent.StudentFirstName} ${verifiedStudent.StudentLastName} - ${verifiedStudent.AttendanceStatus}`;

    const btn = document.createElement("button");
    btn.textContent =
        verifiedStudent.AttendanceStatus === "Checked In"
            ? "Check Out"
            : "Check In";

    btn.onclick = async () => {
        const res = await fetch("http://localhost:3000/toggle-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                StudentID: verifiedStudent.StudentID,
                AttendanceStatus: verifiedStudent.AttendanceStatus
            })
        });

        const result = await res.json();

        verifiedStudent.AttendanceStatus = result.newStatus;

        findStudent(); // refresh display
    };

        displayDiv.appendChild(statusText);
        displayDiv.appendChild(btn);
 } catch (error) {
	console.error("Error executing database lookup routing loop:", error);
	displayDiv.textContent = "Server communication error.";
 }
}