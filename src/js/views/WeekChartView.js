define([
    'jquery', 
    'underscore', 
    'backbone',
    'd3',
    'config', 
    'helpers',
    'templates',
], function(jQuery, _, Backbone, d3, config, helpers, templates){
    return Backbone.View.extend({
        initialize: function() {

        },
        render: function() {
            this.drawChart();
        },
        drawChart: function()  {
            var chartData = this.parseData(this.collection);
            var dimensions = this.getDimensions();
            var numVisible = 7;
            var chartRange = dimensions.width * (chartData.length / numVisible);
            console.log(chartData);
            var x = d3.scale.linear()
                .range([0, chartRange])
                .domain([chartData.length - 1, 0]);

            var y = d3.scale.linear()
                .range([0, dimensions.height])
                .domain([d3.max(chartData, function(d) {return d.interactions; }), 0]);

            var line = d3.svg.line()
                .x(function(d, i) { return x(i); })
                .y(function(d, i) { return y(d.interactions); });

            var drag = d3.behavior.drag()
                .origin(function(d) { return d; })
                .on("drag", this.dragMove);
            
            this.svg = d3.select(this.el).append('svg')
                .attr("width", dimensions.width + (dimensions.margin * 2))
                .attr("height", dimensions.height + (dimensions.margin * 2));

            this.chartWrap = this.svg.append("g")
                .attr("transform", "translate(" + -(chartRange - dimensions.width) + ", " + dimensions.margin + ")");

            this.chartG = this.chartWrap.append("g")
                .datum({x: 0, y: 0})
                .attr("class", "iapp-chart-g");

            this.chartG.call(drag);

            this.chartG.append("path")
                .datum(chartData)
                .attr("class", "iapp-line")
                .attr("d", line);

            var dataPoints = this.chartG.selectAll(".data-points")
                .data(chartData)
                .enter()
                .append("g")
                .attr("class", "data-points")
                .attr("transform", function(d, i) {
                    var xPos = x(i);
                    var yPos = y(d.interactions);
                    return "translate(" + xPos + ", " + yPos + ")";
                });

            dataPoints.append("circle")
                .attr("r", 8)
                .attr("class", "iapp-chart-point");

            // dataPoints.append("text")
                // .text(function(d) { return d.interactions; })
                // .attr("font-size", "10px");
        },
        dragMove: function(d) {
            dx = d3.event.dx;
            console.log(dx);
            d.x = d.x + dx;
            d3.select(this)
                .attr("transform", "translate(" + d.x + ", 0)");
        },
        getDimensions: function() {
            return {
                height: 200,
                width: 600,
                margin: 20
            };
        },
        parseData: function(collection) {
            return collection.map(function(entryModel) {
                return {interactions: entryModel.get("interactions"), trend: entryModel.get("trend")};
            });
        }
    });

});
