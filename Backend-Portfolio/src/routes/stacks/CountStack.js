import express from "express";
import pool from '../../infra/db.js';

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT COUNT(id) AS NumberOfStack FROM stack;`
        );

        res.status(200);
        res.json({ count: rows[0].NumberOfStack });

    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de stacks :", error);
        
        res.status(500);
        res.json({ message : "Erreur lors de la récupération du nombre de stacks" });
        return;
    }

});

export default router;