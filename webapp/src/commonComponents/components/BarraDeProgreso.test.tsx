import React from 'react';
import {getByTestId, render} from '@testing-library/react';
import '@testing-library/jest-dom'
import LinearDeterminate from "./BarraDeProgreso";

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

describe("Barra de progreso", () => {
    test('Barra de progreso 1', () => {
        const props = {
            progress: 50,
            level: 2,
            widthPercent: 75
        };

        const { getByText, getByRole, getByTestId } = render(<LinearDeterminate {...props} />);

        // Verifica que se renderice el texto del nivel
        const levelText = getByText(/Nivel: 2/i);
        expect(levelText).toBeInTheDocument();

        // Verifica que se renderice el progreso lineal
        const linearProgress = getByRole('progressbar');
        expect(linearProgress).toHaveAttribute('aria-valuenow', '50');
    });
});