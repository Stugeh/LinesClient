import React, {useState, useEffect} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import CreateRule from './components/GameSetup/CreateRule';
import Login from './components/Login';
import GameView from './components/GameView/GameView';
import CreateGame from './components/CreateGame';

const App = () => {
  // State variables
  const [view, setView] = useState('mainMenu');
  const [game, setGame] = useState({});

  useEffect(() => {
    if (!window.localStorage.getItem('authToken')) {
      setView('login');
    }
  }, []);


  return (
    <div>
      {view === 'login' ? (
        <Login setView={setView}/>
      ):null}
      {view === 'game' ? (
        <GameView setGame={game}/>
      ):null}
      {view === 'mainMenu' ? (
        <MainMenu setView={setView} setGame={setGame}/>
      ):null}
      {view === 'createRule' ? (
        <CreateRule setView={setView}/>
      ):null}
      {view === 'createGame' ? (
        <CreateGame setView={setView}/>
      ):null}
    </div>
  );
};

export default App;
