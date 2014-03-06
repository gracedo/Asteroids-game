(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var COLOR = "black";
  var RADIUS = 30;

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Math.random()*RADIUS+10, COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  var randomVec = function(x, y) {
    var startX = Math.random() * x;
    var startY = Math.random() * y;
    return [startX, startY];
  };

  Asteroid.randAsteroid = function(dimX, dimY) {
    var startPos = [dimX, dimY]
    var vel = randomVec((Math.random()*20)-10, (Math.random()*20)-10);
    return new Asteroid(startPos, vel);
  };
}) (this)