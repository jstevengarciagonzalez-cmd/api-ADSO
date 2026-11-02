const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Arreglo temporal para usuarios
const usuarios = [];

// Endpoint de Registro
app.post('/api/registro', (req, res) => {
    const { usuario, password } = req.body;

    // Validar campos obligatorios
    if (!usuario || !password) {
        return res.status(400).json({ mensaje: 'Usuario y contraseña requeridos' });
    }

    // Validar si el usuario existe
    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
        return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    // Guardar usuario
    usuarios.push({ usuario, password });
    return res.status(201).json({ mensaje: 'Usuario registrado con exito' });
});

// Endpoint de Login
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;

    // Validar campos obligatorios
    if (!usuario || !password) {
        return res.status(400).json({ mensaje: 'Error en la autenticacion' });
    }

    // Buscar coincidencia de credenciales
    const valido = usuarios.find(u => u.usuario === usuario && u.password === password);

    // Respuesta de autenticacion segun la guia
    if (valido) {
        return res.status(200).json({ mensaje: 'Autenticacion satisfactoria' });
    } else {
        return res.status(401).json({ mensaje: 'Error en la autenticacion' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});