sap.ui.define(
  ["moovi/sapfioridatanavigationsample/controller/BaseController"],
  function (Controller) {
    "use strict";

    return Controller.extend(
      "moovi.sapfioridatanavigationsample.controller.View1",
      {
        onInit: function () {},

        onListItemPress: function (oEvent) {
          var oItem, oCtx;

          oItem = oEvent.getSource();
          oCtx = oItem.getBindingContext();

          this.getRouter().navTo("RouteCompanyDetail", {
            carrId: oCtx.getProperty("Carrid"),
          });
        },

        onBtnCreatePress: function (oEvent) {
          this.getRouter().navTo("RouteCompanyDetail", {
            carrId: "New",
          });
        },
      },
    );
  },
);
