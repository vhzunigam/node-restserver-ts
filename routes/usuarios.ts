import { Router } from "express";
import { check } from 'express-validator';

import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios } from "../controller/usuarios";
import { emailExiste } from "../helpers/db-validator";
import { validarJWT } from "../middlewares/valida-jwt";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', [
    check('id', 'No es un Id valido').isNumeric(),
    validarCampos
], obtenerUsuario);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El corre no es valido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol').custom(esRolValido),
    validarCampos
], crearUsuario);
router.put('/:id', [
    check('id', 'No es un Id valido').isNumeric(),
    check('email', 'El corre no es valido').optional().isEmail(),
    check('email').optional().custom(emailExiste),
    validarCampos
], actualizarUsuario);
router.delete('/:id', [
    validarJWT,
    validarCampos
], eliminarUsuario);

export default router;