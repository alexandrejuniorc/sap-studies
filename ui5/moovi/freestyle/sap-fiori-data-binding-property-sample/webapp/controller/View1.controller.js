sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("databindingpropertysample.controller.View1", {
            onInit: function () {
                /* GET REFERENCE FROM INPUT WITH ID "companyInput2" */
                let oCompanyInput2 = this.byId("companyInput2");

                /* SET VALUE TO THE INPUT with the value from the model */
                oCompanyInput2.bindProperty("value", "companyModel>/ScarrSet/Carrname")
            }
        });
    });
