# Informações do Projeto


## ......  Adote Uma Patinha ......

Curso: Ciência da computação 

## Participantes

*Ana Carolina Costa Coimbra
*Gabriel Augusto de Souza e Silva Ferreira
*José Carlos Minelli 
*Laura Caetano Costa
*Lucas Lopes Melo Fonseca


# Estrutura do Documento

- [Informações do Projeto](#informações-do-projeto)
  - [Participantes](#participantes)
- [Estrutura do Documento](#estrutura-do-documento)
- [Introdução](#introdução)
  - [Problema](#problema)
  - [Objetivos](#objetivos)
  - [Justificativa](#justificativa)
  - [Público-Alvo](#público-alvo)
- [Especificações do Projeto](#especificações-do-projeto)
  - [Personas, Empatia e Proposta de Valor](#personas-empatia-e-proposta-de-valor)
  - [Histórias de Usuários](#histórias-de-usuários)
  - [Requisitos](#requisitos)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos não Funcionais](#requisitos-não-funcionais)
  - [Restrições](#restrições)
- [Projeto de Interface](#projeto-de-interface)
  - [User Flow](#user-flow)
  - [Wireframes](#wireframes)
- [Metodologia](#metodologia)
  - [Divisão de Papéis](#divisão-de-papéis)
  - [Ferramentas](#ferramentas)
  - [Controle de Versão](#controle-de-versão)
- [Projeto da Solução](#projeto-da-solução)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura da solução](#arquitetura-da-solução)
- [Avaliação da Aplicação](#avaliação-da-aplicação)
  - [Plano de Testes](#plano-de-testes)
  - [Registros de Testes](#registros-de-testes)
- [Referências](#referências)


# Introdução

## Problema

Procura de lar para pets abandonados e conexão com possiveis tutores.
Procura de animais para adoção e conexão com doadores ( ONGs, ou animais sem um lar)
Falta de conhecimento sobre como adotar um animal abandonado ou como ajudar a encontrar um lar para o animal.

## Objetivos

Desenvolver um software que possa conectar pessoas a procura de um novo 
pet a animais que precisam de um lar, alem de ajudar a encontrar novos lares para animais resgatados

## Justificativa

A intenção do projeto é causar o encontro entre pessoas que querem adotar um pet e pets que precisam de um lar,
dessa maneira resolvendo a dor de pessoas que sofrem dois problemas diferentes, sendo que uma tem a solução da outra. 
Basta haver a conexão, o que é o mais complexo e dificil de acontecer de acordo com nossas pesquisas, por isso o
desenvolvimento do software é necessário

## Público-Alvo

O projeto é voltado tanto para ONGs de animas, quanto para pessoas comuns com o desejo de adotar um Pet.
A area de influencia do projeto é baseada em Veterinarios e pessoas voltadas para o bem estar dos animais
tanto quanto Influencer digitais que possam utilizar do nosso software para solucionar seu problema.
A abrangência do Público-Alvo decorre do fato de que o projeto atinge a qualquer pessoa que se vê na situação
de adotar/ajudar um animal sem lar.
 
# Especificações do Projeto

Será abordado de forma aprofundada os resultados obtidos através do metodo de designthink, utilizado para o desenvolvimento do projeto desde a etapa de entendimento até o planejamento da etapa técnica. Além disso, foram realizadas entrevistas qualitativas e quantitativas, mapa de personas e de ideias. Desta forma, é possível mapear as reais necessidades dos possíveis usuários e implementar recursos funcionais que possam suprir as demandas dos mesmos.

## Personas, Empatia e Proposta de Valor

Temos 3 personas com suas respectivas propostas de valores:
![Persona 1](images/personas.png)


## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

### Valéria
>Como veterinária, eu vejo o site como um facilitador entre meus clientes e os pets que eles buscam. Quero trabalhar com ele para oferecer minha ajuda na escolha de um animalzinho que se encaixe na vida de seus tutores, para que eles possam ter uma vida feliz e saudável.

### Agnes
>No papel de adotante, eu acho ótimo ter um espaço onde eu possa buscar pets compatíveis com meu estilo de vida de forma pratica e tão aberta. O contato com veterinários e ONGs é essencial para a escolha de um animalzinho para mim.

### Roberto
>Sou uma pessoa ocupada, e como doador, a praticidade do site em ajudar na adoção do meu cãozinho foi um fator decisivo para mim. Saber das garantias e suporte que o site oferece me deixaram muito mais tranquilo com relação à doação do meu pet.


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir cadastro de animal        | ALTA  | 
|RF-002| Permitir cadastro de doador        | ALTA  |
|RF-003| Permitir cadastro de adotante      | ALTA  |
|RF-004| Possuir um filtro de animais       | MÉDIA |
|RF-005| Possuir uma barra de busca         | BAIXA |
|RF-006| Possuir um mural clicável de foto  | MÉDIA |




### Requisitos não Funcionais

|ID     | Descrição do Requisito                                                      |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo                                                 | ALTA  | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s                         | BAIXA | 
|RNF-003| A interface deve ser intuitiva                                                | ALTA  | 
|RNF-004| O código deve ser documentado                                                 | MÉDIA | 
|RNF-005| O sistema deve apresentar segurança com as informações fornecidas pelo usuário| ALTA  | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| Restringir formatos diferentes de PNG, JPG e JPEG     |
|04| Acesso a informações por usuários não autorizados     |




# Projeto de Interface

Todas essas interfaces foram elaboradas de forma a atender aos requisitos funcionais identificados durante o processo de análise da solução. Foram levados em consideração princípios de usabilidade e integração, garantindo que as interfaces sejam eficientes e intuitivas, de forma a fornecer uma solução completa e eficaz para os usuários.

## User Flow

 Mapa do UserFlow principal do projeto (pode sofrer pequenas alterações ao longo do desenvolvimento).
 ![UserFlow do projeto](images/UserFlow.png)

## Wireframes

 Aqui tem o wireframe da página principal, cadastro de pet, cadastro de pessoa e perfil respectivamente.
 ![Wireframe do projeto](images/Wireframe.png)

# Metodologia

O grupo utilizou o metodo moderno de desenvolmimento de projetos baseado em estudos de Design Thinking
para melhor compreensãoda problemática e dividir e trabalhar de maneira ordenada e eficiente, com uma divisão 
de trabalho bem estruturada e coesa.

## Divisão de Papéis

Todos os membros do grupo tem voz ativa igual, sendo as etapas dividas para cada um dentro de consensos baseados
na proficiência de cada um e suas preferencias. A partir da divisão cada membro se torna responsável e mandante por sua parte
o que não impede de ser ajudado se necessário. Essa divisão tambem é com base nos estudos de Design Thinking e avaliação de perfil
feita no começo do projeto. Como inicio do projeto, decidimos dividir para entrega da Sprint 1 da seguine maneira:

* Ana Carolina Costa Coimbra: Slide para apresentação do projeto no dia 16/04
* Gabriel Augusto de Souza e Silva Ferreira: Relatórios GitHub, Organização da Apresentação
* José Carlos Ribeiro Minelli: Relatórios GitHub, design da interface e da logo, criação geral do site e aperfeiçoamento das partes feitas pelos outros integrantes.
* Laura Caetano Costa: Entrega do Miro e Relatórios GitHub, Organização da Apresentação
* Lucas Lopes Melo Fonseca: Relatórios GitHub, Organização da Apresentação

## Ferramentas

| Ambiente  | Plataforma              |Link de Acesso |
|-----------|-------------------------|---------------|
|Processo de Design Thinkgin  | Miro |  (https://miro.com/app/board/uXjVMYDTGwM=) | 
|Repositório de código | GitHub | (https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-m-20231-tiaw-pets/) | 
|Hospedagem do site | Heroku |  https://XXXXXXX.herokuapp.com | 
|Protótipo Interativo | MavelApp ou Figma | (https://www.figma.com/file/WkTkGR3MRwUpBdM1Mjb0vE/Untitled?node-id=5-145&t=6c4zrA328DnhKQXt-0) | 
|Canais de comunicacao e compartilhamento de dados| WhatsApp e Discord |

> **Links Úteis - Hospedagem**:
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Crie seu Site com o HostGator](https://www.hostgator.com.br/como-publicar-seu-site)
> - [GoDady](https://br.godaddy.com/how-to)
> - [GitHub Pages](https://pages.github.com/)

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/). O controle de versão foi feito em um [Repositório Local](https://github.com/joseminelli/adote-sua-patinha) usando o branch "master" como versão testada e o branch "teste" como a versão que pode haver instabilidades e alguns bugs.

# Projeto da Solução

Diante de tudo que foi exposto acerca do impasse, o grupo criou a aplicação web "Adote sua Patinha" para atuar como um instrumento mediador na situação de adotantes e doadores. Nesse sentido, o objetivo central do produto é divulgar animais que estão sendo doados para possíveis adotantes.

## Tecnologias Utilizadas

Afim de alcançar o objetivo proposto e construir o web app com todas as funcionalidades planejadas foram utilizadas diversas tecnologias,cada uma com sua devida aplicação. Em primeira ánalise, foi utilizado o método de Design Thinking para entender as demandas do possível usúario e elaborar de forma assertiva as funcionalidades a serem implementadas. A respeito da elaboração concreta da aplicação web, foi utilizado o vs code para fins de desenvolvimento de codigo nas linguagens html css e javascript.Além disso, cabe ressaltar o uso da plataforma Figma para os projetos de interface, e do site Pinterest para a procura de imagens que simulem animais cadastrados.

### DIAGRAMA DO USO 
O fluxo do site se inicia na página inicial que apresenta as opções de cadastro ou login. Em caso de primeira visita, após preencher o formulário de cadastro e enviar as informações o usuário é redirecionado para a página de mural, que expõe os pets cadastrados e permite o redirecionamento ao perfil detalhado dos mesmos. Apartir deste ponto, o fluxo é livre e o usuário pode optar por navegar pelo mural usufuindo das funcionalidades oferecidas pelo filtro, visualizar suas informações na página de perfil, cadastrar novos pets vinculados a sua conta, ou visitar o fórum de perguntas.

TELA INICIAL (HTML, CSS e JavaScript):
>Essa página é a primeira que o usuário acessa ao entrar no site. Ela é construída utilizando HTML, CSS e JavaScript e tem como objetivo apresentar uma visão geral do sistema e fornecer opções de navegação para as demais páginas.

FORMULÁRIO DE CADASTRO (HTML, CSS e JavaScript):
>Nessa página, os usuários podem preencher um formulário com informações pessoais e detalhes sobre o animal que desejam doar. Os dados fornecidos pelo usuário são salvos em local storage, permitindo que sejam acessados posteriormente.

MURAL (HTML, CSS e JavaScript):
>Essa página exibe uma lista de pets cadastrados no sistema, obtidos a partir de um arquivo JSON. Os pets são apresentados de forma organizada e detalhada, fornecendo informações sobre cada animal, como raça, idade e descrição. O objetivo do mural é possibilitar que os usuários interessados em adotar um animal possam visualizar as opções disponíveis.

PERFIL (HTML, CSS e JavaScript):
>Essa página recupera as informações de cadastro armazenadas no local storage e as exibe de forma personalizada para cada usuário. É uma página individualizada que permite ao usuário verificar e editar seus dados, incluindo informações de contato e detalhes sobre os animais que ele cadastrou para doação.

FÓRUM (HTML, CSS e JavaScript):
>O fórum é uma funcionalidade adicional que permite aos usuários interagirem por meio de perguntas, comentários e feedback relacionados à adoção de animais. As interações do fórum são salvas no local storage, permitindo que os usuários visualizem e respondam às perguntas e comentários anteriores.
 
![Arquitetura de solução](images/arqDeSolucao.png)

## Arquitetura da solução

No diagrama apresentado, temos páginas HTML, CSS e JavaScript compondo a estrutura do site. O JavaScript interage com o local storage, permitindo que dados sejam salvos localmente no momento do cadastro de perfis e de perguntas, possibilitando a exibição desses dados posteriormente na página de perfil e do fórum. A conexão com a internet possibilita o envio desses dados para o Github Pages, onde o servidor web processa as requisições e envia os recursos solicitados.

![flow](images/flow.png)

# Avaliação da Aplicação

## Cenário: Cadastro de novo usuário

• Descrição: Verificar se um novo usuário pode se cadastrar corretamente na aplicação.
• Passos:
  >	Acessar a página inicial.

  >	Clicar na opção de cadastro.

  >	Preencher o formulário de cadastro com informações válidas.

  >	Enviar o formulário de cadastro.

•	Resultado esperado: O usuário é cadastrado via localStorage e redirecionado para a página de mural.

## Cenário: Visualização de pets no mural

• Descrição: Verificar se os pets cadastrados são exibidos corretamente no mural.
• Passos:
  >	Fazer login como um usuário existente.

  > Acessar a página de mural.

  >	Verificar se a lista de pets cadastrados é exibida.

• Resultado esperado: A lista de pets é exibida corretamente no mural, mostrando informações como raça, idade e descrição de acordo com os filtros selecionados.

## Cenário: Cadastro de novo pet

• Descrição: Verificar se um usuário pode cadastrar um pet.
• Passos:
  >Fazer login como um usuário existente.
  >	Acessar a página de perfil.

  >	Clicar em cadastrar novo pet.

  >	Preencher o formulário de cadastro com informações válidas.

  >	Enviar o formulário de cadastro do pet.

• Resultado esperado: O pet será exibido no perfil com sucesso e a imagem do mesmo aparecerá no perfil da pessoa.

## Cenário: Interação no fórum

• Descrição: Verificar se os usuários podem interagir corretamente no fórum.
• Passos:
  >	Fazer login como um usuário existente.

  >	Acessar o fórum.

  >	Realizar uma pergunta ou responder em uma postagem existente.

  >	Verificar se a interação é registrada e exibida corretamente no fórum.

• Resultado esperado: A interação (pergunta ou resposta) é registrada corretamente e exibida no fórum.

# Plano de Testes

Considerando os conceitos de teste de software, foram selecionados cenários específicos para avaliar a integridade das funcionalidades. Esses cenários foram escolhidos com base nas dúvidas existentes dentro do grupo de desenvolvimento. Os cenários de teste incluíram:

1) Tentativa de acessar a página sem ter realizado o cadastro prévio.
>	
2) Cadastro realizado sem inclusão de foto ou sem o preenchimento de outras informações obrigatórias.
>
3) Teste com inserção de um excesso de texto ao preencher o campo de nome.
>	
4) Submissão de imagens em diferentes escalas e formatos para verificar a capacidade de processamento adequada.
>
Os testes foram conduzidos pelo grupo de desenvolvimento, bem como por pessoas próximas, com o objetivo de aprimorar as funcionalidades do sistema e proporcionar uma melhor experiência ao usuário. Essa abordagem permitiu identificar possíveis falhas e realizar ajustes necessários para garantir a efetividade das funcionalidades implementadas.

## Registros de Testes

Tentativa de acessar a página sem ter realizado o cadastro prévio:
Apesar de implementada com sucesso a validação de cadastro antes de acessar o site, o grupo pretende modificar o software e permitir que visitantes também acessem o mural e o fórum de perguntas.

Cadastro realizado sem inclusão de foto ou sem o preenchimento de outras informações obrigatórias:
Validação implementada corretamente. O software não permite criação de conta em caso de não preenchimento de dados obrigatórios.

Teste com inserção de excesso de texto ao preencher o campo do nome:
Necessário implementação futura de validação da quantidade de caractéres.No entanto, ainda que o campo do nome seja preenchido com quantidade exorbitante de caractéres a página exibe-os sem perder a responsividade.

Submissão de imagens em diferentes escalas e formatos para verificar a capacidade de processamento adequada:
A inserção de imagens é feita corretamente. Ainda que o usuário coloque uma foto retangular ou quadrada, a mesma será automaticamente apresentada no formato circular.Futuramente, planeja-se implementar a funcionalidade de ajustar a foto dentro do espaço.


# Referências

Pinterest. Pinterest. [s.d.]. Disponível em: https://www.pinterest.com/. Acesso em: 8 de junho de 2023.

Figma. Figma.  [s.d.]. Disponível em: https://www.figma.com/. Acesso em: 10 de abril de 2023.


> **Links Úteis**:
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
