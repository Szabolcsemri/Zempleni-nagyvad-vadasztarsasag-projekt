import { DataTypes } from "sequelize";
import sequelize from "../src/db.js";

const felhasznalo = sequelize.define('felhasznalo', {
    felhasznalo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    keresztnev: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    vezeteknev: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        uniqe: true
    },
    jelszo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regisztracio_datum: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    tipus: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'felhasznalo',
    timestamps: false
});

export default felhasznalo;