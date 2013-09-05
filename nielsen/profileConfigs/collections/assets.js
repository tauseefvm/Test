var _ = require('underscore'),
    extend = require('deep-extend');

exports.collectionConfig = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        collConfig = extend({}, require(common + '/profileConfigs/collections/assets.js').collectionConfig);

    return collConfig;
}