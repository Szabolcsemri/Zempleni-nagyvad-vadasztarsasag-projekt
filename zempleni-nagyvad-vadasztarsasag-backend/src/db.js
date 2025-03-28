import { Sequelize } from "sequelize";

const sequelize = new Sequelize('zempleninagyvadvadasztarsasag', 'admin', '6qyV-cNG6@6psz_Y', {
    host: 'localhost',
    dialect: 'mariadb'
});

export default sequelize;