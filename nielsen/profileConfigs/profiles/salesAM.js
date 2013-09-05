var extend = require('deep-extend'),
    _ = require('underscore');

exports.profileCreater = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        salesAMProfileCreater = require(common + '/profileConfigs/profiles/salesAM.js').profileCreater;

    function creater(collectionConfig) {

        var salesAMProfile = extend({}, salesAMProfileCreater(collectionConfig));

        return salesAMProfile;
    }

    return creater;
}
