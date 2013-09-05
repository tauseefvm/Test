var extend = require('deep-extend'),
    _ = require('underscore');


exports.profileCreater = function(common){

    var salesRepProfileCreater = require(common + '/profileConfigs/profiles/salesRep.js').profileCreater;

    function creater(collectionConfig) {

        var salesRepProfile = extend({}, salesRepProfileCreater(collectionConfig));

        return salesRepProfile;
    }

    return creater;
}
