let verifiedStudent = null;

async function findStudent() {
    const pin = document.getElementById("login_id").value.trim();
    const first = document.getElementById("student_firstname").value.trim();
    const last = document.getElementById("student_lastname").value.trim();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Check if all parts exist
    if (!pin || !first || !last) {
        resultDiv.textContent = "Please enter PIN, first name, and last name.";
        return;
    }

    // Verify pin + student
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

    // Commented this out because it uses old sql and we don't really need this part because /verify-pin already checks the name and pin
    // Match name
    // const fullName = `${first} ${last}`.toLowerCase();

    // if (data.student.StudentName.toLowerCase() !== fullName) {
    //     resultDiv.textContent = "Invalid Student Name.";
    //     return;
    // }

    verifiedStudent = data.student;

    // Create full student name
    const studentFullName =
        `${verifiedStudent.StudentFirstName} ${verifiedStudent.StudentLastName}`;

    // Show Info
    const statusText = document.createElement("p");
    statusText.textContent =
        `${studentFullName} - ${verifiedStudent.AttendanceStatus}`;

    // Make button
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