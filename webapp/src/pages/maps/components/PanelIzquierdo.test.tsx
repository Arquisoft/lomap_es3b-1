import React from 'react';
import {render, fireEvent, getAllByText, screen} from '@testing-library/react';
import PanelIzquierdo from './PanelIzquierdo';

describe('PanelIzquierdo', () => {
    const mapas = [
        {id: 'mapa1', map: [], owner: 'user1', ownerName: 'User 1'},
        {id: 'mapa2', map: [], owner: 'user1', ownerName: 'User 1'},
        {id: 'mapa3', map: [], owner: 'user2', ownerName: 'User 2'},
    ];

    const friends = [
        { webId: '1', name: 'Amigo 1' },
        { webId: '2', name: 'Amigo 2' },
        { webId: '3', name: 'Amigo 3' },
    ];

    test('Panel izquierdo', () => {
        const onCategoriaChange = jest.fn();
        const onAmigoChange = jest.fn();
        const onMapaChange = jest.fn();
        const onMinDistanceChange = jest.fn();
        const onButtonClick = jest.fn();

        const { getByText, getByLabelText } = render(
            <PanelIzquierdo
                mapas={mapas}
                friends={friends}
                onCategoriaChange={onCategoriaChange}
                onAmigoChange={onAmigoChange}
                onMapaChange={onMapaChange}
                onMinDistanceChange={onMinDistanceChange}
                onButtonClick={onButtonClick}
            />
        );

        let categorias = screen.getAllByText('Categorias');
        expect(categorias).toHaveLength(2);

        let amigos = screen.getAllByText('Amigos');
        expect(categorias).toHaveLength(2);

        let Mapas = screen.getAllByText('Mapas');
        expect(Mapas).toHaveLength(2);

        let slicer = screen.getByText('Distancia(Km):');
        expect(slicer).toBeInTheDocument();

        let botonAplicar = screen.getByText('Aplicar filtros')
        expect(botonAplicar).toBeInTheDocument();
        fireEvent.click(botonAplicar);
        expect(onButtonClick).toHaveBeenCalled();
    });
});
