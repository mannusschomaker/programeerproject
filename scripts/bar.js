// funtion for a dynamic bar chart

var svg;
var xChart;
var yChart;
var xAxis;
var yAxis;
var colorScale;
var height;
var tooltip;


function myFuncBar(data, callback){
    // required functionality when window loads

svg = d3.select("#graf2").append("svg"),
margin = {top: 20, right: 0, bottom: 100, left: 50},
width = 800 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom,


g = svg.attr("height",height + margin.top + margin.bottom)
.attr("width",width + margin.left + margin.right)
.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

xChart = d3.scaleBand()
                .range([0, width]);
        

yChart = d3.scaleLinear()
				.range([height, 0]);

xAxis = d3.axisBottom(xChart);
yAxis = d3.axisLeft(yChart).tickSizeOuter(0)
            .tickSize(-width);
colorScale = d3.scaleOrdinal(d3.schemeCategory10);

tooltip = d3.select("#graf2").append("div").attr("class", "toolTip");


//set up axes
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
			.attr("transform", function(d){
				return "rotate(-30)";
			});

//add labels
g
	.append("text")
	.attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
	.text("% of total watch time");
		
g
	.append("text")
	.attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
	.text("age group");

    
    valueBar(data)
    valueBarUpdateMvsW(data)
}



function barUpdate(data){
    console.log(data)
    //set domain for the x axis
    xChart.domain(data.map(function(d){ return d.id; }) );
    //set domain for y axis
    yChart.domain( [0, d3.max(data, function(d){ return +d.meanValue; })] );
    
    //get the width of each bar 
    var barWidth = width / data.length;
    
    //select all bars on the graph, take them out, and exit the previous data set. 
    //then you can add/enter the new data set
    var bars = g.selectAll(".bar")
                    .remove()
                    .exit()
                    .data(data)	
        

    //now actually give each rectangle the corresponding data
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i){ return i * barWidth + 1 })
        .attr("y", height)
        .attr("width", barWidth - 1)
        .attr("fill", function (d){ return colorScale(d.color); })
        .on("mousemove", function(d){
            console.log(tooltip)
            tooltip
              .style("left", d3.event.pageX - 800 + "px")
              .style("top", d3.event.pageY - 800 + "px")
              .style("display", "inline-block")
              .html((d.meanValue) + "<br>" + "£" + (d.meanValue));
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");})
        .transition().duration(800)
        .attr("y", function(d) { return yChart(d.meanValue); })
        .attr("height", function(d){ return height - yChart(d.meanValue); })



        
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
            .attr("transform", function(d){
                return "rotate(-65)";
            });
}








  