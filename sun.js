
var widthSun;
var heightSun;
var maxRadius;
var formatNumber;
var xSun;
var ySun;
var colorSun;
var partition;
var arc;
var middleArcLine = {};
var textFits = {};
var svgSun;


function Sun(){
 widthSun = window.innerWidth,
    heightSun = window.innerHeight,
    maxRadius = (Math.min(widthSun, heightSun) / 2) - 5;

 formatNumber = d3.format(',d');

 xSun = d3.scaleLinear()
    .range([0, 2 * Math.PI])
    .clamp(true);

 ySun = d3.scaleSqrt()
    .range([maxRadius*.1, maxRadius]);

 colorSun = d3.scaleOrdinal(d3.schemeCategory20);

 partition = d3.partition();

 arc = d3.arc()
    .startAngle(d => xSun(d.x0))
    .endAngle(d => xSun(d.x1))
    .innerRadius(d => Math.max(0, ySun(d.y0)))
    .outerRadius(d => Math.max(0, ySun(d.y1)));

 middleArcLine = d => {
    const halfPi = Math.PI/2;
    const angles = [xSun(d.x0) - halfPi, xSun(d.x1) - halfPi];
    const r = Math.max(0, (ySun(d.y0) + ySun(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
    if (invertDirection) { angles.reverse(); }

    const path = d3.path();
    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

 textFits = d => {
    const CHAR_SPACE = 6;

    const deltaAngle = xSun(d.x1) - xSun(d.x0);
    const r = Math.max(0, (ySun(d.y0) + ySun(d.y1)) / 2);
    const perimeter = r * deltaAngle;

    return d.data.name.length * CHAR_SPACE < perimeter;
};

 svgSun = d3.select('#graph3').append('svg')
    .style('width', '800')
    .style('height', '800')
    .attr('viewBox', `${-widthSun / 2} ${-heightSun / 2} ${widthSun} ${heightSun}`)
    .on('click', () => focusOn()); // Reset zoom on canvas click

    
d3.json('data.json', (error, root) => {
    if (error) throw error;

    updateSun(root)

});
}

function updateSun(root){

    console.log(root)
    root = d3.hierarchy(root);
    root.sum(d => d.size);

    svgSun.selectAll("*").remove()
    
    var slice = svgSun.selectAll('g.slice')
        .data(partition(root).descendants());

    var newSlice = slice.enter()
        .append('g').attr('class', 'slice')
        .on('click', d => {
            d3.event.stopPropagation();
            update(d[Object.keys(d)[0]])
            console.log(d[Object.keys(d)[0]])
            focusOn(d);
        });

    newSlice.append('title')
        .text(d => d.data.name + '\n' + formatNumber(d.value));

    newSlice.append('path')
        .attr('class', 'main-arc')
        .style('fill', d => colorSun((d.children ? d : d.parent).data.name))
        .attr('d', arc);

    newSlice.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc${i}`)
        .attr('d', middleArcLine);

    var text = newSlice.append('text')
        .attr('display', d => textFits(d) ? null : 'none');

    // Add white contour
    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name)
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', 5)
        .style('stroke-linejoin', 'round');

    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name);
    }

function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
    // Reset to top-level if no data point specified

    const transition = svgSun.transition()
        .duration(750)
        .tween('scale', () => {
            const xd = d3.interpolate(xSun.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(ySun.domain(), [d.y0, 1]);
            return t => { xSun.domain(xd(t)); ySun.domain(yd(t)); };
        });

    transition.selectAll('path.main-arc')
        .attrTween('d', d => () => arc(d));

    transition.selectAll('path.hidden-arc')
        .attrTween('d', d => () => middleArcLine(d));

    transition.selectAll('text')
        .attrTween('display', d => () => textFits(d) ? null : 'none');

    moveStackToFront(d);

    //

    function moveStackToFront(elD) {
        svgSun.selectAll('.slice').filter(d => d === elD)
            .each(function(d) {
                this.parentNode.appendChild(this);
                if (d.parent) { moveStackToFront(d.parent); }
            })
    }
}
