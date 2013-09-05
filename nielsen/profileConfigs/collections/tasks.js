var _ = require('underscore'),
    extend = require('deep-extend');


exports.collectionConfig = function(common){
    var util = require(common + '/profileConfigs/util/util.js').util,
        collConfig = extend({}, require(common + '/profileConfigs/collections/tasks.js').collectionConfig);

    if(collConfig.summary && collConfig.summary.grid && collConfig.summary.grid.actionBarOptions) {
        _.each(collConfig.summary.grid.actionBarOptions,function(action) {
            if(action.name == "New") {
                if(!action.params){
                    action.params = [];
                }
                action.params.push({
                    name : "reloadGrid",
                    value : true
                });
                console.log("TASK UPDATED");
                return false;
            }
        })
    }

    return collConfig;
}
