import React from 'react';
import {SessionProvider} from '@inrupt/solid-ui-react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MapsPage from './pages/maps/MapsPage';
import HelpPage from './pages/help/Help';
import './App.css';
import NavBar from "./commonComponents/components/NavBar";
import Perfil from "./pages/perfil/perfil";



function App(): JSX.Element {

    return (
        <>
            <SessionProvider sessionId="login-prueba" restorePreviousSession={true}>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path='/' element={<MapsPage/>}/>
                        <Route path='/map' element={<MapsPage/>}/>
                        <Route path='/help' element={<HelpPage/>}/>
                        <Route path='/profile' element={<Perfil/>}/>
                    </Routes>
                </Router>
            </SessionProvider>
        </>
    );
}

export default App;
