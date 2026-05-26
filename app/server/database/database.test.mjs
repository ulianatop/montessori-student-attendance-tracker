import { describe, it, expect, beforeEach, vi, afterEach, expectTypeOf, beforeAll, afterAll } from "vitest";
import dbConfig from "./testDbConfig.mjs"
import Database from "./database.mjs";
import mysql, { Types } from "mysql2/promise"

// TODO : improve logic + error
describe('Database', async () => {

    this.db = new Database(dbConfig);
    await this.db.connect();
    this.conn = this.db.conn;


    

    const startTransact = async () => {
        await this.conn.beginTransaction();
    } 

    const rollback = async () => {
        await this.conn.rollback();
    }
    
    // Reload a fresh database, mainly for reseting the auto_increment IDs
    afterAll(async () => {
        await this.db._resetDb();
    })

    describe("STUDENT", async () => {
        beforeEach(startTransact);
        afterEach(rollback);



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

    describe("AUTHORIZED_ADULT", async () => {
        beforeEach(startTransact);
        afterEach(rollback);

        it('Creates an authorized adult', async () => {
            const newAdultId = await this.db.createAuthAdult("Name", "Nameson", 7676);
        });

        it('Reads all auth adults', async () => {
            const adults = await this.db.readAuthAdults();
            expect(adults).toEqual([
                {
                    "Active": 1,
                    "AdultCode": "0951",
                    "AdultFirstName": "Kayla",
                    "AdultID": 1,
                    "AdultLastName": "Mathieu",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "1234",
                    "AdultFirstName": "Margo",
                    "AdultID": 2,
                    "AdultLastName": "Vachon",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "9831",
                    "AdultFirstName": "Pat",
                    "AdultID": 3,
                    "AdultLastName": "Mann",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "3872",
                    "AdultFirstName": "Colin",
                    "AdultID": 4,
                    "AdultLastName": "McCann",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "4712",
                    "AdultFirstName": "Tatiana",
                    "AdultID": 5,
                    "AdultLastName": "Lims",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "8716",
                    "AdultFirstName": "Daryl",
                    "AdultID": 6,
                    "AdultLastName": "Bernard",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "4905",
                    "AdultFirstName": "Randy",
                    "AdultID": 7,
                    "AdultLastName": "Gagnon",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "2708",
                    "AdultFirstName": "Clement",
                    "AdultID": 8,
                    "AdultLastName": "Legault",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "5902",
                    "AdultFirstName": "Guy",
                    "AdultID": 9,
                    "AdultLastName": "Trudeau",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "5087",
                    "AdultFirstName": "Barb",
                    "AdultID": 10,
                    "AdultLastName": "Burton",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "2395",
                    "AdultFirstName": "Julien",
                    "AdultID": 11,
                    "AdultLastName": "Proulx",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "3690",
                    "AdultFirstName": "June",
                    "AdultID": 12,
                    "AdultLastName": "Allard",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "5064",
                    "AdultFirstName": "Rhonda",
                    "AdultID": 13,
                    "AdultLastName": "Hall",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "6810",
                    "AdultFirstName": "Steeve",
                    "AdultID": 14,
                    "AdultLastName": "Hoffman",
                    "DateAdded": expect.any(Date),
                },
                {
                    "Active": 1,
                    "AdultCode": "6432",
                    "AdultFirstName": "Karine",
                    "AdultID": 15,
                    "AdultLastName": "Mailloux",
                    "DateAdded": expect.any(Date),
                },
            ]);

        });

        it('Reads an auth adult', async () => {
            const adult = await this.db.readAuthAdult(1);
            expect(adult).toEqual({
                AdultID: 1,
                AdultFirstName: 'Kayla',
                AdultLastName: 'Mathieu',
                AdultCode: '0951',
                Active: 1,
                DateAdded: expect.any(Date)
            })
        });


        it('Updates a pin', async () => {
            const adultBefore = await this.db.readAuthAdult(1);
            expect(adultBefore).toEqual({
                AdultID: 1,
                AdultFirstName: 'Kayla',
                AdultLastName: 'Mathieu',
                AdultCode: '0951',
                Active: 1,
                DateAdded: expect.any(Date)
            })
            const affectedRows = await this.db.updateAuthAdultPin(1, 5590);
            const adultAfter = await this.db.readAuthAdult(1);

            expect(adultAfter).toEqual({
                AdultID: 1,
                AdultFirstName: 'Kayla',
                AdultLastName: 'Mathieu',
                AdultCode: '5590',
                Active: 1,
                DateAdded: expect.any(Date)
            })

            expect(affectedRows).toBe(1);

        });



    });

    describe.todo("STUDENT_AUTHORIZED_ADULT", () => {

    });

    describe.todo("ATTENDANCE_RECORD", () => {
            
    })

    describe.todo("ADMIN", () => {
            
    })

    describe.todo("ADMIN_LOGIN", () => {
            
    })

    describe.todo("ADMIN_ACTION_TRACKING", () => {
            
    })

});
