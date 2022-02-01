varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uMouseOffset;
uniform float uAlpha;

vec2 scaleUV(vec2 uv,float scale) {
   float center = 0.5;

   return ((uv - center) * (scale - abs(uMouseOffset.x + uMouseOffset.y))) + center;
}

void main() {
   float r = texture2D(uTexture, scaleUV(vUv, 1.0) + (uMouseOffset * 0.3)).r;
   float g = texture2D(uTexture, scaleUV(vUv, 1.0)).g;
   float b = texture2D(uTexture, scaleUV(vUv, 1.0)).b;

   gl_FragColor = vec4(r, g, b, uAlpha);
}