import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import NavBar from "./NavBar";
import ResponsiveAppBar from "./NavBar";
import {BrowserRouter} from "react-router-dom";


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
        render(
            <BrowserRouter>
                <ResponsiveAppBar/>
            </BrowserRouter>);
        const boton = screen.getByText("Mapa");
        expect(boton).toBeInTheDocument();
    });
});