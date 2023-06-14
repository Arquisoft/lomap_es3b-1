import {CalculateValue} from "./SliderCalculator";

export async function handleChange2Aux(event: any, newValue: number | number[], activeThumb: any, minDistance:any,
                                    setValue2:any, props:any) {
    let valor = CalculateValue(newValue, activeThumb, minDistance);
    if (!Array.isArray(newValue)) {
        return;
    }
    if (!Array.isArray(valor)) {
        return;
    }
    setValue2(valor)
    props.onChange(newValue[0], newValue[1]);
};