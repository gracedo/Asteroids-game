(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var RADIUS = 15;
  var COLOR = "green";

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0]
    this.vel[1] += impulse[1]
  }

  Ship.prototype.fireBullet = function(speed) {
    var that = this;
    var vel = that.vel;
    var dir = [(vel[0]*2), (vel[1]*2)];
    var pos = [that.pos[0], this.pos[1]]
    return new Asteroids.Bullet(pos, dir);
  }
}) (this)