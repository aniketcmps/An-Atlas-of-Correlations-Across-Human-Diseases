function plotLine(file,name,id){
	var p=d3.select(id);
	p.exit().remove();
	$("#displayLine").html("");

	var svg = d3.select('#displayLine').append("svg").attr("id",id).attr("width",500).attr("height",300),
	    margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = +svg.attr("width") - margin.left - margin.right,
	    height = +svg.attr("height") - margin.top - margin.bottom,
	    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleTime()
	    .rangeRound([0, width]);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]);

	d3.json(file,function(error, data) {
	  if (error) throw error;

  	var queryResult = data.filter(function (d) { if(d.topicName ==name){return d;} });
	  x.domain(d3.extent(queryResult, function(d) { return d.year; }));
	  y.domain(d3.extent(queryResult, function(d) { return d.count; }));

	  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
			.append("text")
      .attr("fill", "#000")
      .attr("y", -6)
      .attr("x", 430)
      .attr("dx", "0.71em")
      .style("text-anchor", "end")
      .text("Years");

	  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(7))
	    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("Count");

	  var line = d3.line()
      .x(function(d) { return x(d.year);	})
      .y(function(d) { return y(d.count); });

	  g.append("path")
      .datum(queryResult)
      .attr("class", "line")
      .attr("d", line);

		g.append("text")
		  .attr("x", 200 ).attr("y", 5 )
		  .attr("font-size", "20px").style("text-anchor", "middle").text("Yearly Trend for "+name);
		});
	drawStar('data/members.json',name,'#displayMembers');
};
