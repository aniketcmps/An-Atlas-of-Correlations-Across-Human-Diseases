function drawStar(file,name,id){
  var p=d3.select(id);
  p.exit().remove();
  $(id).html("");

  d3.json(file, function(error, data) {
    if (error) throw error;

    var width=1250,height=300,
      svg = d3.select(id).append("svg").attr("id","memberinfo").attr("width",width).attr("height",height);

    var queryResult = data.filter(function (d) { if(d.topicId ==name){return d;} });
    if(queryResult.length==0){
      var svg1=d3.select("#memberinfo").append("text")
        .attr("x", textx)
        .attr("y", (height/2))
        .text( "No proper data available for "+name )
        .attr("visibility","visible")
        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "maroon");
    }
    for(var i = 0; i < queryResult.length; i++){
      var x=0,y=0,textx=0;
      if(i==0){
        x=200;
        textx=200;
      } else if(i==1){
        x=(width/2);
        textx=(width/2)+10;
      } else if(i==2){
        x=(width-200);
        textx=(width-200);
      }

      // console.log(x+" "+textx);
      var svg1=d3.select("#memberinfo").append("svg:polygon")
        .attr("id", "star"+i)
        .attr("visibility", "visible")
        .attr("fill","gold")
        .attr("points", CalculateStarPoints(x, (height/2), 5, 140, 65))

      var first = queryResult.filter(function (d) { if(d.id ==(i+1)){return d;} });
      // console.log(first);
      var svg1=d3.select("#memberinfo").append("text")
        .attr("x", textx)
        .attr("y", (height/2)+5)
        .data(first)
        .text( function (d) { return d.memberName;})
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .style("text-anchor", "middle")
        .attr("fill", "maroon");

      var svg1=d3.select("#memberinfo").append("text")
	      .attr("y", height)
	      .attr("x", textx)
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .style("text-anchor", "middle")
        .attr("fill", "maroon")
        .text("Rank "+(i+1));
    }
    });
};

function CalculateStarPoints(Cx, Cy, ends, rOuter, rInner){
  var results = "";
  var angle = Math.PI / ends;
  for (var i = 0; i < 2 * ends; i++) {
    var r = (i & 1) == 0 ? rOuter : rInner;
    var currentX = Cx + Math.cos(i * angle) * r;
    var currentY = Cy + Math.sin(i * angle) * r;

    if (i == 0) {
       results = currentX + "," + currentY;
    } else {
       results += ", " + currentX + "," + currentY;
    }
  }
  return results;
};
