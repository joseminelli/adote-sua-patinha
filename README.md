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
- [**############## SPRINT 1 ACABA AQUI #############**](#-sprint-1-acaba-aqui-)
- [Projeto da Solução](#projeto-da-solução)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura da solução](#arquitetura-da-solução)
- [Avaliação da Aplicação](#avaliação-da-aplicação)
  - [Plano de Testes](#plano-de-testes)
  - [Ferramentas de Testes (Opcional)](#ferramentas-de-testes-opcional)
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
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório `upstream`. O controle de versão foi feito em um [Repositório Local](https://github.com/joseminelli/adote-sua-patinha) usando o branch "master" como versão testada e o branch "teste" como a versão que pode haver instabilidades e alguns bugs.

> **Links Úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [5 Git Workflows & Branching Strategy to deliver better code](https://zepel.io/blog/5-git-workflows-to-improve-development/)

# **############## SPRINT 1 ACABA AQUI #############**


# Projeto da Solução

......  COLOQUE AQUI O SEU TEXTO ......

## Tecnologias Utilizadas

......  COLOQUE AQUI O SEU TEXTO ......

> Descreva aqui qual(is) tecnologias você vai usar para resolver o seu
> problema, ou seja, implementar a sua solução. Liste todas as
> tecnologias envolvidas, linguagens a serem utilizadas, serviços web,
> frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.
> Apresente também uma figura explicando como as tecnologias estão
> relacionadas ou como uma interação do usuário com o sistema vai ser
> conduzida, por onde ela passa até retornar uma resposta ao usuário.
> 
> Inclua os diagramas de User Flow, esboços criados pelo grupo
> (stoyboards), além dos protótipos de telas (wireframes). Descreva cada
> item textualmente comentando e complementando o que está apresentado
> nas imagens.

## Arquitetura da solução

......  COLOQUE AQUI O SEU TEXTO E O DIAGRAMA DE ARQUITETURA .......

> Inclua um diagrama da solução e descreva os módulos e as tecnologias
> que fazem parte da solução. Discorra sobre o diagrama.
> 
> **Exemplo do diagrama de Arquitetura**:
> 
> ![Exemplo de Arquitetura](images/arquitetura-exemplo.png)


# Avaliação da Aplicação

......  COLOQUE AQUI O SEU TEXTO ......

> Apresente os cenários de testes utilizados na realização dos testes da
> sua aplicação. Escolha cenários de testes que demonstrem os requisitos
> sendo satisfeitos.

## Plano de Testes

......  COLOQUE AQUI O SEU TEXTO ......

> Enumere quais cenários de testes foram selecionados para teste. Neste
> tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo
> de usuários que foi escolhido para participar do teste e as
> ferramentas utilizadas.
> 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)

## Ferramentas de Testes (Opcional)

......  COLOQUE AQUI O SEU TEXTO ......

> Comente sobre as ferramentas de testes utilizadas.
> 
> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)

## Registros de Testes

......  COLOQUE AQUI O SEU TEXTO ......

> Discorra sobre os resultados do teste. Ressaltando pontos fortes e
> fracos identificados na solução. Comente como o grupo pretende atacar
> esses pontos nas próximas iterações. Apresente as falhas detectadas e
> as melhorias geradas a partir dos resultados obtidos nos testes.


# Referências

......  COLOQUE AQUI O SEU TEXTO ......

> Inclua todas as referências (livros, artigos, sites, etc) utilizados
> no desenvolvimento do trabalho.
> 
> **Links Úteis**:
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
