
vvar Permissions = function createPermissions() {
    var self = this;
    self.permissions = [];
    self.get = function() {
        return self.permissions;
    };

    self.create = function(collection, actions, condition, related) {
        actions = Array.isArray(actions) ? actions : [actions];
        var permission = {
            resource: {name: collection, type: 'core.lookup'},
            actions: actions.map(function(name) {
                return {
                    type: 'core.lookup', name: name
                }
            }),
            relatedResourceAccess: related || [],
            type: 'core.role.permission',
            condition: condition
        };
        if (related) permission.relatedResourceAccess = related;
        self.permissions.push(permission);
        return self;
    }
};
Permissions.new = function() {return new Permissions;};

var Role = function createRole(name, displayName, profile) {
    var self = this;
    self.name = name;
    self.displayName = displayName;
    self.members = [];
    self.membersHash = {};
    self.profile = profile;
    self.permissions = [];
    self.setPermissions = function(permissions) {
        self.permissions = self.permissions.concat(permissions || []);
        return self;
    };
    self.addMembers = function(members, isTeam) {
        members = Array.isArray(members) ? members : [members];
        members.forEach(function(member) {
            if (self.membersHash[member]) return;
            self.membersHash[member] = true;
            var memberRelationship = {
                relation:{
                    name: isTeam ? 'memberTeam' : 'memberPerson'
                },
                type:'core.relationship',
                target:{
                    type: isTeam ? 'core.team' : 'core.contact/person',
                    schemeId:{ name:'csvLoad' }
                }
            };
            if (member === '*') memberRelationship.target.key = '*'
            else memberRelationship.target.id = member;
            self.members.push(memberRelationship);
        });
        return self;
    };
    self.get = function() {
        var role = {
            name: self.name,
            displayName: self.displayName || self.name,
            permissions: self.permissions,
            members: self.members
        }
        if (self.profile) role.uiProfile = self.profile;
        return role;
    }
};
Role.new = function(name, displayName, profile) {return new Role(name, displayName, profile)};

var Team = function createTeam(name, displayName, admins, rootTeam) {
    var self = this;
    self.name = name;
    self.admins = Array.isArray(admins) ? admins : [admins];
    self.displayName = displayName;
    self.roles = [];
    self.rolesHash = {};
    self.rootTeam = rootTeam;
    self.availablePermissions = [];
    self.createRole = function(name, displayName, profile) {
        if (self.rolesHash[name]) return self.rolesHash[name];
        var role = Role.new(name, displayName, profile);
        role.done = function() {return self};
        self.rolesHash[name] = role;
        self.roles.push(role);
        return role;
    };
    self.setAvailablePermissions = function(collection, actions) {
        actions = Array.isArray(actions) ? actions : [actions];
        var permission = {
            resource: {type: 'core.lookup', name: collection},
            actions: actions.map(function(action) {return {type: 'core.lookup', name: action}})
        };
        self.availablePermissions.push(permission);
        return self;
    }
    self.get = function() {
        var team = {
            type: 'core.team',
            name: self.name,
            displayName: self.displayName,
            roles: self.roles.map(function(role) {return role.get()}),
            relationships: self.admins.map(function(admin) {
                return {
                    relation : { type: 'core.lookup', name : 'teamAdmin' },
                    target : {
                        id : admin,
                        type : 'core.contact/person',
                        schemeId : { name : 'csvLoad' }
                    }
                }
            }),
        }
        if (self.availablePermissions.length) team.availablePermissions = self.availablePermissions;
        if (self.rootTeam) team.rootTeam = true;
        return team;
    }
};

Team.new = function(name, displayName, admins, rootTeam) {return new Team(name, displayName, admins, rootTeam)};

