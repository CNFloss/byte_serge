"use strict";

// Import needed parts of library
import {
  clamp,
  degreesToRadians,
  findV2AtDistanceAndRadians,
  radiansToDegrees,
} from "./Tools/utillities.js";
import { R_DEGEE_15 } from "./Tools/constants.js";
import { BYTE_SERGE } from "./ApplicationParts/byteSerge.js";
import { updateStat, registerUIComponents } from "./ApplicationParts/ui.js";
import { InputController } from "./ApplicationParts/inputController.js";
import { physical2DObject } from "./Objects2D/physical2DObject.js";
import { physicsClock } from "./ApplicationParts/physicsClock.js";
import { Camera2D } from "./ApplicationParts/camera2D.js";

// Import custom logic to plug into or extend library for app specific behavior
import { start, stop, step, w } from "./CustomParts/handlers.js";

console.log("environment loaded");

document.addEventListener("DOMContentLoaded", (e) => {
  main();
});

function main() {
  /* 
    CREATE AND INITIALIZE APPLICATION
  */
  const BYTE_SERGE_APP = new BYTE_SERGE(
    document.getElementsByTagName("canvas")[0],
    new InputController(),
    tick,
    {
      max_rotation: R_DEGEE_15,
      max_speed: 4,
      min_speed: 0,
      gravity: 9.81,
    }
  );

  // Define a render callback function
  function renderCallback() {
    // Your existing rendering logic goes here
    // For example, drawing your BYTE_SERGE_APP's objects
    BYTE_SERGE_APP.RENDER();
  }

  // Create a Camera2D instance with the necessary configuration
  const cameraConfig = {
    canvas: BYTE_SERGE_APP.CANVAS,
    renderCallback: renderCallback,
    imageSrc: "assets/img/tree.jpeg", // Assuming you have a background image
  };

  const CAMERA = new Camera2D(cameraConfig);

  // Create and intialize application's user object
  BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS.push(
    new physical2DObject(
      BYTE_SERGE_APP.CANVAS.width / 2,
      BYTE_SERGE_APP.CANVAS.height / 2,
      64,
      1
    )
  );

  BYTE_SERGE_APP.PLAYER_INPUT_HISTORY.push(
    BYTE_SERGE_APP.PLAYER_INPUT.getSnapShot()
  );

  // Create and intialize additional input peripherals
  BYTE_SERGE_APP.CREATE_BUTTONS(
    ["start", "stop", "step", "w"],
    ["click", "click", "click", "press"],
    [start, stop, step, w]
  );

  // Create and intialize UI Elements
  BYTE_SERGE_APP.STAT_DISPLAY = registerUIComponents(
    "playerStats",
    "inputStats",
    "appStats"
  );

  // Define/Create custom render function
  BYTE_SERGE_APP.RENDER = function () {
    // READ INPUTS
    const { _intensity, _direction } = BYTE_SERGE_APP.INPUT_READ();
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].debugDraw(BYTE_SERGE_APP.CTX);

    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].trajectoryDebugDraw(
      BYTE_SERGE_APP.CTX,
      {
        x: BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].accelerateX,
        y: BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].accelerateY,
      }
    );
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotate(_direction);

    //  Fix / Clean up / Apply Laws to calculations
    // Clamp player rotation
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationD = clamp(
      BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationD,
      0,
      180
    );
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationR = degreesToRadians(
      BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationD
    );
    /* 
      Display stats 
    */
    updateStat(
      BYTE_SERGE_APP.STAT_DISPLAY.PLAYER_STATS,
      BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0]
    );
    updateStat(
      BYTE_SERGE_APP.STAT_DISPLAY.INPUT_STATS,
      BYTE_SERGE_APP.PLAYER_INPUT
    );
  };

  // Define/Create custom input reading function
  BYTE_SERGE_APP.INPUT_READ = function () {
    // Read and clamp intensity input
    // Debug increases it by 1
    let _intensity = BYTE_SERGE_APP.PLAYER_INPUT._intensity + 1;
    BYTE_SERGE_APP.PLAYER_INPUT.setIntensity(
      clamp(
        _intensity,
        BYTE_SERGE_APP.CUSTOM_SETTINGS.min_speed,
        BYTE_SERGE_APP.CUSTOM_SETTINGS.max_speed
      )
    );

    /*console.log(
      BYTE_SERGE_APP.PLAYER_INPUT._direction -
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationD
    );*/
    let _direction = clamp(
      BYTE_SERGE_APP.PLAYER_INPUT._direction -
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].rotationD,
      -BYTE_SERGE_APP.CUSTOM_SETTINGS.max_rotation,
      BYTE_SERGE_APP.CUSTOM_SETTINGS.max_rotation
    );

    /*
    console.log(
      "input direction, clamped direction delta to target (radians, degrees): ",
      BYTE_SERGE_APP.PLAYER_INPUT._direction,
      _direction,
      radiansToDegrees(_direction)
    );
    */

    return { _direction, _intensity };
  };

  // Define/Create custom process function
  BYTE_SERGE_APP.PROCESS = function (dt, t) {
    // Apply calculations
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].applyForces(
      5,
      -9.25 * (dt + t) + BYTE_SERGE_APP.CUSTOM_SETTINGS.gravity * (t + dt)
    );
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].integrate(t, dt);
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].saveState();
  };

  const CLOCK = new physicsClock();
  CLOCK.start();

  // Function to run in environment's event loop
  function tick() {
    CLOCK.tick();
    // List objects to update.
    // console.log(BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0]);

    CLOCK.physicsTick(BYTE_SERGE_APP.PROCESS);

    // interpolate between old and new positions for smooth rendering
    let alpha = CLOCK.accumulator / CLOCK.dt;
    BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].setRenderState(
      (BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].x =
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].x * alpha +
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].previousX * (1 - alpha)),
      (BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].y =
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].y * alpha +
        BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].previousY * (1 - alpha))
    );

    // DRAW / RENDER / DISPLAY
    // Pan background to create camera follow effect
    let offsetX =
      BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].x -
      BYTE_SERGE_APP.CANVAS.width / 2;
    let offsetY =
      BYTE_SERGE_APP.VISIBLE_MOVING_OBJECTS[0].y -
      BYTE_SERGE_APP.CANVAS.height / 2;
    CAMERA.updateOffset(offsetX, offsetY);
    CAMERA.draw();

    /*
      Cache information to reproduce this tick
    BYTE_SERGE_APP.PLAYER_INPUT_HISTORY.push(
      BYTE_SERGE_APP.PLAYER_INPUT.getSnapShot()
    );
    */

    /*
      Call next frame
    */
    BYTE_SERGE_APP._raf = window.requestAnimationFrame(tick);
  }

  if (BYTE_SERGE_APP._running) {
    BYTE_SERGE_APP._raf = window.requestAnimationFrame(tick);
  }
}
