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
    window.onload = function(){
    Sun(data)
    valueMulti(data)
    //valueSun(data)
    force()
    scale(data)
    myFuncBar(data)
    }
});


// initialize variables min
function valueMulti(data){
    personOfColor = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);
    personNotColor = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);
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
    obj.push({id:"personNotColor", values:group2})
    obj.push({id:"personOfColor", values:group1})

    multiGraph(obj, yearsList)
}

// funtion for a dynamic bar chart
function multiGraph(data, yearsList){

    // make canvas
    svgBar = d3.select("#graf").append("svg").attr("id","line"),
        marginBar = {top: 60, right: 20, bottom: 20, left: 50},
        widthBar = 700 - margin.left - margin.right,
        heightBar = 450 - margin.top - margin.bottom,

        
    g = svgBar.attr("height",height + margin.top + margin.bottom)
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
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.amount); });

    z.domain(data.map(function(c) { return c.id; }));
        
    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));
            

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("aantal films");

    var city = g.selectAll(".city")
        .data(data)
    .enter().append("g")
        .attr("class", "city");


    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });
        
    city.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.amount) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });


};



//     console.log(g)
//     var mouseG = g.append("g")
//         .attr("class", "mouse-over-effects");

//     mouseG.append("path") // this is the black vertical line to follow mouse
//         .attr("class", "mouse-line")
//         .style("stroke", "black")
//         .style("stroke-width", "1px")
//         .style("opacity", "0");
        
//     var lines = document.getElementsByClassName('line');

//     var mousePerLine = mouseG.selectAll('.mouse-per-line')
//     .data(data)
//     .enter()
//     .append("g")
//     .attr("class", "mouse-per-line");

//   mousePerLine.append("circle")
//     .attr("r", 7)
//     .style("stroke", "blue")
//     .style("fill", "none")
//     .style("stroke-width", "1px")
//     .style("opacity", "0");

//   mousePerLine.append("text")
//     .attr("transform", "translate(10,3)");

//   mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
//     .attr('width', width) // can't catch mouse events on a g element
//     .attr('height', height)
//     .attr('fill', 'none')
//     .attr('pointer-events', 'all')
//     .on('mouseout', function() { // on mouse out hide line, circles and text
//       d3.select(".mouse-line")
//         .style("opacity", "0");
//       d3.selectAll(".mouse-per-line circle")
//         .style("opacity", "0");
//       d3.selectAll(".mouse-per-line text")
//         .style("opacity", "0");
//     })
//     .on('mouseover', function() { // on mouse in show line, circles and text
//       d3.select(".mouse-line")
//         .style("opacity", "1");
//       d3.selectAll(".mouse-per-line circle")
//         .style("opacity", "1");
//       d3.selectAll(".mouse-per-line text")
//         .style("opacity", "1");
//     })
//     .on('mousemove', function() { // mouse moving over canvas
//       var mouse = d3.mouse(this);
//       d3.select(".mouse-line")
//         .attr("d", function() {
//           var d = "M" + mouse[0] + "," + height;
//           d += " " + mouse[0] + "," + 0;
//           return d;
//         });

//       d3.selectAll(".mouse-per-line")
//         .attr("transform", function(d, i) {
//           console.log(width/mouse[0])
//           var xDate = x.invert(mouse[0]),
//               bisect = d3.bisector(function(d) { return d.date; }).right;
//               idx = bisect(d.values, xDate);
          
//           var beginning = 0,
//               end = lines[i].getTotalLength(),
//               target = null;

//           while (true){
//             target = Math.floor((beginning + end) / 2);
//             pos = lines[i].getPointAtLength(target);
//             if ((target === end || target === beginning) && pos.x !== mouse[0]) {
//                 break;
//             }
//             if (pos.x > mouse[0])      end = target;
//             else if (pos.x < mouse[0]) beginning = target;
//             else break; //position found
//           }
          
//           d3.select(this).select('text')
//             .text(y.invert(pos.y).toFixed(2));
            
//           return "translate(" + mouse[0] + "," + pos.y +")";
//         });
//     });
