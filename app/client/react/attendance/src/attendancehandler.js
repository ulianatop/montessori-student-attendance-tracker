let verifiedStudent = null;

export async function findStudent() { // Ian L added export keyword to enable import into AttendanceTracker.jsx
    const pin = document.getElementById("login_id").value.trim();
    const first = document.getElementById("student_firstname").value.trim();
    const last = document.getElementById("student_lastname").value.trim();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Check if all parts exist
    if (!pin || !first || !last) {
        resultDiv.textContent = "Please enter PIN, first name and last name.";
        return;
    }

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

    resultDiv.appendChild(statusText);
    resultDiv.appendChild(btn);
}