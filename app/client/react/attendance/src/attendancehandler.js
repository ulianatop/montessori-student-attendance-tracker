// attendancehandler.js

export async function findStudent(oldDiv) {
    const pinEl = document.getElementById("login_id");
    const firstEl = document.getElementById("student_firstname");
    const lastEl = document.getElementById("student_lastname");

    if (!pinEl || !firstEl || !lastEl) {
        console.error("Required input fields not found in DOM.");
        return oldDiv;
    }

    const pin = pinEl.value.trim();
    const first = firstEl.value.trim();
    const last = lastEl.value.trim();

    let errorDiv = document.querySelector('#error');
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "error";
        errorDiv.style.marginBottom = "10px";
        pinEl.parentNode.insertBefore(errorDiv, pinEl);
    }

    if (!pin || !first || !last) {
        errorDiv.textContent = "Please enter PIN, first name and last name.";
        errorDiv.style.color = "red";
        return oldDiv;
    }

    errorDiv.textContent = "";

    const blockDiv = document.createElement("div");
    blockDiv.className = 'blockDiv';
    blockDiv.style.display = 'flex';
    blockDiv.style.justifyContent = 'center';
    blockDiv.style.margin = '20px';

    const parentContainer = document.createElement("div");
    parentContainer.className = "newDiv";
    parentContainer.style.display = 'flex';
    parentContainer.style.flexFlow = 'column';
    parentContainer.style.alignItems = 'center';
    parentContainer.style.border = '1px solid blue';
    parentContainer.style.backdropFilter = 'blur(3px)';
    blockDiv.appendChild(parentContainer);

    const groupDiv = document.createElement("div");
    groupDiv.className = 'studentGroup';
    parentContainer.appendChild(groupDiv);

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.type = "button";
    resetBtn.style.marginTop = "15px";
    resetBtn.onclick = () => {
        blockDiv.replaceWith(oldDiv);
    };
    parentContainer.appendChild(resetBtn);

    try {
        const studentAuthAdults = await fetch("http://localhost:3000/api/v1/studentAuthAdult", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pin,
                firstName: first,
                lastName: last
            })
        });

        const data = await studentAuthAdults.json();

        if (!data.success) {
            errorDiv.textContent = data.message || "Authentication failed.";
            errorDiv.style.color = "red";
            return oldDiv;
        }

        const associationArray = data['studentAuthAdults'] || [];

        for (const element of associationArray) {
            const studentId = element.StudentID;
            
            const studentRes = await fetch(`http://localhost:3000/api/v1/student/${studentId}`, {
                method: "GET"
            });
            const student = await studentRes.json();

            const childContainer = document.createElement("div");
            childContainer.className = 'childContainer';
            childContainer.style.display = 'flex';
            childContainer.style.flexDirection = 'row';
            childContainer.style.padding = '20px';
            childContainer.style.alignItems = 'center';

            const statusText = document.createElement("p");
            statusText.textContent = `${student.StudentLastName}, ${student.StudentFirstName}: `;
            statusText.style.color = 'yellow';
            statusText.style.marginRight = '10px';

            const attendanceBtn = document.createElement("input");
            attendanceBtn.type = 'button';
            attendanceBtn.value = student.AttendanceStatus;
            
            attendanceBtn.onclick = async () => {
                const currentStatus = attendanceBtn.value;

                const attendanceRes = await fetch(`http://localhost:3000/api/v1/student/${studentId}/attendance`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        StudentID: student.StudentID,
                        AttendanceStatus: currentStatus
                    })
                });

                const newAttendance = await attendanceRes.json();
                attendanceBtn.value = newAttendance['newAttendanceStatus'];
            };

            childContainer.appendChild(statusText);
            childContainer.appendChild(attendanceBtn);
            groupDiv.appendChild(childContainer);
        }

        if (oldDiv && oldDiv.parentNode) {
            oldDiv.replaceWith(blockDiv);
        }

        return blockDiv;
    
    } catch (error) {
        console.error("Error executing database lookup routing loop:", error);
        errorDiv.textContent = "Server communication error.";
        errorDiv.style.color = "red";
        return oldDiv;
    }
}