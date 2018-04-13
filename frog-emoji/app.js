var express = require('express');
var swig = require('swig');
var css=require("stylus");  
var str=require("fs").readFileSync("./style.styl","utf-8")  

var app = express();
var port = process.env.PORT || 4000

// app.use(express.static('./'));       
 
swig.setDefaults({
  cache: false
})
app.set('view cache', false);

app.set('views', './views/');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function (req, res) {
  res.render('index')
})
 
app.get('/style.css', function (req, res, next) {
  css.render(str, { filename: "index.css" }, function (err, css) {
    if (err) throw err;
    res.end(css);
  })
});
 
app.listen(port);

console.log('server is started at http://localhost:' + port);
