import React, {useState} from 'react';
import {Button} from '@material-ui/core';
const testBoard = [
  [' ', 'O', ' '],
  ['X', 'X', ' '],
  ['O', 'O', ' '],
];

const GameView = () => {
  const [gameBoard, setGameBoard] = useState(testBoard);

  const handleButton = (event) => {
    console.log('event :>> ', event);
    setGameBoard(testBoard);
  };

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
  const buttonStyle = {height: '40px'};
  return (
    <Button
      key={`${coordinates.x},${coordinates.y}`}
      variant='contained'
      onClick={(e) => handleButton(coordinates, e)}
      style={buttonStyle}
    >
      {cell}
    </Button>
  );
};

export default GameView;
