import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import { configDotenv } from 'dotenv';

configDotenv();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const projectSchema = z.object({
    name: z.string().min(1),
});

router.delete("/",  async (req, res) => {

    const data = req.body;
    let name ;

    try {
        ({name} = projectSchema.parse(req.body));
    } catch (error) {
        res.status(400);
        res.json({ message: "Données invalides" });
        return;
    }

    try {

        const [rows] = await pool.query(
            `SELECT * FROM projects WHERE name = ?`, name
        );

        if (empty(rows)){
            res.status(400);
            res.json("Il n'existe pas de projet comportant ce nom");
            return;
        }

        await pool.query(
        `DELETE FROM projects WHERE name = ?`, name
        );

    res.status(201);
    res.json({ message : "Projet '" + data.name + "' Supprimé avec succès"});

    } catch (error) {
        res.status(500);
        res.json({ message : error.message });
    }
});

export default router;