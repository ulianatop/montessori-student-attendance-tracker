// Student router module for sending data to a student controller, only routes data
import { Router } from "express";
import { request, response } from "express";
import StudentController from "./studentController.mjs";
import Database from "../../../database.mjs";

// kinda overkill but router for the bridge table
export default class StudentAuthAdultRouter{
    constructor(db){
        this.db = db;
        this.router = Router();
        this.controller = new StudentAuthAdultRouter(this.db);
    }

    // GET routes
    // POST routes
    async registerPostRoutes(){
        this.router.post("api/v1/verify", this.controller.verifyPin);
    }
    // UPDATE routes
    // DELETE routes
    // PATCH routes
}
