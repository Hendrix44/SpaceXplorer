const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'space'
});
db.connect(err => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
});

// Upload d'image
app.post('/upload', upload.single('planetImage'), (req, res) => {
  if (!req.file) return res.status(400).send('Aucun fichier téléchargé');
  res.json({ imageUrl: 'uploads/' + req.file.filename });
});

// Afficher toutes les planètes
app.get('/api/planets', (req, res) => {
  db.query('SELECT * FROM planets', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// Ajouter une planète
app.post('/api/planets', (req, res) => {
  const { name, type, distance, temperature, habitable, description, image_url, discovery_date } = req.body;
  db.query(
    `INSERT INTO planets (name, type, distance, temperature, habitable, description, image_url, discovery_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, type, distance, temperature, habitable ? 1 : 0, description, image_url, discovery_date],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      res.json({ id: result.insertId });
    }
  );
});

// Réserver une mission
app.post('/api/missions', (req, res) => {
  const { planet_id, explorer_id, departure_date, duration } = req.body;
  db.query(
    `INSERT INTO missions (planet_id, explorer_id, departure_date, duration, status)
     VALUES (?, ?, ?, ?, ?)`,
    [planet_id, explorer_id, departure_date, duration, 'pending'],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      console.log(`Confirmation envoyée à l'explorateur ${explorer_id} pour la planète ${planet_id}`);
      res.json({ mission_id: result.insertId, status: 'pending' });
    }
  );
});

// Afficher toutes les missions
app.get('/api/missions', (req, res) => {
  db.query('SELECT * FROM missions', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Serveur Node lancé sur http://localhost:${PORT}`);
});