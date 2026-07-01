---
layout: blog
title: "Un éclairage d'allée connecté chez mes parents, à Aix-les-Bains"
description: "Retour de chantier chez mes parents, à Aix-les-Bains : installation de quatre luminaires le long de l'allée sur un circuit dédié 10 A, commandés par va-et-vient depuis le portail et l'entrée, et pilotables au smartphone grâce à un module Shelly 1 Mini Gen4. Boîte de dérivation extérieure étanchéifiée au gel, module posé à l'intérieur près du tableau et de la box, et simulation de présence à la clé."
keywords: "éclairage extérieur connecté, éclairage allée, va-et-vient, Shelly 1 Mini Gen4, module connecté, simulation de présence, disjoncteur dédié 10A, boîte de dérivation gel étanchéité, pilotage smartphone éclairage, Aix-les-Bains, contrôle local"
category: "Domotique"
chantier: "Maison des parents"
date: 2026-07-01
published: true
excerpt: "Chez mes parents, à Aix-les-Bains, l'allée n'avait jamais eu d'éclairage. L'hiver, rentrer de nuit tenait du parcours d'obstacles. J'ai posé quatre luminaires sur un circuit dédié, commandés par deux interrupteurs va-et-vient, et j'ai ajouté un module Shelly pour qu'ils puissent tout piloter depuis leur téléphone. Récit d'un chantier familial, boîtes de dérivation, gel d'étanchéité et simulation de présence comprises."
image: /images/prestations/eclairage_aix/luminaire_allume.jpeg
---

Il y a des chantiers qu'on repousse parce qu'ils sont chez les autres, et d'autres qu'on repousse justement parce qu'ils sont chez soi. Celui-ci était chez mes parents, à Aix-les-Bains, et il traînait depuis un moment. Leur allée n'avait jamais eu le moindre éclairage. L'été, on s'en accommode. L'hiver, quand la nuit tombe à cinq heures, rentrer de la voiture jusqu'à la porte d'entrée relève un peu du parcours d'obstacles. C'était devenu franchement handicapant, et c'est exactement le genre de petit inconfort du quotidien qu'on finit par ne plus voir tellement on s'y habitue.

J'ai profité d'un passage pour tout reprendre proprement. L'objectif : quatre luminaires le long de l'allée, deux points de commande, et un pilotage depuis le téléphone pour aller un cran plus loin que le simple interrupteur. Le tout m'aura pris un peu moins d'une journée et demie.

## Le besoin : éclairer l'allée, la commander des deux côtés

Avant de tirer le moindre câble, la question à se poser est toujours la même : d'où veut-on allumer, et d'où veut-on éteindre ? Ici, la réponse coulait de source. On arrive en voiture par le portail, donc on veut pouvoir allumer l'allée depuis le portail. Et une fois rentré, on veut pouvoir l'éteindre depuis l'intérieur, à côté de la porte d'entrée, sans avoir à ressortir.

C'est le cas d'école du **va-et-vient** : un même point lumineux (ici une ligne de quatre luminaires) commandé depuis deux endroits différents. Un interrupteur au portail, un interrupteur dans la maison, et les deux allument ou éteignent indifféremment. C'est le confort de base, celui auquel on ne pense même plus une fois qu'il est là, mais dont l'absence se remarque tous les soirs d'hiver.

