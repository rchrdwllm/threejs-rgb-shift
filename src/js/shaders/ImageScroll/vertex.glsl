uniform sampler2D uTexture;
uniform vec2 uRGBOffset;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
    position.y = position.y + (sin(uv.x * M_PI) * -offset.y * 2.0);

    return position;
}

void main(){
    vUv = uv;

    vec3 newPosition = deformationCurve(position, uv, uRGBOffset);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}