var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "eatthatburger_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get('/', (req, res)=>{
  connection.query("SELECT * FROM burger", function(err, results) {
    if (err) throw err;
    res.render("index", {burgers: results})
  });
});

app.post('/api/burger', (req, res)=>{
  connection.query(
    "INSERT INTO burger SET ?",
    [{burger_name: req.body.burgerName}],
    function(err, results){
      if(err) throw err;
     res.sendStatus(200) 
    })
}) 

app.put('/api/burger/:id', (req, res)=>{
  connection.query(
    "UPDATE burger SET ? WHERE ?", [
  {
    devoured: 1
  },
  {
    id: req.params.id
  }
], function (err, results){
  if(err) throw err
  console.log(results)
  res.sendStatus(200)
})
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT); 
});