import React, {useState} from 'react';
import {Button} from '@material-ui/core';
const testBoard = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

const GameView = () => {
  const [gameBoard, setGameBoard] = useState(testBoard);
  const playerChar='X';

  const handleButton = (event) => {
    console.log('event :>> ', event);
    if (gameBoard[event.y][event.x]===' ') {
      const newBoard=[...gameBoard];
      newBoard[event.y][event.x]=playerChar;
      setGameBoard(newBoard);
    }
  };

  // TODO add polling for turn and retrieving board from API
  // user shouldn't be able to make a move if it isn't their turn

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
