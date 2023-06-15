import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {CombinedDataProvider} from "@inrupt/solid-ui-react";
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

export default function AvatarPersonalizado(props: avatarProps) {
    const [photo, setPhoto] = React.useState<string>('./img/fondo5.png');
    let webId: string = props.src ?? "Valor predeterminado";

    getProfilePhoto(webId, setPhoto);


    return (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
            <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={
                    <SmallAvatar alt="A" src={props.levelIcon}/>
                }>
                <Avatar alt="Texto alternativo" src={photo || './img/fondo5.png'}/>
            </Badge>
        </CombinedDataProvider>
    );
}