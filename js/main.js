// Variables globales
var board = [];
var aObstacles = [];
var debug = false;

const maxcell = 200;
const maxObstacles = 5000;

$(document).ready(function(){    
    generateVirtualBorad();
});

function generateVirtualBorad(){
    // Generamos array de posiciones para el tablero
    for(let i = 0; i < maxcell; i++){
        var line = [];
        for(let x = 0; x < maxcell; x++){
            line.push('y'+i+'-x'+x);
        }
        board.push(line);
    }
    
    // Generamos array con posiciones de obstaculos
    do {
        let randomY = getRandomInt(0, maxcell);
        let randomX = getRandomInt(0, maxcell);
        
        let posRandom = "y"+randomY+"-x"+randomX;
        if(!aObstacles.includes(posRandom)){
            aObstacles.push(posRandom);
        }
    } while(aObstacles.length < maxObstacles);
}
function newMission(){
    let xposition = parseInt($("#x-position").val());
    let yposition = parseInt($("#y-position").val());
    
    // Validación de coordenadas iniciales dentro del rango permitido
    if( isNaN(xposition) || isNaN(yposition)|| xposition < -1 || xposition > (maxcell -1) || yposition < -1 || yposition > (maxcell -1) ){
        alert("This is not a valid position");
    }else{
        roverDirection = "N";
        aObstacles = [];
        board = [];
        generateVirtualBorad();

        drawSquare(yposition, xposition);
        $(".section-command, .section-debug").show('slow');
        $("#command").focus();
    }    
}
function drawSquare(yposition, xposition){
    $(".empty-table").show();
    $("#planet-square tbody").html("");
    
    let firstY  = parseInt(yposition) - 9;
    let lastY   = parseInt(yposition) + 10;
    let firstX  = parseInt(xposition) - 9;
    let lastX   = parseInt(xposition) + 10;

    // Control de límites izquierdo y derecho del tablero
    firstX  = (firstX < 0) ? 0 : firstX;
    lastX   = (lastX > maxcell) ? maxcell : lastX;
    
    // Control de límites superior e inferior del tablero
    firstY  = (firstY < 0) ? 0 : firstY;
    lastY   = (lastY > maxcell) ? maxcell : lastY;
    
    let yBoard  = board.slice(firstY, lastY);
    
    let visibleBoard = [];
    for (let row in yBoard){
        var line = yBoard[row].slice(firstX, lastX);
        visibleBoard.push(line);
    }
    
    for(const line in visibleBoard){
        let html = '';
        html = '<tr class="y-row">';
        for(const cell in visibleBoard[line]){
            let position = visibleBoard[line][cell];
            
            let aCoordinates = position.split("-");
            let positionY    = parseInt( aCoordinates[0].replace("y","") );
            let positionX    = parseInt( aCoordinates[1].replace("x","") );
            
            let rover    = '';
            let obstacle = '';
            if(position === 'y'+yposition+'-x'+xposition){
                rover = '<div class="rover"></div>';
            }else if(aObstacles.includes(position)){
                obstacle = '<div class="stone"></div>';
            }
            html += '<td id="'+position+'" class="x-cell"><span class="debug-disabled">'+position+"</span>"+rover+obstacle+'</td>';
        }
        html += '</tr>';
        $("#planet-square tbody").append(html);        
    }
    setRotationImage();
    
    setDebugMode();
    $(".empty-table").hide();
    $("#planet-square").show(); 
}
function validateCommand(value){
    value = value.toUpperCase();
    $("#command").val( value );       
}
function setDebugMode(){
    if($("#debug").prop("checked")){
        debug = true;
        $(".debug-disabled").removeClass('debug-disabled').addClass("debug-enable");
        $(".debug-enable").parent().unbind().click(function(){
            alert("This cell is: "+$(this).prop("id"));
        });
    }else{
        debug = false;
        $(".debug-enable").parent().unbind();
        $(".debug-enable").removeClass('debug-enable').addClass("debug-disabled");        
    }
    
    $("#debug").unbind().change(function(){
        setDebugMode();
    });    
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
