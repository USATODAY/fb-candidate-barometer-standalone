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
            this.currentEntry= 0;
        },
        render: function() {
            this.drawChart();
        },
        drawChart: function()  {
            var _this = this;
            var chartData = this.chartData = this.parseData(this.collection);
            var dimensions = this.dimensions = this.getDimensions();
            var numVisible = 18;
            var chartRange = this.chartRange = dimensions.width * (chartData.length / numVisible);
            var largeCircleRadius = this.largeCircleRadius = 18;
            var smallCircleRadius = this.smallCircleRadius = 9;
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
                .attr("transform", "translate(" + -(chartRange - (dimensions.width/2 + (chartRange/chartData.length) * this.currentEntry)) + ", " + dimensions.margin + ")");

            this.chartG = this.chartWrap.append("g")
                .datum({x: 0, y: 0})
                .attr("class", "iapp-chart-g");

            this.chartG.call(drag);

            this.chartG.append("path")
                .datum(chartData)
                .attr("class", "iapp-line")
                .attr("d", line);

            var dataPoints = this.dataPoints = this.chartG.selectAll(".data-points")
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
                .attr("r", function(d, i) {
                    if (i == _this.currentEntry) {
                        return largeCircleRadius;
                    } else {
                        return smallCircleRadius;
                    }
                })
                .attr("class", function(d, i) {
                    var className;
                    if (i == _this.currentEntry) {
                        className = "iapp-chart-point";
                    } else {
                        className = "iapp-chart-point iapp-chart-point-active";
                    }
                    return className;
                });

            // dataPoints.append("text")
                // .text(function(d) { return d.interactions; })
                // .attr("font-size", "10px");
        },
        updateCurrent: function(newIndex) {
            var _this = this;
            this.currentEntry = newIndex;
            var chartRange = this.chartRange,
            dimensions = this.dimensions,
            chartData = this.chartData,
            largeCircleRadius = this.largeCircleRadius,
            smallCircleRadius = this.smallCircleRadius,
            transitionDuration = 1000;
            console.log(newIndex);

            //update chart position
            this.chartWrap.transition()
                .duration(transitionDuration)
                .attr("transform", "translate(" + -(chartRange - (dimensions.width/2 + (chartRange/chartData.length) * this.currentEntry)) + ", " + dimensions.margin + ")");

            this.dataPoints.select("circle")
                .transition()
                .duration(transitionDuration)
                .attr("r", function(d, i) {
                    if (i == _this.currentEntry) {
                        return largeCircleRadius;
                    } else {
                        return smallCircleRadius;
                    }
                })
                .attr("class", function(d, i) {
                    var className;
                    if (i == _this.currentEntry) {
                        className = "iapp-chart-point";
                    } else {
                        className = "iapp-chart-point iapp-chart-point-active";
                    }
                    return className;
                });
        },
        dragMove: function(d) {
            dx = d3.event.dx;
            d.x = d.x + dx;
            d3.select(this)
                .attr("transform", "translate(" + d.x + ", 0)");
        },
        getDimensions: function() {
            var margin = 20;
            return {
                height: 200,
                width: window.innerWidth - (margin * 2),
                margin: margin
            };
        },
        parseData: function(collection) {
            return collection.map(function(entryModel) {
                return {interactions: entryModel.get("interactions"), trend: entryModel.get("trend")};
            });
        },
        goForward: function() {
            this.updateCurrent(this.currentEntry - 1);
        },
        goBack: function() {
            this.updateCurrent(this.currentEntry + 1);
        }
    });

});
