import express from "express";
import { v4 as uuid } from "uuid";

const app = express();

app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

app.get("/users", (request, response) => {
  //buscar no bd os usuários

  //retornar os usuários
  response.json(users);
});

app.post("/users", (request, response) => {
  //receber os dados do novo usuario
  const { name, email } = request.body;

  // criar um novo usuario
  const user: User = {
    id: uuid(),
    name: name,
    email: email,
  };

  // registrar esse usuario na base de dados
  users.push(user);

  //retornar os dados do usuario
  return response.json(user);
});

app.put("/users/:id", (request, response) => {
  //receber os dados do usuário
  const { id } = request.params;
  const { name, email } = request.body;

  //localizar o usuario na base de dados
  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  //se o usuario não existir, retornar um erro
  if (userIndex < 0) {
    return response.status(404).json({ error: "User not found" });
  }

  //atualizar o usuario na base de dados
  const user = {
    id,
    name,
    email,
  };
  users[userIndex] = user;

  //retorna os dados do usuario atualizado
  return response.json(user);
});

app.delete("/users/:id", (request, response) => {
  //receber id do usuario
  const { id } = request.params;

  //localizar o usuario na base de dados
  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  //se o usuario nao existir, retornar um erro
  if (userIndex < 0) {
    return response.status(404).json({ error: "User not found" });
  }

  //excluir usuario da base de dados
  users.splice(userIndex, 1);

  //retorna status de sucesso
  return response.status(204).send();
});

app.listen("3333", () => {
  console.log("Back-end Started!");
});
