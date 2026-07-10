import express from "express";
import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";

configDotenv();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT COUNT(id) AS NumberOfProjects FROM projects;`
        );

        res.status(201);
        res.json({ count: rows[0].NumberOfProjects });

    } catch (error) {

        res.json(500);
        res.json({ message : "ERROR" });

    }

});

export default router;