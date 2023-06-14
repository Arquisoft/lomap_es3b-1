import {getSolidDataset, getThingAll, getUrlAll} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/lit-generated-vocab-common";

export async function getProfilePhoto(webId: string, setPhoto: any) {
    const profileDataset = await getSolidDataset(webId);
    const profileThings = getThingAll(profileDataset);
    const photos = profileThings.flatMap((thing) => getUrlAll(thing, VCARD.hasPhoto));
    setPhoto(photos[0]);
}