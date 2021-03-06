(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );
	
  var FPS = 30;
  var DIM_X = 1000;
  var DIM_Y = 600;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([DIM_X/2, DIM_Y/2], [0, 0]);
    this.bullets = [];
    this.score = 0;
  };

  var randomVec = function(x, y) {
    var startX = Math.random() * x;
    var startY = Math.random() * y;
    return [startX, startY];
  };

  Game.prototype.addAsteroids = function(numAsteroids) {
    var that = this;
    var ship = that.ship;
		
    for(var i = 0; i < numAsteroids; i++) {
      var j = true;
			
      while(j) {
        pos = randomVec(DIM_X, DIM_Y)
        if(Math.abs(pos[0] - ship.pos[0]) > 100 &&
            Math.abs(pos[1] - ship.pos[1]) > 100) {
          that.asteroids.push(Asteroids.Asteroid.randAsteroid(pos[0], pos[1]));
          j = false;
				}
      }
    }
  };

  Game.prototype.checkShip = function() {
    var ship = this.ship;
    var pos = ship.pos;
    var cx = pos[0];
    var cy = pos[1];

    if(this.isOutOfBounds(ship)) {
      if(cx < 0) { ship.pos[0] = DIM_X; }
      else if (cx > DIM_X) { ship.pos[0] = 0; }
      else if (cy < 0) { ship.pos[1] = DIM_Y; }
      else if (cy > DIM_Y) { ship.pos[1] = 0; }
    }
  };

  Game.prototype.draw = function() {
    var ctx = this.ctx
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });

    this.ship.draw(ctx);

    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
  };

  Game.prototype.checkCollisions = function(interval) {
    var that = this;

    this.asteroids.forEach(function(asteroid) {
      if(asteroid.isCollidedWith(that.ship)) {
        alert("You've crashed your ship! FINAL SCORE: " + that.score);
        that.stop(interval);
        window.location.reload();
      }
    })
  };

  Game.prototype.stop = function(interval) {
    window.clearInterval(interval);
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    })

    this.ship.move();
		
    this.bullets.forEach(function(bullet) {
      bullet.move();
    })
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    if(key.isPressed('up')){ that.ship.power([0, -1]) };
    if(key.isPressed('down')){ that.ship.power([0, 1]) };
    if(key.isPressed('right')) { that.ship.power([1,0]) };
    if(key.isPressed('left')){ that.ship.power([-1,0]) };
    if(key.isPressed('space')){ that.fireBullet() };
  };

  Game.prototype.destroyAsteroids = function(asteroid) {
    var ind = this.asteroids.indexOf(asteroid);
    var pos = asteroid.pos;
    var cx = pos[0];
    var cy = pos[1];

    if(this.hitBullets(asteroid)) {
      this.asteroids.splice(ind, 1);
      this.score += 1;
    } else if(this.isOutOfBounds(asteroid)) {
			if(cx < 0) { asteroid.pos[0] = DIM_X; }
			else if (cx > DIM_X) { asteroid.pos[0] = 0; }
	    else if (cy < 0) { asteroid.pos[1] = DIM_Y; }
      else if (cy > DIM_Y) { asteroid.pos[1] = 0; }
		}
	};

  Game.prototype.removeBullet = function(bullet) {
    var ind = this.bullets.indexOf(bullet);
    var cx = bullet.pos[0];
    var cy = bullet.pos[1];
		
    if(this.isOutOfBounds(bullet) || this.hitAsteroids(bullet)) {
      this.bullets.splice(ind, 1);
    }
  };

  Game.prototype.isOutOfBounds = function(obj) {
    var cx = obj.pos[0];
    var cy = obj.pos[1];
		
    if(cx < 0 || cx > DIM_X || cy < 0 || cy > DIM_Y) {
      return true;
    } else {
      return false;
    };
  };

  Game.prototype.hitBullets = function(asteroid) {
    var hit = false
		
    this.bullets.forEach(function(bullet) {
      if(bullet.isCollidedWith(asteroid)) {
        hit =  true;
      }
    })
		
    return hit;
  };

  Game.prototype.hitAsteroids = function(bullet) {
    var hit = false
		
    this.asteroids.forEach(function(asteroid) {
      if(asteroid.isCollidedWith(bullet)) {
        hit = true;
      }
    })
    return hit
  }

  Game.prototype.fireBullet = function() {
    var that = this.ship
    var speed = Math.sqrt(Math.pow(that.vel[0], 2) + Math.pow(that.vel[1], 2));

    if(speed !== 0) {
      this.bullets.push(this.ship.fireBullet(speed));
    }
  };
	
  Game.prototype.step = function(interval) {
    var that = this;
    this.bindKeyHandlers();
    this.move();
		
    this.asteroids.forEach(function(asteroid) {
      that.destroyAsteroids(asteroid);
    })
		
    this.bullets.forEach(function(bullet) {
      that.removeBullet(bullet);
    })
		
    this.checkShip();
    this.draw();
    this.checkCollisions(interval);
    if(this.asteroids.length < 5) {
      this.addAsteroids(5);
    }
  };

  Game.prototype.start = function() {
    var that = this;
    this.addAsteroids(10);
    var interval = window.setInterval(function() { that.step(interval); }, FPS);
  };
}) (this)