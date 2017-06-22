function plotNetwork(file,id){
  var p=d3.select(id);
  p.exit().remove();
  $("#displayNetwork").html("");

  var svg = d3.select('#displayNetwork').append("svg").attr("id",id).attr("width",1250).attr("height",750),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 1250 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom;

  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("center", d3.forceCenter(width/2, (height/2)+50))
	  .force('X', d3.forceX().x(function(d) { return width/2 }))
    .force('Y', d3.forceY().y(function(d) { return height/2 }));

  d3.json(file, function(error, graph) {
    if (error) throw error;

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("stroke","#999")
      .attr("stroke-opacity","0.6");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", function(d) { return 10*(d.group); })
      .attr("stroke","#fff")
      .attr("stroke-opacity","1.5px")
      .attr("fill", function(d) { return color(d.clusterid); })
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
      .on("mouseover", function(d) { node.append("title").text(d.id); d3.select(this).attr("fill","black"); })
      .on("mouseout", function(d) { d3.select(this).attr("fill",color(d.clusterid)); });

    node.append("title")
      .text(function(d) { return d.id; });

    simulation.nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }
  });
};

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
