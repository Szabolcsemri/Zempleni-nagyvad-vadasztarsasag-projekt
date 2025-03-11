import { DataTypes } from "sequelize";
import sequelize from "../src/db.js";

const Helyszin = sequelize.define('helyszin', {
    helyszin_id: {
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
    telepules: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    irszam: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    tableName: 'helyszin',
    timestamps: false
});

export default Helyszin;