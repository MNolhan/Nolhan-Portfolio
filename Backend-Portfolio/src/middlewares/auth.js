import jwt from "jsonwebtoken";
import "dotenv/config";

export default function auth(req, res, next) {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.slice(7);

        try {
            const payload = jwt.verify(token, process.env.jwtKey);
            req.user = payload;
            next();

        } catch (err) {
            return res.status(401).json({ message: "Token invalide ou expiré" });
        }

    } catch (err) {
        return res.status(401).json({ message: "Authentification requise" });
    }
}
