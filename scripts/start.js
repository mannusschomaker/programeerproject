/* start.js
 * minor programeren
 * programeer project
 *
 * d3.js page for interactive bar graph
 * interactive bar chart
 * graph is interactive: info popup when hovering over bars
 * door: mannus schomaker 10591664
 * 
 */

var yearslist = ["1925-1930", "1930-1935", "1935-1940", "1940-1945", 
                "1945-1950", "1950-1955", "1955-1960", "1960-1965", "1965-1970", 
                "1970-1975", "1975-1980", "1980-1985", "1985-1990", "1990-1995", 
                "1995-2000", "2000-2005", "2005-2010", "2010-2015"]

 // functions to foldout info-windows
$(document).ready(function() {
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});

$(document).ready(function() {
    $("#flip2").click(function(){
        $("#panel2").slideToggle("slow");
    });
});




queue()
    .defer(d3.csv, "../data/data.csv")
    .defer(d3.json, "../data/data.json")
    .defer(d3.json, "../data/dataMulti.json")
    .defer(d3.json, "../data/dataNetwork.json")
    .await(startMyPage);

function startMyPage(error, all, nested, multi, net) {
    initSun(nested);
    allData = all;

    initMulti(multi, yearslist)
    
    initForce(net);
    scale(all);
    initBar(all);
}