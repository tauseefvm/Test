

exports.collectionConfig = function(common){
    return {
        opportunities: require("./opportunities.js").collectionConfig(common),
        contacts:require("./contacts.js").collectionConfig(common),
        tasks : require("./tasks.js").collectionConfig(common)
    };
}
