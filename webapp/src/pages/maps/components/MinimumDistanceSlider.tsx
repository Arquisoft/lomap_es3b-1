import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {CalculateValue} from "../../../pods/SliderCalculator";

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
    const handleChange2 = async (event: any, newValue: number | number[], activeThumb: any) => {
        let valor = CalculateValue(newValue, activeThumb, minDistance);
        if (!Array.isArray(newValue)) {
            return;
        }
        if (!Array.isArray(valor)) {
            return;
        }
        setValue2(valor)
        // Llamamos a la función onChange del componente Filters y le pasamos el valor del primer punto del slider
        props.onChange(newValue[0], newValue[1]);
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
