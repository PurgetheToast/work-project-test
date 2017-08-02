var reader;
stateArray = [];
tempBoardArray = [];
boardArray = [];
tempBeadArray = [];
beadArray = [];
beadIntArray = [];
beadIntArrayCopy = [];


function checkFileAPI(){
    if (window.File && window.FileReader && window.FileList && window.Blob){
        reader = new FileReader();
        return true;
    }
    else {
        alert('The File APIs arnt supported by this browser');
        return false;
    }
}


function dataRead(){
        //grabs the file to read in and splits each state into a new line and adds to statearray
        $.get('second_player_menace.txt', function(data){
                stateArray = data.split(/\n/);
            //splits each line in two then adds them to two seperate arrays
    for (var ix = 0; ix < stateArray.length; ix++){
                
        stateArray[ix] = stateArray[ix].split("~");
        
        tempBoardArray.push(stateArray[ix][0]);
        
        tempBeadArray.push(stateArray[ix][1]);
 
                }
            //splits all the board positions into seperate elements and creates a 2d array of this
        for (var j = 0; j < tempBoardArray.length; j++){
        
                boardArray[j] = tempBoardArray[j].split(",");
            }
            console.log(boardArray);
            
     //splits each string up in an individual element (removes the ,)       
    for (var iy = 0; iy < tempBeadArray.length; iy++){
           beadArray[iy] = tempBeadArray[iy].split(",");
                }
    //converts all the strings into ints to be used when adding or taking away beads        
    for(var k = 0; k < beadArray.length; k++){
        beadIntArray[k] = [];
        beadIntArrayCopy[k] = [];
        for(var l = 0; l< beadArray[k].length; l++){
            beadIntArray[k][l] = parseInt(beadArray[k][l], 10);
            beadIntArrayCopy[k][l] = parseInt(beadArray[k][l], 10);
        }
    }
           console.log(beadIntArray);
            }); 
            
        }
/*
 * Hide and show function for the info regarding each option within the menu
*/
function displayMenaceInfo(){
    $('.intro').hide();
    $('.humaninfo').hide();
    $('.perfectinfo').hide();
    $('.menaceinfo').fadeIn({duration : "slow"});
}

function displayPerfectInfo(){
    $('.menaceinfo').hide();
    $('.humaninfo').hide();
    $('.intro').hide();
    $('.perfectinfo').fadeIn({duration : "slow"});
}

function displayHumanInfo(){
    $('.menaceinfo').hide();
    $('.perfectinfo').hide();
    $('.intro').hide();
    $('.humaninfo').fadeIn({duration : "slow"});
}



