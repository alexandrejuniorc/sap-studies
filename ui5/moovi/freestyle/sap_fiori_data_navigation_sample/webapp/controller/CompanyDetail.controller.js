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

          // VERIFICA SE O ID DA EMPRESA PASSADO COMO PARÂMETRO É DIFERENTE DE "New",
          // CASO SEJA, A VINCULAÇÃO DO MODELO É REALIZADA COM O REGISTRO CORRESPONDENTE AO ID DA EMPRESA,
          // CASO CONTRÁRIO, A FUNÇÃO DE INICIALIZAÇÃO DE UMA NOVA EMPRESA É CHAMADA
          if (oArgs.carrId !== "New") {
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
          } else {
            this._initNewCompany();
          }
        },

        // FUNÇÃO PARA VERIFICAR SE HÁ DADOS VINCULADOS AO CONTEXTO DA VISÃO, CASO CONTRÁRIO, EXIBE UMA TELA DE "NÃO ENCONTRADO"
        _onBindingChange: function () {
          // No data for the binding
          if (!this.getView().getBindingContext()) {
            this.getRouter().getTargets().display("TargetNotFound");
          }
        },

        // FUNÇÃO PARA INICIALIZAR UMA NOVA EMPRESA, ONDE UM NOVO REGISTRO É CRIADO NO MODELO E VINCULADO AO CONTEXTO DA VISÃO
        _initNewCompany: function () {
          var oModel = this.getView().getModel();

          // CONFIGURA O MODELO PARA USAR GRUPOS DE MUDANÇA DIFERIDOS,
          // ONDE AS MUDANÇAS SÃO AGRUPADAS EM UM GRUPO DE MUDANÇA ESPECÍFICO PARA CRIAÇÃO DE REGISTROS
          oModel.setDeferredGroups(["creategroupId"]);

          // CONFIGURA O MODELO PARA USAR O GRUPO DE MUDANÇA ESPECÍFICO PARA CRIAÇÃO DE REGISTROS NA ENTIDADE "ScarrSet"
          oModel.setChangeGroups({
            ScarrSet: {
              groupId: "creategroupId",
              changeSetId: "ID",
            },
          });

          // CRIA UM NOVO REGISTRO NO MODELO PARA A ENTIDADE "ScarrSet" E VINCULA O CONTEXTO DA VISÃO AO NOVO REGISTRO CRIADO
          var oContext = oModel.createEntry("/ScarrSet", {
            groupId: "creategroupId",
            properties: {},
          });

          // OBTÉM A VISÃO ATUAL E VINCULA O CONTEXTO DA VISÃO AO NOVO REGISTRO CRIADO,
          // PERMITINDO QUE OS DADOS SEJAM EDITADOS NA TELA DE DETALHE DA EMPRESA
          var oView = this.getView();

          // VINCULA O CONTEXTO DA VISÃO AO NOVO REGISTRO CRIADO, PERMITINDO QUE OS DADOS SEJAM EDITADOS NA TELA DE DETALHE DA EMPRESA
          // oView.setBindingContext(oContext.getPath());
          oView.setBindingContext(oContext);
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
            var status = parseInt(
              oRes.__batchResponses[0].__changeResponses[0].statusCode,
            );

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
