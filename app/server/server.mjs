import express from "express";
import cors from "cors"
import dbConfig from "./database/dbConfig.mjs";
import Database from "./database/database.mjs";
import StudentRouter from "./api/routes/students/studentRouter.mjs";
import StudentController from "./api/routes/students/studentController.mjs";
import StudentAuthAdultRouter from "./api/routes/studentAuthAdult/studentAuthAdultRouter.mjs";


// Connect to SQL
const db = new Database(dbConfig);
await db.connect();


// routes
// console.log(`Database in server: ${console.log(db)}`);
const studentAuthAdultRouter = new StudentAuthAdultRouter().getInstance(db);
const studentRouter = new StudentRouter().getInstance(db);


// console.log(studentAuthAdultRouter['stack'][1]);
// StudentAuthAdultRouter.registerGetRoutes();


const app = express();
app.use(cors());
app.use(express.json());
app.use(studentAuthAdultRouter);
app.use(studentRouter);
// app.use(studentRouter);
// app.use(express.static(path.join(__dirname, "..", "..", "front_end")));



app.use((req, res, next) => {
    // debug logging middleware, move to somewhere else
    console.log(`
            Incoming Request!:
            Method:${req.method}
            URL:${req.url}
            Body:${JSON.stringify(req.body)}
        `)
        next();
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});




// Routes
// TODO: seperate out into its own file or structure(?)
// done
// POST: receive form data
// app.post("/submit", (req, res) => {
//     const { StudentFirstName, StudentLastName, AttendanceStatus } = req.body;

//     db.query(
//         "INSERT INTO STUDENT (StudentFirstName, StudentLastName, AttendanceStatus) VALUES (?, ?, ?)",
//         [StudentFirstName, StudentLastName, AttendanceStatus],
//         (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: err });
//             } else {
//                 res.json({ success: true });
//             }
//         }
//     );
// });

// // GET: fetch data from database
//done
// app.get("/data", (req, res) => {
//     db.query(
//         "SELECT StudentID, StudentFirstName, StudentLastName, AttendanceStatus FROM STUDENT",
//         (err, results) => {
//             if (err) {
//                 res.status(500).json({ error: err });
//             } else {
//                 res.json(results);
//             }
//         }
//     );
// });

// app.post("/toggle-attendance", (req, res) => {
//     const { StudentID, AttendanceStatus } = req.body;

//     if (!StudentID) {
//         return res.status(400).json({ error: "Missing StudentID" });
//     }

//     const newStatus =
//         AttendanceStatus === "Checked In" ? "Checked Out" : "Checked In";

//     db.query(
//         "UPDATE STUDENT SET AttendanceStatus = ? WHERE StudentID = ?",
//         [newStatus, StudentID],
//         (err) => {
//             if (err) return res.status(500).json({ error: err });
//             res.json({ success: true, newStatus });
//         }
//     );
// });

// app.post("/verify-pin", (req, res) => {
//     const { pin, firstName, lastName } = req.body || {};

//     const pinString = String(pin || "").trim();

//     if (!pinString) {
//         return res.status(400).json({ success: false, message: "Missing PIN" });
//     }

//     const conditions = [
//         "aa.AdultCode = ?",
//         "s.Active = TRUE",
//         "aa.Active = TRUE",
//         "saa.Active = TRUE"
//     ];

//     const params = [pinString];

//     if (firstName && lastName) {
//         conditions.push("s.StudentFirstName = ?");
//         conditions.push("s.StudentLastName = ?");
//         params.push(firstName.trim(), lastName.trim());
//     }

//     const sql = `
//         SELECT s.StudentID, s.StudentFirstName, s.StudentLastName, s.AttendanceStatus
//         FROM STUDENT s
//         JOIN STUDENT_AUTHORIZED_ADULT saa ON s.StudentID = saa.StudentID
//         JOIN AUTHORIZED_ADULT aa ON saa.AdultID = aa.AdultID
//         WHERE ${conditions.join(" AND ")}
//     `;

//     db.query(sql, params, (err, results) => {
//         if (err) {
//             console.error("SQL ERROR:", err);
//             return res.status(500).json({ error: err.message });
//         }

//         if (!Array.isArray(results) || results.length === 0) {
//             return res.json({ success: false, message: "Invalid PIN or no matching student" });
//         }

//         res.json({ success: true, student: results[0] });
//     });
// });

// app.post("/:adminTask", (req, res) => {
//     const task = req.params.adminTask;
     
// ROUTES branch
//     switch (req.params.adminTask) {
//         case "addStudent":
//             return res.json({message: "TEST SUCCESS"});
//             break;
//         case "createUser":
//             return res.json({message: "USER CREATED SUCCESSFULLY"});
//             break;
//         // TODO: other tasks below
//         default:
//             return res.status(404).json({message: `Task ${task} handler not found on server!`})
//             break;
//     }
// })
// MAIN IAN branch
//     switch (req.params.adminTask) {
//         case "addStudent":
//             return res.json({message: "TEST SUCCESS"});
//             break;
//         case "createUser":
//             return res.json({message: "USER CREATED SUCCESSFULLY"});
//             break;
// 		case "checkInOut":
// 		const htmlPayload = `
//                 <label for="login_id">Login PIN:&nbsp;&nbsp;</label>
//                 <input type="text" id="login_id" />
//                 <br />

//                 <p>Student's Name:</p>

//                 <label for="student_firstname">First:</label>
//                 <input type="text" id="student_firstname" />
//                 <br />

//                 <label for="student_lastname">Last:</label>
//                 <input type="text" id="student_lastname" />
//                 <br />
                
//                 <div class="buttons">
//                     <input type="button" value="Find Student" id="btn-find-student" />
//                 </div>
//             `;
		
// 		res.setHeader('Content-Type', 'application/json');
// 		return res.status(200).json({ 
//         success: true,
//         html: htmlPayload 
// 		});
//         // TODO: other tasks below
//         default:
//             return res.status(404).json({message: `Task ${task} handler not found on server!`})
//             break;
//     }
// })

