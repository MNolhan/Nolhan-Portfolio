import express from "express";
import pool from '../../infra/db.js';

const router = express.Router();

router.get("/", async (req , res) => {

    try {
        const [rows] = await pool.execute(
            `Select nombre from visits where id = 1`
        );

        res.status(200);
        res.json(rows);

    } catch (error) {
        res.status(500);
        res.json({ message : "Erreur Serveur lors de la lecture du nombre de reloads" });
        return;
    }

});

export default router; 