# NolhanDev — Portfolio

Portfolio personnel en ligne sur [nolhandev.fr](https://www.nolhandev.fr).

## Contexte

Ce projet est mon portfolio de développeur, mais aussi mon terrain d'entraînement : j'y regroupe ce que j'apprends, du front au déploiement. Il présente mon parcours, mes compétences et mes projets, et il est construit comme une vraie application full-stack : une interface React, une API Node.js, une base de données MySQL, un cache Redis, le tout conteneurisé avec Docker et déployé sur Railway.

## Fonctionnalités

- Présentation : accueil, à propos, services, stack technique, parcours et projets.
- Projets : liste filtrable par catégorie, page de détail pour chaque projet, avec le README et les derniers commits récupérés depuis l'API GitHub.
- Comptes utilisateurs : inscription, connexion et modification du profil. L'authentification repose sur un token JWT stocké dans un cookie httpOnly, avec une expiration d'une heure.
- Rôles : les utilisateurs ont le rôle `USER` par défaut. Les routes de gestion du contenu sont réservées au rôle `ADMIN`.
- Formulaire de contact : envoi d'un email via Resend, avec une limite d'envoi gérée par Redis et un champ « honeypot » contre les robots.
- Compteur de visites.
- Interface responsive, du mobile au grand écran.

## API

L'API est disponible sur `http://localhost:3000` en local.

Légende : 🔓 publique · 🔑 utilisateur connecté · 🛡️ administrateur

### Authentification

- `POST /auth/login` 🔓 — Connecte l'utilisateur et dépose le token dans un cookie httpOnly. Inaccessible si l'utilisateur est déjà connecté.
- `POST /auth/logout` 🔑 — Déconnecte l'utilisateur en supprimant le cookie.

### Utilisateurs

- `POST /users` 🔓 — Crée un compte (rôle `USER` par défaut). Inaccessible si l'utilisateur est déjà connecté.
- `GET /users/me` 🔑 — Renvoie les informations de l'utilisateur connecté.
- `PATCH /users` 🔑 — Modifie le prénom, le nom ou l'email de l'utilisateur connecté.
- `DELETE /users` 🔑 — Supprime le compte de l'utilisateur connecté.

### Projets

- `GET /projects` 🔓 — Liste tous les projets.
- `GET /projects/count` 🔓 — Renvoie le nombre de projets.
- `GET /projects/:id` 🔓 — Renvoie le détail d'un projet.
- `POST /projects` 🛡️ — Ajoute un projet.
- `PATCH /projects/:id` 🛡️ — Modifie un projet.
- `DELETE /projects/:id` 🛡️ — Supprime un projet.

### Stack

- `GET /stacks` 🔓 — Liste les technologies.
- `GET /stacks/count` 🔓 — Renvoie le nombre de technologies.

### Statistiques

- `GET /reload` 🔓 — Renvoie le nombre de visites.
- `POST /reload` 🔓 — Incrémente le compteur de visites.

### Contact

- `POST /contact` 🔓 — Envoie un message par email. Limité à quelques envois par heure et par adresse IP.

## Base de données

MySQL, avec quatre tables. Le script de création se trouve dans la section Installation.

### `users`

Les comptes utilisateurs.

- `id` : identifiant, clé primaire.
- `name` et `firstname` : nom et prénom.
- `email` : adresse email, unique.
- `password` : mot de passe haché.
- `role` : `USER` ou `ADMIN` (`USER` par défaut).
- `created_at` : date de création du compte.

### `projects`

Les projets affichés sur le site.

- `id` : identifiant, clé primaire.
- `name` : nom du projet, unique.
- `type` : `Développement Web`, `Développement Application` ou `Autres`.
- `description` : description du projet.
- `thumbnail` : image de présentation.
- `github_url` et `live_url` : liens vers le dépôt GitHub et le site en ligne.
- `technologies` : liste des technologies utilisées, au format JSON.
- `status` : `En cours`, `Terminé` ou `Archivé`.
- `featured` : projet mis en avant ou non.
- `created_at` et `updated_at` : dates de création et de dernière modification.

### `stack`

Les technologies de la section Stack.

- `id` : identifiant, clé primaire.
- `name` : nom de la technologie.
- `category` : catégorie (Front-end, Back-end…).
- `icon` : nom de l'icône associée.
- `created_at` et `updated_at` : dates de création et de dernière modification.

### `visits`

Le compteur de visites du site, sur une seule ligne (`id = 1`).

- `id` : identifiant, clé primaire.
- `nombre` : nombre de visites.

Redis est utilisé pour la limite d'envoi du formulaire de contact.

## Installation

Prérequis : Git et Docker.

1. Cloner le dépôt :

```bash
git clone https://github.com/MNolhan/Nolhan-Portfolio.git
cd Nolhan-Portfolio
```

2. Créer les fichiers d'environnement à partir des modèles, puis remplir les valeurs (voir la section suivante) :

```bash
cp Backend-Portfolio/.env.example Backend-Portfolio/.env
cp Frontend-Portfolio/.env.example Frontend-Portfolio/.env
```

3. Lancer le projet :

```bash
docker compose up --build
```

4. Ouvrir le site sur `http://localhost:5173`. L'API répond sur `http://localhost:3000`.

5. Créer les tables dans la base MySQL :

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','USER') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL UNIQUE,
    type            ENUM('Développement Web', 'Développement Application', 'Autres') NOT NULL DEFAULT 'Autres',
    description     TEXT NOT NULL,
    thumbnail       VARCHAR(500),
    github_url      VARCHAR(500),
    live_url        VARCHAR(500),
    technologies    JSON,
    status          ENUM('En cours', 'Terminé', 'Archivé') NOT NULL DEFAULT 'Terminé',
    featured        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE stack (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE visits (
  id INT PRIMARY KEY,
  nombre INT NOT NULL DEFAULT 0
);

INSERT INTO visits (id, nombre) VALUES (1, 0);
```

## Variables d'environnement

### Backend (`Backend-Portfolio/.env`)

- `PORT` : port de l'API (3000 par défaut).
- `DB_HOST` : hôte de la base MySQL.
- `DB_USER` : utilisateur MySQL.
- `DB_PASSWORD` : mot de passe MySQL.
- `DB_NAME` : nom de la base.
- `REDIS_URL` : adresse de Redis.
- `JWTKEY` : clé secrète utilisée pour signer les tokens JWT.
- `RESEND_API_KEY` : clé d'API Resend pour l'envoi des emails.
- `NODE_ENV` : `production` en ligne, pour activer les cookies sécurisés.

### Frontend (`Frontend-Portfolio/.env`)

- `VITE_API_URL` : adresse de l'API (`http://localhost:3000` en local).

Les fichiers `.env` ne sont jamais versionnés.

## Arborescence

```
Nolhan-Portfolio/
├── Backend-Portfolio/
│   ├── src/
│   │   ├── infra/                       # connexions : MySQL (db.js) et Redis (RedisClient.js)
│   │   ├── middlewares/
│   │   │   ├── auth.js                  # vérifie le token JWT du cookie
│   │   │   ├── admin.js                 # réserve une route au rôle admin
│   │   │   ├── blockIfAuthenticated.js  # bloque login et inscription si déjà connecté
│   │   │   └── RateLimiting.js          # limite le nombre de requêtes avec Redis
│   │   ├── routes/
│   │   │   ├── analytics/               # compteur de visites
│   │   │   ├── contact/                 # envoi du formulaire de contact
│   │   │   ├── infra/                   # envoi d'emails (mailer.js)
│   │   │   ├── projects/                # CRUD des projets
│   │   │   ├── stacks/                  # lecture de la stack
│   │   │   └── users/                   # comptes, connexion, déconnexion
│   │   └── server.js                    # point d'entrée de l'API
│   ├── Dockerfile
│   └── .env.example
├── Frontend-Portfolio/
│   ├── src/
│   │   ├── assets/         # images, CV
│   │   └── v2/
│   │       ├── components/ # composants réutilisables
│   │       ├── pages/      # pages et sections du site
│   │       ├── router/     # routes de l'application
│   │       └── styles/     # SCSS : variables, composants, layouts, pages
│   ├── Dockerfile          # build avec Node, service avec nginx
│   ├── nginx.conf.template
│   └── .env.example
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Auteur

Nolhan Marteau

- Site : https://www.nolhandev.fr
- LinkedIn : https://www.linkedin.com/in/nolhan-marteau/
- GitHub : https://github.com/MNolhan
- Email : mrt.nolhan@gmail.com

## Licence

Ce projet est sous licence **MIT**.