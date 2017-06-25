function drawLine() {
    var margin = {
        top: 60,
        right: 70,
        bottom: 40,
        left: 65
    }

    var width = document.getElementById('LineChartDiv').clientWidth - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    //Values For Genre Lines
    var ActionLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Action);
        });
    var AdventureLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Adventure);
        });
    var AnimationLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Animation);
        });
    var ComedyLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Comedy);
        });
    var CrimeLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Crime);
        });
    var DramaLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Drama);
        });
    var FamilyLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Family);
        });
    var FantasyLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Fantasy);
        });
    var HistoryLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.History);
        });
    var HorrorLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Horror);
        });
    var MusicLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Music);
        });
    var MusicalLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Musical);
        });
    var RomanceLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Romance);
        });
    var SciFiLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.SciFi);
        });
    var SportLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Sport);
        });
    var ThrillerLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Thriller);
        });
    var WarLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.War);
        });
    var WesternLine = d3.line()
        .x(function(d) {
            return x(d.Year);
        })
        .y(function(d) {
            return y(d.Western);
        });

    //Appending svg with chart to #chart
    var svg = d3.select("#LineChartDiv").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select('#LineChartDiv')
        .append('div')
        .attr('class', 'tooltip');

    d3.csv("TotalByYearProportion1980Up.csv", function(error, data) {
        if (error) throw error;
        data.forEach(function(d) {
            d.Year = new Date(d.Year);
            d.Action = +d.Action;
            d.Adventure = +d.Adventure;
            d.Animation = +d.Animation;
            d.Comedy = +d.Comedy;
            d.Crime = +d.Crime;
            d.Drama = +d.Drama;
            d.Family = +d.Family;
            d.Fantasy = +d.Fantasy;
            d.History = +d.History;
            d.Horror = +d.Horror;
            d.Music = +d.Music;
            d.Musical = +d.Musical;
            d.Romance = +d.Romance;
            d.SciFi = +d.SciFi;
            d.Sport = +d.Sport;
            d.Thriller = +d.Thriller;
            d.War = +d.War;
            d.Western = +d.Western;
        });
        console.log(data);

        x.domain(d3.extent(data, function(d) {
            return d.Year;
        }));
        y.domain([0, d3.max(data, function(d) {
        //Drama has the highest points.
            return d.Drama;
        })]);
        //Adding each of the Genre Paths
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#52D7F9")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", ActionLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#2ADFEF")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", AdventureLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#09E7E0")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", AnimationLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#27EDCE")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", ComedyLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#4DF1B9")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", CrimeLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#71F5A3")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", DramaLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#93F68D")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", FamilyLine);


        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#B5F779")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", FantasyLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#D6F568")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", HistoryLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#F27E6B")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", HorrorLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#F97E80")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", MusicLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#FC8197")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", MusicalLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#F987AE")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", RomanceLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#F191C4")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", SciFiLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#E29CD8")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", SportLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#CEA9E9")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", ThrillerLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#B5B5F5")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", WarLine);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#98C1FC")
            .attr("stroke-width", "2px")
            .style("opacity", 0.8)
            .attr("d", WesternLine);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y_scale).ticks(10, "%"));

    });
};
