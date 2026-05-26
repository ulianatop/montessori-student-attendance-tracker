// Student router module for sending data to a student controller, only routes data
import { Router } from "express";
import { request, response } from "express";
import StudentController from "./studentController.mjs";
import Database from "../../../database/database.mjs";

export default class StudentRouter{
    constructor(){
        this.db = null;
        this.router = null;
        this.controller = null;

        //private helper for route registration on init
        this._registerAllRoutes = () => {
            this._registerGetRoutes();
            this._registerPostRoutes();
            this._registerUpdateRoutes();
            
        }
    }

    getInstance(db){
            if(this.router){
                console.log("No more than one instance");
                return;
            }
    
    
            this.db = db;
            this.router = new Router();
            this.controller = new StudentController(this.db);
    
            this._registerAllRoutes();
            
            return this.router;
        }

    // GET routes
    async _registerGetRoutes(){
        
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
    async _registerPostRoutes(){
        this.router.post(
            "/api/v1/students",
            this.controller.createStudent
        )
    }
    // UPDATE routes
    async _registerUpdateRoutes(){
        this.router.patch(
            "/api/v1/students/:studentId/attendance",
            this.controller.updateStudentAttendance
        )
    }
    // DELETE routes
}
