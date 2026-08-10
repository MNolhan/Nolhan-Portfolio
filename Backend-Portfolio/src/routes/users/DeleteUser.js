import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { configDotenv } from 'dotenv';
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

router.delete("/", auth, async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401);
            res.json({ message: "Token manquant" });
            return;
        }

        const payload = jwt.verify(token, process.env.jwtKey);

        await pool.query("DELETE FROM users WHERE id = ?", [payload.userId]);   

        res.status(200);
        res.json({ message: "Compte supprimé avec succès", logout: true });
        
    } catch (err) {

        if (err.name === "TokenExpiredError") {
            res.status(401);
            res.json({ message: "Token expiré" });

        } else {
            res.status(401);
            res.json({ message: "Token invalide" });
        }
    }
});

export default router;