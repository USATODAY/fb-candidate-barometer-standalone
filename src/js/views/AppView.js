define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'templates',
    'helpers',
    'router',
    'views/PoliticianIndexView',
    'views/EntriesView',
    'views/InfoView',
    'views/IntroView'
], function(jQuery, _, Backbone, config, templates, helpers, router, PoliticianIndexView, EntriesView, InfoView, IntroView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "politician:set", this.setPolitician);
            this.listenTo(Backbone, "router:candidate", this.onCandidateRoute);
            this.render();
            Backbone.history.start();
        },
        el: '.iapp-js-app',
        template: templates["appView.html"],
        render: function() {
            var context = helpers.makeContext({});
            this.$el.append(this.template(context));


            //intro View attaches itself to pre-rendered html
            var introView = new IntroView();

            var infoView = new InfoView();
            this.$el.append(infoView.el);

            var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            this.$el.append(politicianIndexView.render().el);
        },
        events: {
            "click .iapp-info-button": "onInfoClick"
        },
        headerTemplate: templates["header.html"],
        setPolitician: function(politicianModel) {
            /******
             * @TODO add ability to update entries view without wiping out/re-rendering
             *****/

            if (this.entriesView !== undefined) {
                this.entriesView.remove();
            }
            this.entriesView = new EntriesView({model: politicianModel});
            this.$el.append(this.entriesView.el);
        },
        onCandidateRoute: function(candidateSlug) {
            var candidateModel = this.collection.findWhere({'slug': candidateSlug});
            console.log("candidate route");
            this.setPolitician(candidateModel);
        },
        onInfoClick: function(e) {
            Backbone.trigger("info:show");
        }
    });
});
