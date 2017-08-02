importScripts('ai.js', 'game.js','pageScripts.js');

var _self = self;


isTraining = true;
function runTheGames(){
    var xPlayer = new AI("master");
    var oPlayer = new AI("menace");
    
    for(var count = 0; count < 333; count++){
        
        var training = new Training(xPlayer, oPlayer);
        xPlayer.plays(training);
        oPlayer.plays(training);
        
        training.start();
    }
}

onmessage = function(msg){
var beadArray = JSON.parse(msg);
console.log(msg);
runTheGames();
}

/* Looked into using workers for training but as they only handle array buffers and file list it cannot   
 * receive the beadArray or boardArray even when using JSON due to its size
*/