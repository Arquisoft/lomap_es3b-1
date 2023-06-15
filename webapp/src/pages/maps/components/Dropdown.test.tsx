import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
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
});