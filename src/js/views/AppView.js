define([
    'jquery', 
    'underscore', 
    'backbone',
    'api/analytics',
    'config', 
    'templates',
    'helpers',
    'api/analytics',
    'router',
    'models/ShareModel',
    'views/PoliticianIndexView',
    'views/EntriesView',
    'views/InfoView',
    'views/IntroView'
], function(jQuery, _, Backbone, Analytics, config, templates, helpers, Analytics, router, ShareModel, PoliticianIndexView, EntriesView, InfoView, IntroView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "politician:set", this.setPolitician);
            this.listenTo(Backbone, "router:candidate", this.onCandidateRoute);
            this.render();
            Backbone.history.start();
        },
        el: '.iapp-js-app',
        template: templates["appView.html"],
        shareTemplate: templates["shareView.html"],
        render: function() {
            //create share model
            this.shareModel = new ShareModel();
            console.log(this.shareModel);

            var context = helpers.makeContext({share: this.shareModel.toJSON()});
            this.$el.append(this.template(context));

            this.renderShare(context);



            //intro View attaches itself to pre-rendered html
            var introView = new IntroView();

            var infoView = new InfoView();
            this.$el.append(infoView.el);

            var politicianIndexView = new PoliticianIndexView({collection: this.collection});
            this.$el.append(politicianIndexView.render().el);
        },
        renderShare: function(context) {
            this.$('.iapp-header-share-wrap').html(this.shareTemplate(context));
        },
        events: {
            "click .iapp-info-button": "onInfoClick",
            'click .iapp-share-popup': 'onShareButtonClick'
        },
        headerTemplate: templates["header.html"],
        setPolitician: function(politicianModel) {
            if (this.entriesView !== undefined) {
                this.entriesView.remove();
            }
            this.entriesView = new EntriesView({model: politicianModel});
            this.$el.append(this.entriesView.el);
            this.shareModel.setCandidate(politicianModel);
            var context = helpers.makeContext({share: this.shareModel.toJSON()});
            this.renderShare(context);
        },
        onCandidateRoute: function(candidateSlug) {
            var candidateModel = this.collection.findWhere({'slug': candidateSlug});
            this.setPolitician(candidateModel);
        },
        onInfoClick: function(e) {
            Backbone.trigger("info:show");
        },
        onShareButtonClick: function(e) {
            Analytics.trackEvent('fb-barometer-share-button-clicked');
            e.preventDefault();
            this.windowPopup(e.currentTarget.href, 500, 300);
        },
        windowPopup: function(url, width, height) {
            // Calculate the position of the popup so
            // it’s centered on the screen.
            var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

            window.open(
                url,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
            );
        }
    });
});
