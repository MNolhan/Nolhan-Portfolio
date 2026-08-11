import express from "express";
import mysql from "mysql2/promise";
import pool from '../../infra/db.js';

const router = express.Router();

router.get("/", async (req , res) => {

    try {

        setTimeout(async () => {
            console.log('Attente de 500ms avant de lire le nombre de reloads...');
        }, 500);

        const [rows] = await pool.execute(
            `Select nombre from visits where id = 1`
        );

        res.status(200);
        console.log('Nombre de reloads lu avec succès :', rows);
        res.json(rows);

    } catch (error) {

        res.status(500);
        console.error('Erreur lors de la lecture du nombre de reloads :', error);
        res.json({ message : "Erreur Serveur lors de la lecture du nombre de reloads" });

    }

});

export default router; 