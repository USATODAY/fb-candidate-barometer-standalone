define([
    "jquery",
    "underscore",
    'lib/BackboneRouter',
    ], 
    function($, _, Backbone) { 
        var Router = Backbone.Router.extend({

            routes: {
                "(_)": "home",
                "(/)candidate/": "candidateSelect",
                "(/)candidate/:candidateSlug": "candidate",
            },

            home: function() {
                Backbone.trigger("router:home");
            },
            candidateSelect: function() {
                console.log("candidate select route");
                Backbone.trigger("router:candidateSelect");
            },
            candidate: function(candidateSlug) {
                Backbone.trigger("router:candidate", candidateSlug);
            }

        });


        return new Router();
});
