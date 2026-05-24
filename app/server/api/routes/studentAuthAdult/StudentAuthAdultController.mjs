// students controller module for handling express request and response objects, logic for students
import { request, response } from "express";
import Database from "../../../database.mjs";
export default class StudentAuthAdultController {

    constructor(db) {
        this.db = db;
    }

    // GET:
    // POST:
    async verifyPin(req, res, next){
        const {pin, firstName, lastName } = req.body;

        // Sanitize pin from Jacob
        const safePin = String(pin || "").trim();

        if(!safePin){
            res.status(400).json({
                success: false,
                message: "Missing PIN"
            })
        }

        // todo: rewrite the sql join logic,
    }
    // UPDATE:
}