import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {PlacePOD} from '../../../shared/shareddtypes';
import {useState} from "react";
import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {CustomMarkerIcon} from "../../../pods/Markers";


type MapProps = {
    markers: PlacePOD[];
    funcNewMarker: (p: L.Marker) => void;
    funcSelectedMarker: (p: PlacePOD) => void;
    newMarker: L.Marker | undefined;
    selectedMarker: PlacePOD | undefined;
};

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(30, 30),
    iconAnchor: [15, 30],
    className: 'leaflet-div-icon'
});

function Mapa(props: MapProps): JSX.Element {

    const [showMarkers, setShowMarkers] = useState(true);

    const MapContent = () => {

        useMapEvents({
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
        marker: PlacePOD
    }

    const HideShowLayers = () => {
        const map = useMap();

        map.on('zoomend', function () {
            if (map.getZoom() < 12) {
                setShowMarkers(false);
            } else {
                setShowMarkers(true);
            }
        });

        return null;
    }

    const CustomMarker = function (propsM: markerProps) {
        const map = useMap()

        let icono = CustomMarkerIcon(propsM);

        return (<Marker
                key={propsM.marker.place.name}
                position={[propsM.marker.place.latitude, propsM.marker.place.longitude]}
                icon={icono}
                eventHandlers={{
                    click: (e) => {
                        map.flyTo([propsM.marker.place.latitude, propsM.marker.place.longitude], 14, {
                            animate: true,
                            duration: 1
                        });
                        props.funcSelectedMarker(propsM.marker);
                    },
                }}
            >
            </Marker>
        );
    }

    return (
        <>
            <div className="map">
                <MapContainer center={[43.35485, -5.85123]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent/>
                    {Array.isArray(props.markers) && showMarkers ? props.markers.map((marker) =>
                        <CustomMarker key={marker.id} marker={marker}/>) : <></>}
                    <HideShowLayers/>

                </MapContainer>
            </div>
        </>
    );
}

export default Mapa;