import React, {useState} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import GameSetup from './components/GameSetup/GameSetup';
import Login from './components/Login';
import GameView from './components/GameView/GameView';

const App = () => {
  // State variables
  const [view, setView] = useState('mainMenu');
  const [game, setGame] = useState({});

  if (!window.localStorage.getItem('authToken')) {
    setView('login');
    return <Login setView={setView}/>;
  }
  return (
    <div>
      {view === 'game' ? (
        <GameView setGame={game}/>
      ):null}
      {view === 'mainMenu' ? (
        <MainMenu setGameView={setView} setGame={setGame}/>
      ):null}
      {view === 'gameSetup' ? (
        <GameSetup setGameView={setView}/>
      ):null}
    </div>
  );
};

export default App;
