import React from 'react';
import './App.css';
import PlayersProvider from "./context/PlayerContext";
import {HomePage} from "./pages/HomePage";

function App() {
    return (
        <PlayersProvider>
            <HomePage/>
        </PlayersProvider>
    );
}

export default App;
