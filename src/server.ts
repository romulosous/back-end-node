import express from "express";

const app = express();

app.use(express.json());

app.get("/users", (request, response) => {
  const { perPage, currentPage } = request.query;
});

app.post("/users", (request, response) => {
  const body = request.body;
  console.log(body);

  return response.json({ message: "Criando usuário" });
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json({ message: "Atualizando usuário" });
});

app.delete("/users", (request, response) => {
  return response.json({ message: "Excluindo usuário" });
});

app.listen("3333", () => {
  console.log("Back-end Started!");
});
