using sap.cap.escola as my from '../db/Estudantes';
using from '../app/services';

service exportSRV {
  // function evento(msg: String) returns String;

  /*
  * - @readonly = significa que a entidade é somente leitura, ou seja, não pode ser modificada através deste serviço.
  *   Isso é útil para garantir a integridade dos dados e evitar alterações acidentais ou não autorizadas.
  *
  * - @as projection = indica que a entidade "Estudantes" é uma projeção da entidade "Estudantes" definida no namespace "my".
  *   Uma projeção é uma visão personalizada de uma entidade, permitindo que você selecione apenas os campos necessários ou aplique filtros específicos.
  *   Neste caso, a projeção "Estudantes" no serviço "mostrar" é baseada na entidade "Estudantes" do namespace "my", o que significa que ela herda a estrutura e os dados da entidade original,
  *   mas pode ser configurada para exibir apenas um subconjunto dos campos ou aplicar regras específicas de acesso.
  *  */

  @readonly
  entity GetEstudantes    as projection on my.Estudantes;


  @updateonly
  entity UpdateEstudantes as projection on my.Estudantes;
}
