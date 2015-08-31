define(
  [
    'jquery',
    'underscore',
    'backbone',
    'config'
  ],
  function(jQuery, _, Backbone, config){

    return Backbone.Model.extend( {
        defaults: {
            'default_share_language': config.defaultShareLanguage,
            'still_image': config.defaultShareImage,
            'fbShare': '',
            'twitterShare': '',
            'share_language': '',  
            'encodedShare': '',
            'fb_id': '',
            'fb_redirect': 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
            'email_link': ''

 

            
        },

        initialize: function() {
            var baseURL = window.location.origin + window.location.pathname;
           this.set({
                'baseURL': baseURL,
                'fbShare': this.createFbShareURL(baseURL),
                'twitterShare': this.createTwitterShareURL(baseURL),
                'share_language': config.defaultShareLanguage,
                'encodedShare': encodeURIComponent(config.defaultShareLanguage),
                'fb_id': config.fb_app_id,
                'email_link': this.createEmailLink(baseURL)
                
            }); 

          
           
        },

        createFbShareURL: function(url) {   
            url = url.replace('#', '%23');
            return encodeURI(url); 
        },

        createTwitterShareURL: function(url) {

            return encodeURIComponent(url); 
        },

        createEmailLink: function(url) {
            return "mailto:?subject=" + config.projectTitle + "&body=" + encodeURIComponent(config.defaultShareLanguage) +  "%0d%0d" + this.createTwitterShareURL(url);
        },

        updateLanguage: function(newShareStr) {
            this.set({
                'sharelanguage': newShareStr,
                'encodedShare': encodeURIComponent(newShareStr)
            });


        },

        updateUrls: function(candidateSlug) {
            var shareUrl;
            var baseURL = this.get('baseURL');
            
            this.updateLanguage(this.get('default_share_language'));
            if (candidateSlug) {
                shareUrl = baseURL + "#/candidate/" + candidateSlug;
            } else {
                shareUrl = baseURL;
            }

            this.set({
                'fbShare': this.createFbShareURL(shareUrl),
                'twitterShare': this.createTwitterShareURL(shareUrl),
                'email_link': this.createEmailLink(shareUrl)
            });

        },
        setCandidate: function(candidateModel) {
            this.updateUrls(candidateModel.get('slug'));
            this.updateLanguage(candidateModel.get('share_language'));
        }
    });

});
