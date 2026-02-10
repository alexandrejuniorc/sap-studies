sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend(
    "sapfioridatanavigationsample.controller.CompanyDetail",
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
    },
  );
});
