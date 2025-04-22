create database space;
use space;

CREATE TABLE planets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  distance FLOAT NOT NULL,
  temperature FLOAT NOT NULL,
  habitable BOOLEAN DEFAULT 0,
  description TEXT,
  image_url VARCHAR(255),
  discovery_date DATE
);

CREATE TABLE explorers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  speciality VARCHAR(100) NOT NULL,
  experience INT DEFAULT 0,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  planet_id INT NOT NULL,
  explorer_id INT NOT NULL,
  departure_date DATE NOT NULL,
  duration INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  FOREIGN KEY (planet_id) REFERENCES planets(id),
  FOREIGN KEY (explorer_id) REFERENCES explorers(id)
);

-- Données pour la table planets
INSERT INTO planets (name, type, distance, temperature, habitable, description, image_url, discovery_date)
VALUES 
('Aetheria', 'habitable', 42.7, 22.3, TRUE, 'Une planète luxuriante propice à la vie humaine.', '/uploads/aetheria.jpg', '2024-03-15'),
('Voltaris', 'gazeuse', 230.5, -160.0, FALSE, 'Géante gazeuse au cœur d\'orages électriques.', '/uploads/voltaris.jpg', 2023-11-02) ;

-- Données pour la table explorers
INSERT INTO explorers (name, speciality, experience, email)
VALUES
    ('Nova Astra', 'Biologiste spatial', 5, 'nova.astra@spacexplorer.com'),
('Kael Orion', 'Pilote d\'élite', 8, 'kael.orion@spacexplorer.com');

-- Données pour la table missions
INSERT INTO missions (planet_id, explorer_id, departure_date, duration, status)
VALUES 
(1, 1, '2025-05-10', 30, 'pending'),
(2, 2, '2025-06-01', 45, 'confirmed');


select * from explorers ;
select * from planets;
select * from missions;
