import { Router } from "express";
import { check } from 'express-validator';

import { usuarioController } from "../controller";
import { existeEmail } from "../helpers";
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', [
    check('id', 'No es un Id valido').isNumeric(),
    validarCampos
], usuarioController.obtenerUsuario);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El corre no es valido').isEmail(),
    check('email').custom(existeEmail),
    // check('rol').custom(esRolValido),
    validarCampos
], usuarioController.crearUsuario);
router.put('/:id', [
    check('id', 'No es un Id valido').isNumeric(),
    check('email', 'El corre no es valido').optional().isEmail(),
    check('email').optional().custom(existeEmail),
    validarCampos
], usuarioController.actualizarUsuario);
router.delete('/:id', [
    validarJWT,
    validarCampos
], usuarioController.eliminarUsuario);

export default router;