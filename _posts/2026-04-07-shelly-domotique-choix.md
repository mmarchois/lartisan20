---
layout: blog
title: "Pourquoi j'ai choisi Shelly comme solution de domotique"
description: "Open source, contrôle local, zéro GAFAM, efficacité énergétique : voilà les vraies raisons pour lesquelles j'ai choisi Shelly + Home Assistant pour domotiser ma maison dans le Lot et les installations de mes futurs clients."
keywords: "Shelly, domotique, Home Assistant, open source, MQTT, maison connectée, sans cloud, GAFAM, efficacité énergétique, électricien, artisan 2.0"
category: "Domotique"
date: 2026-04-07
published: true
excerpt: "Ça fait plusieurs mois que je me renseigne sur la domotique. Au départ, ça ne m'intéressait pas vraiment. Ce qui m'a fait changer d'avis, c'est en creusant sous un autre angle."
image: /images/blog/shelly.png
---

Ça fait plusieurs mois que je me renseigne sur le sujet. Et honnêtement, au départ je pensais que la domotique c'était surtout pour allumer ses lumières avec la voix. Ça ne m'intéressait pas vraiment.

Ce qui m'a fait changer d'avis, c'est en creusant la question sous un autre angle. Pas celui du confort ou du gadget, mais celui de la souveraineté, de l'écologie et de la liberté technique. Et une fois que j'ai commencé à regarder par là, le choix s'est imposé assez rapidement.

## Pourquoi la domotique m'intéresse maintenant

Je suis en train de planifier l'installation électrique complète de ma maison dans le Lot. C'est une rénovation de A à Z, ce qui veut dire que j'ai une opportunité rare : penser le câblage domotique **dès le départ**, sans contrainte d'existant.

En parallèle, je vais déployer la même logique dans les locaux de Fairness, ma coopérative, comme premier terrain d'expérimentation réel. Et à terme, c'est ce que je proposerai à mes clients. Pas comme un gadget, mais comme une réponse cohérente à des enjeux concrets.

Ça m'a donc obligé à vraiment creuser le sujet. Quels protocoles ? Quel matériel ? Quelle architecture ? Et surtout : quelles valeurs derrière tout ça ?

## Le problème avec la domotique "grand public"

Quand on cherche "maison connectée", on tombe d'abord sur les solutions grand public : Amazon Echo, Google Home, Apple HomeKit, Philips Hue, Somfy... Des marques solides, des produits bien finis, des applis soignées.

Et un point commun : tout transite par un cloud que vous ne contrôlez pas.

Le principe est le suivant. Vous appuyez sur un bouton dans votre appli. La commande monte vers un serveur distant. Ce serveur la renvoie vers votre ampoule. Même si les deux sont dans la même pièce de votre maison. C'est ce qu'on appelle le modèle **cloud-first**.

Ce modèle a trois conséquences concrètes :

**1. Si internet tombe, rien ne fonctionne.** Pour du chauffage en hiver dans le Lot, dépendre d'une connexion internet pour allumer un radiateur, c'est un risque que je ne veux pas prendre.

**2. Si l'entreprise ferme ou coupe son service, votre installation tombe.** Ça arrive. Des constructeurs ont fermé leurs serveurs du jour au lendemain, laissant des milliers d'utilisateurs avec du matériel devenu inutilisable. Vous avez payé le matériel, mais vous n'en êtes pas vraiment propriétaires.

**3. Vos données de comportement appartiennent à quelqu'un d'autre.** Quand vous êtes chez vous, à quelle heure vous vous levez, quand vous chauffez, quand vous dormez... tout ça remonte quelque part. Et ce quelque part, c'est souvent aux États-Unis, soumis au Cloud Act, inaccessible à votre contrôle.

Ce n'est pas le projet que j'ai envie de construire. Ni chez moi, ni chez mes futurs clients.

## Pourquoi Shelly s'est imposé

