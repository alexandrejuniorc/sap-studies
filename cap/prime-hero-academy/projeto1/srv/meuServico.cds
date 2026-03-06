using sap.cap.escola as my from '../db/Estudantes';
using from '../app/services';

/**
 * SERVIÇO: exportSRV
 *
 * DESCRIÇÃO:
 * Serviço principal para gerenciamento de dados de Estudantes, exposto no caminho '/visualizar'.
 * Implementa operações CRUD segregadas através de entidades especializadas, garantindo
 * controle granular de permissões e separação de responsabilidades.
 *
 * ============================================================================
 * ANNOTATIONS DE RESTRIÇÃO DE OPERAÇÕES:
 * ============================================================================
 *
 * @readonly (Somente Leitura)
 * - Permite apenas operações de consulta (GET)
 * - Bloqueia: CREATE, UPDATE, DELETE
 * - Uso: Proteção de dados sensíveis, APIs públicas, relatórios
 *
 * @updateonly (Somente Atualização)
 * - Permite apenas modificação de registros existentes (PATCH/PUT)
 * - Bloqueia: CREATE, DELETE, GET (consultas devem usar outra entidade)
 * - Uso: Endpoints de edição isolados, fluxos de atualização controlados
 *
 * @insertonly (Somente Inserção)
 * - Permite apenas criação de novos registros (POST)
 * - Bloqueia: UPDATE, DELETE, GET
 * - Uso: Formulários de cadastro, importação de dados, logs imutáveis
 *
 * @deleteonly (Somente Exclusão)
 * - Permite apenas remoção de registros (DELETE)
 * - Bloqueia: CREATE, UPDATE, GET
 * - Uso: Endpoints de limpeza, remoção em lote, segregação de permissões
 *
 * ============================================================================
 * CONCEITO: PROJEÇÕES (as projection on)
 * ============================================================================
 *
 * Uma projeção é uma visualização customizada de uma entidade base que permite:
 * - Selecionar campos específicos
 * - Criar campos calculados
 * - Aplicar filtros padrão
 * - Herdar estrutura da entidade original (my.Estudantes)
 *
 * Benefícios:
 * - Reutilização da mesma entidade base com diferentes propósitos
 * - Controle fino de exposição de dados
 * - Manutenção centralizada do modelo de dados
 *
 * ============================================================================
 * ENTIDADES EXPOSTAS:
 * ============================================================================
 */
service exportSRV @(path: 'visualizar') {

  /**
   * GET de Estudantes
   * Endpoint: GET /visualizar/GetEstudantes
   * Operação: Consulta todos os estudantes
   */
  @readonly
  entity GetEstudantes   as projection on my.Estudantes;

  /**
   * UPDATE de Estudante
   * Endpoint: PATCH/PUT /visualizar/UpdateEstudante(ID)
   * Operação: Atualiza dados de estudante existente
   */
  @updateonly
  entity UpdateEstudante as projection on my.Estudantes;

  /**
   * INSERT de Estudante
   * Endpoint: POST /visualizar/InsertEstudante
   * Operação: Cria novo registro de estudante
   */
  @insertonly
  entity InsertEstudante as projection on my.Estudantes;

  /**
   * DELETE de Estudante
   * Endpoint: DELETE /visualizar/DeleteEstudante(ID)
   * Operação: Remove estudante do sistema
   */
  @deleteonly
  entity DeleteEstudante as projection on my.Estudantes;

}

/**
 * EXTENSÃO DO SERVIÇO: Visualizar Estudantes
 *
 * DESCRIÇÃO:
 * Estende o serviço "exportSRV" adicionando a entidade "Visualizar", que fornece uma
 * projeção customizada da tabela de Estudantes com campos otimizados para leitura e
 * apresentação de dados.
 *
 * CARACTERÍSTICAS:
 * - @readonly: A entidade é somente leitura, protegendo os dados contra modificações
 * - Projeção: Usa todos os campos da entidade Estudantes (*)
 * - Campo Calculado: Cria um campo "full_name" concatenando first_name e last_name
 * - Exclusões: Remove o campo "created_at" da resposta
 *
 * CASOS DE USO:
 * - Consultar lista completa de estudantes com nomes formatados
 * - APIs de visualização pública sem exposição de timestamps internos
 * - Relatórios e dashboards de estudantes
 *
 * EXEMPLO DE RESPOSTA:
 * [
 *   {
 *     ID: 1,
 *     first_name: "João",
 *     last_name: "Silva",
 *     full_name: "João Silva",
 *     email: "joao@example.com",
 *     ... (outros campos exceto created_at)
 *   }
 * ]
 */
extend service exportSRV with {
  @readonly
  entity Visualizar as
    projection on my.Estudantes {
      *,
      first_name || ' ' || last_name as full_name : String
    }
    excluding {
      created_at
    }

}
