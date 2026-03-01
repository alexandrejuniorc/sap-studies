sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "studies/freestyleappnotion/model/models",
  ],
  (Controller, MessageToast, JSONModel, Models) => {
    "use strict";

    return Controller.extend("studies.freestyleappnotion.controller.Home", {
      async onInit() {
        await this._fetchInitialData();
      },

      async _fetchInitialData() {
        await this.getView().setBusy(true);

        Models.getProducts()
          .then((data) => {
            const oModel = new JSONModel(data);
            this.getView().setModel(oModel, "productsModel");
          })
          .finally(() => {
            this.getView().setBusy(false);
          });
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

      onFiltrarProdutos(oEvent) {
        const sQuery = oEvent.getParameter("newValue");
        const oList = this.byId("listaProdutos");
        const oBinding = oList.getBinding("items");

        let aFiltros = [];
        if (sQuery) {
          aFiltros.push(
            new sap.ui.model.Filter(
              "nome",
              sap.ui.model.FilterOperator.Contains,
              sQuery,
            ),
          );
        }

        oBinding.filter(aFiltros);
      },

      criarCabecalhoGrupo: function (oGroup) {
        return new sap.m.GroupHeaderListItem({
          title: oGroup.key,
          upperCase: false,
        });
      },
    });
  },
);
