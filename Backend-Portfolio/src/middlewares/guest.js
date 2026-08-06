import jwt from "jsonwebtoken";
import "dotenv/config";

export default function guest(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.slice(7);

        try {
            const payload = jwt.verify(token, process.env.jwtKey);
            return res.status(403).json({ message: "Vous êtes déjà connecté" });
        } catch (err) {
            next();
        }

    } catch (err) {
        next();
    }
}