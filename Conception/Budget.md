# Document de Budgétisation
## Application Altheya — Tatouage Thérapeutique

**Version :** 1.0  
**Date :** 22 mai 2026  
**Auteurs :** MaxOuvrard, Dylan Bathig  
**Statut :** Draft  
**Référence DAT :** v4.0

---

## Table des matières

1. [Hypothèses de base](#1-hypothèses-de-base)
2. [Coûts d'infrastructure par phase](#2-coûts-dinfrastructure-par-phase)
3. [Coûts de développement](#3-coûts-de-développement)
4. [Coûts de distribution & stores](#4-coûts-de-distribution--stores)
5. [Coûts transactionnels Stripe](#5-coûts-transactionnels-stripe)
6. [Synthèse budgétaire](#6-synthèse-budgétaire)
7. [Seuils de passage de palier](#7-seuils-de-passage-de-palier)
8. [Risques budgétaires](#8-risques-budgétaires)

---

## 1. Hypothèses de base

### 1.1 Phases de croissance (référence DAT §2.1)

| Phase | Période | Tatoueurs | Clients | Contexte |
|---|---|---|---|---|
| **Lancement** | M0 – M6 | 100 – 300 | 500 – 2 000 | Déploiement progressif France |
| **Croissance** | M6 – M18 | ~800 | 5 000 – 20 000 | Plein régime France |
| **Scale** | M18+ | 800+ | 20 000 – 100 000 | Expansion possible |

### 1.2 Modèle de revenus retenu

| Source | Détail | Montant estimé |
|---|---|---|
| **Abonnement tatoueur** | Accès plateforme, gestion agenda, portfolio | ~29 €/mois/tatoueur |
| **Commission réservation** | % prélevé sur chaque acompte | 5 – 8 % |
| **Vente boutique** | Produits tatouage (aftercare, etc.) | Marge brute ~30 % |
| **Certification** | Badge tatoueur thérapeutique | ~199 € one-shot |

---

## 2. Coûts d'infrastructure par phase

### 2.1 Phase Lancement (M0 – M6)

| Service | Rôle | Plan | Coût/mois |
|---|---|---|---|
| **Vercel** | Hébergement Next.js (web + landing) | Pro | ~20 $ |
| **Railway** | Hébergement Laravel API | Starter | ~10 – 20 $ |
| **Supabase** | Base de données PostgreSQL + PostGIS | Pro | ~25 $ |
| **Upstash Redis** | Cache, sessions, queues Laravel Horizon | Pay-per-use | ~5 $ |
| **Cloudinary** | Stockage & transformation médias | Free tier (25 GB) | 0 $ |
| **Mapbox** | Cartographie tatoueurs | Free tier (50k chargements/mois) | 0 $ |
| **Stripe** | Paiements, abonnements, marketplace | % transactions | 0 $ fixe |
| **Resend** | Emails transactionnels (confirmations, alertes) | Free (3 000 emails/mois) | 0 $ |
| **Expo** | Build OTA, push notifications | Free | 0 $ |
| **GitHub Actions** | CI/CD | Free tier | 0 $ |
| **Nom de domaine** | altheya.fr + altheya.app | Annuel / 12 | ~2 $ |
| | | **Total mensuel estimé** | **~62 – 72 $** |

> **Soit environ 60 – 70 €/mois** au taux de change courant.

---

### 2.2 Phase Croissance (M6 – M18)

Passage sur des plans supérieurs à mesure que le trafic et le volume de données augmentent.

| Service | Plan | Coût/mois | Déclencheur de passage |
|---|---|---|---|
| **Vercel** | Pro | ~20 $ | Maintenu |
| **Railway** | Pro (2 instances) | ~40 $ | > 5k requêtes/heure |
| **Supabase** | Pro + extension stockage | ~50 $ | > 500 MB DB / 50k MAU |
| **Upstash Redis** | Scale | ~20 $ | > 10k commandes/jour |
| **Cloudinary** | Starter (225 GB) | ~89 $ | > 25 GB stockage médias |
| **Mapbox** | Pay-as-you-go | ~15 – 30 $ | > 50k chargements/mois |
| **Resend** | Pro (50k emails/mois) | ~20 $ | > 3k emails/mois |
| **Expo EAS Build** | Production | ~29 $ | Builds OTA fréquents |
| **Sentry** | Monitoring erreurs | ~26 $ | Mise en prod |
| **Nom de domaine** | | ~2 $ | Maintenu |
| | | **Total mensuel estimé** | **~285 – 320 $** |

> **Soit environ 265 – 300 €/mois.**

---

### 2.3 Phase Scale (M18+)

Passage vers une infrastructure plus robuste si > 20k utilisateurs actifs.

| Service | Changement | Coût/mois estimé |
|---|---|---|
| **Railway → Laravel Forge + Hetzner (Frankfurt)** | VPS dédié EU, contrôle total | ~40 – 60 $ |
| **Supabase** | Team plan | ~599 $ |
| **Cloudinary** | Advanced | ~249 $ |
| **Upstash** | Enterprise | ~100 $ |
| **Mapbox** | Pay-as-you-go (volume) | ~50 – 100 $ |
| **Vercel** | Maintenu ou migration | ~20 $ |
| **Autres services** | Resend, Sentry, Expo | ~80 $ |
| | **Total mensuel estimé** | **~1 100 – 1 200 $** |

> À ce stade, le CA généré (abonnements 800 tatoueurs × 29 € = **23 200 €/mois**) couvre largement l'infrastructure.

---

## 3. Coûts de développement

### 3.1 Équipe & répartition

| Profil | Périmètre principal | Statut |
|---|---|---|
| **MaxOuvrard** | Backend Laravel, API, architecture | Co-fondateur |
| **Cyrien** | Mobile React Native, AR | Co-fondateur |
| **Dylan Bathig** | Frontend Next.js, UI/UX | Co-fondateur |

> Phase amorçage : équipe fondatrice sans salaires. Coûts directs = infrastructure + licences.

### 3.2 Licences & outils de développement

| Outil | Usage | Coût |
|---|---|---|
| **JetBrains All Products Pack** | IDE (PhpStorm, WebStorm) | ~70 €/mois (x2 devs) → ~35 €/mois amortis ou 0 € si toolbox indie |
| **Figma** | Design UI/UX | ~15 €/mois (Starter) |
| **GitHub Team** | Repos privés, CI/CD | ~4 $/mois/utilisateur × 3 = ~12 $ |
| **Linear** | Gestion de projet / tickets | ~8 $/mois/utilisateur × 3 = ~24 $ |
| **Notion** | Documentation interne | ~10 $/mois (team) |
| | **Total mensuel** | **~80 – 100 €/mois** |

---

## 4. Coûts de distribution & stores

| Plateforme | Type | Coût |
|---|---|---|
| **Apple Developer Program** | Obligatoire pour publication iOS | **99 $/an** (~8,25 $/mois) |
| **Google Play Console** | Frais d'inscription unique | **25 $** (one-shot) |
| **Commission Apple App Store** | Sur achats in-app et abonnements | **15 – 30 %** du CA in-app |
| **Commission Google Play** | Sur achats in-app et abonnements | **15 – 30 %** du CA in-app |

> **Note importante** : les abonnements tatoueurs facturés hors de l'app (via web ou lien externe) ne sont pas soumis aux commissions des stores. Privilégier ce canal pour les abonnements SaaS.

---

## 5. Coûts transactionnels Stripe

### 5.1 Tarification Stripe (Europe)

| Type de transaction | Frais Stripe |
|---|---|
| Carte EU standard | 1,5 % + 0,25 € |
| Carte non-EU | 2,5 % + 0,25 € |
| Abonnement récurrent (Billing) | Inclus dans les frais carte |
| Stripe Connect (marketplace) | 0,25 % supplémentaire + 2 €/virement |

### 5.2 Simulation revenus M6 (800 tatoueurs)

| Flux | Volume mensuel | Frais Stripe estimés |
|---|---|---|
| Abonnements tatoueurs | 800 × 29 € = 23 200 € | ~380 € |
| Acomptes réservations (5 % com. Altheya) | ~500 réservations × 80 € moy. = 2 000 € prélevés | ~65 € |
| Boutique | ~2 000 € CA | ~55 € |
| **Total frais Stripe** | | **~500 €/mois** |

---

## 6. Synthèse budgétaire

### 6.1 Budget mensuel total par phase

| Poste | M0 – M6 | M6 – M18 | M18+ |
|---|---|---|---|
| Infrastructure | ~65 € | ~290 € | ~1 100 € |
| Outils dev & licences | ~90 € | ~90 € | ~90 € |
| Distribution (stores, annualisé) | ~8 € | ~8 € | ~8 € |
| Frais Stripe | ~50 € | ~500 € | ~2 000 € |
| **Total mensuel** | **~213 €** | **~888 €** | **~3 200 €** |

### 6.2 Budget de démarrage (M0 – M6) — Vue totale sur 6 mois

| Poste | Montant |
|---|---|
| Infrastructure (6 mois) | ~390 € |
| Outils dev & licences (6 mois) | ~540 € |
| Apple Developer Program (annuel) | ~92 € |
| Google Play Console (one-shot) | ~23 € |
| **Total M0 – M6** | **~1 050 €** |

> Budget de démarrage très contenu grâce aux free tiers (Cloudinary, Mapbox, Resend, Expo).

---

## 7. Seuils de passage de palier

| Indicateur | Seuil | Action budgétaire |
|---|---|---|
| Médias stockés | > 25 GB | Passage Cloudinary Starter (~89 $/mois) |
| Requêtes API | > 5k/h en pic | Ajout d'une instance Railway |
| Utilisateurs actifs DB | > 50k MAU | Supabase Team plan |
| Chargements cartes | > 50k/mois | Mapbox Pay-as-you-go actif |
| Emails transactionnels | > 3k/mois | Passage Resend Pro |
| Tatoueurs actifs | > 800 | Migration Forge + Hetzner envisageable |

---

## 8. Risques budgétaires

| Risque | Impact | Probabilité | Mitigation |
|---|---|---|---|
| **Explosion médias** | Cloudinary bascule payant rapidement | Moyen | Limiter les uploads initiaux, compresser côté client |
| **Commissions stores élevées** | 30 % sur abonnements in-app | Élevé | Facturer les abonnements hors store (web) |
| **Mapbox dépassement** | Coût non anticipé si FYP très utilisé | Faible | Limiter les chargements de tuiles, cache côté client |
| **Stripe Connect frais cachés** | Virements aux tatoueurs = 0,25 % + 2 €/virement | Moyen | Regrouper les virements (hebdomadaire vs quotidien) |
| **Supabase limits** | Dépassement du free tier sur DB size | Moyen | Surveiller la taille dès M2, budgéter le Pro dès M3 |
| **Ralentissement Railway** | Shared infra → performances variables | Faible | Prévoir migration Forge + Hetzner si besoin |