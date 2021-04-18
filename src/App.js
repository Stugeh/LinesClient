import React, {useState} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import GameSetup from './components/GameSetup/GameSetup';


const App = () => {
  // State variables
  const [gameView, setGameView] = useState('mainMenu');
  const [activeMode, setActiveMode] = useState('singlePlayer');

  return (
    <div>
      <div className='gameWindow'>
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
    </div>
  );
};

export default App;
