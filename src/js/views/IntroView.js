define([
    "jquery",
    "underscore",
    "backbone",
    "hammerjs",
    "velocity"
], function(jQuery, _, Backbone, Hammer, Velocity) {
    return Backbone.View.extend({
        initialize: function() {
            this.addTouchEvents();
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
            e.preventDefault();
            jQuery(window).off('scroll');
            this.$el.velocity({"translateY": "-100%"}, {duration: 400, easing: "swing"});
        },
        onBeginClick: function(e) {
            this.advance(e);
        },
        onSwipe: function(e) {
            this.advance(e);
        }
    });
});
