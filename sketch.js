//Create variables here
var dogs ,dogimage, happyDog,happydogimage;
var database;
var foodS, foodStock;
function preload()
{
  //load images here
  dogimage = loadImage("Dog.png")
  happydogimage = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);
  dogs = createSprite(250,250)
  dogs.addImage(dogimage)
  dogs.scale = 0.2;

  database = firebase.database()
  foodStock = database.ref('food')
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  textSize(18)
  fill("black")
  text("Note:use up arrow key to feed the dog milk",10,40)
  textSize(18)
  fill("black")
  text("food remaining :"+ 'x',20,60)
  
  //add styles here
  
  if(keyWentDown(UP_ARROW)){
  
    writeStock(foodS)
    dogs.addImage(happydogimage)
    
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
 
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

