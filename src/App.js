import React, {useState} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import GameSetup from './components/GameSetup/GameSetup';
import Login from './components/Login';

const App = () => {
  // State variables
  const [gameView, setGameView] = useState('mainMenu');
  const [activeMode, setActiveMode] = useState('singlePlayer');


  if (!window.localStorage.getItem('authToken')) {
    return <Login/>;
  };

  return (
    <div>
      {gameView === 'mainMenu' ? (
            <MainMenu
              setGameView={setGameView}
              setActiveMode={setActiveMode}
              activeMode={activeMode}
            />
          ):<></>
      }
      {gameView === 'gameSetup' ? (
            <GameSetup
              setGameView={setGameView}
              setActiveMode={setActiveMode}
              activeMode={activeMode}
            />
          ):<></>}
    </div>
  );
};

export default App;
