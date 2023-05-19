import { Router } from "express";
import { check } from 'express-validator';

import { marcaController } from "../controller";
import { existeMarcaPorId } from "../helpers";
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get('/:id', [
    check('id', 'No es un id valido').isNumeric(),
    validarCampos
], marcaController.obtenerMarca);
router.get('/', marcaController.obtenerMarcas);
router.post('/', [
    validarJWT,
    validarCampos
], marcaController.crearMarca);
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isNumeric(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    existeMarcaPorId,
    validarCampos
], marcaController.actualizarMarca);
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isNumeric(),
    check('id').optional().custom(existeMarcaPorId),
    validarCampos
], marcaController.eliminarMarca);

export default router;