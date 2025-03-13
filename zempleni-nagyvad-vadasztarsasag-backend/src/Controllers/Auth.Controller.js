import bcrypt from "bcrypt";
import felhasznalo from "../../models/Felhasznalo.Model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default{
    async ProfileGetAdminController(req, res){
        try{
            const felhasznalok = await felhasznalo.findAll({
                where: {
                    felhasznalo_id: {[Op.ne]: req.user.id}
                },
                attributes: ["felhasznalo_id", "keresztnev", "vezeteknev", "email", "regisztracio_datum"]
            });
            res.status(200).json({
                error: false,
                message: "Sikeres lekérdezés!",
                data: felhasznalok
            });
        }catch(err){
            console.error('Hiba történt a felhasználók lekérdezése során:', err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a felhasználók lekérdezése során!"
            });
        }
    },
    async ProfileDeleteAdminController(req, res){
        try{
            const { id } = req.params;
            const user = await felhasznalo.findByPk(id);
            if(!user){
                return res.status(404).json({
                    error: true,
                    message: "Felhasználó nem található!"
                });
            }
            await user.destroy();
            res.status(200).json({
                error: false,
                message: "Felhasználó törlése sikeres!"
            });
        }catch(err){
            console.error('Hiba történt a felhasználó törlése során:', err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a felhasználó törlése során!"
            });
        }
    },
    async ProfileGetController(req, res){
        try{
            const { id: felhasznalo_id } = req.user;
            const felhasznaloAdat = await felhasznalo.findOne({
                attributes: ["keresztnev", "vezeteknev", "email"],
                where: { felhasznalo_id }
            });
            if(!felhasznaloAdat){
                return res.status(404).json({
                    error: true,
                    message: "Felhasználó nem található!"
                });
            }
            res.status(200).json({
                error: false,
                message: "Sikeres lekérdezés!",
                data: felhasznaloAdat
            });
        }catch(err){
            console.error('Hiba történt a profil lekérdezése során:', err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a profil lekérdezése során!"
            });
        }
    },
    async ProfileDeleteController(req, res){
        try{
            const { id: felhasznalo_id } = req.user;
            const felhasznaloAdat = await felhasznalo.findOne({
                where: { felhasznalo_id }
            });
            if(!felhasznaloAdat){
                return res.status(404).json({
                    error: true,
                    message: "Felhasználó nem található!"
                });
            }
            await felhasznalo.destroy({
                where: { felhasznalo_id }
            });
            res.status(200).json({
                error: false,
                message: "Felhasználó törlése sikeres!"
            });
        }catch(error){
            console.error("Hiba történt a fiók törlése során: ", error);
            res.status(500).json({
                error: true,
                message: "Hiba történt a fiók törlése során!"
            });
        }
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
                {id: felhasznaloAdat.felhasznalo_id, email:felhasznaloAdat.email, tipus: felhasznaloAdat.tipus},
                process.env.JWT_SECRET,
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
    async ProfilePatchController(req, res){
        try{
            const { id: felhasznalo_id } = req.user;
            const { jelszo, ujjelszo, jelszoujra } = req.body;

            const felhasznaloAdat = await felhasznalo.findOne({
                where: {felhasznalo_id}
            });
            if(!felhasznaloAdat){
                return res.status(404).json({
                    error: true,
                    message: "Felhasználó nem található!"
                });
            }
            if (ujjelszo.length < 8){
                return res.status(400).json({
                    error: true,
                    message: "A jelszónak minimum 8 karakter hosszúnak kell lennie!"
                });
            }
            const jelszoHelyes = /^(?=.*\d)[A-Za-z\d]{8,}$/.test(ujjelszo);
            if (!jelszoHelyes){
                return res.status(400).json({
                    error: true,
                    message: "A jelszónak minimum 8 karakter hosszúnak kell lennie és legalább egy számot tartalmaznia kell!"
                });
            }
            if(ujjelszo !== jelszoujra){
                return res.status(400).json({
                    error: true,
                    message: "A két jelszó nem egyezik!"
                });
            }
            const egyezikE = await bcrypt.compare(jelszo, felhasznaloAdat.jelszo);
            if(!egyezikE){
                return res.status(400).json({
                    error: true,
                    message: "Hibás jelszó!"
                });
            }
            const hashJelszo = await bcrypt.hash(ujjelszo, 10);
            await felhasznalo.update(
                {jelszo: hashJelszo},
                {where: {felhasznalo_id}}
            );
            res.status(200).json({
                error: false,
                message: "Sikeres jelszó módosítás!"
            });
        }catch(err){
            console.error('Hiba történt a jelszó módosítása során:', err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a jelszó módosítása során!"
            });
        }
    },
    async RegisterPostController(req, res){
        try{
            const {keresztnev, vezeteknev, jelszoujra, email, jelszo} = req.body;
            if(!keresztnev || !vezeteknev || !jelszoujra || !email || !jelszo){
                return res.status(400).json({
                    error: true,
                    message: "Hiányzó adat(ok)!"
                });
            }
            const emailHelyes = /\S+@\S+\.\S+/.test(email);
            if (!emailHelyes){
                return res.status(400).json({
                    error: true,
                    message: "Érvénytelen email cím!"
                });
            }
            const nevHelyes = /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű]+$/;
            if (!nevHelyes.test(keresztnev) || !nevHelyes.test(vezeteknev)){
                return res.status(400).json({
                    error: true,
                    message: "A név csak betűket tartalmazhat!"
                });
            }
            const jelszoHelyes = /^(?=.*\d)[A-Za-z\d]{8,}$/.test(jelszo);
            if (!jelszoHelyes){
                return res.status(400).json({
                    error: true,
                    message: "A jelszónak minimum 8 karakter hosszúnak kell lennie és legalább egy számot tartalmaznia kell!"
                });
            }
            if (jelszo.length < 8){
                return res.status(400).json({
                    error: true,
                    message: "A jelszónak minimum 8 karakter hosszúnak kell lennie!"
                });
            }
            if (jelszo !== jelszoujra){
                return res.status(400).json({
                    error: true,
                    message: "A megadott két jelszó nem egyezik!"
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
                tipus: 0
            });
            res.status(200).json({
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