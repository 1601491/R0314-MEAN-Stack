var express = require('express');
var app = express();
var fs = require('fs');
var json = JSON.parse(require('fs').readFileSync('data.json', 'utf8'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/guestbook', function(req, res) {
  res.render('pages/indexguestbook');

  var tag = json;

  res.render('pages/indexguestbook', {tag:tag});
});

app.get('/newmessage', function (req, res) {
  res.render('pages/indexnewmessage');

});

app.listen(8081);
console.log('Server is up');
