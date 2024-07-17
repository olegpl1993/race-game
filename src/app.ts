import {
  AbstractMesh,
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Shapes } from "./shapes/Shapes";

class App {
  private carMesh: AbstractMesh = null;
  private camera: ArcRotateCamera;

  constructor() {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    let engine = new Engine(canvas, true);
    let scene = new Scene(engine);

    this.camera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      20,
      new Vector3(10, 5, 0),
      scene
    );
    this.camera.attachControl(canvas, true);

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
      console.log("rendering...");
      scene.render();
    });
  }
}
new App();
