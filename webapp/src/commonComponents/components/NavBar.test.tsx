import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import NavBar from "./NavBar";
import ResponsiveAppBar from "./NavBar";



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

describe("Navbar", () => {
    test('NavBar 1', () => {

        render(<NavBar />);
        const boton = screen.getByText("Mapa");
        expect(boton).toBeInTheDocument();
    });
    test('should show the profile page when the "Profile" button is clicked', () => {
        const { getByLabelText, getByText } = render(<ResponsiveAppBar />);
        const avatarButton = getByLabelText('Open settings');
        fireEvent.click(avatarButton);
        const profileButton = getByText('Profile');
        fireEvent.click(profileButton);
        // Assert that the profile page is shown or navigate to the profile route
    });

    test('should log out the user when the "Log Out" button is clicked', () => {
        const { getByLabelText, getByText } = render(<ResponsiveAppBar />);
        const avatarButton = getByLabelText('Open settings');
        fireEvent.click(avatarButton);
        const logoutButton = getByText('Log Out');
        fireEvent.click(logoutButton);
        // Assert that the user is logged out or check the expected logout behavior
    });
});