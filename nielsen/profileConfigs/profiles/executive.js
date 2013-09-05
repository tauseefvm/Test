var extend = require('deep-extend'),
    _ = require('underscore');

exports.profileCreater = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        executiveProfileCreater = require(common + '/profileConfigs/profiles/executive.js').profileCreater;

    function creater(collectionConfig) {
        var executiveProfile = extend({}, executiveProfileCreater(collectionConfig));

        return executiveProfile;
    }

    return creater;
}
