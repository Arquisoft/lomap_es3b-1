import React from 'react';
import {render, fireEvent, waitFor, screen, getByRole} from '@testing-library/react';
import Amigo from './Amigo';
import {SessionProvider} from "@inrupt/solid-ui-react";
import userEvent from "@testing-library/user-event";

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

test('renders Amigo component', async () => {
    const mockWebId = 'https://uo282631.inrupt.net'; // Mock del webId
    const mockSession = {
        info: {
            webId: mockWebId,
        },
        fetch: jest.fn(), // Mock de la función fetch
    };

    render(<Amigo name="John Doe" webId={mockWebId}/>);
    const user = screen.getByText('John Doe');
    expect(user).toBeInTheDocument();

    const amigoButton = screen.getByRole('button')
    expect(amigoButton).toHaveClass('red');

});
