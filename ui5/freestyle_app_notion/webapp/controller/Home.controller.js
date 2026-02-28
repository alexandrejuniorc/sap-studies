sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("studies.freestyleappnotion.controller.Home", {
      onInit() {
        const data = {
          produtos: [
            { nome: "Arroz", quantidade: 5 },
            { nome: "Feijão", quantidade: 10 },
            { nome: "Macarrão", quantidade: 8 },
            { nome: "Óleo de Cozinha", quantidade: 3 },
            { nome: "Leite", quantidade: 7 },
            { nome: "Café", quantidade: 4 },
            { nome: "Açúcar", quantidade: 6 },
            { nome: "Sal", quantidade: 2 },
            { nome: "Farinha de Trigo", quantidade: 9 },
            { nome: "Sabonete", quantidade: 11 },
            { nome: "Detergente", quantidade: 5 },
            { nome: "Papel Higiênico", quantidade: 12 },
            { nome: "Shampoo", quantidade: 7 },
            { nome: "Condicionador", quantidade: 6 },
            { nome: "Creme Dental", quantidade: 8 },
          ],
        };

        const oModel = new JSONModel(data);
        this.getView().setModel(oModel, "productsModel");
      },

      onItemPress(oEvent) {
        const oItem = oEvent.getParameter("listItem");
        MessageToast.show(
          `O item clicado '${oItem.getTitle()}' possui ${oItem.getCounter()} itens`,
        );
      },
    });
  },
);
