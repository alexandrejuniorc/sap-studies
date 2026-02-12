sap.ui.define(
  ["moovi/sapfioridatanavigationsample/controller/BaseController"],
  function (Controller) {
    "use strict";

    return Controller.extend(
      "moovi.sapfioridatanavigationsample.controller.CompanyDetail",
      {
        // INICIALIZAÇÃO DO CONTROLADOR, ONDE O EVENTO DE NAVEGAÇÃO PARA A TELA DE DETALHE DA EMPRESA É REGISTRADO
        onInit: function () {
          var oRouter = this.getRouter();
          oRouter
            .getRoute("RouteCompanyDetail")
            .attachMatched(this.onRouteMatched, this);
        },

        // EVENTO DE NAVEGAÇÃO PARA A TELA DE DETALHE DA EMPRESA, ONDE O ID DA EMPRESA É PASSADO COMO PARÂMETRO NA URL
        onRouteMatched: function (oEvent) {
          var oArgs, oView;

          oArgs = oEvent.getParameter("arguments");
          oView = this.getView();

          oView.bindElement({
            path: "/ScarrSet('" + oArgs.companyId + "')",
            events: {
              change: this._onBindingChange.bind(this),
              dataRequested: function () {
                oView.setBusy(true);
              },
              dataReceived: function () {
                oView.setBusy(false);
              },
            },
          });
        },

        // FUNÇÃO PARA VERIFICAR SE HÁ DADOS VINCULADOS AO CONTEXTO DA VISÃO, CASO CONTRÁRIO, EXIBE UMA TELA DE "NÃO ENCONTRADO"
        _onBindingChange: function () {
          // No data for the binding
          if (!this.getView().getBindingContext()) {
            this.getRouter().getTargets().display("TargetNotFound");
          }
        },
      },
    );
  },
);
