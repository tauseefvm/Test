var extend = require('deep-extend'),
    _ = require('underscore');


exports.profileCreater = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        sysAdminProfileCreater = require(common + '/profileConfigs/profiles/sysAdmin.js').profileCreater;

    function creater(collectionConfig) {
        var sysAdminProfile = extend({}, sysAdminProfileCreater(collectionConfig));

        return sysAdminProfile;
    }

    return creater;
}