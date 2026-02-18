sap.ui.define(["sap/ui/core/mvc/Controller"], function (BaseController) {
  "use strict";

  return BaseController.extend("connectorsample.controller.BaseController", {
    refreshModel: function (oData, sModelName) {
      this.getView().getModel(sModelName).setData(oData);
    },
  });
});
