import express from "express";
import { z } from "zod";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';
import rateLimiter from "../../middlewares/RateLimiting.js"

const router = express.Router();

const UpdateSchema = z.object({
    firstname: z.string().trim().optional(),
    name: z.string().trim().optional(),
    email: z.string().trim().email().optional().or(z.literal(""))
});

router.patch("/", auth, rateLimiter(3, 3600), async (req, res) => {

    let firstname, name, email;

    try {
        ({ firstname, name, email } = UpdateSchema.parse(req.body));
    } catch (error) {
        console.error("Données de mise à jour invalides :", error);
        res.status(400);
        res.json({ message: "Données de mise à jour invalides" });
    }

    try {
        const userId = req.user.userId;

        const fieldsToUpdate = [];
        const values = [];

        if (firstname){
            fieldsToUpdate.push("firstname = ?");
            values.push(firstname);
        }

        if (name){
            fieldsToUpdate.push("name = ?");
            values.push(name);
        }

        if (email){
            fieldsToUpdate.push("email = ?");
            values.push(email);
        }

        if (fieldsToUpdate.length === 0) {
            res.status(400)
            res.json({ message: "Aucun champ à mettre à jour" });
            return;
        }

        values.push(userId);

        await pool.query(
            `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
            values
        );
        
        res.status(200);
        res.json({ message: "Informations de l'utilisateur mises à jour avec succès" });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error("Erreur lors de la mise à jour des informations de l'utilisateur :", err);
            res.status(409);
            res.json({ message: "L'email est déjà utilisé" });
            return;
        }

        console.error("Erreur lors de la mise à jour des informations de l'utilisateur :", err);
        res.status(500);
        res.json({ message: "Erreur lors de la mise à jour des informations de l'utilisateur" });
    }
});

export default router;