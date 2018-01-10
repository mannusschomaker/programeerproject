# Design Document
***
## Data Source
***
* [Dataset - ‘Straight Outta Compton’ Is The Rare Biopic Not About White Dudes' - FiveThirtyEight](https://fivethirtyeight.com/features/straight-outta-compton-is-the-rare-biopic-not-about-white-dudes/)
    * dit is een artiekel over de ongelijkheid in biografiche films. de dataset die in dit artiekel gebreukt wordt is als een cvs te downloaden van github

***
## technische componenten
***
* Hier een weergave van de de pagina indeling die de website zal bevatten. Boven in het scherm is er een tabblad blak aanwezig met de keuze tussen de visualizatie of het verhaal of contact.

  
***
## Beschrijving en implementatie
***
* **Implementatie van de scripts:**
    * Een file met een functie waarin de multi-series line graph wordt gemaakt. 
        * Hierin wordt ook een functie voor een dropdown menu geimplementeerd dat de keuze biet tussen een line graph waar mannen en vrouwen of witten en niet witten mensen worden uitgezet.
            * Een file met een functie waarin een slider verwerkt wordt die het aantal jaren aanpast waarmee de andere twee grafieken worden geupdate. In dit bestand wordt ook de data doorgespeeld naar de andere twee grafieken.
    * Een file met een functie waarin een sunburst chart wordt gemaakt. 
        * Hier moet ook gemaakt worden die de data transformeert naar een format waarmee een sunburst kan worden gemaakt.
    * Een file met een funcite waarin een grouped barchart wordt gemaakt die dynamisch wordt geupdate aan de hand van de multie-series line graph
***
* **beschrijving van de gebruikers opties**

multie-series line graph:

* hier worden of de hoeveelheden mannelijke en vrouwelijke hooftrolspelers tegen elkaar uitgezet
* of doormiddel van een drop down menu witte tegen tegen niet witte mensen tegen lekaar uitgezet
* er is een slider onder de line graph die de hoeveelheid data die weergeven wordt in de andere grafieken aanpast

Sunburst chart:

 * Eerste ring: in deze ring is zijn te zien welke etniciteiten er voorkomen in de geselecteerde periode
  * Buitenste ring: hier hier wordt per etniciteit de persecentages van de verschillende catogorien films weer gegeven
     
grouped bar graph:



***
#### Hooft Functies
***
* drawmulti() = maakt multi-series line graph
* updateDropDown() = update de multi-series line graph aan de hand van een drop down
* slider() = silder onder de line graph die de hoeveelheid data naar de andere grafieken reguleerd deze functie stuurt ook de data door naar de anderen grafieken
* dataFormatSun() = de structuur van de data aanpassen zodat het geschikt is voor de sunburst
* drawSunburst() = maakt een sunburst van de meegegeven data
* drawgroupedBarchart() == maakt een grouped bar chart

***
## d3 libraries
***

[Bootstrap](https://getbootstrap.com).
[D3 tooltip](https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js).
[D3](https://d3jsV4.org).
[jQuery](https://jquery.com).
een queue library.
een library of IPA voor het dynamich maken van jason opjects.
