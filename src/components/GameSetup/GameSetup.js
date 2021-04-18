import React from 'react';

import {Button} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import ModeToggle from '../ModeToggle';
import SingleSetup from './SingleSetup';
import MultiSetup from './MultiSetup';


const GameSetup = ({setGameView, setActiveMode, activeMode}) => {
  const playButtonStyle = {
    paddingTop: '0px',
    paddinBottom: '0px',
    paddingLeft: '50px',
    paddingRight: '50px',
    backgroundColor: 'green',
    fontSize: '40px',
    marginBottom: '30px',
  };

  return (
    <div className='gameSetup'>

      <h1 className='setupHeader'>
        {activeMode.toUpperCase()}
        <ModeToggle setActiveMode={setActiveMode} activeMode={activeMode} />
      </h1>
      {activeMode === 'singlePlayer' ? <SingleSetup/>: <></>}
      {activeMode === 'multiPlayer' ? <MultiSetup/>: <></>}
      <div className='play'>
        <Button
          variant='contained'
          style={playButtonStyle}
          color='primary'
          onClick={() => setGameView('game')}
        >
          <PlayArrowIcon fontSize='large'/>
            Play
        </Button>
      </div>
    </div>
  );
};

export default GameSetup;
