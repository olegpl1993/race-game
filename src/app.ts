import {
  AbstractMesh,
  Engine,
  FollowCamera,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Control } from "./engine/Control";
import { Shapes } from "./shapes/Shapes";

class App {
  private carMesh: AbstractMesh;
  private camera: FollowCamera;
  private control: Control = new Control();

  constructor() {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    let engine = new Engine(canvas, true);
    let scene = new Scene(engine);

    window.addEventListener("keydown", this.control.handleKeyDown);
    window.addEventListener("keyup", this.control.handleKeyUp);

    this.camera = new FollowCamera("FollowCam", new Vector3(0, 0, 0), scene);
    this.camera.heightOffset = 10;
    this.camera.radius = 10;
    this.camera.rotationOffset = 180;

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    SceneLoader.ImportMesh("", "models/", "platform.glb", scene, (meshes) => {
      meshes[0].position = new Vector3(0, 0, 0);
      for (let i = 1; i <= 100; i++) {
        let newPlatform = meshes[0].clone(`platform_${i}`, null);
        if (newPlatform) newPlatform.position = new Vector3(0, 0, i * 5);
      }
    });

    SceneLoader.ImportMesh("", "models/", "car.glb", scene, (meshes) => {
      this.carMesh = meshes[0];
      this.carMesh.position = new Vector3(0, 0, 0);
      this.camera.lockedTarget = this.carMesh;
    });

    const shapes = new Shapes(scene);
    shapes.createCube({ x: 2, y: 0.5, z: 0 });

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    engine.runRenderLoop(() => {
      if (this.carMesh) this.carMesh.position.z += 0.01;
      if (this.carMesh) this.carMesh.position.z += 0.01;

      if (this.control.moveLeft && this.carMesh.position.x > -3.5) {
        this.carMesh.position.x -= this.control.speed;
      }
      if (this.control.moveRight && this.carMesh.position.x < 3.5) {
        this.carMesh.position.x += this.control.speed;
      }

      scene.render();
    });
  }
}
new App();
