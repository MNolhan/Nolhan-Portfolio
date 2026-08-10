import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { configDotenv } from 'dotenv';
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

router.get("/:id", auth, async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(401);
            res.json({ message: "Token manquant" });
            return;
        }

        const payload = jwt.verify(token, process.env.jwtKey);
        const userId = payload.userId;

        const [rows] = await pool.query("SELECT name, firstname, email FROM users WHERE id = ?", [userId]);

        res.status(200);
        res.json(rows);

    } catch (err) {

        if (err.name === "TokenExpiredError") {
            res.status(401);
            res.json({ message: "Token expiré" });
            return;

        } else if (err.name === "JsonWebTokenError") {
            res.status(401);
            res.json({ message: "Token invalide" });
            return;
            
        }
        else {
            res.status(400);
            res.json({ message: err.message });
        }
    }
});


export default router;