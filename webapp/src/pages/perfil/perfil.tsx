import "./perfil.css"
import {useEffect, useState} from "react";
import {getExp, imagenNivel, readFileFromPod} from "../../pods/Gamification";
import {Friend, LevelType} from "../../shared/shareddtypes";
import banner from './img/banner.png'
import {IconButton} from "@mui/material";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import {useSession} from "@inrupt/solid-ui-react";
import {getFriendsToList} from "../../pods/Friends";
import AvatarPersonalizado from "../../commonComponents/components/AvatarPersonalizado";
import LinearDeterminate from "../../commonComponents/components/BarraDeProgreso";

export default function Profile() {

    const [level, setLevel] = useState<number>(0);
    const [levelIcon, setLevelIcon] = useState<string>(`./components/img/rojo.png`);
    const [progress, setProgress] = useState<number>(0);

    const {session} = useSession();
    const {webId} = session.info;

    const [friends, setFriends] = useState<Array<Friend>>([]);


    const getLevelAndProgress = async () => {
        try {
            let puntos = await readFileFromPod(webId!.split("/profile")[0] + "/public/level.info",
                session);
            if (puntos === undefined) {
                let levelT: LevelType = {
                    exp: 0
                }
                let blob = new Blob([JSON.stringify(levelT)], {type: "aplication/json"});
                let file = new File([blob], "level.info", {type: blob.type});

                puntos = await getExp(session, file, webId!.split("/profile")[0] + "/public/")
            }
            let nivel = Math.floor(parseInt(puntos) / 100) + 1
            setLevel(nivel);
            let color = await imagenNivel(nivel);
            setLevelIcon(color);
            setProgress(puntos - (level - 1) * 100)
        } catch (err) {
        }
    }

    function handleButtonClick() {
        window.open(webId, '_blank');
    }


    useEffect(() => {
        getFriendsToList(session).then((amigos) => {
            setFriends(amigos);
        }).catch();
    }, [session]);

    getLevelAndProgress().catch();

    return (
        <>
            <div className="profilePage">
                <div className="contenidoProfile">
                    <div className="centroProfile">
                        <div style={{position: 'relative', display: 'inline-block', width: '500px', height: '300px'}}>
                            <img src={banner} alt="Banner" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '70%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}>
                                <AvatarPersonalizado src={session.info.webId} levelIcon={levelIcon}/>
                            </div>
                        </div>
                        <IconButton onClick={handleButtonClick}>
                            <ContactEmergencyIcon/>{("Página de tu POD")}
                        </IconButton>
                        <LinearDeterminate
                            progress={progress}
                            level={level}
                            widthPercent={98}
                        />
                        <div className="friendsConfig">
                            {friends.length > 0 ? (
                                <div className="friends">
                                    <br/>
                                    <p>Amigos:</p>
                                    <ul>
                                        {friends.map((friend) => (
                                            <li>
                                                {friend.name}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="friend-counter">
                                        {friends.length === 1 ? (
                                            <p>Tienes {friends.length} amigo</p>
                                        ) : (
                                            <p>Tienes {friends.length} amigos</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-content" id="no-friends-profile">
                                    <p>No tienes amigos</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

