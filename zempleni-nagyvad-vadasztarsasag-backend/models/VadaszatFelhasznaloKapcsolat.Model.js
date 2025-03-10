import { DataTypes } from "sequelize";
import sequelize from "../src/db.js";

const VadaszatFelhasznaloKapcsolat = sequelize.define('vadaszat_felhasznalo_kapcsolat', {
    foglalt_vadaszat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    felhasznalo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'vadaszat_fehlasznalo_kapcsolat',
    timestamps: false
});

export default VadaszatFelhasznaloKapcsolat;