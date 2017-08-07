# animated-svg-path-element
Polymer element that animates the drawing of SVG paths using the `stroke-dasharray` css attribute

![example](/docs/animation.gif)

## Use
Wrap an SVG tag in the `animated-svg-path` element and add the "order" attribute to decribe the order in which animate tags:
```html
<animated-svg-path>
  <svg>
    <path order="0" ... />
    <path order="1" ... />
  </svg>
</animated-svg-path>
```
