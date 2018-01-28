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


 // functies voor uitklappen infowindows
$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip2").click(function(){
        $("#panel2").slideToggle("slow");
    });
});


var dataBarEtnicities;
var dataBarMvsW;

queue()
.defer(d3.csv, '../data/data.csv')
.defer(d3.json, '../data/data.json')
.await(startMyPage);

function startMyPage(error, all, her){
    Sun(her)
    allData = all
    valueMulti(all)
    //valueSun(data)
    force(her)
    scale(all)
    myFuncBar(all)

}