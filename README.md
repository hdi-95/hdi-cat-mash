# HdiCatMash

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 20.3.0.

## Description

HdiCatMash est une application Angular permettant aux utilisateurs de voter pour leurs chats préférés. Les données de vote sont stockées de manière sécurisée dans une base de données Supabase, offrant une solution cloud fiable et performante. L’application utilise Angular 20 en mode zone-less pour des performances optimisées et intègre NGX-Translate pour supporter plusieurs langues.

## Fonctionnalités principales

- Vote en temps réel sur des paires de chats.
- Visualisation des scores et classements.
- Interface multilingue avec sélection via drapeaux 🇫🇷 / 🇬🇧.
- Sauvegarde des votes sur [Supabase](https://supabase.com/). (à réactiver en cas d'inactivité)
- Chargement optimisé avec gestion des états (loading, erreur).
- Tests unitaires couvrant les composants critiques.

## Serveur de développement

Pour lancer un serveur de développement local :

ng serve

Une fois démarré, ouvre ton navigateur à l’adresse `http://localhost:4200/`. L’application se recharge automatiquement à chaque modification des sources.

utilisé json/scores.json dans ApiService


## Fonctionnalités ajoutées avec plus de temps

- Ajout d'une pagination dans la grille (`hdi-cats-grid`) pour améliorer la navigation dans les listes longues.
- Application rendue plus responsive pour une meilleure expérience sur tous les appareils (mobiles, tablettes, desktop).
- Renforcement de la couverture des tests unitaires avec des scénarios supplémentaires pour garantir la robustesse des composants.




