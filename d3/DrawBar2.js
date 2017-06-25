//This is the function to draw the Occurance of Genre bar graph
function drawBar2() {

    var margin = {
        top: 60,
        right: 100,
        bottom: 40,
        left: 100
    }

    var width = document.getElementById('BarChartDiv2').clientWidth - 150;
    var height = 400 - margin.top - margin.bottom;

    var y_scale = d3.scaleLinear()
        .range([height, 0]);

    var x_scale = d3.scaleBand()
        .range([0, width])
        .padding(0.1);


    var svg = d3.select('#BarChartDiv2').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select('#BarChartDiv2')
        .append('div')
        .attr('class', 'toolTip2');

    d3.csv("FilmVisualisation/GenreMostPopular.csv", function(data) {
        data.forEach(function(d) {
            d.Count = +d.Count;
        });

        y_scale.domain([0, d3.max(data, function(d) {
            return d.Count;
        })]);
        x_scale.domain(data.map(function(d) {
            return d.Genre;
        }));

        var g = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")

        //Here we append the rectangles to g to create the bars
        g.append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x_scale(d.Genre);
            })
            //Bandwidth sets the width of the bars
            .attr("width", x_scale.bandwidth())
            .attr("y", function(d) {
                return y_scale(d.Count);
            })
            //Use the Hexidecimal value to fill
            .style("fill", function(d) {
                return d.Hexidecimal;
            })
            .attr("height", function(d) {
                return height - y_scale(d.Count);
            })
            .on("mouseover", function(d, g) {
                //Display tooltip
                tooltip
                .style("position", "absolute")
                .style("display", "inline-block")
                .style('top', 550 + "px")
                .style('left', (width)/7 + "px")
                //Tooltip is same colour as the bar
                .style('color', d.Hexidecimal)
                .style("z-index", "10")
                    .html("<u>"+ d.Genre + "</u><br>" + d.Count + " Films")})

            .on("mouseout", function(d) {
                //Hide Tooltip
                tooltip
                    .style("display", "none")});

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_scale));


        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y_scale)
                .ticks(6));

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (-80) + "," + (height / 2) + ")rotate(-90)")
            .style("fill", "white")
            .text("Number of Films");

        svg.append("text")
            .style('fill', 'white')
            .attr("x", (width / 2))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Occurance of Genres in Sample of 3651 Films");
    });





};
