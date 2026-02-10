sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("databindingaggregationbindingsample.controller.View1", {
            onInit: function () {
                /* LIST REFERENCE */
                let oCompanyList = this.byId("companyList");

                /* CREATE AN OBJECT LIST TEMPLATE */
                let oUIControl = sap.m.ObjectListItem({
                    title: "{Carrname}",
                    type: "Active"
                })

                /* ADD ATTRIBUTES TO THE LIST */
                oUIControl.addAttribute(new sap.m.ObjectAttribute({ text: "{Url}" }))
                oUIControl.addAttribute(new sap.m.ObjectAttribute({ text: "{Currcode}" }))

                /* IMPLEMENTS AGGREGATION SETTING USED SERVICE ODATA AND USES CREATED OBJECT LIST TEMPLATE */
                oCompanyList.bindAggregation("items", "/ScarrSet", oUIControl)
            }
        })
    })