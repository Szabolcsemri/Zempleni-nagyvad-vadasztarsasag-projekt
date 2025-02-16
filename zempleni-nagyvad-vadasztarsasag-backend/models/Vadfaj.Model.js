import { DataTypes } from "sequelize";
import sequelize from "../src/db.js";

const Vadfaj = sequelize.define('vadfaj', {
    vadfaj_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nev: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    leiras: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    foto_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'vadfaj',
    timestamps: false
});

export default Vadfaj;