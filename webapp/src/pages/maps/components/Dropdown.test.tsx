import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Dropdown from './Dropdown';
import '@testing-library/jest-dom'

let onChange: (selectedOption: string[]) => void
describe("Dropdown", () => {
    test('Render Dropdown con varios Items', () => {

        const props = {
            items: ["item1", "item2"],
            dropdownTitle: "Items",
            onChange
        };

        render(<Dropdown {...props}/>);
        var labelDropdown = screen.getByLabelText('Items');
        expect(labelDropdown).toBeInTheDocument();
    });
    test('renders dropdown with title and options', () => {
        // Definimos las propiedades para el componente Dropdown
        const dropdownProps = {
            items: ['Option 1', 'Option 2', 'Option 3'],
            dropdownTitle: 'Select Option',
            onChange: jest.fn(),
        };

        // Renderizamos el componente
        const {getByLabelText, getByText} = render(<Dropdown {...dropdownProps} />);

        // Verificamos que el título y las opciones estén presentes en el dropdown
        expect(getByLabelText('Select Option')).toBeInTheDocument();
        expect(getByText('Option 1')).toBeInTheDocument();
        expect(getByText('Option 2')).toBeInTheDocument();
        expect(getByText('Option 3')).toBeInTheDocument();
    });
    test('calls onChange function with selected options', () => {
        // Definimos las propiedades para el componente Dropdown
        const dropdownProps = {
            items: ['Option 1', 'Option 2', 'Option 3'],
            dropdownTitle: 'Select Option',
            onChange: jest.fn(),
        };

        // Renderizamos el componente
        const {getByLabelText, getByText} = render(<Dropdown {...dropdownProps} />);

        // Simulamos la selección de opciones en el dropdown
        fireEvent.mouseDown(getByLabelText('Select Option'));
        fireEvent.click(getByText('Option 1'));
        fireEvent.click(getByText('Option 2'));

        // Verificamos que la función onChange haya sido llamada con las opciones seleccionadas
        expect(dropdownProps.onChange).toHaveBeenCalledWith(['Option 1', 'Option 2']);
    });
});