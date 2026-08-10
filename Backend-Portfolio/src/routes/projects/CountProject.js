import express from "express";
import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT COUNT(id) AS NumberOfProjects FROM projects;`
        );

        res.status(201);
        res.json({ count: rows[0].NumberOfProjects });

    } catch (error) {

        res.status(500);
        res.json({ message : "ERROR" });

    }

});

export default router;