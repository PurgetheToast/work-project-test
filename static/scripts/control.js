/*
 * object to contain all items accessable to all control functions
 */
var globals = {};
/*
 * Variable to check if training games are happening and if so cause UI triggers
 */
var isTraining = false;

/*
 * return to main screen (onclick div.return) behavior and control
 * when pressed returns the user to the main screen with difficulty selection
*/

$(".return").click(function(){
    location.reload();
})
/*
 * choosing difficulty level (onclick span.level) behavior and control
 * when a level is clicked, it becomes highlighted and the "ai.level" variable
 * is set to the chosen level
 */

$(".level1").each(function() {
    var $this = $(this);
    $this.click(function() {
        $('.selected').toggleClass('not-selected');
        $('.selected').toggleClass('selected');
        $this.toggleClass('not-selected');
        $this.toggleClass('selected');
        ai.level = $this.attr("id");
    });
});
/*
$(".restart").hover(function(){
    var timer;
    var delay = 1000;
    timer = setTimeout(function(){
    $('.restartPopUp').fadeIn("slow");
    }, delay);
    
}, function (){
    $('.restartPopUp').fadeOut("slow");
    clearTimeout(timer);
});

*/
/*
 *
 */
function runTheGames(){ 

  
    var trainingGames = function(xPlayer, oPlayer){
                var training = new Training(xPlayer, oPlayer);
                xPlayer.plays(training);
                oPlayer.plays(training);
                training.start();
    }

    
    var firstEvent = function(){
        isTraining = true;
        var elem = document.getElementById("progress"); 
        var xPlayer = new AI("master");
        var oPlayer = new AI("menace");

                for(var count = 0; count < 30; count++){
                    //console.log("GAMES REMAINING: " + 10 - count);
                    trainingGames(xPlayer, oPlayer);
                }
                 $('.control').fadeIn("slow", function (){
                    secondEvent();
                });
 
            
        var secondEvent = function(){
                $('.board2').fadeIn("slow");
                $('.board').fadeIn("slow");
                $('.menace-skull').fadeIn("slow");
                $("h2").fadeIn("slow");
                $("h3").fadeIn("slow");
                $('.training').hide();
                $('#won').contents()[0].nodeValue = 'Training Complete';
            $('#drawingstate').contents()[0].nodeValue = 'Training Complete';
            $('#lost').contents()[0].nodeValue = 'Training Complete';
                $(".cell").html("");
                $(".bead").html("");
                isTraining = false;
                console.log("FINISHED TRAINING");
            }
      };

    
    //this is just in the function
    $('.board2').fadeOut("slow");
    //$('#progress').fadeIn("slow");
    $('.board').fadeOut("slow");
    $('.control').fadeOut("slow");
    $('.menace-skull').fadeOut("slow");
    $("h2").fadeOut("slow");
    $('.training').fadeIn("slow");
    $("h3").fadeOut("slow", function (){ 
        firstEvent();
    });
}
 

/*
 * start training game (onlick div.fastforward)
 * when clicked sets the aix to perfectplayer and aio to menace and starts the games
 * Also add UI indicators
 */
$(".fastforward").click(function(){
        runTheGames();  
});

/*
 * start game (onclick div.start) behavior and control
 * when start is clicked and a level is chosen, the game status changes to "running"
 * and UI view to swicthed to indicate that it's human's turn to play
 */
$(".start").click(function() {
    var selectedDifficulty = $('.selected').attr("id");
    if(typeof selectedDifficulty !== "undefined") {
        var aiPlayer = new AI(selectedDifficulty);

        globals.game = new Game(aiPlayer);
        
        aiPlayer.plays(globals.game);
        $('.intro').hide();
        $('.menaceinfo').hide();
        $('.humaninfo').hide();
        $('.perfectinfo').hide();
        $('.board').fadeIn({duration : "slow"});
        if(ai.level === "menace"){
            document.getElementById("menace-skull").style.backgroundImage = "url('imgs/menace.png')";
            $('.board2').fadeIn({duration : "slow"});
            $('h3').fadeIn({duration : "slow"});
            $('h2').fadeIn({duration : "slow"});
            $('.fastforward').css({'display' : 'block'});
            
        }
        else{
            //document.getElementById("board").style.float = "center";
            //document.getElementsByClassName("board").style.marginLeft = "330px";
            $('p1').hide();
            $('.board').fadeIn({duration : "slow"});
            $('.board').css({'margin-left' : '300px','float' : 'center'})
        }
        console.log(ai.level);
        globals.game.start();
    }
});

/*
* reset the game behaviour and control
* when resert is clicked it will allow the player to reset
* aswell as switching the UI view 
*/

$(".restart").click(function(){
    isTraining = false;
    $('#won').contents()[0].nodeValue = 'You won !';
    $('#lost').contents()[0].nodeValue = 'You lost !';
    $('#drawingstate').contents()[0].nodeValue = 'Its a Draw!';
    $(".cell").html("");
    $(".bead").html("");
    $(".cell").removeClass('occupied');
    $('.bead').css({'background' : 'url("../imgs/coin.png")', 'background-repeat' : 'no-repeat'}); 
   var selectedDifficulty = $('.selected').attr("id");
    if(typeof selectedDifficulty !== "undefined") {
        var aiPlayer = new AI(selectedDifficulty);
        
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);
        if(ai.level === "menace"){
            document.getElementById("menace-skull").style.backgroundImage = "url('imgs/menace.png')";
        }
        globals.game.start();
    }
});

/*
 * click on cell (onclick div.cell) behavior and control
 * if an empty cell is clicked when the game is running and its the human player's turn
 * get the indecies of the clicked cell, create the next game state, update the UI, and
 * advance the game to the new created state
 */
 $(".cell").each(function() {
     var $this = $(this);
     $this.click(function() {
         if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
             var indx = parseInt($this.data("indx"));
             console.log(globals.game.currentState.board.toString());
             var next = new State(globals.game.currentState);
             next.board[indx] = "X";
           
             ui.insertAt(indx, "X");
             console.log(indx);
             next.advanceTurn();
             
             globals.game.advanceTo(next);
             console.log(next);
            
         }
     })
 });
