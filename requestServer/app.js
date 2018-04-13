var express = require('express');
var request = require('request');

var app = express();
var port = process.env.PORT || 4000

app.use(express.static('./request/dist'));

let weather
app.get('/api', (req, res) => {
  let that = res
  request('http://www.weather.com.cn/data/cityinfo/101010100.html', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    weather = JSON.parse(body)
    that.send(weather)
  });
})
app.listen(port);

console.log('server is started at http://localhost:' + port);
