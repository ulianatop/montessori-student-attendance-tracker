let verifiedStudent = null;

export async function findStudent() { // Ian L added export keyword to enable import into AttendanceTracker.jsx
    const pin = document.getElementById("login_id").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const res = await fetch("http://localhost:3000/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
    });

    const data = await res.json();

    if (!data.success) {
        resultDiv.textContent = "Invalid PIN.";
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