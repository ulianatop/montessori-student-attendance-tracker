

export async function findStudent(oldDiv) {


    // probably change these styles to css or seperate out into MVC
    const blockDiv = document.createElement("div");
    blockDiv.style = 'block';
    blockDiv.className = 'blockDiv';
    blockDiv.style.display = 'flex';
    blockDiv.style.justifyContent = 'center';
    blockDiv.style.margin = '20px';
    const parentContainer = document.createElement("div");
    blockDiv.appendChild(parentContainer);
    const groupDiv = document.createElement("div");
    groupDiv.className = 'studentGroup';
    parentContainer.appendChild(groupDiv);
    parentContainer.className = "newDiv";

    parentContainer.style.display = 'flex';
    parentContainer.style.flexFlow = 'column';
    parentContainer.style.alignItems = 'center';
    parentContainer.style.border = '1px solid blue'
    parentContainer.style.backdropFilter = 'blur(3px)';

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset"
    resetBtn.onclick = () => {
        blockDiv.replaceWith(oldDiv);
    }
    parentContainer.appendChild(resetBtn);
    const pin = document.getElementById("login_id").value.trim();
    const first = document.getElementById("student_firstname").value.trim();
    const last = document.getElementById("student_lastname").value.trim();

    const resultDiv = document.getElementById("result");
    if (!resultDiv) {
        console.error("Main container #result not found.");
        return;
    }


    if (!pin || !first || !last) {
        result.textContent = "Please enter PIN, first name and last name.";
        result.style.color = "red";
        return oldDiv;
    }

    try {
        // Verify pin and student
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
        // console.log(data);

        if (!data.success) {
            result.textContent = data.message;
            return oldDiv;
        }

        const associationArray = data['studentAuthAdults'];

        associationArray.forEach(async element => {
            const studentId = element.StudentID;
            const studentRes = await fetch(`http://localhost:3000/api/v1/student/${studentId}`, {
                method: "GET"
            });
            const student = await studentRes.json();
            const childContainer = document.createElement("div");
            const statusText = document.createElement("p");
            childContainer.className = 'childContainer';
            childContainer.style.display = 'flex';
            childContainer.style.flexDirection = 'row';
            childContainer.style.padding = '20px';
            childContainer.style.alignItems = 'center';
            

            statusText.textContent = `
        ${student.StudentLastName}, 
        ${student.StudentFirstName}:
        `
            statusText.style.color = 'yellow';
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
                })

                const newAttendance = await attendanceRes.json();

                attendanceBtn.value = newAttendance['newAttendanceStatus'];
            }

            

            // statusText.append(attendanceBtn);
            childContainer.appendChild(statusText);
            childContainer.appendChild(attendanceBtn);
            groupDiv.appendChild(childContainer);



        });
        return blockDiv;
    
    } catch (error) {
        console.error("Error executing database lookup routing loop:", error);
        displayDiv.textContent = "Server communication error.";
    }
}