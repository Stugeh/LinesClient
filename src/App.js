import React, {useState} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import GameSetup from './components/GameSetup/GameSetup';
// import Login from './components/Login';

const App = () => {
  // State variables
  const [gameView, setGameView] = useState('mainMenu');

  // TODO if (!window.localStorage.getItem('authToken')) return <Login />;

  return (
    <div>
      {gameView === 'mainMenu' ? (
            <MainMenu setGameView={setGameView}/>
          ):null}
      {gameView === 'gameSetup' ? (
            <GameSetup setGameView={setGameView}/>
          ):null}
    </div>
  );
};

export default App;
