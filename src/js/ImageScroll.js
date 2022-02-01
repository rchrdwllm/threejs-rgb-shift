import * as THREE from "three";
import images from "./images";
import vertexShader from "./shaders/ImageScroll/vertex.glsl";
import fragmentShader from "./shaders/ImageScroll/fragment.glsl";
import scroll from "./scroll";
import images from "./images";
import { lerp } from "./utils";

let target = 0;
let current = 0;

export default class ImageScroll {
    constructor(element, scene) {
        this.element = element;
        this.scene = scene;
        this.meshDimensions = {
            width: 0,
            height: 0,
        };
        this.texture = new THREE.TextureLoader().load(
            images[element.dataset.img]
        );
        this.meshOffset = new THREE.Vector2(0.0, 0.0);
        this.uniforms = {
            uTexture: {
                value: this.texture,
            },
            uRGBOffset: {
                value: new THREE.Vector2(0.0, 0.0),
            },
            uScaleOffset: {
                value: new THREE.Vector2(0.0, 0.0),
            },
        };

        this.init();
    }

    init() {
        this.addEventListeners();
        this.createMesh();
        this.render();
    }

    addEventListeners() {
        scroll.on("scroll", this.onScroll.bind(this));
    }

    getDimensions() {
        const { width, height, top, left } =
            this.element.getBoundingClientRect();

        this.meshDimensions = {
            width,
            height,
            top,
            left,
        };
    }

    createMesh() {
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
        });
        this.mesh = new THREE.Mesh(geometry, material);

        this.getDimensions();

        const { width, height } = this.meshDimensions;

        this.mesh.scale.set(width, height);

        this.scene.add(this.mesh);
    }

    render() {
        this.getDimensions();

        const { width, height, top, left } = this.meshDimensions;

        this.meshOffset.set(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
        );
        this.mesh.position.set(this.meshOffset.x, this.meshOffset.y);

        requestAnimationFrame(this.render.bind(this));
    }

    onScroll({ scroll }) {
        target = scroll.y;
        current = lerp(current, target, 0.1);

        this.uniforms.uRGBOffset.value.set(0.0, -(target - current) * 0.0003);
        this.uniforms.uScaleOffset.value.set(0.0, current * 0.00005);
    }
}
