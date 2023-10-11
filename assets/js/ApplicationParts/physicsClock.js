export function physicsClock(cappedTimeFrame) {
  this.time = 0;
  this.accumulator = 0;
  this.cappedTimeFrame = cappedTimeFrame || 0.25;
  this.dt = 0.01;
  this.currentTime = 0;
  this.newTime = 0;
  this.frameTime = 0;
}

physicsClock.prototype.start = function () {
  this.currentTime = performance.now() / 1000;
};

physicsClock.prototype.physicsTick = function (physicsFunc) {
  while (this.accumulator >= this.dt) {
    physicsFunc(this.dt, this.time);
    this.time += this.dt;
    this.accumulator -= this.dt;
  }
};

physicsClock.prototype.tick = function () {
  this.newTime = performance.now() / 1000;
  this.frameTime = Math.min(
    this.newTime - this.currentTime,
    this.cappedTimeFrame
  );
  this.currentTime = this.newTime;
  this.accumulator += this.frameTime;
};
