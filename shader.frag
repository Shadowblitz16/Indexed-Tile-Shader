const float pi = 3.1415926538;

uniform vec3[] pal;
uniform int [] img;
uniform int    imgW;
uniform int    imgH;
uniform int    imgR;
uniform bool   imgFX;
uniform bool   imgFY;



vec2 transformUV(vec2 uv, int r, bool fx, bool fy)
{
    float _dir = float(int(r * 90))*pi/180.0;
    float _sin = sin(_dir);
    float _cos = cos(_dir);
    vec2  _piv = vec2(0.5, 0.5);
    vec2  _uv  ;
    
    
     //rotate uv around center
     uv -= _piv;
    _uv  = vec2
    (
        _cos * uv.x - _sin * uv.y,
        _cos * uv.y + _sin * uv.x 
    ) + _piv;
    uv = _uv;
    
    // flip uv x
    if (fx)
    {
        uv.x = 1.0-uv.x;
    }
    
    //flip uv y
    if (fy)
    {
        uv.y = 1.0-uv.y;
    }
    
    //return modified uv
    return uv;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Rotate and flip uv
    uv=transformUV(uv, imgR, imgFX, imgFY);

    // Get tile pixel pos from rendered quad uv
    int x = int(((    uv.x) * float(imgW)));
    int y = int(((1.0-uv.y) * float(imgH)));
    
    // Get tile pixel index
    int i = x+y*imgW;
    

    // Get indexed pixel color
    vec3 col = pal[img[i%img.length()]%pal.length()];

    // Get alpha
    float alpha = 1.0;
    if (i==0) alpha=0.0;
    
    // Output to screen
    fragColor = vec4(col,alpha);
}
