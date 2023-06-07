import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {CombinedDataProvider, useThing} from "@inrupt/solid-ui-react";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getThingAll, getUrlAll } from "@inrupt/solid-client";

const SmallAvatar = styled(Avatar)(({theme}) => ({
    width: 18,
    height: 18,
    border: `2px solid ${theme.palette.background.paper}`,
}));

async function getProfilePhoto(webId: string): Promise<string | undefined> {
    const profileDataset = await getSolidDataset(webId);
    const profileThings = getThingAll(profileDataset);
    const photos = profileThings.flatMap((thing) => getUrlAll(thing, VCARD.hasPhoto));
    return photos[0]; // Return the first photo URL if available
}

type avatarProps = {
    src?: string;
}

export default function BadgeAvatars(props: avatarProps) {
    const [photo, setPhoto] = React.useState<string | undefined>(undefined);
    let webId: string = props.src ?? "Valor predeterminado";

    getProfilePhoto(webId).then((photoUrl) => {
        setPhoto(photoUrl ?? './img/fondo5.png');
        console.log(photo)
    })

    return (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
            <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={
                    <SmallAvatar alt="Texto alternativo" src='./img/fondo5.png'/>
                }>
                <Avatar alt="Texto alternativo" src={photo || './img/fondo5.png'} />
            </Badge>
        </CombinedDataProvider>
    );
}