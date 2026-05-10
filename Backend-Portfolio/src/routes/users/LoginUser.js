import express from "express";
import mysql from "mysql2/promise";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from 'dotenv';
import rateLimiter from "../../middlewares/RateLimiting.js";

configDotenv();

const SecretKey = process.env.jwtKey;
const router = express.Router();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const PostSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post("/", rateLimiter,async (req, res) => {
    try {

        const { email, password } = PostSchema.parse(req.body);

        const [rows] = await pool.query( 
            "SELECT id, name, firstname, email, password FROM users WHERE email = ?", 
            [email]
        );

        if (rows.length === 0) { 
            res.status(404);
            res.json({ message : "Aucun compte n'a été enregistré avec cette adresse Mail" });
            return;

        } else { 

            const user = rows[0]; 

            const decryptpassword = await bcrypt.compare(password, user.password);
            if (decryptpassword){
                res.status(200)

                const payload = { userId: user.id, email: user.email, name : user.name, firstname : user.firstname }; 

                const token = jwt.sign(payload, SecretKey, { expiresIn: "1h" });
                res.json({ token });
                return;

            } else {
                res.status(401);
                res.json({ message: "Mot de passe incorrect" });
                return;
            }
        }

    } catch (error) {

        res.status(500);
        res.json({ error: error.message });

    }
});

export default router;
