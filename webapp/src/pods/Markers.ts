import {Session} from "@inrupt/solid-client-authn-browser";
import {createContainerAt, saveFileInContainer} from "@inrupt/solid-client";
import {getFile, isRawData, getContentType, getSourceUrl} from "@inrupt/solid-client";
import {CommentType, MapType, Place} from "../shared/shareddtypes";
import {getProfileName} from "./Profile";
import {sumarPuntos} from "./Gamification";
import L from "leaflet";
import IconoMonumento from "../assets/icono-monumento.svg";
import IconoBiblioteca from "../assets/icono-biblioteca.svg";
import IconoRestaurante from "../assets/icono-restaurante.svg";
import IconoTienda from "../assets/icono-tienda.svg";
import IconoParking from "../assets/icono-parking.svg";

export async function addMapPOD(session: Session, name: string, file: File, url: string) {
    try {

        //Comprobamos si existe la carpeta de mapas en el POD
        const fet = session.fetch;
        try {
            await getFile(
                url,
                {fetch: fet}
            );
        } catch (error) {

            //En el caso de que la carpeta no exista la creamos para poder añadir los nuevos mapas
            await createContainerAt(url, {fetch: fet});
        }
    } catch (error) {
    }

    //Una vez que o bien la carpeta existe o bien la hemos creado añadimos el nuevo mapa o el mapa modificado
    try {
        await saveFileInContainer(url, file, {
            slug: file.name,
            contentType: file.type,
            fetch: session.fetch
        });
    } catch (error) {
        console.log("Problema al guardar datos en el POD")
    }
}

export async function getMapsPOD(session: Session, url: string): Promise<MapType[]> {
    let mapas: MapType[] = [];
    let map: MapType;
    if (session.info.isLoggedIn) {

        //Buscamos los elementos hijos del contenedor
        const fet = session.fetch;
        const file = await getFile(
            url,               // File in Pod to Read
            {fetch: fet}       // fetch from authenticated session
        );

        let fileText = await file.text()

        //Buscamos los mapas guardados

        var nombreMapas: string[] = []

        if (fileText.includes("ldp:contains")) {
            nombreMapas = fileText.split("ldp:contains")[1].split(";")[0].replaceAll(">", "").replaceAll("<", "").replaceAll(" ", "").split(",");
        }


        //Si no hay ningun mapa devolvemos directamente un array vacio
        //En el caso de que exista algun mapa entonces cojemos y sacamos la informacion de cada mapa y lo añadimos a la lista de mapas a devolver

        if (nombreMapas.length === 0) {
            return [];
        } else {
            for (var i = 0; i < nombreMapas.length; i++) {
                map = await readFileFromPod(url + nombreMapas[i], session, nombreMapas[i]);
                if (map) {
                    mapas.push(map);
                }
            }
        }
    }
    return Promise.resolve(mapas);
}

async function readFileFromPod(fileURL: string, session: Session, name: string): Promise<MapType> {
    try {
        const fet = session.fetch;
        const file = await getFile(
            fileURL,               // File in Pod to Read
            {fetch: fet}       // fetch from authenticated session
        );

        let fileText = await file.text()
        let fileInfo = JSON.parse(fileText);

        console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
        console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

        return fileInfo;

    } catch (err) {
        return Promise.reject();
    }
}

async function guardarEnPOD(place: Place, mapa: MapType, mapName: string, webId: string | undefined, session: Session) {

    let uniqueId = crypto.randomUUID();

    mapa.id = mapName;

    mapa.map.push({
        id: uniqueId,
        place: place,
        owner: mapa.owner,
    })

    var blob = new Blob([JSON.stringify(mapa)], {type: "aplication/json"});
    var file = new File([blob], mapName + ".info", {type: blob.type});

    var mapUrl = webId!.split("/profile")[0] + "/public/map/";

    await addMapPOD(session, mapName, file, mapUrl)
}

type FormProps = {
    mapas: MapType[];
    newPlace: Place | undefined;
    rechargeMarkers: () => void;
}

