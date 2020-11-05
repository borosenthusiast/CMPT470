var express = require('express');
var app = express();

var indexRoute = require('./routes/indexRoute');
var registerRoute = require('./routes/registerRoute');

app.use(express.json());

app.use('/', indexRoute);

app.use('/register', registerRoute);

// var http = require('http');

// app.get('/request', function(req, response) {  //server asks for test data
// 	var options = {
// 		host: 'localhost',
// 		port: 8080,
// 		path: '/receive'
// 	}; 

// 	http.get(options, res => {
// 		let data = "";
		
// 		res.on("data", d => {
// 			data += d;
// 		});

// 		res.on("end", () => {
// 			response.send(data);
// 			//console.log(data);
// 		})
// 	});
// });

app.listen(3000);  // app.listen(port, [host], [backlog], [callback]])