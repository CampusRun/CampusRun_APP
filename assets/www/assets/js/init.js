//Canvas Elements
canvasBg = document.getElementById('canvasBg');
canvasPlayer = document.getElementById('canvasPlayer');
canvasObject = document.getElementById('canvasObject');

//Canvas Context
ctxBg = canvasBg.getContext('2d');
ctxPlayer = canvasPlayer.getContext('2d');
ctxObject = canvasObject.getContext('2d');

//Images
//set Background
var background = new Image();
background.src = 'assets/img/background03.jpg';

//set menu 1200*1200px
var menu = new Image()
menu.src = '';

//set Player
var playerImg = new Image();
playerImg.src = 'assets/img/player_right.png'

//set object
var block = new Image();
block.src = 'assets/img/block.jpg';

//GameSettings
gameWidth = canvasBg.clientWidth;
gameHeight = canvasBg.clientHeight;

var gameOn;

//var requestAnimFrame =  window.requestAnimationFrame ||
//                          window.webkitRequestAnimationFrame ||
//                         window.mozRequestAnimationFrame ||
//                          window.msRequestAnimationFrame ||
//                          window.oRequestAnimationFrame ||
//                          function(callback){
//                            window.setTimeout(callback, 1000/60);
//                          };

window.requestAnimationFrame = function(callback, element) {
    var lastTime = 0;
	var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};



function init() {
  drawMenu();
  
  player = new Player();
  bgLayers = new BgLayers();

  gameOn = true;

  playGame();
  document.addEventListener('click', mouseClicked, false)
}


function drawMenu() {
  //ctxBg.drawImage(menu, 0, 0, 414+200, 252, 0, 0, gameWidth, gameHeight);
}

function playGame() {
  object = new Object();
  gameLoopStart();
}

function gameLoopStart(){
  if(gameOn){
    //draw background
    bgLayers.draw();
    //draw player
    player.draw();
    //draw objects
    object.draw();
    
    window.requestAnimationFrame(function() {
        gameLoopStart()
    });
  }
}

function gameLoopStop(){
  gameOn = false
}

//Helpers

function checkKeyDown(e){
  //check keyCode
  if (e.keyCode == 32){ //spaceBar
    player.jumping = true;
    e.preventDefault();
  }
}


function checkKeyUp(e){
  //check keyCode
}


//eventListener
window.onload = function() {
  init();
}

document.addEventListener('keydown', checkKeyDown, false);
document.addEventListener('keyup', checkKeyUp, false);


window.onresize = function(event) {
  gameWidth = canvasBg.clientWidth;
  gameHeight = canvasBg.clientHeight; 
}


function mouseClicked(e) {
  mouseX = e.pageX -canvasBg.offsetLeft;
  mouseY = e.pageY - canvasBg.offsetTop;
}