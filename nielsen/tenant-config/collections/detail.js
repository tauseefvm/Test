module.exports={
	"contacts": {
        "templateDef": "{{tmpl($data) \"header-template\"}}    <div class=\"widget_duplo-form-details-form\">    <div class =\"widget_iform-left-column\">    <div class =\"widget_iform widget_iform-column-padding\">    <ul>\t    {{if subType && subType.indexOf(\"person\") != -1}} \t    <li><label>First Name</label> {{html firstName}} </li>\t    <li><label>Last Name</label> {{html lastName}} </li>    <li><label>Organization</label> {{html company}}</li>\t    <li> \t    <label for=\"jobTitle\">Title</label> \t    {{html jobTitle}} \t    </li> \t    <li> \t    <label for=\"role\">Role</label> \t    {{html role}} \t    </li> \t    <li> \t    <label for=\"department\">Department</label> \t    {{html department}} \t    </li> \t    {{/if}} \t    {{if subType && subType.indexOf(\"organization\") != -1}} \t    {{if !id }} \t    <li><label>Name</label> {{html orgName}}\t    {{/if}} \t    <li> \t    <label for=\"website\">Website</label> \t    {{html website}} \t    </li> \t <li>    <label>Customer Health</label>    {{html CustomerHealth}}    </li> <li>    <label>Last Updated Health Date</label>    {{html Lastupdatedhealthdate}}    </li> <li>    <label>Health Reason Code</label>    {{html Healthreasoncode}}    </li>      {{/if}} \t    <li><label>Preferred Language</label>    {{html preferredLanguage}}    </li>    <li><label>Reseller Tier</label>    {{html resellerTier}}    </li>    </ul>    </div>    </div>    <div class =\"widget_iform-center-column\"></div>    <div class =\"widget_iform-right-column\">    <div class =\"widget_iform widget_iform-column-padding\">    {{html relationships}}\t    <ul> \t    <li> \t    <label for=\"emailAddresses\">Email</label> \t    {{html emailAddresses}} \t    </li> \t    <li> \t    <label for=\"phones\">Phone</label> \t    {{html phones}} \t    </li> \t    {{if subType && subType.indexOf(\"person\") != -1}} \t    <li>         <label for=\"doNotContact\">Communication Preference</label> \t    {{html communicationPreference}} \t    </li>    <li> \t    <label for=\"doNotContact\">Do Not Contact</label> \t    {{html doNotContact}} \t    </li> \t    {{/if}}    <li>    <label>Industry</label>    {{html industry}}    </li>    <!--additional fields-->\t    </ul>    <!--externalIds-widget-->\t    <!--extensions-widget-->    </div>    </div>    </div>    {{if systemProperties && systemProperties.createdOn }}    <div style=\"clear: both;width:100%\">{{html subTabs}}</div>    {{/if}}    ",
        "templateVars": {
            "add": [
                {
                    "path": "extensions.tenant.CustomerHealth.value",
                    "label": "Customer Health",
                    "fieldID": "CustomerHealth",
                    "config": {
                        "generator": "menuGenerator",
                        "generatorData": "CustomerHealth",
                        "allowEdit": true,
                        "enumPath": "extensions.tenant.CustomerHealth",
                        "schema": "core.contact",
                        "useNames": true
                    },
                    "selectedClass": ""
                },
                {
                    "path": "extensions.tenant.Lastupdatedhealthdate.value",
                    "label": "Last Updated Health Date",
                    "fieldID": "Lastupdatedhealthdate",
                    "config": {
                        "generator": "dateWidgetGenerator",
                        "format": "date",
                        "formatData": "shortDate",
                        "allowEdit": true
                    },
                    "selectedClass": ""
                },
                {
                    "path": "extensions.tenant.Healthreasoncode.value",
                    "label": "Health Reason Code",
                    "fieldID": "Healthreasoncode",
                    "config": {
                        "generator": "menuGenerator",
                        "generatorData": "Healthreasoncode",
                        "allowEdit": true,
                        "enumPath": "extensions.tenant.Healthreasoncode",
                        "schema": "core.contact",
                        "useNames": true
                    },
                    "selectedClass": ""
                }
            ],
            "update": [],
            "remove": []
        }
    }
}


