export default function admin(req, res, next) {
    
    if (req.user.role !== 'ADMIN') {
        res.status(403);
        res.json({ message: "Accès refusé" });
        return;
    }
    
    next();
}