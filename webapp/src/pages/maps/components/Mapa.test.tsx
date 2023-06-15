import {render, screen} from "@testing-library/react";
import Mapa from "./Mapa";

describe("Mapa", () => {
    const markers = [
        {
            id: "1",
            owner: "user1",
            place: {
                name: "Lugar 1",
                direction: "Dirección 1",
                latitude: 123.456,
                longitude: 789.012,
                comments: [],
                photoLink: [],
                category: "Restaurante",
                rating: 4.5,
            },
        },
        {
            id: "2",
            owner: "user2",
            place: {
                name: "Lugar 2",
                direction: "Dirección 2",
                latitude: 456.789,
                longitude: 12.345,
                comments: [],
                photoLink: [],
                category: "Monumento",
                rating: 3.8,
            },
        },
    ];

    const newMarker = {
        id: "1",
        owner: "user1",
        place: {
            name: "Lugar 1",
            direction: "Dirección 1",
            latitude: 123.456,
            longitude: 789.012,
            comments: [],
            photoLink: [],
            category: "Restaurante",
            rating: 4.5,
        },
    }

    const mockFuncNewMarker = jest.fn();
    const mockFuncSelectedMarker = jest.fn();

    test("renders map with markers", () => {
        render(
            <Mapa
                markers={markers}
                funcNewMarker={mockFuncNewMarker}
                funcSelectedMarker={mockFuncSelectedMarker}
                newMarker={undefined}
                selectedMarker={newMarker}
            />
        );
    });
});
