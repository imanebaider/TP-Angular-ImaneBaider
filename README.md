# TP-Angular-ImaneBaider

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# TP4 - Imane Baider

Ce projet Angular met en place une application e-commerce nommée "LORAYA"  dédiée à la vente de bijoux, parfums, sacs, robes et chaussures à talons. Il s'appuie sur l'utilisation des templates, bindings, directives Angular et le routing sécurisé avec AuthGuard.

L'application permet :

L’affichage de différents produits par catégories (bijoux, colliers, robes, sacs, parfums...).

La gestion du panier d'achat et du paiement.

L’enregistrement des commandes et la page de confirmation.

La gestion du stock avec édition de quantités et export en PDF.

L'utilisation d'un dashboard admin pour suivre les commandes et les produits.

L’affichage de favoris, du profil utilisateur, et des détails produit.

 # Dépendances importantes à installer
Avant d’utiliser la fonctionnalité PDF pour exporter le stock, il faut installer la bibliothèque jspdf :


npm install jspdf --legacy-peer-deps
Cette commande est nécessaire pour générer les fichiers PDF via Angular, notamment dans la section Stock de l’application.

#  Génération de diagrammes
Si vous souhaitez générer des diagrammes dans Angular (par exemple pour le suivi de produits, commandes, ou statistiques), vous pouvez installer une bibliothèque de graphiques telle que :


npm install chart.js ng2-charts --legacy-peer-deps
Et l’importer dans votre module ou composant. N'oubliez pas d'importer ChartsModule si nécessaire.

#  Sécurisation avec AuthGuard
Certaines routes (ex: /catalog, /cart, /validation, /payment, /confirmation, /commande, /stock, /profile) sont protégées avec un AuthGuard, pour empêcher l'accès aux utilisateurs non authentifiés.
## Captures d'écran
La page d’accueil du site Loraya se distingue par un design moderne et élégant qui
reflète l’univers de la mode et de la beauté féminine.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya1.PNG?raw=true
)

![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya3.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya4.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya7.PNG?raw=true
)

![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_bijaux.PNG?raw=true

)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_bijaux1.PNG?raw=true

)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_bijaux2.PNG?raw=true
)
Lorsqu’une utilisatrice clique sur le bouton « Se connecter » sur la page d’accueil du site
Loraya, elle est redirigée vers une page de connexion dédiée. Sur cette page, le système
identifie automatiquement si l’utilisatrice est une cliente ou une administratrice en
fonction de l’adresse e-mail saisie.
Après vérification de l’adresse e-mail et des informations d’identification, l’utilisatrice
est dirigée vers la section appropriée du site selon son rôle. Cette gestion des accès
garantit une navigation personnalisée et sécurisée, permettant aux clientes d’accéder à
leurs commandes et favoris, et aux administratrices de gérer le catalogue, les commandes
et les autres fonctionnalités administratives
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_connexion.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_compte.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_profile.PNG?raw=true
)
La page panier affiche les articles sélectionnés par l'utilisateur, incluant le nom, le type, la
description, le prix et la quantité de chaque produit.
Elle propose des actions comme vider le panier ou passer au paiement, tout en résumant le
montant total avec les éventuelles réductions.
Un message "Presque épuisé" met en avant l'urgence, et les moyens de paiement acceptés
comme Visa et Mastercard sont également affichés.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_panier.PNG?raw=true
)
La page récapitule les informations de livraison, incluant le nom, l'adresse complète, la ville,
le code postal et le numéro de téléphone.
Elle affiche les détails de la commande (produit, quantité, prix, réduction et total) ainsi que les
options de paiement disponibles.
LORAYA garantit la sécurité des paiements et la confidentialité des données personnelles
grâce à des mesures de protection conformes aux normes de l’industrie.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_validation.PNG?raw=true
)
La page permet de saisir l'adresse de facturation et les informations de carte
bancaire (numéro, expiration, CVV) pour finaliser l'achat.
Elle récapitule la commande (produits, quantité, prix total, réduction) et propose une
option pour enregistrer la carte.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_payer.PNG?raw=true
)

La page confirme l’enregistrement de la commande avec le numéro, la date, le montant, le
statut du paiement et les détails de livraison.
Elle propose aussi les options pour continuer les achats, imprimer la facture, ou contacter le
support client.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_confirmation.PNG?raw=true
)
La page affiche la liste des commandes passées avec leur numéro, date et heure.
Chaque commande présente les produits achetés, la quantité et le total payé.
L’utilisateur peut consulter les détails ou supprimer une commande directement depuis cette
page.
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_listeCommandes.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_favorite.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_admin_dashboard.PNG?raw=true
)
![image alt](
https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_admin_commande.PNG?raw=true
)
![image alt](
https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/master/loraya_admin_stock.PNG?raw=true
)


