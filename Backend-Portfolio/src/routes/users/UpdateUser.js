import express from "express";
import bcrypt from "bcrypt";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

const router = express.Router();

router.patch("/", auth, async (req, res) => {


    try {

        const userId = req.user.userId;
        const { firstname, name, email } = req.body;

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
        res.status(500);
        res.json({ message: "Erreur lors de la mise à jour des informations de l'utilisateur" });
        return;
    }
});

export default router;