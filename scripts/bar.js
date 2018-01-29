/* multi.js
 * minor programeren
 *
 * d3.js page for interactive bar graph
 * interactive bar chart
 * graph is interactive: info popup when hovering over bars
 * door: mannus schomaker 10591664
 * 
 */

// init global variables
var dataBarEtnicities;
var dataBarMvsW;
var svg;
var xChart;
var yChart;
var xAxis;
var yAxis;
var colorScale;
var height;
var tooltip;


// init required functionality when window loads
function initBar(data) {

    // init canvas for bar chart
    svg = d3.select("#graph2").append("svg"),
    margin = {top: 20, right: 0, bottom: 100, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,

    g = svg.attr("height",height + margin.top + margin.bottom)
            .attr("width",width + margin.left + margin.right)
            .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set x and y range and set color scale
    xChart = d3.scaleBand()
        .range([0, width]);
    yChart = d3.scaleLinear()
        .range([height, 0]);

    colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // init function for x and y axis and init tooltip
    xAxis = d3.axisBottom(xChart);
    yAxis = d3.axisLeft(yChart)
        .tickSizeOuter(0)
        .tickSize(-width);

    tooltip = d3.select("#graph2")
        .append("div")
        .attr("class", "toolTip");

    //left axis
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    
    //bottom axis
    g.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-30)";
            });

    //add labels
    g.append("text")
        .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
        .text("Average box office value in millions");

        // values for update 
        valueBar(data)
        valueBarUpdateMvsW(data)
}



function barUpdate(data) {

    //set domain for the x and y axis 
    xChart.domain(data.map(function(d) { return d.id; }) );
    yChart.domain( [0, d3.max(data, function(d) { return +d.meanValue; })] );
    
    //get the width a bar and remove old bar add new bars
    var barWidth = width / data.length;
    var bars = g.selectAll(".bar")
                    .remove()
                    .exit()
                    .data(data)	
        

    // give meseurments to each bar and add mouse action
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return i * barWidth + 1 })
        .attr("y", height)
        .attr("width", barWidth - 1)
        .attr("fill", function (d) { return colorScale(d.color); })
        .on("mousemove", function(d) {
            console.log(tooltip)
            tooltip
              .style("left", d3.event.pageX - 800 + "px")
              .style("top", d3.event.pageY - 800 + "px")
              .style("display", "inline-block")
              .html((d.meanValue) + "<br>" + "£" + (d.meanValue));
        })
        .on("mouseout", function(d) { tooltip.style("display", "none");})
        .transition().duration(800)
        .attr("y", function(d) { return yChart(d.meanValue); })
        .attr("height", function(d) { return height - yChart(d.meanValue); })

    //left axis
    g.select('.y')
        .transition()
        .duration(800)
        .call(yAxis)

    //bottom axis
    g.select('.xAxis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)";
            });
}








  