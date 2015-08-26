define([
    'jquery', 
    'underscore', 
    'backbone',
    'config',
    'helpers',
    'templates',
    'velocity',
    'router',
    'views/EntryView',
    'views/WeekChartView'
], function(jQuery, _, Backbone, config, helpers, templates, Velocity, router, EntryView, WeekChartView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:entryCollection", this.entriesReady);
            this.model.getEntries();
            this.render(true);
        },
        className: "iapp-entries-wrap",
        template: templates["entriesView.html"],
        entriesReady: function() {
            this.render(true);
        },
        render: function(clear) {
            this.entryCollection = this.model.get("entryCollection");
            var _this = this;
            if (this.entryCollection === null) {
                //check if entryCollection is null due or still fetching
                this.$el.addClass("loading");
                this.$el.html("<img src='" + config.imageDir + "ring-loading.svg' alt='loading' class='iapp-loader'>");
            } else {
                //render entries
                if (clear) {
                    this.$el.removeClass("loading");
                    this.$el.empty();
                }

                //grab current entry model
                this.currentEntry = this.entryCollection.models[this.currentEntryIndex];

                //store reference to date and format for display
                var entryDate = this.currentEntry.get("dateObj");
                var currentDate = helpers.formatDate(entryDate);

                //render date and date navigation
                var context = helpers.makeContext(_.extend(this.model.toJSON(), {date: currentDate, showNext: this.currentEntryIndex > 0, showPrevious: this.currentEntryIndex < (this.entryCollection.length - 1)}));

                if (clear) {
                    //re-render the whole view
                    this.$el.append(this.template(context));
                } else {
                    //re-render select parts of the view
                    this.$(".iapp-entries-date").html(context.date);
                    if (context.showNext) {
                        this.$(".iapp-entries-date-next").show();
                    } else {
                        this.$(".iapp-entries-date-next").hide();
                    }
                    if (context.showPrevious) {
                        this.$(".iapp-entries-date-previous").show();
                    } else {
                        this.$(".iapp-entries-date-previous").hide();
                    }
                }

                //add weekChart
                if(clear) {
                    this.weekChartView = new WeekChartView({el: ".iapp-weeks-chart", collection: this.entryCollection});
                    this.weekChartView.render();
                }
                
                //remove old entry
                this.$('.iapp-entry').empty();
                //make new entryView based on current entry model and render into view
                var entryView = new EntryView({model: this.currentEntry});
                this.$(".iapp-entry").append(entryView.el);
            }
            return this;
        },
        events: {
            "click .iapp-entries-date-previous": "goBack",
            "click .iapp-entries-candidate-select-button": "onCandidateSelect",
            "click .iapp-entries-date-next": "goForward"
        },
        onCandidateSelect: function() {
            router.navigate("/candidate/");
            Backbone.trigger("menu:open");
        },
        goBack: function() {
            //increment entry index and re-render
            this.currentEntryIndex++;
            this.weekChartView.goBack();
            this.render();
        },
        goForward: function() {
            //decrement entry index and re-render
            this.currentEntryIndex--;
            this.weekChartView.goForward();
            this.render();
        },
        entryCollection: null,
        currentEntry: null,
        currentEntryIndex: 0,
    });
});
