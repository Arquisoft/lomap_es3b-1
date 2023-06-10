import "./perfil.css"
import AvatarPersonalizado from '../../commonComponents/components/AvatarPersonalizado';
import {useState} from "react";
import {getExp, readFileFromPod} from "../../pods/Gamification";
import {LevelType} from "../../shared/shareddtypes";
import rojo from "../maps/components/img/rojo.png";
import azul from "../maps/components/img/azul.png";
import verde from "../maps/components/img/verde.png";
import amarillo from "../maps/components/img/amarillo.png";
import morado from "../maps/components/img/morado.png";
import naranja from "../maps/components/img/naranja.png";
import rosa from "../maps/components/img/rosa.png";
import turquesa from "../maps/components/img/turquesa.png";
import gris from "../maps/components/img/gris.png";
import blanco from "../maps/components/img/blanco.png";
import {useSession} from "@inrupt/solid-ui-react";
import banner from './img/banner.png'
import {IconButton} from "@mui/material";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

type profileProps = {};

function Perfil(props: profileProps): JSX.Element {

    const [level, setLevel] = useState<number>(0);
    const [levelIcon, setLevelIcon] = useState<string>(`./components/img/rojo.png`);
    const [progress, setProgress] = useState<number>(0);
    const [puntos, setPuntos] = useState<number>(0);

    const {session} = useSession();
    const {webId} = session.info;


    const getLevelAndProgress = async () => {

        try {
            var puntos = await readFileFromPod(webId!.split("/profile")[0] + "/public/map/level.info",
                session);
            if (puntos === undefined) {
                let levelT: LevelType = {
                    exp: 0
                }
                var blob = new Blob([JSON.stringify(levelT)], {type: "aplication/json"});
                var file = new File([blob], "level" + ".info", {type: blob.type});
                puntos = await getExp(session, file, webId!.split("/profile")[0] + "/public/map/")
            }
            let nivel = Math.floor(parseInt(puntos) / 100) + 1
            setLevel(nivel);
            setPuntos(puntos);
            imagenNivel(nivel);
            setProgress(puntos - (level - 1) * 100)
        } catch (err) {
            console.log("Error al cargar el nivel: " + err);
        }
    }

    const imagenNivel = (nivel: number | undefined) => {
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
                if(nivel! > 10){
                    color = blanco;
                } else {
                    color = rojo;
                }
                break;
        }
        setLevelIcon(color);
    }

    getLevelAndProgress();

    function handleButtonClick() {
        window.open(webId, '_blank');
    }

    return (
        <>
            <div className="profilePage">
                <div className="contenidoProfile">
                    <div className="centroProfile">
                        <div style={{ position: 'relative', display: 'inline-block', width: '500px', height: '300px' }}>
                            <img src={banner} alt="Banner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />

                            <div
                                style={{
                                    position: 'absolute',
                                    top: '70%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <AvatarPersonalizado src={session.info.webId} levelIcon={levelIcon} />
                            </div>
                        </div>
                    </div>
                    <IconButton onClick={handleButtonClick}>
                        <ContactEmergencyIcon/>{("Página de tu POD")}
                    </IconButton>
                </div>
            </div>
        </>
    );
}

export default Perfil;