var permissions = {
    salesOpsRep: Permissions.new()
        .create('app.opportunities', 'read', 'return {};')
        .create('app.opportunities', ['update', 'create'], 'return true;')
        .create('app.offers', ['read'], 'return {};')
        .create('app.offers', ['update', 'create', 'delete'], 'return true;')
        .create('core.contacts', ['read'], 'return {};')
        .get(),
    salesOpsAM: Permissions.new()
        .create('app.opportunities', 'read', 'return {};')
        .create('app.opportunities', ['update', 'create', 'delete'], 'return true;')
        .create('app.offers', ['read'], 'return {};')
        .create('app.offers', ['update', 'create', 'delete'], 'return true;')
        .create('core.contacts', ['read'], 'return {};')
        .get(),
    executive: Permissions.new()
        .create('app.opportunities', 'read', 'return {};')
        .create('app.offers', ['read'], 'return {};')
        .create('app.offers', ['update', 'create', 'delete'], 'return true;')
        .create('core.contacts', ['read'], 'return {};')
        .get(),
    subTeams: Permissions.new()
        .create('app.opportunities', 'read', 'return { $relation : { name : "assignedTeam" , targets : { key : team._id.toString() } } };')
        .create('app.opportunities', ['update', 'delete'], "var allowAccess=false;var rels=resource.relationships;" +
                                                           "for(var i = 0; i < rels.length; i++) { " +
                                                           "var relationship = rels[i];" +
                                                           "if(relationship.relation.name==='assignedTeam' && " +
                                                           "relationship.target.type==='core.team' && " +
                                                           "relationship.target.key===team._id.toString()){allowAccess=true;}}" +
                                                           "return allowAccess;")
        .create('app.opportunities', 'create', 'return true;')
        .create('app.offers', ['read'], 'return {};')
        .create('app.offers', ['update', 'create', 'delete'], 'return true;')
        .create('core.contacts', ['read'], 'return {};')
        .get(),
    salesRep: Permissions.new()
        .create('app.opportunities', 'read', 'return { $relation : { name : "salesRep" , targets : { key : person._id.toString() } } };')
        .create('app.opportunities', ['update', 'create'], 'return true;')
        .create('app.opportunities', 'delete', "var allowAccess=false,rels=resource.relationships;" +
                                               "for(var i=0;i<rels.length;i++)" +
                                               "{if(rels[i] && rels[i].relation.name==='salesRep' && " +
                                               "rels[i].target.type==='core.contact/person' " +
                                               "&& rels[i].target.key===person._id.toString())" +
                                               "{allowAccess=true}};return allowAccess;")
        .create('app.offers', ['read'], 'return {};')
        .create('app.offers', ['update', 'create', 'delete'], 'return true;')
        .create('core.contacts', ['read'], 'return {};')
        .get(),
    channelPartnerTeams: Permissions.new()
        .create('app.opportunities', 'read', 'var personRels=person.relationships, orgId = null;'
                                            +"for (i=0; i < personRels.length; i++) { rel = personRels[i]; "
                                            +"if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}"
                                            +"if (!orgId) { return { type : 1}; }"
                                            +'return { $or : [ { "relationships.incumbentReseller.targets.key" : orgId },'
                                            +'{ "relationships.incumbentDistributor.targets.key" : orgId } ] };'
                                           , [
            {
                source : 'app.opportunity',
                anchor : true,
                relations : [
                    {
                        target : 'core.contact/organization',
                        name : 'customer',
                        accessible : true,
                        relations : [
                            {
                                target : 'core.contact/person',
                                name : 'primaryContact',
                                accessible : true
                            }
                        ]
                    },
                    {
                        target : 'app.quote',
                        name : 'primaryQuote',
                        accessible : true
                    },
                    {
                        target : 'app.quote',
                        name : 'quote',
                        accessible : true
                    },
                    {
                        target : 'app.booking/sales',
                        name : 'booking',
                        accessible : true
                    }
                ]
            }
        ])
        .create('app.opportunities', ['update', 'delete'], "var allowAccess=false, i, rel, name, key; " +
                                                            "var rels=resource.relationships; var personRels=person.relationships;" +
                                                            "var orgId = null;" +
                                                            "for (i=0; i < personRels.length; i++) { rel = personRels[i]; "+
                                                            "if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}" +
                                                            "if (!orgId) { return false; }" +
                                                            "for(i = 0; i < rels.length; i++) { rel = rels[i]; name = rel.relation.name; " +
                                                            "key = rel.target && rel.target.key; " +
                                                            "if((name==='distributor' || name==='reseller' || name==='incumbentDistributor' " +
                                                            "|| name==='incumbentReseller') && key === orgId) {allowAccess=true;}} " +
                                                            "return allowAccess;")
        .create('app.opportunities', 'create', 'return true;')
        .create('app.offers', ['read'], 'var personRels=person.relationships, orgId = null;'
                                        +"for (i=0; i < personRels.length; i++) { rel = personRels[i]; "
                                        +"if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}"
                                        +"if (!orgId) { return { type : 1}; }"
                                        + 'return { $or : [ { "relationships.incumbentReseller.targets.key" : orgId },'
                                        +'{ "relationships.incumbentDistributor.targets.key" : orgId } ] };',
            [{
                source : 'app.offer',
                anchor : true,
                relations : [
                    {
                        target : 'app.asset/service',
                        name : 'predecessor',
                        accessible : true
                    }
                ]
            }]
        )
        .create('app.offers', ['update', 'delete'], "var allowAccess=false, i, rel, name, key; " +
                                                    "var rels=resource.relationships; var personRels=person.relationships;" +
                                                    "var orgId = null;" +
                                                    "for (i=0; i < personRels.length; i++) { rel = personRels[i]; "+
                                                    "if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}" +
                                                    "if (!orgId) { return false; }" +
                                                    "for(i = 0; i < rels.length; i++) { rel = rels[i]; name = rel.relation.name; " +
                                                    "key = rel.target && rel.target.key; " +
                                                    "if((name==='distributor' || name==='reseller' || name==='incumbentDistributor' " +
                                                    "|| name==='incumbentReseller') && key === orgId) {allowAccess=true;}} " +
                                                    "return allowAccess;")
        .create('app.offers', 'create', 'return true;')
        .create('core.contacts', ['read'], 'var personRels=person.relationships, orgId = null;'
                                            +"for (i=0; i < personRels.length; i++) { rel = personRels[i]; "
                                            +"if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}"
                                            +"if (!orgId) { return { type : 1}; }"
                                            +'return { $relation : { name : "company" , targets : { key : orgId } } };')
        .get(),
    teamAdmin: Permissions.new()
        .create('core.teams', 'read', 'return {};')
        .create('core.teams', 'create', 'return person.superUser;')
        .create('core.teams', ['update', 'delete'], "var allowAccess=false;var rels=resource.relationships;" +
                                                    "for(var i = 0; i < rels.length; i++) { var relationship = rels[i];" +
                                                    "if(relationship.relation.name==='teamAdmin' && " +
                                                    "relationship.target.type==='core.contact/person' && " +
                                                    "relationship.target.key===person._id.toString()){allowAccess=true;}}" +
                                                    "return allowAccess;")
        .create('core.contacts', 'read', 'var personRels=person.relationships, orgId = null;'
                                        +"for (i=0; i < personRels.length; i++) { rel = personRels[i]; "
                                        +"if (rel.relation.name === 'company') { orgId = rel.target && rel.target.key; }}"
                                        +"if (!orgId) { return { type : 1}; }"
                                        + 'return { $relation : { name : "company" , targets : { key : orgId } } };')
        .get()
};

