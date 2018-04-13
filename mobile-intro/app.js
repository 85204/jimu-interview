var express = require('express');

var app = express();
var port = process.env.PORT || 4000

app.use(express.static('./'));

app.listen(port);

console.log('server is started at http://localhost:'+port);