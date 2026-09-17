import express from "express";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

const router = express.Router();

router.get("/me", auth, async (req, res) => {

    try {

        const userId = req.user.userId;

        const [rows] = await pool.query("SELECT name, firstname, email FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            res.status(404);
            res.json({ message: "Utilisateur non trouvé" });
            return;
        }

        res.status(200);
        res.json(rows);

    } catch (err) {
        res.status(500);
        res.json({ message: "Erreur Serveur lors de la lecture de l'utilisateur" });
    }
});


export default router;