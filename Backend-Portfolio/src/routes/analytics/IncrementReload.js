import express from "express";
import mysql from "mysql2/promise";
import pool from '../../infra/db.js';

const router = express.Router();

router.post("/", async (req , res) => {

    try {

        const [rows] = await pool.execute(
            `UPDATE visits SET nombre = nombre + 1 WHERE id = 1`
        );

        res.status(200);
        res.json({ message: "Le nombre de visites a été incrémenté avec succès" });

    } catch (error) {

        res.status(500);
        console.error('Erreur lors de l\'incrémentation du nombre de visites :', error);
        res.json({ message: "Erreur Serveur" });

    }

});

export default router; 