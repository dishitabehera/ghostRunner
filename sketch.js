var tower, towerIMG, invisibleGround
var ghost, ghost1IMG, ghost2IMG
var climberIMG, doorIMG, ClimbersGroup, DoorsGroup, invisibleClimberGrp
var gameState, PLAY = 1, END = 0


function preload(){
  
  towerIMG = loadImage("tower.png");
  ghost1IMG = loadImage("ghost-standing.png");
  ghost2IMG = loadImage("ghost-jumping.png");
  doorIMG = loadImage("door.png");
  climberIMG = loadImage("climber.png");
  
}


function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerIMG);
  
  ghost = createSprite(300,400,10,20);
  ghost.addImage("standingGhost", ghost1IMG);
  ghost.addImage("jumpingGhost", ghost2IMG);
  
  ghost.scale = 0.5;
  ghost.setCollider("rectangle", 0, 20, ghost.width - 100, ghost.height - 50)
  //invisibleGround = createSprite(300,440,600,2);
  ClimbersGroup = createGroup();
  DoorsGroup = createGroup();
  invisibleClimberGrp = createGroup();
  gameState = PLAY;
}


function draw(){
  background("white");
  //invisibleGround.visible = false;
  
  if( gameState === PLAY){
    if(ghost.isTouching(invisibleClimberGrp)){
       gameState = END;
    }

    if (keyDown("space") || keyDown("up")){
      ghost.velocityY = -13;
      ghost.changeImage("jumpingGhost", ghost2IMG);
   }
  
    ghost.velocityY = ghost.velocityY + 1;
    tower.velocityY = 5;
    if (tower.y > 600){
      tower.y = 300;
    }

    if (keyDown("left")){
      ghost.x = ghost.x - 4;
    }

    if (keyDown("right")){
      ghost.x = ghost.x + 4;
    }
    spawnDoor();
    
  if (ghost.isTouching(ClimbersGroup)){
    ghost.velocityY = 0;
    ghost.changeImage("standingGhost", ghost1IMG);
  }
  }
  
  if (gameState === END){
    background ("black");
    ghost.destroy();
    tower.velocityY = 0;
    tower.destroy();
    ClimbersGroup.destroyEach();
    invisibleClimberGrp.destroyEach();
    DoorsGroup.destroyEach();
    
    textSize(30);
    fill("yellow");
    text ("GAME OVER",220,350);
  }

  
  drawSprites();
}


function spawnDoor(){
  if (frameCount % 100 === 0){
  var door
  door = createSprite(20,100,10,20);
  door.addImage(doorIMG);
  door.velocityY = 5;
  door.lifetime = 220;
  door.scale = 1.5;
  door.x = Math.round(random(100,300));
  door.depth = ghost.depth - 1
  DoorsGroup.add(door);
    
  var climber
  climber = createSprite(20,20,20,10);
  climber.addImage(climberIMG);
  climber.x = door.x;
  climber.y = door.y + 80;
  climber.velocityY = 5;
  climber.depth = ghost.depth - 1
  ClimbersGroup.add(climber);
  
  
  var invisibleClimber = createSprite(1,1,climber.width,5);
  invisibleClimber.y = climber.y+5 ;
  invisibleClimber.x = climber.x;
  invisibleClimber.visible = false;
  invisibleClimberGrp.add(invisibleClimber);
  invisibleClimber.velocityY = 5;
  }
}

