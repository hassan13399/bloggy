# Calcul
Attention, pour le classement general, il faut que la date et l'heure des day soit un peu antérieure à la date du premier match
Il faut aussi que la date des days soit dans l'ordre (mais cela paraît logique)

## Prologue
-prédiction des finalistes doivent être encodés dans team 1 et team 2
-prédiction du finaliste doit être encodé dans team 3 mais pas dispo dans l'interface, voici la requete SQL:

UPDATE `pronoDefs` SET `result_team3_id` = 'xyz' WHERE `pronoDefs`.`id` = 1; [id angleterre: 8, id italie 22]

# groupe par défaut d'un utilisateur
Bizarre, default_group_id dans la table users ne semble jamais etre mis à jour
Requete pour mettre à jour tout le monde:
UPDATE `users` SET `default_group_id` = (SELECT userGroups.group_id FROM userGroups WHERE userGroups.user_id = users.id LIMIT 1) WHERE 1

# attention, la compilation pour angular doit se faire en node version 10.x.  (12.X ne fonctionne pas)


# Deploy in production
## sur pc de dev
* ng build --prod --aot
* scp -r dist/* mmw16:/tmp/bloggyfront/

## sur mmw16
* rm /tmp/bloggyfront/*.*
* sudo cp -Rp /tmp/bloggyfront/* /var/www/bloggyfront.makemeweb.net/web
* sudo chown -R web26:client12 /var/www/bloggyfront.makemeweb.net/web

## compte de test
nicolas.wezel@gmail.com (nicoGmail)
nicolas@makemeweb.net (nicoWezel)
nicolas.wezel@makemeweb.net (nico2021)

# Bloggyadmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
