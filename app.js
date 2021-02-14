const adj = require('adjectives');
const express = require('express');
const {nouns, one} = require('nouns');
const a = require('indefinite');
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));



//starting default value
let pageContent = "the moon is..."

app.get("/", function(req, res){
  res.render("index",{
    pageContent: pageContent
  });
});

app.post("/", function(req, res){
  pageContent = createContent();

  res.redirect("/");
});

app.get("/about", function(req, res){
  res.render("about",{});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Server has started.");
});


function createContent(){
  const randmonAdj = adj[Math.floor(Math.random() * adj.length)];

  //correct adjective with right grammar
  const correctGrammarAdj = a(randmonAdj);

  // random nouns
  const randomNoun = one();

  return "the moon is " + correctGrammarAdj + " " + randomNoun;
}
