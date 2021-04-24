import React, {useState} from 'react';
// Material UI button component. Material UI docs at https://material-ui.com/components/buttons/
import {Button} from '@material-ui/core';

import GameList from './GameList';


//
// MainMenu Component.
// The smaller pieces will eventually be moved to their
// own component functions in other files.
const MainMenu = ({setView, setGame}) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='mainMenu'>
      <Button
        style={{...playButtonStyle, backgroundColor: 'green'}}
        variant='contained'
        onClick={() => setView('createGame')}>
        Create game
      </Button><br/>
      <Button
        style={{...playButtonStyle, backgroundColor: 'orange'}}
        onClick={() => setIsHidden(!isHidden)}>
        Join game
      </Button>
      {!isHidden ?
      <GameList
        setView={setView}
        setGame={setGame}
      /> : null}
    </div>
  );
};

const playButtonStyle = {
  paddingLeft: '50px',
  paddingRight: '50px',
  fontSize: '30px',
  marginTop: '50px',
};

export default MainMenu;

