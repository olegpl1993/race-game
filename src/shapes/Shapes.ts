import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export class Shapes {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  createSphere({ x, y, z }: { x: number; y: number; z: number }): void {
    const sphere1: Mesh = MeshBuilder.CreateSphere(
      "sphere1",
      { diameter: 1 },
      this.scene
    );
    sphere1.position = new Vector3(x, y, z);
  }

  createCube({ x, y, z }: { x: number; y: number; z: number }): void {
    const cube1: Mesh = MeshBuilder.CreateBox(
      "cube1",
      { width: 1, height: 1, depth: 1 },
      this.scene
    );
    cube1.position = new Vector3(x, y, z);
  }
}
