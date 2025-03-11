import { Op } from "sequelize";
import Foglaltvadaszat from "../../models/Foglaltvadaszat.Model.js";
import Helyszin from "../../models/Helyszin.Model.js";
import VadaszatFelhasznaloKapcsolat from "../../models/VadaszatFelhasznaloKapcsolat.Model.js";
import Vadfaj from "../../models/Vadfaj.Model.js";


export default{
    async VadaszatokGetController(req, res){
        try{
            const mai = new Date();
            mai.setHours(0, 0, 0, 0);
            const vadaszatok = await Foglaltvadaszat.findAll({
                where: {
                    kezdete: {
                        [Op.gte]: mai
                    }
                },
                include: [
                    {
                        model: Helyszin,
                        attributes: ["nev"]
                    },
                    {
                        model: Vadfaj,
                        attributes: ["nev", "foto_url"]
                    }
                ]
            });
            res.status(200).json({
                error: false,
                message: "Vadászatok sikeresen lekérdezve.",
                vadaszatok
            });
        }catch(err){
            console.error("Hiba történt lekérdezés során:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a vadászatok lekérdezése során."
            });
        }
    },
    async VadaszatPostController(req, res){
        const { helyszin_id, vadfaj_id, kezdete, vege } = req.body;

        if (!helyszin_id || !vadfaj_id || !kezdete || !vege) {
            return res.status(400).json({
                 error: true, 
                 message: "Minden mező kitöltése kötelező!" 
                });
        }

        try {
            const ujFoglalas = await Foglaltvadaszat.create({
                helyszin_id,
                vadfaj_id,
                kezdete,
                vege,
                statusz: 'lefoglalt',
                letrehozo_felhasznalo_id: req.user.id
            });

            await VadaszatFelhasznaloKapcsolat.create({
                foglalt_vadaszat_id: ujFoglalas.foglalt_vadaszat_id,
                felhasznalo_id: req.user.id
            });

            res.status(201).json({
                error: false,
                message: "Vadászat sikeresen lefoglalva!",
                foglalas: ujFoglalas
            });
        } catch (err) {
            console.error("Hiba történt:", err);
            res.status(500).json({
                 error: true,
                 message: "Hiba történt a foglalás során!" 
                });
        }
    },
    async VadaszatCsatlakozasGetController(req, res){
        try{
            console.log("Felhasználó ID:", req.user.felhasznalo_id);
            console.log("Request user objektum:", req.user);
            const vadaszatId = req.params.id;
            const felhasznaloId = req.user.id;
            const kapcsolat = await VadaszatFelhasznaloKapcsolat.findOne({
                where: {
                    foglalt_vadaszat_id: vadaszatId,
                    felhasznalo_id: felhasznaloId
                }
        });
        res.json({
            csatlakozott: !!kapcsolat
        });
        } catch (err) {
            console.error("Hiba történt:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a csatlakozás ellenőrzése során!"
            });
        }
    },
    async VadaszatCsatlakozasPostController(req, res){
        try{
            console.log("Dekódolt token:", req.user); // DEBUG
            console.log("Kapott URL paraméterek:", req.params);
            console.log("Kapott ID:", req.params.id);
            const vadaszatId = req.params.id;
            const felhasznaloId = req.user.id;
            await VadaszatFelhasznaloKapcsolat.create({
                foglalt_vadaszat_id: vadaszatId,
                felhasznalo_id: felhasznaloId
            });
            res.json({
                error: false,
                message: "Sikeres csatlakozás a vadászathoz!"
            });
        } catch (err) {
            console.error("Hiba történt:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a csatlakozás során!"
            });
        }
    },
    async VadaszatLecsatlakozasDeleteController(req, res){
        try{
            const vadaszatId = req.params.id;
            const felhasznaloId = req.user.id;
            await VadaszatFelhasznaloKapcsolat.destroy({
                where: {
                    foglalt_vadaszat_id: vadaszatId,
                    felhasznalo_id: felhasznaloId
                }
            });
            res.json({
                error: false,
                message: "Sikeres lecsatlakozás a vadászatról!"
            });
        }catch (err){
            console.error("Hiba történt:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a lecsatlakozás során!"
            });
        }
    },
    async VadaszatDeleteController(req, res){
        try{
            const { id } = req.params;
            const vadaszat = await Foglaltvadaszat.findOne({
                where: {
                    foglalt_vadaszat_id: id,
                    letrehozo_felhasznalo_id: req.user.id
                }
            });
            if(!vadaszat){
                return res.status(404).json({
                    error: true,
                    message: "A vadászat nem található!"
                });
            }
            await vadaszat.destroy();
            res.status(200).json({
                error: false,
                message: "Vadászat sikeresen törölve!"
            });
        }catch(err){
            console.error("Hiba történt:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a vadászat törlése során!"
            });
        }
    },
    async VadaszatAdminDeleteController(req, res){
        try{
            const vadaszatId = req.params.id;
            const torolt = await Foglaltvadaszat.destroy({
                where: {
                    foglalt_vadaszat_id: vadaszatId
                }
            });
            if(!torolt){
                return res.status(404).json({
                    error: true,
                    message: "A vadászat nem található!"
                });
            }
            res.status(200).json({
                error: false,
                message: "Vadászat sikeresen törölve!"
            });
        }catch(err){
            console.error("Hiba történt:", err);
            res.status(500).json({
                error: true,
                message: "Hiba történt a vadászat törlése során!"
            });
        }
    }
};