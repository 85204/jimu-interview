var express = require('express');
var swig = require('swig');
var css = require("stylus");

var app = express();
var port = process.env.PORT || 4000
app.use(express.static('./'));

swig.setDefaults({
  cache: false
})
app.set('view cache', false);

app.set('views', './');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/css/new_085e039.css', function (req, res, next) {
  var str = require("fs").readFileSync("./css/new_085e039.styl", "utf-8")
  css.render(str, { filename: "index.css" }, function (err, css) {
    if (err) throw err;
    res.type('text/css; charset=utf-8').send(css);
  })
});

app.get('/css/reset_d5bb31b.css', function (req, res, next) {
  var str = require("fs").readFileSync("./css/reset_d5bb31b.styl", "utf-8")
  css.render(str, { filename: "index.css" }, function (err, css) {
    if (err) throw err;
    res.type('text/css; charset=utf-8').send(css);
  })
});
 

app.listen(port);

console.log('server is started at http://localhost:' + port);
