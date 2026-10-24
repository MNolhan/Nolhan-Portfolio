import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export default function auth(req, res, next) {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401);
            res.json({ message: "Authentification requise" });
            return;
        }

        const token = authHeader.slice(7);

        try {
            const payload = jwt.verify(token, process.env.JWTKEY);
            req.user = payload;
            next();

        } catch (err) {
            return res.status(401).json({ message: "Token invalide ou expiré" });
        }

    } catch (err) {
        return res.status(401).json({ message: "Authentification requise" });
    }
}
