define([
    "jquery",
    "underscore",
    'lib/BackboneRouter',
    ], 
    function($, _, Backbone) { 
        var Router = Backbone.Router.extend({

            routes: {
                "": "home",
                "/candidate/:candidateSlug": "candidate",
                "candidate/:candidateSlug": "candidate",

            },

            home: function() {
                Backbone.trigger("homeRoute");
            },

            candidate: function(candidateSlug) {
                console.log("candidate router route");
                Backbone.trigger("router:candidate", candidateSlug);
            }

        });


        return new Router();
});
