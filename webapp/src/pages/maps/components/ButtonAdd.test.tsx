import { render, screen, fireEvent } from '@testing-library/react';
import ButtonAdd from './ButtonAdd';

describe('ButtonAdd', () => {
    it('llama a la función onClick cuando se hace clic en el botón', () => {
        // Creamos una función simulada para el onClick
        const onClick = jest.fn();

        // Renderizamos el componente con la función simulada
        render(<ButtonAdd onClick={onClick} />);

        // Obtenemos el botón por su texto
        const boton = screen.getByText('Prueba');

        // Simulamos el evento de clic en el botón
        fireEvent.click(boton);

        // Verificamos que la función onClick haya sido llamada una vez
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
