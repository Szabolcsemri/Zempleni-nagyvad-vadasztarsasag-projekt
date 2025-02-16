import Foglaltvadaszat from "../../models/Foglaltvadaszat.Model.js";
import Helyszin from "../../models/Helyszin.Model.js";
import Vadfaj from "../../models/Vadfaj.Model.js";


export default{
    async VadaszatokGetController(req, res){
        try{
            const vadaszatok = await Foglaltvadaszat.findAll({
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
    }
};