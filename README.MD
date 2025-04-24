# SpaceXplorer - Réservation de missions spatiales
Auteur : Emmanuel Hendrix 

SpaceXplorer est une application web permettant aux utilisateurs de consulter et de réserver des missions spatiales vers différentes planètes. Elle comprend un formulaire pour ajouter de nouvelles missions, ainsi qu'une interface pour afficher toutes les missions réservées.

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Utilisation](#utilisation)


---

## Prérequis

Avant d'exécuter ce projet, vous devez avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 14 ou plus récente)
- **MySQL** (ou une autre base de données compatible MySQL)
- **npm** (le gestionnaire de paquets de Node.js)

---

## Installation

Suivez ces étapes pour installer et démarrer l'application :

1. **Clonez le dépôt**

   Clonez ce projet sur votre machine locale en utilisant la commande suivante :

   ```bash
   git clone https://github.com/Hendrix44/SpaceXplorer.git
   cd SpaceXplorer
   ```
2. **Installez les dépendances**

   Installez les dépendances nécessaires en exécutant :

   ```bash
   npm install
   ```
3.demarrage 

   Démarrez le serveur avec la commande suivante :

   ```bash
    npx node server.js

   ```
## Utilisation


###  Ajouter une planète

- Rendez-vous sur la page **"Ajouter une Planète"** via le menu.
- Remplissez les informations sur la planète : nom, type, distance, température, etc.
- Téléchargez une image, puis soumettez le formulaire pour enregistrer la planète.

###  Réserver une mission

- Accédez à la page **"Réserver une mission"** via le menu.
- Sélectionnez une planète dans la liste déroulante.
- Renseignez l'ID de l'explorateur, la date de départ, et la durée de la mission.
- Cliquez sur **"Réserver"** pour valider la mission.

###  Afficher toutes les missions

- Cliquez sur le bouton **"Afficher les missions"**.
- Une liste détaillée des missions réservées s'affichera.
- La liste peut être filtrée selon différents critères comme la planète, l'explorateur ou la date de départ. différentes propriétés, telles que la planète, l'explorateur, ou la date de départ.