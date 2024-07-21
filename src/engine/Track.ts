import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Shapes } from "../shapes/Shapes";

export class Track {
  private shapes: Shapes;
  private scene: Scene;

  constructor(scene: Scene) {
    this.shapes = new Shapes(scene);
  }

  createTrack(): void {
    SceneLoader.ImportMesh(
      "",
      "models/",
      "platform.glb",
      this.scene,
      (meshes) => {
        meshes[0].position = new Vector3(0, 0, 0);
        for (let i = 1; i <= 200; i++) {
          let newPlatform = meshes[0].clone(`platform_${i}`, null);
          if (newPlatform) newPlatform.position = new Vector3(0, 0, i * 5);

          if (Math.random() > 0.7) {
            this.shapes.createCube({
              x: Math.floor(Math.random() * 7) - 3,
              y: 0.5,
              z: i * 5,
            });
          }
        }
      }
    );
  }
}
