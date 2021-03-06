define(
    [
    'jquery',
    'underscore',
    'backbone',
    'isotope',
    'config',
    'router',
    'dataManager',
    'collections/PoliticianCollection',
    'views/AppView'
    ],
    function(jQuery, _, Backbone, Isotope, config, router, DataManager, PoliticianCollection, AppView){
    
    return {
        init: function() {
            require(['jquery-bridget/jquery.bridget'],
                function() {
                    // make Isotope a jQuery plugin
                    jQuery.bridget('isotope', Isotope);

                    if (window != window.parent) {
                        $("html").addClass("embed");
                    }

                    var overviewData = new DataManager(config.dataDir + "data.json");
                    jQuery(window).on("resize", function() {
                        Backbone.trigger("window:resize");
                        sizeWrap();
                    });
                    overviewData.getData(function(data) {
                        var sortedPoliticians = _.sortBy(data.politicians, function(politician) {
                            //sort by last name by default
                            return politician.name.split(" ")[1];
                        });
                        var politicianCollection = new PoliticianCollection(sortedPoliticians);
                        new AppView({collection: politicianCollection});
                    });

                    function sizeWrap() {
                        var winHeight = window.innerHeight;
                        jQuery('.iapp-page-wrap').css({"min-height": winHeight});
                    }

                    sizeWrap();
                });
        }
    };

});
