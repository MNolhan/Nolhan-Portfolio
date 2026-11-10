import jwt from "jsonwebtoken";

export default function auth(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        res.status(401);
        res.json({ message: "Authentification requise" });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWTKEY);
        req.user = payload;
        next();

    } catch (err) {
        console.error("Token invalide ou expiré :", err);
        res.status(401)
        res.json({ message: "Token invalide ou expiré" });
    } 
}
