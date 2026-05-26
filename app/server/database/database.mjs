// Database class, performs only database Create Read Update Delete (CRUD) operations with a connection pool
// https://sidorares.github.io/node-mysql2/docs#using-connection-pools

// TODO: on Student, and Auth_Adult delete cascade in the database SQL? I think deleting from student or adult should cascade the deletion
// TODO: ATTENDANCE_RECORD, ADMIN, ADMIN_LOGIN, ADMIN_ACTION_TRACKING CRUD operations
// TODO: Unit tests
// TODO? .env 
import mysql from "mysql2/promise";
export default class Database {

    constructor(dbConfig) {
        try {
            this.db = mysql.createPool(dbConfig);
        } catch (error) {
            `Error with the database config: ${error}`;
        }
    }

    async connect() {
        try {
            console.log("Connecting to database...");

            if (!this.db) {
                throw new Error("Db connection obj undefined or null");
            }

            if (this.db.state === "connected") {
                throw new Error("Database connection already established!");
            }


            this.conn = await this.db.getConnection();
            console.log("Connected to database!");
        } catch (error) {
            console.log(`Error connecting to database: ${error}`);
        }
    }

    async disconnect() {
        try {
            if (!this.db) {
                throw new Error("Databse connection obj not defined");
            }

            await this.conn.end();
            console.log("Disconnected from database!");
        } catch (error) {
            console.log(`Error disconnecting from database: ${error}`);
        }
    }



