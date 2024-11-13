//all inspo and reference that I use to help me in the project is The Coding Train, my bf, chat gpt to help with fixes, Jason Eldrich, flanniganable and magic monk

let barriers = [
  { x: 0, y: 150, w: 400, h: 20 },  
  { x: 200, y: 400, w: 400, h: 20 }  
];

let cube;
let cubeSize = 70;
let speed = 1;
let img;
let imgbg;
let npcs = [];
let npcSize = 50;
let npcImages = [];
let gameState = 'menu'; 
let startButton;
let npcStopped = []; 
let restartButton;
let BGimage;
let Deadimage;
let sound1, sound2;
let Endred;
let brick;
let barrel;
let grate;
let mud;
let wood;
let trash;
let grass;
let bloodpic;

let startTime;  //records game start time
let gameOver = false;  //tracks if time limit is reached
let timeUp = false;  //tracks if time ran out

let barrier = [
  { x: 100, y: 150, w: 350, h: 20 },  
  { x: 100, y: 400, w: 400, h: 20 }   
]

function preload() {
  sound1 = loadSound('titlemusicsound1.wav');
  sound2 = loadSound('bgmusic2.mp3');
  blood = loadImage('bloodpic.jpg');
  img = loadImage('zombie1.0.gif');
  BGimage = loadImage('Untitled-4.png');
  Deadimage = loadImage('blood splater.png');
  Endred = loadImage('hands.jpg');
  brick = loadImage('redwall.webp');
  barrel = loadImage('toxicred.png');
  grate = loadImage('grate.png');
  mud = loadImage('mud.png');
  wood = loadImage('wood.png');
  trash = loadImage('trash.webp');
  grass = loadImage('Bgrass.png');
  npcImages[0] = loadImage('pixelchar1.png');
  npcImages[1] = loadImage('pixelchar2.0.png');
  npcImages[2] = loadImage('pixelchar3.0.png');
  npcImages[3] = loadImage('pixelchar4.0.png');
  npcImages[4] = loadImage('pixelchar5.0.png');
  npcImages[5] = loadImage('pixelchar6.0.png');
  npcImages[6] = loadImage('pixelchar7.0.png');
}

function setup() {
  createCanvas(600, 600);
  cube = createVector(width / 2, 0);

  npcs = [
    createVector(150, 200),
    createVector(420, 250),
    createVector(100, 350),
    createVector(330, 450),
    createVector(300, 450), 
    createVector(215, 300),
    createVector(300, 400)  
  ];

  for (let i = 0; i < npcs.length; i++) {
    npcStopped[i] = false;
  }
//start game menu button at the beginning
  startButton = createButton('Start Game');
  startButton.position(760, 400);
  startButton.style("font-family", "Comic Sans MS");
  startButton.style("font-size", "30px");
  startButton.mousePressed(startGame); 
  startButton.style("background-color", "brown");
//restart button that appears in both end game screen
  restartButton = createButton('Main Menu');
  restartButton.position(770, 500);
  restartButton.style("font-family", "Comic Sans MS");
  restartButton.style("font-size", "30px");
  restartButton.mousePressed(restartGame); 
  restartButton.hide(); 
  restartButton.style("background-color", "orange");

  sound1.setVolume(0.5);
  sound2.setVolume(0.5);
}

//assets within the game
function draw() {  
    image (BGimage, -600,-200, 2000,1000);
    image (mud, 190,285, 60,30);
    image (mud, 500,540, 60,30);
    image (mud, 30,80, 60,30);
    image (wood, 87,425, 60,40);
    
      image (grate, 50,300,40,20);
      image (grate, 175,300,40,20);
      image (grate, 300,300,40,20);
      image (grate, 425,300,40,20);
      image (grate, 550,300,40,20);
    image(grass, 30,-5,100,50);
  image (wood, 65,30, 60,40);

  image (wood, 547,511, 60,40);

  image (barrel, 530,300, 100,100);
  image (barrel, 130,400, 100,100);
  image (barrel, 5,5, 100,100);

    image(grass, 50,430,100,50);
    image(trash, 65,40, 50,40);
    image(trash, 525,515, 50,40);
    image (mud, 390,220, 60,30);
    image(grass, 400,180,100,50);
    image(trash, 408,200, 50,40);
    image(trash, 125,455, 50,40);
    image(trash, 545,495, 50,40);

  image (mud, 460,37, 60,30);
  image (wood, 500,35, 60,40);
  image (wood, 500,25, 60,40);
  image (wood, 465,55, 60,40);
    image(trash, 515,50, 50,40);
    image(trash, 495,60, 50,40);

  fill(255, 0, 0);
  for (let barrier of barriers) {
    rect(barrier.x, barrier.y, barrier.w, barrier.h);
  }

//menu screens and ig screen have different sound
  if (gameState === 'menu') {
    drawMenu(); 
    if (!sound1.isPlaying()) sound1.loop();
    if (sound2.isPlaying()) sound2.stop();

  } else if (gameState === 'play') {
    if (sound1.isPlaying()) sound1.stop();
    if (!sound2.isPlaying()) sound2.loop();
    
    noFill();
    stroke(0);
    rect(0, 0, width, height);
    moveCube();
    image(img, cube.x, cube.y, cubeSize, cubeSize);
    drawNPCs();
    checkCollisions();
    checkGameOver();

    //I got help from a youtuber called flanniganable and magic monk on how to start the countdown timer but for the time and where to display was my code 
    let elapsed = (millis() - startTime) / 1000;  // convert from milli to seconds
    fill(255);
    textSize(30);
    text(`Time: ${30 - Math.floor(elapsed)}s`, width - 100, 30);  //I honestly have no clue what math.floor is since they didnt explain it in the video so I got chatgpt for help
    //if players couldnt kill all npcs, the timeup screen plays
    if (!gameOver && elapsed >= 30) { 
      gameOver = true;
      timeUp = true;  
      gameState = 'end';
    }
    //AH
  } else if (gameState === 'end') {
    if (timeUp) {
      drawTimeUpScreen();  //this show time's up screen if time ran out
    } else {
      drawEndScreen();  //and this is the normal end screen if all NPCs killed
    }
  }
}

