const pool = require('../config/database');
const bcrypt = require('bcrypt');

const obtenerTodos = async () => {
    const [usuarios] = await pool.query(`
        SELECT
            id_usuario,
            id_rol,
            nombre,
            correo,
            telefono,
            tipo_documento,
            numero_documento,
            estado,
            fecha_creacion,
            fecha_actualizacion,
            fecha_eliminacion
        FROM usuarios
    `);

    return usuarios;
};

const crearUsuario = async (usuario) => {
    const {
        id_rol,
        nombre,
        correo,
        telefono,
        contrasena,
        tipo_documento,
        numero_documento
        
    } = usuario;

    const contrasenaHash = await bcrypt.hash(contrasena, 10);

   const [resultado] = await pool.query(`
    INSERT INTO usuarios (
        id_rol,
        nombre,
        correo,
        telefono,
        contrasena,
        tipo_documento,
        numero_documento,
        estado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 'activo')
`, [
    id_rol,
    nombre,
    correo,
    telefono,
    contrasenaHash,
    tipo_documento,
    numero_documento
]);

    return resultado.insertId;
};
const obtenerPorId = async (id) => {
    const [usuarios] = await pool.query(`
        SELECT
            id_usuario,
            id_rol,
            nombre,
            correo,
            telefono,
            tipo_documento,
            numero_documento,
            estado,
            fecha_creacion,
            fecha_actualizacion,
            fecha_eliminacion
        FROM usuarios
        WHERE id_usuario = ?
    `, [id]);

    return usuarios[0];

    
};
const eliminarUsuario = async (id) => {
    const [resultado] = await pool.query(`
        UPDATE usuarios
        SET
            estado = 'inactivo',
            fecha_eliminacion = NOW()
        WHERE id_usuario = ?
    `, [id]);

    return resultado.affectedRows;
};


module.exports = {
    obtenerTodos,
    crearUsuario,
    obtenerPorId,
    eliminarUsuario
};