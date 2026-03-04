const constante = "constante";

module.exports = function (srv) {
  srv.on("evento", (req) => {
    if (req.data.msg === "teste") {
      console.log("Esta mensagem foi apenas um teste!");
    } else {
      console.log("Esta mensagem não é um teste!");
    }
    return "Hello " + req.data.msg;
  });
};
