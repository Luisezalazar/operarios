const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '10092001',
    database: 'swissport'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    return res.json('From backend side');
});

// Ruta para obtener todos los registros de la tabla formulario
app.get('/formulario', (req, res) => {
    const sql = "SELECT * FROM formulario";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching formulario:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// Ruta para obtener todos los registros de la tabla vehiculo
app.get('/vehiculo', (req, res) => {
    const sql = "SELECT * FROM vehiculo";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching vehiculo:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// Ruta para obtener todos los registros de la tabla operario
app.get('/operario', (req, res) => {
    const sql = "SELECT * FROM operario";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching operario:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// Ruta para insertar un nuevo registro en la tabla formularios
app.post('/formulario', (req, res) => {
    const { hora, actividades, tipo_actividades, operario, vehiculo, numeroVuelo, cargaSalmon, cargaGeneral } = req.body;

    // Ejemplo de validación básica
    if (!hora || !operario || !vehiculo || !numeroVuelo || !cargaSalmon || !cargaGeneral) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = "INSERT INTO formulario (hora, actividad, tipo_actividad, id_operario, id_vehiculo, numero_vuelo, cargaSalmon, cargaGeneral) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [hora, actividades, tipo_actividades, operario, vehiculo, numeroVuelo, cargaSalmon, cargaGeneral];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting into formulario:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Formulario enviado exitosamente', result });
    });
});

// Iniciar server
app.listen(8081, () => {
    console.log("listening on port 8081...");
});
