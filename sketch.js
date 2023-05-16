var trex ,trex_running,trexc;
var terra,terraimg,invisibleterra;
var n,nimg,ngrupo;
var o,o1,o2,o3,o4,o5,o6,ogroup;
var p;
var P=1;
var F=0;
var gS=P;
var gO,gOimg;
var r,rimg;
var m,pulo,cp;
function preload(){

trex_running = loadAnimation('trex1.png','trex3.png','trex4.png',);
 terraimg = loadImage('ground2.png'); 
nimg = loadImage ('cloud.png');
trexc=loadAnimation('trex_collided.png');
o1=loadImage('obstacle1.png');
o2=loadImage('obstacle2.png');
o3=loadImage('obstacle3.png');
o4=loadImage('obstacle4.png');
o5=loadImage('obstacle5.png');
o6=loadImage('obstacle6.png');

gOimg=loadImage('gameOver.png');
rimg = loadImage('restart.png');

m=loadSound('die.mp3');
pulo=loadSound('jump.mp3');
cp=loadSound('checkpoint.mp3');
}

function setup(){
  createCanvas(600,200);
trex=createSprite(50,150,20,50);  
trex.addAnimation('running',trex_running);
trex.addAnimation('colided',trexc);
trex.scale=0.5;
trex.x=50;
terra=createSprite(200,180,400,20);
terra.addImage('terra',terraimg);

invisibleterra = createSprite(200,190,400,10);
invisibleterra. visible = false;

gO=createSprite(300,100);
gO.addImage(gOimg);
gO.scale=0.5;
gO.visible=false;

r=createSprite(300,140);
r.addImage(rimg);
r.scale=0.5;
r.visible=false;

p=0;

ngrupo = new Group();


ogroup=new Group();
}
function draw(){
  background("white");

text('pontuação'+p,500,50);
trex.collide(invisibleterra) ;

if(gS===P){
  
  if (p > 0 && p % 100 === 0){
    cp.play();
  }
  
  
  
  p=p+Math.round(getFrameRate()/60);


  terra.velocityX = -(4 + 3* p/ 100);

  if(terra.x < 0){
  terra.x = terra.width/2;
  
  }
  
  if(keyDown('space') && trex.y >= 160) {
   trex.velocityY = -10;
  
   pulo.play();
  }
  trex.velocityY=trex.velocityY+0.5;
   
  spawcloud();
  spawo();

if (ogroup.isTouching(trex)){
  gS = F;

m.play();

}

}

else if (gS===F){
  terra.velocityX=0;
ogroup.setVelocityXEach(0);
ngrupo.setVelocityXEach(0);

ogroup.setLifetimeEach(-1000000000);
ngrupo.setLifetimeEach(-1000000000);

gO.visible=true;
r.visible=true;


trex.changeAnimation('colided',trexc);

}

if(mousePressedOver(r)){
reset();

}


drawSprites();

}
function reset(){
gS=P;
gO.visible=false;
r.visible=false;

ogroup.destroyEach();
ngrupo.destroyEach();

trex.changeAnimation('running',trex_running);

p=0;
}




function spawcloud(){
if(frameCount % 60 === 0){
  n = createSprite(600,50,40,10);
n.addImage(nimg);
n.y = Math.round(random(50,120));
n.scale=0.65;
n.velocityX= -2;

n.lifetime=320;

n.depth=trex.depth;
trex.depth +=1;


ngrupo.add(n);
}
}
function spawo(){
if(frameCount % 60 ===0){
o=createSprite(600,165,10,40);
o.velocityX = -(4 + 3* p/ 100);

var rand = Math.round(random(1,6));
switch(rand){

case 1:o.addImage(o1);
break;
case 2:o.addImage(o2);
break;
case 3:o.addImage(o3);
break;
case 4:o.addImage(o4);
break;
case 5:o.addImage(o5);
break;
case 6:o.addImage(o6);
break;

default:break;
}
o.scale=0.5;
o.lifetime = 320;

ogroup.add(o);
}
}
