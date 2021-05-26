// La posición inicial del Rover será hacia el Norte
var roverDirection = "N";

function processCommand(){
    let command = $("#command").val();
    // Modo loading + bloqueo
    $("#btnCommand").prop("disabled", true);
    $("#btnCommand").val("Loading command");
    
    // Validación de instrucciones
    var regex = new RegExp("[^(F|R|L)]+", );
    var rex = regex.test(command);
    if(rex){
        alert("Please enter a correct command");
        $("#command").val("");
    }
    let orders = command.split('');
    
    // Ejecución de las ordenes
    let successMove = true;
    orders.forEach(function(order){
        if(successMove){
            switch(order){
                case "R":
                    rotateRight();
                    break;
                case "L":
                    rotateLeft();
                    break;
                case "F":
                    successMove = moveForward();
                    break;                
            }                   
        }
    });
    
    // Una vez desplazado el Rover, repintamos el tablero de forma que el Rover quedé siempre que se pueda en el centro
    setTimeout(function(){
        if(!successMove){
            alert("There is an obstacle in the way of the Rover");
        }
        
        let initialCoordinates = $(".rover").parent().prop("id");
        let aCoordinates = initialCoordinates.split("-");

        let positionY = parseInt( aCoordinates[0].replace("y","") );
        let positionX = parseInt( aCoordinates[1].replace("x","") );

        drawSquare(positionY, positionX);
        
        $("#btnCommand").val("Submit Command");
        $("#btnCommand").prop("disabled", false);
    }, 1500);    
}
function moveForward(){
    let actualDirection = roverDirection;
    let initialCoordinates = $(".rover").parent().prop("id");
    let aCoordinates = initialCoordinates.split("-");
    
    let positionY = parseInt( aCoordinates[0].replace("y","") );
    let positionX = parseInt( aCoordinates[1].replace("x","") );
    
    let finalY = 0;
    let finalX = 0;
    
    switch(actualDirection){
        case "N":
            finalY = positionY - 1;
            finalX = positionX;
            break;
        case "S":
            finalY = positionY + 1;
            finalX = positionX;
            break;
        case "W":
            finalY = positionY;
            finalX = positionX - 1;
            break;
        case "E":
            finalY = positionY;
            finalX = positionX + 1;
            break;
    }
    
    let hasObstacle = obstacleDetection(finalY, finalX);
    if(!hasObstacle ){
        $(".rover").detach().appendTo('#y'+finalY+'-x'+finalX); 
        if( debug ){
            console.log('Rover moves to position: y'+finalY+'-x'+finalX);
        }
        return true;
    }else{
        if( debug ){
            console.log('(!) Rover can\'t move to position: y'+finalY+'-x'+finalX);
        }
        return false;
    }    
}
function obstacleDetection(finalY, finalX){
    let obstacle = false;
    // Detección de los límites del tablero
    if(finalY < 0 || finalX < 0 ||finalY > maxcell || finalX > maxcell){
        obstacle  = true;
    }
    // Detección de obstaculos en el camino
    if($('#y'+finalY+'-x'+finalX+' .stone').length > 0){
        obstacle  = true;
    }    
    return obstacle;
}
function rotateRight(){
    let actualDirection = roverDirection;
    let rotation = 0;
    switch(actualDirection){
        case "N":
            roverDirection = "E";
            break;
        case "S":
            roverDirection = "W";
            break;
        case "W":
            roverDirection = "N";
            break;
        case "E":
            roverDirection = "S";
            break;
    }
    setRotationImage();
}
function rotateLeft(){
    let actualDirection = roverDirection;
    let rotation = 0;
    switch(actualDirection){
        case "N":
            roverDirection = "W";
            break;
        case "S":
            roverDirection = "E";
            break;
        case "W":
            roverDirection = "S";
            break;
        case "E":
            roverDirection = "N";
            break;
    }
    setRotationImage();
}
function setRotationImage(){
    switch(roverDirection){
        case "N":
            rotation = 0;
            break;
        case "S":
            rotation = 180;
            break;
        case "W":
            rotation = 270;
            break;
        case "E":
            rotation = 90;
            break;
    }
    $(".rover").css({'transform': 'rotate('+rotation+'deg)'});
}