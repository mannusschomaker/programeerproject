/* scripts.js
 * minor programeren
 *
 * d3.js page for interactive bar graph
 * interactive bar chart
 * graph is interactive: info popup when hovering over bars
 * door: mannus schomaker 10591664
 * 
 */


// load json file and execute function graph
d3.csv("data.csv", function (error, data) {
    if(error) throw error;

    // go to make variables
    valueMulti(data)
});


// initialize variables min
function valueMulti(data){
    personOfColor = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);
    personNotColor = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);
    console.log(data)
    data.forEach(function(d) {
        
        d.year_release = +d.year_release
        d.site = Math.floor((d.year_release - 1925)/5)
        for (i = 0; i < 18; i++) {
            if (d.site == i){
                if (d.person_of_color == 0){
                    personNotColor[i] = personNotColor[i] + 1
                }
                if (d.person_of_color == 1){
                    personOfColor[i] = personOfColor[i] + 1
                }
            }
        }
    });

    obj = []
    group1 = []
    group2 = []
    yearsList = []
    for (i = 0; i < 18; i++) {
        yStart = 1925 + (5*i)
        yEind = 1930 + (5*i)
        yearsList.push(yStart.toString() + "-" + yEind.toString())
        group1.push({year:(yearsList[i]), amount:(personOfColor[i])});
        group2.push({year:(yearsList[i]), amount:(personNotColor[i])});
    } 
    obj.push({id:"personOfColor", values:group1})
    obj.push({id:"personNotColor", values:group2})
    console.log(obj)
    console.log(111)
    graph(obj, yearsList)
    console.log(yearsList)
}

// funtion for a dynamic bar chart
function graph(data, yearsList){

    

    // make canvas
    var svg = d3.select("body").append("svg"),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,

        
    g = svg.attr("height",height + margin.top + margin.bottom)
        .attr("width",width + margin.left + margin.right)
        .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().range([0, width]).domain(yearsList),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

        y.domain([
            d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.amount; }); }),
            d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.amount; }); })
        ]);
        

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { console.log(d.year);return x(d.year); })
        .y(function(d) { console.log(d.amount);return y(d.amount); });

    z.domain(data.map(function(c) { return c.id; }));
        
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("aantal films");
        console.log(111)

    var city = g.selectAll(".city")
        .data(data)
    .enter().append("g")
        .attr("class", "city");
        console.log(111)

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { console.log(d.values);return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });
        console.log(111)
        
    city.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.amount) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });
        console.log(111)
    };