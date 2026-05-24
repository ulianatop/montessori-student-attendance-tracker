// students controller module for handling express request and response objects, logic for students
import { request, response } from "express";
import Database from "../../../database.mjs";
export default class StudentController {

    constructor(db) {
        this.db = db;
    }

    async getStudents(req, res, next) {
        const students = await this.db.getStudents();
        res.json(students);
        next();
    }

    async getStudentById(req, res, next) {
        const studentId = req.params["studentId"];
        const student = await this.db.getStudentById(studentId);
        res.json(student);
        next();
    }

    async createStudent(req, res, next) {
        const { StudentFirstName, StudentLastName, AttendanceStatus } = req.body;
        const insertId = await this.db.createStudent(StudentFirstName, StudentLastName, AttendanceStatus);
        res.status(200).json({
            studentId: insertId
        })
        next();
    }
}