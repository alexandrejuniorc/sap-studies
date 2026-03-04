const cds = require("@sap/cds");
const constante = "constante";

module.exports = function (srv) {
  srv.on("READ", "evento", (req) => {
    /**
     * - cds.entities: Retorna um objeto que contém todas as entidades definidas no modelo de dados.
     *   "sap.cap.escola": Especifica o namespace e o nome da entidade que queremos acessar.
     *   No caso, estamos acessando a entidade "estudantes" dentro do namespace "sap.cap.escola".
     *
     * - SELECT.FROM: Realiza uma consulta SQL para selecionar dados da entidade especificada.
     */
    const estudantes = cds.entities("sap.cap.escola");
    let dados = SELECT.FROM(estudantes);

    return dados;
  });
};
