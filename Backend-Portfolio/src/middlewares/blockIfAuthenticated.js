import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const SecretKey = process.env.JWTKEY;

export default function blockIfAuthenticated(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next();
    }

    const token = authHeader.slice(7);

    jwt.verify(token, SecretKey, (err, user) => {
        if (err) {
            return next();
        }
        res.status(403).json({ message: "Vous êtes déjà authentifié" });
    });
}