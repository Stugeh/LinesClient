import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {useInterval} from '../hooks/poller';


const HEADERS = {
  headers: {
    'Authorization': window.localStorage.getItem('authToken'),
  },
};
const USERNAME = window.localStorage.getItem('username');

const GameView = ({gameUri}) => {
  const [gameBoard, setGameBoard] = useState([]);
  const [winner, setWinner] = useState(0);
  const [player, setPlayer] = useState(1);
  const [playerChar, setPlayerChar] = useState('X');
  const [turn, setTurn] = useState(0);

  useEffect(async () => {
    const game = await axios.get(gameUri, HEADERS);
    setGameBoard(game.data.board);
    if (game.data.player1 !== USERNAME) {
      setPlayer(2);
      setPlayerChar('O');
    }
  }, []);

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
      if (turn !==0) {
        turn === 1 ? setTurn(2) : setTurn(1);
      }
    }
  };

  useInterval(async () => {
    const state = await axios.get(gameUri, HEADERS);
    console.log('state.data :>> ', state.data);
    setTurn(state.data.turn);
    setGameBoard(state.data.board);
    setWinner(state.data.winner);
  }, 1000 * 1);

  if (winner === player) {
    return (<h1>You won</h1>);
  }
  if (winner !== 0) {
    return (<h1>You lost</h1>);
  }


  return (
    <div className='board'>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex}>
          {renderRow(row, rowIndex, handleButton)}
        </div>
      ))}
    </div>

  );
};

const renderRow = (row, rowIndex, handleButton) => {
  return (
    <div className='boardRow'>
      {row.map((cell, cellIndex) => (
        renderButton(cellIndex, rowIndex, cell, handleButton)
      ))}
    </div>);
};

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

const buttonStyle = {height: '40px'};

export default GameView;
