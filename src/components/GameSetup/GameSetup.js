import React from 'react';

import {Button} from '@material-ui/core';

const playButtonStyle = {
  paddingTop: '0px',
  paddinBottom: '0px',
  paddingLeft: '50px',
  paddingRight: '50px',
  backgroundColor: 'green',
  fontSize: '30px',
  marginBottom: '30px',
};

const GameSetup = ({setGameView}) => {
  return (
    <div className='gameSetup'>

      <h1 className='setupHeader'> text</h1>
      <div className='play'>
        <Button
          variant='contained'
          style={playButtonStyle}
          color='primary'
          onClick={() => setGameView('game')}
        >
            Play
        </Button>
      </div>
    </div>
  );
};

export default GameSetup;
