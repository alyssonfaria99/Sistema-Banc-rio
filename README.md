#  🏦 API Sistema Bancario - Cubos Bank

## 💻 Sobre o projeto
  Este projeto foi desenvolvido como requisito para aprovação no Módulo 2 do curso de Desenvolvimento de Sofware com foco em back-end oferecido pela [Cubos Academy](https://cubos.academy/).
  O projeto consiste na construção da API de um sistema bancário que realiza operações comuns no dia a dia de qualquer banco.

## 🛣️ Como executar o projeto
  Primeiramente, é necessário ter instalado na máquina as seguintes ferramentas: Node.js e Git. No terminal, execute os seguintes comandos:

  
#### *Clone este repositório*
$ git clone https://github.com/alyssonfaria99/Sistema-Bancario.git

#### *Acesse a pasta do projeto no terminal/cmd*
$ cd academy-template-readme-projects

#### *Vá para a pasta server*
$ cd server

#### *Instale as dependências*
$ npm install

#### *Execute a aplicação em modo de desenvolvimento*
$ npm run dev

#### *O servidor inciará na porta:3000 - acesse http://localhost:3000*

Para utilizar das diferentes funcionalidades do servidor, é aconselhado ter o sofware Insomnia ou outro framework para teste de API instalado na máquina. No Insomnia ou no navegador, digite os endpoints encontrados a seguir
para utilizar as funcionalidades da API.


## ⚙️ Funcionalidades
  A API desenvolvida conta com as seguintes funcionalidades e seus respectivos endpoints:
  
### - **Listar contas bancárias:**
    
#### `GET` `/contas?senha_banco=Cubos123Bank`
Essa função permite ao usuário consultar a listagem de todas as contas cadastradas no banco, mediante à inserção 
do parâmetro de consulta "senha_banco", que já foi predefinido como "Cubos123Bank".
     
### - **Criar uma nova conta:**

#### `POST` `/contas`

Essa função permite ao usuário criar uma nova conta no sistema bancário mediante à inserção dos seguintes dados no
corpo da requisição, que deve ter o formato JSON:

    -   nome
    -   cpf 
    -   data_nascimento
    -   telefone
    -   email
    -   senha
    
### - **Excluir conta:**

#### `DELETE` `/contas/:numeroConta`

Essa funcão permite ao usuário excluir uma conta existente, por meio da inserção do parâmetro de rota "numeroConta".

### - Atualizar dados da conta:

#### `PUT` `/contas/:numeroConta/usuario`

Essa função atualiza os dados de uma conta existente. Para isso, o usuário deve informar no corpo da requisição um objeto JSON com as seguintes propriedades:

    -   nome
    -   cpf 
    -   data_nascimento
    -   telefone
    -   email
    -   senha


### - Depositar:

#### `POST` `/transacoes/depositar`

Realiza um depósito. Para isso, o usuário deve informar no corpo da requisição um objeto JSON com as seguintes propriedades:

    -  numero_conta
    -  valor

  
### - Sacar:

#### `POST` `/transacoes/sacar`

Realiza um saque de determinado valor em determinada conta. Para isso, o usuário deve informar no corpo da requisição um objeto JSON com as seguintes propriedades:

    -   numero_conta
    -   valor
    -   senha

### - Transferir valor entre contas:

#### `POST` `/transacoes/transferir`

Realiza a transferência de determinado valor de uma conta para outra. Para isso, deve ser informado no corpo da requisição um objeto JSON com as seguintes propriedades:

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha
    
### - Consultar saldo:

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Consulta o saldo disponível em uma conta. Para isso, deve ser informado no corpo da requisição um objeto JSON com as seguintes propriedades:

    -   numero_conta
    -   senha
    
### - Consultar extrato:

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Consulta todas as movimentações de recurso relacionadas a uma determinada conta. Para isso, devem ser informados como parâmetros de consultas os valores "numero_conta" e "senha".
    
  
  
