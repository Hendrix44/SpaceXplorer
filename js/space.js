const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chemin des fichiers statiques (HTML, CSS, JS dans /public)
app.use(express.static(path.join(__dirname, 'public')));

// Connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'space'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('✅ Connecté à la base de données MySQL');
});

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'accueil.html'));
});

// Configuration Multer pour upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// ➕ Route POST pour ajouter une planète
app.post('/api/planets', upload.single('planetImage'), (req, res) => {
    const { name, type, distance, temperature, habitable, description, discovery_date } = req.body;
    const image_url = req.file ? '/uploads/' + req.file.filename : null;

    const sql = `INSERT INTO planets (name, type, distance, temperature, habitable, description, image_url, discovery_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        name,
        type,
        parseFloat(distance),
        parseFloat(temperature),
        habitable === 'on' ? 1 : 0,
        description,
        image_url,
        discovery_date
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Erreur lors de l'insertion :", err);
            return res.status(500).send("Erreur serveur lors de l'ajout");
        }
        console.log("✅ Planète ajoutée :", name);
        res.redirect('/accueil.html');
    });
});

// 🌍 Route GET pour afficher toutes les planètes
app.get('/api/planets', (req, res) => {
    db.query('SELECT * FROM planets', (err, results) => {
        if (err) {
            console.error('❌ Erreur lors de la récupération des planètes :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
