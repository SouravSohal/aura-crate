import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, Box, Typography} from "@mui/material";
import {MdLooksOne, MdWaves, MdBlurOn, MdBrightnessAuto, MdColorLens} from "react-icons/md";

const auraModes = [
    {value: "static", label: "Static", icon: <MdLooksOne/>},
    {value: "breathe", label: "Breathe", icon: <MdBlurOn/>},
    {value: "rainbow-cycle", label: "Rainbow Cycle", icon: <MdColorLens/>},
    {value: "rainbow-wave", label: "Rainbow Wave", icon: <MdWaves/>},
    {value: "pulse", label: "Pulse", icon: <MdBrightnessAuto/>},
];

const AuraModeSelector = ({changeAuraMode}) => {
    const [selectedMode, setSelectedMode] = useState("static");

    const handleChange = (event) => {
        const mode = event.target.value;
        setSelectedMode(mode);
        changeAuraMode(mode);
    };

    return (
        <Box sx={{textAlign: "center", mt: 3, width: "100%"}}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #ff00ff, #00ffff, #00ff00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                }}
            >
                Select Aura Mode
            </Typography>

            {/* Current Mode Display */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #ff00ff, #00ffff, #00ff00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                }}
            >
                Current Mode: {auraModes.find((mode) => mode.value === selectedMode)?.label}
            </Typography>

            {/* Mode Selector */}
            <FormControl
                fullWidth
                sx={{
                    minWidth: 200,
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 1,
                    "& label": {color: "#fff"},
                    "& .MuiSelect-select": {
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                    },
                    "& fieldset": {borderColor: "rgba(255, 255, 255, 0.3)"},
                    "&:hover fieldset": {borderColor: "rgba(255, 255, 255, 0.6)"},
                }}
            >
                <InputLabel>AURA Mode</InputLabel>
                <Select value={selectedMode} onChange={handleChange}>
                    {auraModes.map(({value, label, icon}) => (
                        <MenuItem key={value} value={value}>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                {icon} {label}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default AuraModeSelector;
