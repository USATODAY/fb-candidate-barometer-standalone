define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["EntryView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (!config.isMobile) { ;
__p += '\n<section class="iapp-entry-details ' +
((__t = ( party )) == null ? '' : __t) +
'">\n';
};
__p += '\n\n<div class="iapp-detail-summary iapp-entry-module">\n    <h4 class="iapp-entry-module-header">Overall Facebook activity</h4>\n    <div class="iapp-entry-details-large-number tri-down">\n        <h3 class="iapp-entry-details-large-number-text">' +
((__t = ( interactions_pretty )) == null ? '' : __t) +
'</h3>\n        \n    </div>\n    <div class="iapp-fb-unit-badge"> <img src="';
 print(config.imageDir + "fb-icon.png") ;
__p += '" alt="likes, comments, shares, and posts">likes, comments, shares, & posts</div>\n\n</div>\n<div class="iapp-entry-details-demographics iapp-entry-module">\n    <h4 class="iapp-entry-module-header">Who\'s in the conversation</h4>\n    <div class="iapp-entry-details-demographics-overall">\n        <div class="iapp-entry-details-demographics-overall-headers">\n            <span class="iapp-demo-headers-female">Female</span>\n            <span class="iapp-demo-headers-male">Male</span>\n        </div>\n        <div class="iapp-entry-details-demographics-overview-bar iapp-js-entry-demo-overview"></div>\n    </div>\n    <div class="iapp-entry-details-demographics-details iapp-js-entry-demo-details"></div>\n</div>\n\n\n';
 if (!config.isMobile) { ;
__p += '\n</section>\n';
};
__p += '\n\n';

}
return __p
};

this["templates"]["appView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-app-header">\n    <div class="iapp-app-header-inner-wrap">\n        <h3 class="iapp-app-header-title">2016 USA TODAY/Facebook Candidate Barometer</h3>\n        <div class="iapp-header-share-wrap"></div>\n    </div>\n</div>\n\n<div id=\'iapp-map-tooltip\' class=\'iapp-hidden iapp-map-tooltip\'> </div>\n<img class=\'iapp-info-button\' src=\'' +
((__t = (config.imageDir)) == null ? '' : __t) +
'info-icon.png\' alt=\'info\'>\n';

}
return __p
};

this["templates"]["entriesView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-entries-date-wrap">\n        ';
 if (showPrevious) {;
__p += '\n        <div class="iapp-entries-date-previous iapp-entries-date-selector"><img src="';
 print(config.imageDir + "left-arrow-narrow.png");
__p += '" alt="left"> <div class="iapp-entries-date-selector-label" >Previous Week</div>  </div>\n        ';
}else {;
__p += '\n        <div class="iapp-entries-date-previous iapp-entries-date-selector" style="display:none;"><img src="';
 print(config.imageDir + "left-arrow-narrow.png");
__p += '" alt="left"> <div class="iapp-entries-date-selector-label" >Previous Week</div>  </div>\n        ';
};
__p += '\n        ';
 if (showNext) {;
__p += '\n        <div class="iapp-entries-date-next iapp-entries-date-selector"><img src="';
 print(config.imageDir + "right-arrow-narrow.png");
__p += '" alt="right"> <div class="iapp-entries-date-selector-label" >Next Week</div>  </div>\n        ';
}else {;
__p += '\n        <div class="iapp-entries-date-next iapp-entries-date-selector" style="display:none;"><img src="';
 print(config.imageDir + "right-arrow-narrow.png");
__p += '" alt="right"> <div class="iapp-entries-date-selector-label" >Next Week</div>  </div>\n        ';
};
__p += '\n        <h3 class="iapp-entries-date">' +
((__t = (date)) == null ? '' : __t) +
'</h3>\n</div>\n<div class="iapp-entries-candidate-select-button">Select another candidate</div>\n<div class="iapp-candidate-info">\n  <div class="iapp-politician-item-portrait ' +
((__t = ( party )) == null ? '' : __t) +
'">\n    <div class="iapp-politician-item-portrait-inner">\n        ';
 if(party){ ;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".jpg") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } else {;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".png") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } ;
__p += '\n    </div>\n  </div>\n  <div class="iapp-entries-info">\n  <h2 class="iapp-entry-details-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h2>\n   <p class="iapp-entries-date">Week ending ' +
((__t = ( date )) == null ? '' : __t) +
'</p>\n   </div>\n</div>\n<div class="iapp-weeks-chart"></div>\n<div class="iapp-entry"></div>\n';

}
return __p
};

