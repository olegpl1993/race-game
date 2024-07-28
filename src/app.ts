import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Game } from "./game/Game";
import { openInspector } from "./utils/openInspector";

class App {
  constructor() {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    let engine = new Engine(canvas, true);
    let scene = new Scene(engine);

    const game = new Game();
    game.startGame(engine, scene);

    // hide/show the Inspector Shift+Ctrl+Alt+I
    window.addEventListener("keydown", (e) => openInspector(e, scene));
  }
}
new App();
