class ConsoleRecorder {
  constructor() {
    this.createDisplayElement();
    this.overwriteConsoleMethod();
  }

  createDisplayElement() {
    this.displayElement = document.createElement("div");
    this.displayElement.id = "console-recorder-display";
    this.displayElement.style = "console-recorder-display";
    document.body.appendChild(this.displayElement);
  }

  overwriteConsoleMethod() {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleInfo = console.info;
    const originalConsoleDebug = console.debug;

    console.log = (message) => {
      originalConsoleLog.call(console, message);
      this.displayInUI("log", message);
    };

    console.error = (message) => {
      originalConsoleError.call(console, message);
      this.displayInUI("error", message);
    };

    console.warn = (message) => {
      originalConsoleWarn.call(console, message);
      this.displayInUI("warn", message);
    };

    console.info = (message) => {
      originalConsoleInfo.call(console, message);
      this.displayInUI("info", message);
    };

    console.debug = (message) => {
      originalConsoleDebug.call(console, message);
      this.displayInUI("debug", message);
    };
  }

  displayInUI(type, message) {
    let newElement = document.createElement("div");
    newElement.className = `console-recorder-card ${type}`;
    newElement.textContent = `[${type}] ${message}`;
    this.displayElement.appendChild(newElement);

    chrome.runtime.sendMessage(
      {type: type, message: message},
      function (response) {
        console.log("Received response: ", response);
      }
    );
  }
}
const consoleRecorder = new ConsoleRecorder();

/*
    L'objectif de cette extension est de creer un  element HTML qui affiche les messages de la console. Pour cela, nous allons creer une classe ConsoleRecorder qui va creer un element HTML
    et qui va surcharger les methodes de la console pour afficher les messages dans cet element. Cependant, pour capturer les logs des scripts de la page hôte,
    c'est plus complexe car on ne peut pas simplement surcharger console.log dans le contexte de la page depuis un script de contenu en raison de l'isolation du contexte.
    Ainsi, comment faire communiquer les messages de la page hote vers l'extension creer ?
*/
