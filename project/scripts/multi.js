/* multi.js
 * minor programming
 *
 * build multi series line graph
 * by: mannus schomaker 10591664
 * 
 */


// funtion for a multiseries line graph
function initMulti(data, yearsList) {

    // init canvas
    var svgmulti = d3.select("#graph1").append("svg").attr("id","line");

    var g = svgmulti.attr("height",height + margin.top + margin.bottom)
        .attr("width",width + margin.left + margin.right)
        .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set ranges and domains 
    var x = d3.scaleBand()
                .range([0, width])
                .domain(yearsList),
        y = d3.scaleLinear()
                .range([height, 0])
                .domain([
                    d3.min(data, function(c) { 
                        return d3.min(c.values, function(d) { return d.amount; }); 
                    }),
                    d3.max(data, function(c) { 
                        return d3.max(c.values, function(d) { return d.amount; }); 
                    })
                ]),
        z = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(data.map(function(c) { return c.id; }));
    
    // append y-axis
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("amount of films");

    // initiate new field for each line
    var lineColor = g.selectAll(".linecolor")
        .data(data)
    .enter().append("g")
        .attr("class", "linecolor");

    // draw line function
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.amount); });

    // draw line 
    lineColor.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });
        
    // append legend text
    lineColor.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.amount) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });

    var legend = svgmulti.selectAll(".lineColor")
        .data(data)
        .enter().append("g")
        .attr("class", "legend");
    
    legend.append("rect")
        .attr("x", width - 70)
        .attr("y", function(d, i){ return (i *  60) + 100;})
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", function(d) { 
          return z(d.id);
        });
    
    legend.append("text")
        .attr("x", width - 70)
        .attr("y", function(d, i){ return (i *  60) + 90;})
        .text(function(d){ return d.id; });

};


