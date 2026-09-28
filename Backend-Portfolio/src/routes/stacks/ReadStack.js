import express from "express";
import pool from '../../infra/db.js';

const router = express.Router();

router.get("/", async (req , res) => {

    try {

        const [rows] = await pool.execute(
            `Select * from stack`
        );

        res.status(200);
        res.json(rows);

    } catch (error) {

        res.status(500);
        res.json({ message : "Erreur lors de la récupération des stacks" });

    }

});

export default router; 