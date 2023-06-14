import { Place, MapType, CommentType } from "../../../shared/shareddtypes";
import {addMapPOD, guardarDatos} from "../../../pods/Markers";
import { useSession } from "@inrupt/solid-ui-react";
import { useState } from "react";

import Combobox from "react-widgets/Combobox";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import StarRatings from 'react-star-ratings';

type FormProps = {
    mapas: MapType[];
    newPlace: Place | undefined;
    rechargeMarkers: () => void;
}


function ModalFormAñadirLugar(props: FormProps): JSX.Element {

    const { session } = useSession();
    const { webId } = session.info;
    const [rating, setRating] = useState(0);
    const [dir, setDir] = useState("");
    const [submitButton, setSubmitButton] = useState("POD");
    getDirectionFromAPI(props.newPlace!.latitude, props.newPlace!.longitude).then((data) => { setDir(data) });


    let urlImagenes: string[] = [];

    const categories = [
        'Biblioteca',
        'Monumento',
        'Restaurante',
        'Tienda',
        'Parking'
    ];

    const maps: string[] = [];

    props.mapas.forEach((mapa) => {
        if(session.info.webId != undefined){
            if (mapa.owner === session.info.webId.split("profile")[0]) {
                maps.push(mapa.id)
            }
        }
    })

    async function getDirectionFromAPI(lat: number, lng: number) {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=` + process.env.REACT_APP_GOOGLE_API_KEY);
        const data = await response.json();
        if (data.status === "OK") {
            const address: string = data.results[0].formatted_address;
            return address;
        } else {
            throw new Error(`Error al obtener la dirección. Status: ${data.status}`);
        }
    }

    return (
        <>
            <form id="formAñadirLugar" className='formAñadirLugar' onSubmit={async (e) => {
                e.preventDefault();
                await guardarDatos(webId, props, rating, urlImagenes, submitButton, session);
                props.rechargeMarkers();
            }}>

                <StarRatings
                    rating={rating}
                    name="rating"
                    starRatedColor="orange"
                    starHoverColor="orange"
                    changeRating={setRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="5px"
                />
                <label>Nombre: <input id="nombreLugar" type="text" className="inputForm" required></input></label>
                <label>Dirección: <input id="dirLugar" type="text" className="inputForm" defaultValue={dir} required></input></label>
                <label>Comentario: <input id="commentLugar" type="text" className="inputForm"></input></label>
                <label>Categoría:
                    <DropdownList
                        defaultValue={categories[0]}
                        data={categories}
                        name="categoria"
                        id="categoria"
                    />
                </label>

                <label>Mapa:
                    <Combobox
                        placeholder="Nombre del mapa"
                        defaultValue={maps.length === 0 ? maps[0] : ""}
                        data={maps}
                        name="mapa"
                        id="mapa"
                    />
                </label>

                <label>Fotos:<input type="file" id="fotos" accept="image/png, image/jpeg, image/jpg" multiple></input></label>
                <button id="guardarPOD" className="submit btn btn-primary" name="submitPOD" type="submit" onClick={() => setSubmitButton("POD")}> Añadir POD</button>
                <button id="guardarBBDD" className="submit btn btn-primary" name="submitBBDD" type="submit" onClick={() => setSubmitButton("BBDD")}> Añadir BBDD</button>
            </form>

        </>
    )

}

export default ModalFormAñadirLugar;