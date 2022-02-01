varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uRGBOffset;

vec2 scaleUV(vec2 uv,float scale) {
   float center = 0.5;

   return ((uv - center) * (scale - abs(uRGBOffset.y * 3.0))) + center;
}

void main() {
   float r = texture2D(uTexture, scaleUV(vUv, 1.0) + (uRGBOffset * 1.0)).r;
   float g = texture2D(uTexture, scaleUV(vUv, 1.0)).g;
   float b = texture2D(uTexture, scaleUV(vUv, 1.0)).b;

   gl_FragColor = vec4(r, g, b, 1.0);
}