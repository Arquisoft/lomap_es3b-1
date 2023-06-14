import {render, fireEvent, screen} from '@testing-library/react';
import ModalFormAñadirLugar from './ModalFormAñadirLugar';


test('should render and handle form submission', async () => {
    const mapas = [
        {id: 'mapa1', map: [], owner: 'user1', ownerName: 'User 1'},
        {id: 'mapa2', map: [], owner: 'user1', ownerName: 'User 1'},
        {id: 'mapa3', map: [], owner: 'user2', ownerName: 'User 2'},
    ];
    const newPlace = {
        name: 'New Place',
        latitude: 40.7128,
        longitude: -74.0060,
        direction: '',
        category: '',
        comments: [],
        photoLink: [],
        rating: 0,
    };
    const rechargeMarkersMock = jest.fn();

    render(
        <ModalFormAñadirLugar mapas={mapas} newPlace={newPlace} rechargeMarkers={rechargeMarkersMock}/>
    );

    // Fill in form fields
    fireEvent.input(screen.getByLabelText('Nombre:'), {target: {value: 'Test Place'}});
    fireEvent.input(screen.getByLabelText('Dirección:'), {target: {value: 'Test Address'}});
    fireEvent.input(screen.getByLabelText('Comentario:'), {target: {value: 'Test Comment'}});
    fireEvent.change(screen.getByLabelText('Mapa:'), {target: {value: 'mapa2'}});

    // Mock API calls
    global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({status: 'OK', results: [{formatted_address: 'Test Address'}]}),
        })
    );
    global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify({url: 'https://example.com/image.jpg'})),
        })
    );

    let botonAñadir = screen.getByText('Añadir POD');

    expect(botonAñadir).toBeInTheDocument();

});
