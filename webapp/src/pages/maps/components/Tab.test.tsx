import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Tab from './Tab';
import '@testing-library/jest-dom'

let onClick: () => void;

describe("Tab", () => {
    test('Render Icono App', () => {

        let props = {
            title: "Prueba",
            selected: false,
            onClick: jest.fn()
        }

        render(<Tab {...props}/>);
        const tab = screen.getByText(props.title);
        expect(tab).toBeInTheDocument();
    });
    test('calls onClick function when tab is clicked', () => {
        const tabProps = {
            onClick: jest.fn(),
            title: 'Información',
            selected: false,
        };

        // Renderizamos el componente
        const {getByText} = render(<Tab {...tabProps} />);

        // Simulamos un clic en el tab
        fireEvent.click(getByText('Información'));

        // Verificamos que la función onClick haya sido llamada
        expect(tabProps.onClick).toHaveBeenCalled();
    });
});