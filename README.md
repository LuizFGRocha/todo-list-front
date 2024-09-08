# To Do List Front

Front end de um aplicativo de gestão de listas de tarefas.

## Tecnologias

- React
- Tailwind

## Ambiente de desenvolvimento

- Windows 11 com WSL Ubuntu 20.04.6.
- Node.js 21.7.1.
- npm 10.5.0.
- O aplicativo foi testado no Chrome, no Edge e no Firefox.

## Features

- O usuário possui uma conta que salva seus dados.
- O usuário pode criar listas de tarefas.
- Cada lista de tarefas possui título, data limite, descrição e tarefas.
- Cada tarefa possui um título e pode estar ou não concluída.

## Instruções para execução

Para executar o aplicativo, certifique-se de ter Node.js e npm instalados.

Feito isso, entre os seguintes comandos na raiz do projeto:

```
npm i
npm start
 ```

O aplicativo ficará disponível na porta 3000 do host local.

Obs: o aplicativo fará chamadas para o back end em nuvem. Para rodar o back end
e interagir com ele localmente, altere o endereço da api em src/api.js.

## Aplicativo no ar

Foi realizado o deploy do aplicativo na Azure. Ele está acessível pelo seguinte link:

[https://jolly-rock-0c17fe50f.5.azurestaticapps.net/](https://jolly-rock-0c17fe50f.5.azurestaticapps.net/)

Obs: o aplicativo está temporariamente offline, uma vez que o meu tempo grátis na Azure acabou. Em breve vou fazer o deploy em outro provedor.
