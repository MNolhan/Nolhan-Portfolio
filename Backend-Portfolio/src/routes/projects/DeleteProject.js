import express from "express";
import { z } from "zod";
import pool from '../../infra/db.js';

const router = express.Router();

const projectSchema = z.object({
    name: z.string().min(1),
});

router.delete("/",  async (req, res) => {

    const data = req.body;
    let name ;

    try {
        ({name} = projectSchema.parse(data));

    } catch (error) {
        res.status(400);
        res.json({ message: "Données invalides" });
        return;
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM projects WHERE name = ?`, [name]
        );

        if (rows.length === 0) {
            res.status(404)
            res.json({ message: "Projet '" + name + "' introuvable" });
            return;
        }

        await pool.query(
        `DELETE FROM projects WHERE name = ?`, [name]
        );

        res.status(204).send();

    } catch (error) {
        res.status(500);
        res.json({ message : "Erreur Serveur lors de la suppression du projet" });
        return;
    }
});

export default router;