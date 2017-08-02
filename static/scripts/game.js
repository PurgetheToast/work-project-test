/* Total number of menace games played without reset
*/
var counter = 0;
/*
* to check against the original array 
*/
/* A State within the game
*/
var State = function(old) {
/* the player who's turn it currently is
*/
    this.turn = "";
/* the number of moves the o player has taken
*/
    this.oMovesCount = 0;
/* the number of moves the x player has taken 
*/     
    this.xMovesCount = 0;
/* the current state of the game
*/
    this.result = "ongoing";

    /*
     * public : the board configuration in this state
     */
    this.board = [];

    /* Begin Object Construction */
    if(typeof old !== "undefined") {
        // if the state is constructed using a copy of another state
        var len = old.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }

        this.oMovesCount = old.oMovesCount;
        this.xMovesCount = old.xMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }

    /*
     * public : advances the turn in a the state
     */
    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    /*
     * public function that enumerates the empty cells in state
     * @return [Array]: indices of all empty cells
     */
    this.emptyCells = function() {
        var indexs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indexs.push(itr);
            }
        }
        return indexs;
    }

    
    /*
     * public  function that checks if the state is a terminal state or not
     * the state result is updated to reflect the result of the game
     * @returns [Boolean]: true if it's terminal, false otherwise
     */

    this.isTerminal = function() {
        var B = this.board;
        //console.log(B);
        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-winningstate"; //update the state result
                return true;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-winningstate"; //update the state result
                return true;
              
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-winningstate"; //update the state result
                return true;
              
            }
        }

        var available = this.emptyCells();
        if(available.length == 0) {
            //the game is draw
            this.result = "drawingstate"; //update the state result
            return true;
            
        }
        else {
            return false;
        }    
    };

};

/*
 * Constructs a game object to be played
 * @param autoPlayer [AIPlayer] : the AI player to be play the game with
 */
