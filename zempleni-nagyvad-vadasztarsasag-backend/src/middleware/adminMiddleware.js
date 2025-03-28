export default function adminMiddleware(req, res, next){
    if(!req.user || req.user.tipus !== 1){
        return res.status(403).json({
            error: true,
            message: "Nincs jogosultságod az ehhez a funkcióhoz!"
        });
    }
    next();
}