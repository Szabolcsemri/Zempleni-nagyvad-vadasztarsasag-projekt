import { DataTypes } from "sequelize";
import sequelize from "../src/db.js";

const Foglaltvadaszat = sequelize.define('foglaltvadaszat', {
    foglalt_vadaszat_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    helyszin_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vadfaj_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    kezdete: {
        type: DataTypes.DATE,
        allowNull: true
    },
    vege: {
        type: DataTypes.DATE,
        allowNull: true
    },
    letrehozo_felhasznalo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'foglaltvadaszat',
    timestamps: false
});

export default Foglaltvadaszat;