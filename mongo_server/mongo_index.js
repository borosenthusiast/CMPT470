// var mongo = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// mongo.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Matchpaw");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

var express = require('express');
app = express();

app.use(express.json());
var profileQueryRoute = require('./routes/profileQueryRoute');
app.user('/profile', profileQueryRoute);

app.listen(8081);
