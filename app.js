const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app =express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {userNewUrlParser: true});

const artigoSchema = {
    titulo: String,
    texto: String
};

const Artigo = mongoose.model("Artigo", artigoSchema);

app.listen(3000, () => {
    console.log("Rodando na porta 3k");
});