var Game = function(autoPlayer) {

    //public : initialize the ai player for this game
    //this.aiX = autoPlayer1;
    this.ai = autoPlayer

    // public : initialize the game current state to empty board configuration
    this.currentState = new State();

    //"E" stands for empty board cell
    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];

    this.currentState.turn = "X"; //X plays first

    /*
     * initialize game status to beginning
     */
    this.status = "beginning";
    
  /*checks to see if the current state of the board matches a state within the array
    * @param board [Array]: the current state of the board as an array of strings
    */
    this.compareMoves = function(board){
        
          var a = board.toString();
            
            for(var i = 0; i < boardArray.length; i++){
                var b = boardArray[i].toString();
                    if(a===b){
                        return i;
                    }
                }
            }
        
  this.rewardMenaceWin = function(){
        console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var winIndex1 = 0;
            var winIndex2 = 0;
            var win = 0;
            winIndex1 = rewards[n];
            console.log(winIndex1);
            winIndex2 = rewards[n + 1];
            console.log(winIndex2);
             if(beadIntArrayCopy[winIndex1][winIndex2] === 0){
                /* do nothing */
            }
            else{
            win = beadIntArray[winIndex1][winIndex2] + 3;
            console.log(win);
            beadIntArray[winIndex1].splice(winIndex2, 1, win);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");

    }
  
  this.rewardMenaceLoss = function(){
        console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var lossIndex1 = 0;
            var lossIndex2 = 0;
            var loss = 0;
            lossIndex1 = rewards[n];
            console.log(lossIndex1);
            lossIndex2 = rewards[n + 1];
            console.log(lossIndex2);
            if(beadIntArray[lossIndex1][lossIndex2] === 0){
                /* do nothing */
            }
            else{
                loss = beadIntArray[lossIndex1][lossIndex2] - 1;
                console.log(loss);
                beadIntArray[lossIndex1].splice(lossIndex2, 1, loss);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");

  }
  
  this.rewardMenaceDraw = function(){
     console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var drawIndex1 = 0;
            var drawIndex2 = 0;
            var draw = 0;
            drawIndex1 = rewards[n];
            console.log(drawIndex1);
            drawIndex2 = rewards[n + 1];
            console.log(drawIndex2);
             if(beadIntArrayCopy[drawIndex1][drawIndex2] === 0){
                /* do nothing */
            }
            else{
            draw = beadIntArray[drawIndex1][drawIndex2] + 1;
            console.log(draw);
            beadIntArray[drawIndex1].splice(drawIndex2, 1, draw);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");
 
  }
  

    /*
     * public function that advances the game to a new state
     * @param _state [State]: the new state to advance the game to
     */
    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal() && ai.level === "menace"){
            counter++;
            this.status = "ended";
             //return onendCall(this.currentState);
            if(_state.result === "X-winningstate"){
                //X won
                   document.getElementById("menace-skull").style.backgroundImage = "url('imgs/menacecrying.png')";
                console.log("MENACE LOST");
                console.log(rewards);
                this.rewardMenaceLoss();
                rewards = [];
                console.log(rewards);
                ui.switchViewTo("won");
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                }
            else if(_state.result === "O-winningstate"){
                //X lost
                   document.getElementById("menace-skull").style.backgroundImage = "url('imgs/menacelaughing.png')";
                console.log("MENACE WON");
                console.log(rewards);
                this.rewardMenaceWin();
                rewards = [];
                console.log(rewards);
                ui.switchViewTo("lost");
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                }
            else{
                //it's a draw
                   document.getElementById("menace-skull").style.backgroundImage = "url('imgs/menacelaughing.png')";
                console.log("MENACE DREW");
                console.log(rewards);
                this.rewardMenaceDraw();
                rewards = [];
                console.log(rewards);
                ui.switchViewTo("drawingstate");
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                }    
        }
        else if(_state.isTerminal()) {
            
            this.status = "ended";
             //return onendCall(this.currentState);
            if(_state.result === "X-winningstate"){
                //X won 
                console.log("X HAS WON");
                ui.switchViewTo("won");
                }
            else if(_state.result === "O-winningstate"){
                //X lost         
                ui.switchViewTo("lost");
                }
            else{
                //it's a draw
                ui.switchViewTo("drawingstate");
                }
        }
        else {
            //the game is ongoing

            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
                //this.aiO.notify("X");
            }
            else {
                ui.switchViewTo("robot");

                //notify the AI player its turn has come up
                this.ai.notify("O");
            }
        }
    };
    


        

    /*
     * starts the game
     */
    
    this.start = function() {
        console.log(boardArray);  
        console.log(beadIntArray);    
        if(this.status = "beginning") {
            //invoke advanceTo with the initial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
    
            /*
     * specify a callback when the game ends
     */
    this.onEnd = function(func) {
        onendCall = func;
    }


};


/*
 * Constructs a training object to be played
 * @param autoPlayer [AIPlayer1] : the player to be play the game with
 * @param autoPlayer [AIPlayer2] : the 2nd player to be play the game with
 */
var Training = function(autoPlayer1, autoPlayer2) {
    
    var onendCall = function(){};

    //public : initialize the ai player for this game
    //this.aiX = autoPlayer1;
    this.aiX = autoPlayer1;
    this.aiO = autoPlayer2;

    // public : initialize the game current state to empty board configuration
    this.currentState = new State();

    //"E" stands for empty board cell
    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];

    this.currentState.turn = "X"; //X plays first

    /*
     * initialize game status to beginning
     */
    this.status = "beginning";
    
  /*checks to see if the current state of the board matches a state within the array
    * @param board [Array]: the current state of the board as an array of strings
    */
    this.compareMoves = function(board){
        
          var a = board.toString();
            
            for(var i = 0; i < boardArray.length; i++){
                var b = boardArray[i].toString();
                    if(a===b){
                        return i;
                    }
                }
            }
    
      this.rewardMenaceWin = function(){
        console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var winIndex1 = 0;
            var winIndex2 = 0;
            var win = 0;
            winIndex1 = rewards[n];
            console.log(winIndex1);
            winIndex2 = rewards[n + 1];
            console.log(winIndex2);
             if(beadIntArrayCopy[winIndex1][winIndex2] === 0){
                /* do nothing */
            }
            else{
            win = beadIntArray[winIndex1][winIndex2] + 3;
            console.log(win);
            beadIntArray[winIndex1].splice(winIndex2, 1, win);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");
        console.log("MENACE WON!!!");

    }
  
  this.rewardMenaceLoss = function(){
        console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var lossIndex1 = 0;
            var lossIndex2 = 0;
            var loss = 0;
            lossIndex1 = rewards[n];
            console.log(lossIndex1);
            lossIndex2 = rewards[n + 1];
            console.log(lossIndex2);
            if(beadIntArray[lossIndex1][lossIndex2] === 0){
                /* do nothing */
            }
            else{
                loss = beadIntArray[lossIndex1][lossIndex2] - 1;
                console.log(loss);
                beadIntArray[lossIndex1].splice(lossIndex2, 1, loss);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");

  }
  
  this.rewardMenaceDraw = function(){
     console.log("======LOOP=STARTS=HERE========");
        for(var n = 0; n < rewards.length; n += 2){
            var drawIndex1 = 0;
            var drawIndex2 = 0;
            var draw = 0;
            drawIndex1 = rewards[n];
            console.log(drawIndex1);
            drawIndex2 = rewards[n + 1];
            console.log(drawIndex2);
             if(beadIntArrayCopy[drawIndex1][drawIndex2] === 0){
                /* do nothing */
            }
            else{
            draw = beadIntArray[drawIndex1][drawIndex2] + 1;
            console.log(draw);
            beadIntArray[drawIndex1].splice(drawIndex2, 1, draw);
            }
        }
      console.log("=======LOOP=ENDS=HERE=========");
 
  }
  

    /*
     * public function that advances the game to a new state
     * @param _state [State]: the new state to advance the game to
     */
    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()){
            counter++;
            this.status = "ended";
             //return onendCall(this.currentState);
            if(_state.result === "X-winningstate"){
                //X won
                this.rewardMenaceLoss();
                rewards = [];
                return onendCall(this.currentState);
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                }
            else if(_state.result === "O-winningstate"){
                //X lost
                this.rewardMenaceWin();
            
                rewards = [];
                console.log(rewards);
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                return onendCall(this.currentState);
                }
            else{
                //it's a draw
                this.rewardMenaceDraw();
                rewards = [];
                return onendCall(this.currentState);
                //document.getElementById("counter").innerHTML = "Games Played:" + counter;
                }    
        }
        else {
            //the game is ongoing

            if(this.currentState.turn === "X") {
                this.aiX.notify("X");
            }
            else {
                //ui.switchViewTo("robot");

                //notify the AI player its turn has come up
                this.aiO.notify("O");
            }
        }
    };
    


    
    /*
     * starts the game
     */
    
    this.start = function() {
        //console.log(boardArray);  
        //console.log(beadIntArray);    
        if(this.status = "beginning") {
            //invoke advanceTo with the initial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
    
            /*
     * specify a callback when the game ends
     */
    this.onEnd = function(func) {
        onendCall = func;
    }


};

/*
 * public static function that calculates the score of the x player in a given terminal state
 * @param _state [State]: the state in which the score is calculated
 * @return [Number]: the score calculated for the human player
 */
Game.score = function(_state) {
   if(_state.result !== "ongoing") {
    if(_state.result === "X-winningstate"){
        // the x player won
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === "O-winningstate") {
        //the x player lost
        return - 10 + _state.oMovesCount;
    }
    else {
        //it's a draw
        return 0;
    }
}
}
