import express from "express";
import pool from '../../infra/db.js';

const router = express.Router();

router.delete("/:id",  async (req, res) => {

    const id = Number(req.params.id);

    if (!id || id <= 0) {
        res.status(400);
        res.json({ message: "ID de projet manquant ou invalide" });
        return;
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM projects WHERE id = ?`, [id]
        );

        if (rows.length === 0) {
            res.status(404);
            res.json({ message: "Projet introuvable" });
            return;
        }

        await pool.query(
            `DELETE FROM projects WHERE id = ?`, [id]
        );

        res.status(204).send();

    } catch (error) {
        console.error("Erreur lors de la suppression du projet :", error);

        res.status(500);
        res.json({ message : "Erreur Serveur lors de la suppression du projet" });
        return;
    }
});

export default router;