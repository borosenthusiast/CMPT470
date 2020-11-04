var express = require('express');
app = express();

app.use(express.json());
var userQueryRoute = require('./routes/userQueryRoute');
app.use('/users', userQueryRoute);

app.listen(8080);

