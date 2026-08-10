import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import { configDotenv } from 'dotenv';
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

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

        if (rows.length === 0) {
            res.status(404)
            res.json({ message: "Projet '" + name + "' introuvable" });
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