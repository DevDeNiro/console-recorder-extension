class ConsoleRecorder {
    constructor() {
        this.createDisplayElement();
        this.overwriteConsoleMethod();
    }

    createDisplayElement() {
        this.displayElement = document.createElement('div');
        this.displayElement.id = 'console-recorder-display';
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
            originalConsoleLog(message);
            this.displayInUI('log', message);
        };

        console.error = (message) => {
            originalConsoleError(message);
            this.displayInUI('error', message);
        };

        console.warn = (message) => {
            originalConsoleWarn(message);
            this.displayInUI('warn', message);
        };

        console.info = (message) => {
            originalConsoleInfo(message);
            this.displayInUI('info', message);
        };

        console.debug = (message) => {
            originalConsoleDebug(message);
            this.displayInUI('debug', message);
        };
    }

    displayInUI(type, message) {
        let newElement = document.createElement('div');
        newElement.className = `console-recorder-card ${type}`;
        newElement.textContent = `[${type}] ${message}`;
        this.displayElement.appendChild(newElement);
    }
}
const consoleRecorder = new ConsoleRecorder();
console.log("Ceci est un message de log.");
console.error("Ceci est un message d'erreur.");