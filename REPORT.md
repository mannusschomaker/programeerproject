# Beschrijving
Hoe kan het dat 80% van de verhalen die verfilmt worden een witte man als hooft personage heeft? Dit is een probleem dat aan het licht gebracht moet worden en hoe kan dit beter dan met een helderen visualizatie. Deze visualizatie kan als educatief middel worden gebruikt om de westerse wereld te laten zien dat gelijkheid nog niet zo normaal is als wij denken.
![alt text](https://github.com/mannusschomaker/programeerproject/blob/master/doc/fullPagePulsInfo.png)
***
# technische design:


![alt text](https://github.com/mannusschomaker/programeerproject/blob/master/doc/structure.png)

- in oranje de style map met daar in een file styleSheet.css deze pagina styled the hele pagina.
    - **styleSheet.css**
- alle .js files zitten in de map scrips ( hieronder weergegeven met functies die van belang zijn voor de functionaliteit )
    - **sun.js** ( bevat functies voor het tekenen van de sunburst )
        - initSun(data)
        - updateSun(rootSun)
        - focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 })
    - **scale.js** ( bevat functie voor het tekenen van de brush schaal over de multi-line grafiek )
        - scale(dataOld)
    - **force.js** ( bevat functies voor het tekenen van de force-directed grafiek )
        - initForce(data)
        - updateForce()
        - click(d)
    - **multi.js** ( bevat functie voor het tekenen van de multi-line grafiek )
        - initMulti(data, yearsList)
    - **bar.js** ( bevat functies voor het tekenen van de bar grafiek )
        - initBar(data)
        - barUpdate(data)
- de index.html zit los in de map project
    - **index.html** (bevat een bootstrap template voor de formgeving van de pagina)

- in de data map zitten data files die bij het laden van de pagina worden ingeladen ook zitten hier de python bestanden in die gebruikt zijn voor het processsen van de data
    - **allDATA.csv** (de orginele data set)
    - **dataMulti.json** (de data die wordt gebruikt om de lijn grafiek te tekenen)
    - **dataNetwork.json** (de data die wordt gebruikt om bij de eerste keer laden van de pagina de sunburst en de force grafiek te tekenen)
    - **prePorocessingNetwork** (gebruikt voor dataNetwork.json)
    - **prePorocessing** (gebruikt voor de andere aangepasde data)

# functionaliteit 
- via de github page link wordt index.html aangeroepen
    - via index.html wordt de main.js aangeroepen
        - in main.js wordt de data ingeladen voor het starten van de visualizaties
        - ook worden hier de initializatie functies van scale.js, sun.js, force.js, bar.js en multi.js aangeroepen
            - deze functies roepen op hun beurt hun eigen update functie aan om de de grafieken te tekenen
            - dit geld niet voor scale.js en multi.js deze grafieken worden namelijk nooit geupdate
        - waarneer er in scale.js een tijdseenheid wordt geselecteerd wordt deze door gestuurd naar update.js 
            - hier wordt valueSun() aangeroepen om de data te herschrijven voor de force graph en de sunburst.
            - valueBarUpdate() maakr hier nieuwe data voor de bar chart met etniciteiten
            - valueBarUpdateMvsW() maakr hier nieuwe data voor de bar chart waar man tegen vrouuw wordt uigezet
        - deze value functies in update roepen op hun beurt weer de update functies aan die in de visualizaties .js bestanden staan -> die tekenen opnieuw de visualizatie
        
        - updates binnen visualizaties:
            - sun.js heeft nog een andere belangrijke functie namelijk focusOn() deze functie zorgt voor de zoom optie binnen de sunburst
            - force.js heeft ook nog een andee belangrijke functie click() deze functie zorgt voor de mogelijkheid om nodes in en uit te klappen
            - update.js bezit twee functies die on buttun click worden aangeroepen om de bargraph te updaten tussen ( Man vs vrouw ) en etniciteiten
***
# uitdagingen

- de eerste uitdaging die ik ben tegen gekomen is
 bedenken hoe ik de data opnieuw zou kunnen processen voor het updaten door middel van de scale brush. de uitdaging zat hier in dat mijn brush oneindig veel data mogelijkheden had.

