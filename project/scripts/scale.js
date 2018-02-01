/* scale.js
 * minor programming
 *
 * build brush over for updating visualizations
 * by: mannus schomaker 10591664
 * 
 */

// intit canvas for line graph and scale brush
var margin = {top: 40, right: 100, bottom: 40, left: 50},
width = 650 - margin.left - margin.right,
height = 350 - margin.top - margin.bottom;

// set x axis 
var x = d3.scaleTime()
.domain([new Date(1925, 1, 1), new Date(2015, 1, 15) - 1])
.range([0, width - 25]);

// required functionality for scale function when window loads
function scale(dataOld){

// append grid layout to canvas with same padding as line graph
var svg = d3.select("#line")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
.attr("class", "axis axis--grid")
.attr("transform", "translate(0," + height + ")")
.style("opacity", 0.4)
.call(d3.axisBottom(x)
    .ticks(d3.timeYear, 5)
    .tickSize(-height)
    .tickFormat(function() { return null; }))
.selectAll(".tick")
.classed("tick--minor", function(d) { return d.getYear(); });

// add x axis 
svg.append("g")
.attr("class", "axis axis--x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x)
    .tickPadding(0))
.attr("text-anchor", null)
.selectAll("text")
.attr("x", 6);

// add brush over effect
svg.append("g")
.attr("class", "brush")
.call(d3.brushX()
    .extent([[0, 0], [width - 25, height]])
    .on("end", brushended));

// function for brush effect
function brushended() {

// Only transition after input and Ignore empty selections
if (!d3.event.sourceEvent) return; 
if (!d3.event.selection) return; 
var d0 = d3.event.selection.map(x.invert),
  d1 = d0.map(d3.timeYear);
  
// If empty when rounded, use floor & ceil instead
if (d1[0] >= d1[1]) {
d1[0] = d3.timeYear.floor(d0[0]);
d1[1] = d3.timeYear.offset(d1[0]);
}

sentYears(d1, dataOld)

d3.select(this)
    .transition()
    .call(d3.event.target.move, d1.map(x));
}
}
function sentYears(years, data){
    dataForUpdate = []
    data.forEach(function(d) {
        if (d.year_release >= years[0].getFullYear() && d.year_release <= years[1].getFullYear()){
            dataForUpdate.push(d)
        }
    })

    valueBarUpdate(dataForUpdate)
    valueBarUpdateMvsW(dataForUpdate)
    valueSun(dataForUpdate)
    // valueForce(dataForUpdate)
}