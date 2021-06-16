# Formation angular 12

## Vocabulaire

---

- Interpolation : utilisation de la syntaxe `{{ something }}` dans un template html
- DOM virtuel : création d'une copie du DOM, et à chaque modif, création d'un second DOM virtuel pour comparaison et si modif actualisation du vrai DOM. Problème : grosse empreinte mémoire et diminue les performance sur mobile
- DOM incrémental : utiliser par Angular, instanciation des composant dans le DOM réel, et pour chaque action utilisateur nécessitant un refresh d'un composant, le composant est rafraichis directement dans le vrai DOM -> moins d'empreinte mémoire, un peu moins performant
- Webcomponent "intelligent" : composant prenant des décisions en fonction des données
  - Dans un component "intelligent" ne faire que des instance de component "stupide" pour limiter la duplication de code et les risques de régression
  - exemple : créer un component stupide affichant une valeur, l'utiliser dans le component intelligent pour afficher la somme d'une colonne, somme calculée dans le component intelligent mais affichée par un component stupide
- Webcomponent "stupide" : composant n'ayant aucune décision en fonction des données

## Bonnes pratiques

---

### Organisation de code

- Avoir des modules orientés Agile (qui peuvent être changer et modifier simplement, et sans impacter le code des autres mdoules)
  - un module dédié au UserInterface, avec UNIQUEMENT ce qui est pour le user interface
    - un template avec un component header,footer,nav,page **mais pas leurs contenu** : Chacun de ses composants ne sont que référencé et mis en page dans l'UI
    - du code CSS pour mettre en forme ces composants (leurs tailles, formes et position)
    - du code javascript pour faire des actions simple (ouvrir/fermer le menu de navigation)
    - et c'est tout
  - un module dédiées aux icones, pour éviter d'avoir à réimporter à chaques fois toutes les icônes et pour pouvoir remplacer facilement les sous-ensemble d'icônes de ce module
  - un module dédiés aux templates, pour prévilégier la réutilisabilité des templates de pages et limiter les risques de régression
