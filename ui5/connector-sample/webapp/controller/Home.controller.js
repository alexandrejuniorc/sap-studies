sap.ui.define(
  [
    "connectorsample/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "connectorsample/model/models",
  ],
  function (Controller, JSONModel, Models) {
    "use strict";

    return Controller.extend("connectorsample.controller.Home", {
      onInit: function () {
        const oRequestedObject = Models.getAirlines();

        console.log({ oRequestedObject });

        oRequestedObject
          .then((aData) => {
            const oModel = new JSONModel(aData);
            this.getView().setModel(oModel, "airlines");
          })
          .catch((error) => console.log(error.message));
      },
    });
  },
);
