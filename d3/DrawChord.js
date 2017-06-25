function drawChord(){
      //Created the matric in .csv then copy and pasted in then formatted.
  var matrix = [
      [0, 386, 34, 211, 260, 235, 73, 150, 24, 65, 8, 2, 76, 278, 17, 484, 44, 20], //Action
      [386, 0, 138, 273, 40, 166, 247, 231, 22, 30, 12, 26, 81, 224, 9, 194, 27, 18], //Adventure
      [34, 138, 0, 146, 4, 23, 282, 246, 20, 30, 8, 37, 85, 211, 9, 179, 27, 18], //Animation
      [211, 273, 146, 0, 213, 481, 308, 215, 5, 51, 71, 55, 465, 121, 58, 104, 14, 9], //Comedy
      [260, 40, 4, 213, 0, 376, 15, 14, 10, 18, 13, 6, 77, 22, 4, 425, 5, 12], //Crime
      [235, 166, 23, 481, 376, 0, 96, 112, 121, 62, 97, 47, 523, 97, 99, 506, 113, 34], //Drama
      [73, 247, 282, 308, 15, 96, 0, 192, 2, 4, 23, 47, 71, 67, 24, 9, 2, 3], //Family
      [150, 231, 246, 215, 14, 112, 192, 0, 0, 85, 13, 28, 89, 69, 4, 83, 5, 2], //Fantasy
      [24, 22, 20, 5, 10, 121, 2, 0, 0, 1, 6, 3, 26, 0, 6, 20, 40, 5], //History
      [65, 30, 30, 51, 18, 62, 4, 85, 1, 0, 1, 5, 11, 84, 0, 201, 1, 0], //Horror
      [8, 12, 8, 71, 13, 97, 23, 13, 6, 1, 0, 14, 47, 4, 0, 5, 2, 1], //Music
      [2, 26, 37, 55, 6, 47, 47, 28, 3, 5, 14, 0, 39, 3, 0, 2, 2, 1], //Musical
      [76, 81, 85, 465, 77, 523, 71, 89, 26, 11, 47, 39, 0, 34, 27, 87, 27, 12], //Romance
      [278, 224, 211, 121, 22, 97, 67, 69, 0, 84, 4, 3, 34, 0, 4, 206, 1, 2], //Sci-Fi
      [17, 9, 9, 58, 4, 99, 24, 4, 6, 0, 0, 0, 27, 4, 0, 3, 1, 0], //Sport
      [484, 194, 179, 104, 425, 506, 9, 83, 20, 201, 5, 2, 87, 206, 3, 0, 24, 9], //Thriller
      [44, 27, 27, 14, 5, 113, 2, 5, 40, 1, 2, 2, 27, 1, 1, 24, 0, 5], //War
      [20, 18, 18, 9, 12, 34, 3, 2, 5, 0, 1, 1, 12, 2, 0, 9, 5, 0] //Western
  ];

  var text = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']

  var margin = {
      top: 40,
      right: 70,
      bottom: 40,
      left: 70
  }

  var width = document.getElementById('ChordChartDiv').clientWidth;
  var height = 650 - margin.top - margin.bottom;

  var svg = d3.select('#ChordChartDiv').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
  outerRadius = Math.min(width, height) * 0.5 - 40,
  innerRadius = outerRadius - 20;

  var chord = d3.chord()
      // padding between chords.
      .padAngle(0.04)
      //Which order displayed.
      .sortSubgroups(d3.descending);

  var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
      .radius(innerRadius);

  var color = d3.scaleOrdinal()
      //Here you can change the colours in the graph.
      //It is used for the fill and stroke in 'path' for arc
      .domain(d3.range(19))
      .range(['#52D7F9', '#2ADFEF', '#09E7E0', '#27EDCE', '#4DF1B9', '#71F5A3', '#93F68D', '#B5F779', '#D6F568', '#F27E6B', '#F97E80', '#FC8197', '#F987AE', '#F191C4', '#E29CD8', '#CEA9E9', '#B5B5F5', '#98C1FC', '#76CDFD', ]);

  var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .datum(chord(matrix));

  var group = g.append("g")
      .attr("class", "groups")
      .selectAll("g")
      .data(function(chords) {
          return chords.groups;
      })
      .enter().append("g")
      .on("mouseover", fadeArc(0.1))
      .on("mouseout", fadeArc(1));

  var tooltip = d3.select("body").append("div").attr("class", "toolTip");

  //This function fades all ribbons which aren't attached to the arc being hovered over.
  function fadeArc(opacity) {
      return function(g, i) {
          svg.selectAll("g.ribbons path")
              .filter(function(d) {
                  return d.source.index != i && d.target.index != i;
              })
              .transition()
              .style("opacity", opacity);
      };
  }

  group.append("path")
      .style("stroke", function(d) {
          return color(d.index);
      })
      .style("fill", function(d) {
          return color(d.index);
      })
      .attr("d", arc);



  //Gradient
  //Start of code from Nadieh Bremer's tutorial: https://www.visualcinnamon.com/2016/06/orientation-gradient-d3-chord-diagram.html
  // Function to create the unique id for each chord gradient
  function getGradID(d) {
      return 'linkGrad-' + d.source.index + '-' + d.target.index
  }

  // Create the gradients definitions for each chord
  var grads = svg.append('defs').selectAll('linearGradient')
      .data(chord(matrix))
      .enter().append('linearGradient')
      // Create the unique ID for this specific source-target pairing
      .attr('id', getGradID)
      .attr('gradientUnits', 'userSpaceOnUse')
      // Find the location where the source chord starts
      .attr('x1', function(d, i) {
          return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2)
      })
      .attr('y1', function(d, i) {
          return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2)
      })
      // Find the location where the target chord starts
      .attr('x2', function(d, i) {
          return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2)
      })
      .attr('y2', function(d, i) {
          return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2)
      })

  // Set the starting color (at 0%)
  grads.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', function(d) {
          return color(d.source.index)
      })

  // Set the ending color (at 100%)
  grads.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', function(d) {
          return color(d.target.index)
      })
      // End of code from Nadieh Bremer's tutorial: https://www.visualcinnamon.com/2016/06/orientation-gradient-d3-chord-diagram.html

  g.append("g")
      .attr("class", "ribbons")
      .selectAll("path")
      .data(function(chords) {
          return chords;
      })
      .enter().append("path")
      .attr("d", ribbon)
      .style("fill", function(d) {
          return "url(#" + getGradID(d) + ")";
      })
      .style("stroke", function(d) {
          return "url(#" + getGradID(d) + ")";
      })
      .on("mouseover", function(d, g) {
          //Display tooltip
          tooltip
              .style("left", 50 + "px")
              .style("top", 3000 + "px")
              .style("display", "inline-block")
              //Use the index values to find the name of the source and target of the ribbon and the value of that target (I used target, but target and source are the same in this case)
              .html("There are " + d.target.value + " films that <br>link " + text[d.target.index] + " and " + text[d.source.index])

          //Fade all ribbons except the one the mouse is over
          var singleRibbon = this;
          svg.selectAll("g.ribbons path")
              .filter(function(d) {
                  return this != singleRibbon;
              })
              .transition()
              .style("opacity", 0.2);

      })
      .on("mouseout", function(d) {
          //Hide Tooltip
          tooltip
              .style("display", "none")
          //Set all ribbon's opacity back to original state.
          var singleRibbon = this;
          svg.selectAll("g.ribbons path")
              .filter(function(d) {
                  return this != singleRibbon;
              })
              .transition()
              .style("opacity", 1)
      });

  group.append("text")
  //I used the tutorial here to find out how to get the right angles https://bl.ocks.org/nbremer/4de6f0a9d9d06373fc639e32e9c346cc
      .each(function(d) {
          d.angle = (d.startAngle + d.endAngle) / 2;
      })
      .attr("dy", ".1em")
      .attr("class", "genrename")
      .attr("text-anchor", function(d) {
          return d.angle > Math.PI ? "end" : null;
      })
      .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
              "translate(" + (outerRadius + 10) + ")" +
              (d.angle > Math.PI ? "rotate(180)" : "");
      })
      //Use d.index to find the index value of the group, to then find the appropriate colour for the text to match.
      .style('fill', function(d, i){ return color(d.index);})
      .text(function(d, i) {
          return text[i];
      });

//This puts the title on the top of the graph
  svg.append("text")
      .style('fill', 'white')
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Genre Links Between 3651 Films");

}
