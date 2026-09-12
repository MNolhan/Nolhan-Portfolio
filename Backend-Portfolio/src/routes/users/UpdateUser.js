import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

const router = express.Router();

const MdpSchema = z.object({
    oldpassword: z.string().min(6),
    newpassword: z.string().min(6)
});

router.patch("/", auth, async (req, res) => {

    try {
        const data = MdpSchema.parse(req.body);
        const oldpassword = data.oldpassword;
        const newpassword = data.newpassword;

        if (oldpassword === newpassword) {
            res.status(400);
            res.json({ message: "Le nouveau mot de passe doit être différent de l'ancien" });
            return;
        }

        const userId = req.user.userId;

        const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [userId]);
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

            await pool.query("UPDATE users SET password = ? WHERE id = ?", [newHashpassword, userId]);

            res.status(200);    
            res.json({ message: "Mot de passe mis à jour avec succès" });
            return;
        }

    } catch (err) {
        res.status(500);
        res.json({ message: "Erreur lors de la mise à jour du mot de passe" });
        return;
    }
});

export default router;