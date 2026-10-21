---
layout: blog
title: "Développeur / Électricien : pourquoi la transition est plus logique qu'on ne croit"
description: "Debug, architecture, tests unitaires : le métier de développeur et celui d'électricien partagent bien plus qu'on ne l'imagine. Retour sur les parallèles qui rendent cette reconversion si naturelle."
keywords: "reconversion développeur électricien, debug électrique, test de continuité, test unitaire, schéma unifilaire, architecture logicielle, NF C 15-100, reconversion professionnelle"
category: "Reconversion"
date: 2026-03-30
last_modified_at: 2026-10-20
published: true
excerpt: "Debug, architecture, tests : depuis que j'alterne entre code et chantier, je suis frappé par une chose, la logique est la même. Les outils changent, les réflexes restent."
image: /images/blog/developpeur-electricien.png
---

Quand je dis que je me reconvertis de développeur à électricien, la réaction est souvent la même : un petit silence, un regard perplexe, puis un « ah, c'est un sacré changement, non ? ». En apparence, oui. On passe d'un écran à un chantier, d'un clavier à une pince à dénuder, d'un IDE à un multimètre. Mais depuis que j'alterne entre les deux mondes, à raison de 80 % de développement et de 20 % de chantier, je suis frappé par une chose : **la logique est la même**. Les outils changent, les réflexes restent.

## Penser en systèmes

En développement, avant d'écrire la moindre ligne de code, on dessine. On pose son schéma d'architecture, on découpe en modules, on identifie les flux, les dépendances, les points de rupture. On prend du recul avant de plonger.

En électricité, c'est pareil. Le schéma unifilaire, c'est le schéma d'architecture. Le tableau, c'est le point central de l'installation, le serveur si on veut. Les circuits sont des modules indépendants, chacun avec sa protection, sa section et sa fonction. Les boîtes de dérivation jouent le rôle des routeurs : elles redistribuent les flux vers les bons appareillages.

Quand j'arrive sur le chantier et que je dois réfléchir à un circuit, je fais exactement ce que je faisais en développement. Je prends du recul, je dessine le système, je découpe en blocs. Ensuite seulement, je passe à l'implémentation, c'est-à-dire au passage des câbles et aux raccordements. C'est un réflexe de développeur. Sur le terrain, il me sert tous les jours.

## Chercher un bug, chercher une panne

Quiconque a déjà passé des heures à chercher un bug dans un programme verra exactement de quoi je parle. Un bug, c'est un symptôme : l'application plante, une valeur est fausse, un comportement est inattendu. Pour le trouver, on remonte le fil. On isole, on teste hypothèse par hypothèse, on élimine, on resserre.

Sur le chantier, la démarche est la même. La semaine dernière, un circuit ne bipait pas au test de continuité. Pas de panique : j'ai remonté le circuit jusqu'à la boîte de dérivation en amont, je l'ai ouverte et j'ai contrôlé chaque raccordement. Un Wago était mal enfoncé, le fil n'avait pas fait contact. Une fois le Wago refait et le circuit retesté, le multimètre a bipé. Le problème était réglé.

Le multimètre, c'est le debugger. Le schéma de l'installation, c'est la stack trace. Cette façon de ne pas paniquer face à un problème, d'isoler, d'éliminer puis de resserrer, c'est quelque chose que quinze ans de développement m'ont ancré. Sur le terrain, ça change tout, surtout quand on débute et qu'on pourrait vite se laisser submerger par un truc qui ne marche pas.

## Les tests : mon obsession dans les deux métiers

C'est peut-être le parallèle qui me parle le plus. C'est aussi celui où mon passé de développeur influence le plus ma façon de travailler sur le terrain.

### Test de continuité = test unitaire

En développement, un test unitaire vérifie qu'un composant isolé fonctionne. On teste une fonction ou un module, indépendamment du reste.

