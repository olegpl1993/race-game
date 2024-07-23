import { AbstractMesh } from "@babylonjs/core";
import { Track } from "../game/Track";

export class Collision {
  private initialFrame = true;

  constructor(
    private carMesh: AbstractMesh,
    private track: Track,
    private restartTrack: () => void
  ) {}

  checkCollision = () => {
    if (this.initialFrame) {
      this.initialFrame = false;
      return;
    }

    if (
      this.track.cubes.some((cube) => cube.intersectsMesh(this.carMesh, true))
    ) {
      this.restartTrack();
    }
  };
}
