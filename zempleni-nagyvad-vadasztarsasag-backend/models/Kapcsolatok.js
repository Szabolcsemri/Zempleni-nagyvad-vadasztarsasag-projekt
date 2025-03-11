import felhasznalo from "./Felhasznalo.Model.js";
import Foglaltvadaszat from "./Foglaltvadaszat.Model.js";
import Helyszin from "./Helyszin.Model.js";
import Vadfaj from "./Vadfaj.Model.js";
import VadaszatFelhasznaloKapcsolat from "./VadaszatFelhasznaloKapcsolat.Model.js";

export default function(){
        
    Foglaltvadaszat.belongsTo(Helyszin, {foreignKey: "helyszin_id"});
    Helyszin.hasMany(Foglaltvadaszat, {foreignKey: "helyszin_id"});

    Foglaltvadaszat.belongsTo(Vadfaj, {foreignKey: "vadfaj_id"});
    Vadfaj.hasMany(Foglaltvadaszat, {foreignKey: "vadfaj_id"});

    felhasznalo.belongsToMany(Foglaltvadaszat, {
        through: VadaszatFelhasznaloKapcsolat,
        foreignKey: "felhasznalo_id"
    });

    Foglaltvadaszat.belongsToMany(felhasznalo, {
        through: VadaszatFelhasznaloKapcsolat,
        foreignKey: "foglalt_vadaszat_id"
    });

    Foglaltvadaszat.belongsTo(felhasznalo, {foreignKey: "letrehozo_felhasznalo_id"});
    felhasznalo.hasMany(Foglaltvadaszat, {foreignKey: "letrehozo_felhasznalo_id"});
}