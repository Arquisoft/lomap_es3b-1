import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom'
import Modal from "./Modal";


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

describe("Modal", () => {
    test('Modal 1', () => {
        const handleClose = jest.fn(); // Mock de la función handleClose

        const {getByText} = render(
            <Modal handleClose={handleClose}>
                <p>Modal Content</p>
            </Modal>
        );

        // Verifica que se renderice el contenido del modal
        const modalContent = getByText(/Modal Content/i);
        expect(modalContent).toBeInTheDocument();

        // Verifica que se llame a la función handleClose al hacer clic en el botón de cierre
        const closeButton = getByText(/×/i);
        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalled();
    });
});