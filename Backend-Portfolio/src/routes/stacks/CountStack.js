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
        res.status(500);
        res.json({ message : "ERROR" });
        return;
    }

});

export default router;