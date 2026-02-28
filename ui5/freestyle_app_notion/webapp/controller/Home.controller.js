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
            { nome: "Arroz", quantidade: 5, categoria: "Alimentos" },
            { nome: "Feijão", quantidade: 0, categoria: "Alimentos" },
            { nome: "Macarrão", quantidade: 8, categoria: "Alimentos" },
            { nome: "Óleo de Cozinha", quantidade: 3, categoria: "Higiene" },
            { nome: "Leite", quantidade: 0, categoria: "Alimentos" },
            { nome: "Café", quantidade: 4, categoria: "Alimentos" },
            { nome: "Açúcar", quantidade: 6, categoria: "Alimentos" },
            { nome: "Sal", quantidade: 2, categoria: "Alimentos" },
            { nome: "Farinha de Trigo", quantidade: 9, categoria: "Alimentos" },
            { nome: "Sabonete", quantidade: 11, categoria: "Higiene" },
            { nome: "Detergente", quantidade: 5, categoria: "Higiene" },
            { nome: "Papel Higiênico", quantidade: 12, categoria: "Higiene" },
            { nome: "Shampoo", quantidade: 0, categoria: "Higiene" },
            { nome: "Condicionador", quantidade: 6, categoria: "Higiene" },
            { nome: "Creme Dental", quantidade: 8, categoria: "Higiene" },
          ],
        };

        const oModel = new JSONModel(data);
        this.getView().setModel(oModel, "productsModel");
      },

      onItemPress(oEvent) {
        const oItem = oEvent.getParameter("listItem"); // <- Pegue o componenente do Item
        const oContext = oItem.getBindingContext("productsModel"); // <- nome da model bindada
        const oData = oContext.getObject(); // Retorna o objeto completo do JSON

        const hasItemInStock = oData.quantidade > 0;

        MessageToast.show(
          hasItemInStock
            ? `O item clicado '${oData.nome}' pertence à categoria ${oData.categoria} e está Disponível!`
            : `O item clicado '${oData.nome}' pertence à categoria ${oData.categoria} e está Indisponível!`,
        );
      },
    });
  },
);
