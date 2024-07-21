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
import { Track } from "./engine/Track";
import { openInspector } from "./utils/openInspector";

class App {
  private carMesh: AbstractMesh;
  private camera: FollowCamera;
  private control: Control = new Control();
  private carSpeed: number = 0.1;

  constructor() {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    let engine = new Engine(canvas, true);
    let scene = new Scene(engine);
    const track = new Track(scene);
    track.createTrack();

    window.addEventListener("keydown", this.control.handleKeyDown);
    window.addEventListener("keyup", this.control.handleKeyUp);

    this.camera = new FollowCamera("FollowCam", new Vector3(0, 0, 0), scene);
    this.camera.rotationOffset = 180;
    this.camera.heightOffset = 6;
    this.camera.radius = 10;

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    SceneLoader.ImportMesh("", "models/", "car.glb", scene, (meshes) => {
      this.carMesh = meshes[0];
      this.carMesh.position = new Vector3(0, 0, 0);
      this.camera.lockedTarget = this.carMesh;
    });

    // hide/show the Inspector Shift+Ctrl+Alt+I
    window.addEventListener("keydown", (e) => openInspector(e, scene));

    engine.runRenderLoop(() => {
      if (!this.carMesh) return;

      this.carMesh.position.z += this.carSpeed;

      if (this.control.moveLeft && this.carMesh.position.x > -3.5) {
        this.carMesh.position.x -= this.control.speed;
        this.carMesh.rotation = new Vector3(0, 3, 0);
      } else if (this.control.moveRight && this.carMesh.position.x < 3.5) {
        this.carMesh.position.x += this.control.speed;
        this.carMesh.rotation = new Vector3(0, 3.28, 0);
      } else {
        this.carMesh.rotation = new Vector3(0, 3.14, 0);
      }

      scene.render();
    });
  }
}
new App();
