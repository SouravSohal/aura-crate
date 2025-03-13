import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { MdBrightnessHigh, MdBrightnessMedium, MdBrightnessLow, MdBrightness1 } from "react-icons/md";

const BrightnessControl = ({ changeBrightness }) => {
    const [activeLevel, setActiveLevel] = useState("Medium");

    const brightnessOptions = [
        { level: "off", label: "Off", icon: <MdBrightness1 /> },
        { level: "low", label: "Low", icon: <MdBrightnessLow /> },
        { level: "Med", label: "Med", icon: <MdBrightnessMedium /> },
        { level: "High", label: "High", icon: <MdBrightnessHigh /> },
    ];

    const handleBrightnessChange = (level) => {
        setActiveLevel(level);
        changeBrightness(level);
    };

    return (
        <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #ff00ff, #00ffff, #00ff00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                }}
            >
                Brightness Control
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                {brightnessOptions.map(({ level, label, icon }) => (
                    <Button
                        key={level}
                        onClick={() => handleBrightnessChange(level)}
                        startIcon={icon}
                        sx={{
                            color: activeLevel === level ? "#fff" : "rgba(255, 255, 255, 0.7)",
                            background: activeLevel === level
                                ? "linear-gradient(90deg, #ff0099, #00ffff)"
                                : "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            transition: "0.3s ease",
                            "&:hover": {
                                background: "linear-gradient(90deg, #00ffff, #ff0099)",
                                transform: "scale(1.05)",
                                boxShadow: "0 0 10px rgba(255, 0, 255, 0.6)",
                            },
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default BrightnessControl;
