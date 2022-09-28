var canH;
var canW;

var bird,birdImg,obstacle,ground,bg;
var o1,o2;
var obstacleGroup;
var gamestate = "play"
var score = 0
function preload(){
bg=loadImage("bg.jpg");
birdImg=loadImage("bird.png");
o1=loadImage("obstacle.png");
o2=loadImage("ob2.png");

}
function setup(){
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth+80,displayHeight+80);
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight);
  }
  
  
  bird=createSprite(90,canH/2);
  bird.addImage(birdImg)

  obstacleGroup = new Group()
  bird.setCollider("rectangle",0,0,80,80)

}
function draw(){
  background(bg);
 

  if(gamestate === "play"){
    score += Math.round(getFrameRate()/60)
    if(keyDown(UP_ARROW )|| touches.length > 0){
      bird.velocityY=-9;
      touches = []
    }
    if(keyDown(DOWN_ARROW)){
      bird.velocityY=9;
    }
    bird.velocityY+=0.8;
    spawnObstacles();
   
    if(obstacleGroup.isTouching(bird)||bird.y > canH|| bird.y < 0){
      gamestate = "end"
    }
  }
  if(gamestate === "end"){
    obstacleGroup.setVelocityXEach(0)
    bird.velocityY = 0
    obstacleGroup.setLifetimeEach(-1)
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://preview.redd.it/vxgdzt3eecr41.jpg?auto=webp&s=7449dc00d6d0558b3352107b916a66739f53ba72",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    )
     
  }
   
 
  drawSprites();
  textSize(30)
  text("score: " + score , 50,50)
}

function spawnObstacles(){
  
  if(frameCount%100===0){
    var x=Math.round(random(1,2));
    if(x==1){
      obstacle=createSprite(canW,canH-100);
      obstacle.addImage(o1);
      obstacle.velocityX=-(4 + score/100);
      obstacle.scale=random(1,1.8)
      obstacle.lifetime=400;
      
   

      
    }
    else if(x==2){
      obstacle=createSprite(canW,100);
      obstacle.addImage(o2);
      obstacle.velocityX=-(4 + score/100);
 
      obstacle.lifetime=400;


      obstacle.scale=random(1,1.8)

    }
    obstacleGroup.add(obstacle)
  }

}
