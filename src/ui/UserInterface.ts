export class UserInterface {
  createMainMenu = () => {
    const mainMenu = document.createElement("div");
    mainMenu.id = "mainMenu";
    mainMenu.style.position = "absolute";
    mainMenu.style.zIndex = "2";
    mainMenu.style.top = "0";
    mainMenu.style.left = "0";
    mainMenu.style.width = "100%";
    mainMenu.style.height = "100%";
    mainMenu.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    mainMenu.style.backgroundImage = "url('./images/krasnayaMashina.jpg')";
    mainMenu.style.backgroundSize = "cover";
    mainMenu.style.backgroundPosition = "center";
    document.body.appendChild(mainMenu);

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
