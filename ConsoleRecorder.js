class ConsoleRecorder {
    constructor(displayElementId) {
        this.displayElement = document.getElementById(displayElementId);
        this.overwriteConsoleMethod();
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
        newElement.className = type;
        newElement.textContent = `[${type}] ${message}`;
        this.displayElement.appendChild(newElement);
    }
}
new ConsoleRecorder('console-display');
console.log("Ceci est un message de log.");
console.error("Ceci est un message d'erreur.");