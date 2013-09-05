var extend = require('deep-extend'),
    _ = require('underscore');


exports.profileCreater = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        dataAnalystProfileCreater = require(common + '/profileConfigs/profiles/dataAnalyst.js').profileCreater;

    function creater(collectionConfig) {
        var dataAnalystProfile = extend({}, dataAnalystProfileCreater(collectionConfig));

        return dataAnalystProfile;
    }

    return creater;
}
