import { Scene } from "@babylonjs/core";

export function openInspector(event: KeyboardEvent, scene: Scene) {
  if (event.shiftKey && event.ctrlKey && event.altKey && event.keyCode === 73) {
    if (scene.debugLayer.isVisible()) {
      scene.debugLayer.hide();
    } else {
      scene.debugLayer.show();
    }
  }
}
