var _ = require('underscore');
var tenantCollectionsConfig = require("./tenant-config/collections");
var extend = require("deep-extend");


exports.data = function(common){
    var currentConfig = require("./profileConfigs/collections").collectionConfig(common);
    var defaultConfig = require(common + "/profileConfigs/collections").collectionConfig;
    var tenantHelper = require("../../tools/tenantHelper.js");
    currentConfig = extend({},defaultConfig,currentConfig);


    _.each(currentConfig,function(collectionConfig,label){
        tenantHelper.checkCollectionConfig(collectionConfig,label,tenantCollectionsConfig);
    });

    return currentConfig;
}