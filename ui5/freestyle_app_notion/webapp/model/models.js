sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  function (JSONModel, Device) {
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

      getProducts: async function () {
        const model = new JSONModel();
        await model.loadData("/model/produtos.json");

        // Simulate a delay to demonstrate the loading state in the UI
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        return model.getData();
      },
    };
  },
);
