import bcrypt from "bcrypt";
import felhasznalo from "../../models/Felhasznalo.Model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

export default{
    LoginGetController(req, res){
    },
    async LoginPostController(req, res){
        try{
            const {email, jelszo} = req.body;
            const felhasznaloAdat = await felhasznalo.findOne({where: {email}});
            if(!felhasznaloAdat){
                return res.status(400).json({
                    error: true,
                    message: "Hibás email vagy jelszó!"
                });
            }
            const egyezikE = await bcrypt.compare(jelszo, felhasznaloAdat.jelszo);
            if(!egyezikE){
                return res.status(400).json({
                    error: true,
                    message: "Hibás email vagy jelszó!"
                });
            }
            const token = jwt.sign(
                {id: felhasznaloAdat.id, email:felhasznaloAdat.email},
                JWT_SECRET,
                {expiresIn: "1h"}
            );
            res.status(200).json({
                error: false,
                message: "Sikeres bejelentkezés!",
                token
            });
        }catch (err){
            console.error(err);
            res.status(500).json({
                error: true,
                message: "Hiba történt bejelentkezés során."
            });
        }
    },
    RegisterGetController(req, res){
    },
    async RegisterPostController(req, res){
        try{
            const {keresztnev, vezeteknev, jelszoujra, email, jelszo} = req.body;
            if (jelszo !== jelszoujra){
                return res.status(400).json({
                    error: true,
                    message: "A megadott két jelszó nem eggyezik!"
                });
            }
            const letezoFelhasznalo = await felhasznalo.findOne({where: {email}});
            if(letezoFelhasznalo){
                return res.status(409).json({
                    error: true,
                    message: "Ez az email cím már regisztrálva van."
                });
            }
            const hashJelszo = await bcrypt.hash(req.body.jelszo, 10);
            await felhasznalo.create({
                keresztnev,
                vezeteknev,
                email,
                jelszo: hashJelszo,
                tipus: 1
            });
            res.status(201).json({
                error: false,
                message: "Sikeres regisztráció!"
            });
        }catch (error){
            console.error('Hiba történt regisztráció során:', error);
            res.status(500).json({
                error: true,
                message: 'Hiba történt regisztráció során.'
            });
        }
    },
    VerifyTokenController(req, res){
        const token = req.headers['authorization']?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                error: true,
                message: "Token hiányzik!"
            });
        }
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            res.status(200).json({
                error: false,
                message: "Token érvényes",
                data: decoded
            });
        }catch(err){
            console.error('Érvénytelen token:', err);
            res.status(401).json({
                error: true,
                message: "Érvénytelen vagy lejárt token"
            });
        }
    },
    LogoutPostController(req, res){
        try{
            res.status(200).json({
                error: false,
                message: "Sikeres kijelentkezés!"
            });
        }catch(err){
            console.error('Hiba történt kijelentkezés során:', err);
            res.status(500).json({
                error: true,
                message: "Hiba történt kijelentkezés során!"
            });
        }
    }
};