define(["jquery"], function(jQuery) {
    /******
     * Set up basic project info
     *****/

    //set project data URL here
    var dataURL = "";
    var dataDir = "http://www.gannett-cdn.com/experiments/usatoday/2015/07/fb-meter/data/";
    //set project image path here
    var imageDir = "http://www.gannett-cdn.com/experiments/usatoday/2015/08/fb-meter-standalone/img/";

    //set project default share language here
    var defaultShareLanguage = "Which 2016ers are trending on Facebook? Check out the USA TODAY/Facebook Candidate Barometer";
    var defaultShareImage = imageDir + "fb-post.jpg";

    var projectTitle = "2016 USA TODAY/FACEBOOK CANDIDATE BAROMETER";

    var chartColors = {
        "republican": ["#fc9292", "#c41d23"],
        "democrat":  ["#66afd8", "#153368"],
        "libertarian": ["#f6df99", "#f6b900"],
        "green": ["#658e65", "#388E3C"]
    };

    /******
     * Detect app environment.
     * Returns boolean values for isMobile, isTablet, and isEmbed.
     * If isEmbed is true, embedType will equal 1 of 4 string values:
     * - module-large-size-large
     * - module-large-size-small
     * - module-small-size-large
     * - module-small-size-small
     * If isEmbed is false, embedType will be null
     *****/

    function _getIsEmbed() {
        // return window != window.parent;
        return true;
    }

    function _getStaticInfo() {
        return JSON.parse(jQuery(".staticinfo").html());
    }

    function _getIsMobile() {
        var isMobile;
        if (_getStaticInfo().platform == "desktop") {
            isMobile = false;
        } else {
            isMobile = true;
        }
        return isMobile;
    }

    function _getFbAppId() {
        return _getStaticInfo().facebook.app_id;
    }

    function _getIsTablet() {
        var isTablet = false;
        if (_getIsMobile() === false) {
            if (Modernizr && Modernizr.touch && window.innerWidth < 1100) {
                isTablet = true;
            }
        }
        return isTablet;
    }
    
    function _getModuleType() {
        var moduleType = null;
        if (_getIsEmbed()) {
            if (window.innerWidth > 1080) {
                moduleType = "module-large-size-large";
            } else if (window.innerWidth > 960) {
                moduleType = "module-large-size-small";
            } else if (window.innerWidth > 720) {
                moduleType = "module-small-size-large";
            } else {
                moduleType = "module-small-size-small";
            }
        }

        return moduleType;
    }



    return {
        imageDir: imageDir,
        dataURL: dataURL,
        dataDir: dataDir,
        staticInfo: _getStaticInfo(),
        fb_app_id: _getFbAppId(),
        isMobile: _getIsMobile(),
        isTablet: _getIsTablet(),
        defaultShareLanguage: defaultShareLanguage,
        defaultShareImage: defaultShareImage,
        isEmbed: _getIsEmbed(),
        getModuleType: _getModuleType,
        chartColors: chartColors,
        projectTitle: projectTitle
    };
});
