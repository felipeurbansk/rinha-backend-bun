import express, { json } from "express"
import PessoaController from "./controllers/PessoaController"

const app = express()
app.use(json())
const port = 8080

const pessoaController = new PessoaController()

app.post("/pessoas", pessoaController.create)
app.get("/pessoas", pessoaController.getAll)
app.get("/pessoas/:id", pessoaController.getById)
app.get("/contagem-pessoas", pessoaController.getCountAllPessoas)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
