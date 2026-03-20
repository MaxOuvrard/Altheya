# Stratégie Technique & Architecture
## Application de Tatouage Thérapeutique & E-commerce

Ce document détaille les choix d'architecture, les outils et l'infrastructure nécessaires pour construire notre plateforme (du prototype MVP jusqu'à la version finale destinée au grand public). 

---

## 2. Les défis de l'application

| Le besoin métier               | Le problème technique / légal | Notre solution architecturale                                                                                                                                           |
|:-------------------------------| :--- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Photos médicales sensibles** | Stocker des données de santé est strictement encadré par la loi (RGPD renforcé). Une fuite de données détruirait la confiance en notre plateforme. | Base de données et fichiers hébergés sur des serveurs certifiés **HDS** (Hébergeur Données de Santé) en France. Chiffrement AES-256.                                    |
| **Paiements et commissions**   | Encaisser un client pour le compte d'un tiers (le tatoueur) exige un agrément bancaire lourd. Sans ça, c'est illégal. | Utilisation de **Stripe**. L'argent transite sur un compte : Stripe prélève notre commission et reverse le reste automatiquement au tatoueur.                           |
| **Messagerie en temps réel**   | Rafraîchir l'application toutes les 2 secondes pour voir si un tatoueur a répondu vide la batterie du téléphone et surcharge nos serveurs. | Mise en place de **WebSockets** (une connexion bidirectionnelle invisible maintenue ouverte) via Laravel Reverb pour un chat instantané.                                |
| **Boutique E-commerce**        | Vendre des soins post-tatouage demande de gérer des paniers complexes, des frais de port. | Gestion du catalogue via notre API, mais paiement final délégué à **Stripe** pour maximiser le taux de conversion et sécuriser la carte bancaire.                       |
| **Visualisation en AR**         | Superposer un tatouage numérique sur un corps en relief (cicatrices, courbes) demande des calculs 3D lourds qui peuvent faire ramer un téléphone classique. | TODO: Utilisation de moteurs de rendu natifs optimisés (ARKit/ARCore via React Native) pour calculer la déformation de manière fluide et sans surcharger l'application. |
---

## 3. La stack technique

### 3.1. L'application Mobile : React Native + Expo

Au lieu de développer une application iPhone (en langage Swift) et une pour Android (en langage Kotlin), nous utiliserons une base de code unique.

#### Pourquoi Expo ?
Dans le monde de React Native, Expo est devenu incontournable. Sa version moderne (via *Prebuild* et les modules natifs) permet de coder en JavaScript/TypeScript tout en gardant un accès total et sans restriction au matériel du téléphone (appareil photo, géolocalisation en arrière-plan, notifications push natives).

#### Le super-pouvoir d'Expo (EAS Update)
Avec Expo EAS Update, on peut pousser des corrections mineures (texte, couleur, petit bug de bouton) directement sur le téléphone des utilisateurs à la prochaine ouverture de l'app, de manière totalement invisible (sans attendre la validation Apple/Google).

#### L'expérience utilisateur (UX)
Nous utiliserons TypeScript pour éviter un maximum de bugs. Nous utiliserons des outils modernes de "mise en cache" (comme *React Query*) pour que l'application s'affiche instantanément même si l'utilisateur capte mal la 4G.

### 3.2. L'API Backend : Laravel (PHP 8.3)

Laravel sera la base de notre plateforme.

Il agit comme une API RESTful : il n'affiche pas de pages web, il se contente de recevoir les demandes de l'application mobile, de faire les calculs, et de renvoyer de la donnée pure (du JSON).

#### Base de données (Eloquent ORM)
C'est un outil intégré qui traduit notre code en requêtes de base de données. Il rend la gestion des relations évidente.

#### Sécurité des connexions (Sanctum)
Gère les "Tokens" (jetons sécurisés) pour prouver l'identité de l'utilisateur à chaque action.

#### Paiements (Cashier)
Un package officiel Laravel conçu spécifiquement pour dialoguer avec Stripe (gestion des paiements, échecs, factures PDF). 

#### Messagerie (Reverb)
Un serveur WebSocket ultra-rapide intégré à Laravel pour la messagerie en temps réel, évitant de devoir maintenir un serveur Node.js séparé.

### 3.3. Base de données et Tâches de fond

* **PostgreSQL :** C'est notre base de données principale. Solide comme un roc, elle a été choisie plutôt que MySQL grâce à son extension **PostGIS**. C'est ce qui nous permet de faire des calculs géospatiaux complexes ultra-rapides.
* **Redis (Cache & Queues) :** Base de données ultra-rapide en mémoire vive (RAM). On l'utilise pour stocker les résultats fréquents et pour gérer les files d'attente (background jobs) comme l'envoi d'emails en masse sans ralentir l'application.

### 3.4. Le stockage des médias - Object storage compatible S3

Nous avons pris la décision de ne stocker **aucune** image sur les disques de nos propres serveurs applicatifs.

Gérer soi-même des milliers d'images saturerait rapidement nos disques, demande une maintenance suplémentaire et nous exposerait à des risques légaux majeurs.

Les photos échangées (cicatrices, post-opératoire) étant considérées par la loi comme des **données de santé ultra-sensibles**, obtenir nous-mêmes la certification légale pour les héberger coûterait une fortune en audits de sécurité.

C'est pourquoi nous déléguons cette responsabilité lourde à des hébergeurs spécialisés via un **stockage massif externe (Object Storage S3)**. Pour les photos cliniques, le fournisseur doit obligatoirement posséder l'agrément légal **HDS (Hébergeur de Données de Santé)**.

Le secret médical est garanti par des "URLs signées" : des liens chiffrés générés à la volée qui ne fonctionnent que quelques minutes. Une fois le délai écoulé, l'image est totalement bloquée, réduisant le risque de fuites de données.

À l'inverse, pour les photos publiques comme le book du tatoueur, la priorité n'est plus le secret absolu mais la vitesse d'affichage. Ces images passent donc par un **CDN (Content Delivery Network)**, un réseau de serveurs relais qui permet d'afficher les portfolios instantanément sur le téléphone du patient, avec un temps de chargement très réduit.

---

## 7. Réalité Augmentée

Permettre à un patient de visualiser un tatouage de reconstruction sur sa propre peau (sur une cicatrice ou une zone post-opératoire) avant de passer à l'acte est un argument de vente massif qui lève un énorme frein psychologique.

Nous utiliserons techniquement de l'**AR (Réalité Augmentée)** en utilisant la caméra du smartphone de l'utilisateur.

### Le défi technique
L'AR sur le corps humain est un domaine complexe de la vision par ordinateur :
* **La déformation et le relief :** Contrairement à un filtre visage, un sein, un ventre ou un tissu cicatriciel n'ont pas de repères fixes. L'algorithme doit comprendre la topographie pour éviter que le tatouage "flotte".
* **Le format :** Les tatoueurs devront fournir des œuvres parfaitement détourées (fichiers PNG avec transparence gérée) pour un rendu naturel sur la peau.

### L'implémentation

Pour la partie Réalité Augmentée, nous utiliserons le duo WebXR + Three.js. Cette combinaison permet de créer des rendus 3D fluides et de projeter le tatouage sur le corps directement dans l'interface de l'application.

C'est un choix de flexibilité : l'utilisation de Three.js nous donne un contrôle total sur l'apparence visuelle (gestion de la transparence de l'encre, texture de la peau), tandis que WebXR assure la compatibilité entre iPhone et Android.

