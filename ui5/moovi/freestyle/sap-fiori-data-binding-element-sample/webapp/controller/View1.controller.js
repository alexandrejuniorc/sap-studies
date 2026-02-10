sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("databindingelementsample.controller.View1", {
            onInit: function () {
                let vLayout2 = this.byId('verticalLayout2')
                vLayout2.bindElement("companyModel>/ScarrSet");
            }
        });
    });
