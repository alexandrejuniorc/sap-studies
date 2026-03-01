sap.ui.define([], function () {
  "use strict";

  return {
    formatarPreco: function (valor) {
      if (!valor) return "R$ 0,00";
      return "R$ " + valor.toFixed(2).replace(".", ",");
    },

    traduzirStatus: function (sStatus) {
      const mapa = {
        ACTIVE: "Ativo",
        OUT_OF_STOCK: "Fora de estoque",
        PENDING: "Pendente",
      };
      return mapa[sStatus] || "Desconhecido";
    },

    corStatus: function (sStatus) {
      const mapa = {
        ACTIVE: "Success",
        OUT_OF_STOCK: "Error",
        PENDING: "Warning",
      };
      return mapa[sStatus] || "None";
    },

    visivelSeDisponivel: function (disponivel) {
      return !!disponivel;
    },

    visivelSeTemEstoque: function (quantidade) {
      return quantidade > 0;
    },
  };
});
