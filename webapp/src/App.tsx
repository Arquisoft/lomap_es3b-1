import React from 'react';
import {SessionProvider} from '@inrupt/solid-ui-react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MapsPage from './pages/maps/MapsPage';
import HelpPage from './pages/help/Help';
import './App.css';
import NavBar from "./commonComponents/components/NavBar";
import Profile from "./pages/perfil/perfil";
import About from "./pages/about/About";



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
                        <Route path='/about' element={<About/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                    </Routes>
                </Router>
            </SessionProvider>
        </>
    );
}

export default App;
