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
la liste des produits
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya1.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya2.PNG?raw=true
)

![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya3.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya5.PNG?raw=true
)
![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya6.PNG?raw=true
)

![image alt](https://github.com/imanebaider/TP-Angular-ImaneBaider/blob/main/loraya7.PNG?raw=true
)















