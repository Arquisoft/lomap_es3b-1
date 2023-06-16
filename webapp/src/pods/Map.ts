import {MapType, PlacePOD} from "../shared/shareddtypes";
import {getMapsPOD} from "./Markers";
import {getFriends, getFriendsMapsPOD} from "./Friends";

export function containsMap(MapsList: MapType[], mapa: MapType) {

    if (MapsList === undefined || MapsList === null || MapsList.length === 0) {
        return 0;
    }

    for (let i = 0; i < MapsList.length; i++) {
        if (MapsList[i].id === mapa.id && MapsList[i].owner === mapa.owner) {
            return true;
        }
    }
    return false;
}

export async function getMarkups(setSelectedMarker: any, setNewPlace: any, setNewMarker: any, session: any, webId: any,
                                 setFilteredFriends: any, setFriends: any, setMaps: any, setFilteredMaps: any,
                                 setFilteredPlaces: any, centro: any, minDistance: any, maxDistance: any,
                                 filteredFriends: any, categorias: any) {

    //Asignar a un array el resultado de llamar a getMarkersPOD()
    setSelectedMarker(undefined);
    setNewPlace(undefined);
    setNewMarker(undefined);

    let mapasTotales: MapType[] = [];
    let placesTotales: PlacePOD[] = [];

    try {
        let mapasPropios: MapType[] = await getMapsPOD(session, webId!.split("/profile")[0] + "/public/map/");

        mapasPropios.forEach((mapa) => {
            if (!containsMap(mapasTotales, mapa)) {
                mapasTotales.push(mapa);
                mapa.map.forEach((place) => placesTotales.push(place));
            }
        })
    } catch (err) {
    }

    try {
        //Sacamos a nuestros amigos
        let amigos = await getFriends(webId!).then((friendsPromise) => {
            return friendsPromise;
        });

        //Establecemos los amigos
        setFilteredFriends([]);
        setFriends(amigos);

        try {
            //Sacamos los mapas de los amigos
            let mapasAmigos = await getFriendsMapsPOD(session, amigos);

            mapasAmigos.forEach((mapa) => {
                if (!containsMap(mapasTotales, mapa)) {
                    mapasTotales.push(mapa);

                    mapa.map.forEach((place) => {
                        placesTotales.push(place);
                    })
                }
            });
        } catch (err) {
        }


    } catch (err) {
    }

    //Establecemos los mapas
    setMaps(mapasTotales);
    setFilteredMaps(mapasTotales);

    //Establecemos los lugares
    setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterByFriends(filterByCategory(placesTotales, categorias), filteredFriends)));
}

export function filterByDistance(center: [number, number], radiusInner: number, radiusOuter: number, places: PlacePOD[]): PlacePOD[] {
    const [centerLat, centerLng] = center;
    const result = places.filter(place => {
        const {latitude, longitude} = place.place;
        const distance = calculateDistance(centerLat, centerLng, latitude, longitude);
        return distance >= radiusInner && distance <= radiusOuter;
    });
    return result;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en kilómetros
    return d;
}

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function filterByFriends(places: PlacePOD[], filteredFriends: any): PlacePOD[] {
    if (places !== undefined && places !== null) {
        if (filteredFriends.length === 0) {
            return places;
        } else {
            return places.filter((place) => {
                for (let i = 0; i < filteredFriends.length; i++) {
                    if (filteredFriends[i].webId === place.owner) {
                        return true;
                    }
                }
                return false;
            });
        }
    } else {
        return [];
    }
}

export function filterByCategory(places: PlacePOD[], categorias: any) {
    if (places !== undefined && places !== null) {
        if (categorias.length === 0) {
            return places;
        } else {
            return places.filter((place) => {
                const categoryMatch = categorias.includes(place.place.category);
                return categoryMatch;
            });
        }
    } else {
        return [];
    }
}