import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import bcrypt from "bcrypt";
import { configDotenv } from 'dotenv';

configDotenv();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const userSchema = z.object({
    name : z.string().min(1),
    firstname : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6),
});

router.post("/", async (req, res) => {

    const data = req.body;

    try {

        const { name, firstname, email, password } = userSchema.parse(req.body);
        const hashpassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (name, firstname, email, password) VALUES (?, ?, ?, ?)",
            [data.name, data.firstname, data.email, hashpassword]
        );

        res.status(201);
        res.json({ message: "L'utilisateur a été créé avec succès", id: result.insertId });

    } catch (error) {

        res.status(500)
        res.json({ error: error.message });

    }
});

export default router;