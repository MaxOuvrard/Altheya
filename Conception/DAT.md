# Document d'Architecture Technique (DAT)
## Application Tatouage Thérapeutique — Comparaison & Choix Technologiques

**Version :** 4.0  
**Date :** 27 février 2026  
**Auteurs :** Maxence Ouvrard, Dylan Bathig  
**Statut :** En vérification

---

## Table des matières

1. [Contexte & Contraintes](#1-contexte--contraintes)
2. [Hypothèses de charge](#2-hypothèses-de-charge)
3. [Framework Mobile](#3-framework-mobile)
4. [Framework Web (version restreinte)](#4-framework-web-version-restreinte)
5. [Backend & API](#5-backend--api)
6. [Base de données](#6-base-de-données)
7. [Paiements](#7-paiements)
8. [Stockage des médias & Protection des photos](#8-stockage-des-médias--protection-des-photos)
9. [Messagerie temps réel](#9-messagerie-temps-réel)
10. [Maps & Géolocalisation](#10-maps--géolocalisation)
11. [Authentification](#11-authentification)
12. [Hébergement & Déploiement](#12-hébergement--déploiement)
13. [Budget produit & pilotage financier](#13-budget-produit--pilotage-financier)
14. [Synthèse des choix retenus](#14-synthèse-des-choix-retenus)

---

## 1. Contexte & Contraintes

### 1.1 Produits à livrer

| Produit | Description |
|---|---|
| **App mobile** | Application iOS + Android pour patients et tatoueurs |
| **Web restreint** | Landing page + Shop (version web allégée) |

### 1.2 Contraintes identifiées

| Contrainte | Détail |
|---|---|
| 📍 Marché | France uniquement (pour l'instant) |
| 👥 Utilisateurs tatoueurs | ~800 tatoueurs visés |
| 👥 Utilisateurs clients | Inconnu — à estimer (cf. section 2) |
| 💰 Budget | Startup early-stage — coûts d'infrastructure à minimiser |
| 👨‍💻 Équipe | Petite équipe dev — productivité prioritaire |
| ⚖️ Légal | Données de santé (RGPD Art. 9) — consentement renforcé |
| 📸 Médias | Protection photos tatoueurs (anti-copie, DRM léger) |
| 💳 Paiements | Acomptes, paiements finaux, abonnements tatoueurs |

### 1.3 Fonctionnalités structurantes pour le choix techno

Ces fonctionnalités ont un impact direct sur les choix d'architecture :
- **Réalité augmentée** → contrainte mobile forte
- **Messagerie temps réel** → WebSocket / infra temps réel
- **Maps + géolocalisation** → coûts selon provider
- **Paiements complexes** (acompte, solde, abonnement, marketplace)
- **Protection DRM légère** sur les photos
- **Mode FYP** → scroll infini, performances médias

---

## 2. Hypothèses de charge

> ⚠️ Les données clients sont inconnues. On raisonne par scénarios pour dimensionner.

### 2.1 Scénarios utilisateurs

| Scénario | Tatoueurs | Clients | Contexte |
|---|---|---|---|
| **Lancement (M0–M6)** | 100–300 | 500–2 000 | Déploiement progressif France |
| **Croissance (M6–M18)** | 800 | 5 000–20 000 | Plein régime France |
| **Scale (M18+)** | 800+ | 20 000–100 000 | Expansion envisageable |

### 2.2 Implications pour les choix techniques

- **Charge faible au démarrage** → inutile de sur-architecturer
- **Pics probables** : tatoueurs actifs en soirée/week-end → auto-scaling simple
- **Médias dominants** : photos haute résolution → CDN obligatoire
- **Temps réel limité** : messagerie 1-to-1 uniquement (pas de chat de groupe massif)
- **Laravel + Octane** est largement dimensionné pour ces volumes

---

## 3. Framework Mobile

### 3.1 Options comparées

| Critère | React Native (Expo) | Flutter | Swift/Kotlin Natif |
|---|---|---|---|
| **Plateformes** | iOS + Android ✅ | iOS + Android ✅ | Une seule par défaut ❌ |
| **Langage** | TypeScript ✅ | Dart (à apprendre) ⚠️ | Swift / Kotlin ✅ |
| **Performance** | Bonne ⚠️ | Excellente ✅ | Excellente ✅ |
| **Réalité augmentée** | Vision Camera + ML Kit ⚠️ | Limité, plugins tiers ⚠️ | ARKit/ARCore natif ✅ |
| **Écosystème** | Très large (npm) ✅ | Croissant ⚠️ | Mature mais séparé ⚠️ |
| **Time-to-market** | Rapide ✅ | Moyen ⚠️ | Lent (2 codebases) ❌ |
| **Dev mobile dédié requis** | Non (fullstack JS) ✅ | Oui (Dart) ⚠️ | Oui (x2) ❌ |
| **Coût équipe** | Faible ✅ | Moyen ⚠️ | Élevé ❌ |

### 3.2 Cas particulier : Réalité Augmentée

| Option AR | Techno | Qualité | Complexité | Verdict |
|---|---|---|---|---|
| **React Native Vision Camera + ML Kit** | RN | Bonne | Moyenne | ✅ Suffisant V1 |
| **ViroReact** | RN | Moyenne | Faible | ⚠️ Simple mais limité |
| **ARKit / ARCore natif** | Swift/Kotlin | Excellente | Élevée | ❌ Surcoût non justifié V1 |
| **WebAR (8th Wall)** | Web in-app | Moyenne | Faible | ⚠️ En backup si RN insuffisant |

> **Décision** : L'AR en V1 peut être implémentée avec React Native Vision Camera. Migration partielle vers du natif envisageable en V2 si l'AR devient un pilier marketing fort.

### 3.3 ✅ Choix retenu : **React Native + Expo SDK 52**

### 3.4 Intégration AR cible : **Three.js + WebXR**

Pour la prévisualisation immersive, l'application intègre un module **WebAR** basé sur **Three.js** et l'API **WebXR**.

| Élément | Choix retenu | Rôle |
|---|---|---|
| **Moteur 3D** | **Three.js** | Rendu temps réel des overlays et objets 3D sur le flux caméra |
| **API immersive** | **WebXR** | Gestion des sessions AR et du tracking sur navigateurs compatibles |
| **Intégration mobile** | **Écran WebView dans l'app RN** | Réutiliser une base AR unique iOS/Android sans dupliquer du natif |
| **Fallback** | **Mode caméra 2D (Vision Camera)** | Continuité de service sur appareils ou navigateurs non compatibles WebXR |

#### Principes d'architecture

- Le calcul métier reste côté API Laravel ; le module AR consomme uniquement les assets médias signés et les métadonnées nécessaires.
- Les assets 3D (textures, masques, modèles) sont versionnés et servis via CDN pour limiter la latence.
- Le flux AR est isolé dans un module frontal indépendant afin de pouvoir évoluer vers du natif (ARKit/ARCore) sans refonte backend.

#### Contraintes et garde-fous

- **Compatibilité** : WebXR varie selon OS/navigateur ; matrice de tests obligatoire sur devices cibles.
- **Performance** : budget cible de rendu à 30-60 FPS, avec adaptation automatique de qualité (LOD, résolution, post-processing).
- **UX** : bascule explicite entre mode AR et mode aperçu photo pour éviter les blocages sur appareils non supportés.
- **Sécurité médias** : conservation des URLs signées Cloudinary, expiration courte, pas d'exposition d'originaux non watermarqués.

> **Décision** : la V1 AR est construite autour de **Three.js + WebXR** avec fallback 2D. Cette approche maximise la vitesse d'itération produit tout en gardant une trajectoire de migration vers AR natif si les besoins de tracking avancé augmentent.

---

## 4. Framework Web (version restreinte)

> Périmètre : Landing Page + Shop uniquement

### 4.1 Options comparées

| Critère | Next.js | Remix | Astro | Webflow (no-code) |
|---|---|---|---|---|
| **SEO** | Excellent (SSG/SSR) ✅ | Excellent ✅ | Excellent ✅ | Bon ⚠️ |
| **E-commerce / Shop** | Natif avec libs ✅ | Possible ⚠️ | Limité ❌ | Via intégrations ⚠️ |
| **Performance** | Très bonne ✅ | Très bonne ✅ | Excellente ✅ | Bonne ⚠️ |
| **Évolutivité vers app complète** | Excellente ✅ | Bonne ✅ | Limitée ⚠️ | Nulle ❌ |
| **Déploiement simple** | Vercel ✅ | Fly.io / Vercel ✅ | Vercel / Netlify ✅ | Hébergé ✅ |
| **Time-to-market** | Rapide ✅ | Rapide ✅ | Très rapide ✅ | Très rapide ✅ |

### 4.2 ✅ Choix retenu : **Next.js 15 + Vercel**

- Mix Landing SSG + Shop SSR parfaitement géré
- Déploiement zéro config sur Vercel
- Évolutif si le web grandit (dashboard tatoueur, espace client)

---

## 5. Backend & API

### 5.1 Architecture : Monolithe modulaire vs Microservices

| Critère | Monolithe modulaire | Microservices |
|---|---|---|
| **Complexité initiale** | Faible ✅ | Élevée ❌ |
| **Coût infra** | Faible ✅ | Élevé ❌ |
| **Pertinent à 800 tatoueurs** | Oui ✅ | Non, sur-dimensionné ❌ |
| **Évolutivité vers microservices** | Migration possible ✅ | N/A |
| **Débogage** | Simple ✅ | Complexe ❌ |
| **Temps de dev** | Rapide ✅ | Lent ❌ |

> **Décision** : **Monolithe modulaire** en phase 1. Les domaines (auth, booking, shop, messagerie) sont des modules Laravel séparés mais dans une seule application. Migration microservices si la charge dépasse 50k utilisateurs actifs.

### 5.2 Options Framework Backend

| Critère | **Laravel 11** | NestJS | Express.js | Symfony |
|---|---|---|---|---|
| **Langage** | PHP 8.3 ✅ | TypeScript ✅ | JS/TS ⚠️ | PHP 8.3 ✅ |
| **Architecture** | MVC modulaire, opinionated ✅ | Modulaire, Angular-like ✅ | Libre ⚠️ | Très structuré ⚠️ |
| **ORM intégré** | Eloquent (natif, excellent) ✅ | Prisma/TypeORM ⚠️ | Manuel ❌ | Doctrine ⚠️ |
| **Auth native** | Sanctum / Passport ✅ | Libs tierces ⚠️ | Libs tierces ❌ | Libs tierces ⚠️ |
| **WebSocket** | Laravel Reverb (officiel 2024) ✅ | Socket.io natif ✅ | Socket.io ⚠️ | Mercure ⚠️ |
| **Queue / Jobs async** | Horizon + Redis (natif) ✅ | BullMQ ⚠️ | Manuel ❌ | Messenger ⚠️ |
| **Paiements Stripe** | Laravel Cashier (natif) ✅ | SDK JS ⚠️ | SDK JS ⚠️ | SDK PHP ⚠️ |
| **Time-to-market** | Très rapide ✅ | Rapide ✅ | Moyen ⚠️ | Lent ❌ |
| **Documentation** | Excellente ✅ | Très bonne ✅ | Bonne ✅ | Bonne ✅ |
| **Performance (Octane)** | Très bonne ✅ | Excellente ✅ | Bonne ⚠️ | Bonne ⚠️ |
| **Courbe d'apprentissage** | Faible ✅ | Moyenne ⚠️ | Faible ✅ | Élevée ❌ |

### 5.3 Écosystème Laravel first-party

L'un des avantages majeurs de Laravel est son écosystème first-party qui couvre la quasi-totalité des besoins sans librairie tierce :

| Besoin | Package Laravel natif | Alternative NestJS |
|---|---|---|
| Auth API (tokens) | **Sanctum** | Passport.js + config manuelle |
| OAuth social (Google, Apple) | **Socialite** | Config OAuth2 manuelle |
| Abonnements Stripe | **Cashier** | Stripe SDK + code custom |
| Queues & jobs async | **Horizon** (dashboard inclus) | BullMQ + config |
| WebSocket serveur | **Reverb** | Socket.io |
| Notifications (push, email, SMS) | **Notifications** (natif) | Libs tierces |
| Performance (keep-alive) | **Octane** (Swoole/RoadRunner) | Fastify adapter |
| Monitoring queues | **Telescope** + **Horizon** | Datadog custom |
| Tests | **Pest PHP** | Jest |
| Scheduled tasks (CRON) | **Task Scheduling** natif | node-cron |

### 5.4 ✅ Choix retenu : **Laravel 11 + Octane (Swoole)**

---

## 6. Base de données

### 6.1 Besoins spécifiques

- **Géospatial** : recherche de tatoueurs par distance → PostGIS
- **Relations complexes** : users ↔ artists ↔ bookings ↔ reviews ↔ messages
- **Données sensibles** : pathologies (chiffrement au repos)
- **Charge** : faible à modérée (France, <100k users en phase 1)

### 6.2 Comparaison base principale

| Critère | PostgreSQL | MySQL | MongoDB | Supabase (PG managé) |
|---|---|---|---|---|
| **Géospatial (PostGIS)** | Excellent ✅ | Basique ⚠️ | Bon (GeoJSON) ✅ | Excellent ✅ |
| **Relations complexes** | Excellent ✅ | Bon ✅ | Inadapté ❌ | Excellent ✅ |
| **JSON / flexibilité** | JSONB natif ✅ | Limité ⚠️ | Natif ✅ | JSONB natif ✅ |
| **Eloquent (Laravel)** | ✅ | ✅ | Via lib tierce ⚠️ | ✅ |
| **Chiffrement données sensibles** | pgcrypto ✅ | Oui ✅ | Oui ✅ | pgcrypto ✅ |
| **Coût early-stage** | Selon hébergement ⚠️ | Selon hébergement ⚠️ | Atlas limité ⚠️ | Gratuit 500MB ✅ |
| **Migrations Laravel** | ✅ | ✅ | Partiel ⚠️ | ✅ |

### 6.3 Cache / Sessions

| Besoin | Redis (self-hosted) | Upstash (Redis serverless) |
|---|---|---|
| **Sessions Laravel** | ✅ | ✅ |
| **Cache API** | ✅ | ✅ |
| **Queues Laravel Horizon** | ✅ (requis) | ✅ |
| **WebSocket Reverb (pub/sub)** | ✅ | ✅ |
| **Coût early-stage** | ~$15/mois ⚠️ | Pay-per-use ✅ |
| **Gestion infra** | À héberger ⚠️ | Managé ✅ |

### 6.4 ✅ Choix retenu

| Composant | Choix | Justification |
|---|---|---|
| **Base principale** | **Supabase** (PostgreSQL + PostGIS) | Managé, géospatial, région EU, RGPD |
| **Cache / Sessions / Queues** | **Upstash Redis** | Serverless, compatible Horizon, pay-per-use |
| **ORM** | **Eloquent** (natif Laravel) | Natif, migrations, relations, très productif |

> **Note** : Supabase est PostgreSQL pur. Laravel s'y connecte exactement comme à un PostgreSQL classique. Zéro friction avec Eloquent.

---

## 7. Paiements

### 7.1 Besoins

- Acompte (% du devis) à la réservation
- Paiement du solde après RDV
- Abonnement mensuel tatoueur (SaaS)
- Paiement de la certification
- Boutique (paiement one-shot produits)
- Marketplace potentielle (encaissement + reversement tatoueur)

### 7.2 Comparaison

| Critère | **Stripe** | Mollie | PayPlug | Sumeria |
|---|---|---|---|---|
| **Acomptes** | ✅ Payment Intents | ✅ | Partiel ⚠️ | ❌ |
| **Abonnements** | ✅ Billing | ✅ | ❌ | ❌ |
| **Marketplace** | ✅ Connect | ⚠️ | ❌ | ❌ |
| **Laravel Cashier** | ✅ natif | ❌ | ❌ | ❌ |
| **Apple/Google Pay** | ✅ | ✅ | ⚠️ | ❌ |
| **SDK React Native** | ✅ officiel | ⚠️ | ❌ | ❌ |
| **Conformité DSP2/RGPD** | ✅ | ✅ | ✅ | ✅ |
| **Frais EU** | 1.5% + 0.25€ | 1.2% + 0.25€ | 1.2% + 0.25€ | Variable |
| **Dashboard** | Excellent ✅ | Bon ✅ | Moyen ⚠️ | Basique ❌ |

### 7.3 ✅ Choix retenu : **Stripe + Laravel Cashier**

- **Laravel Cashier** gère nativement les abonnements, factures et trials → zéro code custom
- Stripe Connect pour le modèle marketplace (reversement automatique aux tatoueurs)
- SDK React Native officiel pour le paiement in-app
- Seul provider couvrant l'ensemble des besoins

---

## 8. Stockage des médias & Protection des photos

### 8.1 Besoins

- Upload photos de réalisations (tatoueurs)
- Optimisation automatique (compression, WebP)
- Protection anti-téléchargement (URLs signées, expiration)
- Watermarking automatique
- Transformation à la volée (thumbnails, galerie, AR)
- Coût maîtrisé en early stage

### 8.2 Comparaison

| Critère | **Cloudinary** | AWS S3 + CloudFront | Uploadcare | Bunny.net |
|---|---|---|---|---|
| **Transformation images** | Natif, puissant ✅ | Via Lambda@Edge ⚠️ | Bon ✅ | Basique ⚠️ |
| **Watermarking auto** | Natif ✅ | Manuel (Lambda) ⚠️ | Natif ✅ | Non ❌ |
| **URLs signées** | ✅ | ✅ | ✅ | ✅ |
| **CDN intégré** | ✅ | ✅ | ✅ | ✅ excellent |
| **SDK Laravel** | ✅ | ✅ (Flysystem) | ✅ | ⚠️ |
| **Coût early-stage** | Gratuit 25GB ✅ | Pay-per-use ✅ | Gratuit 10GB ⚠️ | Très faible ✅ |
| **Complexité setup** | Faible ✅ | Élevée ⚠️ | Faible ✅ | Moyenne ⚠️ |

### 8.3 ✅ Choix retenu : **Cloudinary**

- Watermarking et protection des photos sans développement custom
- Transformations à la volée (crucial pour les vues galerie, FYP, AR)
- Free tier généreux pour la phase de démarrage
- URLs signées avec expiration pour le DRM léger

---

## 9. Messagerie temps réel

### 9.1 Besoins

- Messagerie 1-to-1 (patient ↔ tatoueur)
- Données potentiellement médicales → conformité RGPD impérative
- Pièces jointes (photos)
- Indicateur "lu / non lu"
- Notifications push sur nouveau message
- Volume faible (~800 tatoueurs, conversations ponctuelles)

### 9.2 Comparaison

| Critère | **Laravel Reverb** | Supabase Realtime | Stream Chat | Firebase RTDB |
|---|---|---|---|---|
| **Intégration Laravel** | Natif (first-party) ✅ | Via client JS ⚠️ | SDK PHP ✅ | SDK PHP ⚠️ |
| **Laravel Broadcasting** | ✅ natif | ⚠️ adapter custom | ❌ | ⚠️ |
| **Contrôle total données** | ✅ self-hosted | ✅ | ❌ SaaS tiers | ❌ Google |
| **Conformité RGPD EU** | ✅ | ✅ région EU | ⚠️ US par défaut | ❌ Google US |
| **Coût** | Infra incluse ✅ | Inclus Supabase ✅ | Gratuit <100 MAU ⚠️ | Gratuit limité ⚠️ |
| **Temps de dev** | Court (Broadcasting natif) ✅ | Moyen ⚠️ | Très court ✅ | Court ✅ |
| **SDK React Native** | Via Echo client ✅ | ✅ | ✅ | ✅ |
| **Scalabilité** | Bonne (Redis pub/sub) ✅ | Limitée ⚠️ | Excellente ✅ | Bonne ✅ |

> ⚠️ **Point critique RGPD** : les échanges peuvent contenir des informations médicales (photos de pathologies, descriptions). Héberger la messagerie chez un tiers américain (Firebase, Stream) est risqué sans DPA solide et transferts encadrés.

### 9.3 ✅ Choix retenu : **Laravel Reverb**

- Package officiel Laravel (sorti 2024), intégration zéro-friction avec Broadcasting
- Self-hosted → données restent sur notre infrastructure EU
- S'appuie sur Upstash Redis pour le pub/sub en multi-process
- Laravel Echo client disponible pour React Native

---

## 10. Maps & Géolocalisation

### 10.1 Besoins

- Affichage tatoueurs sur carte
- Recherche par rayon autour de l'utilisateur
- Filtres dynamiques (spécialité, certification, distance)
- Clustering de marqueurs
- Usage France uniquement

### 10.2 Comparaison

| Critère | **Mapbox** | Google Maps | Leaflet + OSM | Apple Maps |
|---|---|---|---|---|
| **Qualité carto France** | Excellente ✅ | Excellente ✅ | Bonne ✅ | Bonne ✅ |
| **SDK React Native** | ✅ | ✅ | ⚠️ wrapper communautaire | iOS uniquement ❌ |
| **SDK Web (Next.js)** | ✅ | ✅ | ✅ | ⚠️ |
| **Clustering natif** | ✅ | ✅ | Via plugins ⚠️ | ⚠️ |
| **Personnalisation** | Excellente ✅ | Limitée ⚠️ | Bonne ✅ | Limitée ⚠️ |
| **Coût early-stage** | 50k chargements/mois gratuits ✅ | $200 crédit/mois ✅ | Gratuit ✅ | Gratuit ✅ |
| **Coût à l'échelle** | ~$0.5/1000 tiles ⚠️ | Peut devenir cher ❌ | Gratuit ✅ | Gratuit ✅ |
| **RGPD / endpoint EU** | ✅ option EU | ⚠️ transferts US | ✅ | ✅ |

### 10.3 ✅ Choix retenu : **Mapbox**

- Meilleure personnalisation visuelle (identité de l'app)
- SDK unifié RN + Web
- Free tier suffisant pour le démarrage en France
- Endpoint EU disponible pour conformité RGPD

---

## 11. Authentification

### 11.1 Besoins

- Email / mot de passe
- OAuth Google + Apple (obligatoire App Store)
- Gestion des rôles (client, tatoueur, admin)
- Sessions sécurisées pour l'API mobile
- Onboarding post-inscription

### 11.2 Comparaison

| Critère | **Sanctum + Socialite** | Supabase Auth | Clerk | Firebase Auth |
|---|---|---|---|---|
| **OAuth Google / Apple** | ✅ via Socialite | ✅ natif | ✅ natif | ✅ natif |
| **Auth API mobile (tokens)** | ✅ Sanctum natif | ✅ | ✅ | ✅ |
| **Gestion des rôles** | ✅ Gates / Policies | Via JWT custom ✅ | ✅ | Via Custom Claims ⚠️ |
| **Contrôle total** | ✅ self-hosted | ✅ | ⚠️ SaaS | ⚠️ Google |
| **RGPD / données EU** | ✅ self-hosted | ✅ région EU | ⚠️ US par défaut | ❌ Google US |
| **Coût** | Inclus Laravel ✅ | Inclus Supabase ✅ | Gratuit <10k MAU ✅ | Gratuit ✅ |
| **Temps de dev** | Court ✅ | Court ✅ | Très court ✅ | Court ✅ |
| **MFA** | Via lib tierce ⚠��� | ✅ natif | ✅ natif | ✅ natif |

### 11.3 ✅ Choix retenu : **Laravel Sanctum + Socialite**

- Sanctum : auth API par tokens pour React Native
- Socialite : Google + Apple Sign-In natif Laravel
- Gates & Policies : gestion fine des rôles (client, tatoueur, admin)
- Données d'auth sur notre propre infra EU

---

## 12. Hébergement & Déploiement

### 12.1 Web (Next.js)

| Option | Coût early-stage | Simplicité | Performance France |
|---|---|---|---|
| **Vercel** | Gratuit → $20/mois ✅ | Très simple ✅ | CDN Europe ✅ |
| Netlify | Gratuit → $19/mois ✅ | Simple ✅ | CDN Europe ✅ |
| AWS Amplify | Pay-per-use ✅ | Moyen ⚠️ | ✅ |

**✅ Retenu : Vercel** — Zero config, preview deployments sur chaque PR.

### 12.2 Backend Laravel

| Option | Coût early-stage | Simplicité | Laravel-ready |
|---|---|---|---|
| **Railway** | $5–20/mois ✅ | Très simple ✅ | ✅ Docker |
| Render | $7+/mois ✅ | Simple ✅ | ✅ Docker |
| Fly.io | ~$10/mois ✅ | Simple ✅ | ✅ Docker |
| Forge + VPS (Hetzner/Scaleway) | ~$20/mois ✅ | Laravel natif ✅ | ✅ optimisé |
| AWS ECS | $50+/mois ❌ | Complexe ❌ | ✅ |

**✅ Retenu : Railway** pour le démarrage  
**Alternative** : **Laravel Forge + Hetzner** (VPS Frankfurt) si besoin de contrôle total et hébergement 100% EU.

### 12.3 Coût estimé mensuel (phase démarrage)

| Service | Plan | Coût/mois |
|---|---|---|
| Vercel | Pro | ~$20 |
| Railway (Laravel) | Starter | ~$10–20 |
| Supabase | Pro | ~$25 |
| Upstash Redis | Pay-per-use | ~$5 |
| Cloudinary | Free tier | $0 |
| Mapbox | Free tier | $0 |
| Stripe | % transactions | $0 fixe |
| **Total estimé** | | **~$60–70/mois** |

---

## 13. Budget produit & pilotage financier

> Objectif : disposer d'un cadre budgétaire concret pour piloter la roadmap et éviter la dérive des coûts avant product-market fit.

### 13.1 Hypothèses de montée en charge (3 ans)

| Indicateur | Année 1 | Année 2 | Année 3 |
|---|---:|---:|---:|
| **Tatoueurs actifs** | 150-300 | 400-800 | 800-1 200 |
| **Clients actifs (MAU)** | 1 000-3 000 | 6 000-20 000 | 20 000-60 000 |
| **Messages/jour (moyenne)** | 1 000-4 000 | 8 000-25 000 | 25 000-80 000 |
| **Photos stockées (cumul)** | 50k-150k | 200k-600k | 700k-2M |

### 13.2 Projection budgétaire sur 3 ans (hors salaires fondateurs)

| Bloc | Année 1 | Année 2 | Année 3 |
|---|---:|---:|---:|
| **Infrastructure & SaaS techniques** | 1 500-6 000 EUR | 6 000-18 000 EUR | 18 000-60 000 EUR |
| **Conformité, juridique, assurances** | 4 000-12 000 EUR | 6 000-18 000 EUR | 10 000-30 000 EUR |
| **Produit (design, QA, contenu, outils)** | 3 000-12 000 EUR | 8 000-25 000 EUR | 20 000-60 000 EUR |
| **Acquisition & marketing** | 5 000-20 000 EUR | 20 000-80 000 EUR | 60 000-250 000 EUR |
| **Marge d'imprévus (buffer)** | 2 000-8 000 EUR | 5 000-15 000 EUR | 15 000-40 000 EUR |
| **Total annuel cible** | **15 500-58 000 EUR** | **45 000-156 000 EUR** | **123 000-440 000 EUR** |

> **Repère** : la hausse principale provient de l'acquisition et du coût variable des médias/messages avec l'augmentation des utilisateurs actifs.

### 13.3 Trajectoire d'infrastructure mensuelle liée à la charge

| Poste infra | Année 1 (EUR/mois) | Année 2 (EUR/mois) | Année 3 (EUR/mois) |
|---|---:|---:|---:|
| **Backend Laravel (Railway/équivalent)** | 10-40 | 40-150 | 150-600 |
| **Base PostgreSQL (Supabase/équivalent)** | 25-80 | 80-300 | 300-1 200 |
| **Redis (Upstash/équivalent)** | 5-20 | 20-120 | 120-600 |
| **Médias (Cloudinary/CDN)** | 0-80 | 80-500 | 500-2 500 |
| **Maps & géolocalisation** | 0-40 | 20-150 | 100-500 |
| **Total infra mensuel cible** | **40-260** | **240-1 220** | **1 170-5 400** |

### 13.4 Ventilation cible du budget total

| Catégorie | Année 1 | Année 2 | Année 3 |
|---|---:|---:|---:|
| **Produit & développement** | 45-60% | 35-50% | 30-45% |
| **Acquisition / marketing** | 20-35% | 30-45% | 35-55% |
| **Infra & SaaS** | 8-15% | 12-20% | 15-25% |
| **Légal, conformité, comptabilité** | 8-15% | 8-15% | 8-15% |
| **Buffer** | 5-10% | 5-10% | 5-10% |

### 13.5 Garde-fous de pilotage (go / no-go)

- **Seuil infra** : si l'infrastructure dépasse **12% du MRR** pendant 3 mois, plan d'optimisation obligatoire (caching, compression média, revue des plans SaaS).
- **Seuil performance** : si la latence P95 API dépasse **400 ms** sur 2 sprints, investissement prioritaire sur la perf avant nouvelles features.
- **Seuil runway** : maintenir **12 mois de runway** minimum ; en dessous, gel des dépenses discrétionnaires.
- **Seuil compliance** : toute feature impliquant données de santé déclenche revue RGPD/sécurité avant release.
- **Seuil architecture** : migration vers architecture distribuée seulement avec saturation mesurée (coût, SLO, disponibilité), pas par anticipation.

### 13.6 Lecture financière synthétique

- **Année 1** : focus validation marché et coûts maîtrisés.
- **Année 2** : phase d'accélération France, budget tiré par acquisition et volume média.
- **Année 3** : phase de scale, coûts d'exploitation et de conformité deviennent structurants.

---

## 14. Synthèse des choix retenus

| Couche | Technologie retenue | Alternative écartée | Raison principale |
|---|---|---|---|
| **App mobile** | React Native + Expo | Flutter, Natif | Time-to-market, écosystème |
| **AR** | Three.js + WebXR (avec fallback RN Vision Camera) | ARKit/ARCore natif full custom | Vitesse d'itération, mutualisation cross-platform |
| **Web** | Next.js 15 + Vercel | Astro, Webflow | Évolutivité, shop dynamique |
| **Backend** | Laravel 11 + Octane | NestJS, Symfony | Productivité, écosystème natif |
| **Architecture** | Monolithe modulaire | Microservices | Charge faible, petite équipe |
| **WebSocket** | Laravel Reverb | Socket.io, Stream Chat | First-party, self-hosted, RGPD |
| **Auth** | Sanctum + Socialite | Clerk, Firebase | Natif Laravel, self-hosted EU |
| **Paiements** | Stripe + Cashier | Mollie, PayPlug | Cashier natif, couverture complète |
| **Base de données** | Supabase (PostgreSQL) | MySQL, MongoDB | Géospatial, RGPD EU, managé |
| **ORM** | Eloquent | Prisma, TypeORM | Natif Laravel, très productif |
| **Cache / Queues** | Upstash Redis | ElastiCache | Serverless, pay-per-use |
| **Médias** | Cloudinary | S3 + Lambda | Watermark et DRM sans code custom |
| **Maps** | Mapbox | Google Maps | Personnalisation, endpoint EU |
| **Hébergement web** | Vercel | Netlify | Intégration Next.js native |
| **Hébergement API** | Railway | AWS ECS | Simplicité, coût early-stage |

### Principe directeur

> **"Maximiser la vélocité de développement grâce à l'écosystème Laravel first-party, minimiser les coûts d'infrastructure, sans créer de dette technique bloquante pour la scale-up."**

Laravel couvre nativement (Cashier, Reverb, Sanctum, Socialite, Horizon, Octane) la quasi-totalité des besoins sans librairie tierce. La stack mobile et web reste en TypeScript (React Native + Next.js), les deux couches communiquant avec le backend Laravel via une API REST + WebSocket standard.
