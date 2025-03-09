import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import BrightnessControl from "./components/BrightnessControl";
import AuraModeSelector from "./components/AuraModeSelector";
import ColorPicker from "./components/ColorPicker";

function App() {
    const [auraMode, setAuraMode] = useState("static");

    const changeBrightness = (level) => {
        window.electron.ipcRenderer.send("set-brightness", level);
    };

    const changeAuraMode = (mode) => {
        setAuraMode(mode);
        window.electron.ipcRenderer.send("set-aura-mode", mode);
    };

    const applyColor = ({ r, g, b }) => {
        window.electron.ipcRenderer.send(
            "select-aura-color",
            ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
        );
        window.electron.ipcRenderer.send("save-aura-color");
    };

    return (
        <Box
            sx={{
                height: "100vh", // Full viewport height
                overflow: "hidden", // Prevent scrolling
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)",
                color: "#fff",
                padding: 2,
            }}
        >
            {/* Title at the Top */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    background: "linear-gradient(90deg, #ff00ff, #00ffff, #00ff00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                ASUS RGB Keyboard Controller
            </Typography>

            {/* Main Container - Full Width & Equal Space for Components */}
            <Paper
                elevation={8}
                sx={{
                    padding: 4,
                    background: "rgba(30, 30, 40, 0.9)",
                    borderRadius: 2,
                    width: "80%", // Full width
                    maxWidth: "95vw",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5, // Space between components
                }}
            >
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <BrightnessControl changeBrightness={changeBrightness} />
                </Box>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <AuraModeSelector changeAuraMode={changeAuraMode} />
                </Box>
                {auraMode === "static" && (
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <ColorPicker applyColor={applyColor} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default App;
