define([
    'jquery', 
    'underscore', 
    'backbone',
    'config',
    'helpers',
    'templates',
    'velocity',
    'views/EntryView',
    'views/WeekChartView'
], function(jQuery, _, Backbone, config, helpers, templates, Velocity, EntryView, WeekChartView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:entryCollection", this.render);
            this.model.getEntries();
            this.render();
        },
        className: "iapp-entries-wrap",
        template: templates["entriesView.html"],
        render: function() {
            this.entryCollection = this.model.get("entryCollection");
            var _this = this;
            if (this.entryCollection === null) {
                //check if entryCollection is null due or still fetching
                this.$el.html("<img src='" + config.imageDir + "ring-loading.svg' alt='loading' class='iapp-loader'>");
            } else {
                //render entries
                this.$el.empty();

                //grab current entry model
                this.currentEntry = this.entryCollection.models[this.currentEntryIndex];

                //store reference to date and format for display
                var entryDate = this.currentEntry.get("dateObj");
                var currentDate = helpers.formatDate(entryDate);

                //render date and date navigation
                var context = helpers.makeContext({date: currentDate, showNext: this.currentEntryIndex > 0, showPrevious: this.currentEntryIndex < (this.entryCollection.length - 1)});
                this.$el.append(this.template(context));

                //add weekChart
                this.weekChartView = new WeekChartView({el: ".iapp-weeks-chart", collection: this.entryCollection});
                this.weekChartView.render();

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
            Backbone.trigger("menu:open");
        },
        goBack: function() {
            //increment entry index and re-render
            this.currentEntryIndex++;
            this.render();
        },
        goForward: function() {
            //decrement entry index and re-render
            this.currentEntryIndex--;
            this.render();
        },
        entryCollection: null,
        currentEntry: null,
        currentEntryIndex: 0,
    });
});
