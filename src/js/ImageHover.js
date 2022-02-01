import * as THREE from "three";
import images from "./images";
import vertexShader from "./shaders/ImageHover/vertex.glsl";
import fragmentShader from "./shaders/ImageHover/fragment.glsl";
import { lerp } from "./utils";

let targetX = 0;
let targetY = 0;

export default class ImageHover {
    constructor(elements, scene) {
        this.elements = elements.length ? [...elements] : [elements];
        this.scene = scene;
        this.meshDimensions = [];
        this.mouseOffset = new THREE.Vector2(0.0, 0.0);
        this.textures = this.elements.map((element) => {
            const texture = new THREE.TextureLoader().load(
                images[element.dataset.img],
                (texture) => {
                    this.meshDimensions.push({
                        width: texture.image.width,
                        height: texture.image.height,
                    });
                }
            );

            return texture;
        });
        this.uniforms = {
            uTexture: {
                value: this.textures[0],
            },
            uAlpha: {
                value: 0.0,
            },
            uMouseOffset: {
                value: new THREE.Vector2(0.0, 0.0),
            },
        };
        this.isHovered = false;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.createMesh();
        this.render();
    }

    addEventListeners() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));

        this.elements.forEach((element, index) => {
            element.addEventListener("mouseenter", () =>
                this.onMouseEnter(index)
            );
            element.addEventListener(
                "mouseleave",
                this.onMouseLeave.bind(this)
            );
            element.addEventListener("mouseleave", () => {
                this.uniforms.uAlpha.value = lerp(
                    this.uniforms.uAlpha.value,
                    0.0,
                    0.1
                );
            });
        });
    }

    createMesh() {
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
        });
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.scale.set(1024 / 1.5, 681 / 1.5, 1.0);

        this.scene.add(this.mesh);
    }

    render() {
        this.mouseOffset.set(
            lerp(this.mouseOffset.x, targetX, 0.1),
            lerp(this.mouseOffset.y, targetY, 0.1)
        );
        this.mesh.position.set(
            this.mouseOffset.x - window.innerWidth / 2,
            -this.mouseOffset.y + window.innerHeight / 2,
            0
        );

        this.uniforms.uAlpha.value = this.isHovered
            ? lerp(this.uniforms.uAlpha.value, 1.0, 0.1)
            : lerp(this.uniforms.uAlpha.value, 0.0, 0.1);
        this.uniforms.uMouseOffset.value.set(
            (targetX - this.mouseOffset.x) * 0.0005,
            -(targetY - this.mouseOffset.y) * 0.0005
        );

        requestAnimationFrame(this.render.bind(this));
    }

    onMouseMove(e) {
        targetX = e.clientX;
        targetY = e.clientY;
    }

    onMouseEnter(index) {
        this.uniforms.uTexture.value = this.textures[index];
        this.isHovered = true;
    }

    onMouseLeave() {
        this.isHovered = false;
    }
}