Cela nous permet de lancer cette fonctionnalité innovante sans alourdir l'application, tout en nous laissant la liberté d'évoluer vers d'autres solutions plus poussées si la précision sur les tissus cicatriciels l'exige par la suite.

---

## 4. Sécurité et Santé

Étant donné la nature intime et médicale des informations échangées sur notre plateforme (photos de cicatrices, historique post-opératoire), nous allons devoir être **totalement intransigeants au niveau de la sécurité pour éviter la moindre fuite de données**.

Une compromission de ces informations détruirait instantanément la confiance de nos utilisateurs et nous exposerait à de lourdes sanctions pénales.

Pour garantir cette protection, notre système repose sur une règle d'or : donner le moins d'accès possible à tout le monde. Nous mettons en place un cloisonnement strict des informations directement au cœur de l'application.

Concrètement, cela signifie qu'un utilisateur ou un professionnel n'aura accès qu'aux seules données qui lui sont strictement nécessaires.

Les conversations privées et les photos cliniques sont totalement verrouillées à la source, ce qui rend impossible la consultation d'un dossier ou d'un échange par une personne non autorisée.

Concernant la protection des informations médicales, la loi française impose un hébergement certifié HDS (Hébergeur de Données de Santé). Pour maîtriser nos coûts de lancement tout en sécurisant l'essentiel, nous adoptons une approche pragmatique en deux temps.

