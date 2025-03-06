const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

let mainWindow;
let selectedHexColor = "ffffff"; // Default color

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
        },
    });

    mainWindow.loadURL("http://localhost:3000");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

// Handle Brightness Change
ipcMain.on("set-brightness", (event, level) => {
    console.log(`Setting brightness to ${level}`);
    exec(`asusctl -k ${level}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`Brightness Set: ${stdout}`);
    });
});

// Handle AURA Mode Change
ipcMain.on("set-aura-mode", (event, mode) => {
    console.log(`Setting AURA mode to ${mode}`);
    exec(`asusctl aura ${mode}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`AURA Mode Set: ${stdout}`);
    });
});

// Store selected color when user selects from the color palette
ipcMain.on("select-aura-color", (event, hex) => {
    console.log(`Color selected: #${hex}`);
    selectedHexColor = hex; // Store the selected color
});

// Apply the selected color only when 'Save Changes' button is clicked
ipcMain.on("save-aura-color", (event) => {
    console.log(`Applying selected color: #${selectedHexColor}`);
    exec(`asusctl aura static -c ${selectedHexColor}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`Color Set: ${stdout}`);
    });
});
