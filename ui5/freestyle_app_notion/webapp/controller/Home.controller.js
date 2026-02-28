sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("studies.freestyleappnotion.controller.Home", {
      onInit() {},

      onItemPress(oEvent) {
        const oItem = oEvent.getParameter("listItem");
        MessageToast.show(
          `O item clicado '${oItem.getTitle()}' possui ${oItem.getCounter()} itens`,
        );
      },
    });
  },
);