Dès le premier jour, tout ce qui stocke durablement la donnée sensible sera obligatoirement hébergé sur des infrastructures certifiées HDS.

Cela concerne exclusivement notre base de données (qui contient les messages et informations des patients) et notre espace de stockage S3 (qui héberge les photos cliniques).

En revanche, nos serveurs applicatifs qui font transiter l'information et d'exécuter le code sans jamais rien sauvegarder sur leurs disques, seront dans un premier temps déployés sur des serveurs classiques et sécurisés.

Ce choix stratégique nous permet de réduire drastiquement nos frais d'infrastructure au début du projet.

Par la suite, lorsque la plateforme sera rentable et nécessitera de passer à l'échelle, nous basculerons également ces serveurs applicatifs sur des offres HDS afin d'atteindre une conformité juridique absolue.

---

## 5. Comment on héberge tout ça ?

Pour garantir que l'application reste rapide, résiliente et abordable au lancement, notre infrastructure repose sur une séparation stricte entre le stockage des données et le code applicatif.

D'un côté, nous confions la gestion de nos données critiques directement à notre hébergeur via des services clés en main ("Managed").

Notre base de données principale **PostgreSQL** ainsi que notre système de cache et de files d'attente avec **Redis** seront totalement managés.

Ce choix nous garantit des performances optimales, des mises à jour de sécurité transparentes et des sauvegardes chiffrées automatiques, l'avantage principal de ce choix est que les sauvegardes (backups) seront directement gérées par le provider, ce qui nous évitera d'avoir à nous en occuper.

De l'autre côté, pour faire tourner l'API et Websockets, nous utilisons Kubernetes via sa distribution allégée K3s.

Nos serveurs applicatifs de production feront tourner notre application sous forme de conteneurs isolés.
À l'entrée de cette infrastructure, le routeur Traefik se chargera de recevoir le trafic, de forcer les connexions sécurisées (HTTPS) et de répartir intelligemment les requêtes, basculant instantanément le trafic si un serveur venait à défaillir.

En parallèle, un serveur modeste de pré-production copiera cette architecture pour nous permettre de tester les nouveautés, les paiements factices avant de les pousser en production.

Le véritable atout de cette architecture hybride, c'est son évolutivité et son indépendance.

En encapsulant toute notre logique applicative dans K3s et en sortant la base de données de nos serveurs, nous ne sommes pas prisonniers de notre hébergeur actuel.

À l'avenir, lorsque nous devrons migrer nos serveurs applicatifs vers un fournisseur certifié HDS, nous pourrons déplacer l'intégralité de notre cluster Kubernetes chez n'importe quel autre acteur du marché avec une certaines facilités.

---

## 6. Qualité et Déploiement Automatisé (CI/CD)

Objectif **"Zéro régression"**.

Nous utiliserons un pipeline CI/CD (GitHub Actions ou GitLab CI).

Pour garantir l'absence de bugs lors de nos mises à jour, nous mettons en place une matrice de tests automatisés à tous les niveaux.

Côté backend, l'outil Pest (PHP) se charge de valider la logique métier et la sécurité de notre API.

Il vérifie automatiquement des opérations critiques, comme s'assurer que le calcul d'une commission Stripe tombe juste au centime près, ou qu'une requête avec un accès expiré est immédiatement rejetée.

Côté application mobile, nous utilisons Jest (TypeScript) pour tester nos composants isolés, par exemple pour vérifier qu'un bouton de paiement reste inactif tant que les conditions médicales ne sont pas cochées.

Enfin, pour valider l'expérience globale, nous utilisons Maestro.

Cet outil de test simule le comportement d'un véritable utilisateur humain directement sur l'interface de l'application mobile React Native. Il se connecte, navigue, recherche un tatoueur, prend un rendez-vous et écrit dans le chat, garantissant que tout le parcours fonctionne parfaitement de bout en bout avant chaque déploiement.

Une fois les tests validés, Kubernetes déclenche un déploiement invisible (Rolling Update).

Au lieu de couper l'accès pour installer la mise à jour, le système remplace les anciens serveurs par les nouveaux un par un, de manière fluide.

Cela garantit une continuité de service totale : un utilisateur peut payer son acompte ou envoyer un message au moment précis de la mise à jour sans subir aucune coupure ni page de maintenance.