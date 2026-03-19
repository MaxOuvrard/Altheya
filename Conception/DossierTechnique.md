# Stratégie Technique & Architecture
## Application de Tatouage Thérapeutique & E-commerce

Ce document détaille les choix d'architecture, les outils et l'infrastructure nécessaires pour construire notre plateforme (du prototype MVP jusqu'à la version finale destinée au grand public). Il est conçu pour donner une vision claire à toute l'équipe : il fixe un cap technique rigoureux pour les développeurs, tout en restant compréhensible pour les profils non techniques (produit, marketing, direction).

---

## 1. Notre philosophie de développement (Le "Buy vs Build")

Notre application couvre un périmètre métier très large et sensible. Nous faisons de la mise en relation géolocalisée, nous gérons une messagerie sécurisée autour de zones corporelles (cicatrices, post-opératoire, mastectomies), nous opérons des paiements avec séparation des fonds (split de commissions), et nous gérons une boutique e-commerce classique.

Vouloir tout coder de zéro serait une erreur fatale qui épuiserait notre budget et notre temps. Pour éviter de construire une "usine à gaz", nous appliquons trois règles d'or :

* **Aller à l'essentiel (Time-to-market) :** Nous utilisons des frameworks "opinionated" (qui imposent des règles et de bonnes pratiques dès l'installation, comme Laravel). Cela permet aux développeurs de ne pas perdre des semaines à débattre sur la façon d'organiser les dossiers ou de recréer des systèmes basiques (comme la réinitialisation de mots de passe, l'envoi d'emails ou la sécurisation des API).
* **Déléguer la complexité légale et matérielle :** Le web moderne regorge de services spécialisés. La conformité bancaire (KYC, DSP2) et le stockage massif de médias haute définition sont délégués à des experts (Stripe pour l'argent, un fournisseur Cloud S3 pour les fichiers). Nous ne sommes ni une banque, ni un hébergeur de fichiers.
* **Séparer les domaines métiers :** Dès le premier jour, le code de la partie "Réservation thérapeutique" et celui de la "Boutique E-commerce" seront clairement séparés dans le code de l'API. Si la vente de crèmes cicatrisantes explose et nécessite des serveurs dédiés, nous pourrons séparer cette boutique physiquement sans casser la partie prise de rendez-vous.

---

## 2. Les défis de l'application (et comment on les relève)

| Le besoin métier | Le problème technique / légal | Notre solution architecturale |
| :--- | :--- | :--- |
| **Photos médicales sensibles** | Stocker des données de santé est strictement encadré par la loi (RGPD renforcé). Une fuite de données détruirait la confiance en notre plateforme. | Base de données et fichiers hébergés sur des serveurs certifiés **HDS** (Hébergeur Données de Santé) en France. Chiffrement AES-256 en base et TLS 1.3 sur le réseau. |
| **Paiements et commissions** | Encaisser un client pour le compte d'un tiers (le tatoueur) exige un agrément bancaire lourd. Sans ça, c'est illégal. | Utilisation de **Stripe Connect**. L'argent transite sur un compte de cantonnement (escrow) : Stripe prélève notre commission et reverse le reste automatiquement au tatoueur. |
| **Messagerie en temps réel** | Rafraîchir l'application toutes les 2 secondes pour voir si un tatoueur a répondu vide la batterie du téléphone et surcharge nos serveurs. | Mise en place de **WebSockets** (une connexion bidirectionnelle invisible maintenue ouverte) via Laravel Reverb pour un chat instantané. |
| **Boutique E-commerce** | Vendre des soins post-tatouage demande de gérer des paniers complexes, des frais de port et des abandons. | Gestion du catalogue via notre API, mais paiement final délégué à **Stripe Checkout** pour maximiser le taux de conversion et sécuriser la carte bancaire. |

---

## 3. Les outils qu'on va utiliser (La Stack Technique)

### 3.1. L'application Mobile : React Native + Expo

Au lieu de développer une l'application iPhone (en langage Swift) et une pour Android (en langage Kotlin), nous utiliserons une base de code unique.

#### Pourquoi Expo ?
Dans le monde de React Native, Expo est devenu incontournable. Sa version moderne (via *Prebuild* et les modules natifs) permet de coder en JavaScript/TypeScript tout en gardant un accès total et sans restriction au matériel du téléphone (appareil photo, géolocalisation en arrière-plan, notifications push natives).
#### Le super-pouvoir d'Expo (EAS Update)
Habituellement, quand on corrige un petit bug sur une application, il faut la renvoyer à Apple et Google et attendre 48h de validation. Avec Expo EAS Update, on peut pousser des corrections mineures (texte, couleur, petit bug de bouton) directement sur le téléphone des utilisateurs à la prochaine ouverture de l'app, de manière totalement invisible.
#### L'expérience utilisateur (UX)
Nous coderons en TypeScript pour éviter un maximum de bugs. Nous utiliserons des outils modernes de "mise en cache" (comme *React Query*) pour que l'application s'affiche instantanément même si l'utilisateur capte mal la 4G (en affichant les données sauvegardées lors de la dernière connexion).

### 3.2. Le Cerveau (L'API Backend) : Laravel (PHP 8.3)

Laravel sera le "chef d'orchestre" de notre plateforme. C'est lui qui détient les règles de l'entreprise. Il agit comme une API RESTful : il n'affiche pas de pages web, il se contente de recevoir les demandes de l'application mobile, de faire les calculs, et de renvoyer de la donnée pure (du JSON). Nous l'avons choisi pour son écosystème ultra-complet qui nous fait gagner des mois de travail :

#### Base de données (Eloquent ORM)
C'est un outil intégré qui traduit notre code en requêtes de base de données. Il rend la gestion des relations évidente (ex: récupérer un *Patient* qui a plusieurs *Rendez-vous*, qui ont chacun une *Facture* et des *Messages* liés).
#### Sécurité des connexions (Sanctum)
Gère ce qu'on appelle les "Tokens" (jetons sécurisés). Quand un utilisateur se connecte, l'API lui donne un jeton. À chaque action, l'app mobile présente ce jeton pour prouver son identité.
#### Paiements (Cashier)
Un package officiel Laravel conçu spécifiquement pour dialoguer avec Stripe. Il gère tout seul la vérification des paiements validés, les échecs de carte bancaire, et la génération des factures PDF.
#### Messagerie (Reverb)
Intégré en 2024 à Laravel, c'est un serveur WebSocket ultra-rapide. Avant, il fallait créer un serveur séparé (souvent en Node.js) juste pour le chat. Maintenant, tout reste dans Laravel, ce qui simplifie énormément la maintenance.

### 3.3. Base de données et Tâches de fond

#### PostgreSQL
C'est notre base de données principale. Solide comme un roc, elle a été choisie plutôt que MySQL grâce à son extension **PostGIS**. C'est ce qui nous permet de faire des calculs géospatiaux complexes ultra-rapides. C'est grâce à ça qu'on peut dire à l'appli : *"Trouve-moi tous les tatoueurs certifiés en reconstruction mammaire dans un rayon de 50 km autour de la position GPS du patient"*.
#### Redis (La mémoire courte et le gestionnaire de tâches)
Redis est une base de données qui vit dans la mémoire vive (RAM) du serveur. Il est incroyablement rapide. On l'utilise pour deux choses : le cache (stocker les résultats des recherches fréquentes pour soulager PostgreSQL) et les **Queues (files d'attente)**. Si 500 utilisateurs prennent un RDV en même temps, Laravel confie l'envoi des 500 emails de confirmation et la génération des 500 factures à Redis. Redis les met en file d'attente et les traite en arrière-plan (background jobs) sans faire ramer l'application pour les utilisateurs.

