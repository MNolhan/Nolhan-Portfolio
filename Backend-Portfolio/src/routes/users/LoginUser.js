import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimiter from "../../middlewares/RateLimiting.js";
import pool from '../../infra/db.js';
import blockIfAuthenticated from "../../middlewares/blockIfAuthenticated.js";

const SecretKey = process.env.JWTKEY;
const router = express.Router();

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post("/", rateLimiter(5, 900), blockIfAuthenticated, async (req, res) => {

    let email, password;

    try {
        ({ email, password } = LoginSchema.parse(req.body));
    } catch (error) {
        console.error("Données de connexion invalides :", error);
        res.status(400);
        res.json({ message: "Données de connexion invalides" });
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
                
                const payload = { userId: user.id, role : user.role }; 

                const token = jwt.sign(payload, SecretKey, { expiresIn: '1h' });
                
                res.cookie('token', token, { 
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000 
                }); 

                res.status(200);
                res.json({ message: "Connexion réussie" });

                return;

            } else {
                res.status(401);
                res.json({ message: "Email ou mot de passe incorrect" });
                return;
            }
        }

    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500);
        res.json({ message: "Erreur Serveur lors de la connexion de l'utilisateur" });
    }
});

export default router;
