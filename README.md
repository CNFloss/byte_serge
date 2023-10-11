# Byte Serge

This is a library for making HTML5 canvas applications.

## Usage

The `assets/js/main.js` and `index.html` files are examples of how to use the
different components and tools provided.

The `assests/js/CustomParts` folder is where any non-library components or
reusable code goes

The `assets/js/Tools/Constants.js` file defines helpful data like common
degree intervals converted to radians and defaults for the application that can
be overridden.

It is suggested that you size your canvas with CSS for how much screen
space it takes up. And then size you canvas in JavaScript to some ratio or
multiple larger than the CSS size

**Example:**

#### CSS

```css
/* 16:9 ratio with 64px as base unit */
#canvas {
  width: 1024px;
  height: 576px;
}
```

#### JS

```js
const canvas = document.getElementById("#canvas");
const context = canvas.getContext("2d");
canvas.width = 2048;
canvas.height = 1152;
```

This is so that you can do calculations with larger spaces but still have
the canvas application fit on the users screen. The following is a qoute
from the HTML5 specification of the canvas element explaining this further.

> Using CSS pixels to describe the size of a rendering context's output bitmap does not mean that when rendered the canvas will cover an equivalent area
> in CSS pixels. CSS pixels are reused for ease of integration with CSS features, such as text layout.
>
> In other words, the canvas element below's rendering context has a 200x200 output bitmap (which internally uses CSS pixels as a unit for ease of
> integration with CSS) and is rendered as 100x100 CSS pixels:
>
> ```html
> <canvas width="200" height="200" style="width:100px;height:100px"></canvas>
> ```

Found at <https://html.spec.whatwg.org/multipage/canvas.html#2dcontext>
**Note:** _scroll to the non-normative section, it is the first block of text labeled example_
