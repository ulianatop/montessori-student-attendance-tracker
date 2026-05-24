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

    async registerGetRoutes(){
        // all students
        this.router.get('/api/v1/student/', this.controller.getStudents);
    }
}
