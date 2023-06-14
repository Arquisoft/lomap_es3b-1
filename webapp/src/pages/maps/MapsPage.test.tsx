import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import MapsPage from './MapsPage';

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

describe("Maps page", () => {
    test('Maps page 1', () => {

        render(<MapsPage />);
    });
});