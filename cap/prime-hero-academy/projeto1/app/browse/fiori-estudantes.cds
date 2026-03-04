using sap.cap.escola as my from '../../db/Estudantes';

/**
 *  - @UI: Esta anotação é usada para fornecer informações de interface do usuário (UI) para a entidade "Estudantes".
 *  Ela é parte do SAP Fiori Elements, que é um conjunto de diretrizes e ferramentas para criar interfaces de usuário consistentes e responsivas em aplicativos SAP.
 *
 *  - Annotate: A palavra-chave "annotate" é usada para aplicar anotações a uma entidade ou elemento específico.
 *  Neste caso, estamos aplicando a anotação @UI à entidade "Estudantes" do namespace "my".
 *
 *  - SelectionFields: Esta anotação define os campos que serão usados como critérios de seleção ao consultar a entidade "Estudantes".
 *  No exemplo, os campos "first_name" e "email" foram especificados como campos de seleção.
 *  Isso significa que, ao realizar consultas ou operações de filtragem na entidade "Estudantes",
 *  esses campos serão considerados para determinar quais registros correspondem aos critérios de seleção fornecidos.
 *  Essa anotação é útil para otimizar as consultas e garantir que apenas os campos relevantes sejam utilizados para filtrar os dados,
 *  melhorando o desempenho e a eficiência das operações de consulta.
 *
 * - LineItem: Esta anotação define os campos que serão exibidos como itens de linha em uma lista ou tabela de exibição.
 *
 * - HeaderInfo: Esta anotação define as informações de cabeçalho para a entidade "Estudantes", incluindo o tipo de entidade, o título e a descrição.
 *
 * - Facets: Esta anotação define as facetas para a entidade "Estudantes", que são usadas para organizar e categorizar os campos em uma interface de usuário.
 *   As facetas permitem agrupar campos relacionados e fornecer uma estrutura mais clara para a apresentação
 *
 * - FieldGroup: Esta anotação define um grupo de campos, que pode ser usado para organizar os campos em uma interface de usuário.
 *  */
annotate my.Estudantes with @UI: {

  SelectionFields               : [
    first_name,
    email,
  ],
  LineItem                      : [
    {
      $Type: 'UI.DataField',
      Value: email,
      Label: 'E-mail',
    },
    {
      $Type: 'UI.DataField',
      Value: first_name,
      Label: 'Nome',
    },
    {
      $Type: 'UI.DataField',
      Value: last_name,
      Label: 'Sobrenome',
    }
  ],
  HeaderInfo                    : {
    $Type         : 'UI.HeaderInfoType',
    TypeName      : 'Estudante',
    TypeNamePlural: 'Estudantes',
    Title         : {
      $Type: 'UI.DataField',
      Value: first_name
    },
    Description   : {
      $Type: 'UI.DataField',
      Value: email
    }
  },
  Facets                        : [{
    $Type : 'UI.ReferenceFacet',
    Label : 'Informações Gerais',
    Target: '@UI.FieldGroup#GeneralInformation'
  }],
  FieldGroup #GeneralInformation: {Data: [
    {
      $Type: 'UI.DataField',
      Value: email,
      Label: 'E-mail'
    },
    {
      $Type: 'UI.DataField',
      Value: first_name,
      Label: 'Nome'
    },
    {
      $Type: 'UI.DataField',
      Value: last_name,
      Label: 'Sobrenome'
    },
    {
      $Type: 'UI.DataField',
      Value: created_at,
      Label: 'Data de Criação'
    }
  ]}
};
