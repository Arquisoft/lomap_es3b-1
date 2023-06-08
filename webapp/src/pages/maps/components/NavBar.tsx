import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import IconoApp from "./IconoApp";
import {LoginButton, LogoutButton, useSession} from "@inrupt/solid-ui-react";
import {useState} from "react";
import Modal from "./loginForm/Modal";
import AvatarPersonalizado from './AvatarPersonalizado';
import BarraDeProgreso from './BarraDeProgreso';
import {eventEmitter, getExp, readFileFromPod} from "../../../pods/Gamification";
import {LevelType} from "../../../shared/shareddtypes";
import rojo from "./img/rojo.png";
import azul from "./img/azul.png";
import verde from "./img/verde.png";
import amarillo from "./img/amarillo.png";
import morado from "./img/morado.png";
import naranja from "./img/naranja.png";
import rosa from "./img/rosa.png";
import turquesa from "./img/turquesa.png";
import gris from "./img/gris.png";
import blanco from "./img/blanco.png";
import {Link} from "react-router-dom";

const pages = ['Home', 'Help'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [level, setLevel] = useState<number>(0);
    const [levelIcon, setLevelIcon] = useState<string>(`./components/img/rojo.png`);
    const [progress, setProgress] = useState<number>(0);
    const [puntos, setPuntos] = useState<number>(0);

    const {session} = useSession();
    const [showModal, setShowModal] = useState(false);

    //De la session sacar el webId
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

    eventEmitter.on('puntosSumados', () => {
        getLevelAndProgress();
    });

    getLevelAndProgress();

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className="navigationmenu">
            <AppBar position="static"
                    style={{background: "#000000"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconoApp/>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                key='Home'
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to='/'
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Home
                            </Button>
                            <Button
                                key='Help'
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to='/help'
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Help
                            </Button>
                        </Box>
                        {!session.info.isLoggedIn ? (
                            <>
                                <Button onClick={handleOpenModal}>Log In</Button>
                                {showModal ? (
                                    <Modal handleClose={handleCloseModal}>
                                        <LoginButton oidcIssuer={"https://inrupt.net"}
                                                     redirectUrl={window.location.href}
                                                     onError={console.log}>
                                            <Button name="inrupt">Login with Inrupt</Button>
                                        </LoginButton>
                                        <LoginButton oidcIssuer={"https://solidcommunity.net/"}
                                                     redirectUrl={window.location.href} onError={console.log}>
                                            <Button name="solidcommunity">Login with SolidCommunity</Button>
                                        </LoginButton>
                                    </Modal>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                <BarraDeProgreso
                                    progress={progress}
                                    level={level}
                                />
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <AvatarPersonalizado
                                                src={session.info.webId}
                                                levelIcon={levelIcon}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"
                                                        style={{color: 'white'}}>Perfil</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <LogoutButton onError={console.log}>
                                                <Button
                                                    style={{color: "white"}}
                                                    onClick={() => {
                                                    }}>
                                                    Log Out
                                                </Button>
                                            </LogoutButton>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default ResponsiveAppBar;
