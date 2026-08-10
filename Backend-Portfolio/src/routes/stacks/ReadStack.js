import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import { configDotenv } from "dotenv";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

router.get("/", async (req , res) => {

    try {

        const [rows] = await pool.execute(
            `Select * from stack`
        );

        res.status(200);
        res.json(rows);

    } catch (error) {

        res.status(500);
        res.json({ message : error.message });

    }

});

export default router; 