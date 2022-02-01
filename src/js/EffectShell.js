import * as THREE from "three";

export default class EffectShell {
    constructor() {
        this.perspective = 1000;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            (180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
                Math.PI,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        this.init();
    }

    init() {
        this.camera.position.z = this.perspective;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        document.body.appendChild(this.renderer.domElement);

        this.addEventListeners();
        this.render();
    }

    addEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    render() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.updateProjectionMatrix();
    }
}
