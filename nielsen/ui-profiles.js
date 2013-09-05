var _ = require('underscore');
var extend = require("deep-extend");

exports.data = function(common){
    var currentProfilesConfig = require("./profileConfigs").profileCreaters;
    var defaultProfilesConfig = require(common + "/profileConfigs").profileCreaters;
    currentProfilesConfig  = extend({},defaultProfilesConfig,currentProfilesConfig);
    var currentCollectionConfig = require("./ui-collections").data(common);
    var profiles = [];
    _.each(currentProfilesConfig, function(pc) {
        var profile = pc(currentCollectionConfig);
        profiles.push(profile);

    });
    return profiles;
}
