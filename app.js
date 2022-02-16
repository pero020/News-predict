const express = require("express");
const bodyParser = require("body-parser");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");

});

app.post("/getApi/:searchText", async function(req, res) {

  try {
    let response = await fetch("https://newsdata.io/api/1/news?apikey=" + process.env.apiKey + "&language=en&category=business,world,politics&qInTitle=" + req.params.searchText)
    // let response = await fetch("https://newsdata.io/api/1/news?apikey=pub_39702fab82a6d29430fd734f0f2e1b9f4214&language=en&category=business,world,politics&qInTitle=" + req.params.searchText)

    let data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
  }

});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