### 3.4. Le stockage des médias (Cloud S3 + CDN)

Dans une application où le visuel est roi (portfolio des artistes) et où les photos sont des données de santé (photos de cicatrices envoyées dans le chat privé), la gestion des fichiers est vitale.
On ne stocke **aucune** image sur les disques de nos propres serveurs. Cela complexifie les sauvegardes et sature vite l'espace.

* Les images sont envoyées directement depuis le téléphone vers un service **Object Storage compatible S3** (ex: Scaleway en France).
* **Protection HDS (Secret Médical) :** Lorsqu'un tatoueur veut voir la photo clinique envoyée par un patient, notre API vérifie qu'il a le droit de la voir, puis génère une "URL signée". C'est un lien chiffré valable uniquement pendant 5 minutes. S'il copie ce lien et le donne à quelqu'un d'autre une heure plus tard, le lien affichera une erreur. L'image disparaît ainsi du web public.
* **CDN (Content Delivery Network) :** À l'inverse, pour les photos publiques (le book du tatoueur), les images passent par un réseau de serveurs relais (CDN) pour s'afficher instantanément sur le téléphone du client, qu'il soit à Paris, Marseille ou Brest.

---

## 4. Sécurité et Santé (Contraintes Légales Incontournables)

Ce projet touchant au corps et à l'historique médical, l'architecture "Privacy by Design" (la sécurité dès la conception) n'est pas une option, c'est une obligation légale.

