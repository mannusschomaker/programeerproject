# titel
***
meer diversiteit in hollywood.

# licensie
 Copyright (C) 2018 Mannus Schomaker, github: mannusschomaker
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

***
# github Pages

https://mannusschomaker.github.io/programeerproject/project/

# Demo project film

***kleine toevoeging de tooltip van de bar grafiek staat nog net iets te ver naar beneden dit had ik wel al aangepast maar was ik vergeten te pushen

https://www.useloom.com/share/7cb2f1727030433aaff024684e2d41d4

https://www.youtube.com/watch?v=JOY81zh8rXc&feature=youtu.be


# introductie
Hoe kan het dat 80% van de waargebeurde verhalen die verfilmt worden een witte man als hooft personage heeft? Was jij je hier bewust van, ik niet! Dit is een probleem dat aan het licht gebracht moet worden en hoe kan dit beter dan met een helderen visualizatie. Deze visualizatie kan als educatief middel worden gebruikt om de westerse wereld te laten zien dat gelijkheid nog niet zo normaal is als wij denken. Helden verhalen komen overal voor. Dit moeten we terug zien in film.


# uitwerking
die pagina begint ingeklapt hierdoor zijn alle visualizaties goed te zien

![alt text](https://github.com/mannusschomaker/programeerproject/blob/master/doc/fullPagePulsInfo.png)

als men uitleg over de visualizaties wil kan er een info bar worden uitgeklapt hierdoor wordt het verhaal duidelijk en de mogelijkheden van de pagina worden uitgelegt.

![alt text](https://github.com/mannusschomaker/programeerproject/blob/master/doc/fullPage.png)

- opties:
De line graph laat zien hoeveel films er per 5 jaar uitgebracht zijn van twee verschillende groepen.
De sunburst laat zien wat voor hooft personages er zijn geweest in de geselecteerde jaren.
De barchart laat zien hoeveel een gemiddelde film van die etniticiteit heeft opgelevert voor het geselecteerde jaar dit kan hij ook voor mannen en vrouwen.
Waarneer je op de line graph brushed verandert de sunburst de barchart en de netwerk grafiek naar waarbij zij alleen de films van de geselecteerde jaren gebruiken. de force grafiek laat zien hoe belangrijk een catagory is geweest door de grote van de cirkel. dit wordt gemeten in wat een gemiddelde film in de catogorie heeft opgeleverd.

# Prerequisites

- Data bron:
http://fivethirtyeight.com/

- Data file:
https://github.com/fivethirtyeight/data/blob/master/biopics/biopics.csv

- overeenkoment:
de data is verkregen vanuit een article.
https://fivethirtyeight.com/features/straight-outta-compton-is-the-rare-biopic-not-about-white-dudes/
dit artiekel heeft slecht minimale visualizaties.
dit maakt mijn project een meerwaarde tussen de al betaande verhalen omtrand dit onderwerp.

- grootste opstakel:
er voor zorgen dat alle visulizaties op elkaar aansluiten. ook was het onhandig updaten met een brush omdat hierdoor te veel selectie opties ontstaat. daarom heb ik er voor gekozen om de data in eerste in stantie individueel in te laden voor elke visualizatie. bij het updaten word de geselecteerde data verwerkt in javascript. hoewel dit veel rekenkracht vereist zorgt dit er wel voor dat de gebruiker veel meer opties heeft en eindeloos kan graven in de data zonder twee keer de zelfde data tegen te komen.

- external components:
data verkregen via web article
bootstrap
ingeladen libraries(zie hieronder)

# Sturcture Repository



***
## libraries
***

- [Bootstrap](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)
- [jQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js)
- [D3 tooltip](https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js)
- [D3 v3](https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js)
- [D3 v4](https://d3js.org/d3.v4.min.js)
- [D3 Queue](https://d3js.org/queue.v1.min.js)
- [Google fonts](https://fonts.googleapis.com/css?family=Josefin+Slab)
