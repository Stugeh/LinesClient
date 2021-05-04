import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {useInterval} from '../hooks/poller';


const GameView = ({gameUri, setView}) => {
  const [gameBoard, setGameBoard] = useState([]);
  const [winner, setWinner] = useState(0);
  const [player, setPlayer] = useState(1);
  const [playerChar, setPlayerChar] = useState('X');
  const [turn, setTurn] = useState(0);

  const USERNAME = window.localStorage.getItem('username');
  const HEADERS = {
    headers: {
      'Authorization': window.localStorage.getItem('authToken'),
    },
  };
  // set up the local game state when mounting this component
  useEffect(async () => {
    const game = await axios.get(gameUri, HEADERS);
    setGameBoard(game.data.board);
    if (game.data.player1 !== USERNAME) {
      setPlayer(2);
      setPlayerChar('O');
    }
  }, []);

  // handle interaction with the gam buttons
  const handleButton = (event) => {
    if (gameBoard[event.y][event.x]===' ' && turn === player) {
      const newBoard=[...gameBoard];
      newBoard[event.y][event.x]=playerChar;
      setGameBoard(newBoard);
      axios.put(
          `${gameUri}add-move/`,
          {row: event.y, column: event.x},
          HEADERS,
      );
      if (turn !== 0) {
        turn === 1 ? setTurn(2) : setTurn(1);
      }
    }
  };

  // poll the server to get updates in game state
  useInterval(async () => {
    const state = await axios.get(gameUri, HEADERS);
    setTurn(state.data.turn);
    setGameBoard(state.data.board);
    setWinner(state.data.winner);
  }, 1000 * 1);

  // when someone wins display the appropriate message
  if (winner !== 0) {
    return <GameOver
      winner={winner} player={player} setView={setView}
    />;
  };

  // Game board
  return (
    <div className='board'>
      {turn === 0 ?
      <h1>Waiting for other player</h1> :
      <h1>Player {turn}s turn</h1>
      }
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex}>
          {renderRow(row, rowIndex, handleButton)}
        </div>
      ))}
    </div>
  );
};

// ** HELPER FUNCTIONS AND SUB-COMPONENTS **//

// renders a row in the gameboard
const renderRow = (row, rowIndex, handleButton) => {
  return (
    <div className='boardRow'>
      {row.map((cell, cellIndex) => (
        renderButton(cellIndex, rowIndex, cell, handleButton)
      ))}
    </div>);
};

// renders an individual button and sets up event handlers for them
const renderButton = (cellIndex, rowIndex, cell, handleButton) => {
  const coordinates = {x: cellIndex, y: rowIndex};
  return (
    <Button
      key={`${coordinates.x},${coordinates.y}`}
      variant='contained'
      style={buttonStyle}
      onClick={(e) => handleButton(coordinates, e)}
    >
      {cell}
    </Button>
  );
};

// Screen thats displayed when game ends
const GameOver = ({winner, player, setView}) => (
  <div>
    {winner === player ? <h1>You won</h1> : <h1>You lost</h1>}
    <Button
      variant='contained'
      color='primary'
      onClick={()=>setView('mainMenu')}
    >Leave</Button>
  </div>
);

const buttonStyle = {height: '40px'};

export default GameView;
