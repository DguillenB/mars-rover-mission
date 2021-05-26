# mars-rover-mission
***
El objetivo de este proyecto es resolver la prueba planteada como "Mars Rover Mission"

## Table of Contents
1. [Información General](#general-info)
2. [Tecnologías](#technologies)
3. [Instalación](#installation)
***
<a name="general-info"></a>
### Información General
La prueba planteada con el título "Mars Rover Mission" es la siguiente:

#### _Your Task_
You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface
of the planet. Develop a software that translates the commands sent from earth to instructions
that are understood by the rover.

#### _Requirements_
* _You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W)
it is facing._
* _The rover receives a collection of commands. (E.g.) FFRRFFFRL_
* _The rover can move forward (f)._
* _The rover can move left/right (l,r)._
* _Suppose we are on a really weird planet that is square. 200x200 for example :)_
* _Implement obstacle detection before each move to a new square. If a given
sequence of commands encounters an obstacle, the rover moves up to the last
possible point, aborts the sequence and reports the obstacle._

#### _Take into account_
* _Rovers are expensive, make sure the software works as expected._

#### Aclaración del desarrollador
Dado que en el planteamiento de la prueba queda un poco abierto a interpretación en cuanto a los movimientos a izquierda y derecha del Rover, se ha decidido desarrrollar el software teniendo en cuenta que cuando se especifica la orden R o L es simplemente un movimiento de rotación hacia ese lado y no de rotación + desplazamiento.
Así pues por ejemplo si el usuario desea desplazarse a la casilla inmediatamente a su izquierda y el Rover se encuentra mirando en dirección Norte, deberá recibir las instrucciones "LF" (Izquierda y avanza).

***
<a name="technologies"></a>
## Tecnologías
Los lenguajes y tecnologías empleados para el desarrollo de este software han sido:
* HTML5
* CSS3
* JavaScript
* jQuery(https://jquery.com/): Version 3.6.0

Este software ha sido desarrollado en un servidor con Apache v.2.4.46.

<a name="installation"></a>
## Instalación
Para la instalación es suficiente con realizar el deploy de todas las fuentes en un servidor con Apache.

## Configuración

Si se deseara incrementar el número de posiciones del tablero (planeta) o la cantidad de obstaculos que se encuentran, se puede hacer
modificando las variables **maxcell** y **maxObstacles** que estan localizadas en la parte superior del archivo ``` /js/main.js ```.

También se ha habilitado desde frontal un apartado **debug** que se puede activar o desactivar en cualquier momento y que permite visualizar al momento 
las posiciones x, y de todas las casillas del tablero así como visualizarlas desde un **alert** en caso de hacer clic en alguna de ellas. 
Si se tiene activo el modo debug también se podrán ver por consola más información en forma de console.logs sobre los desplazamientos del Rover.
