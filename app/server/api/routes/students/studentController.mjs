// students controller module for handling express request and response objects, logic for students
import { request, response } from "express";
import Database from "../../../database.mjs";
export default class StudentController {

    constructor(db) {
        this.db = db;
    }

    // GET
    async getStudents(req, res, next) {
        const students = await this.db.getStudents();
        res.status(200)
        .json(students);
        next();
    }

    async getStudentById(req, res, next) {
        const studentId = req.params["studentId"];
        const student = await this.db.getStudentById(studentId);
        res.status(200).json(student);
        next();
    }

    // POST
    async createStudent(req, res, next) {
        const { StudentFirstName, StudentLastName, AttendanceStatus } = req.body;
        const insertId = await this.db.createStudent(StudentFirstName, StudentLastName, AttendanceStatus);
        res.status(200)
        .json({
            message: success,
            studentId: insertId
        })
        next();
    }

    // toggle attendance from Jacob
    async updateStudentAttendance(req, res, next){
        const {StudentID, AttendanceStatus} = req.body;
        const newStatus = AttendanceStatus === "Checked In" ? "Checked Out" : "Checked In";

        await this.db.updateStudentAttendance(StudentID, newStatus);
        res.status(200).json({
            message: success,
            newAttendanceStatus: newStatus
        })
        next();
    }
}