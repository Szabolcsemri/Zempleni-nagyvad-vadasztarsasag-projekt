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
    }
}, {
    tableName: 'helyszin',
    timestamps: false
});

export default Helyszin;