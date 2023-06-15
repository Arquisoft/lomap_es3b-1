import {useSession} from '@inrupt/solid-ui-react';
import {useState} from "react";
import ModalFormAñadirLugar from "./components/ModalFormAñadirLugar"
import Info from "./components/Info";
import Mapa from "./components/Mapa";
import './MapsPage.css';
import {PlacePOD, Place, MapType, Friend} from "../../shared/shareddtypes";
import PanelIzquierdo from "./components/PanelIzquierdo";
import {filterByCategory, filterByDistance, filterByFriends, getMarkups} from "../../pods/Map";


function MapsPage(): JSX.Element {
    const [filteredFriends, setFilteredFriends] = useState<Array<Friend>>([]);
    const [maps, setMaps] = useState<Array<MapType>>([]);
    const [selectedMarker, setSelectedMarker] = useState<PlacePOD>();
    const [newMarker, setNewMarker] = useState<L.Marker>();
    const [newPlace, setNewPlace] = useState<Place>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState<Array<PlacePOD>>();
    const [categorias, setCategorias] = useState<string[]>([]);
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const [filteredMaps, setFilteredMaps] = useState<MapType[]>([]);
    const [minDistance, setMinDistance] = useState<number>(0);
    const [maxDistance, setMaxDistance] = useState<number>(30);
    const [onlyOnce, setOnlyOnce] = useState(true);

    const {session} = useSession();

    //De la session sacar el webId
    const {webId} = session.info;

    const centro: [number, number] = [43.35485, -5.85123]

    if (session.info.isLoggedIn && onlyOnce) {
        setOnlyOnce(false);
        getMarkups(setSelectedMarker, setNewPlace, setNewMarker, session, webId, setFilteredFriends, setFriends,
            setMaps, setFilteredMaps, setFilteredPlaces, centro, minDistance, maxDistance, filteredFriends, categorias)
            .catch();
    }

    session.onLogout(() => {
        setMaps([]);
        setFriends([]);
        setFilteredPlaces([]);
    })

    function handleMarkerOnClick(p: PlacePOD): void {
        setNewMarker(undefined);
        setNewPlace(undefined);
        setSelectedMarker(p);
    }

    /**
     * Pone el marcador cuando se hace click en el mapa para mostrar
     */
    function handleNewMarkerOnClick(m: L.Marker): void {
        if (session.info.isLoggedIn) {
            setSelectedMarker(undefined);
            setNewMarker(m);
            setMostrarModal(true);
            let lugar: Place = {
                name: "",
                direction: "",
                latitude: m.getLatLng().lat,
                longitude: m.getLatLng().lng,
                comments: [],
                photoLink: [],
                category: "",
                rating: 0.0
            }
            setNewPlace(lugar);
        }
    }

    const handleCategoriaChange = (selectedOption: string[]) => {
        if (selectedOption.length === 0) {
            setCategorias([]);
        } else {
            setCategorias(selectedOption);
        }

    };

    const handleAmigoChange = (selectedOption: string[]) => {

        let selectedFriends = friends.filter((amigo) => {
            return selectedOption.includes(amigo.name);
        })

        if (selectedFriends.length === 0) {
            setFilteredFriends([]);
        } else {
            setFilteredFriends(selectedFriends);
        }
    };

    const handleMapaChange = (selectedOption: string[]) => {
        let nombres = new Array<string>();
        let nombrePropietario = new Array<string>();

        selectedOption.forEach(mapa => {
            let nomrbes = mapa.split("-")
            nombres.push(nomrbes[0]);
            nombrePropietario.push(nomrbes[1]);
        });

        let selectedMaps = maps.filter((mapa) => {
            return nombres.includes(mapa.id) && nombrePropietario.includes(mapa.ownerName);
        })

        if (selectedOption.length === 0) {
            setFilteredMaps(maps);
        } else {
            setFilteredMaps(selectedMaps);
        }
    };

    const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
        setMinDistance(selectedMinDistance);
        setMaxDistance(selectedMaxDistance);
    };

    const handleButtonClick = () => {

        let filteredMapPlaces: PlacePOD[] = [];

        filteredMaps.forEach((mapa) => {
            if (mapa.map !== undefined) {
                mapa.map.forEach((place) => filteredMapPlaces.push(place));
            }
        });

        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterByFriends(filterByCategory(filteredMapPlaces, categorias), filteredFriends)));
    };

    return (
        <>
            <div className="mapspage">
                {/*Contenido*/}
                <div className="contenido">
                    {/*Contenido menusuperior*/}
                    <div className="left">
                        <PanelIzquierdo
                            mapas={maps}
                            friends={friends}
                            onCategoriaChange={handleCategoriaChange}
                            onAmigoChange={handleAmigoChange}
                            onMapaChange={handleMapaChange}
                            onMinDistanceChange={handleMinDistanceChange}
                            onButtonClick={handleButtonClick}
                        />
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <Mapa markers={filteredPlaces!}
                                  funcNewMarker={(m: L.Marker) => {
                                      handleNewMarkerOnClick(m);
                                  }}
                                  funcSelectedMarker={(m: PlacePOD) => {
                                      handleMarkerOnClick(m);
                                  }}
                                  newMarker={newMarker} selectedMarker={selectedMarker}/>
                        </div>

                        {/*Información*/}
                        <div className="informacion">
                            {selectedMarker && !newMarker ?
                                <Info place={selectedMarker}/> : !selectedMarker && newMarker && mostrarModal ?
                                    <div id="myModal" className="modal">
                                        <div className="modal-content">
                                            <button id="closeModal" type="button" className="close btn btn-primary"
                                                    onClick={() => setMostrarModal(false)} aria-label="Close">
                                                <span>&times;</span>
                                            </button>
                                            <ModalFormAñadirLugar newPlace={newPlace} rechargeMarkers={() => {
                                                getMarkups(setSelectedMarker, setNewPlace, setNewMarker, session, webId, setFilteredFriends, setFriends,
                                                    setMaps, setFilteredMaps, setFilteredPlaces, centro, minDistance, maxDistance, filteredFriends, categorias).catch();
                                            }} mapas={maps!}/>
                                        </div>
                                    </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapsPage;
