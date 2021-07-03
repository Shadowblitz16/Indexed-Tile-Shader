# Indexed-Tile-Shader
A shader that draws a indexed image array

Sometimes you don't want to allocate a whole 32 bpp image in memory and a palette too.
This shaders takes a color array and a byte array directly and draws it to a quad.


## Uniforms
```
uniform vec3[] pal;   //The 3 component rrggbb color array for a palette 
uniform int [] img;   //The image data which points to the palette
uniform int    imgW;  //The image width in pixels
uniform int    imgH;  //The image height in pixels
uniform int    imgR;  //The image rotation from 0 being 0 and 3 being 270
uniform bool   imgFX; //The image x flip  
uniform bool   imgFY; //The image y flip
```
