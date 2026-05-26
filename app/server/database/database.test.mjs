import {describe, it, expect, beforeEach, vi, afterEach, expectTypeOf} from "vitest";
import dbConfig from "./dbConfig.mjs";
import Database from "./database.mjs";
import mysql from "mysql2/promise"

describe('Database', () => {
    let db = null;

    beforeEach(() => {
        console.log("Setting up db tests");
        this.db = new Database(dbConfig);
    })

    describe('Configuration', () => {
        it('creates a database pool', () => {
            expectTypeOf(this.db).toMatchObjectType(mysql.Pool);
        });
        
        
        
    });

    describe('CRUD operation', () => {
        
    });
    
    

    afterEach(() => {
        console.log("Tearing down db tests")
    })
});
