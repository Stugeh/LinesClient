import React, {useState} from 'react';
// Material UI button component. Material UI docs at https://material-ui.com/components/buttons/
import {Button} from '@material-ui/core';

import GameList from './GameList';

const playButtonStyle = {
  paddingLeft: '50px',
  paddingRight: '50px',
  backgroundColor: 'green',
  fontSize: '30px',
  marginTop: '50px',
  color: 'white',
};

//
// MainMenu Component.
// The smaller pieces will eventully be moved to their
// own component functions in other files.
const MainMenu = ({setGameView, setGame}) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='mainMenu'>
      <Button
        style={playButtonStyle}
        onClick={() => setGameView('gameSetup')}
      >
        Create game
      </Button><br/>
      <Button
        style={{...playButtonStyle, backgroundColor: 'orange'}}
        onClick={() => setIsHidden(!isHidden)}
      >
        Join game
      </Button>
      {!isHidden ?
      <GameList
        setGameView={setGameView}
        setGame={setGame}
      /> : null}
    </div>
  );
};

export default MainMenu;

