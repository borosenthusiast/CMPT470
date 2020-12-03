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
const bodyParser = require('body-parser');
app = express();

//app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var profileQueryRoute = require('./routes/profileQueryRoute');
app.use('/profile', profileQueryRoute);

var dogforadoptionQueryRoute = require('./routes/dogforadoptionQueryRoute');
app.use('/dogforadoption', dogforadoptionQueryRoute);




app.listen(8081);
