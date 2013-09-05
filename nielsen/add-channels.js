function createForecasts(helper, callback) {
    // Create the channel partner tenant
    var qrystring = require('querystring'),
        sys = require('util'),
        async = require('async'),
        RESELLER_NAME = 'A Plus Reseller',
        RESELLER_TENANT = 'aplusreseller',
        DISTRIBUTOR_NAME = 'ABC Distribution',
        DISTRIBUTOR_TENANT = 'abcdistribution',
        RESELLER_ADMIN = 're.sell@aplusreseller.com',
        DISTRIBUTOR_ADMIN = 'dis.tribute@abcdistribution.com',
        RESELLER_DATA = {
            "tenantName":"aplusreseller",
            "tenant":"A Plus Reseller",
            "teamName":"aPlusReseller",
            "template":{"name":"cpo-template"},
            "adminUser":RESELLER_ADMIN,
            "adminPassword":"welcome",
            "adminFirstName":"Re",
            "adminLastName":"Sell",
            "parentTeam":{"name" : "accountHeadTeam" },
            "parentRole":{"name" : "channelPartnerTeams" }
        },
        DISTRIBUTOR_DATA = {
            "tenantName":"abcdistribution",
            "tenant":"ABC Distribution",
            "teamName":"abcDistribution",
            "template":{"name":"cpo-template"},
            "adminUser":DISTRIBUTOR_ADMIN,
            "adminPassword":"welcome",
            "adminFirstName":"Dis",
            "adminLastName":"Tribute",
            "parentTeam":{"name" : "accountHeadTeam" },
            "parentRole":{"name" : "channelPartnerTeams" }
        },
        RESELLER_ADM_USER = 'adele.singh@aplusreseller.com',
        RESELLER_ADM_NAME = 'Adele Singh',
        RESELLER_ADM = {
            username : RESELLER_ADM_USER,
            password : 'passwordone',
            tenant : 'aplusreseller',
            profile : 'channelPartnerAdmin'
        },
        RESELLER_REP_USER = 'may.bee@aplusreseller.com',
        RESELLER_REP_NAME = 'May Bee',
        RESELLER_REP = {
            username : RESELLER_REP_USER,
            password : 'passwordone',
            tenant : 'aplusreseller',
            profile : 'resellerRep'
        },
        RESELLER_MGR_USER = 'henry.james@aplusreseller.com',
        RESELLER_MGR_NAME = 'Henry James',
        RESELLER_MGR = {
            username : RESELLER_MGR_USER,
            password : 'passwordone',
            tenant : 'aplusreseller',
            profile : 'resellerAM'
        },
        DIST_MGR_USER = 'chris.sullivan@abcdistribution.com',
        DIST_MGR_NAME = 'Chris Sullivan',
        DIST_MGR = {
            username : DIST_MGR_USER,
            password : 'passwordone',
            tenant : 'abcdistribution',
            profile : 'distributorAM'
        },
        DIST_REP_USER = 'max.munn@abcdistribution.com',
        DIST_REP_NAME = 'Max Munn',
        DIST_REP = {
            username : DIST_REP_USER,
            password : 'passwordone',
            tenant : 'abcdistribution',
            profile : 'distributorRep'
        },
        headers = helper.createRequestHeaders('bruce.lewis@juniper.com', 'passwordone', 'jci'),
        resellerHeaders = helper.createRequestHeaders(RESELLER_ADMIN, 'welcome', RESELLER_TENANT),
        distributorHeaders = helper.createRequestHeaders(DISTRIBUTOR_ADMIN, 'welcome', DISTRIBUTOR_TENANT),
        channelPartnerAdminHeaders = helper.createRequestHeaders(RESELLER_ADM_USER, 'welcome', DISTRIBUTOR_TENANT),
        reseller = null,
        distributor = null,
        resellerTeam = null,
        distTeam = null,
        resellerAdm = null,
        resellerRep = null,
        resellerAM = null,
        distAM = null,
        distRep = null,
        getResellerAdmin = function() { return resellerAdm; },
        getResellerRep = function() { return resellerRep; },
        getResellerAM = function() { return resellerAM; },
        getDistAM = function() { return distAM; },
        getDistRep = function() { return distRep; };
 
    function fetchOrgs(callback) {
        var url = '/rest/api/jci/core.contacts?query=',
            partnerOrgs = [ RESELLER_NAME, DISTRIBUTOR_NAME ],
            query = {
                filter : { name : { $in : partnerOrgs } }
            };
        helper.fetchData(url + qrystring.escape(JSON.stringify(query)), headers, function(err, response) {
            var data,
                prop = null,
                checkResult = function(result) {
                    var name = result && result.name;
                    if (name === RESELLER_NAME) {
                        reseller = result;
                    } else if (name === DISTRIBUTOR_NAME) {
                        distributor = result;
                    }
                };
            if (err) {
                sys.puts('Problem fetching reseller: ' + JSON.stringify(err));
            }
            try {
                data = JSON.parse(response);
                for (prop in data.data) {
                    if (data.data.hasOwnProperty(prop)) {
                        data.data[prop].forEach(checkResult);
                        break;
                    }
                }
            } catch (exc) {
                sys.puts('Response: ' + response);
                sys.puts('Failed to convert response: ' + JSON.stringify(exc));
            }
            callback();
        });
    }
    
    function fetchPersons(callback) {
        var url = '/rest/api/jci/core.contacts?query=',
            names = [ RESELLER_ADM_NAME, RESELLER_REP_NAME, RESELLER_MGR_NAME, DIST_MGR_NAME, DIST_REP_NAME ],
            query = {
                filter : {
                    type : 'core.contact/person',
                    displayName : { $in : names }
                }
            };
        helper.fetchData(url + qrystring.escape(JSON.stringify(query)), headers, function(err, response) {
            var data,
                prop = null,
                checkResult = function(result) {
                    var name = result && result.displayName;
                    if (name === RESELLER_ADM_NAME) {
                        resellerAdm = result;
                    } else if (name === RESELLER_REP_NAME) {
                        resellerRep = result;
                    } else if (name === RESELLER_MGR_NAME) {
                        resellerAM = result;
                    } else if (name === DIST_MGR_NAME) {
                        distAM = result;
                    } else if (name === DIST_REP_NAME) {
                        distRep = result;
                    }
                };
            if (err) {
                sys.puts('Problem fetching persons: ' + JSON.stringify(err));
            }
            try {
                data = JSON.parse(response);
                for (prop in data.data) {
                    if (data.data.hasOwnProperty(prop)) {
                        data.data[prop].forEach(checkResult);
                        break;
                    }
                }
            } catch (exc) {
                sys.puts('Response: ' + response);
                sys.puts('Failed to convert response: ' + JSON.stringify(exc));
            }
            callback();
        });
    }
    
    function createTenant(tenant, data) {
        return function(callback) {
            var url = '/rest/api/jci/core.contacts::createChannelTenant',
                channelPartner = (tenant === RESELLER_TENANT ? reseller : distributor);
            if (!channelPartner) {
                callback();
                return;
            }
            data.organization = channelPartner;
            helper.postData(url, headers, JSON.stringify(data), function(err, response) {
                var responseData;
                if (err) {
                    sys.puts('Problem creating tenant: ' + JSON.stringify(err));
                }
                try {
                    responseData = JSON.parse(response);
                    if (!responseData.success) {
                        sys.puts('Unsuccessful at creating channel tenant');
                        sys.puts('Data: ' + JSON.stringify(data));
                        sys.puts('Response: ' + response);
                    }
                } catch (exc) {
                    sys.puts('Response: ' + response);
                    sys.puts('Failed to convert response: ' + JSON.stringify(exc));
                }
                callback();
            });
        };
    }
    
    function createUsers(personFunc, member) {
        return function(callback) {
           var person = personFunc(),
                url = '/rest/api/jci/core.contacts/' + person._id + '::addChannelMember';
            helper.postData(url, headers, JSON.stringify(member), function(err, response) {
                var data;
                if (err) {
                    sys.puts('Problem creating users: ' + JSON.stringify(err));
                }
                if (response) {
                    data = JSON.parse(response);
                    if (!data.success && data.messages) {
                        sys.puts('Error creating users: ' + JSON.stringify(data.messages));
                    }
                }
                callback();
            });
        };
    }
    
    function fetchTeam(tenant, partnerHeaders) {
        return function(callback) {
            var url = '/rest/api/' + tenant + '/core.teams';
            helper.fetchData(url, partnerHeaders, function(err, response) {
                var data,
                    prop = null;
                if (err) {
                    sys.puts('Problem fetching team: ' + JSON.stringify(err));
                } else {
                    try {
                        data = JSON.parse(response);
                        for (prop in data.data) {
                            if (data.data.hasOwnProperty(prop)) {
                                if (tenant === RESELLER_TENANT) {
                                    resellerTeam = data.data[prop][0];
                                } else {
                                    distTeam = data.data[prop][0];
                                }
                                break;
                            }
                        }
                    } catch (exc) {
                        sys.puts('Response: ' + response);
                        sys.puts('Failed to convert response: ' + JSON.stringify(exc));
                    }
                }
                callback();
            });
        };
    }
    
    function updateTeam(tenant, memberFunc, role, partnerHeaders) {
        return function(callback) {
            var isReseller = (tenant === RESELLER_TENANT),
                team = (isReseller ? resellerTeam : distTeam);
            if (!team || (isReseller && (!resellerRep || !resellerAM)) || (!isReseller && !distAM)) {
                callback();
                return;
            }
            
            var url = '/rest/api/' + tenant + '/core.teams/' + team._id + '::addMember',
                member = memberFunc(),
                input = { member : member._id, role : role };
            
            helper.postData(url, partnerHeaders, JSON.stringify(input), function(err, response) {
                if (err) {
                    sys.puts('Problem updating team: ' + JSON.stringify(err));
                }
                callback();
            });
        };
    }
    
    function generatePolicies(tenant, partnerHeaders) {
        return function(callback) {
            var url = '/rest/api/' + tenant + '/core.contacts::generatepolicies';
            helper.postData(url, partnerHeaders, '{}', function(err, response) {
                var data;
                if (err) {
                    sys.puts('Problem generating policies: ' + JSON.stringify(err));
                }
                if (response) {
                    data = JSON.parse(response);
                    if (!data.success && data.messages) {
                        sys.puts('Error generating policies: ' + JSON.stringify(data.messages));
                    }
                }
                callback();
            });
        };
    }
    
    function refreshAcl(callback) {
        var url = '/rest/api/jci/refreshacl';
        helper.postData(url, headers, '{}', function(err, response) {
            var data;
            if (err) {
                sys.puts('Problem refreshing ACLs: ' + JSON.stringify(err));
            }
            if (response) {
                data = JSON.parse(response);
                if (!data.success && data.messages) {
                    sys.puts('Error refreshing ACLs: ' + JSON.stringify(data.messages));
                }
            }
            callback();
        });
    }
    
    var funcs = [ fetchOrgs, createTenant(RESELLER_TENANT, RESELLER_DATA),  fetchPersons,
                  createTenant(DISTRIBUTOR_TENANT, DISTRIBUTOR_DATA),
                  createUsers(getResellerAdmin, RESELLER_ADM),
                  createUsers(getResellerRep, RESELLER_REP),
                  createUsers(getResellerAM, RESELLER_MGR),
                  createUsers(getDistRep, DIST_REP),
                  createUsers(getDistAM, DIST_MGR),
                  fetchTeam(RESELLER_TENANT, resellerHeaders),
                  fetchTeam(DISTRIBUTOR_TENANT, distributorHeaders),
                  updateTeam(RESELLER_TENANT, getResellerAdmin, 'channelPartnerAdmin', resellerHeaders),
                  updateTeam(RESELLER_TENANT, getResellerAdmin, 'channelPartnerAdmin', channelPartnerAdminHeaders),
                  updateTeam(RESELLER_TENANT, getResellerRep, 'resellerRep', resellerHeaders),
                  updateTeam(RESELLER_TENANT, getResellerAM, 'resellerAM', resellerHeaders),
                  updateTeam(DISTRIBUTOR_TENANT, getDistRep, 'distributorRep', distributorHeaders),
                  updateTeam(DISTRIBUTOR_TENANT, getDistAM, 'distributorAM', distributorHeaders),
                  generatePolicies(RESELLER_TENANT, resellerHeaders),
                  generatePolicies(DISTRIBUTOR_TENANT, distributorHeaders),
                  refreshAcl ];
    async.series(funcs, function() {
        callback();
    });
}

exports.script = createForecasts;
