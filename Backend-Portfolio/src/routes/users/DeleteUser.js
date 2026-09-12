import express from "express";
import auth from "../../middlewares/auth.js";
import pool from '../../infra/db.js';

const router = express.Router();

router.delete("/", auth, async (req, res) => {

    try {
        const userId = req.user.userId;

        await pool.query("DELETE FROM users WHERE id = ?", [userId]);   

        res.status(204).send();
        
    } catch (err) {
        res.status(500);
        res.json({ message: "Erreur lors de la suppression du compte" });
        return;
    }
});

export default router;