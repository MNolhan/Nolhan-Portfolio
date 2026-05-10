import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { configDotenv } from 'dotenv';
import auth from "../../middlewares/auth.js";

configDotenv();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const MdpSchema = z.object({
    oldpassword: z.string().min(6),
    newpassword: z.string().min(6)
});

router.patch("/", auth, async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1];

        const data = MdpSchema.parse(req.body);
        const oldpassword = data.oldpassword;
        const newpassword = data.newpassword;

        if (!token) {
            res.status(401);
            res.json({ message: "Token manquant" });
            return;
        }

        if (oldpassword === newpassword) {
            res.status(400);
            res.json({ message: "Le nouveau mot de passe doit être différent de l'ancien" });
            return;
        }

        const payload = jwt.verify(token, process.env.jwtKey);

        const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [payload.userId]);
        if (!rows.length) {
            res.status(404);
            res.json({ message : "Compte introuvable" });
            return;
        }

        const verify = await bcrypt.compare(oldpassword, rows[0].password);
        if (!verify) {
            res.status(401);
            res.json({ message: "Mot de passe incorrect" });
            return;

        } else {

            const newHashpassword = await bcrypt.hash(newpassword, 10);

            await pool.query("UPDATE users SET password = ? WHERE id = ?", [newHashpassword, payload.userId]);

            res.status(200);    
            res.json({ message: "Mot de passe mis à jour avec succès" });
            return;
        }

    } catch (err) {

        if (err.name === "TokenExpiredError") {
            res.status(401);
            res.json({ message: "Token expiré" });
            return;

        } else if (err.name === "JsonWebTokenError") {
            res.status(401);
            res.json({ message: "Token invalide" });
            return;

        } else {
            res.status(400);
            res.json({ message: "Erreur lors de la mise à jour du mot de passe" });
            return;
        }
    }
});

export default router;