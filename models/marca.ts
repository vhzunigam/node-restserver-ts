import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connection";
import Usuario from "./usuario";

class Marca extends Model { }

Marca.init({
    nombre: { type: DataTypes.STRING },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    sequelize
}
);

Marca.belongsTo(Usuario, { foreignKey: 'usuario' });

export default Marca;