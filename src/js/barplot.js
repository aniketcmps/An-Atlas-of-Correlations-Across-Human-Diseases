function plotBar(file,id){
  var p=d3.select(id);
  p.exit().remove();
  $("#displayBar").html("");

  var svg1 = d3.select('#displayBar').append("svg").attr("id",id).attr("width",500).attr("height",300),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg1.attr("width") - margin.left - margin.right,
      height = +svg1.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg1.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(file, function(d) {
    d.count = +d.count;
    return d;
  }, function(error, data) {
    if (error) throw error;
    x.domain(data.map(function(d) { return d.questionTopicId; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
      .append("text")
	    .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Count");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("onclick","plot(this)")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.questionTopicId); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("data-file",function(d) { return d.questionTopicId; })
      .attr("height", function(d) { return height - y(d.count); })
      .append("svg:title")
      .text(function(d) { return d.count; });

    g.append("text")
    .attr("x", 200 ).attr("y", 0 )
    .attr("font-size", "20px").style("text-anchor", "middle").text("Frequency of Health Issue's");
  });
};

function plot(x){
  var name=$(x).attr("data-file");
  plotLine('data/line/trend_data.json',name,'#yearlytrend');
}