En électricité, le test de continuité, c'est exactement ça. On prend un circuit, **hors tension**. On shunte phase et neutre côté tableau avec un Wago, puis on parcourt chaque appareillage avec le multimètre en mode ohmmètre. S'il bipe, ce « composant » est correctement câblé. S'il ne bipe pas, il y a un fil mal serré ou un raccordement oublié. C'est maintenant qu'il faut le trouver, pas une fois les plaques posées.

C'est un test isolé, sans courant, sans interaction avec le reste de l'installation. C'est un test unitaire au sens propre.

### Mise en service = test fonctionnel

Ensuite vient la mise sous tension. On alimente le tableau, on enclenche les disjoncteurs et on vérifie en conditions réelles. La lumière s'allume. Le va-et-vient bascule correctement des deux côtés. Le volet monte et descend. Le différentiel déclenche quand il doit.

C'est le test de bout en bout. On ne teste plus une brique isolée mais le système complet. Comme en développement, c'est souvent là qu'on découvre les vrais problèmes : chaque circuit était bon pris isolément, mais l'interaction entre circuits révèle un déséquilibre de phase ou un différentiel qui saute.

### Pourquoi j'y tiens autant

En développement, j'ai vu ce qui se passe quand on ne teste pas : le bug en production un vendredi soir, le truc « qui marchait en local » et qui explose au déploiement.

Alors en électricité, j'applique le même principe : **je teste tout, circuit par circuit, avant d'aller plus loin**. C'est un investissement en temps. Mais c'est ce qui permet de livrer l'esprit tranquille, de dire « c'est bon » en étant sûr de ce qu'on avance, pas parce que ça avait l'air correct.

Je débute dans ce métier. Je n'ai pas encore des années de chantier derrière moi. Mais cette rigueur, je l'ai déjà. Elle vient du développement et je la sens précieuse chaque semaine.

## Nommer les choses

En développement, tout le monde sait qu'un code bien nommé est un code maintenable : des variables explicites, des fonctions qui disent ce qu'elles font. Quand on reprend un projet six mois plus tard, la clarté du nommage fait toute la différence.

En électricité, c'est le repérage. Les étiquettes au tableau, dans les boîtes de dérivation, sur les câbles. J'en parlais dans [mon dernier article](/blog/2026/03/25/retour-chantier-appareillages/) : **repérer plus que nécessaire**, c'est ma règle.

Un tableau bien repéré, c'est un `README` lisible. Une boîte de dérivation bien étiquetée, c'est du code commenté. Un câble non identifié, c'est une variable nommée `x2_temp_final_v3`, bon courage pour retrouver à quoi elle sert dans cinq ans.

## La transition est plus aisée qu'on ne le croit

Ce qui relie ces deux métiers, c'est la même exigence : concevoir avant de construire, tester avant de livrer, documenter pour ceux qui passeront après.

Est-ce que c'est facile pour autant ? Non. Il y a énormément à apprendre. Le geste technique ne s'improvise pas, la norme NF C 15-100 ne se devine pas et le terrain me rappelle régulièrement que je suis [encore en apprentissage](/blog/2026/01/19/reconversion-electricien-terrain-apprentissage/).

Mais la manière de raisonner, d'aborder un problème, de structurer son travail, tout ça, un développeur l'a déjà. Il ne l'a pas encore dans les mains, parce que ça vient avec le terrain, mais il l'a dans la tête.

Après [l'épisode du court-circuit](/blog/2026/02/02/etincelle-8h30-court-circuit-renovation/), où j'ai dû remonter le problème exactement comme un bug en production, en gardant la tête froide, en isolant et en réagissant étape par étape, je me suis dit que finalement, ce n'était pas si loin.

---

*Si vous êtes développeur et que vous avez déjà pensé à une reconversion manuelle, ne sous-estimez pas ce que votre parcours vous a appris. Les compétences transversales comptent bien plus qu'on ne l'imagine.*

*Vous pouvez suivre la suite sur [LinkedIn]({{ site.linkedin }}) et [Instagram]({{ site.instagram }}). Un projet de rénovation ? [Contactez-moi](https://www.lartisan20.fr/contact/).*