var accountHeadTeam = Team.new('accountHeadTeam', 'Account Head', 'bruce.lewis@nielsen.com', true)
    .createRole('teamAdmin', 'Team Administrator')
        .addMembers('*')
        .setPermissions(permissions.teamAdmin)
        .done()
    .createRole('salesOpsRep', 'Sales Operations Rep', 'salesOpsRep')
        .addMembers(['ryan.thompson@nielsen.com', 'barbara.hobbs@nielsen.com'])
        .setPermissions(permissions.salesOpsRep)
        .done()
    .createRole('salesOpsAM', 'Sales Operations Account Manager', 'salesOpsAM')
        .addMembers('maria.gomez@nielsen.com')
        .setPermissions(permissions.salesOpsAM)
        .done()
    .createRole('executive', 'Executive', 'executive')
        .addMembers('betty.johnson@nielsen.com')
        .setPermissions(permissions.executive)
        .done()
    .createRole('dataAnalyst', 'Data Analyst', 'dataAnalyst')
        .addMembers('bill.moor@nielsen.com')
        .setPermissions(permissions.salesOpsAM)
        .done()
    .createRole('oemSysAdmin', 'OEM System Administrator', 'sysAdmin')
        .addMembers('bruce.lewis@nielsen.com')
        .setPermissions(permissions.salesOpsAM)
        .done()
    .createRole('subTeams', 'Sub teams')
        .addMembers(['team1', 'nielsenSSITeam'], true)
        .setPermissions(permissions.subTeams)
        .done()
    .createRole('channelPartnerTeams', 'Channel Partners')
        .addMembers('spglobalTeam', true)
        .setPermissions(permissions.channelPartnerTeams)
        .done()
    .setAvailablePermissions('app.opportunities', ['read', 'create', 'update', 'delete'])
    .setAvailablePermissions('app.offers', ['read', 'create', 'update', 'delete'])
    .setAvailablePermissions('core.contacts', ['read'])
    .setAvailablePermissions('core.teams', ['read', 'create', 'update', 'delete'])
    .get();

var team1 = Team.new('team1', 'Team 1', 'bruce.lewis@nielsen.com')
    .createRole('salesRep', 'Members', 'salesRep')
        .addMembers(['alex.may@nielsen.com', 'jerry.lee@nielsen.com', 'betty.haines@nielsen.com'])
        .setPermissions(permissions.salesRep)
        .done()
    .createRole('salesAM', 'Inside Sales Account Manager', 'salesAM')
        .addMembers('erin.hagens@nielsen.com')
        .setPermissions(permissions.salesOpsAM)
        .done()
    .get();

var nielsenSSITeam = Team.new('nielsenSSITeam', 'SSI Team', 'bruce.lewis@nielsen.com').get();
nielsenSSITeam.referenceRemoteTeam = 'ssitenant/nielsenSSITeam';
nielsenSSITeam.relationships.push({
    relation : { name : 'remoteProxy' },
    target : {
        id : 'bill.malone@nielsen.com',
        type : 'core.contact/person',
        schemeId : { name : 'csvLoad' }
    }
});

var CPOTeam = Team.new('spglobalTeam', 'SP Global Team', 'bruce.lewis@nielsen.com').get();
CPOTeam.referenceRemoteTeam = 'spglobal/spglobalTeam';
CPOTeam.relationships.push({
    relation : { name : 'remoteProxy' },
    target : {
        id : 'bob.gage@nielsen.com',
        type : 'core.contact/person',
        schemeId : { name : 'csvLoad' }
    }
});

exports.data = [accountHeadTeam, team1, nielsenSSITeam, CPOTeam];