    // Student db CRUD ops 
    async createStudent(firstName, lastName, attenandceStatus) {

        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("INSERT INTO STUDENT \
                (StudentFistName, StudentLastName, AttendanceStatus) \
                VALUES (?,?,?,?,?)", [firstName, lastName, attenandceStatus]);
            if (row.affectedRows !== 1) {
                throw new Error("No student inserted, check parameters?");
            }
            return row.insertId;
        } catch (error) {
            console.log(`Error creating student: ${error}`);
        }
    }


    async readStudents() {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [rows, results] = await this.conn.execute("SELECT * FROM STUDENT");
            return rows;
        } catch (error) {
            console.log(`Error getting all students: ${error}`);
        }
    }

    async readStudent(id) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("SELECT * FROM STUDENT WHERE StudentID = ?", [id]);
            if (!row[0]) {
                throw new Error(`No student with id:${id} found!`);
            }
            return row;
        } catch (error) {
            console.log(`Error getting student: ${error}`);
        }
    }

    async updateStudentAttendance(id, attenandceStatus) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("UPDATE STUDENT SET AttendanceStatus = ? WHERE StudentID = ?", [attenandceStatus, id]);
            if (row.changedRows !== 1) {
                throw new Error("student attendance field unchanged");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error updating Student's attendance status: ${error}`);
        }
    }

    async updateStudentName(id, firstName, lastName) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("UPDATE STUDENT SET FirstName = ?, LastName = ? WHERE StudentId = ?", [firstName, lastName, id]);
            if (row.changedRows !== 1) {
                throw new Error("student name field unchanged");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error updating attendance status: ${error}`);
        }
    }

    async deleteStudent(id) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, resut] = await this.conn.execute("DELETE STUDENT WHERE StudentId = ?", [id]);
            if (row.affectedRows !== 1) {
                throw new Error("Student not deleted");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error deleting student: ${error}`);
        }
    }

    // Authorized adult CRUD ops:
    async createAuthAdult(id, firstName, lastName, pin) {

        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute(
                "INSERT INTO AUTHORIZED_ADULT \
                (AdultFirstName, AdultLastName, AdultCode, Active, dateAdded) \
                VALUES (?,?,?,?)", [id, firstName, lastName, pin]);
            if (row.affectedRows !== 1) {
                throw new Error("No student inserted, check parameters?");
            }
            return row.insertId;
        } catch (error) {
            console.log(`Error creating student: ${error}`);
        }
    }


    async readAuthAdults() {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [rows, results] = await this.conn.execute("SELECT * FROM AUTHORIZED_ADULT");
            return rows;
        } catch (error) {
            console.log(`Error getting all Authorized Adults: ${error}`);
        }
    }

    async readAuthAdult(id) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("SELECT * FROM AUTHORIZED_ADULT WHERE AdultID = ?", [id]);
            if (!row[0]) {
                throw new Error(`No Authorized Adult with id:${id} found!`);
            }
            return row;
        } catch (error) {
            console.log(`Error getting Authorized Adult: ${error}`);
        }
    }

    async updateAuthAdultAttendance(id, attenandceStatus) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("UPDATE AUTHORIZED_ADULT SET AttendanceStatus = ? WHERE AdultID = ?", [attenandceStatus, id]);
            if (row.changedRows !== 1) {
                throw new Error("Authorized Adult attendance status unchanged");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error updating Authorized Adult's attendance status: ${error}`);
        }
    }

    async updateAuthAdultName(id, firstName, lastName) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("UPDATE AUTHORIZED_ADULT SET FirstName = ?, LastName = ? WHERE AdultID = ?", [firstName, lastName, id]);
            if (row.affectedRows !== 1) {
                throw new Error("Authorized Adult name unchanged");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error updating Authorized Adult name: ${error}`);
        }
    }

    async deleteAuthAdult(id) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, resut] = await this.conn.execute("DELETE AUTHORIZED_ADULT WHERE AdultID = ?", [id]);
            if (row.affectedRows !== 1) {
                throw new Error("Authorized Adult not deleted");
            }
            return row.affectedRows;
        } catch (error) {
            console.log(`Error deleting Authorized Adult: ${error}`);
        }
    }

    // Bridged Student_Auth_Adult db ops:
    async createStudentAuthAdult(studentId, adultId) {

        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("\
                INSERT INTO STUDENT_AUTHORIZED_ADULT \
                (StudentID, AdultID) \
                VALUES", [studentId, adultId]);
            return row.insertId;
        } catch (error) {
            console.log(`Error creating studentAuthAdult relationship: ${error}`);
        }
    }


    async readStudentAuthAdults() {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [rows, results] = await this.conn.execute("SELECT * FROM STUDENT_AUTHORIZED_ADULT");
            return rows;
        } catch (error) {
            console.log(`Error getting all studentAuthAdult rows: ${error}`);
        }
    }

    async readStudentAuthAdult(studentId, adultId) {
        if (!this.conn) {
            throw new Error("Db not connected!");
        }

        try {
            const [row, results] = await this.conn.execute("SELECT * FROM STUDENT_AUTHORIZED_ADULT WHERE StudentId = ? AND AdultID = ?", [studentId, adultId]);
            if (!row[0]) {
                throw new Error(`No StudentAuthAdult row found`);
            }
            return row;
        } catch (error) {
            console.log(`Error getting studentAuthAdult: ${error}`);
        }
    }

    
    async readStudentAuthFromAdult(adultId){
        if (!this.conn) {
            throw new Error("Db not connected!");
        }
        try {
            const [row, results] = await this.conn.execute("SELECT * FROM STUDENT_AUTHORIZED_ADULT WHERE AdultID = ?", [adultId]);
            if (!row[0]) {
                throw new Error(`No StudentAuthAdult row found`);
            }
            return row;
        } catch (error) {
            console.log(`Error getting studentAuthAdult: ${error}`);
        }
    }

    async readStudentAuthFromStudent(studentId){
         if (!this.conn) {
            throw new Error("Db not connected!");
        }
        try {
            const [row, results] = await this.conn.execute("SELECT * FROM STUDENT_AUTHORIZED_ADULT WHERE StudentID = ?", [studentId]);
            if (!row[0]) {
                throw new Error(`No StudentAuthAdult row found`);
            }
            return row;
        } catch (error) {
            console.log(`Error getting studentAuthAdult: ${error}`);
        }
    }

}