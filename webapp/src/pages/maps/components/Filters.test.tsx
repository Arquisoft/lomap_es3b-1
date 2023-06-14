import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import Filters from './Filters';
import '@testing-library/jest-dom'
import { MapType, Friend } from '../../../shared/shareddtypes';

let onButtonClick: () => void;
let onCategoriaChange: (selectedOption: string[]) => void;
let onAmigoChange: (selectedOption: string[]) => void;
let onMapaChange: (selectedOption:string[])=> void;
let onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;

const  map:MapType = {
    id: "MapaPrueba",
    owner: "",
    map: [],
    ownerName: ""
}

const  friend:Friend = {
    name : "AmigoPrueba",
    webId : "",
}



test('Render Icono App', () => {



    render(<Filters
        mapas={[map]}
        friends={[friend]}
        onCategoriaChange={jest.fn()}
        onAmigoChange={jest.fn()}
        onMapaChange={jest.fn()}
        onMinDistanceChange={jest.fn()}
        onButtonClick={onButtonClick} />);

    var labelCategorias = screen.getByLabelText('Amigos')
    expect(labelCategorias).toBeInTheDocument();

    /*
    const dropdownAmigos = screen.getByLabelText('Amigos');
    fireEvent.click(dropdownButton);
    let option1 = screen.getByText('MapaPrueba');
    expect(option1).toBeInTheDocument();

    const dropdownAmigo = screen.getByRole('Amigos');
    fireEvent.click(dropdownAmigo);
    option1 = screen.getByText('AmigoPrueba');
    expect(option1).toBeInTheDocument();
    */
});

test('llama a la función de botón al hacer clic en el botón', () => {
    // Creamos una función simulada para el clic en el botón
    const onButtonClick = jest.fn();

    // Renderizamos el componente con la función simulada
    render(
        <Filters
            mapas={[map]}
            friends={[friend]}
            onCategoriaChange={jest.fn()}
            onAmigoChange={jest.fn()}
            onMapaChange={jest.fn()}
            onMinDistanceChange={jest.fn()}
            onButtonClick={onButtonClick}
        />
    );

    // Obtenemos el botón por su texto
    const boton = screen.getByText('Aplicar filtros');

    // Simulamos el evento de clic en el botón
    fireEvent.click(boton);

    // Verificamos que la función de botón haya sido llamada una vez
    expect(onButtonClick).toHaveBeenCalledTimes(1);
});