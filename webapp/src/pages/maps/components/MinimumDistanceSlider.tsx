import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {handleChange2Aux} from "../../../pods/SliderFunction";

// Valor mínimo de distancia entre los dos puntos del slider
const minDistance = 1;

// Props de la clase MinimumDistanceSlider
type MinimumDistanceSliderProps = {
    value: number;
    onChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
};

// Componente de React para el slider
export default function MinimumDistanceSlider(props: MinimumDistanceSliderProps) {

    // Estado interno del componente para guardar el valor del slider
    const [value2, setValue2] = React.useState([0, 30]);

    // Función que se ejecuta cada vez que cambia el valor del slider
    const handleChange2 = async (event: any, newValue: number | number[], activeThumb: any): Promise<void> => {
        await handleChange2Aux(event, newValue, activeThumb, minDistance, setValue2, props)
            .catch((error: Error) => {
                // Manejar el error aquí si es necesario
            });
    };

    // Renderizar el slider
    return (
        <Box id="slider" sx={{width: 300, paddingTop: 3}}>
            <label>Distancia(Km):</label>
            <Slider
                getAriaLabel={() => 'Distancia'}
                style={{color: "#7C00D4"}}
                defaultValue={50}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                value={value2}
                onChange={handleChange2}
            />
        </Box>
    );
}
