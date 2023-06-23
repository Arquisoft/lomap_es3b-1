import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './About';

describe('AboutPage', () => {
    test('renders about content correctly', () => {
        render(<AboutPage />);

        expect(screen.getByText('¿Qué es LOMAP?')).toBeInTheDocument();
        expect(screen.getByText('¿Quíenes somos?')).toBeInTheDocument();


        expect(screen.getByText('LoMap es un sistema de desarrollo de software versátil y personalizable que permite a los ciudadanos crear mapas personalizados, almacenar información sobre lugares de interés y compartir experiencias con amigos. Su objetivo es facilitar la exploración de la ciudad y brindar a los usuarios una herramienta poderosa para descubrir nuevos lugares y establecimientos locales.')).toBeInTheDocument();
        expect(screen.getByText('Lomap_es3b')).toHaveAttribute('href', 'https://github.com/Arquisoft/lomap_es3b');
        expect(screen.getByText('enlace')).toHaveAttribute('href', 'https://github.com/Arquisoft/lomap_es3b-1');

        expect(screen.getByAltText('asw')).toBeInTheDocument();
        expect(screen.getByAltText('asw')).toHaveAttribute('src', 'asw.png');
    });
});
