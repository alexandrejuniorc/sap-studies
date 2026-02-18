sap.ui.define(["sap/ui/model/odata/v2/ODataModel"], function (ODataModel) {
  "use strict";

  // Função genérica de retry para operações assíncronas
  const connectionRetry = function (attempts, secTimeout, fn) {
    return new Promise((resolve, reject) => {
      const recurse = (attemptsLeft) => {
        const promise = fn();

        promise.then(resolve).catch((error) => {
          if (!attemptsLeft) {
            return reject(error);
          }

          setTimeout(() => {
            console.log(
              `Request Error, attempt ${attempts - attemptsLeft + 1}...`,
            );
            recurse(attemptsLeft - 1);
          }, secTimeout * 1000);
        });
      };

      recurse(attempts);
    });
  };

  // Versão do connectionRetry com 3 tentativas e 2 segundos de timeout
  const connectionRetryDefault = connectionRetry.bind({}, 3, 2);

  return {
    connectionRetry,
    connectionRetryDefault,
    // Propriedades privadas do connector
    _oDataModel: null,
    // Referência ao componente para acessar modelos e outras funcionalidades do SAPUI5
    _oComponent: null,
    // URL do serviço OData, que pode ser configurada no manifest.json do componente
    _oDataServiceURL: "",

    init: function (oComponent) {
      this._oComponent = oComponent;
      this._oDataServiceURL = oComponent
        .getManifestObject()
        .resolveUri("mainService");
      this._oDataModel = new ODataModel(this._oDataServiceURL);
    },

    getOwnerComponent: function () {
      return this._oComponent;
    },

    getODataModel: function (sModelName) {
      // Se sModelName for fornecido, pega do componente
      // Senão, usa o modelo padrão do connector
      if (sModelName) {
        return this.getOwnerComponent().getModel(sModelName);
      }
      return this._oDataModel;
    },

    _oDataBindingList: function (sModelName, sPath, oContext, oURLParams) {
      return this.getODataModel(sModelName).bindList(
        sPath,
        oContext,
        null,
        null,
        oURLParams,
      );
    },

    // Leitura com retry
    read: async function ({ sModelName, sPath, oURLParams, oContext }) {
      return this.connectionRetryDefault(() => {
        return new Promise((resolve, reject) => {
          this.getODataModel(sModelName).read(sPath, {
            urlParameters: oURLParams,
            context: oContext,
            success: (oData) => resolve(oData.results || oData),
            error: (oError) => reject(oError),
          });
        });
      });
    },

    // Criar dados (SEM retry)
    create: async function ({
      sModelName,
      oData,
      sPath,
      oContext,
      bSkipRefresh = false,
    }) {
      return new Promise((resolve, reject) => {
        this.getODataModel(sModelName).create(sPath, oData, {
          context: oContext,
          success: (oEntity) => resolve(oEntity),
          error: (oError) => reject(oError),
        });
      });
    },

    // Atualizar dados (SEM retry)
    update: async function ({
      sModelName,
      oChangedData,
      sPath,
      sID,
      oContext,
    }) {
      const sFullPath = `${sPath}(${sID})`;

      return new Promise((resolve, reject) => {
        this.getODataModel(sModelName).update(sFullPath, oChangedData, {
          context: oContext,
          success: (oEntity) => resolve(oEntity),
          error: (oError) => reject(oError),
        });
      });
    },

    // Deletar dados (SEM retry)
    delete: async function ({ sModelName, sPath, sID, oContext }) {
      const sFullPath = `${sPath}(${sID})`;

      return new Promise((resolve, reject) => {
        this.getODataModel(sModelName).remove(sFullPath, {
          context: oContext,
          success: () => resolve(),
          error: (oError) => reject(oError),
        });
      });
    },
  };
});