export async function guardarDatos(webId: string | undefined, props: FormProps, rating: number | undefined,
                                   urlImagenes: string[], submitButton: any, session: Session) {
    //abrir el modal
    let modal = document.getElementById("myModal");
    //cerrar el modal al hacer click en cruz
    let botonCerrar = document.getElementById("closeModal");
    if (botonCerrar !== undefined && botonCerrar !== null) {
        botonCerrar.onclick = function () {
            modal!.style.display = "none";
        }
    }

    //Recuperamos los datos del formulario

    let nombreLugar = (document.getElementById("nombreLugar") as HTMLInputElement).value;
    let dirLugar = (document.getElementById("dirLugar") as HTMLInputElement).value;
    let comentarioLugar = (document.getElementById("commentLugar") as HTMLInputElement).value;
    let categoria = (document.getElementsByName("categoria")[0] as HTMLInputElement).value;
    let mapaSelected = (document.getElementById("mapa_input") as HTMLInputElement).value
    let fotos = (document.getElementById("fotos") as HTMLInputElement).files;

    let idComentario = crypto.randomUUID();

    let name = await getProfileName(webId!);

    let comentario: CommentType = {
        id: idComentario,
        webId: webId!,
        name: name,
        date: new Date(),
        text: comentarioLugar
    }

    let puntuacion = rating;

    if (fotos) {
        const formData = new FormData();
        for (let i = 0; i < fotos!.length; i++) {
            formData.append("file", fotos[i]);
            formData.append("upload_preset", "docs_upload_example_us_preset");
            await fetch('https://api.cloudinary.com/v1_1/demo/image/upload',
                {
                    mode: 'cors',
                    method: "POST",
                    body: formData
                })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    urlImagenes.push(JSON.parse(data)["url"]);
                });
        }
    }

    if (nombreLugar !== "") {
        modal!.style.display = "none";
        props.newPlace!.name = nombreLugar;
        props.newPlace!.direction = dirLugar;
        props.newPlace!.category = categoria;
        if (!comentarioLugar) {
            props.newPlace!.comments = [];
        } else {
            props.newPlace!.comments = [comentario];
        }
        props.newPlace!.photoLink = urlImagenes;
        if (puntuacion != null) {
            props.newPlace!.rating = puntuacion;
        }
    }

    var mapa = props.mapas.find((m) => m.id === mapaSelected && m.owner === webId?.split("profile")[0]);

    if (mapa !== undefined && mapa !== null) {
        await guardarEnPOD(props.newPlace!, mapa, mapaSelected, webId, session);
    } else {
        var x = await getProfileName(webId!);
        if (mapaSelected === undefined || mapaSelected === null || mapaSelected === "") {
            mapaSelected = "NewMap";
        }
        mapa = {id: mapaSelected, map: [], owner: webId!.split("profile")[0], ownerName: x}
        await guardarEnPOD(props.newPlace!, mapa, mapaSelected, webId, session);
    }

    let puntosGanados = 10;
    puntosGanados += fotos!.length * 5;
    if (comentario.text.trim() !== "") {
        puntosGanados += 10;
    }
    await sumarPuntos(session, webId!.split("/profile")[0] + "/public/level.info", puntosGanados);
}

export async function getDirectionFromAPI(lat: number, lng: number, setDir: any) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=` + process.env.REACT_APP_GOOGLE_API_KEY);
    const data = await response.json();
    if (data.status === "OK") {
        const address: string = data.results[0].formatted_address;
        setDir(address)
    } else {
        throw new Error(`Error al obtener la dirección. Status: ${data.status}`);
    }
}

export function CustomMarkerIcon(propsM: any) {
    let icono = undefined;

    let imagen;

    switch (propsM.marker.place.category) {
        case "Monumento":
            imagen = IconoMonumento
            break;
        case "Biblioteca":
            imagen = IconoBiblioteca
            break;
        case "Restaurante":
            imagen = IconoRestaurante
            break;
        case "Tienda":
            imagen = IconoTienda
            break;
        case "Parking":
            imagen = IconoParking
            break;
    }
    icono = new L.Icon({
        iconUrl: imagen,
        iconSize: new L.Point(40, 40),
        iconAnchor: [20, 40],
        className: 'leaflet-div-icon'
    });
    return icono;
}