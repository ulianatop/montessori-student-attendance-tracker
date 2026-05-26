// Student router module for sending data to a student controller, only routes data
import { Router } from "express";
import { request, response } from "express";
import Database from "../../../database/database.mjs";
import StudentAuthAdultController from "./StudentAuthAdultController.mjs";

// kinda overkill but router for the bridge table
export default class StudentAuthAdultRouter{
    constructor(){
        this.db = null;
        this.router = null;
        this.controller = null;

        //private helper for route registration on init
        this._registerAllRoutes = () => {
            this._registerPostRoutes();
        }
    }

    getInstance(db){
        if(this.router){
            console.log("No more than one instance");
            return;
        }


        this.db = db;
        this.router = new Router();
        this.controller = new StudentAuthAdultController(this.db);

        this._registerAllRoutes();
        
        return this.router;
    }

    // GET routes
    // POST routes
    async _registerPostRoutes(){
        await this.router.post("/api/v1/studentAuthAdult", this.controller.verifyPin);
        await this.router.post("/api/v1/test", async (req, res, next) => {
                res.status(200).json({test: "test"});
        });
    }
    // UPDATE routes
    // DELETE routes
    // PATCH routes

    // singleton
    

    

    
}
