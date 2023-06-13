import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {CombinedDataProvider, useThing} from "@inrupt/solid-ui-react";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getThingAll, getUrlAll } from "@inrupt/solid-client";
import {getProfilePhoto} from "../../pods/Photo";

const SmallAvatar = styled(Avatar)(({theme}) => ({
    width: 18,
    height: 18,
    border: `2px solid ${theme.palette.background.paper}`,
}));



type avatarProps = {
    src?: string;
    levelIcon: string;
}

export default function BadgeAvatars(props: avatarProps) {
    const [photo, setPhoto] = React.useState<string | undefined>(undefined);
    let webId: string = props.src ?? "Valor predeterminado";

    getProfilePhoto(webId).then((photoUrl) => {
        setPhoto(photoUrl ?? './img/fondo5.png');
    })

    return (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
            <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={
                    <SmallAvatar alt="Texto alternativo" src={props.levelIcon}/>
                }>
                <Avatar alt="Texto alternativo" src={photo || './img/fondo5.png'} />
            </Badge>
        </CombinedDataProvider>
    );
}