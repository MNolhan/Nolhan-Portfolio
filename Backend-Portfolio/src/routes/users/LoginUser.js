import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimiter from "../../middlewares/RateLimiting.js";
import pool from '../../infra/db.js';
import blockIfAuthenticated from "../../middlewares/blockIfAuthenticated.js";
import dotenv from 'dotenv';

dotenv.config();

const SecretKey = process.env.JWTKEY;
const router = express.Router();

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post("/", rateLimiter, blockIfAuthenticated, async (req, res) => {

    let email, password;

    try {
        ({ email, password } = LoginSchema.parse(req.body));
    } catch (error) {
        res.status(400);
        res.json({ message: "Données de connexion invalides" });
        return;
    }

    try {

        const [rows] = await pool.query( 
            "SELECT id, name, firstname, email, password, role FROM users WHERE email = ?", 
            [email]
        );

        if (rows.length === 0) { 
            res.status(401);
            res.json({ message : "Email ou mot de passe incorrect" });
            return;

        } else { 

            const user = rows[0]; 

            const decryptpassword = await bcrypt.compare(password, user.password);
            if (decryptpassword){
                res.status(200)

                const payload = { userId: user.id, email: user.email, name : user.name, firstname : user.firstname, role : user.role }; 

                const token = jwt.sign(payload, SecretKey);
                res.json({ token });
                return;

            } else {
                res.status(401);
                res.json({ message: "Email ou mot de passe incorrect" });
                return;
            }
        }

    } catch (error) {

        res.status(500);
        res.json({ message: "Erreur Serveur lors de la connexion de l'utilisateur" });

    }
});

export default router;
