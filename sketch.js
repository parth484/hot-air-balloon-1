var balloon,balloonImage1;
var database;
var position;



function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");


   
  }
  function setup() {
     database=firebase.database();
    createCanvas(1500,700);
     balloon=createSprite(100,100,150,150);
     balloon.addAnimation("hotAirBalloon",balloonImage1); 
      balloon.scale=0.5;

       var balloonPosition=database.ref('balloon/position');
      balloonPosition.on("value",readPosition, showError);
       textSize(20); }
           
         function draw() { 
          background(bg);
           if(keyDown(LEFT_ARROW)){
           writePosition(-10,0);
            balloon.addAnimation("hotAirBalloon",balloonImage1);
          } else if(keyDown(RIGHT_ARROW)){ 
          writePosition(10,0);
           balloon.addAnimation("hotAirBalloon",balloonImage1); 
         } else if(keyDown(UP_ARROW)){
          writePosition(0,-10);
           balloon.addAnimation("hotAirBalloon",balloonImage1);
           balloon.scale=balloon.scale -0.005; } 
          else if(keyDown(DOWN_ARROW)){ 
            writePosition(0,+10);
         balloon.addAnimation("hotAirBalloon",balloonImage1);
          balloon.scale=balloon.scale+0.005; }
          drawSprites(); 
         fill(0); 
              stroke("white");
            textSize(25); 
           text("**Use arrow keys to move Hot Air Balloon!",40,40);
             } 
             function writePosition(x,y){
              database.ref('balloon/position').set({
                'x': position.x + x ,
                'y': position.y + y
              })
            }
            
            function readPosition(data){
              position = data.val();
              console.log(position.x);
              balloon.x = position.x;
              balloon.y = position.y;
            }
            
            function showError(){
              console.log("Error in writing to the database");
            }