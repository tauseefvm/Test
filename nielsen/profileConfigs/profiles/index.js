var _ = require('underscore'),
    extend = require('deep-extend'),
    sys = require("sys");

exports.profileCreaters = function(common){

    return  {
        dataAnalyst : require("./dataAnalyst").profileCreater(common),
        executive : require("./executive").profileCreater(common),
        salesAM : require("./salesAM").profileCreater(common),
        salesRep : require("./salesRep").profileCreater(common),
        sysAdmin : require("./sysAdmin").profileCreater(common)
    };
}
