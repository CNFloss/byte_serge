export function Camera2D(app, imageSrc, scale = 1) {
  this.app = app;
  this.canvas = app.CANVAS;
  this.ctx = app.CTX;
  this.offScreenCanvas = app.OFFSCREEN_CANVAS;
  this.offScreenCtx = app.OFFSCREEN_CTX;
  this.scale = scale;
  this.offsetX = 0;
  this.offsetY = 0;
  this.img = new Image();
  this.img.src = imageSrc;
  this.img.onload = () => {
    this.offScreenCtx.drawImage(
      this.img,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      0,
      0,
      this.offScreenCanvas.width,
      this.offScreenCanvas.height
    );

    this.ctx.drawImage(
      this.offScreenCanvas,
      this.offsetX,
      this.offsetY,
      this.canvas.width,
      this.canvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.app.RENDER();
  };
}

Camera2D.prototype.updateOffset = function (x, y) {
  this.offsetX = x;
  this.offsetY = y;
};

Camera2D.prototype.draw = function () {
  // Clear canvas
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.drawImage(
    this.offScreenCanvas,
    this.offsetX,
    this.offsetY,
    this.canvas.width,
    this.canvas.height,
    0,
    0,
    this.canvas.width,
    this.canvas.height
  );

  // place followed object at center of canvas
  this.ctx.save();

  this.ctx.translate(-this.offsetX, -this.offsetY);
  this.app.RENDER();
  this.ctx.restore();
};
