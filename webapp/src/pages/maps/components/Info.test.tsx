import React from 'react';
import {fireEvent, getAllByAltText, getByText, render, screen} from '@testing-library/react';
import Info from './Info';
import {CommentType, PlacePOD} from "../../../shared/shareddtypes";
import Comment from "./Comment";

describe('Info', () => {
    const place: PlacePOD = {
        id: '1',
        owner: 'John Doe',
        place: {
            name: 'Restaurant',
            direction: '123 Main St',
            category: 'Food',
            latitude: 40.7128,
            longitude: -74.0060,
            rating: 4.5,
            photoLink: ['image1.jpg', 'image2.jpg'],
            comments: [
                { id: '1', name: 'Jane Smith', webId: 'jane@example.com', date: new Date(), text: 'Great place!' },
                { id: '2', name: 'Mike Tyson', webId: 'mike@example.com', date: new Date(), text: 'Amazing food!' },
            ],
        },
    };


    test('Render Icono App', () => {


        render(<Info place={place}/>);
        const nombre = screen.getAllByText("Información");
        expect(nombre.length).toBe(2)
        expect(screen.getByText('Restaurant')).toBeInTheDocument();
    });

    test('renders image', () => {
        render(<Info place={place} />);
        const imagenes = screen.getByText('Imágenes')
        expect(imagenes).toBeInTheDocument();

        fireEvent.click(imagenes)

        const images = screen.getAllByAltText('Imagen Aleatoria');
        expect(images).toHaveLength(2);
    });

    test('renders comments', () => {
        render(<Info place={place} />);
        const Comentarios = screen.getByText('Comentarios')
        expect(Comentarios).toBeInTheDocument();

        fireEvent.click(Comentarios)

        const comentario = screen.getByText('Jane Smith');
        expect(comentario).toBeInTheDocument();
    });
});
