# Stratégie Technique & Architecture

**Version :** 1.0  
**Date :** 16 mars 2026  
**Auteurs :** Maxence Ouvrard, Dylan Bathig  
**Statut :** Corrigé

## Application de Tatouage Thérapeutique
Le présent document a pour objectif de détailler les choix d'architecture, les outils et l'infrastructure nécessaires pour construire notre plateforme du prototype MVP jusqu'à la version finale destinée au grand public.

## 1. La stack technique

Dans cette partie, nous allons aborder les choix techniques pour les différents éléments que nous avons envisagés.

### 1.1. L'application mobile

Plutôt que d'écrire une application native séparée pour iOS et Android, nous choisissons une base de code unique en **React Native + Expo**. Le développement se fera en **TypeScript** pour réduire les bogues et profiter de l'écosystème. Expo nous permet d'accéder aux fonctions du téléphone (appareil photo, géolocalisation et notifications) et d'envoyer des mises à jour rapides via EAS Update sans attendre les stores. Pour l'expérience utilisateur, nous utiliserons une gestion du cache moderne (p. ex. React Query) afin que l'interface s'affiche instantanément même avec une connexion faible.

### 1.2. L'API back-end

Le back-end sera développé avec **Laravel (PHP 8.3)** et exposera une **API REST** consommée par l'application et le site web. Nous utiliserons Eloquent pour gérer la base de données, Sanctum pour l'authentification par jetons, Cashier pour l'intégration des paiements (Stripe) et un service WebSocket performant pour la messagerie en temps réel. Cette pile permet d'écrire la logique métier côté serveur et de renvoyer des réponses JSON simples à l'interface.

### 1.3. Réalité augmentée

L'AR servira à visualiser un tatouage sur la peau via la caméra du smartphone. Techniquement, nous viserons une implémentation WebXR associée à un moteur 3D (Three.js) pour garder la compatibilité iOS/Android et contrôler précisément le rendu (transparence, texture de peau, rotation, suivi en temps réel).

Sur l'AR et la préparation des images, il faut garder en tête deux points techniques importants. D'une part, la déformation et le relief du corps sont variables : contrairement au visage, la topographie n'a pas de repères fixes, l'algorithme doit donc s'adapter pour éviter que le tatouage semble « flotter ». D'autre part, le format des œuvres doit être adapté ; les tatoueurs fourniront des fichiers détourés (PNG avec transparence) pour garantir un rendu naturel.

### 1.4 Présence web — landing page et boutique

Bien que l'application mobile soit notre produit principal, un site web est la porte d'entrée pour attirer des utilisateurs via Google. Nous utiliserons **Next.js** avec rendu côté serveur (SSR) pour avoir des pages rapides et bien indexées par les moteurs de recherche. Le site hébergera la landing page, la boutique et les profils des tatoueurs. Ces pages serviront aussi de points d'atterrissage pour les campagnes publicitaires (Google Ads) et amélioreront la conversion vers l'application mobile.

## 2. Base de données

Maintenant, abordons la technologie choisie pour la base de données.

Notre base principale sera **PostgreSQL**, choisie notamment pour ses extensions possibles (PostGIS) si nous avons besoin de fonctionnalités géospatiales. Nous mettrons en place des mécanismes de haute disponibilité (réplication et basculement), du pooling de connexions (p. ex. PgBouncer) pour gérer la concurrence, ainsi qu'une politique de sauvegardes chiffrées et de restauration en point-in-time pour limiter la perte de données. Pour l'observabilité et le diagnostic de performance, des extensions comme `pg_stat_statements` seront activées et des alertes surveilleront la latence et l'utilisation CPU/RAM.

Pour le cache, la gestion des sessions et les files d'attente, nous utiliserons **Redis** : il accélère les réponses fréquentes et permet de décharger les tâches en arrière-plan (envoi d’e-mails, tâches lourdes) via des workers (p. ex. Laravel Horizon). Redis pourra aussi servir pour des compteurs et verrous légers (limitation de débit, sessions), avec une configuration adaptée pour la persistance et la sécurité.

## 3. Stockage des médias

Continuons avec un point important pour la confiance et la réglementation : le stockage des médias.

Premièrement, nous ne stockerons pas d'images durablement sur les disques de nos serveurs applicatifs. Les photos sensibles (cicatrices, post-opératoires) seront hébergées chez un fournisseur certifié **HDS** et servies via des URL signées à durée limitée pour réduire le risque de fuite. Les images publiques (portfolios, réalisations) passeront par un CDN pour un affichage rapide.

Les œuvres destinées à l'AR devront être fournies au format PNG détouré (transparence) pour garantir un rendu naturel et faciliter l'intégration côté client ; elles seront servies via CDN ou hébergées en HDS selon leur sensibilité.

## 5. Sécurité et conformité

Concernant les données, la sécurité est une priorité absolue étant donné la nature médicale des informations. Le principe sera de donner le minimum d'accès nécessaire à chaque acteur. Les conversations privées et les photos seront chiffrées et cloisonnées pour empêcher toute consultation non autorisée. Les données sensibles (la base de données et les stockages d'images) seront hébergées sur des infrastructures certifiées HDS dès le départ afin de respecter la réglementation française et protéger la confiance des utilisateurs.

Du côté du tatoueur, pour garantir la sécurité de ses œuvres, nous mettrons en place deux mesures : empêcher les captures d'écran et appliquer un filigrane pour réduire la qualité d'une photo prise depuis un autre appareil mobile.

## 6. Hébergement et architecture

Passons à l'hébergement et l'architecture. L'architecture sépare le stockage des données du code applicatif. Les services critiques (PostgreSQL, Redis, stockage d'objets) seront fournis par des services managés avec sauvegardes chiffrées. L'API et les WebSockets tourneront en conteneurs orchestrés (Kubernetes / K3s) et Traefik gèrera le HTTPS et la répartition de charge. Une pré-production reproduira l'environnement pour valider les changements avant mise en production.

Cette approche facilite la maintenance et la migration des composants vers d'autres fournisseurs si nécessaire.

## 7. Qualité et déploiement

Terminons en abordant la qualité et le déploiement. Pour cela, nous allons utiliser un pipeline CI/CD (comme GitHub Actions) avec une matrice de tests automatisés : tests unitaires et d'intégration backend via Pest, tests unitaires et de composants frontend via Jest et tests E2E avec Maestro pour valider les parcours clés (connexion, recherche, prise de rendez‑vous, chat). Les builds ne sont promréalisés que si la suite de tests réussit.

Les validations sont d'abord effectuées en pré‑production, fidèle à la production. Les déploiements se font en rolling updates via Kubernetes afin de garantir une disponibilité continue et d'éviter toute interruption de service.