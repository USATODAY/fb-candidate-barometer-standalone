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
            this.listenTo(Backbone, "window:resize", this.redraw);
            this.currentEntry= 0;
        },
        render: function() {
            this.drawChart();
        },
        drawChart: function()  {
            var _this = this;
            var chartData = this.chartData = this.parseData(this.collection);
            var dimensions = this.dimensions = this.getDimensions();
            var numVisible = this.getNumVisible();
            var chartRange = this.chartRange = dimensions.width * (chartData.length / numVisible);
            var largeCircleRadius = this.largeCircleRadius = 18;
            var smallCircleRadius = this.smallCircleRadius = 9;
            var x = this.x = d3.scale.linear()
                .range([0, chartRange])
                .domain([chartData.length - 1, 0]);


            var y = d3.scale.linear()
                .range([0, dimensions.height - dimensions.margin])
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
                .attr("transform", "translate(" + -(chartRange - (dimensions.width/2 + (x(chartData.length - 1 - this.currentEntry)))) + ", " + dimensions.margin + ")");

            this.chartG = this.chartWrap.append("g")
                .datum({x: 0, y: 0})
                .attr("class", "iapp-chart-g");

            // this.chartG.call(drag);

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

            // this.addDate();
            this.addMonths();


            // dataPoints.append("text")
                // .text(function(d) { return d.interactions; })
                // .attr("font-size", "10px");
        },
        addMonths: function() {
            var _this = this;

            //add g to hold each month tick
            var monthTicksG = this.chartG.selectAll(".month-ticks")
                .data(this.chartData)
                .enter()
                .append('g')
                .attr('class', '.month-ticks')
                .attr('transform', function(d, i) {
                    var ty = _this.dimensions.height;
                    var tx = _this.x(i);
                    return 'translate(' + tx + ', ' + ty + ')';
                });

            //add tick mark
            monthTicksG.append('rect')
                .attr('width', 1)
                .attr('height', 5)
                .attr('y', -5)
                .attr('fill', 'white');

            monthTicksG.append('text')
                .text(function(d, i) {
                    var currentMonth = d.date.split(' ')[0];
                    if (i < _this.chartData.length - 1) {
                        var nextMonth = _this.chartData[i + 1].date.split(' ')[0];
                        if (currentMonth !== nextMonth) {
                            return currentMonth.toUpperCase();
                        } else {
                            return '';
                        }
                    } else {
                        return currentMonth.toUpperCase();
                    }
                })
                .attr("fill", "white")
                .attr('dy', '1em')
                .attr("dx", "-1.2em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("font-size", 12);

        },
        addDate: function() {
            var _this = this;
            var dateText = this.chartData[this.currentEntry].date;
            this.currentDate = this.chartG.append("g")
                .attr("class", "iapp-chart-date")
                .attr("transform", "translate(" + _this.x(_this.currentEntry) + "," + (_this.dimensions.height + _this.dimensions.margin - 10) + ")")
                .attr("opacity", 0)
                .attr("fill", "white");

            this.currentDate.append("text")
                .attr("dx", "-3em")
                .attr("font-family", "Futura Today Light, Arial, sans-serif")
                .attr("font-size", 12)
                .text(dateText);

            this.currentDate.transition()
                .duration(1000)
                .attr("opacity", 1);
        },
        removeDate: function() {
            this.currentDate.transition()
                .duration(1000)
                .attr("opacity", 0);

            this.currentDate.transition()
                .delay(1000)
                .remove();
        },
        updateCurrent: function(newIndex) {
            var _this = this;
            this.currentEntry = newIndex;
            var chartRange = this.chartRange,
            dimensions = this.dimensions,
            chartData = this.chartData,
            x = this.x,
            largeCircleRadius = this.largeCircleRadius,
            smallCircleRadius = this.smallCircleRadius,
            transitionDuration = 1000;

            // this.removeDate();
            // this.addDate();

            //update chart position
            this.chartWrap.transition()
                .duration(transitionDuration)
                .attr("transform", "translate(" + -(chartRange - (dimensions.width/2 + (x(chartData.length - 1 - this.currentEntry)))) + ", " + dimensions.margin + ")");

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
        redraw: function() {
            this.$el.empty();
            _.bind(_.throttle(this.drawChart, 250), this)();
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
                height: window.innerWidth > 960 ? 200 : 180,
                width: window.innerWidth - (margin * 2),
                margin: margin
            };
        },
        getNumVisible: function() {
            return window.innerWidth > 1000 ? 18 : window.innerWidth / 50;
        },
        parseData: function(collection) {
            return collection.map(function(entryModel) {
                return {interactions: entryModel.get("interactions"), trend: entryModel.get("trend"), date: helpers.formatDate(entryModel.get("dateObj"))};
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
