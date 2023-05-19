import { Router } from "express";
import { check } from 'express-validator';

import { productoController } from "../controller";
import { existeMarcaPorId, existeProductoPorId } from '../helpers';
import { validarCampos, validarJWT } from "../middlewares";

const router = Router();

router.get('/:id', [
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoController.obtenerProducto);
router.get('/', productoController.obtenerProductos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatoria').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('marca').custom(existeMarcaPorId),
    validarCampos
], productoController.crearProducto);
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoController.actualizarProducto);
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoController.eliminarProducto);

export default router;