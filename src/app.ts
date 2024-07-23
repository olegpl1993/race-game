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
import { Collision } from "./engine/Collision";
import { Control } from "./engine/Control";
import { Track } from "./game/Track";
import { openInspector } from "./utils/openInspector";

class App {
  private carMesh: AbstractMesh;
  private camera: FollowCamera;
  private control: Control = new Control();
  private carSpeed: number = 0.1;
  private collision: Collision;

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

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    this.camera = new FollowCamera("FollowCam", new Vector3(0, 0, 0), scene);
    this.camera.rotationOffset = 180;
    this.camera.heightOffset = 6;
    this.camera.radius = 10;

    SceneLoader.ImportMesh("", "models/", "car.glb", scene, (meshes) => {
      this.carMesh = meshes[0];
      this.carMesh.position = new Vector3(0, 0, 0);
      this.camera.lockedTarget = this.carMesh;
      this.collision = new Collision(this.carMesh, track, this.restartTrack);
    });

    // hide/show the Inspector Shift+Ctrl+Alt+I
    window.addEventListener("keydown", (e) => openInspector(e, scene));

    engine.runRenderLoop(() => {
      if (!this.carMesh) return;

      console.log(this.carSpeed);

      if (this.control.moveLeft && this.carMesh.position.x > -3.5) {
        this.carMesh.position.x -= this.control.speed;
        this.carMesh.rotation = new Vector3(0, 3, 0);
      } else if (this.control.moveRight && this.carMesh.position.x < 3.5) {
        this.carMesh.position.x += this.control.speed;
        this.carMesh.rotation = new Vector3(0, 3.28, 0);
      } else {
        this.carMesh.rotation = new Vector3(0, 3.14, 0);
      }

      this.carMesh.position.z += this.carSpeed;
      this.carSpeed += 0.0001;
      this.collision.checkCollision();

      scene.render();
    });
  }

  restartTrack(): void {
    this.carMesh.position = new Vector3(0, 0, 0);
    this.carSpeed = 0.05;
    console.log("restartTrack");
  }
}
new App();
