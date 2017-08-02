var express = require('express');
var app = express();
var path = require("path");

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views' );

/*app.get('/', function (req,res) {
  res.sendFile(path.join(__dirname+'/indexs.html'));
});
*/

app.get('/', function (req,res) {
  res.render('indexs', {title: 'fjh67'});
});

app.use(express.static('static'));

app.listen(3000, function (){
    console.log('Example app listening on port 3000!')
});

