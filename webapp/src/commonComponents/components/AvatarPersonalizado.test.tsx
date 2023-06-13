import React from 'react';
import {render, waitFor} from '@testing-library/react';
import AvatarPersonalizado from './AvatarPersonalizado';
import {getProfilePhoto} from "../../pods/Photo";

jest.mock('../../pods/Photo');

describe('AvatarPersonalizado', () => {
    test('AvatarPersonalizado 1', () => {
        render(<AvatarPersonalizado
            levelIcon="./img/level-icon.png" />);

        const levelIcon = './img/level-icon.png';
        const src = 'path/to/photo.png';
        const { getByAltText } = render(<AvatarPersonalizado
            levelIcon={levelIcon} />);
        const levelIconElement = getByAltText('Texto alternativo');
        expect(levelIconElement).toHaveAttribute('src', levelIcon);

        const smallAvatar = getByAltText('Texto alternativo');
        const avatar = getByAltText('Texto alternativo');

        expect(smallAvatar).toHaveAttribute('src', levelIcon);
        expect(avatar).toHaveAttribute('src', src);
    });
    test('AvatarPersonalizado 2', () => {
        const levelIcon = 'path/to/levelIcon.png';
        const { getByAltText } = render(<AvatarPersonalizado levelIcon={levelIcon} />);

        const smallAvatar = getByAltText('Texto alternativo');
        const avatar = getByAltText('Texto alternativo');

        expect(smallAvatar).toHaveAttribute('src', levelIcon);
        expect(avatar).toHaveAttribute('src', './img/fondo5.png');
    });
    test('should update the photo state with the fetched photo URL', async () => {
        const getProfilePhotoMock = getProfilePhoto as jest.MockedFunction<typeof getProfilePhoto>;
        const setPhotoMock = jest.fn();
        getProfilePhotoMock.mockResolvedValue('http://example.com/photo.jpg');

        const props = {
            levelIcon: 'http://example.com/level-icon.jpg',
        };

        render(<AvatarPersonalizado {...props} />);

        await waitFor(() => {
            expect(getProfilePhotoMock).toHaveBeenCalled();
            expect(getProfilePhotoMock).toHaveBeenCalledWith('Valor predeterminado');
        });

        expect(setPhotoMock).toHaveBeenCalledWith('http://example.com/photo.jpg');
    });
});
