// Camera2D.js
export function Camera2D(config) {
  // Ensure all necessary configurations are provided
  if (!config.canvas || !config.renderCallback) {
    throw new Error("Missing required configuration for Camera2D.");
  }

  this.canvas = config.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.offScreenCanvas = new OffscreenCanvas(
    this.canvas.width,
    this.canvas.height
  );
  this.offScreenCtx = this.offScreenCanvas.getContext("2d", { alpha: false });
  this.renderCallback = config.renderCallback;
  this.imageSrc = config.imageSrc || null;
  this.scale = config.scale || 1;
  this.offsetX = 0;
  this.offsetY = 0;

  // Load and draw the image if provided
  if (this.imageSrc) {
    this.img = new Image();
    this.img.src = this.imageSrc;
    this.img.onload = () => {
      if (this.img) {
        this.offScreenCtx?.drawImage(
          this.img,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      }
      this.draw(); // Initial draw
    };
  }
}

// Method to update the offset of the camera
Camera2D.prototype.updateOffset = function (x, y) {
  this.offsetX = x;
  this.offsetY = y;
};

// Method to handle the drawing of the canvas
Camera2D.prototype.draw = function () {
  // Clear the canvas
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Draw the offscreen canvas to the visible canvas
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

  // Call the render callback to draw additional elements
  if (this.renderCallback && typeof this.renderCallback === "function") {
    this.renderCallback();
  }
};
