import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import InicioSesion from './InicioSesion';

describe("LogIn button", () => {
    test('LogIn button 1', () => {
        const { getByText } = render(<InicioSesion />);
        const loginButton = getByText('Log In');
        expect(loginButton).toBeInTheDocument();
    });
    test('LogIn button 2', async () => {
        const {getByText, getByTestId, queryByTestId} = render(<InicioSesion/>);
        const loginButton = getByText('Log In');

        // Simulamos el click en el botón de inicio de sesión
        loginButton.click();

        await waitFor(() => expect(getByText('×')).toBeInTheDocument());

        const closeButton = getByText('×')

        // Simulamos el click en el botón de cierre
        closeButton.click();

        // Verificamos que el modal ya no esté presente después de hacer click en el botón de cierre
        const modalAfterClose = queryByTestId('modal');
        expect(modalAfterClose).not.toBeInTheDocument();
    });

});