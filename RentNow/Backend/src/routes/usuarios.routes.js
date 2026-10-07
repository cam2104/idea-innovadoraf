const express = require('express');

const router = express.Router();

const {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
} = require('../controllers/usuarios.controller');

router.get('/', obtenerUsuarios);

router.get('/:id', obtenerUsuarioPorId);

router.post('/', crearUsuario);

router.delete('/:id', eliminarUsuario);

module.exports = router;