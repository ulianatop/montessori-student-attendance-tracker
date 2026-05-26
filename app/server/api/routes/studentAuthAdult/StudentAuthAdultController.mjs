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


        try {
            let { pin, firstName, lastName } = req.body;
            // Sanitize pin from Jacob
            const safePin = String(pin || "").trim();

            if (!safePin) {
                res.status(400).json({
                    success: false,
                    message: "Missing PIN"
                })
                next();
            }

            
            if (!firstName) {
                res.status(400).json({
                    success: false,
                    message: "Missing first name"
                })
                next();
            }

            
            if (!lastName) {
                res.status(400).json({
                    success: false,
                    message: "Missing last name"
                })
                next();
            }

            const adult = await this.db.readAuthAdultFromPin(safePin);
            console.log(adult);

            if(!adult){
                res.status(400).json({
                success: false,
                message: "Invalid PIN or no matching student"
            })
                next();
            }

            const adultId = adult.AdultID;
            const student = await this.db.readStudentFromName(firstName, lastName);
            const studentId = student.StudentID;
            
            if(!student){
                res.status(400).json({
                success: false,
                message: "Invalid PIN or no matching student"
            })
                next();
            }

            console.log(student);
            

            const studentAuthAdults = await this.db.readStudentsAuthFromAdult(adultId);
            console.log(studentAuthAdults);
            const associatedStudentIDs = studentAuthAdults.map((x) => x['StudentID']);

            console.log(associatedStudentIDs);
            

            if(!associatedStudentIDs.includes(studentId)){
                res.status(400).json({
                success: false,
                message: "Invalid PIN or no matching student"
            })
                next();
            }

            res.status(200).json({
                success: true,
                studentAuthAdults: studentAuthAdults
            })
            
            next();




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