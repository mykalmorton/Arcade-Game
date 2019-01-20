
let game = true;
    speed = 205;
// setting for the enemy
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
    crossing = 0;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
  if (this.x > ctx.canvas.width + this.width) {
      this.x = -200 * Math.floor(Math.random()*5) + 1; //random number 
      } else {
      this.x += this.speed * dt; // the speed of the enemy dt
    }
  // check for collision with player
  
  if (collision(player.x, player.y, player.width, player.height,this.x,this.y, this.width, this.height)) {
      this.collision = true;
      console.log(player.y)
      // resets char position 
      if (player) {
          crossing = 0;
          player.x = 202;
          player.y = 400;
      }
      } else {
      this.collision = false;
    }
};
    Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function crossingcount (){
   // console.log (crossing,"!");
    return (crossing);


}
var Player = function (x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// this set up the easment limits fo the player
Player.prototype.handleInput = function (direction){
  const horizontial = 101,
        vertical = 83;
    
  if (direction === 'left' && this.x - horizontial >= 0){
    this.x -= horizontial;  
    } else if (direction === 'right'&& this.x + horizontial < ctx.canvas.width){
    this.x += horizontial; 
    } else if (direction === 'down'&& this.y + vertical < ctx.canvas.height - 200){
    this.y += vertical; 
    } else if (direction === 'up'&& this.y - vertical > 0 - player.height){
    this.y -= vertical; 
    }
  
    crossingcount();
     
        if (player.y === -15) {
           // console.log('speed increases');
            setTimeout(function () {
             crossing ++;   
             player.x = 202;
             player.y = 400;
             if (crossing == 1) {
             crossing = 0;
             $('#myModal').modal('show');
             }
            },500);
      
    } 
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const player = new Player(202,400,'images/char-boy.png');
const enemyPosition = [55,140,230];
const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy( (-200 *(index +1)), y,((100 * getRandomInt(2)) * (Math.random()+1))+150);
});

console.log(allEnemies);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    console.log(getRandomInt);
  }
  

// getting the area of the player and enemies , so i know when they collide
function collision (px,py,pw,ph,ex,ey,ew,eh){
return (Math.abs(px - ex) *2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
    
}