1. **Cloisonnement des données (RBAC - Role-Based Access Control) :** Les règles d'autorisation (Policies) sont codées en dur dans le cœur du backend. Un tatoueur ne pourra techniquement jamais trafiquer l'application pour interroger l'API et récupérer une conversation destinée à un autre tatoueur. Les droits sont stricts.
2. **Hébergement certifié HDS (Hébergeur de Données de Santé) :** C'est une obligation stricte en France dès que l'on manipule des données permettant d'identifier l'état de santé d'un individu. L'ensemble de notre infrastructure (serveurs applicatifs, base de données PostgreSQL, stockage de fichiers S3) devra être souscrit sur les offres spécifiques "HDS" de fournisseurs qualifiés (comme OVHcloud, Scaleway, AWS ou Azure régions France). Ces centres de données subissent des audits physiques et logiciels drastiques.

---

## 5. Comment on héberge tout ça (Infrastructure K3s)

Pour garantir que l'application reste rapide, ne plante jamais sous la charge, mais ne coûte pas une fortune au lancement, nous utilisons **Kubernetes**. Et plus précisément sa distribution allégée : **K3s**.

Kubernetes permet d'orchestrer nos applications sous forme de "conteneurs" (Docker). Plutôt que de payer très cher les versions managées par les géants américains, nous installerons K3s sur des VPS (Virtual Private Servers) loués en Europe. Cela divise notre facture d'hébergement par 5 tout en gardant une technologie de niveau entreprise.

