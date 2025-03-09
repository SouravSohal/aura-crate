import React, { useState } from "react";
import { Box, Button, Typography, Input } from "@mui/material";

const ColorPicker = ({ applyColor }) => {
    const [selectedColor, setSelectedColor] = useState({ r: 255, g: 255, b: 255 });

    const selectColor = (r, g, b) => {
        setSelectedColor({ r, g, b });
    };

    const hexColor = `#${((1 << 24) | (selectedColor.r << 16) | (selectedColor.g << 8) | selectedColor.b)
        .toString(16)
        .slice(1)}`;

    return (
        <Box sx={{ textAlign: "center", mt: 3 }}>
            {/* Title */}
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
                Custom Color (Only for Static Mode)
            </Typography>

            {/* Color Preview */}
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    background: hexColor,
                    borderRadius: "10px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    margin: "0 auto 10px",
                    transition: "0.3s ease-in-out",
                    boxShadow: `0 0 15px ${hexColor}`,
                }}
            />

            {/* Hex Code */}
            <Typography
                variant="body1"
                sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    mb: 2,
                }}
            >
                {hexColor}
            </Typography>

            {/* Color Picker */}
            <Input
                type="color"
                value={hexColor}
                onChange={(e) => {
                    const hex = e.target.value;
                    const r = parseInt(hex.substring(1, 3), 16);
                    const g = parseInt(hex.substring(3, 5), 16);
                    const b = parseInt(hex.substring(5, 7), 16);
                    selectColor(r, g, b);
                }}
                sx={{
                    width: "60px",
                    height: "40px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "none",
                    background: "none",
                }}
            />

            {/* Apply Button */}
            <Button
                onClick={() => applyColor(selectedColor)}
                sx={{
                    ml: 2,
                    color: "#fff",
                    background: "linear-gradient(90deg, #ff0099, #00ffff)",
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
                Apply
            </Button>
        </Box>
    );
};

export default ColorPicker;
