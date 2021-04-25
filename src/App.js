import React, {useState, useEffect} from 'react';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';
import CreateRule from './components/CreateRule';
import CreateGame from './components/CreateGame';
import Login from './components/Login';
import GameView from './components/GameView';
import Notification from './components/Notification';

const App = () => {
  // State variables
  const [view, setView] = useState('mainMenu');
  const [gameUri, setGameUri] = useState('');

  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    if (!window.localStorage.getItem('authToken')) {
      setView('login');
    }
  }, []);


  return (
    <div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      {view === 'login' ? (
        <Login setView={setView}/>
      ):null}
      {view === 'game' ? (
        <GameView gameUri={gameUri}/>
      ):null}
      {view === 'mainMenu' ? (
        <MainMenu setView={setView} setGameUri={setGameUri}/>
      ):null}
      {view === 'createRule' ? (
        <CreateRule
          setView={setView}
          setNotification={setNotification}
          setGameUri={setGameUri}/>
      ):null}
      {view === 'createGame' ? (
        <CreateGame
          setView={setView}
          setNotification={setNotification}
          setGameUri={setGameUri}/>
      ):null}
    </div>
  );
};

export default App;
