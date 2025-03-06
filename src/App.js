import { useState } from "react";

function App() {
    const [auraMode, setAuraMode] = useState("static");
    const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
    const [selectedColor, setSelectedColor] = useState({ r: 255, g: 255, b: 255 });

    // Change Brightness
    const changeBrightness = (level) => {
        window.electron.ipcRenderer.send("set-brightness", level);
    };

    // Change AURA Mode
    const changeAuraMode = (mode) => {
        setAuraMode(mode);
        window.electron.ipcRenderer.send("set-aura-mode", mode);
    };

    // Store selected color without applying it immediately
    const selectColor = (r, g, b) => {
        setSelectedColor({ r, g, b });
    };

    // Apply the selected color when clicking the "Apply" button
    const applyColor = () => {
        setColor(selectedColor);
        const { r, g, b } = selectedColor;
        window.electron.ipcRenderer.send("select-aura-color", ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1));
        window.electron.ipcRenderer.send("save-aura-color");
    };

    return (
        <div>
            <h1>ASUS RGB Keyboard Controller</h1>

            <h2>Brightness Control</h2>
            <button onClick={() => changeBrightness("off")}>Off</button>
            <button onClick={() => changeBrightness("low")}>Low</button>
            <button onClick={() => changeBrightness("Medium")}>Medium</button>
            <button onClick={() => changeBrightness("High")}>High</button>

            <h2>AURA RGB Modes</h2>
            <button onClick={() => changeAuraMode("static")}>Static</button>
            <button onClick={() => changeAuraMode("breathe")}>Breathe</button>
            <button onClick={() => changeAuraMode("rainbow-cycle")}>Rainbow Cycle</button>
            <button onClick={() => changeAuraMode("rainbow-wave")}>Rainbow Wave</button>
            <button onClick={() => changeAuraMode("pulse")}>Pulse</button>

            {auraMode === "static" && (
                <>
                    <h2>Custom Color (Only for Static Mode)</h2>
                    <input
                        type="color"
                        value={`#${((1 << 24) | (selectedColor.r << 16) | (selectedColor.g << 8) | selectedColor.b).toString(16).slice(1)}`}
                        onChange={(e) => {
                            const hex = e.target.value;
                            const r = parseInt(hex.substring(1, 3), 16);
                            const g = parseInt(hex.substring(3, 5), 16);
                            const b = parseInt(hex.substring(5, 7), 16);
                            selectColor(r, g, b);
                        }}
                    />
                    <button onClick={applyColor} style={{ marginLeft: "10px" }}>Apply</button>
                </>
            )}
        </div>
    );
}

export default App;
