import { render, screen } from '@testing-library/react';
import Amigos from './Amigos';

// Creamos datos de prueba para los amigos
const friends = [
    { webId: '1', name: 'Amigo 1' },
    { webId: '2', name: 'Amigo 2' },
    { webId: '3', name: 'Amigo 3' },
];

describe('Amigos', () => {
    test('renderiza correctamente los amigos', () => {
        // Renderizamos el componente con los amigos de prueba
        render(<Amigos friends={friends} />);

        // Comprobamos que se renderizó el título "Amigos"
        const titulo = screen.getByText('Amigos');
        expect(titulo).toBeInTheDocument();

        // Comprobamos que los nombres de los amigos se muestran correctamente
        friends.forEach((friend) => {
            const nombreAmigo = screen.getByText(friend.name);
            expect(nombreAmigo).toBeInTheDocument();
        });
    });
});
