import {getSolidDataset, getThingAll, getUrlAll} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/lit-generated-vocab-common";

export async function getProfilePhoto(webId: string): Promise<string | undefined> {
    const profileDataset = await getSolidDataset(webId);
    const profileThings = getThingAll(profileDataset);
    const photos = profileThings.flatMap((thing) => getUrlAll(thing, VCARD.hasPhoto));
    return photos[0];
}