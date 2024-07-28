import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { DebugInspector } from "./engine/DebugInspector";
import { Game } from "./game/Game";
import { UserInterface } from "./ui/UserInterface";

class App {
  private game: HTMLCanvasElement;
  constructor() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    const userInterface = new UserInterface();
    userInterface.createMainMenu();

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    const game = new Game();

    document.getElementById("startButton")?.addEventListener("click", () => {
      game.startGame(engine, scene);
    });

    new DebugInspector(scene);
  }
}

new App();
