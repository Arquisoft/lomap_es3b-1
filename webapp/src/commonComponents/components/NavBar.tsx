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
import IconoApp from "../../pages/maps/components/IconoApp";
import {LoginButton, LogoutButton, useSession} from "@inrupt/solid-ui-react";
import {useState} from "react";
import Modal from "./loginForm/Modal";
import AvatarPersonalizado from './AvatarPersonalizado';
import BarraDeProgreso from './BarraDeProgreso';
import {eventEmitter, getExp, imagenNivel, readFileFromPod} from "../../pods/Gamification";
import {LevelType} from "../../shared/shareddtypes";
import {Link} from "react-router-dom";

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [level, setLevel] = useState<number>(0);
    const [levelIcon, setLevelIcon] = useState<string>(`./components/img/rojo.png`);
    const [progress, setProgress] = useState<number>(0);

    const {session} = useSession();
    const [showModal, setShowModal] = useState(false);

    //De la session sacar el webId
    const {webId} = session.info;

    const pages = ['Home', 'Help', 'About'];

    const getLevelAndProgress = async () => {

        try {
            var puntos = await readFileFromPod(webId!.split("/profile")[0] + "/public/level.info",
                session);
            if (puntos === undefined) {
                let levelT: LevelType = {
                    exp: 0
                }
                var blob = new Blob([JSON.stringify(levelT)], {type: "aplication/json"});
                var file = new File([blob], "level.info", {type: blob.type});
                puntos = await getExp(session, file, webId!.split("/profile")[0] + "/public/")
            }
            let nivel = Math.floor(parseInt(puntos) / 100) + 1
            setLevel(nivel);
            let color = await imagenNivel(nivel);
            setLevelIcon(color)
            setProgress(puntos - (level - 1) * 100)
        } catch (err) {
        }
    }

    eventEmitter.on('puntosSumados', () => {
        getLevelAndProgress();
    });

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

    getLevelAndProgress();

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
                                Mapa
                            </Button>
                            <Button
                                key='Help'
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to='/help'
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Ayuda
                            </Button>
                            <Button
                                key='About'
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to='/About'
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                About
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
                                    widthPercent={10}
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
                                            <Button
                                                key='profile'
                                                onClick={handleCloseNavMenu}
                                                component={Link}
                                                to='/profile'
                                                sx={{my: 2, color: 'white', display: 'block'}}>
                                                Perfil
                                            </Button>
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
