sap.ui.define(
  [
    "moovi/sapfioridatanavigationsample/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  function (Controller, MessageToast, MessageBox) {
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
            path: "/ScarrSet('" + oArgs.carrId + "')",
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

        // FUNÇÃO PARA SALVAR AS ALTERAÇÕES FEITAS NA TELA DE DETALHE DA EMPRESA,
        // ONDE O MODELO É SUBMETIDO E AS FUNÇÕES DE SUCESSO E ERRO SÃO DEFINIDAS
        onBtnSavePress: function (oEvent) {
          var oModel = this.getView().getModel();

          oModel.submitChanges({
            success: this.handleSuccessSave.bind(this),
            error: this.handleSaveError.bind(this),
          });
        },

        // FUNÇÃO DE SUCESSO PARA O SALVAMENTO DAS ALTERAÇÕES NA TELA DE DETALHE DA EMPRESA,
        // ONDE UMA MENSAGEM DE SUCESSO É EXIBIDA AO USUÁRIO
        handleSuccessSave: function (oRes, oData) {
          var oModel = this.getView().getModel();

          if (oRes.__batchResponses) {
            var status = parseInt(oRes.__batchResponses[0].response.statusCode);

            if (status >= 400) {
              var oResponseBody = JSON.parse(
                oRes.__batchResponses[0].response.body,
              );
              MessageBox.alert(
                "Error ao Salvar. ERRO: " + oResponseBody.error.message.value,
              );
              oModel.resetChanges();
              oModel.refresh();
            } else {
              MessageToast.show("Salvo com Sucesso!");
              this.onNavBack();
            }
          } else if (oRes.__batchResponses[0].__changeResponses) {
            var aChangeRes = oRes.__batchResponses[0].__changeResponses;
            var status = parseInt(aChangeRes[0].statusCode);

            if (status >= 400) {
              MessageBox.alert("Erro ao salvar os dados.");
              oModel.resetChanges();
              oModel.refresh();
            } else {
              MessageToast.show("Salvo com Sucesso!");
              this.onNavBack();
            }
          } else {
            MessageToast.show("Salvo com Sucesso!");
            this.onNavBack();
          }
        },

        // FUNÇÃO DE ERRO PARA O SALVAMENTO DAS ALTERAÇÕES NA TELA DE DETALHE DA EMPRESA,
        // ONDE UMA MENSAGEM DE ERRO É EXIBIDA AO USUÁRIO
        handleSaveError: function (oError) {
          if (oError) {
            if (oError.responseText) {
              var oErrorMessage = JSON.parse(oError.responseText);
              MessageBox.alert(oErrorMessage.error.message.value);
            }
          }
        },
      },
    );
  },
);
