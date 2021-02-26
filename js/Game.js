class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(50,200,50,80);
    car2 = createSprite(250,200,50,80);
    car3 = createSprite(450,200,50,80);
    car4 = createSprite(650,200,50,80);

    cars =[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100);
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 0;
      var y;

      l1 = line(300,displayHeight-10000,300,displayHeight+10000);
      l2 = line(600,displayHeight-10000,600,displayHeight+10000);
      l3 = line(900,displayHeight-10000,900,displayHeight+10000);
      l4 = line(1200,displayHeight-10000,1200,displayHeight+10000);

      for(var plr in allPlayers){
      index+=1;
      x = x+250;
      y = displayHeight-allPlayers[plr].distance;
      cars[index-1].x = x;
      cars[index-1].y = y; 
      //var display_position = 130;

        if (index === player.index){
          cars[index-1].shapeColor = "blue";
       
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
         
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=20
      player.update();
    
    }

   
    drawSprites();
  }
  
}
