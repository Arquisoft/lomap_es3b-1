import type {Friend, MapType} from "../shared/shareddtypes";
import {fetch, Session} from "@inrupt/solid-client-authn-browser";

import {
    Thing,
    getThing,
    getSolidDataset,
    getUrlAll,
    getStringNoLocale,
    getFile,
    getContentType,
    isRawData,
    getSourceUrl,
    getSolidDatasetWithAcl,
    hasResourceAcl,
    hasAccessibleAcl,
    hasFallbackAcl,
    createAclFromFallbackAcl,
    getResourceAcl, setAgentResourceAccess, setAgentDefaultAccess, saveAclFor, getAgentAccess

} from "@inrupt/solid-client";

import {FOAF} from "@inrupt/vocab-common-rdf"

export async function getUserProfile(webID: string) {
    let profile = webID.split("#")[0];
    let dataSet = await getSolidDataset(profile, {fetch: fetch});
    return getThing(dataSet, webID) as Thing;
}

export async function getFriends(webId: string) {

    let friendURLs = getUrlAll(await getUserProfile(webId), FOAF.knows);
    let friends: Friend[] = [];

    for (let friend of friendURLs) {
        // This solution is very ugly, might need some fixing later...
        if (friend.split("/profile/card").length === 1)
            friend += "profile/card#me";

        let name = getStringNoLocale(
            await getUserProfile(friend),
            FOAF.name
        ) as string;

        if (friend && friend !== webId)
            friends.push({
                name: name,
                webId: friend.split("profile/card#me")[0]
            });

    }
    return friends;
}


export async function getFriendsMapsPOD(session: Session, friends: Friend[]): Promise<MapType[]> {
    let mapas: MapType[] = [];
    let map: MapType;
    if (session.info.isLoggedIn) {

        const fet = session.fetch;

        for (let i = 0; i < friends.length; i++) {

            try {
                let file = await getFile(
                    friends[i].webId + "public/map/",
                    {fetch: fet}
                )

                let fileText = await file.text()

                //Buscamos los mapas guardados

                var nombreMapas: string[] = []

                if (fileText.includes("ldp:contains")) {
                    nombreMapas = fileText.split("ldp:contains")[1].split(";")[0].replaceAll(">", "").replaceAll("<", "").replaceAll(" ", "").split(",");
                }

                if (nombreMapas.length === 0) {
                    return [];
                } else {
                    for (var j = 0; j < nombreMapas.length; j++) {
                        map = await readFileFromPod(friends[i].webId + "/public/map/" + nombreMapas[j], session, nombreMapas[j]);
                        if (map) {
                            mapas.push(map);
                        }
                    }
                }
            } catch (err) {
                console.log("No tienes permisos de lectura de este POD o bien no existe la carpeta");
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
        let fileInfo = JSON.parse(fileText)

        console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
        console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

        return fileInfo;

    } catch (err) {
        return Promise.reject();
    }
}

export async function getFriendsToList(session: Session): Promise<Friend[]> {
    let webId = session.info.webId;
    try {
        let amigos = await getFriends(webId!).then((friendsPromise) => {
            return friendsPromise;
        });

        return amigos;
    } catch (err) {
    }
    return [];
}

export async function changePermissions(friendWebId: string, session: Session, access:any, setAccess:any) {
    // Fetch the SolidDataset and its associated ACLs, if available:
    const myDatasetWithAcl = await getSolidDatasetWithAcl(session.info.webId!.split("/profile")[0] + "/public/map/", { fetch: session.fetch });

    // Obtain the SolidDataset's own ACL, if available,
    // or initialise a new one, if possible:

    let resourceAcl;

    if (!hasResourceAcl(myDatasetWithAcl)) {
        if (!hasAccessibleAcl(myDatasetWithAcl)) {
            throw new Error(
                "The current user does not have permission to change access rights to this Resource."
            );
        }
        if (!hasFallbackAcl(myDatasetWithAcl)) {
            throw new Error(
                "The current user does not have permission to see who currently has access to this Resource."
            );
        }
        resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
    } else {
        resourceAcl = getResourceAcl(myDatasetWithAcl);
    }

    let updatedAcl;

    if (!access) {
        updatedAcl = setAgentResourceAccess(
            resourceAcl,
            friendWebId,
            { read: true, append: false, write: false, control: false }
        );

        updatedAcl = setAgentDefaultAccess(
            updatedAcl,
            friendWebId,
            { read: true, append: false, write: false, control: false }
        )

        setAccess(true);
    } else {
        updatedAcl = setAgentResourceAccess(
            resourceAcl,
            friendWebId,
            { read: false, append: false, write: false, control: false }
        );

        updatedAcl = setAgentDefaultAccess(
            updatedAcl,
            friendWebId,
            { read: false, append: false, write: false, control: false }
        )
        setAccess(false);
    }

    await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: session.fetch });
}

export async function getAmigoAccess(session: Session, webId:any, setAccess:any) {
    try {
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDatasetWithAcl = await getSolidDatasetWithAcl(session.info.webId!.split("/profile")[0] + "/public/map/", { fetch: session.fetch });

        const permisos = getAgentAccess(myDatasetWithAcl, webId)

        if (permisos?.read) {
            setAccess(true);
        } else {
            setAccess(false);
        }
    } catch {
    }
}