* **Traefik (Le routeur) :** C'est le portier à l'entrée de notre infrastructure. Il reçoit le trafic internet, sécurise les connexions (force le HTTPS), et distribue intelligemment les requêtes vers l'API ou vers le serveur de chat en temps réel.
* **Staging (L'environnement de Pré-production) :** Un seul serveur modeste qui fait tourner une copie exacte de l'application. Il est relié aux environnements "Bacs à sable" (Test) de Stripe. C'est là que l'équipe teste et valide les nouveautés avant de les proposer au public.
* **Production (Le Live) :** Au minimum deux serveurs liés entre eux (un "Master" et un "Worker"). Si un composant matériel brûle chez l'hébergeur sur le serveur A, Kubernetes détecte la panne et bascule instantanément tout le trafic sur le serveur B. L'utilisateur mobile ne verra même pas de coupure.
* **Sauvegarde de la base de données :** Pour une sécurité absolue, la base de données PostgreSQL ne sera pas gérée à l'intérieur de Kubernetes, mais via un service "Managed Database" chez notre hébergeur. L'hébergeur s'occupe de faire des sauvegardes chiffrées automatiques tous les jours et nous permet de remonter le temps à la minute près (système PITR - Point In Time Recovery) en cas de fausse manipulation de notre part.

---

## 6. Qualité et Déploiement Automatisé (CI/CD)

L'objectif de cette plateforme est d'atteindre le **"Zéro régression"**. Quand on touche à la santé et au porte-monnaie des utilisateurs, on ne peut pas se permettre de casser une fonctionnalité en essayant d'en rajouter une nouvelle.

Aucun code n'est mis en production s'il n'a pas été validé de bout en bout par nos robots de test. Nous mettrons en place un pipeline CI/CD (Intégration et Déploiement Continus) via GitHub Actions ou GitLab CI.

Dès qu'un développeur propose d'ajouter une modification au code, la machine prend le relais :

1. **Analyse statique :** Des outils (comme *PHPStan* pour le backend et *ESLint* pour le mobile) lisent le code pour vérifier qu'il respecte les standards et ne contient pas de failles de sécurité grossières.
2. **Lancement de la Matrice de Qualité (Les tests automatiques) :**

| Ce qu'on teste | L'outil utilisé | Exemple concret vérifié par la machine |
| :--- | :--- | :--- |
| **Logique métier (Backend)** | Pest (PHP) | Le robot simule un paiement et vérifie que la commission de la plateforme sur un panier e-commerce + l'acompte du tatouage tombent bien au centime près. |
| **Sécurité (API)** | Pest / HTTP Tests | Le robot fabrique un faux token expiré et essaie de lire un profil : il vérifie qu'il est bien rejeté par le système (Erreur 401 Unauthorized). |
| **Composants (Mobile)** | Jest (TypeScript) | Le robot vérifie l'écran de l'appli : le bouton "Valider le RDV et payer" doit rester strictement inactif tant que les cases de consentement aux risques médicaux ne sont pas cochées. |
| **Parcours complet (E2E)** | Maestro | C'est le test ultime. Un automate lance l'app mobile compilée, clique partout comme un humain, crée un compte, cherche un tatoueur, prend un RDV et envoie un message dans le chat. |

3. **Déploiement invisible (Rolling Update) :** Si et seulement si la machine valide ces 4 étapes (tous les voyants sont au vert), le système compile la nouvelle version et l'envoie sur le cluster K3s de production. Kubernetes va alors remplacer petit à petit les anciens conteneurs par les nouveaux, sans jamais interrompre le service. Nos utilisateurs n'auront **aucune coupure** ("Zero-downtime deployment").

---

## 7. Organisation de l'Équipe et Méthodologie (Le Workflow)

Avoir les bons outils ne suffit pas, il faut que l'équipe sache travailler ensemble sans se marcher sur les pieds. Nous utiliserons une approche agile et un standard de l'industrie pour la gestion du code : le **GitFlow**.

* **Gestion du code (Git / GitHub) :** * La branche `main` contient le code de production (l'application utilisée par les vrais clients). Personne n'a le droit d'y coder directement.
    * La branche `develop` contient le code de pré-production (pour les tests internes).
    * Quand un développeur travaille sur une fonctionnalité (ex: "Ajout du panier e-commerce"), il crée une branche isolée (`feature/panier`).
* **Code Review (Revue de code) :** Avant d'intégrer son travail, le développeur ouvre une "Pull Request" (PR). Un autre membre de l'équipe (ou le Lead Dev) doit obligatoirement relire le code et le valider. Cela permet de partager la connaissance et d'éviter les bugs évidents.
* **Sprints :** Le développement se fait par cycles courts de 2 semaines. À la fin de chaque sprint, on livre une version testable de l'application. On ne passe pas 6 mois dans un tunnel sans voir le produit.

---

## 8. Roadmap Technique (Le Découpage des Phases)

Vouloir tout sortir le premier jour est le meilleur moyen de ne jamais lancer le projet. Nous découpons le développement en trois grandes phases.

### Phase 1 : Le MVP (Minimum Viable Product) - La mise en relation
* **Objectif :** Valider le besoin utilisateur et générer les premières commissions.
* **Fonctionnalités :** * Inscription / Connexion sécurisée (Patient et Tatoueur).
    * Profils des tatoueurs et Portfolio (Hébergement S3 avec URLs éphémères).
    * Recherche par géolocalisation simple (PostGIS).
    * Prise de RDV avec versement de l'acompte (Stripe Connect).
    * Messagerie texte basique (WebSockets via Reverb).

### Phase 2 : La V1 - L'écosystème complet
* **Objectif :** Augmenter le panier moyen et fluidifier l'expérience.
* **Fonctionnalités :**
    * E-commerce intégré (Catalogue de soins post-tatouage, paiement via Stripe Checkout).
    * Messagerie avancée (Envoi sécurisé de photos médicales dans le chat privé).
    * Notifications Push natives pour les rappels de RDV ou les nouveaux messages.
    * Paiement du solde de la prestation directement via l'application.

### Phase 3 : Le Scale - Automatisation et Croissance
* **Objectif :** Absorber la charge et fidéliser.
* **Fonctionnalités :**
    * Abonnements mensuels pour les tatoueurs (mise en avant, outils de gestion).
    * Tableau de bord analytique (pour la plateforme et les professionnels).
    * Mise en place de l'auto-scaling sur Kubernetes (le cluster ajoute des serveurs tout seul quand le trafic augmente).

---

## 9. Budget et Coûts d'Infrastructure (Phase de Lancement)

L'avantage de notre architecture K3s sur VPS couplée à des services managés ciblés, c'est qu'elle permet d'avoir une robustesse de niveau "Entreprise" pour un budget de "Startup".

*Voici une estimation réaliste des coûts d'hébergement mensuels pour la mise en production de la V1 (pour environ 1 000 utilisateurs actifs) :*

| Service | Fournisseur cible (HDS / Europe) | Rôle dans l'architecture | Coût mensuel estimé |
| :--- | :--- | :--- | :--- |
| **Serveurs VPS (x2)** | Hetzner / OVH | Hébergement du cluster K3s (API Laravel, Redis, WebSockets). | ~ 30 € |
| **Base de Données** | Scaleway (Managed DB) | PostgreSQL managé avec sauvegardes automatiques. | ~ 35 € |
| **Stockage Médias** | Scaleway (Object Storage) | Hébergement des photos (Compatible S3). Payé au volume. | ~ 5 € |
| **Paiements** | Stripe | Prélèvement d'un pourcentage par transaction. | 0 € (Frais variables) |
| **Build App Mobile** | Expo (EAS) | Compilation de l'application et mises à jour OTA. | 0 € (Plan gratuit suffisant) |
| **Emails Transactionnels** | Resend / Postmark | Envoi des confirmations de RDV. | ~ 15 € |
| **Total estimé au lancement** | | | **~ 85 € / mois** |

*Note : Ce coût fixe d'environ 85 €/mois est extrêmement compétitif. Si nous avions choisi des solutions "Fully Managed" chez AWS ou Google Cloud pour un niveau de redondance équivalent, la facture de départ dépasserait facilement les 300 à 400 € mensuels.*