define([
    'jquery', 
    'underscore', 
    'backbone',
    'config', 
    'dataManager',
    'collections/EntryCollection'
], function(jQuery, _, Backbone, config, DataManager, EntryCollection) {
    return Backbone.Model.extend({
        defaults: {
            /***
             * lists all expected properties
             ***/
            "id": null,
            "trend": null,
            "name": null,
            "slug": null,
            "image": null,
            "party": null,
            "share_language": null,

            /***
             * holds collection of entries
             ***/
            "entryCollection": null
        },
        initialize: function(attrs, options) {
            var slug = attrs.slug;
            var image = config.imageDir + slug + ".png";
            var shareLanguage = "Who’s talking about " + this.get("name") + " on Facebook? Check out the USA TODAY/Facebook Candidate Barometer";
            this.set({
                "image": image,
                "share_language": shareLanguage
            });

        },
        getEntries: function() {
            /***
             * fetches data and creates collection of entries
             ***/
            var _this = this;
            var entriesDataFile = this._getDetailDataFile();
            var dataManager = new DataManager(entriesDataFile);
            dataManager.getData(function(data) {
                var props = _.omit(data, 'weekly_entries');
                _.extend(props, {party: _this.get("party")});
                var cleanEntries = _.without(data.weekly_entries, null);
                var entryCollection = new EntryCollection(cleanEntries, {props: props});
                _this.set({entryCollection: entryCollection});
            });
        },
        _getDetailDataFile: function() {
            var id = this.get("id");
            return config.dataDir + id + ".json";
        }
    });
});
