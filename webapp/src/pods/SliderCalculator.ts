export function CalculateValue(newValue:number|number[], activeThumb:any, minDistance:number) {
    let valor;
    if (!Array.isArray(newValue)) {
        return;
    }
    // Si la distancia entre los dos puntos del slider es menor que minDistance
    if (newValue[1] - newValue[0] < minDistance) {

        // Si el pulgar activo es el primero (izquierdo)
        if (activeThumb === 0) {

            // Calcular el valor mínimo que puede tomar el primer pulgar
            const clamped = Math.min(newValue[0], 100 - minDistance);

            // Establecer los valores del slider para que la distancia sea igual a minDistance
            valor= ([clamped, clamped + minDistance]);

        } else {// Si el pulgar activo es el segundo (derecho)

            // Calcular el valor máximo que puede tomar el segundo pulgar
            const clamped = Math.max(newValue[1], minDistance);

            // Establecer los valores del slider para que la distancia sea igual a minDistance
            valor = ([clamped - minDistance, clamped]);
        }

    } else {// Si la distancia entre los dos puntos del slider es mayor o igual que minDistance

        // Establecer el nuevo valor del slider
        valor = (newValue);
    }

    return valor;
}