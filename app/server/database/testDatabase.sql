/* 
Database starter for Montessori Student Attendance Tracker.
It creates the current tables and adds sample data.
*/CREATE DATABASE IF NOT EXISTS montessori_attendance_test;
USE montessori_attendance_test;



DROP TABLE IF EXISTS ADMIN_ACTION_TRACKING;
DROP TABLE IF EXISTS ADMIN_LOGIN;
DROP TABLE IF EXISTS ATTENDANCE_RECORD;
DROP TABLE IF EXISTS STUDENT_AUTHORIZED_ADULT;
DROP TABLE IF EXISTS AUTHORIZED_ADULT;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS ADMIN;

CREATE TABLE STUDENT (
    StudentID INT AUTO_INCREMENT PRIMARY KEY,
    StudentFirstName VARCHAR(50) NOT NULL,
    StudentLastName VARCHAR(50) NOT NULL,
    AttendanceStatus VARCHAR(20) NOT NULL,
    Active BOOLEAN NOT NULL DEFAULT TRUE,
    DateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AUTHORIZED_ADULT (
    AdultID INT AUTO_INCREMENT PRIMARY KEY,
    AdultFirstName VARCHAR(50) NOT NULL,
    AdultLastName VARCHAR(50) NOT NULL,
    AdultCode VARCHAR(4) NOT NULL UNIQUE,
    Active BOOLEAN NOT NULL DEFAULT TRUE,
    DateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE STUDENT_AUTHORIZED_ADULT (
    StudentID INT NOT NULL,
    AdultID INT NOT NULL,
    Active BOOLEAN NOT NULL DEFAULT TRUE,
    DateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (StudentID, AdultID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (AdultID) REFERENCES AUTHORIZED_ADULT(AdultID)
);

CREATE TABLE ATTENDANCE_RECORD (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    AdultID INT NOT NULL,
    CheckIn DATETIME,
    CheckOut DATETIME,
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (AdultID) REFERENCES AUTHORIZED_ADULT(AdultID)
);

CREATE TABLE ADMIN (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    AdminFirstName VARCHAR(50) NOT NULL,
    AdminLastName VARCHAR(50) NOT NULL,
    Active BOOLEAN NOT NULL DEFAULT TRUE,
    DateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ADMIN_LOGIN (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FOREIGN KEY (AdminID) REFERENCES ADMIN(AdminID)
);

CREATE TABLE ADMIN_ACTION_TRACKING (
    ActionID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT NOT NULL,
    ActionType VARCHAR(50) NOT NULL,
    TableChanged VARCHAR(50) NOT NULL,
    RecordChangedID INT,
    ActionDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AdminID) REFERENCES ADMIN(AdminID)
);

INSERT INTO STUDENT (StudentFirstName, StudentLastName, AttendanceStatus) VALUES
    ('Jodi', 'Plouffe', 'Checked Out'),
    ('Danielle', 'Brassard', 'Checked In'),
    ('Herbert', 'Barrett', 'Checked Out'),
    ('Denis', 'Gill', 'Checked In'),
    ('Glenn', 'Mercier', 'Checked Out'),
    ('Pauline', 'Caron', 'Checked In'),
    ('Nikki', 'McConnell', 'Checked In'),
    ('Fran', 'Guay', 'Checked Out'),
    ('Bryan', 'Drolet', 'Checked Out'),
    ('Ivan', 'Robinson', 'Checked In'),
    ('Pamela', 'Becker', 'Checked Out'),
    ('Marilyn', 'Nicholson', 'Checked In'),
    ('Deborah', 'Santos', 'Checked Out'),
    ('Leanne', 'Huang', 'Checked In'),
    ('Beatrice', 'Jiang', 'Checked In');

INSERT INTO AUTHORIZED_ADULT (AdultFirstName, AdultLastName, AdultCode) VALUES
    ('Kayla', 'Mathieu', '0951'),
    ('Margo', 'Vachon', '1234'),
    ('Pat', 'Mann', '9831'),
    ('Colin', 'McCann', '3872'),
    ('Tatiana', 'Lims', '4712'),
    ('Daryl', 'Bernard', '8716'),
    ('Randy', 'Gagnon', '4905'),
    ('Clement', 'Legault', '2708'),
    ('Guy', 'Trudeau', '5902'),
    ('Barb', 'Burton', '5087'),
    ('Julien', 'Proulx', '2395'),
    ('June', 'Allard', '3690'),
    ('Rhonda', 'Hall', '5064'),
    ('Steeve', 'Hoffman', '6810'),
    ('Karine', 'Mailloux', '6432');

-- Connect students to authorized adults
INSERT INTO STUDENT_AUTHORIZED_ADULT (StudentID, AdultID) VALUES
    -- Two students (siblings) connected to two adults 
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),

    -- One student connected to one adult
    (3, 3),
    (4, 4),
    (5, 5),

    -- One student connected to two adults 
    (6, 6),
    (6, 7),

    -- Two students connected to one adult
    (7, 8),
    (8, 8),

    -- One student connected to two adults
    (9, 9),
    (9, 10),

    -- Two students connected to one adult
    (10, 11),
    (11, 11),

    -- Two students connected to two adults
    (12, 12),
    (12, 13),
    (13, 12),
    (13, 13),

    -- One student connected to one adult
    (14, 14),
    (15, 15);
    
INSERT INTO ADMIN (AdminFirstName, AdminLastName) VALUES
    ('Shannon', 'Hull'),
    ('Judy', 'Steward'),
    ('Lorenzo', 'Fischer'),
    ('Grace', 'Goldstein'),
    ('Shane', 'Conley');

-- Password hashes below are placeholders. Later, we should replace them with actual bcrypt hashes 
INSERT INTO ADMIN_LOGIN (AdminID, Username, PasswordHash) VALUES
    (1, 'shannon.hull', 'hashed_password_1'),
    (2, 'judy.steward', 'hashed_password_2'),
    (3, 'lorenzo.fischer', 'hashed_password_3'),
    (4, 'grace.goldstein', 'hashed_password_4'),
    (5, 'shane.conley', 'hashed_password_5');
    
INSERT INTO ADMIN_ACTION_TRACKING (AdminID, ActionType, TableChanged, RecordChangedID) VALUES
    (1, 'Add Student', 'STUDENT', 1),
    (2, 'Update Student', 'STUDENT', 2),
    (3, 'Deactivate Student', 'STUDENT', 3),
    (4, 'Add Adult', 'AUTHORIZED_ADULT', 1),
    (5, 'Update Adult', 'AUTHORIZED_ADULT', 2),
    (1, 'Deactivate Adult', 'AUTHORIZED_ADULT', 3),
    (2, 'Run Report', 'ATTENDANCE_RECORD', NULL);