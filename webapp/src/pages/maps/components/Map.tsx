import L from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../../shared/shareddtypes';


type MapProps = {
    markers: Place[];
    funcNewMarker: (p: L.Marker) => void;
    funcSelectedMarker: (p: Place) => void;
    newMarker: L.Marker | undefined;
};

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(30, 30),
    iconAnchor: [15, 30],
    className: 'leaflet-div-icon'
});

function Map(props: MapProps): JSX.Element {

    const MapContent = () => {

        const mapa = useMapEvents({
            click(e) {
                var marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
                props.funcNewMarker(marker);
                marker.setIcon(icon);
            }
        });

        return (
            <>

            </>
        );
    }

    type markerProps = {
        marker: Place
    }



    const CustomMarker = function (propsM: markerProps) {
        const map = useMap()

        let icono = undefined;

        switch (propsM.marker.category) {
            case "Monumento":
                icono = new L.Icon({
                    iconUrl: require('../../../assets/icono-monumento.png'),
                    iconSize: new L.Point(30, 30),
                    iconAnchor: [15, 15],
                    className: 'leaflet-div-icon'
                });
                break;
            case "Biblioteca":
                icono = new L.Icon({
                    iconUrl: require('../../../assets/icono-biblioteca.png'),
                    iconSize: new L.Point(30, 30),
                    iconAnchor: [15, 15],
                    className: 'leaflet-div-icon'
                });
                break;
            case "Restaurante":
                icono = new L.Icon({
                    iconUrl: require('../../../assets/icono-restaurante.png'),
                    iconSize: new L.Point(30, 30),
                    iconAnchor: [15, 15],
                    className: 'leaflet-div-icon'
                });
                break;
            default:
                icono = icon;
                break;
        }

        return (<Marker
            key={propsM.marker.direction}
            position={[propsM.marker.latitude, propsM.marker.longitude]}
            icon={icono}
            eventHandlers={{
                click: (e) => {
                    if (props.newMarker) {
                        map.removeLayer(props.newMarker!);
                    }
                    props.funcSelectedMarker(propsM.marker);
                },
            }}
        >
            <Popup>
                {propsM.marker.direction}
            </Popup>
        </Marker>
        );
    }

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div className="map">
                <MapContainer center={[43.35485, -5.85123]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent />

                    {Array.isArray(props.markers) && props.markers.map((marker) =>
                        <CustomMarker marker={marker} />
                    )}
                </MapContainer>
            </div>
        </>
    );
}

export default Map;