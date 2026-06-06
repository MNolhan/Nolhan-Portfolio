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

const projectSchema = z.object({
    name: z.string().min(1),
    type: z.enum(["Développement Web", "Développement Application", "Autres"]).default("Autres"),
    description: z.string().min(1),
    thumbnail: z.string().url().optional(),
    github_url: z.string().url().optional(),
    live_url: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    status: z.enum(["En cours", "Terminé", "Archivé"]).default("Terminé"),
    featured: z.boolean().default(false),
});

router.post("/", async (req, res) => {
    let name, type, description, thumbnail, github_url, live_url, technologies, status, featured;

    try {
        ({ name, type, description, thumbnail, github_url, live_url, technologies, status, featured } = projectSchema.parse(req.body));
    } catch (error) {
        return res.status(400).json({ 
            message: "Données invalides", 
            errors: error.flatten().fieldErrors 
        });
    }

    try {
        const [result] = await pool.execute(
            `INSERT INTO projects (name, type, description, thumbnail, github_url, live_url, technologies, status, featured)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                type,
                description,
                thumbnail,
                github_url,
                live_url ?? null,
                technologies,
                status,
                featured,
            ]
        );

        return res.status(201).json({ 
            message: "Projet créé avec succès", 
            id: result.insertId 
        });

    } catch (error) {
        res.status(500)
        res.json({ message : error.message })
    }
});

export default router;