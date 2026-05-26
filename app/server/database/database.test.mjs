import { describe, it, expect, beforeEach, vi, afterEach, expectTypeOf } from "vitest";
import dbConfig from "./dbConfig.mjs";
import Database from "./database.mjs";
import mysql, { Types } from "mysql2/promise"

describe('Database', () => {
    this.db = null;
    this.conn = null;

    beforeEach(() => {
        console.log("Setting up db tests");
        this.db = new Database(dbConfig);
    })

    describe('Configuration', () => {
        it('Creates a database pool', () => {
            expectTypeOf(this.db).toMatchObjectType(mysql.Pool);
        });

        it('Connects to the pool', async () => {
            await this.db.connect();
            
            expectTypeOf(this.conn).toMatchObjectType(mysql.PoolConnection);
        });
        


    });

    describe('CRUD operation', () => {
        describe.todo("Students", () => {
        
        });

        describe.todo("Authorized Adults", () => {
        
        });

        describe.todo("", () => {
        
        });



    });


    afterEach(async () => {
        console.log("Tearing down db tests");
        await this.db.disconnect();
    })
});
