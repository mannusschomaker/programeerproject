var widthForce
var heightForce
var force
var svgForce
var link
var node



function force(){

widthForce = 1200,
    heightForce = 1200;

force = d3v3.layout.force()
    .linkDistance(80)
    .charge(-100)
    .gravity(.05)
    .size([width, height])
    .on("tick", tick);


svgForce = d3v3.select("#graph4").append("svg")
    .attr("width", widthForce)
    .attr("height", heightForce);

link = svgForce.selectAll(".link"),
    node = svgForce.selectAll(".node");

d3v3.json("data.json", function(error, json) {
  if (error) throw error;
  root = json;
  console.log(root)
  update(root);
});
}

function update(root) {
  var nodes = flatten(root),
      links = d3v3.layout.tree().links(nodes);

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update links.
  link = link.data(links, function(d) { return d.target.id; });

  link.exit().remove();

  link.enter().insert("line", ".node")
      .attr("class", "link");

  // Update nodes.
  node = node.data(nodes, function(d) { return d.id; });

  node.exit().remove();

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .on("click", click)
      .call(force.drag);

  nodeEnter.append("circle")
      .attr("r", function(d) { return ((Math.sqrt(d.size) * 2.5) + 0.5) || 4.5; });

  nodeEnter.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  node.select("circle")
      .style("fill", color);
}

function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
  
  function color(d) {
    return d._children ? "#3182bd" // collapsed package
        : d.children ? "#c6dbef" // expanded package
        : "#fd8d3c"; // leaf node
  }
  
  // Toggle children on click.
  function click(d) {
    console.log(d)
    if (d3v3.event.defaultPrevented) return; // ignore drag
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
  }
  
  // Returns a list of all nodes under the root.
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
