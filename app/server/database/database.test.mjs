import { describe, it, expect, beforeEach, vi, afterEach, expectTypeOf, beforeAll, afterAll } from "vitest";
import dbConfig from "./testDbConfig.mjs"
import Database from "./database.mjs";
import mysql, { Types } from "mysql2/promise"

describe('Database', async () => {
    this.db = null;
    this.conn = null;

    // CREATE TABLE STUDENT (
    //     StudentID INT AUTO_INCREMENT PRIMARY KEY,
    //     StudentFirstName VARCHAR(50) NOT NULL,
    //     StudentLastName VARCHAR(50) NOT NULL,
    //     AttendanceStatus VARCHAR(20) NOT NULL,
    //     Active BOOLEAN NOT NULL DEFAULT TRUE,
    //     DateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    // );
    // this.fakeStudents = {

    // }

    describe("Students", () => {
        beforeEach(async () => {
            this.db = new Database(dbConfig);
            await this.db.connect();
            this.conn = this.db.conn;
        })



        it('Creates a student', () => {

        });

        it('Reads all students', async () => {
            let students = await this.db.readStudents();
            // prob re write into a better logic check
            expect(students).toHaveLength(15);
        });

        it('Reads one student', async () => {
            const JodiAcutal = await this.db.readStudent(1);
            expect(JodiAcutal).toEqual({
                StudentID: 1,
                StudentFirstName: 'Jodi',
                StudentLastName: 'Plouffe',
                AttendanceStatus: 'Checked Out',
                Active: 1,
                DateAdded: expect.any(Date)
            })
        });

        it('Updates a students attendance status', async () => {
            
        });

        it("Updates a student's name", async () => {
            const JodiBefore = await this.db.readStudent(1);
            await this.db.updateStudentName(1, "Johnny", "Johnson");
            const JodiAfter = await this.db.readStudent(1);
            expect(JodiAfter).toEqual({
                StudentID: 1,
                StudentFirstName: 'Johnny',
                StudentLastName: 'Johnson',
                AttendanceStatus: 'Checked Out',
                Active: 1,
                DateAdded: expect.any(Date)
            })
        });

    });

    describe.todo("Authorized Adults", () => {

    });

    describe.todo("", () => {

    });

});
