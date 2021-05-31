# Todo-list
## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Screenshots](#camera_flash-screenshots)
* [Iniciando o Projeto](#car-iniciando-o-projeto)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto
<p>Projeto desenvolvido em React Native, durante o curso "React Native - Componentes nativos", da Treinaweb.</p>
<p>Ele armazena uma ou mais listas de tarefas com uma imagem, título e descrição.</p>
<p>Ao adicionar uma nova lista, podemos colar o endereço de uma imagem simplesmente clicando no campo de imagem.</p>
<p>Dentro de cada lista, podemos incluir quantas tarefas quisermos.</p>
<p>Cada tarefa possui um controle Switch, que indica se a tarefa já foi realizada.</p>

### Refatoração
<p>Esse projeto foi desenvolvido inicialmente utilizando componentes de classe e API tw-dev-server, desenvolvida pela Treinaweb.</p>
<p>Melhorei o layout das telas e transformei todas as classes em <b>componentes funcionais</b>, para poder utilizar os hooks do React.</p>
<p>Além disso, substituí a API tw-dev-server pelo <b>JSON-Server</b>, que é mais conhecida e funciona em dispositivo físico.</p>
<p>Para acessar a API, troquei o Fetch pelo <b>Axios</b>.</p>
  
## :hammer_and_wrench: Tecnologias
* __React Native__
* API fake **JSON-Server**
* __Axios__ para acessar a API

## :camera_flash: Screenshots
![](https://github.com/luiizsilverio/todo-list/blob/main/images/todolist.gif)

## :car: Iniciando o projeto
```bash
# Baixe o repositório com git clone e entre na pasta do projeto.
$ git clone https://github.com/luiizsilverio/todo-list.git

# Execute yarn para instalar as dependências (ou npm install)
$ yarn

# Inicie o servidor JSON-Server
$ yarn server 
# ou npm run server

# Para iniciar a aplicação 
$ npx react-native run-android

# Se for testar em dispositivo físico, digite em outro terminal:
$ adb reverse tcp:3333 tcp:3333
```

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