- voor het updaten van mijn bar graph had ik hier meerdere mogelijkheden
    - of ik kon de gemiddelde prijs per jaar voor elke bar inladen en hieruit jaren selecteren. het probleem van deze optie was echter dat de meeste jaren maar een 1 of mischien twee films bevatten hierdoor zou er groote data set ontstaan waar alsnog overheen geloopt moet worden om de geselecteerde jaren te extraheren. hier door kost het veel tijd en moet er een extra data set worden ingeladen. daarom heb ik gekozen om de data niet vooraf inteladen maar in javascript te processen.
- voor het updaten van mijn sunburst en force grafiek
    - hier waren niet de zelfde opties van toepassing omdat de data voor deze visualizaties ee hiërarchische structuur nodig heeft. deze structuur is niet overal het zelfde omdat niet elke catagorie in elke tijds frame voorkomt.
    - ik zou hier of kunnen kiezen voor een gelimiteerd aantal update mogelijkheden die ik van te voren inlaad. 
    - of en hier heb ik voor gekozen om ook deze dataset bij idere brush opnieuw te bouwen in javascript
    - de consequentie hiervan is dat mijn scale niet meer kan updaten on drag omdat het proccesen van de data hier te veel tijd in beslag neemt. daarom heb ik er een drag update on release van gemaakt dit werkt top.

- de tweede uitdaging was het text verwerken in de force en in de sunburst.
- dit was een probleem omdat het en de visualizatie minder zichbaarmaakte en vaak buiten het kader viel om niet zichtbaar was voor de groote van het object waar hij in zat
    - bij mijn sunburst waren de labels niet zichbaar omdat de arcs waar ze in zaten te klein waren 
    - bij de force grafiek vielen alle texten overelkaar heen waardoor niet meer leesbaar waren en de visualiztie niet meer zichtbaar was

- ik hier meerdere mogelijkheden:
    - ik heb er voor gekozen om de labels toch te laten staan.
    - hiervoor zijn meerdere redenen:
        - bij de sunburst en de force gaat het om het vergelijken van verschillende catogorien daarom is het belangrijk dat de namen van meerderen arc's zichtbaar zijn dit kan niet met een tooltip
        - bij mijn foce graph is het mogelijk om te dragen dit betekent dat als je een node text niet goed kan lezen je dezen gewoon naar buiten kan slepen waar hij wel zichtbaar is
        - voor het verhaal van de sunburst zijn de grootste arc's van het meeste belang en mocht je intresse hebben in een kleinere arc dan kan je grwoon klikken op die arc om hem uit te vergroten.
- door deze redenen heb ik er toch voor gekozen de texten te laten staan. ter verduidelijking heb ik wel ook een tooltip toegevoed met extra informatie

- de derde uitdaging die ik graag wil beschrijven is de line grafiek met brush.
- het probleem was hier dat ik voor mijn line grafiek niet genoeg data punten had voor een lineare x-as met voor elke jaar een datapunt. (er zijn ook jaren waar geen autobiografiche films zijn uitgegeven)
    - om dit te verhelpen ben ik gegaan voor het aantal films per 5 jaar.
    - ik ben toch gebleven bij een lijn grafiek omdat het hier gaat over data in een tijds verloop. dit is ook belangrijk voor het verhaald
    - deze keuze had wel inpact om mijn brush over omdat dit opeens toch het aantal te selecteren data verkleint. 
    - daarom heb ik er voor gekozen om de brush er los overheen te leggen met een de.time scale.
- het was hierbij wel van belang dat de ticks en assen overeen zouden komen met mijn line chart dus heb ik er voor gekozen een grid in mijn brush te verwerken.
de consuqentie van deze methode is dat de oppervlakte onder de gebrushte lijn niet meer representatief is voor het aantal films dat in die jaren geproduceert is die dit is jammer maar niet erg voor de visualizatie omdat de lijn hier slechts een onderstuining zijn voor de jaren die je wild selecteren. en de brush verder geen invloed heeft om de lijn grafiek.



