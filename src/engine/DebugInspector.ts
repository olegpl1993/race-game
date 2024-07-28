import { Scene } from "@babylonjs/core";

export class DebugInspector {
  constructor(scene: Scene) {
    // hide/show the Inspector Shift+Ctrl+Alt+I
    window.addEventListener("keydown", (e) => this.openInspector(e, scene));
  }

  openInspector(event: KeyboardEvent, scene: Scene) {
    if (
      event.shiftKey &&
      event.ctrlKey &&
      event.altKey &&
      event.keyCode === 73
    ) {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show();
      }
    }
  }
}
