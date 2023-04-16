const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
});

const artigoSchema = {
  titulo: String,
  texto: String,
};

const Artigo = mongoose.model("Artigo", artigoSchema);

//////////////////Route de Todos os artigos///////////////////////
app
  .route("/artigos")
  .get((req, res) => {
    Artigo.find({})
      .then((artigosEncontrados) => {
        //console.log(artigosEncontrados);
        res.send(artigosEncontrados);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post((req, res) => {
    const novoArt = new Artigo({
      titulo: req.body.titulo,
      texto: req.body.texto,
    });
    novoArt
      .save()
      .then(() => res.send("Artigo adicionado a DB!"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    Artigo.deleteMany({})
      .then(() => res.send("Artigos deletados da DB!"))
      .catch((err) => res.send(err));
  });

//////////////////Route de artigos especificos///////////////////////

app
  .route("/artigos/:titulo")
  .get((req, res) => {
    Artigo.findOne({ titulo: req.params.titulo })
      .then((artigoEncontrado) => res.send(artigoEncontrado))
      .catch(() => res.send("Artigo não encontrado!"));
  })
  .put((req, res) => {
    Artigo.updateOne(
      { titulo: req.params.titulo },
      { titulo: req.body.titulo, texto: req.body.texto }
    )
      .then(() => res.send("Documento atualizado com sucesso!"))
      .catch((err) => res.send(err));
  })
  .patch((req, res) => {
    Artigo.updateOne({ titulo: req.params.titulo }, { $set: req.body })
      .then(() => res.send("Documento atualizado com sucesso!"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    Artigo.deleteOne({ titulo: req.params.titulo }, { $set: req.body })
    .then(() => res.send("Documento deletado com sucesso!"))
    .catch((err) => res.send(err));
  });

app.listen(3000, () => {
  console.log("Rodando na porta 3k");
});
