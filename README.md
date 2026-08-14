# Nolhan-Portfolio
 
Portfolio personnel full-stack — vitrine de mes projets, mon parcours et mes compétences, avec un espace admin pour gérer le contenu dynamiquement.
 
## Contexte
 
Après avoir livré une première version en HTML/CSS/JS vanilla, j'ai voulu repartir de zéro et reconstruire le site en React pour structurer le code en composants réutilisables, gérer du contenu dynamique (projets, statistiques) depuis une vraie base de données, et ajouter un espace admin pour gérer le site sans avoir à toucher au code à chaque mise à jour.
 
## Défis techniques
 
- **Authentification & sécurité** — mise en place d'un système JWT complet (login/signup) en évitant l'énumération d'utilisateurs (mêmes messages d'erreur pour "email inconnu" et "mot de passe incorrect") et sans jamais exposer les erreurs serveur brutes au client.
- **Base de données** — passage de multiples pools MySQL créés à chaque route vers un pool unique partagé, pour éviter l'épuisement des connexions en production.
- **Déploiement** — diagnostic d'un crash SIGTERM récurrent sur Railway : élimination progressive des causes possibles (variables d'environnement, configuration du pool, module type) jusqu'à stabilisation du déploiement.
## Stack
 
- **Frontend** : React 19, React Router 7, Sass, Vite
- **Backend** : Node.js, Express 5, MySQL2, JWT, bcrypt, Zod, Redis
## Installation
 
```bash
git clone https://github.com/MNolhan/Nolhan-Portfolio.git
cd Nolhan-Portfolio
```
 
### Frontend
 
```bash
cd Frontend-Portfolio
npm install
npm run dev
```
 
### Backend
 
```bash
cd Backend-Portfolio
npm install
npm run dev
```
 
## Configuration
 
Créez un fichier `.env` dans `Backend-Portfolio/` avec les variables suivantes :
 
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio
JWT_SECRET=your_secret_key
```
 
## Fonctionnalités
 
- Présentation dynamique des projets, du parcours et des compétences
- Espace admin sécurisé (authentification JWT, mots de passe hashés avec bcrypt)
- Validation des données via Zod côté backend
- Filtrage des projets par technologie
- Statistiques en direct (nombre de projets, technos utilisées, visites)
## Scripts disponibles
 
- `npm run dev` — lance le serveur de développement
- `npm run build` — build de production (frontend)
- `npm run lint` — vérifie le code avec ESLint

## Licence
 
MIT — libre d'utilisation et de modification.
