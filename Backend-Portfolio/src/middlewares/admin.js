import jwt from "jsonwebtoken";

export default function admin(req, res, next) {
    
    if (req.user.role !== 'admin') {
        res.status(403);
        res.json({ message: "Accès refusé" });
        return;
    }
    
    next();
}