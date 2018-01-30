/* scale.js
 * minor programming
 *
 * loads in data and calls functions to build visualizations
 * by: mannus schomaker 10591664
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



// load in data for start of page
queue()
    .defer(d3.csv, "../data/data.csv")
    .defer(d3.json, "../data/dataMulti.json")
    .defer(d3.json, "../data/dataNetwork.json")
    .await(startMyPage);

// cal init functions of visualizations
function startMyPage(error, all, multi, net) {

    allData = all;

    initSun(net);
    initMulti(multi, yearslist)
    initForce(net);
    scale(all);
    initBar(all);

}