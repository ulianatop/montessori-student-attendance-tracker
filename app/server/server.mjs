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


app.post("/admin-pass", (req, res) => {
    const { adminName, adminPassword } = req.body;
    if (!adminName || adminName.trim() === "") {
        return res.status(400).send("Missing Username"); 
    }
    if (!adminPassword || adminPassword.trim() === "") {
        return res.status(400).send("Missing Password");
    }
    if (adminName === "admin" && adminPassword === "passw0rd") {
        return res.status(200).send("Login successful!");
    } else {
        return res.status(401).send("Invalid credentials");
    }
});

app.post("/:adminTask", (req, res) => {
    const task = req.params.adminTask;
     
    switch (req.params.adminTask) {
        case "addStudent":
            return res.json({message: "TEST SUCCESS"});
            break;
        case "createUser":
            return res.json({message: "USER CREATED SUCCESSFULLY"});
            break;
		case "checkInOut":
		const htmlPayload = `
                <label for="login_id">Login PIN:&nbsp;&nbsp;</label>
                <input type="text" id="login_id" />
                <br />

                <p>Student's Name:</p>

                <label for="student_firstname">First:</label>
                <input type="text" id="student_firstname" />
                <br />

                <label for="student_lastname">Last:</label>
                <input type="text" id="student_lastname" />
                <br />
                
                <div class="buttons">
                    <input type="button" value="Find Student" id="btn-find-student" />
                </div>
            `;
		
		res.setHeader('Content-Type', 'application/json');
		return res.status(200).json({ 
        success: true,
        html: htmlPayload 
		});
        // TODO: other tasks below
        default:
            return res.status(404).json({message: `Task ${task} handler not found on server!`})
            break;
    }
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});