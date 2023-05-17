"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuarios = exports.obtenerUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({ msg: `No existe el usuario con id ${id}` });
    }
    res.json(usuario);
});
exports.obtenerUsuario = obtenerUsuario;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, rows } = yield usuario_1.default.findAndCountAll();
    res.json({
        total: count,
        usuarios: rows
    });
});
exports.obtenerUsuarios = obtenerUsuarios;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // const usuario = await Usuario.create(body);
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({ msg: `Ya existe el usuario con el email ${body.email}` });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        return res.json(usuario);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `Mensaje inesperado` });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
        }
        const algo = yield usuario_1.default.update(body, { where: { id: id } });
        return res.json(algo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `Mensaje inesperado` });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
    }
    // await usuario.destroy(); // Eliminación persistente
    yield usuario.update({ estado: false });
    res.json({ msg: 'Usuarios', id });
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.js.map