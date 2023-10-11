// Define input handlers
export function start(app) {
  if (!app._running) {
    app._raf = window.requestAnimationFrame(app.TICK_FUNC);
    app._running = true;
  }
}

export function stop(app) {
  if (app._running) {
    window.cancelAnimationFrame(app._raf);
    app._running = false;
  }
}

export function step(app) {
  if (!app._running) {
    console.log("tick!");
    app.TICK_FUNC();
    window.cancelAnimationFrame(app._raf);
  }
}

export function w(app) {}
