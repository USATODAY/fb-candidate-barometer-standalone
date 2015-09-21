define([
    "jquery",
    "underscore",
    "backbone",
    "hammerjs",
    'router',
    "velocity",
    'api/analytics'
], function(jQuery, _, Backbone, Hammer, router, Velocity, Analytics) {
    return Backbone.View.extend({
        initialize: function() {
            // this.addTouchEvents();
            this.listenTo(Backbone, "router:home", this.show);
            this.listenTo(Backbone, "router:candidate", this.skip);
            this.listenTo(Backbone, "router:candidateSelect", this.skip);
        },
        addTouchEvents: function() {
            this.ht = new Hammer(this.el);
            this.ht.on('swipe', _.bind(this.onSwipe, this));
            this.ht.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

        },
        el: ".iapp-js-intro",
        events: {
            "click .iapp-intro-begin-button": "onBeginClick"
        },
        advance: function(e) {
            var _this = this;
            this.$el.velocity({"translateY": "-100%"}, {duration: 400, easing: "swing"});
            _.delay(function() { _this.$el.hide();}, 400);
        },
        skip: function(e) {
            this.$el.velocity({"translateY": "-100%"}, {duration: 0});
        },
        show: function() {
            this.$el.velocity({"translateY": "0%"}, {duration: 400, easing: "swing"});
            this.$el.show();
        },
        onBeginClick: function(e) {
            router.navigate('/candidate/');
            Analytics.trackEvent("fb-barometer-begin-button-clicked");
            this.advance(e);
        },
        onSwipe: function(e) {
            this.advance(e);
        }
    });
});
