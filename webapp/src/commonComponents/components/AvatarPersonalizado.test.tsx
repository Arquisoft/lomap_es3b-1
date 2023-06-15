import React from 'react';
import {render, waitFor} from '@testing-library/react';
import AvatarPersonalizado from './AvatarPersonalizado';
import {getProfilePhoto} from "../../pods/Photo";

jest.mock("../../pods/Photo", () => ({
    getProfilePhoto: () => './img/fondo5.png'
}));

describe('AvatarPersonalizado', () => {
    test('AvatarPersonalizado 1', async () => {
        const levelIcon = './img/level-icon.png';
        render(<AvatarPersonalizado
            levelIcon={levelIcon}/>);
    });
});
