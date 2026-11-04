const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexión directa a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1014',
  database: 'api_adso'
});

// 1. Registro
app.post('/api/registro', (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) return res.status(400).json({ mensaje: "Error en la autenticacion" });

  db.query('INSERT INTO usuarios (usuario, password) VALUES (?, ?)', [usuario, password], (err) => {
    if (err) return res.status(400).json({ mensaje: "Error al registrar el usuario" });
    res.status(201).json({ mensaje: "Usuario registrado con exito" });
  });
});

// 2. Login
app.post('/api/login', (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) return res.status(400).json({ mensaje: "Error en la autenticacion" });

  db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password], (err, rows) => {
    if (rows && rows.length > 0) {
      res.status(200).json({ mensaje: "Autenticacion satisfactoria" });
    } else {
      res.status(401).json({ mensaje: "Error en la autenticacion" });
    }
  });
});

app.listen(3000, () => console.log('Servidor en puerto 3000 con MySQL'));