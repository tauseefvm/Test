var data = 
[
    {
        type : 'core.tenant.config',
        appDomain : 'opportunityGeneration',
        name : 'inputCriteria',
        displayName : 'Default Configuration',
        description : 'Default Opportunity Generation Configuration',
        configs : [
            {
                name : 'assetFilter',
                data : {
                    criteria : [
                        {
                            displayName : "Asset Type",
                            inputName : "filterByType",
                            inputType : "type",
                            defaultValue : "app.asset/service",
                            optional : true
                        },
                        {
                            displayName : "Associated Opportunity",
                            inputName : "filterByAssociatedOpportunity",
                            inputType : "boolean",
                            optional : true
                        },
                        {
                            displayName : "Expiration Date Beginning",
                            inputName : "filterByExpirationStartDate",
                            inputType : "date",
                            optional : true
                        },
                        {
                            displayName : "Expiration Date End",
                            inputName : "filterByExpirationEndDate",
                            inputType : "date",
                            optional : true
                        }
                    ],
                    libraryFunction : 'formatAssetFilter'
                }
            },
            {
                name : 'assetFilterMap',
                data : {
                    map : [{ key : 'app.asset', filter : '_id' },
                           { key : 'core.contact/organization', 
                             filter : 'relationships.customer.targets.key'
                           }]
                }
            },            
            {
                name : 'groupBy',
                data : {
                    criteria : [
                    {
                            name: 'customer',
                            displayName: 'Customer', 
                            group: 'relation',
                            optional : true,
                            active : true
                        },
                        {
                            name: "extensions.tenant.customerNumber.value",
                            displayName: 'Contract Number',
                            group: 'native',
                            optional : false,
                            active : true
                        }                        
                    ]
                }
            },
            {
                name : 'userInputs',
                data : {
                    inputs : [{ name : 'batchType', displayName : 'Batch Type', type : 'lookup' }, 
                              { name : 'targetPeriod', displayName : 'Target Selling Period', type : 'lookup', optional : true }, 
                              { name : 'businessLine', displayName : 'Business Line', type : 'lookup' }, 
                              { name : 'directChannel', displayName : 'Direct or Channel', type : 'lookup', optional : true }, 
                              { name : 'clientRegion', displayName : 'Region', type : 'lookup', optional : true }, 
                              { name : 'clientTerritory', displayName : 'Territory', type : 'lookup', optional : true }, 
                              { name : 'clientTheatre', displayName : 'Theatre', type : 'lookup', optional : true }, 
                              { name : 'country', displayName : 'Country', type : 'lookup', optional : true } ]
                }
            },
            {
                name : 'generateCriteria',
                data : {
                    copySpecs : [{ displayName: 'Tag', toPath: 'tags', value: 'tags', group: 'offer'},
                                 { displayName: 'Tag', toPath: 'tags', value: 'tags', group: 'opportunity'},
                                 { displayName: 'Contract Number', toPath: 'extensions.master.contractNumber', 
                                   fromPath: '$.extensions.master.contractNumber', group: 'opportunity'},
                                 { displayName: 'Contract Number', toPath: 'extensions.master.existingContractNumber', 
                                   fromPath: '$.extensions.master.contractNumber', group: 'offer'},
                                 { displayName: 'Batch Type', toPath: 'extensions.master.batchType', 
                                   value: 'extensions.master.batchType', isLookup : true, group: 'offer'},
                                 { displayName: 'Target Selling Period', toPath: 'extensions.master.targetPeriod', 
                                   value: 'extensions.master.targetPeriod', isLookup : true, group: 'offer'},
                                 { displayName: 'Target Selling Period', toPath: 'extensions.master.targetPeriod', 
                                   value: 'extensions.master.targetPeriod', isLookup : true, group: 'opportunity'},
                                 { displayName: 'Incumbent Distributor', toPath: 'relationships', 
                                   relationships: [{oldName:'distributor',newName:'incumbentDistributor'}], 
                                   group: 'opportunity'},
                                 { displayName: 'Incumbent Reseller', toPath: 'relationships', 
                                   relationships: [{oldName:'reseller',newName:'incumbentReseller'}], 
                                   group: 'opportunity'},
                                 { displayName: 'Relationships', toPath: 'relationships', 
                                   value: 'relationships', group: 'opportunity'},
                                {
                                    fromPath: '$.extensions.master.clientTheatre',
                                    toPath: 'extensions.master.clientTheatre',
                                    group: 'opportunity',
                                    isLookup: true
                                },
                                {
                                    fromPath: '$.extensions.master.clientRegion',
                                    toPath: 'extensions.master.clientRegion',
                                    group: 'opportunity',
                                    isLookup: true
                                },
                                {
                                    fromPath: '$.extensions.master.clientTerritory',
                                    toPath: 'extensions.master.clientTerritory',
                                    group: 'opportunity',
                                    isLookup: true
                                },
                                {
                                    fromPath: '$.extensions.master.country',
                                    toPath: 'extensions.master.country',
                                    group: 'opportunity',
                                    isLookup: true
                                },
                                 { displayName: 'Business Line', toPath: 'extensions.master.businessLine', 
                                   value: 'extensions.master.businessLine', isLookup : true, group: 'opportunity'},
                                 { displayName: 'Channel', toPath: 'extensions.master.directChannel', 
                                   value: 'extensions.master.directChannel', isLookup : true, group: 'opportunity'},
                                 { displayName: 'Commit Level', toPath: 'commitLevel',
                                   value: 'extensions.master.commitLevel.value', isLookup : true, group: 'opportunity'}
                    ]
                }
            }
        ]
    }
];

exports.data = data;
