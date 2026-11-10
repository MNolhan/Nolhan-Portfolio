import express from "express";

const router = express.Router();

router.post("/", (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200)
        res.json({ message: "Déconnecté" })
        return;

    } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
        res.status(500)
        res.json({ message: "Erreur lors de la déconnexion" })
    }
});

export default router;