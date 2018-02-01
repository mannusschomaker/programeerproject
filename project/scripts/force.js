/* force.js
 * minor programming
 *
 * build and update force directed graph
 * by: mannus schomaker 10591664
 * 
 */

// initiate global variables for force graph
var force
var svgForce
var link
var node
var root


// function for initiation of force directed graph
function initForce(data) {

    // cavas size
    widthForce = 650,
    heightForce = 650;

    // initiate cavas
    svgForce = d3v3.select("#graph4").append("svg")
        .attr("width", widthForce)
        .attr("height", heightForce);

    // force layout function sets layout parameters
    force = d3v3.layout.force()
        .linkDistance(50)
        .charge(-180)
        .gravity(.20)
        .size([widthForce, heightForce])
        .on("tick", tick);

    // set data and call function to create force graph
    root = data
    updateForce()

}


// function to build and rebuild the force directed graph
function updateForce() {

    // remove all old node
    svgForce.selectAll(".node").remove()

    // set easy selectors
    link = svgForce.selectAll(".link");
    node = svgForce.selectAll(".node");
    var nodes = flatten(root);
    var links = d3v3.layout.tree().links(nodes);



    // restart the force layout.
    force.nodes(nodes)
        .links(links)
        .start();

    // add new data for links and remove the old 
    link = link.data(links, function(d) { return d.target.id; });
    link.exit().remove();

    // draw new links
    link.enter().insert("line", ".node")
        .attr("class", "link"); 

    // add new data for nodes and make spaces for nodes
    node = node.data(nodes, function(d) { return d.id; });
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .on("click", click)
        .call(force.drag);

    // mouse over show films
    nodeEnter.append("title")
        .text(function(d) { 
            
            var result = "";
            if (d.title) {
                d.title.forEach(function(title) {
                    result += title + "\n";
                })
            } else {
                result = d.name;
            }
            return result; });


    // add circle and text
    nodeEnter.append("circle")
        .attr("r", function(d) { return ((Math.sqrt(d.box) * 1.2) + 0.7) || 4.5; })
        .style("fill", color);

    nodeEnter.append("text")
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });
}

// make connections for links
function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
  
// collapsed, expanded and leaf nodes 
function color(d) {
    return d._children ? "#3182bd"
        : d.children ? "#c6dbef"
        : "#fd8d3c";
}

// toggle children on click.
function click(d) {

    if (d3v3.event.defaultPrevented) return;
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    updateForce();
}

// returns a list of all nodes under the root.
function flatten(root) {

    var nodes = [], i = 0;

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}

