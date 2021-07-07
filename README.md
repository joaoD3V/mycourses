
##### Desafio Verzel - Sistema de Cadastro e Exibição de Módulos e Aulas

# My Courses - Frontend

Sistema Web de cadastro e exibição de módulos e aulas, com a finalidade de deixar os mesmos mais acessíveis para a consulta e mais prático para cadastro pelo administrador.

------------
### Requisitos do Sistema

[ X ] Home page pública exibindo os módulos e conforme seleciona o módulo, exibe as aulas do módulo;

[ X ] Os módulos devem estar ordenados por ordem alfabética assim como as aulas;

[ X ] Os módulos devem contabilizar o total de aulas referente;

[ X ] Para cadastro das aulas e módulos, deverá haver um login administrativo;

[ ] As páginas de cadastros devem estar seguras e só acessadas após login autenticado;

[ X ] Todas as requisições privadas precisam de um token válido gerado no login para funcionamento da requisição;

[  ] O cadastro de aulas deverá ter listagem, criação e deleção de registros;

[ X ] Os atributos obrigatórios para a aula são: Id, Nome, Módulo e data que acontecerá a aula;

[ X ] O cadastro de módulos deverá ter listagem, criação e deleção de registros ;

[ X ] Os atributos obrigatórios para o módulo são: Id, e Nome;

[ X ] O Backend deverá ser uma API Rest;

[ X ] Todos os dados devem ser persistidos no banco de dados;

------------

### Tecnologias usadas durante o desafio

- **React.js**: lib para a construção de interfaces frontend.
- **TypeScript**: superset para o JavaScript.
- **Axios**: para requisições http com o backend.
- **Classnames**: para a implementação de classe condicionais.
- **SASS**: para a estilização dos componentes.
- **ContextAPI**: para o compartilhamento de estado entre componentes.

------------

### Observação

- Execute o backend antes do frontend para que o sistema possa ter o funcionamento conforme esperado. O backend está rodando na porta 3333.
- Para a visualização da tabela de aulas referentes de um módulo no painel administrativo, basta clicar em cima do nome do módulo que a tabela será exibida embaixo.
- Não foi implementado o CRUD de forma completa referente as aulas;
- Acabei cometendo um erro referente ao loop do UseEffect, relacionado a observação de mudanças de estado dos módulos.
- Não foi implementado o armazenamento do token gerado após o login no localStorage/cookie.
- Não foi implementado no sistema a responsividade.

------------

### Instalação e Execução

**Instalação das dependências**
```
yarn
```

**Execução em ambiente de desenvolvimento**

```
yarn start
```

**Execução em ambiente de produção**

```
yarn build
```