//draw menu
function drawMenu() {
  image(Endred, 0, 0, 600, 600);
  fill(255);
  textSize(50);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  text("ZOMBIES 3", width / 2, 150);
  textSize(25);
  text("Instructions:", width / 2, height / 2 + 30);
  text("WASD to move", width / 2, height / 2 + 60);
  text("Kill everyone to win!", width / 2, height / 2 + 85);
}

function startGame() {
  gameState = 'play'; 
  startButton.hide(); ///hide the start button 
  startTime = millis();  //time start counting down once the once the state is in play 
  gameOver = false;  
  timeUp = false;  
}
//cube movement and it has a constraint on the x and y 
//imma be honest i wanted to use key and not key code but it didnt work and i couldnt figure out why so i had chatgot convert it into key code 
function moveCube() {
  let originalX = cube.x;
  let originalY = cube.y;

  //for this part i originally went with just doing if bliockedX and Y are set as true if there's collision in the direction
  if (keyIsDown(65)) cube.x -= speed;  
  if (keyIsDown(68)) cube.x += speed;  

  //the code didnt work, I was able to keep walking voer it so I tried seperating the x and y direction
  for (let barrier of barriers) {
    if (
      cube.x < barrier.x + barrier.w &&
      cube.x + cubeSize > barrier.x &&
      cube.y < barrier.y + barrier.h &&
      cube.y + cubeSize > barrier.y
    ) {
      cube.x = originalX; //initally one direction works and I couldn't figure out why so I asked chatgpt for help and it fixed all direction
      break;  
    }
  }

  originalY = cube.y;

  //check vertical movement
  if (keyIsDown(87)) cube.y -= speed;  
  if (keyIsDown(83)) cube.y += speed;  

  for (let barrier of barriers) {
    if (
      cube.x < barrier.x + barrier.w &&
      cube.x + cubeSize > barrier.x &&
      cube.y < barrier.y + barrier.h &&
      cube.y + cubeSize > barrier.y
    ) {
      cube.y = originalY;  
      break;  
    }
  }
  cube.x = constrain(cube.x, 0, width - cubeSize);
  cube.y = constrain(cube.y, 0, height - cubeSize);
}
//draws the npcs and if an npc edge is being touch by the player's edge they will switch img and stop movement
function drawNPCs() {
  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
//npc has a stop movement statement once their x and y edge interact with the player's edge 
//i got my bf to help me sort out this code because it wouldnt work since i was using constraint very wrong
    if (!npcStopped[i]) {
      npc.x += random(-7, 7);
      npc.y += random(-7, 7);
      npc.x = constrain(npc.x, 0, width - npcSize);
      npc.y = constrain(npc.y, 0, height - npcSize);
      image(npcImages[i], npc.x, npc.y, npcSize, npcSize);
    } else {
      image(Deadimage, npc.x, npc.y, npcSize, npcSize);
    }
  }
}
//hi tyler
//i got help from The Coding Train video on object communication, i didnt really take much inspiration but i did get to incorporate in the x and y edge rather than him using intersection
//i couldnt really get the interaction to work so i had to ask chatgpt to help with setting up the code since i was using way too many if else statement that started overlapping
function checkCollisions() {
  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
    if (
      cube.x < npc.x + npcSize &&
      cube.x + cubeSize > npc.x &&
      cube.y < npc.y + npcSize &&
      cube.y + cubeSize > npc.y
    ) {
      npcStopped[i] = true; //if the statement are true, it triggers the npcStopped 
    }
  }
}
//this checks the status of the game if all npc stop is true to shpws the end state along with the restart button
function checkGameOver() {
  if (npcStopped.every(status => status === true)) { 
    gameState = 'end';
    restartButton.show(); 
  }
}
//end screen when player won the game
function drawEndScreen() {
  background(brick);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2 - 50);
  textSize(25);
  text("Everyone is dead!", width / 2, height / 2);
  restartButton.show(); 
}
//code very messy cuz i basically gave up so i tried making another screen for a losing menu but very messy 
//end screen when time is up
function drawTimeUpScreen() {
  background(blood);  
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("You ran out of time!", width / 2, height / 1.5);
  restartButton.show(); 
}

function restartGame() {
  gameState = 'menu'; 
  restartButton.hide(); 
  startButton.show(); 
  npcStopped.fill(false);
}
