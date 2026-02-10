sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    // Controller, Filter e FilterOperator são módulos do SAPUI5 
    // que facilitam a manipulação e aplicação de filtros em modelos de dados.
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("datafiltersample.controller.View1", {
            onInit: function () {

            },
            onFilterCompanies: function (oEvent) {
                var aFilters = []
                var sQuery = oEvent.getParameters("query")

                if (sQuery) {
                    aFilters.push(new Filter("Carrid", FilterOperator.EQ, sQuery))
                }

                let oListCompany = this.byId("companyList");
                let oBinding = oListCompany.getBinding("items")

                oBinding.filter(aFilters)
            }
        });
    });
