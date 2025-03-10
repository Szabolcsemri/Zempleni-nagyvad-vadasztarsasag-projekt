import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Kapott token:", token); 
    if (!token) {
        return res.status(401).json({
             error: true, 
             message: "Autorizáció szükséges!" 
            });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Dekódolt token:", decoded);
        next();
    } catch (err) {
        return res.status(403).json({
             error: true,
             message: "Érvénytelen token!"
             });
    }
}