import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import bcrypt from "bcrypt";
import { configDotenv } from 'dotenv';
import guest from "../../middlewares/guest.js";
import pool from '../../infra/db.js';

configDotenv();

const router = express.Router();

const userSchema = z.object({
    name : z.string().min(1),
    firstname : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6),
    captchaValue : z.string().min(1),
});

router.post("/", guest, async (req, res) => {

    const data = req.body;
    let name, firstname, email, password, captchaValue;

    try {
        ({ name, firstname, email, password, captchaValue } = userSchema.parse(req.body));
    } catch (error) {
        res.status(400);
        res.json({ message: "Données invalides" });
        return;
    }

    try {
        const captchaVerify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.VITE_CAPTCHA_SECRET_KEY,
                response: captchaValue,
            }),
        });

        const captchaResult = await captchaVerify.json();

        if (!captchaResult.success) {
            res.status(400);
            res.json({ message: "Vérification captcha échouée" });
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ message: "Erreur lors de la vérification du captcha" });
        return;
    }

    try {

        const hashpassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (name, firstname, email, password) VALUES (?, ?, ?, ?)",
            [data.name, data.firstname, data.email, hashpassword]
        );

        res.status(201);
        res.json({ message: "L'utilisateur a été créé avec succès", id: result.insertId });

    } catch (error) {

        res.status(500)
        res.json({ message: error.message });

    }
});

export default router;