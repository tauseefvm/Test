var _ = require('underscore');
var extend = require('deep-extend');

exports.collectionConfig = function(common){
    var commonOpportunitiesConfig = require(common + "/profileConfigs/collections/opportunities.js").collectionConfig;
    var collConfig = extend({},commonOpportunitiesConfig);

    return collConfig;
}
