# animated-svg-path-element
Polymer element that animates the drawing of SVG paths using the `stroke-dasharray` css attribute

![example](/docs/animation.gif)

[Demo here!](https://gkjohnson.github.io/animated-svg-path-element/example/)

## Use
Wrap an SVG tag in the `animated-svg-path` element and add the `order` attribute to decribe the order in which the paths are animated:
```html
<animated-svg-path>
  <svg>
    <path order="0" ... />
    <path order="1" ... />
  </svg>
</animated-svg-path>
```
