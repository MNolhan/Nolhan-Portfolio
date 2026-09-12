import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import pool from '../../infra/db.js';
import blockIfAuthenticated from "../../middlewares/blockIfAuthenticated.js";

const router = express.Router();

const userSchema = z.object({
    name : z.string().min(1),
    firstname : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6),
});

router.post("/", blockIfAuthenticated, async (req, res) => {

    let name, firstname, email, password;

    try {
        ({ name, firstname, email, password} = userSchema.parse(req.body));
    } catch (error) {
        res.status(400);
        res.json({ message: "Données invalides" });
        return;
    }

    try {

        const hashpassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (name, firstname, email, password) VALUES (?, ?, ?, ?)",
            [name, firstname, email, hashpassword]
        );

        res.status(201);
        res.json({ message: "L'utilisateur a été créé avec succès", id: result.insertId });

    } catch (error) {

        res.status(500)
        res.json({ message: "Erreur Serveur lors de la création de l'utilisateur" });

    }
});

export default router;