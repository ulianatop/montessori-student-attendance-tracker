// Student router module for sending data to a student controller, only routes data
import { Router } from "express";
import { request, response } from "express";
import StudentController from "./studentController.mjs";
import Database from "../../../database.mjs";

export default class StudentRouter{
    constructor(db){
        this.db = db;
        this.router = Router();
        this.controller = new StudentController(this.db);
    }

    // GET routes
    async registerGetRoutes(){
        
        this.router.get(
            // all students
            '/api/v1/students', 
            this.controller.getStudents
        );

        this.router.get(
            // single student
            '/api/v1/students/:studentId',
            this.controller.getStudentById
        )
        
    }

    // POST routes
    async registerPostRoutes(){
        this.router.post(
            "/api/v1/students",
            this.controller.createStudent
        )
    }
    // PUT routes
    // DELETE routes
    // PATCH routes
}
