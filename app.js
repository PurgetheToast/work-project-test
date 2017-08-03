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
  res.render('chat', {title: 'chat'});
});

app.use(express.static('static'));

var webserver = app.listen(3000, function (){
    console.log('Example app listening on port 3000!')
});

var WebSocketServer = require('ws').Server, config = {
    host: "localhost",
    port: 8080,   
}, wss = new WebSocketServer(config, function(){
    console.log('Web Socket Server created and on port 8080');
});

var n = 1;

var sockets = {};

wss.on('connection', function(ws){
    
    var randomGen = new Date().getTime();
    
    sockets[randomGen] = ws;
    
    console.log('Connected');
    
    ws.send('SERVER: Welcome');
    /*setInterval(function (){
          n += 1;
        ws.send('A MESSAGE TO YOU RUDY TIMES ' + n);
    }, 3000)*/
  

    ws.on('message', function(message){
        console.log('message: %s', message);
        for(var i in sockets){
            sockets[i].send(message);
            }
        });
    
    ws.on('close', function(){
        console.log('connection stopped');
        delete sockets[randomGen];
        });
});