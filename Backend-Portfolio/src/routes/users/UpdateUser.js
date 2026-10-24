import express from "express";
import { z } from "zod";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

const router = express.Router();

const UpdateSchema = z.object({
    firstname: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional()
});

router.patch("/", auth, async (req, res) => {

    let firstname, name, email;

    try {
        ({ firstname, name, email } = UpdateSchema.parse(req.body));
    } catch (error) {
        res.status(400);
        res.json({ message: "Données de mise à jour invalides" });
        return;
    }

    try {
        const userId = req.user.userId;

        const fieldsToUpdate = [];
        const values = [];

        firstname = firstname?.trim();
        if (firstname){
            fieldsToUpdate.push("firstname = ?");
            values.push(firstname);
        }

        name = name?.trim();
        if (name){
            fieldsToUpdate.push("name = ?");
            values.push(name);
        }

        email = email?.trim();
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
            res.status(409);
            res.json({ message: "L'email est déjà utilisé" });
            return;
        }

        res.status(500);
        res.json({ message: "Erreur lors de la mise à jour des informations de l'utilisateur" });
        return;
    }
});

export default router;