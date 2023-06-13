import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import InicioSesion from './InicioSesion';



// And in MyWrapper, you would override useSession with your mock:
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

describe("LogIn button", () => {
    test('LogIn button 1', () => {
        const { getByText } = render(<InicioSesion />);
        const loginButton = getByText('Log In');
        expect(loginButton).toBeInTheDocument();
    });
    test('LogIn button 2', () => {
        const { getByText, getByTestId, queryByTestId } = render(<InicioSesion />);
        const loginButton = getByText('Log In');
        fireEvent.click(loginButton);
        const closeButton = getByText('x');
        fireEvent.click(closeButton);
        const modal = queryByTestId('modal');
        expect(modal).not.toBeInTheDocument();
    });
});