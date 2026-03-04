const cds = require("@sap/cds");
const SELECT = require("@sap/cds/lib/ql/SELECT");

module.exports = function (srv) {
  srv.on("READ", "Estudantes", async (req) => {
    /**
     * - cds.entities: Retorna um objeto que contém todas as entidades definidas no modelo de dados.
     *   "sap.cap.escola": Especifica o namespace e o nome da entidade que queremos acessar.
     *   No caso, estamos acessando a entidade "estudantes" dentro do namespace "sap.cap.escola".
     *
     * - SELECT.FROM: Realiza uma consulta SQL para selecionar dados da entidade especificada.
     */

    let filtro = req.data;
    let limit = req.query.$top;
    let dados;

    try {
      const { Estudantes } = cds.entities("sap.cap.escola");

      if (filtro !== undefined) {
        dados = await SELECT.from(Estudantes).where(filtro).limit(limit);
      } else {
        dados = await SELECT.from(Estudantes).limit(limit);
      }

      return dados;
    } catch (error) {
      console.error("Erro ao ler os dados dos estudantes:", error);
      throw error;
    }
  });
};
