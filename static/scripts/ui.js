/*
 * ui object encloses all UI related methods and attributes
 */
var ui = {};

//holds the state of the intial controls visibility
ui.intialControlsVisible = true;

//holds the current visible view
ui.currentView = "";

ui.switchViewTo = function(turn) {

    //helper function for async calling
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");

        if(_turn === "ai"){
            //do nothing
        }   
    }

    if(ui.intialControlsVisible) {
        //if the game is just starting
        ui.intialControlsVisible = false;

        $('.intial').fadeOut({
            duration : "slow",
            done : function() {
                _switch(turn);
            }
        });
    }
    else {
        //if the game is in an intermediate state
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};

/*
 * places X or O in the specifed place in the board
 * @param i [Number] : row number (0-indexed)
 * @param j [Number] : column number (0-indexed)
 * @param symbol [String]: X or O
 */
ui.insertAt = function(indx, symbol) {
    var board = $('.cell');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "green" : "red"
        });
        targetCell.addClass('occupied');
    }
}
/*
 * places the amount of beads in the specifed place in the bead array (coins)
 * @param i [Number] : row number (0-indexed)
 * @param j [Number] : column number (0-indexed)
 * @param amount [String]: coressponding bead from the array
 */
ui.insertBead = function(indx, amount) {
    var beads = $('.bead');
    var targetCell = $(beads[indx]);
        targetCell.html("$" + amount);
        targetCell.css({color : "black"});
}
