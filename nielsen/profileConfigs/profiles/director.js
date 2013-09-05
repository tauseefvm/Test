var extend = require('deep-extend');


exports.profileCreater = function(common){
    var directorProfileCreater = require(common + '/profileConfigs/profiles/director.js').profileCreater;
    function creater(collectionConfig) {

        var directorProfile = extend({}, directorProfileCreater(collectionConfig));


        return directorProfile;
    }
    return creater;
}