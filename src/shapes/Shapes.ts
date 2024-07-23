import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export class Shapes {
  constructor(private scene: Scene) {}

  createSphere = ({ x, y, z }: { x: number; y: number; z: number }): Mesh => {
    const sphere: Mesh = MeshBuilder.CreateSphere(
      "sphere1",
      { diameter: 1 },
      this.scene
    );
    sphere.position = new Vector3(x, y, z);
    return sphere;
  }

  createCube = ({ x, y, z }: { x: number; y: number; z: number }): Mesh => {
    const cube: Mesh = MeshBuilder.CreateBox(
      "cube1",
      { width: 1, height: 1, depth: 1 },
      this.scene
    );
    cube.position = new Vector3(x, y, z);
    return cube;
  }
}
