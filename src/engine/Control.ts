export class Control {
  public moveLeft: boolean = false;
  public moveRight: boolean = false;
  public speed: number = 0.1;

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      this.moveLeft = true;
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      this.moveRight = true;
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      this.moveLeft = false;
    }
    if (event.key === "ArrowRight" || event.key === "d") {
      this.moveRight = false;
    }
  };
}
