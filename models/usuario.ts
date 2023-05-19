import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connection";

class Usuario extends Model { }

Usuario.init({
    nombre: { type: DataTypes.STRING },
    password: {
        type: DataTypes.STRING, get() {
            return null;
        }
    },
    email: { type: DataTypes.STRING },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
    google: { type: DataTypes.BOOLEAN }
}, {
    sequelize
});

export default Usuario;