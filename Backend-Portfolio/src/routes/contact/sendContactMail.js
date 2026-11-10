import express from "express";
import { z } from "zod";
import { sendContactMail } from "../infra/mailer.js";
import rateLimiter from "../../middlewares/RateLimiting.js";

const router = express.Router();

const contactSchema = z.object({
    nom: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1),
});

router.post("/", rateLimiter(3, 3600), async (req, res) => {
    
    let nom, email, message;

    try {
        ({ nom, email, message} = contactSchema.parse(req.body));
    } catch (err) {
        console.error("Données invalides :", err);
        res.status(400);
        res.json({ message: "Données invalides" });
    }

    try{
        await sendContactMail({nom, email, message});

        res.status(200);
        res.json({message : "Message Envoyé"});

    } catch (err) {
        console.log(err)
        res.status(500);
        res.json({message : "Erreur lors de l'envoi du message"});
    }
});

export default router;