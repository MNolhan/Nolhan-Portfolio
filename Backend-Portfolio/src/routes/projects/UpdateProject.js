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
    newName: z.string().min(1).optional(),
    type: z.enum(["Développement Web", "Développement Application", "Autres"]).optional(),
    description: z.string().min(1).optional(),
    thumbnail: z.string().url().optional(),
    github_url: z.string().url().optional(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
});

router.put("/", async (req, res) => {
    let name, newName, type, description, thumbnail, github_url, technologies, featured;

    try {
        ({ name, newName, type, description, thumbnail, github_url, technologies, featured } = projectSchema.parse(req.body));
    } catch (error) {
        return res.status(400).json({
            message: "Données invalides",
            errors: error.flatten().fieldErrors
        });
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM projects WHERE name = ?`, name
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Projet '" + name + "' introuvable" });
        }

        const fields = {
            name: newName,
            type,
            description,
            thumbnail,
            github_url,
            technologies,
            featured,
        };

        const updates = [];
        const values = [];

        for (const [column, value] of Object.entries(fields)) {
            if (value !== undefined) {
                updates.push(`${column} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            res.status(400);
            res.json({ message: "Aucune donnée à mettre à jour" });
            return;
        }

        values.push(name);

        await pool.execute(
            `UPDATE projects SET ${updates.join(", ")} WHERE name = ?`, values
        );

        res.status(200)
        res.json({ message: "Projet '" + name + "' mis à jour avec succès" });
        return;

    } catch (error) {
        res.status(500);
        res.json({ message: error.message });
    }
});

export default router;