this["templates"]["header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-index-intro">\n    <div class="iapp-politician-index-intro-inner-wrap">\n        <h2 class="iapp-index-intro-header">2016 USA TODAY/Facebook candidate barometer</h2>\n        <hr class="iapp-index-intro-rule" />\n        <p class="iapp-index-intro-chatter">USA TODAY and Facebook have partnered to map conversation about the presidential candidates. The interactive below displays total Facebook activity (likes, shares, mentions) for each candidate each week, showing who is trending up and down. </p>\n    </div>\n</div>\n';

}
return __p
};

this["templates"]["infoView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-info-panel-inner">\n    <h3 class="iapp-info-header">About the data</h3>\n    <p class="iapp-info">State engagement level is measured by the percent of all Facebook users in a given state who have interacted with a given candidate. Interactions include likes, comments and mentions.</p>\n    <p class="iapp-info"><strong>Credits: </strong> Paul Singer, Shawn Sullivan, Kevin Kepple, Mitchell Thorson, USA TODAY; Ogo Batzorig, Gannett Digital</p>\n    <p class="iapp-info"><strong>Source: </strong> Facebook data</p>\n\n    <img class="iapp-info-close" src="';
 print(config.imageDir + "close-icon.png") ;
__p += '" alt="close">\n</div>\n';

}
return __p
};

this["templates"]["politicianIndex.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-politician-index-show-button">Select a candidate</div>\n<div class="iapp-politician-index-wrap"></div>\n<div class="iapp-politician-index-sort-buttons">\n    <span class="iapp-politician-index-sort-label iapp-politician-index-sort-text">Sort by: </span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-name selected"> <span class="iapp-politician-index-sort-indicator"></span> <span class="iapp-politician-index-sort-text">Name</span></span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-trend"> <span class="iapp-politician-index-sort-indicator"></span> <span class="iapp-politician-index-sort-text">Trending</span></span>\n    <span class="iapp-politician-index-sort-button iapp-sort-button-party"> <span class="iapp-politician-index-sort-indicator"></span> <span class="iapp-politician-index-sort-text">Party</span></span>\n</div>\n\n\n';

}
return __p
};

this["templates"]["politicianIndexItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-politician-item-portrait ' +
((__t = ( party )) == null ? '' : __t) +
'">\n    <div class="iapp-politician-item-portrait-inner">\n        ';
 if(party){ ;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".jpg") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } else {;
__p += '\n            <img src="';
 print(config.imageDir + "/candidates/" + slug + ".png") ;
__p += '" alt="' +
((__t = ( name )) == null ? '' : __t) +
'">\n        ';
 } ;
__p += '\n    </div>\n</div>\n';
 if(party){ ;
__p += '\n    <img class="iapp-politician-item-trend" src="';
 print(config.imageDir +  trend + "." + party.slice(0, 3) + ".png")  ;
__p += '" alt="">\n';
 } ;
__p += '\n<h3 class="iapp-politician-header">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

this["templates"]["shareView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="https://twitter.com/intent/tweet?url=' +
((__t = (share.twitterShare)) == null ? '' : __t) +
'&text=' +
((__t = (share.encodedShare)) == null ? '' : __t) +
'" class="iapp-share-button iapp-share-twitter iapp-share-popup" target="_blank"><img src="' +
((__t = ( config.imageDir )) == null ? '' : __t) +
'twitter.svg" alt="Twitter share"></a>\n<a href=\'https://www.facebook.com/dialog/feed?display=popup&app_id=' +
((__t = (share.fb_id)) == null ? '' : __t) +
'&link=' +
((__t = (share.fbShare)) == null ? '' : __t) +
'&picture=' +
((__t = (share.still_image)) == null ? '' : __t) +
'&name=&description=' +
((__t = (share.encodedShare)) == null ? '' : __t) +
'&redirect_uri=' +
((__t = (share.fb_redirect)) == null ? '' : __t) +
'\' class="iapp-share-button iapp-share-facebook iapp-share-popup" target="_blank"><img src="' +
((__t = (config.imageDir)) == null ? '' : __t) +
'facebook.svg" alt="Facebook share"></a>\n';

}
return __p
};

this["templates"]["template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>' +
((__t = (test)) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

  return this["templates"];

});