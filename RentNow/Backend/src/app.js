const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios.routes');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API de RentNow funcionando correctamente'
    });
});

module.exports = app;