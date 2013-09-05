var DataSources = {
    Tenant : {
        name : 'nielsen',
        displayName : 'Nielsen',
        currency : 'usd',
        locale : 'en_US',
        ownerOrganization : 'Nielsen',
        type : 'oem'
    },
    AuthActions : {
        file : 'auth-actions.csv',
        collection : 'core.auth.actions',
        preload : true
    },
    CurrencyRates : {
        file : 'currency-rates.js',
        type : 'JSON',
        collection : 'core.currency.rates',
        preload : true
    },
    LookupConfigs : {
        file : 'lookup-configs.csv',
        collection : 'core.lookup.configs',
        preload : true
    },
    TenantConfigs : {
        file : 'tenant-configs.js',
        type : 'JSON',
        collection : 'core.tenant.configs',
        preload : true
    },
    Extensions : {
        file : 'extension-attributes.csv,client-extension-attributes.csv',
        collection : 'core.extension.attributes'
    },
    CoreLookups : {
        file : 'core-lookups.csv,variant-core-lookups.csv',
        collection : 'core.lookups',
        postProcess : 'fetchAdmin'
    },
    Rules : {
        file : 'rules.csv',
        collection : 'core.rules'
    },
    Relationships : {
        file : 'relationship-types.csv',
        collection : 'core.relationship.types'
    },
    AppLookups : {
        file : 'app-lookups.csv,variant-app-lookups.csv',
        collection : 'app.lookups'
    },
    Members : {
        file : 'members.csv',
        collection : 'core.memberships'
    },
    Addresses : {
        file : 'addresses.csv',
        collection : 'core.addresses',
        postload : true
    },
    Persons : {
        file : 'persons.csv',
        collection : 'core.contacts',
        postload : true
    },
    Metrics : {
        file : 'metrics.js',
        type : 'JSON',
        collection : 'app.metrics'
    },
    TargetConfigs : {
        file : 'target-configs.js',
        type : 'JSON',
        collection : 'app.target.configs'
    },
    TargetDataCSV : {
        file : 'target.data.csv',
        collection : 'app.target.data',
        postload: true
    },
    UIAccessRights : {
        file : 'ui-access-rights.csv',
        collection : 'core.metadata.ui.accessrights'
    },
    UIProfiles : {
        file : 'ui-profiles.js',
        type : 'JSON',
        collection : 'core.metadata.ui.profiles'
    },
    Teams : {
        file : 'team.js',
        type : 'JSON',
        collection : 'core.teams',
        postload : true
        //postProcess : 'teamReferenceUpdate'
    },
    Tasks : {
        file : 'tasks.csv',
        collection : 'app.tasks',
        postload : true
    },
    ProgramActions : {
        file : 'flow-actions.csv',
        owner : 'ann.beebe@jci.com',
        collection : 'core.flow.actions'
    },
    ProgramTemplates : {
        file : 'flow-templates.js',type : 'JSON',
        owner : 'ann.beebe@jci.com',
        collection : 'core.flows'
    },
    Programs : {
        file : 'flow-assignments.csv',
        owner : 'ann.beebe@jci.com',
        collection : 'core.flows',
        postProcess : 'startFlows'
    },
/*
    Assignments : {
        file: 'assignments.js', type: 'JSON',
        collection : 'app.assignments',
        postProcess: 'startAssignments'
    },
*/
    DQConfigs : {
        file: 'dataload.config.js', type: 'JSON',
        collection : 'app.dataload.configs'
    },
    Organizations : {
        file : 'organizations.csv',
        collection : 'core.contacts',
        postload : true
    },
    Products : {
        file : 'products.csv',
        collection : 'app.products',
        postload : true
    },
    CoveredAssets : {
        file : 'covered-assets.csv',
        collection : 'app.assets',
        postload : true
    },
    ServiceAssets : {
        file : 'service-assets.csv',
        collection : 'app.assets',
        postload : true
    },
    Offers : {
        collection : 'app.offers',
        file : 'offers1.csv',
        postload : true
    },
    Bookings : {
        file : 'bookings.csv',
        collection : 'app.bookings',
        postload : true
    },
    Quotes : {
        file : 'quotes.csv',
        collection : 'app.quotes',
        postload : true
    },
    Opportunities : {
        collection : 'app.opportunities',
        file : 'opportunities.csv',
        postload : true
    },
    Dashboards : {
        collection : 'app.dashboards',
        file : 'dashboards.csv'
    }
};
exports.sources = DataSources;
exports.baseDate = new Date(); // Use current date to avoid shift of dates
exports.loadForecasts = true;
