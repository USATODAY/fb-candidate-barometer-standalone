define([
    "jquery",
    "underscore",
    "backbone"
], function(jQuery, _, Backbone) {
    return Backbone.View.extend({
        initialize: function() {
        },
        el: ".iapp-js-intro",
        events: {
            "click .iapp-intro-begin-button": "onBeginClick"
        },
        onBeginClick: function(e) {
            this.remove();
        }
    });
});
