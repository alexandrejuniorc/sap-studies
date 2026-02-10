sap.ui.define([], function () {
    'use strict';

    return {
        setIconStatusFltime: function (Fltime) {
            if (Fltime < 300) {
                return 'sap-icon://message-success';
            }
            if (Fltime < 600) {
                return 'sap-icon://alert';
            }
            if (Fltime > 600) {
                return 'sap-icon://error';
            }
        }
    }
});