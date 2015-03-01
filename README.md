# WGSN canvas, draggable images and performance

When you have searched for some images, you can click any of the images there to add them to the Canvas part of the page. 
When the image is added to the Canvas then it’s automatically created as a new layer. 
Each layer can be manipulated in the following ways:

1. mousedown
1. mouseup
1. mousemove
1. scale/resize
1. rotate


## Advantages:

1. Dragable, movable in Canvas.
1. Resizable
1. Rotating
1. no CPU issue
1. no Memory leak
1. Multi-images co-exist in Canvas, the screen is clean, separated by layers.
1. both `drag` and `click` right-side images work
1. use `jQuery` and `Twitter Bootstrap` latest version
1. use `bower` to manage these vender components


## Optional:

when clearRect, the following implements will only erase the activate one, not others:

```html
<div style="position: relative;">
 <canvas id="layer1" width="100" height="100"
   style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
 <canvas id="layer2" width="100" height="100"
   style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
</div>
```
