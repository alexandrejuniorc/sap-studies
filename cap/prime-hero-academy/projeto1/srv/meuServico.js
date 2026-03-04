const cds = require("@sap/cds");
const SELECT = require("@sap/cds/lib/ql/SELECT");

module.exports = function (srv) {
  /**
   * - srv.on: Registra um manipulador de eventos para a operação "READ" na entidade "Estudantes".
   *   Isso significa que sempre que uma solicitação de leitura for feita para a entidade "Estudantes",
   *   a função assíncrona fornecida será executada.
   */
  srv.on("READ", "GetEstudantes", async (req) => {
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

  /**
   *  - srv.after: Registra um manipulador de eventos para a operação "READ" na entidade "Estudantes" que será executado após a leitura dos dados.
   */
  srv.after("READ", "GetEstudantes", async (data) => {
    return data.map((d) => {
      console.log(d);
    });
  });

  /**
   * - srv.on: Registra um manipulador de eventos para a operação "UPDATE" na entidade "UpdateEstudantes".
   *   Isso significa que sempre que uma solicitação de atualização for feita para a entidade "UpdateEstudantes",
   *   a função assíncrona fornecida será executada.
   *
   * - A função assíncrona é um espaço reservado para a lógica de atualização dos dados dos estudantes.
   *   Você pode implementar a lógica necessária para atualizar os registros dos estudantes com base nos dados recebidos na solicitação.
   *   Por exemplo, você pode usar o método UPDATE do CDS para atualizar os registros na entidade "Estudantes" com os dados fornecidos.
   *   Certifique-se de lidar com erros e validar os dados conforme necessário para garantir a integridade dos dados.
   */
  srv.on("UPDATE", "UpdateEstudantes", async (req) => {});
};
