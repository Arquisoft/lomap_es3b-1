import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom'
import HelpPage from "./Help";


jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
        session: {
            info: {
                webId: "https://uo282631.inrupt.net/profile/card#me",
                isLoggedIn: false,
            },
        },
    })
}));

test('Help 1', () => {
    // Renderiza el componente
    const {getByText, getByAltText} = render(<HelpPage/>);

    // Verifica que el contenido esperado esté presente en la página
    expect(getByText('Ayuda')).toBeInTheDocument();
    expect(getByText('¡Bienvenido a LoMap, tu herramienta personalizada de mapas locales!')).toBeInTheDocument();
    expect(getByText(/¿Cómo funciona\?/)).toBeInTheDocument();
    expect(getByText(/Gamificación/)).toBeInTheDocument();

    // Verifica que la imagen esté presente en la página
    const coloresImg = getByAltText('colores');
    expect(coloresImg).toBeInTheDocument();
    expect(coloresImg.getAttribute('src')).toBe('colores.png');
});