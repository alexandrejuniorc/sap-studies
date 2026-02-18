sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "connectorsample/connection/connector",
  ],
  function (JSONModel, Device, Connector) {
    "use strict";

    return {
      /**
       * Provides runtime information for the device the UI5 app is running on as a JSONModel.
       * @returns {sap.ui.model.json.JSONModel} The device model.
       */
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },

      getAirlines: function () {
        return Connector.read({ sModelName: "main", sPath: "/ScarrSet" });
      },
    };
  },
);
