import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { DebugInspector } from "./engine/DebugInspector";
import { Game } from "./game/Game";

class App {
  constructor() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const game = new Game();
    game.startGame(engine, scene);

    new DebugInspector(scene);
  }
}

new App();
