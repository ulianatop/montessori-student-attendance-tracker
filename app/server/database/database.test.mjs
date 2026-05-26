import { describe, it, expect, beforeEach, vi, afterEach, expectTypeOf, beforeAll, afterAll } from "vitest";
import dbConfig from "./testDbConfig.mjs"
import Database from "./database.mjs";
import mysql, { Types } from "mysql2/promise"

// TODO : improve logic + error
describe('Database', async () => {
    this.db = null;
    this.conn = null;

    describe("STUDENT", () => {
        beforeEach(async () => {
            this.db = new Database(dbConfig);
            await this.db.connect();
            await this.db._resetDb();


            this.conn = this.db.conn;
        })



        it('Creates a student', async () => {
            const johnnyId = await this.db.createStudent("Johnny", "JohnnyMan", "Checked Out");

            const students = await this.db.readStudents();
            expect(students).toHaveLength(16);

            const johnnyObj = await this.db.readStudent(16);
            expect(johnnyObj).toEqual({
                StudentID: 16,
                StudentFirstName: 'Johnny',
                StudentLastName: 'JohnnyMan',
                AttendanceStatus: 'Checked Out',
                Active: 1,
                DateAdded: expect.any(Date)
            })
        });

        it('Reads all students', async () => {
            let students = await this.db.readStudents();
            expect(students).toHaveLength(15);
            expect(students).toEqual([
                {
                    StudentID: 1,
                    StudentFirstName: 'Jodi',
                    StudentLastName: 'Plouffe',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 2,
                    StudentFirstName: 'Danielle',
                    StudentLastName: 'Brassard',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 3,
                    StudentFirstName: 'Herbert',
                    StudentLastName: 'Barrett',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 4,
                    StudentFirstName: 'Denis',
                    StudentLastName: 'Gill',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 5,
                    StudentFirstName: 'Glenn',
                    StudentLastName: 'Mercier',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 6,
                    StudentFirstName: 'Pauline',
                    StudentLastName: 'Caron',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 7,
                    StudentFirstName: 'Nikki',
                    StudentLastName: 'McConnell',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 8,
                    StudentFirstName: 'Fran',
                    StudentLastName: 'Guay',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 9,
                    StudentFirstName: 'Bryan',
                    StudentLastName: 'Drolet',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 10,
                    StudentFirstName: 'Ivan',
                    StudentLastName: 'Robinson',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 11,
                    StudentFirstName: 'Pamela',
                    StudentLastName: 'Becker',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 12,
                    StudentFirstName: 'Marilyn',
                    StudentLastName: 'Nicholson',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 13,
                    StudentFirstName: 'Deborah',
                    StudentLastName: 'Santos',
                    AttendanceStatus: 'Checked Out',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 14,
                    StudentFirstName: 'Leanne',
                    StudentLastName: 'Huang',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                },
                {
                    StudentID: 15,
                    StudentFirstName: 'Beatrice',
                    StudentLastName: 'Jiang',
                    AttendanceStatus: 'Checked In',
                    Active: 1,
                    DateAdded: expect.any(Date)
                }
            ])
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
            const JodiBefore = await this.db.readStudent(1);
            await this.db.updateStudentAttendance(1, "Checked In");
            const JodiAfter = await this.db.readStudent(1);

            expect(JodiAfter).toEqual({
                StudentID: 1,
                StudentFirstName: 'Jodi',
                StudentLastName: 'Plouffe',
                AttendanceStatus: 'Checked In',
                Active: 1,
                DateAdded: expect.any(Date)
            })
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

        it.todo("Deletes a student", async () => {
                await this.db.deleteStudent(1);
        })

    });

    describe.todo("AUTHORIZED_ADULT", async () => {
        it('Creates an authorized adult', () => {
            
        });
        
        it('Reads all auth adults', () => {
            
        });

        it.todo('Reads a pin', () => {
            
        });
        

        it.todo('Updates a pin', () => {
            
        });
        
        

    });

    describe.todo("STUDENT_AUTHORIZED_ADULT", () => {

    });

});
