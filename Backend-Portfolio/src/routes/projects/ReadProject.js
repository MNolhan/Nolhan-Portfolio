import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import { configDotenv } from "dotenv";

configDotenv();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.get("/", async (req , res) => {

    try {

        const [rows] = await pool.execute(
            `Select * from projects`
        );

        res.status(200);
        res.json(rows);

    } catch (error) {

        res.status(500);
        res.json({ message : error.message });

    }

});

export default router; 