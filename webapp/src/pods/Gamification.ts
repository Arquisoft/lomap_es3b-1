import {Session} from "@inrupt/solid-client-authn-browser";
import {
    createContainerAt,
    getContentType,
    getFile, getSolidDataset,
    getSourceUrl, getThingAll, getUrlAll,
    isRawData, overwriteFile,
    saveFileInContainer
} from "@inrupt/solid-client";
import {LevelType, MapType} from "../shared/shareddtypes";
import {EventEmitter} from 'events';
import rojo from "../pages/maps/components/img/rojo.png";
import azul from "../pages/maps/components/img/azul.png";
import verde from "../pages/maps/components/img/verde.png";
import amarillo from "../pages/maps/components/img/amarillo.png";
import morado from "../pages/maps/components/img/morado.png";
import naranja from "../pages/maps/components/img/naranja.png";
import rosa from "../pages/maps/components/img/rosa.png";
import turquesa from "../pages/maps/components/img/turquesa.png";
import gris from "../pages/maps/components/img/gris.png";
import blanco from "../pages/maps/components/img/blanco.png";

export async function getExp(session: Session, file: File, url: string) {
    console.log("getExp")
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

        let nivel = await readFileFromPod(url + "level.info", session)

        return nivel;
    } catch (error) {
        console.log("Fallo: " + error)
    }
}

export async function readFileFromPod(fileURL: string, session: Session) {
    console.log("readFileFromPod")
    try {

        const fet = session.fetch;
        const file = await getFile(
            fileURL,               // File in Pod to Read
            {fetch: fet}       // fetch from authenticated session
        );

        let fileText = await file.text()
        let fileInfo = JSON.parse(fileText);

        return fileInfo.exp;


    } catch (err) {
        console.log("Fallo " + err)
    }
}

export const eventEmitter = new EventEmitter();

export async function sumarPuntos(session: Session, url: string, puntos: number) {
    console.log("sumarPuntos")
    let puntosActuales = await readFileFromPod(url,
        session);


    let total = parseInt(puntosActuales) + puntos;
    try {
        let level: LevelType = {
            exp: total
        }
        var blob = new Blob([JSON.stringify(level)], {type: "aplication/json"});
        var file = new File([blob], "level" + ".info", {type: blob.type});
        await overwriteFile(url, file, {
            contentType: file.type,
            fetch: session.fetch
        });
        eventEmitter.emit('puntosSumados');
    } catch (error) {
        console.log("Fallo: " + error)
    }
}

export async function imagenNivel(nivel: number | undefined): Promise<string> {
    let color: string;

    switch (nivel) {
        case 1:
            color = rojo;
            break;
        case 2:
            color = azul;
            break;
        case 3:
            color = verde;
            break;
        case 4:
            color = amarillo;
            break;
        case 5:
            color = morado;
            break;
        case 6:
            color = naranja;
            break;
        case 7:
            color = rosa;
            break;
        case 8:
            color = turquesa;
            break;
        case 9:
            color = gris;
            break;
        case 10:
            color = blanco;
            break;
        default:
            if (nivel! > 10) {
                color = blanco;
            } else {
                color = rojo;
            }
            break;
    }
    return color;
}
