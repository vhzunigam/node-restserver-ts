import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'root', '1qazxsw2', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default db;