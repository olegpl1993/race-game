import {
  AbstractMesh,
  Engine,
  FollowCamera,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { Collision } from "../engine/Collision";
import { Control } from "../engine/Control";
import { Track } from "./Track";

export class Game {
  private carMesh: AbstractMesh;
  private camera: FollowCamera;
  private carSpeed: number = 0.05;
  private collision: Collision;
  private control = new Control();

  startGame(engine: Engine, scene: Scene) {
    const track = new Track(scene);
    track.createTrack();

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

    engine.runRenderLoop(() => {
      if (!this.carMesh) return;

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

  restartTrack = () => {
    this.carMesh.position = new Vector3(0, 0, 0);
    this.carSpeed = 0.05;
  };
}
