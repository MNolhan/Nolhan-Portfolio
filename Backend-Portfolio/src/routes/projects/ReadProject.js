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
            `Select * from projects`
        );

        res.status(200);
        res.json(rows);

    } catch (error) {

        res.status(500);
        res.json({ message : error.message });

    }

});

const idSchema = z.object({
    id : z.number().int().positive()
});

router.get("/:id", async (req , res) => {

    const { id } = req.params;

    try {

        const parsedId = idSchema.parse({ id });

        const [rows] = await pool.execute(
            `Select * from projects where id = ?`, [parsedId.id]
        );

        if (rows.length === 0) {
            res.status(404);
            res.json({ message: "Project not found" });
            return;
        }

        res.status(200);
        res.json(rows[0]);

    } catch (error) {
        res.status(400);
        res.json({ message: error.message });
    }
});



export default router;