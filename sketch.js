var PLAY= 1;
var END = 0;
var jumpSound
var gamestate=PLAY;
var ooof
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesgroup,cloudsgroup
var obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6
var gameoverimage, restartimage
var gameOver,restart
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloud_image= loadImage("cloud.png")
  ooof= loadSound("oofSound.mp3")
  jumpSound=loadSound("jump.mp3")
  groundImage = loadImage("ground2.png");
  gameoverimage = loadImage("gameOver.png")
 restartimage = loadImage("restart.png")
 obstacles1 = loadImage("obstacle1.png")
obstacles2 = loadImage("obstacle2.png")
  obstacles3 = loadImage("obstacle3.png")
  obstacles4 = loadImage("obstacle4.png")
  obstacles5 = loadImage("obstacle5.png")
  obstacles6 = loadImage("obstacle6.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(width/2,height-30,width,20);
  ground.addImage("ground",groundImage);
  ground.x = width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

 obstaclesgroup=new Group();
 cloudsgroup=new Group();
 trex.setCollider("rectangle",0,0,70,70)

 gameOver=createSprite(width/2,height/2-50)
 gameOver.addImage("gameoverimage",gameoverimage)
 gameOver.visible = false;

 restart=createSprite(width/2,height/2)
 restart.addImage("restartimage",restartimage)
 restart.visible = false;

 score=0
}


function draw() {
  //set background color
  background(180);
  text("score: "+score,500,10)
  if (gamestate==PLAY){
    score=score+Math.round(frameCount/60)
    trex.changeAnimation("running",trex_running)
    gameOver.visible = false
    restart.visible = false
   ground.velocityX = -4;
    // jump when the space key is pressed
    if(touches.length>0||keyDown("space")&& trex.y >= height-120) {
      trex.velocityY = -10;
      touches=[]
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;

    }
    //stop trex from falling down
    trex.collide(invisibleGround);
    
    //Spawn Clouds
    spawnClouds()
    
    //cacti
    cacti()
   if (obstaclesgroup.isTouching(trex)){
     gamestate=END
     ooof.play()
   }
  }else if(gamestate==END){
    obstaclesgroup.setVelocityXEach(0)
    cloudsgroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    ground.velocityX=0
    trex.velocityY=0
    cloudsgroup.setLifetimeEach(-1)
    obstaclesgroup.setLifetimeEach(-1)
    gameOver.visible = true;
    restart.visible = true;
  }
  console.log(trex.y)

  drawSprites();


  if (keyDown("r")||touches.length>0&&gamestate==END){
    gamestate=PLAY
    obstaclesgroup.destroyEach()
    cloudsgroup.destroyEach()
    score=0
    touches=[]
  }
}

//function to spawn the clouds
function spawnClouds(){
  if (frameCount%60==0){
    var cloud=createSprite(width,50,50,90)
    cloud.velocityX=-5
    cloud.addImage(cloud_image)
    cloud.depth=trex.depth
    trex.depth++
    cloud.y = Math.round(random(10,200)) 
    cloud.lifetime=300
    cloudsgroup.add(cloud)
  }

}

//spawn obstacles
function cacti(){
  if (frameCount%80==0){
  var cactus=createSprite(width,height-47,10,40);
  cactus.velocityX=-5;
  cactus.scale=0.70
 
  var rand= Math.round(random(1,6));
  switch(rand){
    case 1: cactus.addImage(obstacles1);
    break;

    case 2: cactus.addImage(obstacles2);
    break;

    case 3: cactus.addImage(obstacles3);
    break;

    case 4: cactus.addImage(obstacles4);
    break

    case 5: cactus.addImage(obstacles5);
    break;

    case 6: cactus.addImage(obstacles6);
    break;

    default:break
  }
  cactus.lifetime=300
 obstaclesgroup.add(cactus)
  } 
 

 
    
}

function keyPressed(){
 if (keyCode==32){
   jumpSound.play()
 }
}

function keyReleased(){
 if (keyCode==32){
   jumpSound.stop()
 }
}