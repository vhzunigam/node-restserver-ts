import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connection";
import Marca from "./marca";
import Usuario from './usuario';

class Producto extends Model { }

Producto.init({
    nombre: { type: DataTypes.STRING },
    precio: { type: DataTypes.DOUBLE },
    descripcion: { type: DataTypes.STRING },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
    img: { type: DataTypes.STRING },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    sequelize
});

Producto.belongsTo(Marca, { foreignKey: 'marca' });
Producto.belongsTo(Usuario, { foreignKey: 'usuario' });

export default Producto;