- à la racine ne créer que des modules, opter pour une architecture la plus simple possible (c'est le premier niveau de granilarité de l'applications, les component sont aux deuxième niveaux avec les pipes et les directives)
- Même si plusieurs pages affiche des données de la même manières (par exemple 3 pages, cahcune contenant une grille affichant les données d'une table), éviter d'écrire des composants "génériques"
  - ça évites des gros risques de régressions en cas de modficiations
  - c'est agile, car une page peut être modifier tout simplement avec un seul fichier sans impacter les autres pages
  - en revanche en inconvénients : implique de la duplication de code plus important en cas de modifications générale
  - compromis : utiliser des composants les plus simples possible dans le template
- Pour éviter les imports à répétitions dans toutes l'application, importer les imports utilisé partout dans SHaredModule et importer au besoin SharedModule la ou c'est nécessaire

### Conventions

- le fichier de test d'un composant doit se trouver au même niveau que le component ou le module qu'il test et doit avoir pour extension `spec.ts`
- En typescript, toujours mettre le mot-clé public pour améliorer la lisibilité (même si c'est le cas par défaut)
- Se mettre d'accord sur les convention de nommages, la langue du code (tout anglais ou tout français), les bonnes pratiques à mettre en place, etc...
- Vue d'une application : View*.component.ts ou Page*.component.ts
- Lors de l'utilisation de la transclusion (`<ng-content>`), préférer l'utilisation d'un selecteur de classe
  - Un sélecteur simple empêche la réutilisation d'un composant angular si le composant projeté n'as pas le même nom de classe
  - Un sélecteur par id, en cas de projection multiple d'un même id dans un même composant, entraineras un warning dans le validateur w3c (deux fois le même id dans une même page)

### Optimisations

- Éviter de charger le module `Shared` au démarrage de l'application, car il est rare d'avoir besoin de l'intégralité du module partagé sur la page d'accueil
- Dans `app-routing-modules`, l'ajout de la stratégie de chargement des modules `PreloadAllModules` indique à angular de précharger en taches de fond tous les modules qui ne sont pas encore chargés à l'accès d'une pages, plutot que de faire du lazy loading
  - Dans certains cas, par exemple si une partie de l'application est un back-office nécessitant une authentification, il est également possible d'indiquer pour chaque route, quels modules doivent et ne doivent pas être préchargés
- Exporter `RouterModule` dans `AppRoutingModule` car il permet d'utiliser la directive `<router-outlet>` dans `app.component.html`
  - Fait partis des guidelines d'Angular
  - Le faire dans app-routing, c'est l'quivalent de l'ajouter dans les import de `app-module.ts` car ce dernier import `app-routing-module`

## Fichiers d'angular

---

### package.json

- dependencies : dépendances nécessaires pour l'appli, chez les clients
- devDependencies : dépendances uniquemnt utiles en local, en dev. Elle ne seront pas présentes dans le bundle final de l'application

### src/style.scss

- Ce fichier est un fichier de style global, pour des raisons de maintenabilité, il ne faut y mettre que les librairies CSS à charger au démarrage (ex: bootstrap) ainsi que les fichiers de varibles à charger au démarrage.

### src/main.ts

- la méthode enableProdMode() supprime tous les commentaires inutiles, désactives les assert et les tests, etc...

## Test

---

### Tests unitaires

- Describe sert à démarrer un série de test, chaque test étant un appel à la méthode `it`.
- Il est recommandé d'utiliser Gest à la place de Karma : Gest est plus complet, à une documentation plus fournie et les ressources associées sont plus nombreuses.

### Bases de données de test

- créer une fausse base de donnée avec [json-server](https://github.com/typicode/json-server)
- ou créer une fausse API avec [mockoon](https://mockoon.com/)

## Notions

---

### Démarrage d'angular

Le fichier main.ts lance le fichier app.module.ts, qui lance le fichier app.component.ts.

### Modules

- Une classe est un module si elle est décorée avec l'annotation `@NgModule`
  - declarations : on ne peux y mettre que des componenet, pip directive et rien d'autre
  - imports : possibilité d'importer des module uniquement
    - Si l'on souhaite que les imports soient instanciées en même temps que la classe décorée
    - Si l'on souhaites utiliser des components déclarés par un import dans les component de la liste declarations
  - providers : TODO
  - bootstrap : les composants lancés par la classe décorée
  - exports : listes des modules chargés en même temps que la classe décorée
  - différences entre imports et exports :
    - on importe de module pour les instancier en même temps que la classe décorée
    - on exporte des modules pour que ces derniers soit importé par la classe important la classe décorée
      - le module TotoModule contiens `exports [UiModule, TataModule]`
      - le module TitiModule contiens `imports [TotoModule]`
      - c'est l'équivalent d'avoir TotoModule avec `exports` vide, et TitiModule avec `exports [UiModule, TataModule, TotoModule]`
- Le module `CommonModule` est un module commun à tous les modules Angular
- Un module à un rôle précis et un seul (pas de classe avec plus de 1000 lignes de codes)

### Composant

- dans l'annotation `@Component`, le champ selector indique le nom de la balise à utiliser dans un template HTML pour utiliser ce composant

### Styles SCSS

- Les variables **CSS** restent intacte après compilation du scss et reste accessible après la compilation
- Les variables **SCSS** sont remplacées par des valeurs dans les fichiers CSS compilés et ne sont plus accessibles après la compilation

### Bootstrap

- Si import avec npm : dépendance hammerjs et jquery car les animations de bootstrap en dépendent
- Il faut plutôt importer `ng-bootstrap`

### Observable

- Observable froid : chaque subscribe réinterprète le flux de données :
- classe `Observable`
  - Si on crée un observable retournant un next(Math.random()), chaque subscribe auras une valeur différente de Math.random()
  - C'est aussi appelé un Observable `unicast`
  - est initialisé
- Observable chaud : récupération d'un flux de données continu, en temps réel, sans bsoin de re-subscribe entre chaque donnée
- Classe `Subject` de RxJS
  - Si l'on créé un subject, que l'on fait deux subscribe, chaque subscribe obtiendras ensuite les mêmes données à chaque utilisation de la méthode `next` du Subject
  - ne stock pas de donnée
  - ne peux pas être initialisé avec des données
  - Si un subscribe est fait, il ne receveras rien tant que la méthode nesxt n'est pas appelée, même si la méthode next à été appelée AVANT le subscribe, contrairement à l'observable
- Classe `BehaviorSubject`
  - stock toujours la dernière valeur donné via la méthode `next`
  - doit être initialisé
  - lors d'un nouveau subscribe, retourne instantanément sa valeur actuelle
  - se comporte ensuite comme un `Subject`

## Lifecycle

- [Voir doc](https://angular.io/guide/lifecycle-hooks)
- Ordre d'exemple : `constructor` -> `ngOnChanges` -> `ngOnInit`
  - `ngOnInit` est appelé, même si `ngOnChanges` ne l'est pas
  - explique par exemple le cas suivant :
    - Dans ChildComponent.ts : `@Input() ChildComponent.title = "I'm the child !"`
    - Dans ParentComponent.html `<app-child title="I'm the parent !"></app-child>`
    - La valeur affiché seras `I'm the parent`, car ngOnChanges est appelé **après** le constructor
    - Avec le même exemple, en ajoutant `this.title = "I'm the child init !"` dans la méthode `ngOnInit`
    - La valeur affichée seras cette fois `I'm the child init !`

## Commandes

- `ng g module toto` : créé un module nommé TotoModule
- `ng g module tata --routing` : créé un module nommé TataModule et un module nommé TataRoutingModule
  - TataModule déclareras les components (pipe, component, etc)
  - TataRoutingModule se chargera de déclarer les routes de ce module
- `ng g component titi --export` : créé un component angular nommé titi et l'exporte dans le module dans lequel il est généré
- `ng test` : lance les tests unitaires, configuré avec Karma
- `ng add toto` : lis et exécute le schematics externe toto