Shelly est une marque bulgare (la société s'appelle Allterco) qui fabrique de petits modules domotiques. L'idée de base : ces modules se glissent derrière vos interrupteurs et prises existants, dans la boîte d'encastrement. Pas besoin de tout refaire.

Techniquement, c'est très bien fait. Mais ce qui m'a convaincu, c'est leur philosophie.

### Des puces open source

Les modules Shelly sont construits sur des puces **ESP32**, les mêmes que celles qu'utilisent les makers, les bidouilleurs, les communautés open source du monde entier. Ce n'est pas un choix anodin. Ça veut dire que la communauté comprend le matériel, peut l'auditer, peut développer dessus.

### MQTT et API locale natifs

Dès la sortie de boîte, sans flash, sans modification, les modules Shelly supportent :

- **MQTT** : un protocole de messagerie léger, ouvert, standardisé, utilisé partout dans l'IoT
- **API REST locale** : vous pouvez envoyer une commande HTTP directement à votre module depuis votre réseau, sans passer par internet

Concrètement, ça veut dire que vous pouvez contrôler un Shelly depuis n'importe quel outil capable de faire une requête HTTP ou de publier un message MQTT. Votre propre script, votre propre serveur, votre propre logiciel.

**Point important à préciser pour ceux qui connaissent le sujet :** tout cela est vrai uniquement si vous n'activez pas le Shelly Cloud. L'application officielle Shelly propose un cloud (pratique, bien fait) mais ce n'est pas ce que j'utilise. Mon choix, c'est 100% local.

### Un firmware remplaçable

Si un jour vous voulez aller encore plus loin, vous pouvez flasher un firmware alternatif open source comme Tasmota ou ESPHome sur vos modules Shelly. Vous prenez le contrôle total du logiciel qui tourne sur votre matériel.

C'est une liberté qu'aucune solution propriétaire ne vous offre.

### Zéro abonnement

Il n'y a pas d'abonnement mensuel pour utiliser Shelly en local. Vous achetez le module, une vingtaine d'euros en moyenne et c'est tout. Pas de frais cachés, pas de service qui peut vous être coupé.

## Home Assistant : le cerveau qui centralise tout

Shelly seul, c'est déjà très bien. Mais Shelly + **Home Assistant**, c'est une autre dimension.

Home Assistant est un logiciel open source de domotique qui tourne sur un petit serveur chez vous, un Raspberry Pi ou une box dédiée comme la Home Assistant Green ou la Yellow. Il devient le cerveau de toute l'installation : il agrège tous vos appareils, quelle que soit la marque, dans une seule interface.

Et tout ça tourne **localement**, chez vous, sans passer par aucun cloud.

L'intégration Shelly dans Home Assistant est officielle, locale et se configure en quelques minutes. Les modules sont détectés automatiquement sur le réseau. Vous n'avez pas besoin de bidouiller.

Concrètement, depuis une seule interface, vous pouvez :

- Piloter le chauffage pièce par pièce
- Gérer l'éclairage et la variation
- Contrôler les volets roulants
- Suivre votre consommation électrique en temps réel
- Créer des automatisations : couper le chauffage si une fenêtre est ouverte, éteindre toutes les lumières en partant, ajuster selon la météo locale

Home Assistant est soutenu par une communauté de plusieurs centaines de milliers d'utilisateurs dans le monde. Le code est ouvert. Il ne dépend d'aucune entreprise privée. Si demain la société qui le développe disparaît (ce qui est très peu probable) le projet continuera à vivre.

## La question écologique et je vais être honnête

C'est peut-être la dimension la plus importante pour moi et celle sur laquelle je veux être le plus lucide.

La domotique peut vite devenir du **tout-connecté inutile**. Des dizaines de modules qui consomment en permanence, des capteurs partout, des automatisations qui ne servent à rien en pratique. Ce n'est pas ce que je veux construire.

Mon objectif est simple : **consommer ce qu'il faut, pas plus**. La domotique n'est pas une fin en soi, c'est un outil au service de cet objectif.

Concrètement, ça veut dire :
- Chauffer uniquement les pièces occupées, aux heures où elles le sont
- Ne pas chauffer à plein quand on n'est pas là
- Éteindre automatiquement ce qui a été oublié allumé
- Suivre sa consommation réelle pour identifier les postes importants

Shelly propose des modules avec mesure de puissance intégrée. Vous voyez en temps réel ce que consomme chaque circuit. C'est une information précieuse pour comprendre et agir.

**Maintenant, l'honnêteté s'impose sur un point.** Les modules eux-mêmes ont un impact carbone à la fabrication. Des composants électroniques, des circuits imprimés, de la logistique. Je ne vais pas faire semblant que non. C'est une réalité.

Mais une installation bien pensée, dimensionnée au juste nécessaire, sur une durée de vie de plusieurs années, produit un bilan net positif. Les économies d'énergie réalisées sur le chauffage (souvent 15 à 30% selon les installations) compensent largement l'empreinte de fabrication des modules. À condition de ne pas tomber dans le piège du "tout connecter parce qu'on peut".

C'est ce que j'appellerai une domotique sobre. Et c'est celle que je veux pratiquer et proposer.

## Ce que ça va donner concrètement

**Dans ma maison du Lot**, l'installation partira de zéro. Le câblage sera pensé pour la domotique dès le départ :
- Radiateurs électriques pilotés via fil pilote avec des **Shelly Plus 1**
- Éclairage variable avec des **Shelly Dimmer**
- Volets motorisés avec des **Shelly 2.5** ou **Wave 2PM**
- Mesure de consommation circuit par circuit
- Home Assistant comme cerveau central, tournant sur un Raspberry Pi

**Dans les locaux de Fairness**, je commence par une installation plus modeste : quelques circuits d'éclairage et de chauffage, pour valider l'approche en conditions réelles avant de l'étendre. Pour une coopérative qui défend des valeurs d'autonomie et de transparence, maîtriser son infrastructure du quotidien sans dépendre d'un tiers commercial, c'est aussi une question de cohérence.

**Chez mes futurs clients**, ce sera cette même logique, adaptée à chaque situation. Pas un produit à vendre, mais une approche à partager.

## Pour aller plus loin

Si vous voulez creuser le sujet, voici quelques ressources utiles :

- [Documentation officielle Shelly](https://www.shelly.com) et notamment leur API locale
- [Home Assistant](https://www.home-assistant.io) : la doc est excellente, la communauté encore plus
- [MQTT Explorer](https://mqtt-explorer.com) : pour visualiser ce qui transite sur votre réseau domotique

Je documenterai tout le projet ici au fur et à mesure : les schémas, les configurations, les choix techniques et les galères aussi. C'est ça l'idée de L'artisan 2.0 : partager le chantier en temps réel, pas seulement le résultat final.

---

*Des questions sur Shelly, Home Assistant, ou la domotique en général ? Les commentaires sont là pour ça. Et si ce sujet vous parle, retrouvez la version condensée sur [LinkedIn](https://www.linkedin.com/company/l-artisan-2-0) et n'hésitez pas à partager si ça peut intéresser votre réseau.*
