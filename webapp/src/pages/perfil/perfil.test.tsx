import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Perfil from "./perfil";



jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
        session: {
            info: {
                webId: "https://uo282631.inrupt.net/profile/card#me",
                isLoggedIn: true,
            },
        },
    })
}));

describe("perfil", () => {
    test('perfil 1', () => {

        render(<Perfil />);
        const boton = screen.getByText("Mapa");
        expect(boton).toBeInTheDocument();
    });
    test('perfil 2', () => {
        window.open = jest.fn();

        render(<Perfil />);

        const button = screen.getByRole('button', { name: /Página de tu POD/i });
        button.click();

        // Verifica que la función window.open haya sido llamada con el webId
        expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://'), '_blank');
    });
});