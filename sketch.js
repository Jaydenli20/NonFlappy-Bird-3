var bird;
var bird_image
var cityBg
var building, building_img, streetLamp_img
var blimp_img, obsBird_img
var obstaclesBottom, obstaclesTop
var bottomGround, topGround
var gameState = "play"
var score = 0, coin_img, coin
var gameOver, gameOver_img
var restart, restart_img

function preload(){
cityBg_img = loadImage("city.webp")

bird_image = loadImage("bird-flap-animation.gif")
building_img = loadImage("building.webp")
streetLamp_img = loadImage("streetLamp.png")
blimp_img = loadImage("blimp.png")
obsBird_img = loadImage("obstaclesBird.gif")
coin_img = loadImage("coin.png")
gameOver_img = loadImage("gameOver.png")
restart_img = loadImage("restart.png")
}

function setup() {   
  createCanvas(800,400);
  topGround = createSprite(200,10,800,20)
  topGround.visible = false;

  bottomGround = createSprite(200,390,800,20)
  bottomGround.visible=false;

  /*gameOver = createSprite(400, 200, 50, 50)
  gameOver.addImage("Game Over Text", gameOver_img)
  gameOver.scale = 0.5;

  restart = createSprite(400, 250, 50, 50)
  restart.addImage("Restart", restart_img)
  restart.scale = 0.5*/

  cityBg = createSprite(400, 200, 800, 400)
  cityBg.addImage(cityBg_img)
  cityBg.scale = 0.313;
   
  bird = createSprite(400, 200, 50, 50);
  bird.scale = 0.2 ;
  bird.addImage(bird_image)

  obstaclesBottom_group = new Group()
  obstaclesTop_group = new Group()
  coin_group = new Group()

  bird.setCollider("rectangle", 0, 0,0, 75, 75 )
  //bird.debug = true;
 


}

function draw() {
  background("black");
 if(gameState==="play"){
 
  if(keyDown("space") || keyIsDown(UP_ARROW)) {
    bird.velocityY = -6 ;
    
  }
  if(bird.isTouching(obstaclesTop_group) || bird.isTouching(obstaclesBottom_group) || bird.isTouching(bottomGround) || bird.isTouching(topGround)){
    gameState = "end"
}

if(bird.isTouching(coin_group)){
  score += 5; 
  coin_group.destroyEach()
}

  bird.velocityY = bird.velocityY + 2;
  spawnBottomObstacles();
  spawnTopObstacles();
  spawnCoins();


 }

 if(gameState==="end"){
  obstaclesBottom_group.setVelocityXEach(0)
  obstaclesTop_group.setVelocityXEach(0)

  obstaclesTop_group.setLifetimeEach(-1)
  obstaclesBottom_group.setLifetimeEach(-1)

  coin_group.setVelocityXEach(0)
  coin_group.setLifetimeEach(-1)

  bird.y = 200
  bird.velocityX = 0;
  bird.velocityX = 0;

  


  

 }  
  
  


  drawSprites();
  fill("black")
  textSize(20)
  text("Score: "+score,10, 30)
  
}

function spawnBottomObstacles(){
  if(frameCount%65===0){
    obstaclesBottom = createSprite(800, 350, 50,50)
    obstaclesBottom.scale = 0.8;  
    obstaclesBottom.velocityX = -4
    obstaclesBottom.lifetime = 201;
    ran = Math.round(random(1,2))
    obstaclesBottom_group.add(obstaclesBottom)

    switch(ran){
      case 1 : obstaclesBottom.addImage(building_img)
      break; 

      case 2: obstaclesBottom.addImage(streetLamp_img)
      obstaclesBottom.scale = 0.08;
      break;

      default:

    }
  }
  }
  function spawnTopObstacles(){
    if(frameCount%87===0){
      obstaclesTop = createSprite(800, 100, 50, 50)
      obstaclesTop.scale = 0.5;
      obstaclesTop.velocityX = -4
      obstaclesTop.lifetime = 210;
      obstaclesTop.y = Math.round(random(35, 90))
      ran = Math.round(random(1,2))
      obstaclesTop_group.add(obstaclesTop)

      switch(ran){
        case 1: obstaclesTop.addImage(blimp_img)
        break;

        case 2: obstaclesTop.addImage(obsBird_img)
        break;

        default:
      }
    }
  }
//make a coin function where when player hit coin it score increases
function spawnCoins(){
  if(frameCount%111===0){
    coin = createSprite(400,200, 30,30 )
    coin.scale = 0.5;
    coin.addImage(coin_img)
    coin.velocityX = -4
    coin.lifetime = 204; 
    coin.scale = 0.02;
    coin_group.add(coin)
    coin.y = Math.round(random(152,305))

  }
  
}
