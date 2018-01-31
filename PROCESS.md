# week 2.
***
maandag:
* moeilijk om te bedenken waar ik moet beginnen
* ik denk dat ik eerst alle visualizaties los ga maken en dan kan ik ze daarna in een keer in containers gooien
* gewerkt aan mijn multi line graph.
* bij helemaal klaar ik wil er alleen nog een moeie legenda bij.

dinsdag:
* verder gewerkt aan mijn multi line graph op een of andere manier krijg ik de lijnen niet goed getekend het lijkt er op of de waardes van 0 naar x max en dan weer terug gaan
* ik denk dat het aan de x as ligt maar ik heb geen idee hoe ik dit het best kan oplossen
* ook  al gekeken naar een bootstrap template om op verder te bouwen

woensdag:
* productief daggie
* advies gekregen om mijn x as op ordinaal te zetten en in het begin al een lijst met data punten voor de x as mee te geven 
* ik vind het eigenlijk niet zo mooi maar blijkbaar is dit wel de meest efficiente manier
* bootstrap html bijna klaar hard gewerkt aan het het goed passen van de containers voor de svg's 
* bar graph gemaakt

donderdag:
* begonnen aan mijn met de losse svg's inpassen in een pagina op een of andere manier appand mijn bar graph niet aan mijn row container
* begonnen met een functie die de data van mijn line graph kan proccessen naar mijn bar graph
* besloten om toch de data verwerking in javascript te doen omdat er te veel mogelijkheden zijn om te selecteren met een brush over 
* 

vrijdag:
* feedback van de resentatie: het is belangrijk goed te laten zie wat je uit de visualiztie wil halen en er moet wel een duidelijk verhaal bij gescheven worden
* daarom besloten dat ik mischien wel op mijn pagina een soort uitleg moet hebben over wat er allemaal te doen is op de pagina
* ook ben ik aan het nadenken hoe een extra visualizatie mischien kan bijdragen aan het verhaal
* ook was er commentaar over het verwerken van de data in d3 ik ben daarom aan het overwegen om de data ook in python te proccesen.
*

***
# week 3.
***

maandag:
* ik begin vandaag aan mijn sunburst
* sunburst doet het niet goed. ik denk dat het aan mijn data ligt, ik probeer het nu eerst via python te doen. maar op een of andere manier krijg ik alleen maar een size of 1 terwijl terwijl dit overal anders zou moeten zijn.
* ik denk dat ik ook een force directed graph wil maken dit als 4de visulaizatie hier kan ik dan de gemiddelde prijzen van de films in weergeven dit kan dan naast de sunburst staan die het aantal weergeeft hierdoor kun je het verschil vinden tussen de gemiddelde opbrengst en het aantal fims. hierdoor is te zien dat er geen relatie is is tussen de twee
* 

dinsdag:
* eindelijk gevonden wat er mis ging met mijn sunburst "type foutje"
* ziek eerder naar huis
* 

woensdag:
* ziek thuis gebleven
* 

donderdag:
* ik was nogsteeds niet helemaal beter vandaag super kut want ik heb het idee dat ik nu nog best wel veel moet doen.
* ik heb nu alle visualizaties af en in mijn bootstrap gezet
* het lijkt alleen of de update van de brush te veel power kost want de hele pagina loop vast als ik mijn grafiek update 
* ook heb ik een bug met het updaten van mijn force graph het lijkt wel of hij wel de goeie nodes neerzet maar niet de goeie labels er aan hangt heel raar. ik denk dat ik dit wel kan oplossen maar ik  weet nog niet zo goed hoe.

vrijdag:
* presentatie gegeven ging best goed alleen lijkt het er op dat ik nog een bug heb met het updaten van mijn sunburst waarneer hij op een bepaalde catogorie is ingezoomt en dan word geupdate dan verscheind er af en toe een stuk van de verborgen ringen(de ringen die zijn verdweenen door het inzoomen). aan de andere kant heeft dit mij aan het denken gezet want wat nou als ik sta ingezoomt op een catagorie die niet meer bestaat bij het updaten
* waarneer dit gebeurt laat hij nu een totaal andere catagorie zien, dit is natuurlijk raar omdat deze nooit geselecteerd is.
* daarom heb er heb ik net een functie geschreven die de sunburst kan inzoomen maar hem ook terug kan zetten naar een main overview waarneer hij wordt geupdate.
* ik heb ook het probleem van de force graph gevonden het lijkt er op dat het ging om een asynchroniteit waarbij hij eerst de node en labels maakte en daarna pas de oude data weggooide. 
* ik heb eerst geprobeert dit optelossen door een extra functie te maken die daarna de rest aanriep maar dit was toch niet echt mooi.
* daarna heb ik met wat heen er weer schuiven van de verwijder functie een plek gevonden waar hij het goed deet.
* 

***
# week 4.
***

maandag:
* alles werkt naar behoren maar zien er nog niet echt mooi uit
* ik ben de code aan het opschonen en bedenk mij op eens dat het best leuk zou kunnen zijn om de namen van de films ergens te laten zien zodat de gebruiker ook een film kan kiezen op basis van de visualizatie
* ik denk dat ik dit het best nog ff met een tiptool er in kan zetten een table zou ook leuk zijn maar dat kost te veel tijd.
* de code ziet er aardig uit en het opschonen ging prima beetje commenten en klaar

dinsdag:
* bezig met de tooltip lukt best aardig en krijg ik vandaag wel af denk ik
* het is denk ik belangrijk voor het overzicht dat zowel de sunburst en de force graph alletwee de films laten zien want ik denk dat daardoor de link tussen de twee ook duidelijker wordt
* de sunburst heeft alleen al een tooltip die laat zien hoeveel films er in een catagorie zitten dit is ook belangrijke informatie om de visualzatie te ondersteunen
* daarom heb ik er voor gekozen om alleen in de buitenst ring de namen van de films weer te geven en in de andere ringen de hoeveelheid films 
* dit is ook beter want hope dichter de ring bij het midden komt hoe meer films er in zitten. dit middelste ring zou dan 500 film namen weergeven daar heeft niemant wat aan
* 

woensdag
* ik hoorde vandaag dat de python code die je gebruikt om de data te processen ook nageken word 
* hier ben ik niet heel blij mee want die code is super slordig
* ook ben ik mijn code aan het nakijken en kom ik toch iedere keer weer slordige dingen tegen 
* verder ben ik aan het verslag begonnen en het schrijven van wat uitleg over de visualizaties