// students controller module for handling express request and response objects, logic for students
import { request, response } from "express";
import Database from "../../../database/database.mjs";
export default class StudentAuthAdultController {

    constructor(db) {
        this.db = db;
    }

    // GET:
    // POST:
    verifyPin = async (req, res, next) => {
        const {pin, firstName, lastName } = req.body;

        // Sanitize pin from Jacob
        const safePin = String(pin || "").trim();

        if(!safePin){
            res.status(400).json({
                success: false,
                message: "Missing PIN"
            })
            next();
        }

        // todo: rewrite the sql join logic,

        try {
            const adult = await this.db.readAuthAdultFromPin(safePin);
            console.log(adult);
            const adultId = adult.AdultID;

            const associations = await this.db.readStudentsAuthFromAdult(adultId);
            console.log(associations);

        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: "Invalid PIN or no matching student"
            })
            next();
        }


    }
    // UPDATE:
}