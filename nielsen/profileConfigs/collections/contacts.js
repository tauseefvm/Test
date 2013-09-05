var _ = require('underscore');
var extend = require('deep-extend');

exports.collectionConfig = function(common){
	var util = require(common + '/profileConfigs/util/util.js').util;
	var commonContactsConfig = require(common+ "/profileConfigs/collections/contacts.js").collectionConfig;
	var collConfig = extend({},commonContactsConfig);
	/*All the changes for contacts should be placed here*/
	var summaryGridAdditionalColumns = [{
        header : 'CustomerHealth', // CHECK OK
        path : 'extensions.tenant.CustomerHealth.value.displayName',
        width : "110px",
        fixed : true,
        resizable : false
    }];

    //collConfig.summary.grid.manualFilterOptions = collConfig.summary.grid.manualFilterOptions.concat(summaryGridAdditionalFacets);
    //collConfig.summary.grid.colModel[collConfig.summary.grid.colModel.length - 1].resizable = true;
    collConfig.summary.grid.colModel = collConfig.summary.grid.colModel.concat(summaryGridAdditionalColumns);


	//collConfig.summary.grid.colModel = collConfig.summary.grid.colModel.concat(summaryGridAdditionalColumns);
	return collConfig;
}