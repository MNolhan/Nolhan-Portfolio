import express from "express";
import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT COUNT(id) AS NumberOfStack FROM stack;`
        );

        res.status(201);
        res.json({ count: rows[0].NumberOfStack });

    } catch (error) {

        res.status(500);
        res.json({ message : "ERROR" });
        console.error("Error retrieving stack count:", error);

    }

});

export default router;