import {Session} from "@inrupt/solid-client-authn-browser";
import {
    createContainerAt,
    getContentType,
    getFile,
    getSourceUrl,
    isRawData,
    saveFileInContainer
} from "@inrupt/solid-client";
import {MapType} from "../shared/shareddtypes";

export async function getExp(session: Session, file: File, url: string) {
    try {

        //Comprobamos si existe la carpeta de mapas en el POD
        const fet = session.fetch;
        try{
            await getFile(
                url,
                { fetch: fet }
            );
        }catch(error){
            //En el caso de que la carpeta no exista la creamos para poder añadir los nuevos mapas
            await createContainerAt(url, { fetch: fet });
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
    try {
        const fet = session.fetch;
        const file = await getFile(
            fileURL,               // File in Pod to Read
            { fetch: fet }       // fetch from authenticated session
        );

        let fileText = await file.text()
        let fileInfo = JSON.parse(fileText);

        return fileInfo.exp;

    } catch (err) {
        console.log("Fallo " + err)
        return Promise.reject();
    }
}