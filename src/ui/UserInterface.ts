export class UserInterface {
  private userInterface: HTMLDivElement;

  constructor() {
    this.userInterface = document.createElement("div");
    this.userInterface.style.position = "absolute";
    this.userInterface.style.zIndex = "2";
    this.userInterface.style.top = "0";
    this.userInterface.style.left = "0";
    this.userInterface.style.width = "100%";
    this.userInterface.style.height = "100%";
    this.userInterface.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    document.body.appendChild(this.userInterface);
  }

  createMainMenu = () => {
    const mainMenu = document.createElement("div");
    mainMenu.id = "mainMenu";
    mainMenu.style.width = "100%";
    mainMenu.style.height = "100%";
    mainMenu.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    mainMenu.style.backgroundImage = "url('./images/krasnayaMashina.jpg')";
    mainMenu.style.backgroundSize = "cover";
    mainMenu.style.backgroundPosition = "center";
    this.userInterface.appendChild(mainMenu);

    const startButton = document.createElement("button");
    startButton.innerHTML = "START GAME";
    startButton.id = "startButton";
    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    startButton.style.padding = "20px 30px";
    startButton.style.border = "none";
    startButton.style.borderRadius = "10px";
    startButton.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    startButton.style.color = "white";
    startButton.style.fontSize = "24px";
    startButton.style.fontWeight = "bold";
    startButton.style.cursor = "pointer";
    mainMenu.appendChild(startButton);
    startButton.addEventListener("click", () => {
      mainMenu.remove();
    });
  };
}
