import {render, screen} from '@testing-library/react';
import MapsPage from './MapsPage';

describe('MapsPage', () => {
    test('renders without error', () => {
        render(<MapsPage/>);
    });

});
