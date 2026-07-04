# Banco Web Tests

Este projeto tem como objetivo demonstrar boas práticas de automação de testes com Cypress e JavaScript, aplicadas durante a Mentoria 2.0 do Julio de Lima. A ideia é validar fluxos principais da aplicação web Banco Web por meio de testes end-to-end (E2E), com foco em organização do código, reutilização de ações e geração de relatórios.

## Objetivo do projeto

- Praticar automação de testes web com Cypress.
- Demonstrar estrutura de testes organizada e legível.
- Reaproveitar ações comuns através de Custom Commands.
- Gerar relatórios de execução em formato HTML.
- Validar cenários de login e transferência bancária na aplicação web.

## Pré-requisitos

Antes de executar os testes, certifique-se de que os seguintes projetos estejam em execução:

- API Banco API: https://github.com/juliodelimas/banco-api
- Aplicação web Banco Web: https://github.com/juliodelimas/banco-web

Também é necessário ter instalado:

- Node.js
- npm

## Tecnologias utilizadas

- Cypress
- JavaScript
- cypress-mochawesome-reporter

## Estrutura do projeto

```text
banco-web-tests/
├── cypress/
│   ├── e2e/                 # Casos de teste
│   ├── fixtures/            # Dados de teste (ex.: credenciais)
│   ├── reports/             # Relatórios gerados
│   └── support/             # Configurações e Custom Commands
│       ├── commands/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js        # Configuração do Cypress e do reporter
├── package.json             # Dependências e scripts
└── README.md
```

## Componentes do projeto

### 1. Testes E2E

Os cenários de teste estão na pasta `cypress/e2e`:

- `login.cy.js`
  - Testa login com credenciais válidas.
  - Testa login com credenciais inválidas e valida a mensagem de erro.

- `transferencia.cy.js`
  - Testa transferência com valores válidos.
  - Testa erro de transferência acima de R$ 5.000,00 sem token.

- `spec.cy.js`
  - Exemplo inicial gerado pelo Cypress.

### 2. Custom Commands

Os comandos reutilizáveis foram organizados em arquivos separados dentro de `cypress/support/commands`:

- `common.js`
  - `verificarMensagemNoToast`
  - `selecionarOpcaoNaComboBox`

- `login.js`
  - `fazerLoginComCredenciaisValidas`
  - `fazerLoginComCredenciaisInvalidas`

- `transferencia.js`
  - `realizarTransferencia`

Esses comandos ajudam a deixar os testes mais enxutos e fáceis de manter.

### 3. Fixtures

Os dados usados nos testes ficam em `cypress/fixtures/credenciais.json`.

### 4. Relatórios

Os relatórios HTML são gerados com `cypress-mochawesome-reporter`.

## Instalação

Na raiz do projeto, execute:

```bash
npm install
```

## Execução dos testes

### Executar todos os testes no modo headless

```bash
npm test
```

### Executar os testes em modo headed (com interface)

```bash
npm run cy:headed
```

### Abrir o Cypress Test Runner

```bash
npm run cy:open
```

## Documentação dos testes

### Cenário: Login com credenciais válidas

- Acessa a tela inicial da aplicação.
- Realiza o login com usuário e senha válidos.
- Verifica se a tela de transferência é exibida.

### Cenário: Login com credenciais inválidas

- Acessa a tela inicial da aplicação.
- Realiza o login com dados inválidos.
- Verifica se a mensagem de erro é apresentada.

### Cenário: Transferência válida

- Realiza login com credenciais válidas.
- Preenche conta de origem, conta de destino e valor.
- Verifica se a mensagem de sucesso é exibida.

### Cenário: Transferência acima do limite sem token

- Realiza login com credenciais válidas.
- Tenta transferir um valor acima de R$ 5.000,00.
- Verifica se a mensagem de autenticação necessária é exibida.

## Documentação dos Custom Commands

### `fazerLoginComCredenciaisValidas()`
Preenche os campos de usuário e senha com dados válidos e submete o formulário.

### `fazerLoginComCredenciaisInvalidas()`
Preenche os campos com credenciais inválidas e submete o formulário.

### `realizarTransferencia(contaOrigem, contaDestino, valor)`
Seleciona as contas de origem e destino, informa o valor e envia a transferência.

### `verificarMensagemNoToast(mensagem)`
Valida a mensagem exibida em um toast na interface.

### `selecionarOpcaoNaComboBox(labelDoCampo, opcao)`
Seleciona uma opção em um campo do tipo combobox com base no label associado.

## Relatórios

Ao final da execução, os relatórios podem ser visualizados na pasta:

```text
cypress/reports/html
```

## Observação

Para que os testes funcionem corretamente, a aplicação web e a API precisam estar disponíveis e acessíveis conforme a configuração definida em `cypress.config.js`.
