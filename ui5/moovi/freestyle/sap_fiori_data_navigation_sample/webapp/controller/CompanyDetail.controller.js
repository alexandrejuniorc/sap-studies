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
          // OBTÉM OS PARÂMETROS DA ROTA, ONDE O ID DA EMPRESA É EXTRAÍDO PARA REALIZAR A VINCULAÇÃO DO MODELO COM O REGISTRO CORRESPONDENTE
          var oArgs = oEvent.getParameter("arguments");
          // OBTÉM A VISÃO ATUAL PARA REALIZAR A VINCULAÇÃO DO MODELO COM O REGISTRO CORRESPONDENTE AO ID DA EMPRESA PASSADO COMO PAR
          var oView = this.getView();

          // VERIFICA SE O ID DA EMPRESA PASSADO COMO PARÂMETRO É "New", CASO SEJA,
          // A FUNÇÃO DE INICIALIZAÇÃO DE UMA NOVA EMPRESA É CHAMADA, CASO CONTRÁRIO,
          // A VINCULAÇÃO DO MODELO É REALIZADA COM O REGISTRO CORRESPONDENTE AO ID DA EMPRESA
          if (oArgs.carrId === "New") {
            this._initNewCompany();
            return;
          }

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

        // FUNÇÃO PARA INICIALIZAR UMA NOVA EMPRESA, ONDE UM NOVO REGISTRO É CRIADO NO MODELO E VINCULADO AO CONTEXTO DA VISÃO
        _initNewCompany: function () {
          var oView = this.getView();
          var oModel = oView.getModel();

          // DESVINCULA QUALQUER VINCULAÇÃO ANTERIOR DO CONTEXTO DA VISÃO, GARANTINDO QUE A TELA ESTEJA PRONTA PARA VINCULAR O NOVO REGISTRO CRIADO
          oView.unbindElement();

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

          // VINCULA O CONTEXTO DA VISÃO AO NOVO REGISTRO CRIADO, PERMITINDO QUE OS DADOS SEJAM EDITADOS NA TELA DE DETALHE DA EMPRESA
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
          var oBatchResponse = oRes.__batchResponses;

          // GUARD: Verifica se a resposta do batch é válida e contém pelo menos uma resposta, caso contrário, exibe uma mensagem de sucesso e navega de volta para a tela anterior
          if (!oBatchResponse || !oBatchResponse[0]) {
            MessageToast.show("Salvo com Sucesso!");
            this.onNavBack();
            return;
          }

          var oFirstResponse = oBatchResponse[0];

          // Guard: resposta com status code direto (sem __changeResponses),
          // onde o status code é verificado para determinar se houve um erro ou se o salvamento foi bem-sucedido
          if (oFirstResponse.response && oFirstResponse.response.statusCode) {
            var iDirectStatus = parseInt(oFirstResponse.response.statusCode);

            if (iDirectStatus >= 400) {
              var oResponseBody = JSON.parse(oFirstResponse.response.body);
              MessageBox.alert(
                "Erro ao Salvar: " + oResponseBody.error.message.value,
              );
              oModel.resetChanges();
              oModel.refresh();
              return;
            }

            MessageToast.show("Salvo com Sucesso!");
            this.onNavBack();
            return;
          }

          // Guard: resposta com __changeResponses,
          // onde o status code da primeira mudança é verificado para determinar se houve um erro ou se o salvamento foi bem-sucedido
          if (
            oFirstResponse.__changeResponses &&
            oFirstResponse.__changeResponses.length > 0
          ) {
            var iChangeStatus = parseInt(
              oFirstResponse.__changeResponses[0].statusCode,
            );

            if (iChangeStatus >= 400) {
              MessageBox.alert("Erro ao salvar os dados.");
              oModel.resetChanges();
              oModel.refresh();
              return;
            }

            MessageToast.show("Salvo com Sucesso!");
            this.onNavBack();
            return;
          }

          MessageToast.show("Salvo com Sucesso!");
          this.onNavBack();
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

        onBtnDeletePress: function (oEvent) {
          var oView = this.getView();
          var oModel = oView.getModel();
          var oContext = oView.getBindingContext();

          MessageBox.confirm("O registro será excluído. Deseja continuar?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.OK) {
                oModel.remove(oContext.getPath(), {
                  success: this.handleSuccessDelete.bind(this),
                  error: this.handleErrorDelete.bind(this),
                });
              }
            }.bind(this),
          });
        },

        handleSuccessDelete: function (oRes) {
          MessageToast.show("Registro excluído com sucesso!");
          this.onNavBack();
        },

        handleErrorDelete: function (oError) {
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
