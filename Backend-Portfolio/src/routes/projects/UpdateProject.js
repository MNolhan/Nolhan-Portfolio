import express from "express";
import { z } from "zod";
import pool from '../../infra/db.js';

const router = express.Router();

const idSchema = z.object({
    id : z.number().int().positive()
});

const projectSchema = z.object({
    name: z.string().min(1).optional(),
    type: z.enum(["Développement Web", "Développement Application", "Autres"]).optional(),
    description: z.string().min(1).optional(),
    thumbnail: z.string().url().optional(),
    github_url: z.string().url().optional(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
});

router.put("/:id", async (req, res) => {
    let id;
    let name, type, description, thumbnail, github_url, technologies, featured;

    try {
        ({ id } = idSchema.parse({ id: Number(req.params.id) }));
    } catch (error) {
        res.status(400);
        res.json({ message: "ID de projet invalide" });
        return;
    }

    try {
        ({ name, type, description, thumbnail, github_url, technologies, featured } = projectSchema.parse(req.body ?? {}));
    } catch (error) {
        return res.status(400).json({
            message: "Données invalides",
            errors: error.flatten().fieldErrors
        });
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM projects WHERE id = ?`, [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Projet introuvable" });
        }

        const fields = {
            name,
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

        values.push(id);

        await pool.execute(
            `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, values
        );

        res.status(200)
        res.json({ message: "Projet mis à jour avec succès" });
        return;

    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409);
            res.json({ message: "Un projet avec ce nom existe déjà" });
            return;
        }

        console.error("Erreur lors de la mise à jour du projet :", error);

        res.status(500);
        res.json({ message: "Erreur Serveur lors de la mise à jour du projet" });
    }
});

export default router;