![Interrupteur d'éclairage extérieur posé sur le pilier près du portail](/images/prestations/eclairage_aix/interrupteur_exterieur.webp)
*L'interrupteur extérieur, posé près du portail. On aperçoit en bas la motorisation du portail déjà en place.*

## Un circuit dédié, protégé par son propre disjoncteur

Pour ce genre d'ajout, la tentation est parfois de se piquer sur un circuit d'éclairage existant. Je ne l'ai pas fait, et pour une bonne raison : un éclairage extérieur mérite son **circuit dédié**, protégé par son **propre disjoncteur de 10 A** au tableau. Ça isole proprement la ligne du reste de l'installation. Si un jour un luminaire prend l'eau ou qu'un câble est sectionné dehors, c'est ce disjoncteur qui saute, et lui seul. Le reste de la maison continue de fonctionner, et on sait immédiatement où chercher.

Le tableau de mes parents, un ensemble Legrand bien rempli, avait heureusement la place pour accueillir ce départ supplémentaire. J'ai ajouté le disjoncteur sur la rangée, repéré le circuit, et tiré la ligne vers l'extérieur.

![Tableau électrique Legrand où a été ajouté le disjoncteur dédié de l'éclairage d'allée](/images/prestations/eclairage_aix/tableau.webp)
*Le tableau de la maison, sur lequel j'ai ajouté le disjoncteur 10 A dédié à l'éclairage de l'allée. Un circuit isolé du reste, c'est la garantie qu'un souci dehors ne fait pas tout tomber.*

## Le montage : trois boîtes de dérivation, une chaîne du fond de l'allée jusqu'au tableau

C'est la partie la plus intéressante à décrire, parce que c'est là que se joue la fiabilité de l'ensemble. L'éclairage chemine à travers **trois boîtes de dérivation** qui se relaient depuis le fond de l'allée jusqu'au tableau : deux dehors, une à l'intérieur de la maison.

Tout commence au bout de l'allée. Une première **boîte de dérivation extérieure est placée sous le dernier luminaire, côté entrée**. C'est elle qui **regroupe les câbles R2V des quatre luminaires** : les trois autres points lumineux y ramènent chacun leur câble, et le quatrième est juste au-dessus. C'est le point de rassemblement de toute la ligne d'éclairage, celui à partir duquel un seul départ repart vers la suite.

![Boîte de dérivation regroupant les câbles R2V des luminaires, connexions sur bornes Wago](/images/prestations/eclairage_aix/boite_deriv3.webp)
*La boîte placée sous le dernier luminaire de l'entrée. C'est elle qui récupère les câbles R2V des trois autres luminaires pour regrouper toute la ligne d'éclairage. Raccordements sur bornes Wago, phase, neutre et terre bien séparés, chaque départ identifiable.*

De cette boîte, un câble part vers une **deuxième boîte de dérivation extérieure**. Celle-ci récupère deux choses : la ligne d'éclairage regroupée qui arrive du fond de l'allée, et les fils de l'**interrupteur extérieur** du portail. Comme on est en va-et-vient, cet interrupteur ramène **trois fils** (les deux navettes plus le retour), et non deux.

![Boîte de dérivation ouverte avec les conducteurs raccordés avant étanchéité](/images/prestations/eclairage_aix/boite_deriv1_ouverte.webp)
*La deuxième boîte extérieure, celle qui reçoit la ligne d'éclairage et l'interrupteur du portail, connexions faites sur bornes automatiques avant l'étanchéité. C'est propre, mais dehors, propre ne suffit pas : il faut étanche.*

De cette deuxième boîte extérieure, je fais enfin partir la liaison vers la **troisième boîte, à l'intérieur de la maison**, placée non loin du tableau et, surtout, non loin de la box wifi. On verra un peu plus bas pourquoi cette proximité avec la box est déterminante. C'est là que tout le va-et-vient se reconstitue proprement, avec l'interrupteur intérieur raccordé côté maison.

Côté connexions, dans chaque boîte tout est repris sur des **bornes Wago**. C'est rapide, c'est fiable, et surtout ça se contrôle d'un coup d'œil. Sur des boîtes qui reçoivent plusieurs départs et un va-et-vient, avoir des connexions lisibles fait gagner un temps fou le jour où il faut y revenir.

## L'étanchéité des boîtes extérieures : le gel, sans compromis

Une boîte de dérivation qui vit dehors, c'est une boîte qui va prendre l'humidité, la condensation, le gel des matins d'hiver savoyards. Et ici il y en a deux, l'une sous le dernier luminaire, l'autre en amont vers la maison. Si on laisse les connexions à l'air libre dans le boîtier, même fermé, l'oxydation finit toujours par s'installer et un jour ou l'autre le circuit lâche. J'ai déjà remis en service des installations où la corrosion avait tout mangé, et je n'avais aucune envie de reproduire ça chez mes parents.

La bonne réponse, c'est le **gel d'étanchéité**. On remplit les boîtes extérieures d'un gel de remplissage qui enrobe complètement les connexions. Plus d'air libre, plus d'humidité qui circule, plus d'oxygène autour des bornes : la corrosion n'a tout simplement plus de prise. C'est ce qui fait la différence entre une boîte qui tiendra un hiver et une boîte qu'on pourra oublier pendant des décennies.

![Boîte de dérivation extérieure remplie de gel d'étanchéité bleu](/images/prestations/eclairage_aix/boite_deriv1_gel.webp)
*Une des deux boîtes extérieures, une fois garnie de gel d'étanchéité. Les conducteurs et les connexions sont entièrement noyés. C'est l'assurance que l'humidité et le froid ne viendront pas grignoter les bornes au fil des saisons.*

## Le module Shelly : passer de l'interrupteur au smartphone

J'aurais pu m'arrêter là. Deux interrupteurs, un va-et-vient qui fonctionne, une allée enfin éclairée : le besoin de départ était rempli. Mais tant qu'à ouvrir les boîtes et à tirer les fils, autant offrir à mes parents un vrai plus. J'ai donc ajouté un **module Shelly 1 Mini Gen4** dans la boîte de dérivation intérieure.

L'idée n'est pas de remplacer les interrupteurs, mais de les compléter. Les va-et-vient continuent de fonctionner exactement comme avant, pour tout le monde, y compris ceux qui n'ont aucune envie de sortir leur téléphone pour allumer une lumière. Le module vient s'ajouter par-dessus et rend le même circuit **pilotable depuis un smartphone**. C'est là que la proximité avec la box wifi prend tout son sens : le Shelly a besoin d'être connecté au réseau, donc on l'implante dans une zone bien couverte, à portée de la box.

![Module Shelly 1 Mini Gen4 raccordé dans la boîte de dérivation intérieure](/images/prestations/eclairage_aix/boite_deriv2_shelly.webp)
*Le Shelly 1 Mini Gen4, raccordé dans la boîte de dérivation intérieure, à côté du tableau et de la box. Un module gros comme une boîte d'allumettes qui transforme un circuit d'éclairage classique en circuit pilotable.*

Concrètement, qu'est-ce que ça change pour eux ? Deux choses très concrètes. D'abord, ils peuvent **allumer l'allée depuis la voiture**, avant même d'arriver au portail. Quand on rentre de nuit chargé de courses, avoir l'allée déjà éclairée avant d'ouvrir la portière, ça compte. Ensuite, et c'est ce qui les a le plus séduits, ils peuvent **simuler une présence** quand ils sont absents. Partir quelques jours et faire s'allumer et s'éteindre l'éclairage extérieur à des horaires crédibles, depuis leur téléphone, où qu'ils soient, c'est une dissuasion toute simple contre les mauvaises surprises au retour.

Un mot sur mon choix du Shelly, parce que ce n'est pas anodin et que j'en ai déjà parlé plus en détail dans un [article dédié à la domotique]({{ site.baseurl }}/blog/2026/04/07/shelly-domotique-choix/). Ces modules savent fonctionner en **local**, sur le réseau de la maison, sans dépendre d'un cloud ni d'un abonnement. L'éclairage reste commandable même si internet tombe, et les habitudes d'allumage de mes parents ne partent chez personne. Pour un simple éclairage d'allée, ça peut sembler du détail. Pour moi, c'est une question de cohérence : maîtriser son installation chez soi, ça vaut aussi pour la plus petite des lumières.

## Les luminaires : du socle au point allumé

Restait le plus visible, les luminaires eux-mêmes. Quatre bornes basses en inox, alignées le long de l'allée, posées chacune sur un socle. C'est le genre de finition qui demande un peu de soin : il faut que l'alignement soit propre, que les socles soient stables, et que la sortie de câble tombe pile au bon endroit pour disparaître dans le pied du luminaire.

![Socle béton avec la sortie de câble en attente du luminaire](/images/prestations/eclairage_aix/socle_luminaire.webp)
*Un des socles, avec la sortie de câble en attente. Chaque luminaire est raccordé à ce niveau, connexion protégée, avant d'être fixé et aligné avec les autres le long de l'allée.*

Une fois les quatre points raccordés, l'interrupteur du portail basculé et l'allée qui s'illumine d'un coup, on mesure tout de suite la différence. Ce qui était un couloir sombre devient un chemin balisé, rassurant, praticable les mains chargées et par tous les temps.

![Allée de jardin éclairée à la tombée du jour par les quatre luminaires installés](/images/prestations/eclairage_aix/luminaire_allume.webp)
*L'allée à la tombée du jour, les quatre luminaires allumés. Ce qui était un couloir sombre devient un chemin balisé, doux et rassurant. Et désormais, ça s'allume aussi depuis un téléphone.*

## Ce que je retiens de ce chantier

Sur le papier, c'est un chantier modeste : quatre luminaires, un va-et-vient, un module connecté, un peu moins d'une journée et demie. Rien de spectaculaire. Mais c'est typiquement le genre d'intervention qui a un impact démesuré sur le quotidien par rapport à sa taille. On ne parle pas de refaire une installation entière, on parle de supprimer un inconfort que mes parents subissaient à chaque nuit d'hiver depuis des années.

Techniquement, ça reste un bel exercice complet : penser les points de commande, isoler le circuit sur son disjoncteur, gérer proprement la chaîne entre les deux boîtes extérieures et la boîte intérieure, soigner l'étanchéité au gel, et greffer par-dessus une couche de pilotage sans jamais sacrifier le confort de l'interrupteur physique. C'est tout ce que j'aime dans ce métier réuni sur un petit chantier.

Et il y a un détail qui a rendu celui-ci particulier : je n'étais pas seul. Mon père était là, avec moi, toute la journée. Il m'a aidé à tirer les gaines, à les fixer, à tenir les boîtes pendant que je raccordais. On a travaillé côte à côte, et j'ai réalisé à quel point ces moments-là sont rares. On ne les provoque pas assez. Alors quand ils arrivent, j'essaie d'en profiter à fond.

Et puis il y a le reste, qui ne se mesure pas en ampères. Rendre service à ses parents, les voir contents d'un truc aussi simple que de pouvoir allumer leur allée depuis le canapé ou depuis la voiture, c'est une satisfaction particulière. Ils sont ravis, je suis content de les avoir rendus contents, et l'allée n'est plus jamais dans le noir. Pour un peu moins d'une journée et demie de travail, difficile de faire un meilleur rapport effort sur bonheur.

---

*Vous pouvez suivre la suite sur [LinkedIn]({{ site.linkedin }}) et [Instagram]({{ site.instagram }}). Un projet d'éclairage extérieur ou de pilotage connecté ? [Contactez-moi](https://www.lartisan20.fr/contact/).*
