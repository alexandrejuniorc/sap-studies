/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "connectorsample/model/models",
    "connectorsample/connection/connector",
  ],
  function (UIComponent, Device, models, Connector) {
    "use strict";

    return UIComponent.extend("connectorsample.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        Connector.init(this);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },
    });
  },
);
