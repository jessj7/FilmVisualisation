//This is the code to draw the Bar Chart with Gross and Budget
function drawBar() {

    var margin = {
        top: 60,
        right: 100,
        bottom: 40,
        left: 100
    }

    var width = document.getElementById('BarChartDiv').clientWidth - 150;
    var height = 400 - margin.top - margin.bottom;

    var y_scale = d3.scaleLinear()
        .range([height, 0]);

    var x_scale = d3.scaleBand()
        .range([0, width])
        .padding(0.1);


    var svg = d3.select('#BarChartDiv').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select('#BarChartDiv')
        .append('div')
        .attr('class', 'toolTip2');

    d3.csv("/MedianGrossGenre.csv", function(data) {
        data.forEach(function(d) {
            d.MedianGross = +d.MedianGross;
        });

        y_scale.domain([0, d3.max(data, function(d) {
            return d.MedianGross;
        })]);
        x_scale.domain(data.map(function(d) {
            return d.Genre;
        }));

        var g = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")

        //This is the Gross bar
        g.append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x_scale(d.Genre);
            })
            .attr("width", x_scale.bandwidth())
            .attr("y", function(d) {
                return y_scale(d.MedianGross);
            })
            .style("fill", function(d) {
                return d.Hexidecimal;
            })
            .attr("height", function(d) {
                return height - y_scale(d.MedianGross);
            })
            .on("mouseover", function(d, g) {
                //Display tooltip
                console.log("Tool")
                tooltip
                .style("position", "absolute")
                .style("display", "inline-block")
                .style('top', 1100 + "px")
                .style('left', (width)/7 + "px")
                .style('color', d.Hexidecimal)
                .style("z-index", "10")
                    //Use the index values to find the name of the source and target of the ribbon and the value of that target (I used target, but target and source are the same in this case)
                    .html("<u>"+ d.Genre + "</u><br>"+"Gross: $" + d.MedianGross + "<br>Budget: $" + d.MedianBudget)})            .on("mouseout", function(d) {
                //Hide Tooltip
                tooltip
                    .style("display", "none")});

        //This is the budget bar
        g.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) {
                return x_scale(d.Genre) + 10;
            })
            //Set the bandwidth but -20 to make the bar thinner to go over the other bar
            .attr("width", x_scale.bandwidth() - 20)
            .attr("y", function(d) {
                return y_scale(d.MedianBudget);
            })
            .style("fill", "white")
            .style("opacity", 0.6)
            .attr("height", function(d) {
                return height - y_scale(d.MedianBudget);
            })
            .on("mouseover", function(d, g) {
                //Display tooltip
                console.log("Tool")
                tooltip
                .style("position", "absolute")
                .style("display", "inline-block")
                .style('top', 1100 + "px")
                .style('left', (width)/7 + "px")
                //Added a Hexidecimal colour in the csv
                .style('color', d.Hexidecimal)
                .style("z-index", "10")
                    //Use the index values to find the name of the source and target of the ribbon and the value of that target (I used target, but target and source are the same in this case)
                    .html("<u>"+ d.Genre + "</u><br>"+"Gross: $" + d.MedianGross + "<br>Budget: $" + d.MedianBudget)})
            .on("mouseout", function(d) {
                //Hide Tooltip
                tooltip
                    .style("display", "none")});

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_scale));


        // add the y Axis and Ticks
        svg.append("g")
            .call(d3.axisLeft(y_scale)
                .ticks(6));

        //Y Axis Label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (-80) + "," + (height / 2) + ")rotate(-90)")
            .style("fill", "white")
            .text("($) Adjusted for 2017 Prices");

        //Title
        svg.append("text")
            .style('fill', 'white')
            .attr("x", (width / 2))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Median Gross Sales and Budget by Genre");

        //Legend Code
        var legendText = ["Median Estimated Gross Sales", "Median Estimated Budget"];
        var legend = svg.selectAll('.legend')
            .data(d3.range(2))
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("width", 350)
            .attr("height", 200)
            .attr("transform", function(d, i) {
                return "translate(10," + i * 20 + ")";
            });

        //Appends the legend, the colours are unique but one is more washed out to make it look like the opaque white bars over colour.
        legend.append("rect")
            .data(["#cc99ff", "#f2e6ff"])
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", (width/18) - 25)
            .attr("y", height - 292.5)
            .style("fill", function(d) {
                return d;
            });
        //Append text to legend
        legend.append("text")
            .data(legendText)
            .attr("x", (width/18))
            .attr("y", height - 280)
            .attr("dy", ".10em")
            .style('fill', 'white')
            .text(function(d) {
                return d;
            });
    });





};
