const exportSRV = function (srv) {
  srv.on("evento", (req) => {
    return `Hello ${req.data.msg}`;
  });
};

module.exports = exportSRV;
