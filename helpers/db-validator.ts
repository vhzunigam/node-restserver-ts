import Marca from '../models/marca';
import Producto from '../models/producto';
import /*{ Categoria, Role,*/ Usuario /*, Producto }*/ from '../models/usuario';

// const esRolValido = async (rol = '') => {
//     const existeRol = await Role.findOne({ rol });

//     if (!existeRol) {
//         throw new Error(`El rol ${rol} no esta registradó en la BD`);
//     }
// }

export const existeEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({
        where: {
            email: email
        }
    });
    if (existeEmail) {
        throw new Error(`Ya existe el un usuario con el correo [${email}]`);
    }
}

export const existeMarcaPorId = async (id = '') => {
    const existeMarca = await Marca.findByPk(id);
    if (!existeMarca) {
        throw new Error(`No existe la marca con ID [${id}]`);
    }
}

export const existeProductoPorId = async (id = '') => {
    const existeProducto = await Producto.findByPk(id);
    if (!existeProducto) {
        throw new Error(`No existe le producto con ID [${id}]`);
    }
}

export const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findByPk(id);
    if (!existeUsuario) {
        throw new Error(`No existe el usuario con ID [${id}]`);
    }
}

// const existeCategoriaPorId = async (id = '') => {
//     const existeCategoriaPor = await Categoria.findById(id);
//     if (!existeCategoriaPor) {
//         throw new Error(`El id: ${id} no existe en la BD`);
//     }
// }

// const existeProductoPorId = async (id = '') => {
//     const existeProducto = await Producto.findById(id);
//     if (!existeProducto) {
//         throw new Error(`El id: ${id} no existe en la BD`);
//     }
// }

// const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
//     const incluida = colecciones.includes(coleccion);

//     if (!incluida) {
//         throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
//     }

//     return true;
// }