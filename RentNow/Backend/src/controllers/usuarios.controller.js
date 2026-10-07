const usuariosModel = require('../models/usuarios.model');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.obtenerTodos();

        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        res.status(500).json({
            mensaje: 'Error al obtener los usuarios'
        });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const idUsuario = await usuariosModel.crearUsuario(req.body);

        res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            id_usuario: idUsuario
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);

        res.status(500).json({
            mensaje: 'Error al crear el usuario'
        });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuariosModel.obtenerPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);

        res.status(500).json({
            mensaje: 'Error al obtener el usuario'
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const resultado = await usuariosModel.eliminarUsuario(req.params.id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar usuario:', error);

        res.status(500).json({
            mensaje: 'Error al eliminar el usuario'
        });
    }
};
module.exports = {
   obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
};